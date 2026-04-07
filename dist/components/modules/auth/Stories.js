import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { MOCK_STORIES } from '../../../lib/constants/seedData';
import { StoryViewer } from './StoryViewer';
export function Stories() {
    const [activeStoryIndex, setActiveStoryIndex] = useState(null);
    return (_jsxs("div", { className: "w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm overflow-hidden mb-6", children: [_jsx("div", { className: "flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1", children: MOCK_STORIES.map((story, idx) => (_jsx(StoryItem, { story: story, onClick: () => setActiveStoryIndex(idx) }, story.id))) }), activeStoryIndex !== null && (_jsx(StoryViewer, { stories: MOCK_STORIES, initialStoryIndex: activeStoryIndex, onClose: () => setActiveStoryIndex(null) }))] }));
}
function StoryItem({ story, onClick }) {
    return (_jsxs("div", { className: "flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group select-none", onClick: onClick, children: [_jsxs("div", { className: "relative", children: [_jsx("div", { className: `p-[3px] rounded-full transition-transform group-hover:scale-105 active:scale-95 ${story.hasUnseen
                            ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]'
                            : story.isMe
                                ? 'bg-transparent'
                                : 'bg-armoyu-card-border'}`, children: _jsx("div", { className: "bg-armoyu-card-bg p-[2px] rounded-full", children: _jsx("img", { src: story.user?.avatar, alt: story.user?.username, className: `w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/5 dark:border-white/10 object-cover ${!story.hasUnseen && !story.isMe ? 'grayscale-[0.5] opacity-80' : ''}` }) }) }), story.isMe && (_jsx("div", { className: "absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-armoyu-card-bg flex items-center justify-center text-white", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "14", height: "14", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "12", y1: "5", x2: "12", y2: "19" }), _jsx("line", { x1: "5", y1: "12", x2: "19", y2: "12" })] }) }))] }), _jsx("span", { className: `text-[11px] md:text-xs font-bold truncate w-16 md:w-20 text-center transition-colors ${story.hasUnseen ? 'text-armoyu-text' : 'text-armoyu-text-muted'}`, children: story.isMe ? 'Hikayen' : story.user?.displayName || story.user?.username })] }));
}
//# sourceMappingURL=Stories.js.map