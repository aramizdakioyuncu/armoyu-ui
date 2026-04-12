'use client';

import React from 'react';
import { ShieldCheck } from 'lucide-react';

interface GroupPermissionsProps {
   permissions: string[];
}

export function GroupPermissions({ permissions }: GroupPermissionsProps) {
   return (
      <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg leading-none">
         <h4 className="text-[11px] font-black text-armoyu-text mb-8 uppercase tracking-widest italic">GRUP YETKİLERİ</h4>
         <div className="space-y-3">
            {(permissions || []).map((perm: string, idx: number) => (
               <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 border border-white/5">
                  <ShieldCheck size={14} className="text-blue-500" />
                  <span className="text-[10px] font-black text-armoyu-text uppercase tracking-wider italic">{perm.replace(/_/g, ' ')}</span>
               </div>
            ))}
            {(permissions?.length || 0) === 0 && (
               <p className="text-[10px] text-armoyu-text-muted italic font-bold uppercase tracking-widest opacity-60">Özel yetki tanımlanmamış.</p>
            )}
         </div>
      </div>
   );
}
