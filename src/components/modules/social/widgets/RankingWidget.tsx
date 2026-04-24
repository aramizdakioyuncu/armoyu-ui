'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../../context/AuthContext';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { RankedUser } from '../../../../models/auth/RankedUser';

export interface RankingWidgetProps {
  profilePrefix?: string;
}

export function RankingWidget({ profilePrefix }: RankingWidgetProps) {
  const [rankingType, setRankingType] = useState<'level' | 'popularity'>('level');
  const [rankings, setRankings] = useState<RankedUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(5);
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const { api, navigation } = useArmoyu();

  const finalProfilePrefix = profilePrefix || navigation.profilePrefix;

  useEffect(() => {
    async function fetchRankings() {
      // Engelleme: Eğer giriş yapılmamışsa sorgu atma
      if (!currentUser) {
        setRankings([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = rankingType === 'level' 
          ? await api.users.getXpRankings(1) 
          : await api.users.getPopRankings(1);
        
        const data = (response && response.durum === 1) ? response.icerik : 
                     (Array.isArray(response) ? response : []);

        console.log(`[RankingWidget] Raw Data for ${rankingType}:`, data);

        if (Array.isArray(data)) {
          const mappedData = data.map((item: any) => RankedUser.fromAPI(item));
          setRankings(mappedData);
        } else {
          setRankings([]);
        }
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
        setRankings([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRankings();
  }, [rankingType, api, currentUser]);

  const MOCK_RANKINGS = rankingType === 'level' ? [
    { username: 'berkay', displayName: 'Berkay Altın', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', level: 99, seasonalXp: 5000, popScore: 5000 },
    { username: 'atilla', displayName: 'Atilla Güneş', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Atilla', level: 85, seasonalXp: 4200, popScore: 4200 },
    { username: 'mert', displayName: 'Mert Yılmaz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mert', level: 72, seasonalXp: 3800, popScore: 3800 },
    { username: 'selin', displayName: 'Selin Yıldız', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selin', level: 68, seasonalXp: 3100, popScore: 3100 },
    { username: 'can', displayName: 'Can Demir', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Can', level: 64, seasonalXp: 2900, popScore: 2900 }
  ] : [
    { username: 'selin', displayName: 'Selin Yıldız', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Selin', level: 68, seasonalXp: 8900, popScore: 8900 },
    { username: 'berkay', displayName: 'Berkay Altın', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay', level: 99, seasonalXp: 7500, popScore: 7500 },
    { username: 'mert', displayName: 'Mert Yılmaz', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Mert', level: 72, seasonalXp: 6200, popScore: 6200 },
    { username: 'atilla', displayName: 'Atilla Güneş', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Atilla', level: 85, seasonalXp: 5100, popScore: 5100 },
    { username: 'deniz', displayName: 'Deniz Ak', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Deniz', level: 45, seasonalXp: 4800, popScore: 4800 }
  ];

  const displayRankings = (rankings.length > 0 ? rankings : MOCK_RANKINGS).slice(0, visibleCount);

  const goToProfile = (user: any) => {
    router.push(`${finalProfilePrefix}/${user.username}`);
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex flex-col gap-4">
      <div className="flex items-center justify-center mb-2">
        <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5 relative h-9 w-[140px]">
          {/* Sliding Background */}
          <div
            className={`absolute inset-y-1 transition-all duration-300 ease-out bg-white dark:bg-blue-600 rounded-lg shadow-sm ${rankingType === 'level' ? 'left-1 w-[64px]' : 'left-[73px] w-[62px]'}`}
          />
          <button
            onClick={() => { setRankingType('level'); setVisibleCount(5); }}
            className={`flex-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all relative z-10 ${rankingType === 'level' ? 'text-blue-600 dark:text-white' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
          >
            Seviye
          </button>
          <button
            onClick={() => { setRankingType('popularity'); setVisibleCount(5); }}
            className={`flex-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all relative z-10 ${rankingType === 'popularity' ? 'text-blue-600 dark:text-white' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
          >
            Popüler
          </button>
        </div>
      </div>

      <div className="space-y-3 min-h-[200px]">
        {loading ? (
          <div className="flex flex-col gap-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-1.5 animate-pulse">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 bg-black/5 dark:bg-white/5 rounded-full" />
                  <div className="w-20 h-4 bg-black/5 dark:bg-white/5 rounded-md" />
                </div>
                <div className="w-8 h-6 bg-black/5 dark:bg-white/5 rounded-md" />
              </div>
            ))}
          </div>
        ) : (
          displayRankings.map((user, idx) => {
            const isMe = currentUser?.username === user.username;
            return (
              <div
                key={idx}
                onClick={() => goToProfile(user)}
                className={`flex items-center justify-between group cursor-pointer p-1.5 rounded-xl transition-all ${isMe
                  ? 'bg-blue-600/10 border border-blue-500/30'
                  : 'hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={user.avatar} alt={user.displayName} className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 group-hover:border-blue-500 transition-colors" />
                    <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-sm transition-transform group-hover:scale-110 ${idx === 0 ? 'bg-yellow-500' :
                      idx === 1 ? 'bg-gray-400' :
                        idx === 2 ? 'bg-orange-600' :
                          'bg-armoyu-card-border text-armoyu-text-muted dark:bg-white/10 dark:text-white/60'
                      }`}>
                      {idx + 1}
                    </div>
                  </div>
                  <span className="text-sm font-bold text-armoyu-text-muted group-hover:text-armoyu-text transition-colors truncate max-w-[100px]">{user.displayName}</span>
                </div>
                <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{rankingType === 'level' ? user.seasonalXp : user.popScore}</span>
              </div>
            );
          })
        )}
      </div>

      {visibleCount < (rankings.length || MOCK_RANKINGS.length) && !loading && (
        <button
          onClick={() => setVisibleCount(prev => prev + 10)}
          className="w-full pt-2 text-[11px] font-bold text-armoyu-text-muted hover:text-blue-500 transition-colors border-t border-armoyu-card-border mt-1"
        >
          Sıralamadan {Math.min(10, Math.max(rankings.length, MOCK_RANKINGS.length) - visibleCount)} Kişi Daha Gör
        </button>
      )}
    </div>
  );
}
