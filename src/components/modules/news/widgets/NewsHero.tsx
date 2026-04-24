'use client';

import React from 'react';
import { Zap, TrendingUp, Newspaper } from 'lucide-react';

export function NewsHero() {
  return (
    <div className="relative rounded-[40px] overflow-hidden bg-zinc-900 border border-white/5 p-12 group">
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-600/10 blur-[100px] -mr-32 -mt-32 transition-all duration-1000 group-hover:bg-blue-600/20"></div>
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6 text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600/10 rounded-2xl border border-blue-500/20">
             <Zap size={16} className="text-blue-500 animate-pulse" />
             <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest">GÜNCEL HABERLER</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-none">
            DÜNYADAN <br /> 
            <span className="text-blue-500 italic">GELİŞMELER</span>
          </h1>
          <p className="max-w-md text-sm font-medium text-armoyu-text-muted leading-relaxed italic opacity-80">
            Platformumuzdaki en son yeniliklerden, oyun dünyasındaki kritik gelişmelerden ve topluluk haberlerinden anında haberdar olun.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-4">
           <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group/card hover:border-blue-500/30 transition-all">
              <TrendingUp size={24} className="text-emerald-500" />
              <div className="flex flex-col">
                 <span className="text-2xl font-black text-white leading-none">1.2k+</span>
                 <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Okuma</span>
              </div>
           </div>
           <div className="p-8 bg-white/5 rounded-[32px] border border-white/5 backdrop-blur-xl flex flex-col gap-4 group/card hover:border-blue-500/30 transition-all">
              <Newspaper size={24} className="text-blue-500" />
              <div className="flex flex-col">
                 <span className="text-2xl font-black text-white leading-none">450</span>
                 <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Makale</span>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
}
