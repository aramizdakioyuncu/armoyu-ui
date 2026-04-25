'use client';

import React, { useEffect, useState } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { NewMemberResponse } from '@armoyu/core';
import Link from 'next/link';

export function NewMembersWidget() {
  const { api, navigation } = useArmoyu();
  const [members, setMembers] = useState<NewMemberResponse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await api.siteInfo.getNewMembers();
        console.log('[ARMOYU] New Members API Response:', response);
        if (response.durum === 1 && Array.isArray(response.icerik)) {
          console.log('[ARMOYU] New Members count:', response.icerik.length);
          setMembers(response.icerik.slice(0, 10)); // Sayıyı biraz artıralım
        }
      } catch (error) {
        console.error('[NewMembersWidget] Failed to fetch members:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMembers();
  }, [api]);

  if (loading && members.length === 0) {
    return (
      <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg animate-pulse">
        <div className="h-6 w-32 bg-white/5 rounded-md mb-5" />
        <div className="space-y-4">
          {[1, 2, 3].map(i => (
            <div key={i} className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/5" />
              <div className="flex-1 space-y-2">
                <div className="h-3 w-24 bg-white/5 rounded" />
                <div className="h-2 w-16 bg-white/5 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (members.length === 0) return null;

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg group overflow-hidden relative">
      {/* Background Glow */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-emerald-500/5 rounded-full blur-3xl group-hover:bg-emerald-500/10 transition-all duration-700" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-extrabold text-armoyu-text text-sm tracking-tight uppercase">Yeni Üyeler</h3>
          <span className="text-[9px] font-black text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded-md uppercase tracking-widest">AKTİF</span>
        </div>

        <div className="space-y-3">
          {members.map((member) => (
            <Link
              key={member.id}
              href={`${navigation.profilePrefix}/${member.id}`}
              className="flex items-center gap-3 group cursor-pointer p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-[0.98]"
            >
              <div className="relative shrink-0">
                <img 
                  src={member.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"} 
                  alt={member.displayName} 
                  className="w-9 h-9 rounded-xl object-cover border border-black/5 shadow-sm group-hover:scale-105 transition-transform" 
                />
                <div 
                  className="absolute -top-1 -right-1 px-1 rounded-md text-[8px] font-black border border-black/20 shadow-sm"
                  style={{ backgroundColor: member.levelColor || '#3b82f6', color: '#fff' }}
                >
                  {member.level}
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[13px] font-bold text-armoyu-text truncate group-hover:text-emerald-500 transition-colors uppercase tracking-tight">{member.displayName}</h4>
                <div className="flex items-center gap-1 mt-0.5">
                  <span className="w-1 h-1 rounded-full bg-emerald-500" />
                  <span className="text-[8px] text-armoyu-text-muted truncate opacity-70 uppercase font-black tracking-widest">Aramıza Katıldı</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
