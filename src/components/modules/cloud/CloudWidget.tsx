'use client';

import React from 'react';
import { Cloud } from 'lucide-react';

interface CloudWidgetProps {
  onManageCloud: () => void;
  usedGB?: string;
  totalGB?: string;
  percentage?: number;
}

export function CloudWidget({ 
  onManageCloud, 
  usedGB = "2.4", 
  totalGB = "5", 
  percentage = 48 
}: CloudWidgetProps) {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 shadow-sm hidden lg:block hover:border-armoyu-primary/30 transition-all group relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute -right-8 -top-8 w-24 h-24 bg-armoyu-primary/5 blur-2xl rounded-full group-hover:scale-150 transition-transform duration-1000" />
      
      <div className="flex justify-between items-center mb-6 relative z-10">
        <h3 className="text-sm font-black text-armoyu-text flex items-center gap-3 tracking-tighter uppercase italic">
          <div className="w-10 h-10 rounded-2xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary group-hover:scale-110 transition-transform">
            <Cloud size={20} className="fill-armoyu-primary/10" />
          </div>
          ARMOYU Cloud
        </h3>
        <div className="flex flex-col items-end">
          <span className="text-[10px] font-black text-armoyu-primary bg-armoyu-primary/10 px-2.5 py-1 rounded-lg uppercase tracking-widest">{percentage}%</span>
        </div>
      </div>

      <div className="relative mb-4 z-10">
        <div className="w-full h-3 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden shadow-inner p-0.5">
          <div 
            style={{ width: `${percentage}%` }}
            className="h-full bg-gradient-to-r from-armoyu-primary to-armoyu-primary rounded-full shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb),0.4)] transition-all duration-1000 relative"
          >
            <div className="absolute inset-0 bg-white/20 animate-pulse" />
          </div>
        </div>
      </div>

      <p className="text-[10px] font-bold text-armoyu-text-muted mb-6 uppercase tracking-wider leading-relaxed relative z-10 italic">
        {totalGB} GB ALANIN <span className="text-armoyu-text font-black">{usedGB} GB</span> KADARI DOLU.
      </p>

      <button
        onClick={onManageCloud}
        className="w-full py-4 text-[10px] font-black uppercase tracking-[0.2em] text-white bg-armoyu-primary hover:bg-armoyu-primary rounded-2xl transition-all shadow-lg shadow-armoyu-primary/20 active:scale-95 relative z-10 italic"
      >
        DEPOLAMAYI YÖNET
      </button>
    </div>
  );
}
