import React from 'react';
export interface ForumBoardProps {
    id: string;
    name: string;
    desc: string;
    topicCount: number;
    postCount: number;
    lastPost?: {
        topicTitle: string;
        author: string;
        avatar: string;
        time: string;
    };
    icon?: React.ReactNode;
}
export declare function ForumBoard({ id, name, desc, topicCount, postCount, lastPost, icon }: ForumBoardProps): import("react/jsx-runtime").JSX.Element;
//# sourceMappingURL=ForumBoard.d.ts.map