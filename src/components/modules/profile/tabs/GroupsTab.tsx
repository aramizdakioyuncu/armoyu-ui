'use client';

import React from 'react';
import { Group } from '../../../../models/community/Group';
import { Users, Search, Target } from 'lucide-react';
//
import Link from 'next/link';

interface GroupsTabProps {
  groups: Group[];
}

export function GroupsTab({ groups }: GroupsTabProps) {
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-600 flex items-center justify-center text-white shadow-xl shadow-emerald-600/20">
            <Target size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">KATILDIĞI GRUPLAR</h3>
            <p className="text-[10px] font-bold text-armoyu-text-muted mt-1 uppercase tracking-widest leading-none">Toplam {groups.length} grup</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-emerald-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Gruplarda ara..." 
              className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-armoyu-text focus:outline-none focus:border-emerald-500 transition-all w-full md:w-64"
            />
          </div>
        </div>
      </div>

      {groups.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {groups.map((group, idx) => (
            <div
              key={group.id || idx}
              className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:shadow-emerald-500/5 transition-all group relative overflow-hidden flex flex-col justify-between"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-emerald-500/5 blur-2xl rounded-full" />
              
              <div className="flex items-start gap-4 relative z-10">
                <div className="w-16 h-16 rounded-[20px] overflow-hidden border-2 border-armoyu-card-border group-hover:border-emerald-500 transition-colors bg-white dark:bg-zinc-800 shrink-0 shadow-sm">
                  <img src={group.logo || undefined} alt={group.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 p-1" />
                </div>
                
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-black text-armoyu-text truncate w-full tracking-tight mb-1">{group.name}</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest bg-black/5 dark:bg-white/5 px-2 py-1 rounded-lg flex items-center gap-1">
                      <Users size={10} />
                      {group.memberCount} Üye
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-6 relative z-10">
                <Link
                  href={`/gruplar/${(group.name || group.id || '').toString().toLowerCase().replace(/\\s+/g, '-')}`}
                  className="w-full block text-center py-3 rounded-xl border border-armoyu-card-border text-[11px] font-black text-armoyu-text hover:text-emerald-500 hover:border-emerald-500/50 hover:bg-emerald-500/5 transition-all uppercase tracking-widest"
                >
                  Grubu Ziyaret Et
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-20 text-center">
           <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mx-auto mb-6">
              <Target size={40} />
           </div>
           <h3 className="text-xl font-bold text-armoyu-text mb-2 uppercase italic">Henüz Bir Grubu Yok</h3>
           <p className="text-armoyu-text-muted text-sm max-w-xs mx-auto italic font-medium">Kullanıcı şu ana kadar hiçbir gruba dahil olmamış.</p>
        </div>
      )}
    </div>
  );
}
