'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Story, User } from '@armoyu/core';

import { useAuth } from '../../../../context/AuthContext';

interface StoryViewerProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
}

export function StoryViewer({ stories, initialStoryIndex, onClose }: StoryViewerProps) {
  const { user: currentUser } = useAuth();
  const [currentIndex, setCurrentIndex] = useState(initialStoryIndex);
  const [progress, setProgress] = useState(0);
  const story = stories[currentIndex];
  const isMe = currentUser?.username === story.author?.username;

  useEffect(() => {
    // Reset progress when story changes
    setProgress(0);

    const duration = 5000; // 5 seconds per story
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
  }, [currentIndex]);

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

  // Scroll kilitleme
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  return createPortal(
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
            <img src={story.author?.avatar} className="w-9 h-9 rounded-full border border-white/20" alt="" />
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold shadow-sm">{isMe ? 'Hikayen' : story.author?.displayName || story.author?.username}</span>
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

          {/* Navigation Overlays */}
          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev}></div>
            <div className="w-2/3 h-full cursor-e-resize" onClick={handleNext}></div>
          </div>
        </div>

        {/* Footer (Reply) */}
        <div className="p-4 bg-black/40 backdrop-blur-md flex gap-3 items-center">
          <input
            type="text"
            placeholder={`@${story.author?.username} kişisine yanıt ver...`}
            className="flex-1 bg-white/10 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all shadow-sm"
          />
          <button className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
          </button>
          <button className="text-white p-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
          </button>
        </div>

      </div>

      {/* Side Navigation for Desktop */}
      <div className="hidden md:flex absolute inset-x-0 top-1/2 -translate-y-1/2 justify-between px-10 pointer-events-none">
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          className={`pointer-events-auto p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all ${currentIndex === 0 ? 'opacity-0 cursor-default' : 'opacity-100'}`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="15 18 9 12 15 6"></polyline></svg>
        </button>
        <button
          onClick={handleNext}
          className="pointer-events-auto p-4 bg-white/10 hover:bg-white/20 text-white rounded-full backdrop-blur-md transition-all"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
        </button>
      </div>

    </div>,
    document.body
  );
}
