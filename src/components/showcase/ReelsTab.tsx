'use client';

import React, { useEffect, useState } from 'react';
import { ReelsContainer } from '../modules/posts/widgets/reels/ReelsContainer';
import { useArmoyu } from '../../context/ArmoyuContext';
import { ReelCardProps } from '../modules/posts/widgets/reels/ReelCard';
import { userList } from '../../lib/constants/seedData';

export function ReelsTab() {
  const { api, isMockEnabled } = useArmoyu();
  const [reels, setReels] = useState<ReelCardProps[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const mockReels: ReelCardProps[] = [
    {
      id: 'r1',
      author: userList[0],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-girl-in-neon-lighting-in-the-night-city-2128-large.mp4',
      description: 'Gece şehir ışıkları altında ARMOYU ile yeni maceralara! 🌌 #armoyu #neon #nightlife',
      songName: 'Neon Nights - Armoyu Records',
      stats: { likes: 1250, comments: 45, shares: 88 }
    },
    {
      id: 'r2',
      author: userList[1],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-urban-man-in-a-park-on-a-sunny-day-2015-large.mp4',
      description: 'Güneşli bir günde parkta oyun keyfi... ☀️ #relax #gaming #park',
      songName: 'Sunny Vibes - Chill Beats',
      stats: { likes: 850, comments: 22, shares: 15 }
    },
    {
      id: 'r3',
      author: userList[2],
      videoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-young-man-skating-on-a-sunny-day-2009-large.mp4',
      description: 'Patenle şehri keşfetmek paha biçilemez! 🛹 #skateboarding #cityview',
      songName: 'City Skater - Punk Rock',
      stats: { likes: 2100, comments: 120, shares: 350 }
    }
  ];

  useEffect(() => {
    // Debug log to identify instance issues
    console.log("[ReelsTab] API Status:", { 
      reelsService: !!(api as any).reels, 
      isMockEnabled,
      apiKeys: Object.keys(api || {})
    });

    // If mock is enabled, use static data immediately
    if (isMockEnabled) {
      setReels(mockReels);
      setLoading(false);
      setError(null);
      return;
    }

    const fetchReels = async () => {
      try {
        setLoading(true);
        setError(null);

        // Defensive check for missing service
        if (!(api as any).reels) {
          throw new Error("API Reels servisi bulunamadı. Lütfen sayfayı yenileyiniz veya dev server'ı restart ediniz.");
        }

        // Cast to any to bypass temporary property mismatch issues in local build
        const response = await (api as any).reels.getReels(1, 15);

        if (response.durum !== 1) {
          throw new Error(response.aciklama || 'Reels listesi alınamadı.');
        }

        // Map API response to ReelCardProps
        const mappedReels: ReelCardProps[] = (response.icerik || []).map((item: any) => ({
          id: item.id.toString(),
          author: {
            id: item.owner.id,
            displayName: item.owner.displayName,
            username: item.owner.username,
            avatar: item.owner.avatar,
            verified: true // Fallback for UI
          } as any,
          videoUrl: item.media.url,
          description: item.description,
          songName: 'Orijinal Ses - ARMOYU',
          stats: {
            likes: item.likeCount,
            comments: item.commentCount,
            shares: 0 // Fallback as it's not in the current model
          }
        }));

        setReels(mappedReels);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReels();
  }, [api, isMockEnabled]);

  return (
    <div className="w-full h-[800px] max-w-[450px] mx-auto rounded-[40px] border-[12px] border-gray-900 overflow-hidden shadow-2xl bg-black relative">
      {/* Mobile Frame Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-[100] flex items-center justify-center">
        <div className="w-2 h-2 bg-gray-800 rounded-full" />
      </div>

      {loading ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-black/60 backdrop-blur-sm z-50">
          <div className="w-16 h-16 border-4 border-armoyu-primary/20 border-t-armoyu-primary rounded-full animate-spin shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb),0.5)]" />
          <span className="text-armoyu-primary font-black text-xs uppercase tracking-[0.2em] animate-pulse">
            İÇERİK YÜKLENİYOR
          </span>
        </div>
      ) : error ? (
        <div className="absolute inset-0 flex flex-col items-center justify-center p-10 text-center gap-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center text-red-500 mb-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
          </div>
          <p className="text-white font-bold text-sm">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-white text-black text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-armoyu-primary hover:text-white transition-all active:scale-95"
          >
            TEKRAR DENE
          </button>
        </div>
      ) : (
        <ReelsContainer reels={reels} />
      )}
    </div>
  );
}
