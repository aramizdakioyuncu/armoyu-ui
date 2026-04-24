import React from 'react';
import { Calendar, Eye, MessageSquare } from 'lucide-react';

interface NewsDetailHeroProps {
  title: string;
  category: string;
  date: string;
  views: number;
}

export function NewsDetailHero({ title, category, date, views }: NewsDetailHeroProps) {
  return (
    <div className="space-y-4">
      <span className="px-4 py-1.5 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg inline-block">
        {category || 'GENEL'}
      </span>
      <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic leading-tight">
        {title}
      </h1>
      
      <div className="flex flex-wrap items-center gap-6 text-armoyu-text-muted pt-2 border-b border-white/5 pb-6">
        <div className="flex items-center gap-2">
          <Calendar size={14} className="text-blue-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider">{date}</span>
        </div>
        <div className="flex items-center gap-2">
          <Eye size={14} className="text-emerald-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider">{views} Görüntülenme</span>
        </div>
        <div className="flex items-center gap-2">
          <MessageSquare size={14} className="text-orange-500" />
          <span className="text-[11px] font-bold uppercase tracking-wider">0 Yorum</span>
        </div>
      </div>
    </div>
  );
}
