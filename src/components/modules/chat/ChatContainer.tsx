'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { ChatList } from './ChatList';
import { Chat, User, Session, ChatMessage as ChatMessageModel } from '@armoyu/core';

import { ChatMessage } from './ChatMessage';
import { ChatInput } from './ChatInput';
import { useChat } from '../../../context/ChatContext';
import { useSocket } from '../../../context/SocketContext';

// Mock Data
import { userList } from '../../../lib/constants/seedData';


export function ChatContainer() {
  const { user, session, updateSession } = useAuth();
  const { closeChat } = useChat();
  const { emit, on, isConnected } = useSocket();

  // Eğer null ise liste görünümü açık, ID var ise mesajlaşma açık.
  const [activeContactId, setActiveContactId] = useState<string | null>(null);
  const [localMessages, setLocalMessages] = useState<ChatMessageModel[]>([]);
  const [localContacts, setLocalContacts] = useState<Chat[]>([]);

  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = React.useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Scroll to bottom when messages or typing status changes
  useEffect(() => {
    scrollToBottom();
  }, [localMessages, isTyping]);

  // Sync with session's chatList (chatList lives on Session, not User)
  useEffect(() => {
    if (session?.chatList) {
      setLocalContacts(session.chatList);
    }
  }, [session?.chatList]);

  // Socket Connection for Real-time Messages & Typing
  useEffect(() => {
    const offMsg = on('message', (incomingMsg: any) => {
      console.log('[ChatContainer] Incoming socket message:', incomingMsg);
      
      const msgModel = new ChatMessageModel({
        id: incomingMsg.id,
        sender: incomingMsg.sender ? new User(incomingMsg.sender) : undefined,
        content: incomingMsg.content,
        timestamp: incomingMsg.timestamp,
        isSystem: incomingMsg.isSystem || false
      });

      // Update contacts list
      setLocalContacts(prev => {
        const contactId = incomingMsg.chatId || incomingMsg.sender?.username;
        const contactExists = prev.some(c => c.id === contactId);

        if (!contactExists && incomingMsg.sender?.username !== user?.username) {
          // CREATE NEW CHAT: If sender isn't in our list, create the chat box for them!
          const newChat = new Chat({
            id: contactId,
            name: incomingMsg.sender?.displayName || incomingMsg.sender?.username || 'Bilinmeyen',
            avatar: incomingMsg.sender?.avatar || '',
            lastMessage: msgModel,
            time: msgModel.timestamp,
            updatedAt: Date.now(),
            messages: [msgModel],
            unreadCount: (activeContactId !== contactId) ? 1 : 0,
            isOnline: true // Assume online since they just sent a message
          });

          // PERSIST to Session!
          if (session) {
             const updatedChatList = [newChat, ...(session.chatList || [])];
             updateSession(new Session({ ...session, chatList: updatedChatList }));
          }

          return [newChat, ...prev];
        }

        // UPDATE EXISTING CHAT
        return prev.map(c => {
          if (c.id === contactId) {
            // Only add if not already in messages to avoid duplicates from echo
            const messageExists = c.messages.some(m => m.id === msgModel.id);
            
            const updatedChat = new Chat({
              ...c,
              lastMessage: msgModel,
              time: msgModel.timestamp,
              updatedAt: Date.now(),
              messages: messageExists ? c.messages : [...(c.messages || []), msgModel],
              unreadCount: (activeContactId !== c.id && incomingMsg.sender?.username !== user?.username) ? c.unreadCount + 1 : c.unreadCount
            });

            // Note: We don't necessarily need to update the whole session on every message to avoid excessive renders,
            // as local state handles the UI. But for NEW chats, we must.
            
            return updatedChat;
          }
          return c;
        });
      });

      // If this is the active chat, update visible messages
      if (activeContactId === incomingMsg.chatId || activeContactId === incomingMsg.sender?.username) {
        setLocalMessages(prev => {
          if (prev.some(m => m.id === incomingMsg.id)) return prev;
          return [...prev, msgModel];
        });
        setIsTyping(false); // Stop typing on message receive
      }
    });

    const offTyping = on('typing', (data: any) => {
      // console.log('[ChatContainer] Incoming typing event:', data);
      
      // If we are recipient (data.chatId is US) and the sender IS the one we are currently viewing
      const isChattingWithSender = data.username === activeContactId && data.chatId === user?.username;
      
      // Special case for system bot
      const isBotTyping = data.username === 'system' && data.chatId === user?.username;

      if (isChattingWithSender || isBotTyping) {
        setIsTyping(data.isTyping);
      }
    });

    return () => {
      offMsg();
      offTyping();
    };
  }, [on, activeContactId, user?.username]);

  const handleSelectContact = (id: string) => {
    // Check if the contact is already in our list
    let contact = localContacts.find((c: Chat) => c.id === id);
    
    // If NOT in our list (clicked from "New Contacts" search), we must create it!
    if (!contact) {
      const newUser = userList.find((u: any) => u.username === id);
      if (newUser) {
        contact = new Chat({
          id: newUser.username,
          name: newUser.displayName,
          avatar: newUser.avatar,
          updatedAt: Date.now(),
          messages: [],
          isOnline: true, // Mock online status for now
          unreadCount: 0
        });

        const updatedContacts = [contact, ...localContacts];
        setLocalContacts(updatedContacts);

        // Persist to session so it stays in the list!
        if (session) {
          const updatedChatList = [contact, ...(session.chatList || [])];
          updateSession(new Session({ ...session, chatList: updatedChatList }));
        }
      }
    }

    setActiveContactId(id);
    setLocalMessages(contact?.messages || []);
    setIsTyping(false);
    
    // Clear unread on select (if it was an existing contact)
    if (contact && contact.unreadCount > 0) {
      setLocalContacts(prev => prev.map(c => c.id === id ? { ...c, unreadCount: 0 } as Chat : c));
    }
  };

  const handleSendMessage = (text: string) => {
    if (!text.trim() || !activeContactId) return;
    
    const messageData = {
      id: Date.now().toString(),
      chatId: activeContactId,
      sender: { 
        username: user?.username, 
        displayName: user?.displayName,
        avatar: user?.avatar 
      },
      content: text,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    // Update local state immediately for instant feedback
    const newMessage = new ChatMessageModel({
      id: messageData.id,
      sender: user || undefined,
      content: text,
      timestamp: messageData.timestamp,
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

    // Emit via socket for others
    emit('message', messageData);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full text-armoyu-text-muted bg-armoyu-card-bg rounded-3xl border border-gray-200 dark:border-white/10">
        Sohbetleri görmek için giriş yapmalısınız.
      </div>
    );
  }

  const activeContact = activeContactId ? localContacts.find((c: Chat) => c.id === activeContactId) : null;

  return (
    <div className="flex h-full w-full bg-armoyu-header-bg overflow-hidden relative z-10">

      {/* Görünüm 1: Sohbet Listesi (Biri seçili değilse tam ekran gösterilir) */}
      {!activeContactId && (
        <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
          <ChatList contacts={localContacts} activeId={''} onSelect={handleSelectContact} />
        </div>
      )}

      {/* Görünüm 2: Seçilen Sohbet Paneli (İçerik) */}
      {activeContactId && activeContact && (
        <div className="w-full h-full flex flex-col bg-armoyu-bg relative animate-in fade-in slide-in-from-right-4 duration-300">

          {/* İçerik Header */}
          <div className="h-[76px] border-b border-gray-200 dark:border-white/5 bg-armoyu-card-bg flex items-center px-4 gap-3 z-10 shrink-0">

            {/* Listeye Geri Dönüş butonu! */}
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
              <button className="p-2 text-armoyu-text-muted hover:text-blue-500 rounded-full hover:bg-blue-500/10 transition-colors" title="Ara">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
              </button>
              <button onClick={closeChat} className="p-2 text-armoyu-text-muted hover:text-red-500 rounded-full hover:bg-red-500/10 transition-colors" title="Sohbeti Kapat">
                <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-2 relative hide-scrollbar">
            <div className="text-center mb-8">
              <span className="inline-block bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-xs font-bold px-3 py-1 rounded-full border border-black/5 dark:border-white/5">
                Bugün
              </span>
            </div>

            {localMessages.map(msg => (
              <ChatMessage 
                key={msg.id} 
                id={msg.id}
                sender={{
                  name: msg.sender?.displayName || 'Bilinmiyor',
                  avatar: msg.sender?.avatar || '',
                  isSelf: msg.sender?.username === user?.username
                }}
                content={msg.content}
                timestamp={msg.timestamp}
              />
            ))}

            {isTyping && (
              <div className="flex gap-2 items-center px-4 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex gap-0.5 mt-0.5">
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1 h-1 rounded-full bg-blue-500 animate-bounce"></span>
                  </div>
                  <span className="text-[10px] font-bold text-armoyu-text-muted italic ml-1">Yazıyor...</span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} className="h-2" />
          </div>

          {/* Input Area */}
          <ChatInput onSend={handleSendMessage} chatId={activeContactId} />

        </div>
      )}

    </div>
  );
}

