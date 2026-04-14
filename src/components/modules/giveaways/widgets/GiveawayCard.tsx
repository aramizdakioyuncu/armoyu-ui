'use client';

import React from 'react';

export interface GiveawayCardProps {
  title: string;
  prize: string;
  status: 'active' | 'ended';
  participants: number;
  timeLeft: string;
  image: string;
}

export function GiveawayCard({ title, prize, status, participants, timeLeft, image }: GiveawayCardProps) {
  const isActive = status === 'active';

  return (
    <div className={`group glass-panel rounded-[40px] overflow-hidden border transition-all duration-700 flex flex-col h-full bg-armoyu-card-bg shadow-sm ${isActive ? 'border-blue-500/20 hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/20' : 'border-armoyu-card-border opacity-60 grayscale-[0.5]'}`}>
      
      {/* Resim & Durum */}
      <div className="aspect-square p-8 relative flex items-center justify-center">
          <div className={`absolute inset-0 bg-gradient-to-br transition-opacity duration-500 ${isActive ? 'from-blue-600/10 to-indigo-600/10 opacity-100' : 'from-gray-500/5 to-gray-600/5 opacity-50'}`} />
          <img 
            src={image} 
            alt={prize} 
            className="w-48 h-48 object-contain group-hover:scale-110 transition-transform duration-700 drop-shadow-2xl relative z-10"
          />
          
          {/* Status Badge */}
          <div className="absolute top-6 left-6 z-20">
             <span className={`px-4 py-2 rounded-2xl text-[9px] font-black uppercase tracking-widest flex items-center gap-2 shadow-xl backdrop-blur-md border ${isActive ? 'bg-emerald-500/80 text-white border-emerald-400/30 shadow-emerald-500/20' : 'bg-gray-200 dark:bg-zinc-800/80 text-gray-500 dark:text-zinc-400 border-black/5 dark:border-white/5 shadow-black/5 dark:shadow-black/20'}`}>
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />}
                {isActive ? 'Aktif' : 'Bitti'}
             </span>
          </div>
      </div>

      {/* İçerik */}
      <div className="px-8 pb-8 flex-1 flex flex-col text-center mt-[-40px]">
          <div className="relative z-10 p-6 rounded-[32px] bg-white dark:bg-zinc-900 border border-armoyu-card-border shadow-xl shadow-black/[0.03] dark:shadow-2xl backdrop-blur-xl">
             <h3 className="text-xl font-black text-blue-600 dark:text-white mb-2 line-clamp-1 leading-tight">{prize}</h3>
             <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-6 block border-b border-black/5 dark:border-white/5 pb-2">
                {title}
             </p>

             {/* Bilgi Grid */}
             <div className="grid grid-cols-2 gap-3 mb-8">
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center">
                   <span className="block text-[7px] font-black text-armoyu-text-muted uppercase mb-1 tracking-tighter">Kalan Süre</span>
                   <span className={`block text-xs font-black uppercase ${isActive ? 'text-blue-500' : 'text-zinc-500'}`}>{isActive ? timeLeft : 'Bitti'}</span>
                </div>
                <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex flex-col items-center justify-center">
                   <span className="block text-[7px] font-black text-armoyu-text-muted uppercase mb-1 tracking-tighter">Katılımcı</span>
                   <span className="block text-xs font-black text-armoyu-text leading-none">{participants} <span className="text-[8px] opacity-60">Kişi</span></span>
                </div>
             </div>

             <button 
               disabled={!isActive}
               className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-xl relative overflow-hidden group/btn ${isActive ? 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-500/20 active:scale-95' : 'bg-gray-100 dark:bg-zinc-800 text-gray-400 dark:text-zinc-500 cursor-not-allowed border border-black/5 dark:border-white/5 shadow-none'}`}
             >
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                {isActive ? 'Çekilişe Katıl' : 'Sonuçları Gör'}
             </button>
          </div>
         
         <div className="mt-8 flex justify-center -space-x-3">
             {[1,2,3,4].map(i => (
               <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+12}`} className="w-8 h-8 rounded-full border-2 border-armoyu-card-bg bg-white/10" alt="part" />
             ))}
             <div className="w-8 h-8 rounded-full border-2 border-armoyu-card-bg bg-armoyu-card-border flex items-center justify-center text-[10px] font-black text-armoyu-text">+{participants - 4}</div>
         </div>
      </div>
    </div>
  );
}
