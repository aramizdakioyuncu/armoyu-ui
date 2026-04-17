'use client';

import React from 'react';
import { RollingNumber } from '../../../RollingNumber';
import { formatStatValue } from '../../../../lib/utils/numberFormat';
import { User } from '../../../../models/auth/User';

interface ProfileStatsProps {
  user: User;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const postsCount = user.postCount || 0;
  const awardsCount = user.awardCount || 0;
  const friendsCount = (user as any).friendsCount || 0;
  const honorPoints = user.odp || 0;

  const posts = formatStatValue(postsCount);
  const awards = formatStatValue(awardsCount);
  const friends = formatStatValue(friendsCount);
  const honor = formatStatValue(honorPoints);

  // Level & XP calculations (Assuming 1000 XP per level for simplicity in UI bar)
  const level = user.level || 1;
  const xp = user.xp || 0;
  const nextLevelXp = 1000;
  const progress = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">

      {/* Rakamlar */}
      <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 w-full md:w-auto">
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-armoyu-text flex items-baseline">
            <RollingNumber value={posts.value} />
            <span className="text-sm ml-0.5">{posts.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Paylaşım</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-armoyu-text flex items-baseline">
            <RollingNumber value={awards.value} />
            <span className="text-sm ml-0.5">{awards.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Ödül</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-armoyu-text flex items-baseline">
            <RollingNumber value={friends.value} />
            <span className="text-sm ml-0.5">{friends.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Arkadaşlar</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-emerald-500 flex items-baseline">
            <RollingNumber value={honor.value} />
            <span className="text-sm ml-0.5">{honor.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Onur Puanı</div>
        </div>
      </div>

      {/* Level / XP */}
      <div 
        className="w-full md:w-72 rounded-2xl p-4 border transition-all duration-500"
        style={{ 
          backgroundColor: user.levelColor ? `#${user.levelColor}15` : 'rgba(0,0,0,0.05)',
          borderColor: user.levelColor ? `#${user.levelColor}30` : 'rgba(0,0,0,0.05)',
          boxShadow: user.levelColor ? `0 10px 40px -10px #${user.levelColor}40` : 'none',
          background: user.levelColor ? `linear-gradient(135deg, #${user.levelColor}10, #${user.levelColor}20)` : undefined
        }}
      >
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Oyuncu Seviyesi</span>
            <div 
              className="text-xl font-black text-armoyu-text mt-0.5 flex items-center gap-1 italic tracking-tighter"
            >
              SEVİYE <RollingNumber value={level} />
            </div>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted flex items-center gap-1">
            <RollingNumber value={xp} /> / <RollingNumber value={nextLevelXp} /> XP
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden border border-black/5">
          <div
            className="h-full rounded-full transition-all duration-1000"
            style={{ 
              width: `${progress}%`,
              backgroundColor: user.levelColor ? `#${user.levelColor}` : '#3b82f6',
              boxShadow: user.levelColor ? `0 0 15px #${user.levelColor}60` : '0 0 15px rgba(59,130,246,0.6)'
            }}
          />
        </div>
      </div>

    </div>
  );
}
