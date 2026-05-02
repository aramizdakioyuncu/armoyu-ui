'use client';

import React from 'react';
import { Info } from 'lucide-react';

interface GroupAboutCardProps {
   description?: string;
}

export function GroupAboutCard({ description }: GroupAboutCardProps) {
   return (
      <div className="glass-panel p-8 md:p-10 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg relative overflow-hidden group">
         {/* Decorative Icon Background */}
         <div className="absolute -top-6 -right-6 text-armoyu-text opacity-[0.02] group-hover:opacity-[0.05] transition-opacity duration-700">
            <Info size={160} />
         </div>

         <div className="relative z-10">
            <div className="flex items-center gap-3 mb-6">
               <div className="p-2 bg-armoyu-primary/10 rounded-xl text-armoyu-primary">
                  <Info size={20} />
               </div>
               <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP HAKKINDA</h3>
            </div>
            
            <p className="text-armoyu-text-muted text-lg leading-relaxed font-medium">
               {description || 'Grup açıklaması henüz eklenmemiş.'}
            </p>
         </div>
      </div>
   );
}
