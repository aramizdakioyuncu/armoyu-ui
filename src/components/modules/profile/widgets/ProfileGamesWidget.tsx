'use client';

import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface ProfileGamesWidgetProps {
  games: any[];
  onSeeAll: () => void;
}

export function ProfileGamesWidget({ games, onSeeAll }: ProfileGamesWidgetProps) {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-black text-armoyu-text">
          Oyunlar <span className="text-emerald-500 ml-1">{games.length}</span>
        </h3>
        <button
          onClick={onSeeAll}
          className="text-xs font-bold text-armoyu-primary hover:underline"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {(games.length > 0 ? games : [
          { id: 1, avatar: 'https://via.placeholder.com/100', name: 'Oyun 1' },
          { id: 2, avatar: 'https://via.placeholder.com/100', name: 'Oyun 2' },
          { id: 3, avatar: 'https://via.placeholder.com/100', name: 'Oyun 3' }
        ]).slice(0, 5).map((game, idx) => (
          <div key={game.id || idx} className="group relative">
            <img
              src={game.avatar || game.oyunlogo || 'https://via.placeholder.com/100'}
              alt={game.name || game.oyunad}
              className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform cursor-pointer shadow-sm"
              title={game.name || game.oyunad}
            />
          </div>
        ))}
      </div>

      {games.length === 0 && (
         <div className="mt-4 py-8 text-center border-2 border-dashed border-armoyu-card-border rounded-2xl opacity-40">
           <Gamepad2 size={24} className="mx-auto mb-2" />
           <p className="text-[10px] font-black uppercase tracking-widest">Oyun Yok</p>
         </div>
      )}
    </div>
  );
}
