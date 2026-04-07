export interface TopicItemProps {
    id: string;
    boardId: string;
    title: string;
    author: string;
    authorAvatar: string;
    replies: number;
    views: number;
    lastActivity: string;
    lastAuthor: string;
    isPinned?: boolean;
    isHot?: boolean;
    isSolved?: boolean;
}
export declare function TopicItem({ id, boardId, title, author, authorAvatar, replies, views, lastActivity, lastAuthor, isPinned, isHot, isSolved }: TopicItemProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=TopicItem.d.ts.map