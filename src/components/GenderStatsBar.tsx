import React from 'react';

export interface GenderStatsBarProps {
  maleCount: number;
  femaleCount: number;
}

export function GenderStatsBar({ maleCount = 50, femaleCount = 50 }: GenderStatsBarProps) {
  const total = maleCount + femaleCount;
  const malePercentage = total > 0 ? Math.round((maleCount / total) * 100) : 0;
  const femalePercentage = total > 0 ? 100 - malePercentage : 0;

  return (
    <div className="w-full space-y-3">
      {/* Etiketler ve İkonlar */}
      <div className="flex justify-between items-end px-1">
        
        {/* Erkek */}
        <div className="flex items-center gap-2 text-armoyu-primary">
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(var(--armoyu-primary-rgb),0.6)]">
            <circle cx="10" cy="14" r="5" />
            <line x1="13.5" y1="10.5" x2="19" y2="5" />
            <polyline points="14 5 19 5 19 10" />
          </svg>
          <span className="font-extrabold text-xl tracking-tight">{malePercentage}%</span>
          <span className="text-gray-400 text-sm hidden sm:inline border-l border-white/10 pl-2 ml-1">
            Erkek Üyeler ({maleCount.toLocaleString('tr-TR')})
          </span>
        </div>

        {/* Kadın */}
        <div className="flex items-center gap-2 text-pink-400">
          <span className="text-gray-400 text-sm hidden sm:inline border-r border-white/10 pr-2 mr-1 text-right">
            Kadın Üyeler ({femaleCount.toLocaleString('tr-TR')})
          </span>
          <span className="font-extrabold text-xl tracking-tight">{femalePercentage}%</span>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_8px_rgba(236,72,153,0.6)]">
            <circle cx="12" cy="10" r="5" />
            <line x1="12" y1="15" x2="12" y2="22" />
            <line x1="9" y1="19" x2="15" y2="19" />
          </svg>
        </div>

      </div>

      {/* Progress Bar Container */}
      <div className="w-full h-5 rounded-full bg-white/5 border border-white/10 flex overflow-hidden shadow-inner p-0.5 relative">
        <div className="absolute inset-0 bg-gradient-to-r from-armoyu-primary/20 to-pink-500/20 blur-xl"></div>
        
        {/* Erkek Bar */}
        <div 
          className="h-full bg-gradient-to-r from-armoyu-primary to-armoyu-primary shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb),0.8)] transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) rounded-full z-10" 
          style={{ width: `${malePercentage}%` }}
          title={`Erkek: ${malePercentage}%`}
        />
        
        {/* Kadın Bar */}
        <div 
          className="h-full bg-gradient-to-r from-pink-400 to-pink-600 shadow-[0_0_15px_rgba(236,72,153,0.8)] transition-all duration-[1500ms] cubic-bezier(0.4, 0, 0.2, 1) rounded-full ml-1 z-10" 
          style={{ width: `calc(${femalePercentage}% - 4px)` }}
          title={`Kadın: ${femalePercentage}%`}
        />
      </div>
    </div>
  );
}
