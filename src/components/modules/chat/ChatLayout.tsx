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
  userList,
  VoiceCallWidget
} from '../../../index';

// Module specific widgets
import { ChatList } from './widgets/ChatList';
import { ChatMessage } from './widgets/ChatMessage';
import { ChatInput } from './widgets/ChatInput';

interface ChatLayoutProps {
  onVoiceCall?: (contact: Chat) => void;
  onAvatarClick?: (contact: Chat) => void;
}

export function ChatLayout({ onVoiceCall, onAvatarClick }: ChatLayoutProps = {}) {
  const { user, session } = useAuth();
  const { setMockEnabled } = useArmoyu();
  const { isChatOpen, closeChat, isLiveMode, setLiveMode, chatList: liveContacts, searchResults, setChatList, activeMessages, setActiveMessages, fetchMessages, fetchChatList, sendMessage: sendApiMessage } = useChat();
  const { emit, on, isConnected } = useSocket();

  const isChatOpenRef = React.useRef(isChatOpen);
  useEffect(() => {
    isChatOpenRef.current = isChatOpen;
  }, [isChatOpen]);

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
  const [typingUsers, setTypingUsers] = useState<{ username: string; avatar?: string }[]>([]);
  const [isSearchVisible, setIsSearchVisible] = useState(false);
  const [msgSearchQuery, setMsgSearchQuery] = useState('');
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);
  const isFirstRender = React.useRef(true);

  // Call State
  const [activeCall, setActiveCall] = useState<{
    caller: { username: string; displayName: string; avatar: string };
    recipient: { username: string; displayName: string; avatar: string };
    isIncoming: boolean;
    status: 'ringing' | 'connected' | 'rejected' | 'hung_up' | 'busy';
  } | null>(null);

  // Handle call response callbacks
  const handleAcceptCall = useCallback(() => {
    if (!activeCall) return;
    const acceptData = {
      caller: activeCall.caller,
      recipientUsername: activeCall.caller.username,
      recipient: activeCall.recipient,
      status: 'accepted'
    };
    emit('chat_call', acceptData);
    setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
  }, [activeCall, emit]);

  const handleDeclineCall = useCallback(() => {
    if (!activeCall) return;
    const declineData = {
      caller: activeCall.caller,
      recipientUsername: activeCall.caller.username,
      recipient: activeCall.recipient,
      status: 'rejected'
    };
    emit('chat_call', declineData);
    setActiveCall(prev => prev ? { ...prev, status: 'rejected' } : null);
    setTimeout(() => setActiveCall(null), 1500);
  }, [activeCall, emit]);

  const handleHangUpCall = useCallback(() => {
    if (!activeCall) return;
    const targetUsername = activeCall.isIncoming ? activeCall.caller.username : activeCall.recipient.username;
    const hangupData = {
      caller: activeCall.caller,
      recipientUsername: targetUsername,
      recipient: activeCall.recipient,
      status: 'hung_up'
    };
    emit('chat_call', hangupData);
    setActiveCall(prev => prev ? { ...prev, status: 'hung_up' } : null);
    setTimeout(() => setActiveCall(null), 1500);
  }, [activeCall, emit]);

  // Listen for socket call events
  useEffect(() => {
    if (!on) return;

    const offCall = on('chat_call', (data: any) => {
      console.log('[Socket] Incoming call event:', data);

      if (data.status === 'ringing') {
        if (user && data.recipientUsername === user.username) {
          if (activeCall && activeCall.status === 'connected') {
            emit('chat_call', {
              caller: data.caller,
              recipientUsername: data.caller.username,
              recipient: data.recipient,
              status: 'busy'
            });
            return;
          }
          setActiveCall({
            caller: data.caller,
            recipient: data.recipient,
            isIncoming: true,
            status: 'ringing'
          });
        }
      } else if (data.status === 'accepted') {
        if (activeCall && !activeCall.isIncoming && activeCall.status === 'ringing') {
          setActiveCall(prev => prev ? { ...prev, status: 'connected' } : null);
        }
      } else if (data.status === 'rejected') {
        if (activeCall && !activeCall.isIncoming && activeCall.status === 'ringing') {
          setActiveCall(prev => prev ? { ...prev, status: 'rejected' } : null);
          setTimeout(() => setActiveCall(null), 1500);
        }
      } else if (data.status === 'busy') {
        if (activeCall && !activeCall.isIncoming && activeCall.status === 'ringing') {
          setActiveCall(prev => prev ? { ...prev, status: 'busy' } : null);
          setTimeout(() => setActiveCall(null), 1500);
        }
      } else if (data.status === 'hung_up') {
        setActiveCall(prev => prev ? { ...prev, status: 'hung_up' } : null);
        setTimeout(() => setActiveCall(null), 1500);
      }
    });

    return () => {
      offCall();
    };
  }, [on, user, activeCall, emit]);

  // Soket bağlantısı sağlandığında sunucuya kayıt ol
  useEffect(() => {
    if (isConnected && user?.id) {
      emit('register_user', {
        userId: user.id,
        username: user.username
      });
      console.log(`[Socket] Kayıt isteği gönderildi: ${user.username} (${user.id})`);
    }
  }, [isConnected, user, emit]);

  // Tarihleri karşılaştırmak ve "Bugün", "Dün" gibi etiketler üretmek için yardımcı fonksiyon
  const getDateLabel = (dateStr: string) => {
    try {
      if (!dateStr) return null;
      
      const date = new Date(dateStr);
      if (isNaN(date.getTime())) return dateStr; // Geçersiz tarihse olduğu gibi bırak

      const today = new Date();

      if (date.toDateString() === today.toDateString()) return 'Bugün';

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
      // Find the contact in the list (or search results) to get its chatType and raw ID
      const contact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === activeContactId);
      
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

  const playNotificationSound = () => {
    try {
      const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      const osc = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      osc.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      osc.type = 'sine';
      const now = audioContext.currentTime;
      
      // Ping 1 (587.33Hz - D5)
      osc.frequency.setValueAtTime(587.33, now);
      gainNode.gain.setValueAtTime(0, now);
      gainNode.gain.linearRampToValueAtTime(0.06, now + 0.04);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
      
      // Ping 2 (880Hz - A5)
      osc.frequency.setValueAtTime(880, now + 0.1);
      gainNode.gain.setValueAtTime(0.06, now + 0.1);
      gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      
      osc.start(now);
      osc.stop(now + 0.35);
    } catch (err) {
      console.warn("Ses çalınamadı:", err);
    }
  };

  useEffect(() => {
    const offMsg = on('chat_message', (incomingMsg: any) => {
      console.log(`[Socket] Yeni mesaj alındı (ID: ${incomingMsg.id})`);

      // Optimistic Update: Ignore if we just sent this message
      if (incomingMsg.sender?.username === user?.username) {
        return;
      }

      // Check if we are actively chatting with the sender or group
      const currentActiveContact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === activeContactId);
      const isGroup = incomingMsg.chatType === 'grup' || String(incomingMsg.chatId) === '0';
      const isChattingWithSender = currentActiveContact && (
        isGroup 
          ? (currentActiveContact.chatType === 'grup' && (String(incomingMsg.chatId) === currentActiveContact.id || (incomingMsg.chatName && currentActiveContact.name === incomingMsg.chatName)))
          : (currentActiveContact.chatType !== 'grup' && (
              String(incomingMsg.sender?.id) === currentActiveContact.id || 
              incomingMsg.sender?.username === currentActiveContact.username ||
              incomingMsg.sender?.username === currentActiveContact.id
            ))
      );

      // Play sound if not active in this chat or if chat list is closed
      if (!isChatOpenRef.current || !isChattingWithSender) {
        playNotificationSound();
      }

      const msgModel = ChatMessageModel.fromAPI(incomingMsg);

      // 1. UPDATE GLOBAL CHAT LIST CACHE (For both Live and Mock modes)
      setChatList(prev => {
        const contactId = String(incomingMsg.chatId);
        const senderUsername = incomingMsg.sender?.username;
        const isGroupMsg = incomingMsg.chatType === 'grup' || contactId === '0';
        
        // EŞLEŞTİRME MANTIĞI: c.id (örn: 12138) veya c.username (örn: kkadirgumus) eşleşiyorsa bu sohbet mevcuttur!
        const matched = prev.filter(c => {
          if (isGroupMsg) {
            return c.chatType === 'grup' && (c.id === contactId || (incomingMsg.chatName && c.name === incomingMsg.chatName));
          }
          return c.chatType !== 'grup' && (c.id === String(incomingMsg.sender?.id) || c.username === senderUsername || c.id === senderUsername);
        });

        console.log(`[Socket] Etkilenen Sohbet Sayısı: ${matched.length}`);
        matched.forEach(c => {
          console.log(`[Socket] Etkilenen Sohbet Bilgisi -> Ad: ${c.name}, ID: ${c.id}, Tip: ${c.chatType}`);
        });

        const exists = matched.length > 0;

        // Eğer listede yoksa ve kendi mesajımız değilse YENİDEN OLUŞTUR (Sohbeti silenler için)
        if (!exists && senderUsername && senderUsername !== user?.username) {
          const finalId = isGroupMsg ? contactId : (incomingMsg.sender?.id || senderUsername);
          
          const newChat = new Chat({
            id: finalId,
            uid: isGroupMsg ? `grup-${finalId}` : `ozel-${finalId}`,
            username: isGroupMsg ? '' : senderUsername,
            name: isGroupMsg ? (incomingMsg.chatName || 'Grup Sohbeti') : (incomingMsg.sender?.displayName || senderUsername),
            avatar: isGroupMsg ? '' : (incomingMsg.sender?.avatar || ''),
            lastMessage: msgModel,
            time: msgModel.timestamp,
            updatedAt: Date.now(),
            messages: [msgModel],
            unreadCount: (activeContactId !== (isGroupMsg ? `grup-${finalId}` : `ozel-${finalId}`)) ? 1 : 0,
            isOnline: !isGroupMsg,
            chatType: isGroupMsg ? 'grup' : 'ozel'
          });
          return [newChat, ...prev];
        }

        // Varsa mevcut olanı güncelle
        return prev.map(c => {
          const isMatch = isGroupMsg 
            ? (c.chatType === 'grup' && (c.id === contactId || (incomingMsg.chatName && c.name === incomingMsg.chatName)))
            : (c.chatType !== 'grup' && (c.id === String(incomingMsg.sender?.id) || c.username === senderUsername || c.id === senderUsername));

          if (isMatch) {
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

      // 2. UPDATE ACTIVE MESSAGES IF OPEN
      if (isChattingWithSender) {
        setTypingUsers(prev => {
          const filtered = prev.filter(u => u.username !== incomingMsg.sender?.username);
          setIsTyping(filtered.length > 0);
          return filtered;
        });
        setActiveMessages(prev => {
          if (prev.some(m => m.id === msgModel.id)) return prev;
          return [...prev, msgModel];
        });
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

      if (incomingMsg.sender?.username) {
        setTypingUsers(prev => {
          const filtered = prev.filter(u => u.username !== incomingMsg.sender.username);
          setIsTyping(filtered.length > 0);
          return filtered;
        });
      }
    });

    const offTyping = on('chat_typing', (data: any) => {
      const currentActiveContact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === activeContactId);
      if (!currentActiveContact) return;

      const isGroupChat = currentActiveContact.chatType === 'grup' || currentActiveContact.id === '0';
      const isTypingHere = isGroupChat
        ? ((String(data.chatId) === currentActiveContact.id || data.chatId === currentActiveContact.username) && data.username !== user?.username)
        : (data.username === currentActiveContact.username && data.chatId === user?.username);

      const isBotTyping = data.username === 'system' && data.chatId === user?.username;

      if (isTypingHere || isBotTyping) {
        if (data.isTyping) {
          setTypingUsers(prev => {
            if (prev.some(u => u.username === data.username)) return prev;
            const updated = [...prev, {
              username: data.username,
              avatar: data.avatar || (isBotTyping ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=System' : currentActiveContact.avatar)
            }];
            setIsTyping(true);
            return updated;
          });
        } else {
          setTypingUsers(prev => {
            const updated = prev.filter(u => u.username !== data.username);
            setIsTyping(updated.length > 0);
            return updated;
          });
        }
      }
    });

    return () => {
      offMsg();
      offTyping();
    };
  }, [on, activeContactId, user?.username, isLiveMode]);

  const handleSelectContact = (uid: string) => {
    const contact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === uid);
    
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
    setTypingUsers([]);
  };

  const handleSendMessage = async (text: string) => {
    if (!text.trim() || !activeContactId) return;

    if (isLiveMode) {
      const contact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === activeContactId);
      
      // Optimistic Update: Anında UI'a ekle ki bekleme olmasın
      const newMessage = new ChatMessageModel({
        id: Date.now().toString(),
        sender: user as unknown as User,
        content: text,
        timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
        fullDate: new Date().toISOString(),
        isSystem: false,
        isSelf: true
      });
      setActiveMessages(prev => [...prev, newMessage]);
      
      // Global chat list'in son mesajını da anında güncelle
      setChatList(prev => prev.map(c => {
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

    const currentContact = (isLiveMode ? [...liveContacts, ...searchResults] : localContacts).find(c => c.uid === activeContactId);
    
    // Eğer contact listede yoksa (örn. arama sonuçlarından seçilmişse), activeContactId "ozel-11107" gibi gelir. 
    // ID kısmını ayıklayıp göndermeliyiz.
    const finalChatId = currentContact?.id || activeContactId.replace('ozel-', '').replace('grup-', '');

    emit('chat_message', {
      id: Date.now().toString(),
      chatId: finalChatId,
      chatType: currentContact?.chatType || (activeContactId.startsWith('grup-') ? 'grup' : 'ozel'),
      chatName: currentContact?.name || '',
      sender: { 
        id: user?.id,
        username: user?.username, 
        displayName: (user as any)?.getName?.() || user?.displayName || user?.username,
        avatar: user?.avatar 
      },
      content: text,
      timestamp: new Date().toLocaleTimeString('tr-TR', { hour: '2-digit', minute: '2-digit' }),
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

  const currentContacts = isLiveMode ? [...liveContacts, ...searchResults] : localContacts;
  const activeContact = activeContactId ? currentContacts.find((c: Chat) => c.uid === activeContactId) : null;

  return (
    <div className="flex h-full w-full overflow-hidden relative z-10">

      {!activeContactId && (
        <div className="w-full h-full flex flex-col animate-in fade-in slide-in-from-left-4 duration-300">
          <div className="p-4 border-b border-gray-200 dark:border-white/5 flex items-center justify-between shrink-0">
            <h2 className="font-black text-armoyu-text uppercase tracking-widest text-sm">Sohbetler</h2>
          </div>
          <ChatList contacts={currentContacts} activeId={activeContactId || ''} onSelect={handleSelectContact} className="flex-1 min-h-0" />
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

            <img 
               src={activeContact.avatar} 
               onClick={() => {
                 if (onAvatarClick) {
                   onAvatarClick(activeContact);
                 } else {
                   alert(`${activeContact.name} profil sayfası açılıyor (ID: ${activeContact.id}, Username: ${activeContact.username}).`);
                 }
               }}
               className="w-10 h-10 rounded-full border border-black/5 dark:border-white/10 shadow-sm cursor-pointer hover:opacity-80 transition-opacity" 
               alt="" 
             />
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
                onClick={() => {
                  if (activeContact) {
                    const callData = {
                      caller: {
                        username: user?.username || 'user',
                        displayName: user?.displayName || 'Kullanıcı',
                        avatar: user?.avatar || 'https://api.dicebear.com/7.x/avataaars/svg'
                      },
                      recipientUsername: activeContact.username || activeContact.id,
                      recipient: {
                        username: activeContact.username || activeContact.id,
                        displayName: activeContact.name,
                        avatar: activeContact.avatar
                      },
                      status: 'ringing'
                    };
                    emit('chat_call', callData);
                    setActiveCall({
                      caller: callData.caller,
                      recipient: callData.recipient,
                      isIncoming: false,
                      status: 'ringing'
                    });
                  }
                }}
                className="p-2 text-armoyu-text-muted hover:text-emerald-500 rounded-full hover:bg-emerald-500/10 transition-colors" 
                title="Sesli Arama Başlat"
              >
                <Phone className="w-5 h-5" />
              </button>
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
            {typingUsers.length > 0 && (
              <div className="flex gap-2 items-center px-4 mb-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="flex -space-x-2 overflow-hidden shrink-0">
                  {typingUsers.slice(0, 3).map((tUser, idx) => (
                    <img
                      key={tUser.username}
                      src={tUser.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anonymous'}
                      alt={tUser.username}
                      className="inline-block w-6 h-6 rounded-full ring-2 ring-white dark:ring-[#0a0a0e] object-cover bg-white/5"
                      style={{ zIndex: 10 - idx }}
                      onError={(e) => { (e.target as HTMLImageElement).src = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Anonymous' }}
                    />
                  ))}
                  {typingUsers.length > 3 && (
                    <div className="flex items-center justify-center w-6 h-6 rounded-full bg-armoyu-primary text-white text-[8px] font-black ring-2 ring-white dark:ring-[#0a0a0e] z-0">
                      +{typingUsers.length - 3}
                    </div>
                  )}
                </div>
                <div className="flex gap-1 items-center bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-2xl border border-black/5 dark:border-white/5">
                  <div className="flex gap-0.5 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.3s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-armoyu-primary animate-bounce [animation-delay:-0.15s]"></span>
                    <span className="w-1.5 h-1.5 rounded-full bg-armoyu-primary animate-bounce"></span>
                  </div>
                </div>
              </div>
            )}

            {(() => {
              const msgs = (isLiveMode ? activeMessages : localMessages)
                .filter(m => m.content.toLowerCase().includes(msgSearchQuery.toLowerCase()));
              
              // Mesajları günlere göre gruplayalım
              interface MessageGroup {
                dateKey: string;
                dateLabel: string;
                messages: typeof msgs;
              }
              const groups: MessageGroup[] = [];
              let currentGroup: MessageGroup | null = null;

              msgs.forEach(msg => {
                const dateKey = new Date(msg.fullDate).toDateString();
                const label = getDateLabel(msg.fullDate) || '';

                if (!currentGroup || currentGroup.dateKey !== dateKey) {
                  currentGroup = {
                    dateKey,
                    dateLabel: label,
                    messages: []
                  };
                  groups.push(currentGroup);
                }
                currentGroup.messages.push(msg);
              });

              // flex-col-reverse kullandığımız için:
              // Yeni günün grubu DOM'da ilk sırada (dolayısıyla ekranda en altta) olmalı.
              // Bu yüzden grupları ters çevirip basıyoruz.
              return groups.reverse().map(group => (
                <div key={`group-${group.dateKey}`} className="flex flex-col gap-2">
                  {/* Tarih Etiketi: Sadece bu grubun (günün) üst sınırlarında sticky olacak */}
                  <div className="flex justify-center my-4 sticky top-0 z-10">
                    <span className="px-4 py-1.5 rounded-full bg-black/5 dark:bg-white/5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted border border-black/5 dark:border-white/5 backdrop-blur-md">
                      {group.dateLabel}
                    </span>
                  </div>

                  {/* Günün mesajları: Normal yukarıdan aşağıya (kronolojik) dizilim */}
                  {group.messages.map(msg => (
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
                </div>
              ));
            })()}
          </div>

          <ChatInput 
            onSend={handleSendMessage} 
            chatId={
              (activeContact?.chatType === 'grup' || activeContact?.id === '0')
                ? activeContact?.id?.toString()
                : (activeContact?.username || activeContact?.id?.toString())
            } 
          />
        </div>
      )}

      {activeCall && (
        <VoiceCallWidget
          caller={activeCall.caller}
          recipient={activeCall.recipient}
          isIncoming={activeCall.isIncoming}
          status={activeCall.status}
          onAccept={handleAcceptCall}
          onDecline={handleDeclineCall}
          onHangUp={handleHangUpCall}
        />
      )}

    </div>
  );
}
