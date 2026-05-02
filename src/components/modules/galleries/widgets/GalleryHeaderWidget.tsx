'use client';

import React from 'react';

export function GalleryHeaderWidget() {
   return (
      <div className="mb-10 text-center lg:text-left flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6">
         <div>
            <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter italic uppercase">GALERİ</h1>
            <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
               Topluluğumuz tarafından paylaşılan en iyi ekran görüntüleri ve anları burada keşfet.
            </p>
         </div>

         <button className="px-8 py-3 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-armoyu-primary/20 active:scale-95 transition-all w-fit mx-auto lg:mx-0">
            Fotoğraf Yükle
         </button>
      </div>
   );
}
