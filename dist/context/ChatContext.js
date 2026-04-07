'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useState } from 'react';
const ChatContext = createContext(undefined);
export function ChatProvider({ children }) {
    const [isChatOpen, setIsChatOpen] = useState(false);
    const toggleChat = () => setIsChatOpen(!isChatOpen);
    const openChat = () => setIsChatOpen(true);
    const closeChat = () => setIsChatOpen(false);
    return (_jsx(ChatContext.Provider, { value: { isChatOpen, toggleChat, openChat, closeChat }, children: children }));
}
export function useChat() {
    const context = useContext(ChatContext);
    if (!context)
        throw new Error('useChat must be used within ChatProvider');
    return context;
}
//# sourceMappingURL=ChatContext.js.map