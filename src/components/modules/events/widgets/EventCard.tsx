'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Calendar, 
  Clock, 
  ChevronRight, 
  Edit3, 
  Trash2,
  Gamepad2,
  Users,
  UserCircle,
  ShieldCheck
} from 'lucide-react';
import { ArmoyuEvent } from '../../../../models/community/ArmoyuEvent';

interface EventCardProps {
  event: ArmoyuEvent;
  isOwner?: boolean;
  onEdit?: (event: any) => void;
  onDelete?: (id: string | number) => void;
  profilePrefix?: string;
  getEventLink?: (event: ArmoyuEvent) => string;
}

export function EventCard({ 
  event, 
  isOwner, 
  onEdit, 
  onDelete, 
  profilePrefix = '/etkinlikler',
  getEventLink
}: EventCardProps) {
  // Extract date and time if they are in the merged format
  const [datePart, timePart] = (event.date || '').split(' ');
  
  return (
    <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group relative overflow-hidden flex flex-col hover:border-blue-500/50 transition-colors duration-500 h-full">
      {/* Event Image / Thumbnail */}
      <div className="relative h-48 -mx-6 -mt-6 mb-6 overflow-hidden">
        {event.thumbnail ? (
          <img 
            src={event.thumbnail} 
            alt={event.name} 
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 flex items-center justify-center">
            <Calendar size={48} className="text-blue-500/20" />
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-armoyu-card-bg via-transparent to-transparent opacity-60" />
        
        {/* Floating Game Tag */}
        <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 bg-black/60 backdrop-blur-md text-white rounded-xl text-[9px] font-black uppercase tracking-widest italic border border-white/10">
          <Gamepad2 size={12} className="text-blue-500" />
          {event.gameName || 'Genel'}
        </div>

        {/* Game Logo Overlay */}
        {event.gameLogo && (
          <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white/10 backdrop-blur-md border border-white/20 overflow-hidden shadow-lg p-1">
            <img src={event.gameLogo} className="w-full h-full object-contain" alt="Game Logo" />
          </div>
        )}

        {isOwner && (
          <div className="absolute top-4 right-4 flex gap-2">
            <button 
              onClick={() => onEdit?.(event)} 
              className="p-2 text-white hover:text-amber-500 transition-colors bg-black/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-amber-500/20"
              title="Düzenle"
            >
              <Edit3 size={12} />
            </button>
            <button 
              onClick={() => onDelete?.(event.id)} 
              className="p-2 text-white hover:text-red-500 transition-colors bg-black/40 backdrop-blur-md rounded-xl border border-white/10 hover:border-red-500/20"
              title="Sil"
            >
              <Trash2 size={12} />
            </button>
          </div>
        )}
      </div>

      <h4 className="text-xl font-black text-armoyu-text mb-4 uppercase italic leading-tight group-hover:text-blue-500 transition-colors line-clamp-2 min-h-[3rem]">
        {event.name}
      </h4>

      <div className="space-y-5 mb-8">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3 text-xs font-bold text-armoyu-text-muted italic uppercase leading-none">
             <div className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
               <Calendar size={14} className="text-blue-500" />
             </div>
             {datePart || event.date}
           </div>

           {/* Event Type Badge */}
           <div className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-[9px] font-black uppercase italic border ${
               event.type?.toLowerCase() === 'bireysel' 
                 ? 'bg-cyan-500/10 text-cyan-500 border-cyan-500/10' 
                 : 'bg-indigo-500/10 text-indigo-500 border-indigo-500/10'
           }`}>
               {event.type?.toLowerCase() === 'bireysel' ? <UserCircle size={12} /> : <Users size={12} />}
               {event.type || 'Bireysel'}
           </div>
        </div>
        
        <div className="flex items-center justify-between gap-4">
           <div className="flex items-center gap-3 text-xs font-bold text-armoyu-text-muted italic uppercase leading-none">
             <div className="p-1.5 bg-black/5 dark:bg-white/5 rounded-lg border border-black/5 dark:border-white/5">
               <Clock size={14} className="text-blue-500" />
             </div>
             {timePart || '00:00'}
           </div>

           {/* Participant Count */}
           <div className="flex items-center gap-2 px-3 py-1.5 bg-emerald-500/10 text-emerald-500 rounded-xl text-[9px] font-black uppercase italic border border-emerald-500/10">
              <Users size={12} />
              {event.getParticipantProgress()} KATILIMCI
           </div>
        </div>

        {/* Participant Progress Bar */}
        <div className="w-full h-1 bg-black/10 dark:bg-white/5 rounded-full overflow-hidden">
           <div 
             className="h-full bg-blue-500 rounded-full" 
             style={{ width: `${Math.min((event.currentParticipants / (event.participantLimit || 100)) * 100, 100)}%` }}
           />
        </div>

        {event.location && (
          <div className="flex items-center gap-3 text-[10px] font-bold text-armoyu-text-muted opacity-60 uppercase italic">
             <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
             {event.location}
          </div>
        )}

        {/* Organizer Quick Info */}
        {event.organizers && event.organizers.length > 0 && (
          <div className="pt-4 border-t border-white/5 flex items-center justify-between">
             <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/5 overflow-hidden border border-white/10 shrink-0">
                   <img src={event.organizers[0].avatar} className="w-full h-full object-cover" alt="" />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none">DÜZENLEYEN</span>
                   <span className="text-[10px] font-bold text-white uppercase tracking-tighter truncate max-w-[120px]">{event.organizers[0].displayName}</span>
                </div>
             </div>
             
             <div className="p-1.5 bg-blue-600/10 rounded-lg text-blue-500">
                <ShieldCheck size={12} />
             </div>
          </div>
        )}
      </div>

      <Link 
        href={getEventLink ? getEventLink(event) : (event.id ? (profilePrefix.includes('?') ? `${profilePrefix}${event.id}` : `${profilePrefix}/${event.id}`) : event.link)} 
        className="mt-auto w-full py-4 bg-black/5 dark:bg-white/5 hover:bg-blue-600 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-armoyu-text-muted hover:text-white transition-all uppercase tracking-widest italic border border-black/5 dark:border-white/5"
      >
        DETAYLARI GÖR <ChevronRight size={14} />
      </Link>
    </div>
  );
}
