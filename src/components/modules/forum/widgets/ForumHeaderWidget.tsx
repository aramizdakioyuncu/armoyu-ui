'use client';

import React from 'react';

interface ForumHeaderWidgetProps {
   onNewTopicClick: () => void;
}

export function ForumHeaderWidget({ onNewTopicClick }: ForumHeaderWidgetProps) {
   return (
      <div className="mb-16 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic">ARMOYU FORUM</h1>
            <p className="text-armoyu-text-muted text-lg font-medium opacity-80">Topluluğun kalbi burada atıyor. Tartış, paylaş ve öğren.</p>
         </div>
         <button 
            onClick={onNewTopicClick}
            className="px-8 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-armoyu-primary/20 active:scale-95 transition-all"
         >
            YENİ KONU AÇ
         </button>
      </div>
   );
}
