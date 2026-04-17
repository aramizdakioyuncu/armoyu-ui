import React, { createContext, useContext, useState, useCallback } from 'react';
import { Chat } from '../models/social/chat/Chat';
import { ChatMessage } from '../models/social/chat/Message';
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
  
  fetchChatList: () => Promise<void>;
  fetchMessages: (userId: number, page?: number) => Promise<void>;
  sendMessage: (userId: number, content: string) => Promise<boolean>;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({ children }: { children: React.ReactNode }) {
  const { api, apiKey } = useArmoyu();
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [chatList, setChatList] = useState<Chat[]>([]);
  const [activeMessages, setActiveMessages] = useState<ChatMessage[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const toggleChat = () => setIsChatOpen(!isChatOpen);
  const openChat = () => setIsChatOpen(true);
  const closeChat = () => setIsChatOpen(false);

  const fetchChatList = useCallback(async () => {
    if (!isLiveMode || apiKey === 'armoyu_showcase_key') return;
    
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
  }, [api, isLiveMode, apiKey]);

  const fetchMessages = useCallback(async (userId: number, page: number = 1) => {
    if (!isLiveMode || apiKey === 'armoyu_showcase_key') return;

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
  }, [api, isLiveMode, apiKey]);

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
