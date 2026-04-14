'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ReelCard, type ReelCardProps } from './ReelCard';

interface ReelsContainerProps {
  reels: Omit<ReelCardProps, 'isActive'>[];
  initialReelId?: string;
}

export function ReelsContainer({ reels, initialReelId }: ReelsContainerProps) {
  const [activeId, setActiveId] = useState(initialReelId || reels[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observerOptions = {
      root: containerRef.current,
      threshold: 0.8, // Must be 80% visible to be considered active
    };

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('data-reel-id');
          if (id) setActiveId(id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);
    const elements = containerRef.current?.querySelectorAll('[data-reel-id]');
    
    elements?.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [reels]);

  return (
    <div 
      ref={containerRef}
      className="w-full h-screen bg-black overflow-y-scroll snap-y snap-mandatory scrollbar-hide"
    >
      {reels.map((reel) => (
        <div 
          key={reel.id} 
          data-reel-id={reel.id}
          className="w-full h-full snap-start snap-always shrink-0"
        >
          <ReelCard 
            {...reel} 
            isActive={activeId === reel.id} 
          />
        </div>
      ))}

    </div>
  );
}
