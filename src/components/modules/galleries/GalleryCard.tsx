'use client';

import React from 'react';

export interface GalleryCardProps {
  title: string;
  count: number;
  author: string;
  date: string;
  category: string;
  image: string;
}

export function GalleryCard({ title, count, author, date, category, image }: GalleryCardProps) {
  return (
    <div className="group relative glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-sm hover:shadow-2xl transition-all duration-500 cursor-pointer">
      
      {/* Resim Alanı */}
      <div className="aspect-[4/3] overflow-hidden relative">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity" />
        
        {/* İtem Sayısı Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1.5 rounded-2xl text-[10px] font-black text-white flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
           {count} Fotoğraf
        </div>
      </div>

      {/* İçerik Bilgisi */}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
           <span className="text-[10px] font-black uppercase tracking-widest text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">
             {category}
           </span>
           <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60">
             {date}
           </span>
        </div>

        <h3 className="text-lg font-black text-armoyu-text group-hover:text-blue-500 transition-colors mb-4 line-clamp-1">
           {title}
        </h3>

        <div className="flex items-center justify-between pt-4 border-t border-armoyu-card-border">
           <div className="flex items-center gap-2">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${author}`} 
                alt={author} 
                className="w-6 h-6 rounded-full bg-white/5 border border-black/10"
              />
              <span className="text-xs font-bold text-armoyu-text-muted">@{author}</span>
           </div>
           <button className="p-2 rounded-xl bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><polyline points="9 18 15 12 9 6"></polyline></svg>
           </button>
        </div>
      </div>

    </div>
  );
}
