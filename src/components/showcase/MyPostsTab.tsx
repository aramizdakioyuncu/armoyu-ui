'use client';

import React from 'react';
import { SocialFeed } from '../../index';
import { useAuth } from '../../context/AuthContext';

export function MyPostsTab() {
  const { user } = useAuth();

  if (!user) {
    return (
      <div className="py-24 text-center">
        <p className="text-armoyu-text-muted">Gönderilerini görmek için giriş yapmalısın.</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="flex items-center gap-4 px-2">
         <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
         </div>
         <div>
            <h2 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic">Yazılarım</h2>
            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">Paylaştığın tüm içerikler</p>
         </div>
      </div>

      <SocialFeed 
        username={user.username}
        emptyMessage="Henüz bir şey paylaşmamışsın. Hemen bir şeyler yazmaya ne dersin?"
      />
    </div>
  );
}
