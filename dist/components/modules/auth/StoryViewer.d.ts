import React from 'react';
import { Story } from '@armoyu/core';
interface StoryViewerProps {
    stories: Story[];
    initialStoryIndex: number;
    onClose: () => void;
}
export declare function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps): React.ReactPortal;
export {};
//# sourceMappingURL=StoryViewer.d.ts.map