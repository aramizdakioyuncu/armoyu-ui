'use client';

import React from 'react';

interface GalleryMasonryGridProps {
   images: any[];
   setLightboxIndex: (idx: number) => void;
}

export function GalleryMasonryGrid({ images, setLightboxIndex }: GalleryMasonryGridProps) {
   return (
      <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
         {images.map((img, idx) => (
            <div
               key={img.id}
               className="break-inside-avoid relative glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer group"
               onClick={() => setLightboxIndex(idx)}
            >
               <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-700"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                  <div className="flex items-center gap-2 mb-2">
                     <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-primary bg-armoyu-primary/10 px-2.5 py-1 rounded-lg border border-armoyu-primary/20 backdrop-blur-md">
                        {img.category}
                     </span>
                  </div>
                  <h3 className="text-white font-black text-sm uppercase tracking-tight mb-1">{img.title}</h3>
                  <p className="text-white/60 text-[11px] font-bold">@{img.author}</p>
               </div>

               {/* View Icon Overlay */}
               <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="15 3 21 3 21 9"></polyline><polyline points="9 21 3 21 3 15"></polyline><line x1="21" y1="3" x2="14" y2="10"></line><line x1="3" y1="21" x2="10" y2="14"></line></svg>
               </div>
            </div>
         ))}
      </div>
   );
}
