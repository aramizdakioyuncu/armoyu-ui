'use client';

import React from 'react';
import Link from 'next/link';
import { User } from '../../../../models/auth/User';

export interface NewsCardProps {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  author: User | null;
  baseUrl?: string;
}

export function NewsCard({ slug, title, excerpt, date, category, image, author, baseUrl = '/haberler/' }: NewsCardProps) {
  return (
    <Link href={`${baseUrl}${slug}`} className="group block">
      <div className="glass-panel rounded-3xl overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-sm hover:shadow-2xl transition-all duration-500 h-full flex flex-col">
        
        {/* Resim */}
        <div className="aspect-video overflow-hidden relative bg-zinc-800">
          <img 
            src={image || undefined} 
            alt={title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute top-4 left-4">
             <span className="bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest px-3 py-1.5 rounded-xl shadow-lg shadow-armoyu-primary/20">
                {category || 'Haber'}
             </span>
          </div>
        </div>

        {/* İçerik */}
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center gap-3 mb-3 text-[10px] font-bold text-armoyu-text-muted opacity-60">
             <span className="flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
                {date}
             </span>
             <span>•</span>
             <span className="flex items-center gap-1 uppercase tracking-widest text-armoyu-primary font-black">
                {author?.displayName || 'Armoyu Ekibi'}
             </span>
          </div>

          <h3 className="text-xl font-black text-armoyu-text group-hover:text-armoyu-primary transition-colors mb-4 line-clamp-2 leading-tight">
             {title}
          </h3>

          <p className="text-sm text-armoyu-text-muted font-medium line-clamp-3 mb-6 flex-1 italic">
             "{excerpt}"
          </p>

          <div className="flex items-center gap-2 text-armoyu-primary font-black text-xs uppercase tracking-widest group-hover:translate-x-1 transition-transform">
             Devamını Oku
             <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </div>
        </div>
      </div>
    </Link>
  );
}
