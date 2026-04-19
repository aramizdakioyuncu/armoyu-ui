import React, { useState } from 'react';
import { RollingNumber } from '../../../RollingNumber';
import { formatStatValue } from '../../../../lib/utils/numberFormat';
import { User } from '../../../../models/auth/User';
import { Edit3 } from 'lucide-react';

interface ProfileStatsProps {
  user: User;
  isOwnProfile?: boolean;
  onEditBio?: () => void;
}

export function ProfileStats({ user, isOwnProfile, onEditBio }: ProfileStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
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
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm flex flex-col gap-6">
      
      {/* Üst Satır: Rakamlar ve Seviye */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
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

      {/* Alt Satır: Bio / Hakkında */}
      <div className="w-full pt-6 border-t border-armoyu-card-border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-blue-500 rounded-full" />
            <h3 className="text-xs font-black text-armoyu-text uppercase tracking-tight italic">Hakkında</h3>
          </div>
          {isOwnProfile && (
            <button 
              onClick={onEditBio}
              className="p-1 px-3 text-[10px] font-black text-blue-500 bg-blue-500/10 rounded-lg hover:bg-blue-500 hover:text-white transition-all flex items-center gap-1.5"
            >
              <Edit3 size={12} />
              DÜZENLE
            </button>
          )}
        </div>
        <p className="text-sm font-bold text-armoyu-text leading-relaxed italic">
          {isExpanded || (user.bio || '').length <= 60 
            ? (user.bio || (isOwnProfile ? 'Henüz bir biyografi eklemedin...' : 'Bu kullanıcı henüz bir biyografi eklememiş.'))
            : `${user.bio?.substring(0, 60)}...`
          }
          {(user.bio || '').length > 60 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-all"
            >
              {isExpanded ? 'Daha Az' : 'Daha Fazla'}
            </button>
          )}
        </p>
      </div>

    </div>
  );
}
