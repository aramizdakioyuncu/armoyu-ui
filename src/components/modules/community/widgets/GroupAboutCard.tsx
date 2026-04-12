'use client';

import React from 'react';

interface GroupAboutCardProps {
   description?: string;
}

export function GroupAboutCard({ description }: GroupAboutCardProps) {
   return (
      <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg">
         <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight mb-6 italic">GRUP HAKKINDA</h3>
         <p className="text-armoyu-text-muted text-lg leading-relaxed font-medium">
            {description || 'Grup açıklaması henüz eklenmemiş.'}
         </p>
      </div>
   );
}
