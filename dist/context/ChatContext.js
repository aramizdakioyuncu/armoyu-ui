'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState, useCallback } from 'react';
import { Chat, ChatMessage } from '@armoyu/core';
import { useArmoyu } from './ArmoyuContext';
const ChatContext = createContext(undefined);
export function ChatProvider({ children }) {
    const { api, apiKey } = useArmoyu();
    const [isChatOpen, setIsChatOpen] = useState(false);
    const [isLiveMode, setIsLiveMode] = useState(false);
    const [chatList, setChatList] = useState([]);
    const [activeMessages, setActiveMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
    const fetchChatList = useCallback(async () => {
        if (!isLiveMode || apiKey === 'armoyu_showcase_key')
            return;
        setIsLoading(true);
        try {
            const response = await api.chat.getFriendsChat(1);
            console.log("[ChatContext] Raw Chat List Response:", response);
            const data = Array.isArray(response) ? response : (response?.icerik || response?.liste || response?.arkadaslar || response?.veriler || []);
            if (Array.isArray(data)) {
                setChatList(data.map((c) => Chat.fromJSON(c)));
            }
        }
        catch (error) {
            console.error("[ChatContext] Fetch chats failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    }, [api, isLiveMode, apiKey]);
    const fetchMessages = useCallback(async (userId, page = 1) => {
        if (!isLiveMode || apiKey === 'armoyu_showcase_key')
            return;
        setIsLoading(true);
        try {
            // Diagnostic log before API call
            console.log(`[ChatContext] Calling fetchMessages for userId: ${userId} (Type: ${typeof userId})`);
            const response = await api.chat.getChatHistory(page, { userId });
            console.log(`[ChatContext] Raw Messages Response (User: ${userId}):`, response);
            const data = Array.isArray(response) ? response : (response?.icerik || response?.liste || response?.sohbetler || response?.veriler || []);
            if (Array.isArray(data)) {
                const msgs = data.map((m) => ChatMessage.fromJSON(m));
                setActiveMessages(page === 1 ? msgs : (prev) => [...msgs, ...prev]);
            }
        }
        catch (error) {
            console.error("[ChatContext] Fetch messages failed:", error);
        }
        finally {
            setIsLoading(false);
        }
    }, [api, isLiveMode, apiKey]);
    const sendMessage = useCallback(async (userId, content) => {
        if (!isLiveMode || apiKey === 'armoyu_showcase_key')
            return false;
        try {
            const result = await api.chat.sendMessage({ userId, content });
            return result && result.durum === 1;
        }
        catch (error) {
            console.error("[ChatContext] Send message failed:", error);
            return false;
        }
    }, [api, isLiveMode, apiKey]);
    const setLiveMode = (isLive) => {
        setIsLiveMode(isLive);
        if (!isLive) {
            setChatList([]);
            setActiveMessages([]);
        }
    };
    return (_jsx(ChatContext.Provider, { value: {
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
        }, children: children }));
}
export function useChat() {
    const context = useContext(ChatContext);
    if (!context)
        throw new Error('useChat must be used within ChatProvider');
    return context;
}
//# sourceMappingURL=ChatContext.js.map