'use client';

import React from 'react';
import { User } from '@armoyu/core';
import { Edit3, MapPin, Calendar, Globe, Disc as Zodiac, Shield } from 'lucide-react';
import { ZODIAC_SIGNS } from '../../../../lib/constants/teamData';

interface AboutTabProps {
  displayUser: User | null;
  isOwnProfile: boolean;
  onEditBio: () => void;
  onEditTeam: () => void;
}

export function AboutTab({ displayUser, isOwnProfile, onEditBio, onEditTeam }: AboutTabProps) {
  const userZodiac = ZODIAC_SIGNS.find(s => s.name === displayUser?.zodiac);

  return (
    <div className="space-y-6">
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-8 shadow-sm relative overflow-hidden group/bio">
        <div className="absolute top-0 right-0 p-6 opacity-0 group-hover/bio:opacity-100 transition-opacity">
          {isOwnProfile && (
            <button
              onClick={onEditBio}
              className="p-2.5 bg-blue-500/10 text-blue-500 rounded-xl hover:bg-blue-500 hover:text-white transition-all shadow-lg shadow-blue-500/10"
            >
              <Edit3 size={16} />
            </button>
          )}
        </div>

        <div className="flex items-center gap-4 mb-6">
          <div className="w-1.5 h-6 bg-blue-500 rounded-full" />
          <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">Hakkında</h3>
        </div>

        <p className="text-base font-bold text-armoyu-text-muted leading-relaxed italic">
          {displayUser?.bio || (isOwnProfile ? 'Henüz bir biyografi eklemedin...' : 'Bu kullanıcı henüz bir biyografi eklememiş.')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-armoyu-text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <Shield size={16} className="text-blue-500" />
            Temel Bilgiler
          </h3>

          <div className="space-y-4">
            <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group/info">
              <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <MapPin size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Konum</div>
                <div className="text-base font-bold text-armoyu-text">{displayUser?.location || 'Dünya'}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group/info">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                <Calendar size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Katılım Tarihi</div>
                <div className="text-base font-bold text-armoyu-text">{displayUser?.registeredAt || 'Yeni Üye'}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group/info">
              <div className="w-12 h-12 rounded-2xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                <Globe size={24} />
              </div>
              <div>
                <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Ana Platform</div>
                <div className="text-base font-bold text-armoyu-text">PC (Steam)</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
          <h3 className="text-sm font-black text-armoyu-text-muted uppercase tracking-widest mb-6 flex items-center gap-2">
            <Zodiac size={16} className="text-purple-500" />
            Kişisel Tercihler
          </h3>

          <div className="space-y-4">
            {displayUser?.zodiac && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-purple-500/5 border border-transparent hover:border-purple-500/20 transition-all group/stat">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 text-2xl">
                    {userZodiac?.icon || '✨'}
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Burç</div>
                    <div className="text-base font-bold text-armoyu-text">{displayUser.zodiac}</div>
                  </div>
                </div>
                {isOwnProfile && (
                  <button onClick={onEditTeam} className="p-2 text-armoyu-text-muted hover:text-purple-500 opacity-0 group-hover/stat:opacity-100 transition-all bg-black/5 rounded-lg">
                    <Edit3 size={14} />
                  </button>
                )}
              </div>
            )}

            {displayUser?.favoriteTeam && displayUser.favoriteTeam.id !== 'none' && (
              <div className="flex items-center justify-between p-4 rounded-2xl bg-blue-500/5 border border-transparent hover:border-blue-500/20 transition-all group/stat">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-black/10 flex items-center justify-center overflow-hidden p-2">
                    <img src={displayUser.favoriteTeam.logo} alt={displayUser.favoriteTeam.name} className="w-full h-full object-contain" />
                  </div>
                  <div>
                    <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Favori Takım</div>
                    <div className="text-base font-bold text-armoyu-text">{displayUser.favoriteTeam.name}</div>
                  </div>
                </div>
                {isOwnProfile && (
                  <button onClick={onEditTeam} className="p-2 text-armoyu-text-muted hover:text-blue-500 opacity-0 group-hover/stat:opacity-100 transition-all bg-black/5 rounded-lg">
                    <Edit3 size={14} />
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
