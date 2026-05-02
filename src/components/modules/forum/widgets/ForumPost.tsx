'use client';

import React from 'react';

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

export function ForumPost({ author, authorAvatar, authorRank, authorRankColor, authorJoined, authorPosts, content, time, isMainPost }: ForumPostProps) {
  return (
    <div className={`flex flex-col lg:flex-row gap-0 glass-panel bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] overflow-hidden ${isMainPost ? 'border-armoyu-primary/30' : ''}`}>
      
      {/* User Sidebar */}
      <div className="w-full lg:w-48 xl:w-64 bg-black/5 dark:bg-white/5 p-8 flex flex-col items-center border-b lg:border-r border-armoyu-card-border shrink-0">
         <img src={authorAvatar} alt={author} className="w-20 h-20 rounded-full border-4 border-armoyu-bg mb-4 shadow-xl" />
         <h3 className="text-sm font-black text-armoyu-text mb-2 uppercase tracking-tight text-center">{author}</h3>
         <span className={`px-4 py-1.5 rounded-full text-[8px] font-black uppercase tracking-widest text-white mb-6 shadow-lg shadow-${authorRankColor}-500/20 bg-${authorRankColor}-500`}>
            {authorRank}
         </span>
         
         <div className="space-y-4 w-full">
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-armoyu-text">Üyelik</span>
               <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest">{authorJoined}</span>
            </div>
            <div className="flex flex-col items-center">
               <span className="text-[10px] font-black text-armoyu-text">Toplam Mesaj</span>
               <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest font-black text-armoyu-primary">{authorPosts}</span>
            </div>
         </div>
      </div>

      {/* Content Area */}
      <div className="flex-1 p-8 md:p-12 relative flex flex-col">
         <div className="pb-6 mb-8 border-b border-armoyu-card-border flex justify-between items-center opacity-40">
            <p className="text-[8px] font-black uppercase tracking-widest">{time}</p>
            <div className="flex gap-4">
               <button className="text-[8px] font-black uppercase tracking-widest hover:text-armoyu-primary transition-colors">#1</button>
               <button className="text-[8px] font-black uppercase tracking-widest hover:text-armoyu-primary transition-colors">ŞİKAYET ET</button>
            </div>
         </div>

         <div className="prose prose-sm dark:prose-invert max-w-none flex-1 text-armoyu-text text-md font-medium leading-[1.8] opacity-90 whitespace-pre-wrap">
            {content}
         </div>

         {/* Actions */}
         <div className="mt-12 pt-8 border-t border-armoyu-card-border flex flex-wrap gap-4">
            <button className="flex items-center gap-2 px-6 py-3 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
               ALINTILA
            </button>
            <button className="flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border hover:bg-black/10 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all active:scale-95">
               <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
               BEĞEN
            </button>
         </div>
      </div>

    </div>
  );
}
