export interface ChatMessageProps {
    id: string;
    sender: {
        name: string;
        avatar: string;
        isSelf: boolean;
    };
    content: string;
    timestamp: string;
}
export declare function ChatMessage({ sender, content, timestamp }: ChatMessageProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ChatMessage.d.ts.map