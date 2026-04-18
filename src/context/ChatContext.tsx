import React, { createContext, useContext, useState, useCallback } from 'react';
import { Chat } from '../models/social/chat/Chat';
import { ChatMessage } from '../models/social/chat/Message';
import { User } from '../models/auth/User';
import { useArmoyu } from './ArmoyuContext';

interface ChatContextType {
  isChatOpen: boolean;
  isLiveMode: boolean;
  chatList: Chat[];
  activeMessages: ChatMessage[];
  isLoading: boolean;
  
  toggleChat: () => void;
  openChat: () => void;
  closeChat: () => void;
  setLiveMode: (isLive: boolean) => void;
  
  fetchChatList: (forced?: boolean) => Promise<void>;
  fetchMessages: (userId: number, page?: number, forced?: boolean) => Promise<void>;
  sendMessage: (userId: number, content: string) => Promise<boolean>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { api, apiKey, isMockEnabled } = useArmoyu();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);
 
  const fetchChatList = useCallback(async (forced: boolean = false) => {
    if (isMockEnabled && !forced) {
      // Mock Chat List for Showcase
      setChatList([
        new Chat({ 
          id: '1', 
          name: 'Berkay Tikenoğlu', 
          lastMessage: new ChatMessage({ content: 'Hocam veriler selamlar!' }), 
          unreadCount: 2, 
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=BT' 
        }),
        new Chat({ 
          id: '2', 
          name: 'MythX Destek', 
          lastMessage: new ChatMessage({ content: 'Tabii, hemen yardımcı olalım.' }), 
          unreadCount: 0, 
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MX' 
        }),
        new Chat({ 
          id: '3', 
          name: 'Minecraft Grubu', 
          lastMessage: new ChatMessage({ content: 'Yarın akşam 20:00 etkinlik var.' }), 
          unreadCount: 5, 
          avatar: 'https://api.dicebear.com/7.x/initials/svg?seed=MG' 
        }),
      ]);
      return;
    }
    
    if (!isLiveMode && !forced) return;
    
    setIsLoading(true);
    try {
      const response = await api.chat.getFriendsChat(1);
      
      const data = response.icerik || [];
      if (Array.isArray(data)) {
        setChatList(data.map((c: any) => Chat.fromAPI(c)));
      }
    } catch (error) {
      console.error("[ChatContext] Fetch chats failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [api, isLiveMode, isMockEnabled]);

  const fetchMessages = useCallback(async (userId: number, page: number = 1, forced: boolean = false) => {
    if (isMockEnabled && !forced) {
      // Mock Messages for Showcase
      const mockUser = new User({ displayName: 'Berkay Tikenoğlu', username: 'berkay' });
      const systemUser = new User({ displayName: 'Sistem', username: 'sistem' });

      const mockMsgs = [
        new ChatMessage({ id: 'm1', sender: mockUser, content: 'Selamlar hocam!', timestamp: '12:45' }),
        new ChatMessage({ id: 'm2', sender: systemUser, content: 'Aleykümselam, hoş geldin.', timestamp: '12:46' }),
        new ChatMessage({ id: 'm3', sender: mockUser, content: 'Vitrin modu test verileri bunlar.', timestamp: '12:47' }),
        new ChatMessage({ id: 'm4', sender: systemUser, content: 'Harika görünüyor, eline sağlık!', timestamp: '12:48' }),
      ];
      setActiveMessages(page === 1 ? mockMsgs : [...mockMsgs, ...activeMessages]);
      return;
    }

    if (!isLiveMode && !forced) return;

    setIsLoading(true);
    try {
      const response = await api.chat.getChatHistory(page, { userId });

      const data = response.icerik || [];
      
      if (Array.isArray(data)) {
        const msgs = data.map((m: any) => ChatMessage.fromAPI(m));
        setActiveMessages(prev => (page === 1 ? msgs : [...msgs, ...prev]));
      }
    } catch (error) {
      console.error("[ChatContext] Fetch messages failed:", error);
    } finally {
      setIsLoading(false);
    }
  }, [api, isLiveMode, isMockEnabled, activeMessages]);

  const sendMessage = useCallback(async (userId: number, content: string) => {
    if (!isLiveMode || apiKey === 'armoyu_showcase_key') return false;

    try {
      const response = await api.chat.sendMessage({ userId, content });
      return response.durum === 1;
    } catch (error) {
      console.error("[ChatContext] Send message failed:", error);
      return false;
    }
  }, [api, isLiveMode, apiKey]);

  const setLiveMode = (isLive: boolean) => {
    setIsLiveMode(isLive);
    if (!isLive) {
      setChatList([]);
      setActiveMessages([]);
    }
  };

  return (
    <ChatContext.Provider value={{ 
      isChatOpen, 
      isLiveMode,
      chatList,
      activeMessages,
      isLoading,
      toggleChat, 
      openChat, 
      closeChat,
      setLiveMode,
      fetchChatList,
      fetchMessages,
      sendMessage
    }}>
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (!context) throw new Error('useChat must be used within ChatProvider');
  return context;
}
