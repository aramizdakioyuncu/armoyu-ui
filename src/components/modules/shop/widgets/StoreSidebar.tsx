'use client';

import React from 'react';
import { CategoryWidget } from './CategoryWidget';
import { Crown } from 'lucide-react';

interface StoreSidebarProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

export function StoreSidebar({ activeCategory, setActiveCategory, categories }: StoreSidebarProps) {
  return (
    <div className="hidden lg:flex w-[280px] flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
      
      {/* Search Result Stats / Info Widget */}
      <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg group overflow-hidden relative">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700" />
          <div className="relative z-10">
            <h3 className="font-extrabold text-armoyu-text text-xl tracking-tight mb-4">
              ARMOYU <span className="text-blue-500">PAZAR</span>
            </h3>
            <div className="space-y-3">
               <div className="flex items-center gap-3">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
                  <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Sistem Aktif</span>
               </div>
               <p className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-relaxed opacity-70 italic">
                  Premium dijital içerik ve üyelik mağazası.
               </p>
            </div>
          </div>
      </div>

      {/* Main Categories Widget */}
      <CategoryWidget 
        activeCategory={activeCategory} 
        setActiveCategory={setActiveCategory} 
        categories={categories} 
      />

      {/* PLUS Membership Campaign Widget (Social Style) */}
      <div className="relative rounded-3xl overflow-hidden group cursor-pointer bg-gradient-to-br from-indigo-600 to-blue-700 p-6 shadow-2xl border border-white/10">
         <div className="absolute -top-4 -right-4 p-4 opacity-10 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-700">
            <Crown size={100} />
         </div>
         <div className="relative z-10">
            <div className="flex items-center gap-2 mb-4">
               <Crown size={16} className="text-yellow-400" />
               <span className="text-[9px] font-black text-white uppercase tracking-widest">Önerilen</span>
            </div>
            <h4 className="text-lg font-black text-white italic uppercase leading-tight mb-2">PLUS ÜYELİK <br/>AVANTAJLARI</h4>
            <p className="text-white/60 text-[8px] font-bold uppercase tracking-widest mb-6">%20 EXTRA TP / ÖZEL ROZET</p>
            <button className="w-full py-3 bg-white text-blue-600 text-[10px] font-black rounded-xl uppercase tracking-widest hover:bg-blue-50 active:scale-95 transition-all">ŞİMDİ İNCELE</button>
         </div>
      </div>

    </div>
  );
}
