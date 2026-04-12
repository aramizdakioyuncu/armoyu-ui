'use client';

import React from 'react';

interface GalleryFilterBarProps {
   categories: string[];
   activeTab: string;
   setActiveTab: (tab: string) => void;
}

export function GalleryFilterBar({ categories, activeTab, setActiveTab }: GalleryFilterBarProps) {
   return (
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
         <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-[22px] border border-armoyu-card-border overflow-x-auto no-scrollbar max-w-full">
            {categories.map((cat) => (
               <button
                  key={cat}
                  onClick={() => setActiveTab(cat)}
                  className={`px-6 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all shrink-0 ${activeTab === cat ? 'bg-blue-600 text-white shadow-xl' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
               >
                  {cat}
               </button>
            ))}
         </div>

         <div className="relative w-full md:w-80">
            <input
               type="text"
               placeholder="Galeri ara..."
               className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl px-6 py-3.5 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-bold placeholder:text-armoyu-text-muted/40"
            />
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="absolute right-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
         </div>
      </div>
   );
}
