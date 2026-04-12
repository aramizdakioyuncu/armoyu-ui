'use client';

import React from 'react';
import Link from 'next/link';

interface GroupTopMembersProps {
   members: any[];
   groupUrl: string;
}

export function GroupTopMembers({ members, groupUrl }: GroupTopMembersProps) {
   return (
      <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
         <div className="flex items-center justify-between mb-8 leading-none">
            <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-widest italic leading-none">ÖNE ÇIKAN ÜYELER</h4>
            <Link href={`${groupUrl}/uyeler`} className="text-[10px] font-black text-blue-500 uppercase hover:underline leading-none">TÜMÜ</Link>
         </div>
         <div className="space-y-6">
            {(members || []).slice(0, 10).map((member: any, idx: number) => (
               <Link key={idx} href={`/oyuncular/${member.username}`} className="flex items-center gap-4 group cursor-pointer transition-all">
                  <img src={member.avatar || undefined} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-105 transition-transform object-cover shadow-lg" alt="Avatar" />
                  <div>
                     <p className="text-sm font-black text-armoyu-text mb-1 group-hover:text-blue-500 transition-colors uppercase italic leading-none">{member.displayName}</p>
                     <p className={`text-[9px] font-bold uppercase tracking-widest leading-none ${idx === 0 ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>{member.role?.name || 'Üye'}</p>
                  </div>
               </Link>
            ))}
         </div>
      </div>
   );
}
