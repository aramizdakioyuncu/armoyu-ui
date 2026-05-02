'use client';

import React from 'react';
import { User } from '../../../../models/auth/User';
import { Gamepad2, Trophy, Users, Star, Calendar } from 'lucide-react';

interface GamesTabProps {
  user: User | null;
}

export function GamesTab({ user }: GamesTabProps) {
  const games = (user?.popularGames || []).map(game => ({
    id: game.id,
    name: game.title,
    rank: game.role || (game as any).rank || 'Aktif Oyuncu',
    hours: (game as any).playTime || '0',
    level: (game as any).gameLevel || 0,
    icon: game.logo || 'https://cdn-icons-png.flaticon.com/512/686/686589.png',
    image: game.banner || 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80',
    clan: game.clan ? {
      name: game.clan.name,
      role: game.clan.role,
      color: game.clan.color
    } : null
  }));

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-4 px-2">
        <div className="w-12 h-12 rounded-2xl bg-armoyu-primary flex items-center justify-center text-white shadow-xl shadow-armoyu-primary/20">
          <Gamepad2 size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">OYUN KÜTÜPHANESİ</h3>
          <p className="text-[10px] font-bold text-armoyu-text-muted mt-1 uppercase tracking-widest">Aktif olarak oynanan ve favori oyunlar</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game) => (
          <div key={game.id} className="group relative bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] overflow-hidden hover:border-armoyu-primary/50 transition-all duration-500 shadow-sm hover:shadow-2xl hover:shadow-armoyu-primary/10">
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
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">RÜTBE</div>
                    <div className="text-sm font-black text-armoyu-primary uppercase italic tracking-tighter leading-tight">
                      {game.rank}
                    </div>
                  </div>
                  {game.clan && (
                    <div className="text-right">
                      <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">KLAN</div>
                      <div 
                        className="text-xs font-black uppercase italic tracking-tighter"
                        style={{ color: game.clan.color || 'var(--armoyu-primary)' }}
                      >
                        {game.clan.name}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex justify-between items-center mb-4">
                  <div className="text-right flex-1">
                    <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">SEVİYE</div>
                    <div className="text-sm font-black text-armoyu-text">{game.level}</div>
                  </div>
                </div>

                {game.clan && (
                  <div 
                    className="mb-4 flex items-center gap-2 px-3 py-1.5 rounded-lg border animate-in fade-in slide-in-from-left duration-500"
                    style={{ 
                      backgroundColor: `${game.clan.color || 'var(--armoyu-primary)'}10`,
                      borderColor: `${game.clan.color || 'var(--armoyu-primary)'}30`
                    }}
                  >
                    <div 
                      className="w-2 h-2 rounded-full animate-pulse" 
                      style={{ backgroundColor: game.clan.color || 'var(--armoyu-primary)' }}
                    />
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black opacity-60 uppercase tracking-widest" style={{ color: game.clan.color || 'var(--armoyu-primary)' }}>
                        KLAN RÜTBESİ
                      </span>
                      <span className="text-[10px] font-black uppercase tracking-widest" style={{ color: game.clan.color || 'var(--armoyu-primary)' }}>
                        {game.clan.role}
                      </span>
                    </div>
                  </div>
                )}

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
        <div className="group border-2 border-dashed border-armoyu-card-border rounded-[32px] p-8 flex flex-col items-center justify-center gap-4 hover:border-armoyu-primary/50 hover:bg-armoyu-primary/5 transition-all cursor-pointer min-h-[300px]">
          <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted group-hover:text-armoyu-primary group-hover:bg-armoyu-primary/10 transition-all">
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
