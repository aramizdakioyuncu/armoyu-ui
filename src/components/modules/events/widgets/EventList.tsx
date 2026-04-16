'use client';

import React, { useState } from 'react';
import { Plus, Calendar } from 'lucide-react';
import { EventCard } from './EventCard';
import { EventFormModal } from './EventFormModal';

interface EventListProps {
   events: any[];
   setEvents?: (events: any) => void;
   isOwner?: boolean;
   profilePrefix?: string;
   title?: string;
}

export function EventList({ 
  events, 
  setEvents, 
  isOwner, 
  profilePrefix,
  title = "ETKİNLİKLER"
}: EventListProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEvent, setEditingEvent] = useState<any>(null);

    const handleSave = (eventData: any) => {
       if (setEvents) {
          if (editingEvent) {
             setEvents((prev: any[]) => prev.map((ev: any) => ev.id === editingEvent.id ? eventData : ev));
          } else {
             setEvents((prev: any[]) => [eventData, ...prev]);
          }
       }
       setIsModalOpen(false);
       setEditingEvent(null);
    };

    const handleDelete = (id: string | number) => {
       if (setEvents && window.confirm('Bu etkinliği silmek istediğinize emin misiniz?')) {
          setEvents((prev: any[]) => prev.filter((e: any) => e.id !== id));
       }
    };

    return (
       <div className="space-y-8">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-3">
                <div className="w-1.5 h-8 bg-blue-600 rounded-full" />
                <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">{title}</h3>
             </div>
             {isOwner && setEvents && (
                <button
                   onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
                   className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic shadow-lg shadow-blue-600/5 hover:shadow-blue-600/20 active:scale-95"
                >
                   <Plus size={16} /> ETKİNLİK OLUŞTUR
                </button>
             )}
          </div>

          {events.length === 0 ? (
             <div className="py-20 bg-black/5 dark:bg-white/5 rounded-[40px] border border-dashed border-armoyu-card-border flex flex-col items-center justify-center text-center px-6">
                <div className="w-16 h-16 rounded-3xl bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mb-4 opacity-40">
                   <Calendar size={32} />
                </div>
                <p className="text-armoyu-text-muted font-bold opacity-60 uppercase tracking-widest text-[10px] italic max-w-xs">
                   Henüz bir etkinlik bulunamadı. Yeni maceralar için takipte kal!
                </p>
             </div>
          ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {events.map((event: any) => (
                   <EventCard 
                     key={event.id}
                     event={event}
                     isOwner={isOwner}
                     onEdit={(e) => { setEditingEvent(e); setIsModalOpen(true); }}
                     onDelete={handleDelete}
                     profilePrefix={profilePrefix}
                   />
                ))}
             </div>
          )}

          <EventFormModal 
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSave}
            initialData={editingEvent}
          />
       </div>
    );
}
