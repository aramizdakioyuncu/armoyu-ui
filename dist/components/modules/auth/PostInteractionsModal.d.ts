import { User } from '@armoyu/core';
interface PostInteractionsModalProps {
    isOpen: boolean;
    onClose: () => void;
    title?: string;
    likes?: User[];
    reposts?: User[];
    defaultTab?: 'likes' | 'reposts';
}
export declare function PostInteractionsModal({ isOpen, onClose, title, likes, reposts, defaultTab }: PostInteractionsModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=PostInteractionsModal.d.ts.map