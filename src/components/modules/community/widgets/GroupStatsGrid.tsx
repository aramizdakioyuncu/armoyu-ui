'use client';

import React from 'react';

interface GroupStatsGridProps {
   stats: {
      members: number;
      online: number;
      posts: number;
      founded: string;
   };
}

export function GroupStatsGrid({ stats }: GroupStatsGridProps) {
   return (
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
         {[
            { label: 'ÜYELER', value: stats.members, icon: 'users' },
            { label: 'AKTİF', value: stats.online, icon: 'activity', color: 'text-emerald-500' },
            { label: 'PAYLAŞIM', value: stats.posts, icon: 'edit-3' },
            { label: 'KURULUŞ', value: stats.founded, icon: 'calendar' }
         ].map((stat, idx) => (
            <div key={idx} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg text-center">
               <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-2 leading-none">{stat.label}</p>
               <p className={`text-2xl font-black leading-none ${stat.color || 'text-armoyu-text'}`}>{stat.value}</p>
            </div>
         ))}
      </div>
   );
}
