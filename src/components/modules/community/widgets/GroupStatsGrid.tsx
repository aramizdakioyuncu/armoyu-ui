'use client';

import React from 'react';
import { 
  Users, 
  Activity, 
  MessageSquare, 
  Calendar 
} from 'lucide-react';

interface GroupStatsGridProps {
  stats: {
    members: number;
    online: number;
    posts: number;
    founded: string;
  };
}

export function GroupStatsGrid({ stats }: GroupStatsGridProps) {
  const statItems = [
    { label: 'ÜYELER', value: stats.members, icon: Users, color: 'text-blue-500' },
    { label: 'AKTİF', value: stats.online, icon: Activity, color: 'text-emerald-500' },
    { label: 'PAYLAŞIM', value: stats.posts, icon: MessageSquare, color: 'text-purple-500' },
    { label: 'KURULUŞ', value: stats.founded, icon: Calendar, color: 'text-amber-500' }
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
      {statItems.map((stat, idx) => (
        <div key={idx} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg text-center relative overflow-hidden group hover:scale-105 transition-all duration-300">
          {/* Background Highlight */}
          <div className={`absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity`}>
             <stat.icon size={64} />
          </div>
          
          <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-2 leading-none relative z-10">
            {stat.label}
          </p>
          <div className="flex items-center justify-center gap-3 relative z-10">
            <stat.icon size={18} className={stat.color} />
            <p className={`text-2xl font-black leading-none text-armoyu-text`}>
              {stat.value}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
