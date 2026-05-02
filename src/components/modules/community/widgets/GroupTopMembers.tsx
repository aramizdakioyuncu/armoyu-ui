'use client';

import React from 'react';
import Link from 'next/link';
import { Users, ChevronRight } from 'lucide-react';

interface GroupTopMembersProps {
   members: any[];
   groupUrl: string;
}

export function GroupTopMembers({ members, groupUrl }: GroupTopMembersProps) {
   return (
      <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg relative overflow-hidden group/card">
         <div className="flex items-center justify-between mb-8 leading-none relative z-10">
            <div className="flex items-center gap-2">
               <Users size={16} className="text-armoyu-primary" />
               <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-widest italic leading-none">ÖNE ÇIKAN ÜYELER</h4>
            </div>
            <Link href={`${groupUrl}/uyeler`} className="text-[10px] font-black text-armoyu-primary uppercase flex items-center gap-1 hover:gap-2 transition-all leading-none group">
               TÜMÜ <ChevronRight size={12} />
            </Link>
         </div>

         <div className="space-y-6 relative z-10">
            {(members && members.length > 0) ? (
               members.slice(0, 10).map((member: any, idx: number) => (
                  <Link key={idx} href={`/oyuncular/${member.username}`} className="flex items-center gap-4 group cursor-pointer transition-all hover:translate-x-1 duration-300">
                     <div className="relative">
                        <img 
                           src={member.avatar || 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lucky'} 
                           className="w-12 h-12 rounded-2xl border-2 border-transparent group-hover:border-armoyu-primary/50 transition-all object-cover shadow-lg" 
                           alt="Avatar" 
                        />
                        {idx < 3 && (
                           <div className="absolute -top-2 -left-2 w-5 h-5 bg-amber-500 rounded-lg flex items-center justify-center text-[10px] font-black text-white shadow-lg rotate-[-15deg]">
                              {idx + 1}
                           </div>
                        )}
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-sm font-black text-armoyu-text mb-1 group-hover:text-armoyu-primary transition-colors uppercase italic leading-none truncate">
                           {member.displayName}
                        </p>
                        <p className={`text-[9px] font-black uppercase tracking-widest leading-none ${idx === 0 ? 'text-armoyu-primary' : 'text-armoyu-text-muted opacity-60'}`}>
                           {member.role?.name || 'Üye'}
                        </p>
                     </div>
                  </Link>
               ))
            ) : (
               <div className="py-10 bg-black/5 dark:bg-white/5 rounded-[30px] border border-dashed border-armoyu-card-border text-center">
                  <p className="text-[10px] text-armoyu-text-muted italic font-bold uppercase tracking-widest opacity-60">
                     Henüz üye bulunmuyor.
                  </p>
               </div>
            )}
         </div>
      </div>
   );
}
