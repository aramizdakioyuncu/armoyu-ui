'use client';

import React from 'react';
import { PostCard } from '../../auth/PostCard';

interface GroupFeedSectionProps {
   group: any;
   user?: any;
   isMember: boolean;
   posts: any[];
}

export function GroupFeedSection({ group, user, isMember, posts }: GroupFeedSectionProps) {
   return (
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP PAYLAŞIMLARI</h3>
         </div>

         {isMember && user && (
            <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <div className="flex gap-5 items-center leading-none">
                  <img src={user.avatar || undefined} className="w-14 h-14 rounded-2xl border-2 border-blue-500/20 object-cover" />
                  <div className="flex-1 relative group">
                     <input type="text" placeholder={`${group.name} grubunda neler oluyor?`} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all italic" />
                  </div>
               </div>
               <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/5 leading-none">
                  <div className="flex gap-4">
                     <button className="text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 italic uppercase">MEDYA EKLE</button>
                  </div>
                  <button className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all italic">PAYLAŞ</button>
               </div>
            </div>
         )}

         <div className="space-y-6">
            {posts.map((post: any) => (
               <PostCard key={post.id} {...post} />
            ))}
            {posts.length === 0 && (
               <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-[40px] border border-dashed border-armoyu-card-border">
                  <p className="text-armoyu-text-muted font-bold opacity-60 uppercase tracking-widest text-[10px] italic">Henüz bu grupta paylaşım yapılmamış.</p>
               </div>
            )}
         </div>
      </div>
   );
}
