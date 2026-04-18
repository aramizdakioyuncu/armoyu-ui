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
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block hover:border-blue-500/30 transition-all group">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black text-armoyu-text flex items-center gap-2 tracking-tight">
          <Cloud size={20} className="text-blue-500 fill-blue-500/10" />
          ARMOYU Cloud
        </h3>
        <span className="text-xs font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-lg">{percentage}%</span>
      </div>

      <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-3 shadow-inner">
        <div 
          style={{ width: `${percentage}%` }}
          className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-1000"
        ></div>
      </div>

      <p className="text-xs font-bold text-armoyu-text-muted mb-4 uppercase tracking-tighter">
        {totalGB} GB ALANIN <span className="text-armoyu-text">{usedGB} GB</span> KADARI DOLU.
      </p>

      <button
        onClick={onManageCloud}
        className="w-full py-3 text-[10px] font-black uppercase tracking-widest text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 rounded-xl transition-all border border-blue-500/10 group-hover:border-blue-500/30 active:scale-95 shadow-sm"
      >
        Depolamayı Yönet
      </button>
    </div>
  );
}
