'use client';

import React from 'react';
import { NewsCardProps } from './NewsCard';

export function NewsComments({ comments = [] }: { comments?: any[] }) {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic">Yorumlar</h3>
          <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest mt-1">{comments.length} Fikir Paylaşıldı</p>
        </div>
        <div className="flex gap-2">
            <button className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">En Yeni</button>
            <button className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-500 hover:text-white transition-all">Popüler</button>
        </div>
      </div>

      {/* Yorum Yap */}
      <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-black/5 dark:bg-white/5">
        <div className="flex gap-4">
          <img 
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay" 
            className="w-12 h-12 rounded-2xl object-cover shrink-0 shadow-lg" 
            alt="Sen" 
          />
          <div className="flex-1">
            <textarea 
              rows={3}
              placeholder="Haberi tartışalım, fikrini buraya yaz..."
              className="w-full bg-transparent border-none outline-none text-armoyu-text placeholder:text-armoyu-text-muted/40 font-medium resize-none no-scrollbar"
            />
            <div className="flex justify-between items-center mt-4 pt-4 border-t border-armoyu-card-border/50">
               <div className="flex gap-2">
                  <button className="p-2 text-armoyu-text-muted hover:text-blue-500 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg>
                  </button>
                  <button className="p-2 text-armoyu-text-muted hover:text-blue-500 transition-colors">
                     <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                  </button>
               </div>
               <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95">
                  Gönder
               </button>
            </div>
          </div>
        </div>
      </div>

      {/* Liste */}
      <div className="space-y-6">
        {comments.map((comment, i) => (
          <div key={i} className="flex gap-4 group">
            <div className="shrink-0 pt-1">
               <img src={comment.author.avatar} className="w-10 h-10 rounded-2xl object-cover" alt="" />
            </div>
            <div className="flex-1">
              <div className="bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-3xl rounded-tl-sm p-5 shadow-sm group-hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black text-armoyu-text uppercase tracking-tight">{comment.author.displayName}</span>
                    <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">@{comment.author.username}</span>
                  </div>
                  <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60 uppercase">{comment.date}</span>
                </div>
                <p className="text-sm text-armoyu-text-muted leading-relaxed font-medium">
                  {comment.content}
                </p>
              </div>
              
              <div className="flex items-center gap-6 mt-2 ml-4">
                 <button className="flex items-center gap-1.5 text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 transition-colors uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
                    <span>Beğen ({comment.likes})</span>
                 </button>
                 <button className="flex items-center gap-1.5 text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 transition-colors uppercase tracking-widest">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                    <span>Yanıtla</span>
                 </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
