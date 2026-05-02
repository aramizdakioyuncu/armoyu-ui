'use client';

import React from 'react';
import { ShieldCheck, ShieldAlert } from 'lucide-react';

interface GroupPermissionsProps {
   permissions: string[];
}

export function GroupPermissions({ permissions }: GroupPermissionsProps) {
   return (
      <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg relative overflow-hidden group">
         {/* Background Decoration */}
         <div className="absolute -bottom-6 -right-6 text-armoyu-text opacity-[0.03] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none">
            <ShieldCheck size={120} />
         </div>

         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-8">
               <div className="p-2 bg-armoyu-primary/10 rounded-xl text-armoyu-primary">
                  <ShieldCheck size={18} />
               </div>
               <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-widest italic leading-none">GRUP YETKİLERİ</h4>
            </div>

            <div className="space-y-3">
               {(permissions && permissions.length > 0) ? (
                  permissions.map((perm: string, idx: number) => (
                     <div key={idx} className="flex items-center gap-3 p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-armoyu-primary/30 transition-colors group/item">
                        <div className="w-1.5 h-1.5 rounded-full bg-armoyu-primary group-hover/item:scale-150 transition-transform" />
                        <span className="text-[10px] font-black text-armoyu-text uppercase tracking-wider italic">
                           {perm.replace(/_/g, ' ')}
                        </span>
                     </div>
                  ))
               ) : (
                  <div className="flex flex-col items-center justify-center py-6 px-4 bg-black/5 dark:bg-white/5 rounded-[30px] border border-dashed border-armoyu-card-border">
                     <ShieldAlert size={24} className="text-armoyu-text-muted opacity-20 mb-2" />
                     <p className="text-[10px] text-armoyu-text-muted italic font-bold uppercase tracking-widest opacity-60 text-center">
                        Özel yetki tanımlanmamış.
                     </p>
                  </div>
               )}
            </div>
         </div>
      </div>
   );
}
