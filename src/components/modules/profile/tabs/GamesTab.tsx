'use client';

import React from 'react';
import { User } from '@armoyu/core';
import { Gamepad2, Trophy, Users, Star, Calendar } from 'lucide-react';

interface GamesTabProps {
  user: User | null;
}

export function GamesTab({ user }: GamesTabProps) {
  // Mock games data until core service is available
  const games = [
    { 
      id: 1, 
      name: 'Counter-Strike 2', 
      rank: 'Global Elite', 
      hours: '2,450', 
      level: 24, 
      icon: 'https://cdn2.steamgriddb.com/icon/37398188040d235c59fc6c52705763a5/32/512x512.png',
      image: 'https://images.alphacoders.com/133/1331821.png'
    },
    { 
      id: 2, 
      name: 'League of Legends', 
      rank: 'Diamond II', 
      hours: '1,820', 
      level: 342, 
      icon: 'https://e7.pngegg.com/pngimages/518/316/png-clipart-league-of-legends-video-game-riot-games-logo-league-of-legends-blue-game.png',
      image: 'https://images.alphacoders.com/132/1322158.png'
    },
    { 
      id: 3, 
      name: 'Valorant', 
      rank: 'Immortal 1', 
      hours: '950', 
      level: 156, 
      icon: 'https://e7.pngegg.com/pngimages/362/342/png-clipart-valorant-riot-games-logo-video-game-valorant-text-logo.png',
      image: 'https://images2.alphacoders.com/106/1064562.jpg'
    }
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 px-2">
        <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">OYUN KÜTÜPHANESİ</h3>
          <p className="text-[10px] font-bold text-armoyu-text-muted mt-1 uppercase tracking-widest">Aktif olarak oynanan ve favori oyunlar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="group relative bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] overflow-hidden hover:border-blue-500/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-blue-500/10">
            {/* Game Cover */}
            <div className="h-48 relative overflow-hidden">
               <img src={game.image} alt={game.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               <div className="absolute inset-0 bg-gradient-to-t from-armoyu-card-bg via-armoyu-card-bg/40 to-transparent" />
               
               <div className="absolute top-4 left-4">
                 <div className="bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-xl border border-white/10 flex items-center gap-2">
                    <img src={game.icon} alt="icon" className="w-4 h-4 object-contain" />
                    <span className="text-[10px] font-black text-white uppercase tracking-widest">{game.name}</span>
                 </div>
               </div>
            </div>

            {/* Content */}
            <div className="p-6 pt-0 -mt-8 relative z-10">
              <div className="bg-armoyu-card-bg/80 backdrop-blur-xl border border-white/5 rounded-[24px] p-5">
                <div className="flex justify-between items-center mb-4">
                   <div>
                     <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">RÜTBE</div>
                     <div className="text-sm font-black text-blue-500 uppercase italic tracking-tighter">{game.rank}</div>
                   </div>
                   <div className="text-right">
                     <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">SEVİYE</div>
                     <div className="text-sm font-black text-armoyu-text">{game.level}</div>
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                   <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center gap-3">
                      <Calendar size={14} className="text-armoyu-text-muted" />
                      <div>
                         <div className="text-[8px] font-black text-armoyu-text-muted uppercase">SÜRE</div>
                         <div className="text-[11px] font-bold text-armoyu-text">{game.hours} Sa</div>
                      </div>
                   </div>
                   <div className="p-3 rounded-2xl bg-black/5 dark:bg-white/5 flex items-center gap-3">
                      <Trophy size={14} className="text-amber-500" />
                      <div>
                         <div className="text-[8px] font-black text-armoyu-text-muted uppercase">KUPA</div>
                         <div className="text-[11px] font-bold text-armoyu-text">12/30</div>
                      </div>
                   </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Add Game Placeholder */}
        <div className="group border-2 border-dashed border-armoyu-card-border rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all cursor-pointer min-h-[300px]">
           <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted group-hover:text-blue-500 group-hover:bg-blue-500/10 transition-all">
             <Users size={32} />
           </div>
           <div className="text-center">
             <h4 className="font-black text-armoyu-text uppercase tracking-tighter italic">YENİ OYUN EKLE</h4>
             <p className="text-[10px] font-bold text-armoyu-text-muted mt-1 uppercase tracking-widest italic">Kütüphaneni genişletmeye ne dersin?</p>
           </div>
        </div>
      </div>
    </div>
  );
}
