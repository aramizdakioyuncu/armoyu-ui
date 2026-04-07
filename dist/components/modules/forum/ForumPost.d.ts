export interface ForumPostProps {
    id: string;
    author: string;
    authorAvatar: string;
    authorRank: string;
    authorRankColor: string;
    authorJoined: string;
    authorPosts: number;
    content: string;
    time: string;
    isMainPost?: boolean;
}
export declare function ForumPost({ author, authorAvatar, authorRank, authorRankColor, authorJoined, authorPosts, content, time, isMainPost }: ForumPostProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ForumPost.d.ts.map