'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { User } from '../../../models/auth/User';
import { Chat } from '../../../models/social/chat/Chat';
import { ChatMessage as ChatMessageModel } from '../../../models/social/chat/Message';
import { Phone, Search, X } from 'lucide-react';
import { useArmoyu } from '../../../context/ArmoyuContext';

// Shared Contexts / Utils from main index
import { 
    useAuth, 
    useChat, 
    useSocket, 
    userList 
} from '../../../index';

// Module specific widgets
import { ChatList } from './widgets/ChatList';
import { ChatMessage } from './widgets/ChatMessage';
import { ChatInput } from './widgets/ChatInput';

export function ChatLayout() {
  const { user, session } = useAuth();
  const { setMockEnabled } = useArmoyu();
  const { closeChat, isLiveMode, setLiveMode, chatList: liveContacts, activeMessages, fetchMessages, fetchChatList, sendMessage: sendApiMessage } = useChat();
  const { emit, on, isConnected } = useSocket();

  const handleFetchFromApi = async () => {
    setMockEnabled(false);
    setLiveMode(true);
    await fetchChatList(1, true);
  };

  // Eğer null ise liste görünümü açık, ID var ise mesajlaşma açık.
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  
  // Local state for Mock mode (Fallback)
  const [localMessages, setLocalMessages] = useState<ChatMessageModel[]>([]);
  const [localContacts, setLocalContacts] = useState<Chat[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  // Sohbet açıldığında otomatik olarak API'den verileri çek
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (user) {
        // Zaten canlı moddaysa direkt çek, değilse canlı moda geçip çek
        if (isLiveMode) {
          fetchChatList(1, true);
        } else {
          handleFetchFromApi();
        }
      }
    }
  }, [user, isLiveMode, fetchChatList]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    scrollToBottom();
  }, [localMessages, activeMessages, isTyping]);

  // Sync with session's chatList for MOCK mode
  useEffect(() => {
    if (!isLiveMode && session?.chatList) {
      setLocalContacts(session.chatList);
    }
  }, [session?.chatList, isLiveMode]);

  // Handle Contact Selection in LIVE mode
  useEffect(() => {
    if (isLiveMode && activeContactId) {
      const idNum = parseInt(activeContactId);
      if (!isNaN(idNum)) {
        fetchMessages(idNum).catch(err => {
          console.error('[ChatLayout] fetchMessages error:', err);
        });
      }
    }
  }, [activeContactId, isLiveMode, fetchMessages]);

  // Auto-select logic removed to prevent automatic chat opening on load

  useEffect(() => {
    const offMsg = on('chat_message', (incomingMsg: any) => {
      const msgModel = ChatMessageModel.fromAPI(incomingMsg);

      // UPDATE LOCAL STATE FOR MOCK MODE
      if (!isLiveMode) {
        setLocalContacts(prev => {
          const contactId = incomingMsg.chatId || incomingMsg.sender?.username;
          const contactExists = prev.some(c => c.id === contactId);

          if (!contactExists && incomingMsg.sender?.username !== user?.username) {
            const newChat = new Chat({
              id: contactId,
              name: incomingMsg.sender?.displayName || incomingMsg.sender?.username || 'Bilinmeyen',
              avatar: incomingMsg.sender?.avatar || '',
              lastMessage: msgModel,
              time: msgModel.timestamp,
              updatedAt: Date.now(),
              messages: [msgModel],
              unreadCount: (activeContactId !== contactId) ? 1 : 0,
              isOnline: true
            });
            return [newChat, ...prev];
          }

          return prev.map(c => {
            if (c.id === contactId) {
              const messageExists = c.messages.some(m => m.id === msgModel.id);
              return new Chat({
                ...c,
                lastMessage: msgModel,
                time: msgModel.timestamp,
                updatedAt: Date.now(),
                messages: messageExists ? c.messages : [...(c.messages || []), msgModel],
                unreadCount: (activeContactId !== c.id && incomingMsg.sender?.username !== user?.username) ? c.unreadCount + 1 : c.unreadCount
              });
            }
            return c;
          });
        });

        if (activeContactId === incomingMsg.chatId || activeContactId === incomingMsg.sender?.username) {
          setLocalMessages(prev => {
            if (prev.some(m => m.id === incomingMsg.id)) return prev;
            return [...prev, msgModel];
          });
        }
      }
      
      setIsTyping(false); 
    });

    const offTyping = on('typing', (data: any) => {
      const isChattingWithSender = data.username === activeContactId && data.chatId === user?.username;
      const isBotTyping = data.username === 'system' && data.chatId === user?.username;

      if (isChattingWithSender || isBotTyping) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      offMsg();
      offTyping();
    };
  }, [on, activeContactId, user?.username, isLiveMode]);

  const handleSelectContact = (id: string) => {
    if (!isLiveMode) {
      let contact = localContacts.find((c: Chat) => c.id === id);
      if (!contact) {
        const newUser = userList.find((u: any) => u.username === id);
        if (newUser) {
          contact = new Chat({
            id: newUser.username,
            name: newUser.displayName,
            avatar: newUser.avatar,
            updatedAt: Date.now(),
            messages: [],
            isOnline: true,
            unreadCount: 0
          });
          setLocalContacts([contact, ...localContacts]);
        }
      }
      setLocalMessages(contact?.messages || []);
    }
    
    setActiveContactId(id);
    setIsTyping(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeContactId) return;
    
    if (isLiveMode) {
      const idNum = parseInt(activeContactId);
      if (!isNaN(idNum)) {
        await sendApiMessage(idNum, text);
      }
    } else {
      const newMessage = new ChatMessageModel({
        id: Date.now().toString(),
        sender: user as unknown as User,
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSystem: false
      });

      setLocalMessages(prev => [...prev, newMessage]);
      setLocalContacts(prev => prev.map(c => {
        if (c.id === activeContactId) {
          return new Chat({
            ...c,
            lastMessage: newMessage,
            time: newMessage.timestamp,
            updatedAt: Date.now(),
            messages: [...(c.messages || []), newMessage]
          });
        }
        return c;
      }));
    }

    emit('chat_message', {
      id: Date.now().toString(),
      chatId: activeContactId,
      sender: { 
        username: user?.username, 
        displayName: user?.displayName,
        avatar: user?.avatar 
      },
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    });
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-armoyu-text-muted bg-armoyu-card-bg rounded-3xl border border-gray-200 dark:border-white/10">
        Sohbetleri görmek için giriş yapmalısınız.
      </div>
    );
  }

  const currentContacts = isLiveMode ? liveContacts : localContacts;
  const activeContact = activeContactId ? currentContacts.find((c: Chat) => c.id === activeContactId) : null;

  return (
    <div className="flex h-full w-full overflow-hidden relative z-10">

      {!activeContactId && (
        <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
           <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
              <h2 className="font-black text-armoyu-text uppercase tracking-widest text-sm">Sohbetler</h2>
           </div>
          <ChatList contacts={currentContacts} activeId={''} onSelect={handleSelectContact} />
        </div>
      )}

      {activeContactId && activeContact && (
        <div className="w-full h-full flex flex-col bg-armoyu-bg relative animate-in fade-in slide-in-from-right-4 duration-300">

          <div className="h-[76px] border-b border-gray-200 dark:border-white/5 bg-armoyu-card-bg flex items-center px-4 gap-3 z-10 shrink-0">
            <button
              onClick={() => setActiveContactId(null)}
              className="p-2 -ml-2 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors rounded-full focus:outline-none"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>

            <img src={activeContact.avatar} className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm" alt="" />
            <div className="flex-1 min-w-0">
              <h3 className="font-bold text-armoyu-text truncate text-base">{activeContact.name}</h3>
              <div className="flex items-center gap-1.5 mt-0.5">
                {activeContact.isOnline ? (
                  <>
                    <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.6)] animate-pulse"></span>
                    <span className="text-xs font-bold text-emerald-500 shadow-sm">Çevrimiçi</span>
                  </>
                ) : (
                  <>
                    <span className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600"></span>
                    <span className="text-xs font-bold text-armoyu-text-muted">Son görülme {activeContact.lastSeen}</span>
                  </>
                )}
              </div>
            </div>

            <div className="flex gap-1">
              <button className="p-2 text-armoyu-text-muted hover:text-armoyu-primary rounded-full hover:bg-armoyu-primary/10 transition-colors" title="Ara">
                <Search className="w-5 h-5" />
              </button>
              <button onClick={closeChat} className="p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors" title="Sohbeti Kapat">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative hide-scrollbar">
            { (isLiveMode ? activeMessages : localMessages).map(msg => (
                <ChatMessage 
                  key={msg.id} 
                  id={msg.id}
                  sender={{
                    name: msg.sender?.displayName || 'Bilinmiyor',
                    avatar: msg.sender?.avatar || '',
                    isSelf: msg.isSelf
                  }}
                  content={msg.content}
                  timestamp={msg.timestamp}
                />
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center px-4">
                <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} className="h-2" />
          </div>

          <ChatInput onSend={handleSendMessage} chatId={activeContactId} />
        </div>
      )}

    </div>
  );
}
