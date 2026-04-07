'use client';

import React from 'react';
import { GlobalStats } from "@armoyu/core";

export interface StatsGridProps {
  stats: GlobalStats;
}

export function StatsGrid({ stats }: StatsGridProps) {
  const statItems = [
    { label: 'Toplam Oyuncu', value: stats.totalPlayers.toLocaleString('tr-TR'), icon: '🎮', color: 'text-blue-400' },
    { label: 'Aktif Kullanıcı (24s)', value: stats.activeUsers24h.toLocaleString('tr-TR'), icon: '🔥', color: 'text-orange-400' },
    { label: 'Açılan Forum', value: stats.totalForums.toLocaleString('tr-TR'), icon: '💬', color: 'text-purple-400' },
    { label: 'Oynanan Maç', value: stats.totalMatchesPlayed.toLocaleString('tr-TR'), icon: '⚔️', color: 'text-red-400' },
    { label: 'Kurulan Grup', value: stats.totalGuilds.toLocaleString('tr-TR'), icon: '🛡️', color: 'text-yellow-400' },
    { label: 'Düzenlenen Anket', value: stats.totalPolls.toLocaleString('tr-TR'), icon: '📊', color: 'text-emerald-400' },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {statItems.map((item, idx) => (
        <div key={idx} className="bg-white/5 p-4 flex items-center gap-4 rounded-2xl border border-white/5 hover:bg-white/10 transition-colors shadow-lg hover:-translate-y-1 duration-300 cursor-default">
          <div className="text-3xl bg-[#0a0a0e]/50 p-3 rounded-xl border border-white/10 shadow-inner">
            {item.icon}
          </div>
          <div>
            <p className="text-gray-400 text-sm font-medium">{item.label}</p>
            <p className={`text-2xl font-black tracking-tight ${item.color}`}>{item.value}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
