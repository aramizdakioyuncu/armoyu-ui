'use client';

import React from 'react';
import { PostCard } from '../../posts/widgets/PostCard';
import { Send, Image as ImageIcon } from 'lucide-react';

interface GroupFeedSectionProps {
   group: any;
   user?: any;
   isMember: boolean;
   posts: any[];
}

export function GroupFeedSection({ group, user, isMember, posts }: GroupFeedSectionProps) {
   return (
      <div className="space-y-8">
         <div className="flex items-center gap-3">
            <div className="w-1.5 h-8 bg-armoyu-primary rounded-full" />
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP PAYLAŞIMLARI</h3>
         </div>

         {isMember && user && (
            <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500">
               <div className="flex gap-4 items-center leading-none">
                  <div className="relative shrink-0">
                     <img src={user.avatar || undefined} className="w-12 h-12 rounded-2xl border-2 border-armoyu-primary/20 object-cover shadow-lg" alt="Avatar" />
                     <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full border-2 border-armoyu-card-bg shadow-lg" />
                  </div>
                  <div className="flex-1 relative group">
                     <input 
                        type="text" 
                        placeholder={`${group.name} grubunda neler oluyor?`} 
                        className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:ring-2 focus:ring-armoyu-primary/20 transition-all italic placeholder:opacity-30" 
                     />
                  </div>
               </div>
               <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/5 dark:border-white/5 leading-none">
                  <div className="flex gap-2">
                     <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-primary transition-all italic uppercase tracking-widest border border-transparent hover:border-armoyu-primary/10 active:scale-95">
                        <ImageIcon size={14} />
                        MEDYA EKLE
                     </button>
                  </div>
                  <button className="flex items-center gap-2 px-8 py-3 bg-armoyu-primary hover:bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest rounded-2xl shadow-lg shadow-armoyu-primary/20 active:scale-95 transition-all italic border border-armoyu-primary/20">
                     <Send size={14} />
                     PAYLAŞ
                  </button>
               </div>
            </div>
         )}

         <div className="space-y-6">
            {posts.length > 0 ? (
               posts.map((post: any) => (
                  <PostCard key={post.id} {...post} />
               ))
            ) : (
               <div className="flex flex-col items-center justify-center py-20 bg-black/5 dark:bg-white/5 rounded-[40px] border border-dashed border-armoyu-card-border px-6">
                  <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mb-4 opacity-40">
                     <Send size={32} />
                  </div>
                  <p className="text-armoyu-text-muted font-bold opacity-60 uppercase tracking-widest text-[10px] italic text-center max-w-xs">
                     Henüz bu grupta paylaşım yapılmamış. İlk postu sen at!
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
