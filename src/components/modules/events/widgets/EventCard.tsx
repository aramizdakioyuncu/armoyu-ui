'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Edit3, 
  Trash2,
  Gamepad2
} from 'lucide-react';
import { ArmoyuEvent } from '@armoyu/core';

interface EventCardProps {
  event: ArmoyuEvent | any;
  isOwner?: boolean;
  onEdit?: (event: any) => void;
  onDelete?: (id: string | number) => void;
  profilePrefix?: string;
}

export function EventCard({ event, isOwner, onEdit, onDelete, profilePrefix = '/etkinlikler' }: EventCardProps) {
  // Extract date and time if they are in the merged format
  const [datePart, timePart] = (event.date || '').split(' ');
  
  return (
    <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group relative overflow-hidden flex flex-col hover:border-blue-500/50 transition-colors duration-500 h-full">
      {/* Game Tag & Admin Actions */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-600/10 text-blue-500 rounded-xl text-[9px] font-black uppercase tracking-widest italic border border-blue-500/10">
          <Gamepad2 size={12} />
          {event.gameName || event.game || 'Genel'}
        </div>
        {isOwner && (
          <div className="flex gap-2">
            <button 
              onClick={() => onEdit?.(event)} 
              className="p-2.5 text-armoyu-text-muted hover:text-amber-500 transition-colors bg-black/5 dark:bg-white/5 rounded-xl border border-transparent hover:border-amber-500/20"
              title="Düzenle"
            >
              <Edit3 size={14} />
            </button>
            <button 
              onClick={() => onDelete?.(event.id)} 
              className="p-2.5 text-armoyu-text-muted hover:text-red-500 transition-colors bg-black/5 dark:bg-white/5 rounded-xl border border-transparent hover:border-red-500/20"
              title="Sil"
            >
              <Trash2 size={14} />
            </button>
          </div>
        )}
      </div>

      <h4 className="text-xl font-black text-armoyu-text mb-4 uppercase italic leading-tight group-hover:text-blue-500 transition-colors line-clamp-2 min-h-[3rem]">
        {event.name || event.title}
      </h4>

      <div className="space-y-3 mb-8">
        <div className="flex items-center gap-3 text-xs font-bold text-armoyu-text-muted italic uppercase leading-none">
          <div className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
            <Calendar size={14} className="text-blue-500" />
          </div>
          {datePart || event.date}
        </div>
        <div className="flex items-center gap-3 text-xs font-bold text-armoyu-text-muted italic uppercase leading-none">
          <div className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
            <Clock size={14} className="text-blue-500" />
          </div>
          {timePart || event.time || '00:00'}
        </div>
      </div>

      <Link 
        href={`${profilePrefix}/${event.id}`} 
        className="mt-auto w-full py-4 bg-black/5 dark:bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-armoyu-text-muted hover:text-white transition-all uppercase tracking-widest italic border border-black/5 dark:border-white/5"
      >
        DETAYLARI GÖR <ChevronRight size={14} />
      </Link>
    </div>
  );
}
