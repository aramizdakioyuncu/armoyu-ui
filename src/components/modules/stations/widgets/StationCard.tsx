'use client';

import React from 'react';
import Link from 'next/link';
import { Station } from '../../../../models/community/Station';

import { MapPin, Star, Coffee, Monitor, Trophy, Dumbbell, ChevronRight } from 'lucide-react';

export function StationCard(station: Station) {
  const Icon = {
    'YEMEK': Coffee,
    'INTERNET_KAFE': Monitor,
    'HALI_SAHA': Trophy,
    'SPOR_KOMPLEKSI': Dumbbell
  }[station.type];

  const typeLabel = {
    'YEMEK': 'Yemek & Kahve',
    'INTERNET_KAFE': 'İnternet Kafe',
    'HALI_SAHA': 'Halı Saha',
    'SPOR_KOMPLEKSI': 'Spor Kompleksi'
  }[station.type];

  const typeColor = {
    'YEMEK': 'text-amber-500 bg-amber-500/10',
    'INTERNET_KAFE': 'text-blue-500 bg-blue-500/10',
    'HALI_SAHA': 'text-emerald-500 bg-emerald-500/10',
    'SPOR_KOMPLEKSI': 'text-purple-500 bg-purple-500/10'
  }[station.type];

  return (
    <div className="group relative glass-panel rounded-[32px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg hover:shadow-2xl transition-all duration-500 flex flex-col h-full animate-in fade-in zoom-in duration-700">
      {/* Banner */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={station.banner} 
          alt={station.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        
        {/* Type Badge */}
        <div className={`absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10 ${typeColor}`}>
           <Icon size={14} strokeWidth={2.5} />
           <span className="text-[10px] font-black uppercase tracking-widest">{typeLabel}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1 relative">
        {/* Logo Overlay */}
        <div className="absolute -top-10 left-6 w-20 h-20 rounded-2xl border-4 border-armoyu-card-bg overflow-hidden shadow-xl bg-white">
           <img src={station.logo} alt={station.name} className="w-full h-full object-cover" />
        </div>

        <div className="mt-12 flex-1">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors truncate pr-2">
              {station.name}
            </h3>
            <div className="flex items-center gap-1 shrink-0">
               <Star size={14} className="text-amber-500 fill-amber-500" />
               <span className="text-sm font-black text-armoyu-text">{station.rating}</span>
            </div>
          </div>

          <div className="flex items-center gap-2 mb-4 text-armoyu-text-muted">
             <MapPin size={14} className="shrink-0 opacity-50" />
             <span className="text-xs font-bold truncate">{station.location}</span>
          </div>

          <p className="text-sm text-armoyu-text-muted font-medium line-clamp-2 leading-relaxed mb-6 opacity-80">
            {station.description}
          </p>
        </div>

        {/* Footer */}
        <div className="pt-6 border-t border-armoyu-card-border flex items-center justify-between">
           <div className="flex flex-col">
              <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-50">YORUMLAR</span>
              <span className="text-xs font-black text-armoyu-text">{station.reviewCount} Değerlendirme</span>
           </div>
           
           <Link 
             href={`/istasyonlar/${station.slug}`}
             className="w-10 h-10 rounded-xl bg-armoyu-text dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg"
           >
              <ChevronRight size={20} strokeWidth={3} />
           </Link>
        </div>
      </div>
    </div>
  );
}
