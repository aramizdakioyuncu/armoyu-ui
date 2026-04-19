'use client';

import React from 'react';
import { Trophy, Anchor, Star, Zap, ShieldCheck } from 'lucide-react';

export function ProfileBadgesWidget() {
  const badges = [
    { label: 'Yılın Oyuncusu', color: 'text-yellow-600 dark:text-yellow-400', bg: 'bg-yellow-500/10', border: 'border-yellow-500/20', icon: <Trophy size={14} /> },
    { label: 'Sabır Taşı', color: 'text-slate-500', bg: 'bg-slate-500/10', border: 'border-slate-500/20', icon: <Anchor size={14} /> },
    { label: 'Turnuva Şampiyonu', color: 'text-purple-500', bg: 'bg-purple-500/10', border: 'border-purple-500/20', icon: <Star size={14} /> },
    { label: 'Hızlı Klavye', color: 'text-blue-500', bg: 'bg-blue-500/10', border: 'border-blue-500/20', icon: <Zap size={14} /> },
    { label: 'Efsane Üye', color: 'text-emerald-500', bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', icon: <ShieldCheck size={14} /> },
  ];

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block overflow-hidden relative group">
      <div className="absolute -right-6 -top-6 w-24 h-24 bg-yellow-500/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      <h3 className="text-lg font-black text-armoyu-text mb-4 relative z-10">Rozetler</h3>
      <div className="flex flex-wrap gap-2 relative z-10">
        {badges.map((badge, index) => (
          <div 
            key={index}
            className={`flex items-center gap-2 ${badge.bg} ${badge.color} text-[10px] font-black px-3 py-2 rounded-xl border ${badge.border} uppercase tracking-wider hover:scale-105 transition-transform cursor-default group/badge`}
            title={badge.label}
          >
            <span className="shrink-0 group-hover/badge:rotate-12 transition-transform">{badge.icon}</span>
            {badge.label}
          </div>
        ))}
      </div>
    </div>
  );
}
