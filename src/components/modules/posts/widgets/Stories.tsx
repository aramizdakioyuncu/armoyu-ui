import React, { useState } from 'react';
import { MOCK_STORIES } from '../../../../lib/constants/seedData';
import { StoryViewer } from './StoryViewer';
import { Story } from '@armoyu/core';
import { useAuth } from '../../../../context/AuthContext';

export function Stories() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm overflow-hidden mb-6">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1">
        {MOCK_STORIES.map((story, idx) => (
          <StoryItem
            key={story.id}
            story={story}
            onClick={() => setActiveStoryIndex(idx)}
          />
        ))}
      </div>

      {activeStoryIndex !== null && (
        <StoryViewer
          stories={MOCK_STORIES}
          initialStoryIndex={activeStoryIndex}
          onClose={() => setActiveStoryIndex(null)}
        />
      )}
    </div>
  );
}

function StoryItem({ story, onClick }: { story: Story, onClick: () => void }) {
  const { user: currentUser } = useAuth();
  const isMe = currentUser?.username === story.author?.username;
  const hasUnseen = !story.isViewed;
  const displayAvatar = isMe ? (currentUser?.avatar || story.author?.avatar) : story.author?.avatar;

  return (
    <div
      className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group select-none"
      onClick={onClick}
    >
      <div className="relative">
        {/* Story Circle Border */}
        <div className={`p-[3px] rounded-full transition-transform group-hover:scale-105 active:scale-95 ${hasUnseen
          ? 'bg-gradient-to-tr from-[#f9ce34] via-[#ee2a7b] to-[#6228d7]'
          : isMe
            ? 'bg-transparent'
            : 'bg-armoyu-card-border'
          }`}>
          <div className="bg-armoyu-card-bg p-[2px] rounded-full">
            <img
              src={displayAvatar}
              alt={story.author?.username}
              className={`w-14 h-14 md:w-16 md:h-16 rounded-full border border-black/5 dark:border-white/10 object-cover ${!hasUnseen && !isMe ? 'grayscale-[0.5] opacity-80' : ''}`}
            />
          </div>
        </div>

        {/* Plus Icon for 'My Story' */}
        {isMe && (
          <div className="absolute bottom-0 right-0 w-5 h-5 bg-blue-500 rounded-full border-2 border-armoyu-card-bg flex items-center justify-center text-white">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
          </div>
        )}
      </div>

      <span className={`text-[11px] md:text-xs font-bold truncate w-16 md:w-20 text-center transition-colors ${hasUnseen ? 'text-armoyu-text' : 'text-armoyu-text-muted'}`}>
        {isMe ? 'Hikayen' : story.author?.displayName || story.author?.username}
      </span>
    </div>
  );
}
