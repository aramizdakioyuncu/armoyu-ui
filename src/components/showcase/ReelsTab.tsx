'use client';

import React from 'react';
import { ReelsContainer } from '../modules/posts/widgets/reels/ReelsContainer';
import { userList } from '../../lib/constants/seedData';

export function ReelsTab() {
  const mockReels = [
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

  return (
    <div className="w-full h-[800px] max-w-[450px] mx-auto rounded-[40px] border-[12px] border-gray-900 overflow-hidden shadow-2xl bg-black relative">
      {/* Mobile Frame Camera Notch */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-gray-900 rounded-b-3xl z-[100] flex items-center justify-center">
         <div className="w-2 h-2 bg-gray-800 rounded-full" />
      </div>

      <ReelsContainer reels={mockReels} />
    </div>
  );
}
