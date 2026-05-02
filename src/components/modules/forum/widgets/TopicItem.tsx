'use client';

import React from 'react';
import Link from 'next/link';

export interface TopicItemProps {
  id: string;
  boardId: string;
  title: string;
  author: string;
  authorAvatar: string;
  replies: number;
  views: number;
  lastActivity: string;
  lastAuthor: string;
  isPinned?: boolean;
  isHot?: boolean;
  isSolved?: boolean;
}

export function TopicItem({ id, boardId, title, author, authorAvatar, replies, views, lastActivity, lastAuthor, isPinned, isHot, isSolved }: TopicItemProps) {
  return (
    <div className="group flex flex-col md:flex-row items-center gap-4 p-4 glass-panel bg-armoyu-card-bg border border-armoyu-card-border hover:shadow-xl transition-all duration-300 hover:border-armoyu-primary/20">
      
      {/* Topic Info */}
      <div className="flex-1 min-w-0 flex items-center gap-4 w-full">
         <img src={authorAvatar || undefined} alt={author} className="w-10 h-10 rounded-full border border-armoyu-primary/20" />
         <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1 flex-wrap">
               {isPinned && <span className="px-2 py-0.5 bg-red-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md">BAŞA TUTTURULDU</span>}
               {isHot && <span className="px-2 py-0.5 bg-orange-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md">POPÜLER</span>}
               {isSolved && <span className="px-2 py-0.5 bg-emerald-500 text-white text-[8px] font-black uppercase tracking-widest rounded-md">ÇÖZÜLDÜ</span>}
               <Link href={`/forum/${boardId}/${id}`} className="text-sm md:text-base font-black text-armoyu-text hover:text-armoyu-primary transition-colors truncate block">
                  {title}
               </Link>
            </div>
            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">
               <span className="text-armoyu-primary">{author}</span> tarafından başlatıldı
            </p>
         </div>
      </div>

      {/* Stats */}
      <div className="hidden lg:flex items-center gap-10 px-8 border-x border-armoyu-card-border/50 shrink-0">
         <div className="text-center">
            <span className="block text-sm font-black text-armoyu-text">{replies}</span>
            <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest">YANIT</span>
         </div>
         <div className="text-center">
            <span className="block text-sm font-black text-armoyu-text">{views}</span>
            <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest">İZLENME</span>
         </div>
      </div>

      {/* Last Post Activity */}
      <div className="hidden md:flex flex-col text-right w-40 shrink-0">
         <span className="text-xs font-black text-armoyu-text mb-0.5 truncate">{lastAuthor}</span>
         <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-tighter">{lastActivity}</span>
      </div>

      {/* Mobile Stats Summary */}
      <div className="md:hidden flex items-center justify-between w-full pt-4 border-t border-armoyu-card-border mt-2">
         <div className="flex gap-4">
            <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{replies} Yanıt</span>
            <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{views} İzlenme</span>
         </div>
         <span className="text-[10px] font-bold text-armoyu-primary uppercase tracking-widest">{lastActivity}</span>
      </div>

    </div>
  );
}
