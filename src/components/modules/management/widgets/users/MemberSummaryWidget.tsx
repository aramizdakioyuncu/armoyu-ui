import React from 'react';
import Link from 'next/link';
import { Users, ChevronRight, UserPlus } from 'lucide-react';
import { AnimatedStat } from '../../../../shared/AnimatedStat';

export const MemberSummaryWidget = () => {
  const members = [
    { name: 'Berkay T.', username: 'berkay', status: 'active', time: '2dk önce' },
    { name: 'Alperen K.', username: 'alperen', status: 'active', time: '1sa önce' },
    { name: 'Metehan G.', username: 'metehan', status: 'pending', time: 'Dün' },
  ];

  return (
    <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 p-6 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-armoyu-primary/10 rounded-xl text-armoyu-primary">
            <Users size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight">Yeni Üyeler</h3>
        </div>
        <Link href="/management-panel?tab=users" className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest hover:opacity-80 transition-all flex items-center gap-1">
          TÜMÜ <ChevronRight size={12} />
        </Link>
      </div>

      <div className="space-y-4">
        {members.map((member, i) => (
          <div key={i} className="flex items-center justify-between group">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-armoyu-primary/20 to-armoyu-primary/5 p-0.5">
                <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${member.username}`} className="w-full h-full rounded-[9px] object-cover" alt="" />
              </div>
              <div>
                <p className="text-xs font-black uppercase tracking-tight">{member.name}</p>
                <p className="text-[10px] font-bold text-armoyu-text-muted italic">@{member.username}</p>
              </div>
            </div>
            <div className="text-right">
              <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${member.status === 'active' ? 'bg-emerald-500/10 text-emerald-500' : 'bg-amber-500/10 text-amber-500'}`}>
                {member.status === 'active' ? 'AKTİF' : 'BEKLEMEDE'}
              </span>
              <p className="text-[9px] font-bold text-armoyu-text-muted mt-1 opacity-50 uppercase">{member.time}</p>
            </div>
          </div>
        ))}
      </div>

      <Link href="/management-panel?tab=users" className="w-full mt-6 py-4 bg-armoyu-primary/5 hover:bg-armoyu-primary/10 text-armoyu-primary text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
        <UserPlus size={14} /> ÜYE ONAYLA
      </Link>
    </div>
  );
};
