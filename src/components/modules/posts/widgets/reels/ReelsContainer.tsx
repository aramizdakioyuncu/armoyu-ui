'use client';

import React, { useState, useEffect, useRef } from 'react';
import { ReelCard, type ReelCardProps } from './ReelCard';

interface ReelsContainerProps {
  reels: ReelCardProps[];
}

export function ReelsContainer({ reels }: ReelsContainerProps) {
  const [activeId, setActiveId] = useState<string | number>(reels[0]?.id);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) setActiveId(id);
          }
        });
      },
      { threshold: 0.7 }
    );

    const elements = containerRef.current?.querySelectorAll('[data-id]');
    elements?.forEach((el) => observer.observe(el));

    return () => elements?.forEach((el) => observer.unobserve(el));
  }, []);

  return (
    <div 
      ref={containerRef}
      className="h-[calc(100vh-64px)] overflow-y-scroll snap-y snap-mandatory hide-scrollbar bg-black"
    >
      {reels.map((reel) => (
        <div 
          key={reel.id} 
          data-id={reel.id}
          className="h-full snap-start relative flex items-center justify-center"
        >
          <ReelCard {...reel} isActive={String(activeId) === String(reel.id)} />
        </div>
      ))}
    </div>
  );
}
