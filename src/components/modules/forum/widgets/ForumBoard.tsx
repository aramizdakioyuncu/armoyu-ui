'use client';

import React from 'react';
import Link from 'next/link';

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

export function ForumBoard({ id, name, desc, topicCount, postCount, lastPost, icon }: ForumBoardProps) {
  return (
    <Link href={`/forum/${id}`} className="block">
      <div className="group flex flex-col md:flex-row items-center gap-6 p-6 md:p-8 glass-panel bg-armoyu-card-bg border border-armoyu-card-border hover:shadow-2xl transition-all duration-300 hover:border-blue-500/30">
        
        {/* Icon */}
        <div className="w-16 h-16 rounded-[22px] bg-blue-500/10 dark:bg-white/5 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all shrink-0">
           {icon || <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0 text-center md:text-left">
           <h3 className="text-xl font-black text-armoyu-text mb-1 uppercase tracking-tight group-hover:text-blue-500 transition-colors">
              {name}
           </h3>
           <p className="text-sm text-armoyu-text-muted font-medium line-clamp-2 leading-relaxed opacity-80">
              {desc}
           </p>
        </div>

        {/* Stats */}
        <div className="hidden lg:flex items-center gap-10 px-8 border-x border-armoyu-card-border/50">
           <div className="text-center">
              <span className="block text-xl font-black text-armoyu-text">{topicCount}</span>
              <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">KONU</span>
           </div>
           <div className="text-center">
              <span className="block text-xl font-black text-armoyu-text">{postCount}</span>
              <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">MESAJ</span>
           </div>
        </div>

        {/* Last Post */}
        <div className="hidden xl:flex items-center gap-4 w-64 shrink-0">
            {lastPost ? (
              <>
                 <img src={lastPost.avatar || undefined} alt={lastPost.author} className="w-10 h-10 rounded-full border border-blue-500/20" />
                 <div className="min-w-0">
                    <p className="text-xs font-bold text-armoyu-text truncate hover:text-blue-500 cursor-pointer">{lastPost.topicTitle}</p>
                    <p className="text-[10px] font-medium text-armoyu-text-muted mt-0.5 uppercase tracking-tighter">
                       <span className="text-blue-500 font-bold">{lastPost.author}</span> • {lastPost.time}
                    </p>
                 </div>
              </>
            ) : (
              <span className="text-xs font-bold text-armoyu-text-muted italic opacity-50 uppercase tracking-widest">HENÜZ KONU YOK</span>
            )}
        </div>

        {/* Hover Arrow */}
        <div className="md:hidden lg:flex shrink-0 w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 items-center justify-center opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
        </div>

      </div>
    </Link>
  );
}
