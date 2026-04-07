import { User } from '@armoyu/core';
import { PostMedia } from './MediaLightbox';
interface RepostModalProps {
    isOpen: boolean;
    onClose: () => void;
    post: {
        id: string;
        author: User;
        content: string;
        media?: PostMedia[];
        createdAt: string;
        stats?: {
            likes: number;
            comments: number;
            reposts?: number;
            shares: number;
        };
    };
}
export declare function RepostModal({ isOpen, onClose, post }: RepostModalProps): import("react/jsx-runtime").JSX.Element | null;
export {};
//# sourceMappingURL=RepostModal.d.ts.map