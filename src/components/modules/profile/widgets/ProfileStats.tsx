'use client';

import React from 'react';
import { RollingNumber } from '../../../RollingNumber';
import { formatStatValue } from '../../../../lib/utils/numberFormat';
import { User } from '@armoyu/core';

interface ProfileStatsProps {
  user: User;
}

export function ProfileStats({ user }: ProfileStatsProps) {
  const followersCount = user.followerCount || 0;
  const followingCount = user.followingCount || 0;
  const viewsCount = user.viewsCount || 0;
  const respectCount = user.odp || 0;

  const followers = formatStatValue(followersCount);
  const following = formatStatValue(followingCount);
  const views = formatStatValue(viewsCount);
  const respect = formatStatValue(respectCount);

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
            <RollingNumber value={followers.value} />
            <span className="text-sm ml-0.5">{followers.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Takipçi</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-armoyu-text flex items-baseline">
            <RollingNumber value={following.value} />
            <span className="text-sm ml-0.5">{following.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Takip</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-armoyu-text flex items-baseline">
            <RollingNumber value={views.value} />
            <span className="text-sm ml-0.5">{views.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Görüntülenme</div>
        </div>
        <div className="text-center md:text-left">
          <div className="text-2xl font-black text-emerald-500 flex items-baseline">
            <RollingNumber value={respect.value} />
            <span className="text-sm ml-0.5">{respect.unit}</span>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Saygı Puanı</div>
        </div>
      </div>

      {/* Level / XP */}
      <div className="w-full md:w-72 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl p-4">
        <div className="flex justify-between items-end mb-2">
          <div>
            <span className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Oyuncu Seviyesi</span>
            <div className="text-xl font-bold text-blue-500 mt-0.5 flex items-center gap-1">
              Seviye <RollingNumber value={level} />
            </div>
          </div>
          <div className="text-xs font-bold text-armoyu-text-muted flex items-center gap-1">
            <RollingNumber value={xp} /> / <RollingNumber value={nextLevelXp} /> XP
          </div>
        </div>
        {/* Progress Bar */}
        <div className="h-2.5 w-full bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)] transition-all duration-1000"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

    </div>
  );
}
