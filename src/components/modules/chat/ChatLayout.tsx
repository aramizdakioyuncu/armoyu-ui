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
  const { closeChat, isLiveMode, setLiveMode, chatList: liveContacts, setChatList, activeMessages, setActiveMessages, fetchMessages, fetchChatList, sendMessage: sendApiMessage } = useChat();
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
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [msgSearchQuery, setMsgSearchQuery] = useState('');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  // Tarihleri karşılaştırmak ve "Bugün", "Dün" gibi etiketler üretmek için yardımcı fonksiyon
  const getDateLabel = (dateStr: string) => {
    try {
      if (!dateStr) return null;
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // Geçersiz tarihse olduğu gibi bırak

      const today = new Date();
      const yesterday = new Date();
      yesterday.setDate(today.getDate() - 1);

      if (date.toDateString() === today.toDateString()) return 'Bugün';
      if (date.toDateString() === yesterday.toDateString()) return 'Dün';

      return date.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  };

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

  const scrollToBottom = (instant = false) => {
    if (scrollContainerRef.current) {
      if (instant) {
        scrollContainerRef.current.scrollTop = scrollContainerRef.current.scrollHeight;
      } else {
        scrollContainerRef.current.scrollTo({
          top: scrollContainerRef.current.scrollHeight,
          behavior: 'smooth'
        });
      }
    }
  };

  // Scroll logic is now handled natively by flex-col-reverse for initial load.
  // We only use scrollToBottom for smooth scrolling to new messages if needed.
  useEffect(() => {
    if (activeMessages.length > 0) {
       // Browser handles stay-at-bottom with flex-col-reverse naturally
    }
  }, [activeMessages, isTyping]);

  // Sync with session's chatList for MOCK mode
  useEffect(() => {
    if (!isLiveMode && session?.chatList) {
      setLocalContacts(session.chatList);
    }
  }, [session?.chatList, isLiveMode]);

  // Handle Contact Selection in LIVE mode
  useEffect(() => {
    if (isLiveMode && activeContactId) {
      // Find the contact in the list to get its chatType and raw ID
      const contact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === activeContactId);
      
      if (contact) {
        const idNum = parseInt(contact.id);
        if (!isNaN(idNum)) {
          fetchMessages(idNum, contact.chatType).catch(err => {
            console.error('[ChatLayout] fetchMessages error:', err);
          });
        }
      }
    }
  }, [activeContactId, isLiveMode, fetchMessages]);

  // Auto-select logic removed to prevent automatic chat opening on load

  useEffect(() => {
    const offMsg = on('chat_message', (incomingMsg: any) => {
      const msgModel = ChatMessageModel.fromAPI(incomingMsg);

      // 1. UPDATE GLOBAL CHAT LIST CACHE (For both Live and Mock modes)
      setChatList(prev => prev.map(c => {
        if (c.id === String(incomingMsg.chatId)) {
          const messageExists = c.messages.some(m => m.id === msgModel.id);
          return new Chat({
            ...c,
            lastMessage: msgModel,
            time: msgModel.timestamp,
            updatedAt: Date.now(),
            messages: messageExists ? c.messages : [...(c.messages || []), msgModel],
            unreadCount: (activeContactId !== c.uid && incomingMsg.sender?.username !== user?.username) ? c.unreadCount + 1 : c.unreadCount
          });
        }
        return c;
      }));

      // 2. UPDATE ACTIVE MESSAGES IF OPEN
      const currentActiveContact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === activeContactId);
      if (currentActiveContact && (incomingMsg.chatId === currentActiveContact.id || incomingMsg.sender?.username === currentActiveContact.id)) {
        // Since we are updating the global chatList, activeMessages should ideally sync if using Context well, 
        // but for immediate UI feedback we update it here too.
        fetchMessages(parseInt(currentActiveContact.id), currentActiveContact.chatType);
      }

      // 3. MOCK MODE UPDATES
      if (!isLiveMode) {
        setLocalContacts(prev => {
          const contactId = incomingMsg.chatId || incomingMsg.sender?.username;
          const contactExists = prev.some(c => c.id === contactId);

          if (!contactExists && incomingMsg.sender?.username !== user?.username) {
            const newChat = new Chat({
              id: contactId,
              uid: `ozel-${contactId}`,
              name: incomingMsg.sender?.displayName || incomingMsg.sender?.username || 'Bilinmeyen',
              avatar: incomingMsg.sender?.avatar || '',
              lastMessage: msgModel,
              time: msgModel.timestamp,
              updatedAt: Date.now(),
              messages: [msgModel],
              unreadCount: (activeContactId !== `ozel-${contactId}`) ? 1 : 0,
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
                unreadCount: (activeContactId !== c.uid && incomingMsg.sender?.username !== user?.username) ? c.unreadCount + 1 : c.unreadCount
              });
            }
            return c;
          });
        });
      }

      setIsTyping(false);
    });

    const offTyping = on('typing', (data: any) => {
      const currentActiveContact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === activeContactId);
      const isChattingWithSender = currentActiveContact && data.username === currentActiveContact.id && data.chatId === user?.username;
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

  const handleSelectContact = (uid: string) => {
    const contact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === uid);
    
    // Caching: If we already have messages for this contact, show them immediately
    if (contact && contact.messages && contact.messages.length > 0) {
      setActiveMessages(contact.messages);
    } else {
      setActiveMessages([]);
    }

    if (!isLiveMode) {
      if (!contact) {
        // uid could be 'ozel-username' or just 'username' in mock mode
        const rawId = uid.includes('-') ? uid.split('-')[1] : uid;
        const newUser = userList.find((u: any) => u.username === rawId);
        
        if (newUser) {
          const newContact = new Chat({
            id: newUser.username,
            uid: `ozel-${newUser.username}`,
            name: newUser.displayName,
            avatar: newUser.avatar,
            updatedAt: Date.now(),
            messages: [],
            isOnline: true,
            unreadCount: 0
          });
          setLocalContacts([newContact, ...localContacts]);
        }
      }
    }

    setActiveContactId(uid);
    setIsTyping(false);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeContactId) return;

    if (isLiveMode) {
      const contact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === activeContactId);
      if (contact) {
        const idNum = parseInt(contact.id);
        if (!isNaN(idNum)) {
          await sendApiMessage(idNum, text, contact.chatType);
        }
      }
    } else {
      const newMessage = new ChatMessageModel({
        id: Date.now().toString(),
        sender: user as unknown as User,
        content: text,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        fullDate: new Date().toISOString(),
        isSystem: false
      });

      setLocalMessages(prev => [...prev, newMessage]);
      setLocalContacts(prev => prev.map(c => {
        if (c.uid === activeContactId) {
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

    const currentContact = (isLiveMode ? liveContacts : localContacts).find(c => c.uid === activeContactId);

    emit('chat_message', {
      id: Date.now().toString(),
      chatId: currentContact?.id || activeContactId,
      sender: { 
        username: user?.username, 
        displayName: user?.displayName,
        avatar: user?.avatar 
      },
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      tarih: new Date().toISOString()
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
  const activeContact = activeContactId ? currentContacts.find((c: Chat) => c.uid === activeContactId) : null;

  return (
    <div className="flex h-full w-full overflow-hidden relative z-10">

      {!activeContactId && (
        <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between">
            <h2 className="font-black text-armoyu-text uppercase tracking-widest text-sm">Sohbetler</h2>
          </div>
          <ChatList contacts={currentContacts} activeId={activeContactId || ''} onSelect={handleSelectContact} />
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
              {isSearchVisible ? (
                <div className="flex items-center bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-xl px-3 py-1.5 animate-in fade-in slide-in-from-right-2 duration-300">
                  <Search className="w-4 h-4 text-armoyu-text-muted mr-2" />
                  <input 
                    type="text" 
                    autoFocus
                    placeholder="Mesajlarda ara..." 
                    value={msgSearchQuery}
                    onChange={(e) => setMsgSearchQuery(e.target.value)}
                    className="flex-1 bg-transparent border-none outline-none text-sm text-armoyu-text placeholder:text-armoyu-text-muted font-medium"
                  />
                  <button onClick={() => { setIsSearchVisible(false); setMsgSearchQuery(''); }} className="p-1 hover:bg-black/5 rounded-full transition-colors">
                    <X className="w-4 h-4 text-armoyu-text-muted" />
                  </button>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-armoyu-text truncate text-base">{activeContact.name}</h3>
                    {activeContact.isGroup && (
                      <span className="px-2 py-0.5 rounded-md bg-armoyu-primary/10 text-armoyu-primary text-[9px] font-black uppercase tracking-widest border border-armoyu-primary/20 flex-shrink-0">
                        Topluluk
                      </span>
                    )}
                  </div>
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
                </>
              )}
            </div>

            <div className="flex gap-1">
              <button 
                onClick={() => setIsSearchVisible(!isSearchVisible)}
                className={`p-2 rounded-full transition-colors ${isSearchVisible ? 'text-armoyu-primary bg-armoyu-primary/10' : 'text-armoyu-text-muted hover:text-armoyu-primary hover:bg-armoyu-primary/10'}`} 
                title="Sohbet İçi Ara"
              >
                <Search className="w-5 h-5" />
              </button>
              <button onClick={closeChat} className="p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors" title="Sohbeti Kapat">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          <div 
            ref={scrollContainerRef}
            className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col-reverse gap-2 relative hide-scrollbar scroll-smooth"
          >
            {isTyping && (
              <div className="flex gap-2 items-center px-4 mb-2">
                <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 rounded-full bg-armoyu-primary animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            {/* Mesajları filtreleyip ters sırayla basıyoruz */}
            {(() => {
              const msgs = (isLiveMode ? activeMessages : localMessages)
                .filter(m => m.content.toLowerCase().includes(msgSearchQuery.toLowerCase()));
              
              const renderedItems: React.ReactNode[] = [];
              
              for (let i = 0; i < msgs.length; i++) {
                const msg = msgs[i];
                const prevMsg = msgs[i - 1];
                
                // Mesajı ekle
                renderedItems.push(
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
                );

                // Eğer bir sonraki mesajın tarihi farklıysa veya ilk mesajsa (flex-col-reverse olduğu için mantık ters)
                // Ama biz burada düz listede gidip en son reverse yapacağız.
                const currentDate = new Date(msg.fullDate).toDateString();
                const nextMsg = msgs[i + 1];
                const nextDate = nextMsg ? new Date(nextMsg.fullDate).toDateString() : null;

                if (currentDate !== nextDate) {
                  renderedItems.push(
                    <div key={`date-${currentDate}`} className="flex justify-center my-6 sticky top-0 z-10">
                      <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted border border-black/5 dark:border-white/5 backdrop-blur-md">
                        {getDateLabel(msg.fullDate)}
                      </span>
                    </div>
                  );
                }
              }

              return renderedItems.reverse();
            })()}
          </div>

          <ChatInput onSend={handleSendMessage} chatId={activeContactId} />
        </div>
      )}

    </div>
  );
}
