'use client';

import React from 'react';

interface StoreSidebarProps {
   activeCategory: string;
   setActiveCategory: (cat: string) => void;
   categories: string[];
}

export function StoreSidebar({ activeCategory, setActiveCategory, categories }: StoreSidebarProps) {
   return (
      <div className="w-full lg:w-72 shrink-0 space-y-8">
         <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
            <h3 className="text-xs font-black text-armoyu-text mb-8 uppercase tracking-widest">KATEGORİLER</h3>
            <div className="space-y-3">
               {categories.map((cat) => (
                  <button
                     key={cat}
                     onClick={() => setActiveCategory(cat)}
                     className={`w-full text-left px-6 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeCategory === cat
                           ? 'bg-blue-600 text-white shadow-xl shadow-blue-500/20'
                           : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5 border border-transparent hover:border-armoyu-card-border'
                        }`}
                  >
                     {cat}
                  </button>
               ))}
            </div>
         </div>

         {/* Promo Card */}
         <div className="relative rounded-[40px] overflow-hidden group aspect-square">
            <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?w=800&q=80" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt="Promo" />
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600/90 to-transparent p-8 flex flex-col justify-end">
               <span className="text-white text-[9px] font-black uppercase tracking-widest mb-1 opacity-80">HAFTANIN FIRSATI</span>
               <h4 className="text-white text-xl font-black uppercase tracking-tighter italic mb-4">GİZEMLİ KUTUDA %40 İNDİRİM!</h4>
               <button className="w-full py-3 bg-white text-blue-600 font-black text-[10px] uppercase tracking-widest rounded-xl shadow-xl">İNCELE</button>
            </div>
         </div>
      </div>
   );
}
