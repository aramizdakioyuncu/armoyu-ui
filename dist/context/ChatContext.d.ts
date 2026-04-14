import React from 'react';
import { Chat, ChatMessage } from '@armoyu/core';
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
export declare function ChatProvider({ children }: {
    children: React.ReactNode;
}): import("react/jsx-runtime").JSX.Element;
export declare function useChat(): ChatContextType;
export {};
//# sourceMappingURL=ChatContext.d.ts.map