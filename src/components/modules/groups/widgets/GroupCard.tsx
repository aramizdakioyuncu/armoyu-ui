'use client';

import React from 'react';
import Link from 'next/link';

export interface GroupCardProps {
  name: string;
  shortName: string;
  description: string;
  recruitment: string;
  date: string;
  category: string;
  tag: string;
  banner: string;
  logo: string;
  slug?: string;
}

export function GroupCard({ 
  name, 
  shortName, 
  description, 
  recruitment, 
  date, 
  category, 
  tag, 
  banner, 
  logo,
  slug
}: GroupCardProps) {
  const groupUrl = slug ? `/gruplar/${slug}` : `/gruplar/${(name || '').toLowerCase().replace(/\s+/g, '-')}`;

  return (
    <div className="group relative glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-sm hover:shadow-xl hover:scale-[1.01] transition-all duration-300">
      
      {/* Banner */}
      <div className="h-32 w-full relative overflow-hidden bg-zinc-800">
        <img 
          src={banner || 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&q=80'} 
          alt={name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* Kategori Badge */}
        <div className="absolute top-4 right-4 bg-white/10 backdrop-blur-md border border-white/20 px-3 py-1 rounded-full text-[10px] font-black text-white uppercase tracking-wider">
           {category}
        </div>
      </div>

      {/* Profil/Logo & Bilgi */}
      <div className="px-5 pb-6 relative">
        <div className="relative -mt-10 mb-4 inline-block">
           <img 
             src={logo || `https://api.dicebear.com/7.x/identicon/svg?seed=${name}`} 
             alt="Logo" 
             className="w-20 h-20 rounded-2xl border-4 border-armoyu-bg bg-white dark:bg-zinc-900 object-cover shadow-lg"
           />
           <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-armoyu-bg flex items-center justify-center text-white">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
           </div>
        </div>

        <div className="flex items-center justify-between mb-2">
           <div>
              <h3 className="text-xl font-black text-armoyu-text group-hover:text-blue-500 transition-colors uppercase tracking-tight">{name}</h3>
              <span className="text-xs font-bold text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded-md">@{shortName}</span>
           </div>
           <div className="text-right">
              <span className="block text-emerald-500 text-xs font-black uppercase tracking-widest">{recruitment}</span>
           </div>
        </div>

        <p className="text-sm text-armoyu-text-muted font-medium line-clamp-2 min-h-[40px] mb-5">
           {description}
        </p>

        {/* Detay Satırı */}
        <div className="grid grid-cols-2 gap-3 mb-5">
           <div className="flex items-center gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-armoyu-text-muted opacity-60"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              <span className="text-[11px] font-bold text-armoyu-text-muted">{date}</span>
           </div>
           <div className="flex items-center gap-2 p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-armoyu-text-muted opacity-60"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
              <span className="text-[11px] font-bold text-armoyu-text-muted">{tag}</span>
           </div>
        </div>

        <Link 
          href={groupUrl}
          className="w-full py-3.5 block text-center rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-xs uppercase tracking-widest shadow-lg shadow-blue-500/20 transform active:scale-95 transition-all"
        >
           Gruba Katıl / Görüntüle
        </Link>
      </div>

    </div>
  );
}
