'use client';

import React, { useState, useEffect } from 'react';
import { Story } from '../../../../models/social/feed/Story';
import { useArmoyu } from '../../../../context/ArmoyuContext';

interface StoryOverlayProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onAddStory?: () => void;
}

export function StoryOverlay({ stories, initialStoryIndex, onClose, onAddStory }: StoryOverlayProps) {
  const { api } = useArmoyu();
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);

  const story = stories[currentIndex];
  const isMe = story.author?.isMe || false;

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Mark story as viewed
  useEffect(() => {
    if (mounted && story && story.id) {
      api.stories.viewStory(Number(story.id)).catch(err => {
        console.error('[ARMOYU] Failed to mark story as viewed:', err);
      });
    }
  }, [currentIndex, mounted, story, api]);

  useEffect(() => {
    if (!mounted) return;

    setProgress(0);
    const duration = 5000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          handleNext();
          return 0;
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentIndex, mounted]);

  const handleNext = () => {
    if (currentIndex < stories.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prev => prev - 1);
    }
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center animate-in fade-in duration-300">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <img src={story.media} className="w-full h-full object-cover blur-3xl scale-110" alt="" />
      </div>

      <div className="relative w-full h-full max-w-[450px] md:h-[90%] md:aspect-[9/16] bg-[#1a1a1a] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
          {stories.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-50"
                style={{
                  width: idx === currentIndex ? `${progress}%` : idx < currentIndex ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src={story.author?.avatar} className="w-9 h-9 rounded-full border border-white/20" alt="" />
              {isMe && (
                <button 
                  onClick={(e) => { e.stopPropagation(); onAddStory?.(); }}
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center border-2 border-black text-white text-[10px] font-bold cursor-pointer hover:bg-blue-400 transition-colors z-30"
                >
                  +
                </button>
              )}
            </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold shadow-sm">{isMe ? 'Ben' : story.author?.displayName || story.author?.username}</span>
              <span className="text-white/60 text-[10px]">{story.timestamp || '2 saat önce'}</span>
            </div>
          </div>
          <button onClick={onClose} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative">
          <img src={story.media} className="w-full h-full object-cover" alt="Story Content" />
          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev}></div>
            <div className="w-2/3 h-full cursor-e-resize" onClick={handleNext}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 backdrop-blur-md flex gap-3 items-center">
          <input
            type="text"
            placeholder={`@${story.author?.username} kişisine yanıt ver...`}
            className="flex-1 bg-white/10 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all shadow-sm"
          />
        </div>
      </div>
    </div>
  );
}
