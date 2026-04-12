import { PostMedia } from './MediaLightbox';
import { User } from '@armoyu/core';
export interface PostCardProps {
    id: string;
    author: User | null;
    content: string;
    imageUrl?: string;
    media?: PostMedia[];
    createdAt: string;
    stats: {
        likes: number;
        comments: number;
        reposts?: number;
        shares: number;
    };
    hashtags?: string[];
    onTagClick?: (tag: string) => void;
    isPending?: boolean;
    likeList?: User[];
    repostList?: User[];
    commentList?: any[];
    repostOf?: any;
    profilePrefix?: string;
}
export declare function PostCard({ id, author, content, imageUrl, media, createdAt, stats, hashtags, onTagClick, isPending, likeList, repostList, commentList, repostOf, profilePrefix }: PostCardProps): import("react/jsx-runtime").JSX.Element | null;
//# sourceMappingURL=PostCard.d.ts.map