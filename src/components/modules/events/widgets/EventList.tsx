'use client';

import React, { useState } from 'react';
import { Plus, Calendar, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { EventCard } from './EventCard';
import { EventFormModal } from './EventFormModal';

interface EventListProps {
   events: any[];
   setEvents?: (events: any) => void;
   isOwner?: boolean;
   profilePrefix?: string;
   title?: string;
   viewMode?: 'grid' | 'table';
   getEventLink?: (event: any) => string;
}

export function EventList({ 
  events, 
  setEvents, 
  isOwner, 
  profilePrefix = "/etkinlikler",
  title = "ETKİNLİKLER",
  viewMode = 'grid',
  getEventLink
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
                <div className="w-1.5 h-8 bg-armoyu-primary rounded-full" />
                <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">{title}</h3>
             </div>
             {isOwner && setEvents && (
                <button
                   onClick={() => { setEditingEvent(null); setIsModalOpen(true); }}
                   className="flex items-center gap-2 px-6 py-3 bg-armoyu-primary/10 hover:bg-armoyu-primary text-armoyu-primary hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic shadow-lg shadow-armoyu-primary/5 hover:shadow-armoyu-primary/20 active:scale-95"
                >
                   <Plus size={16} /> ETKİNLİK OLUŞTUR
                </button>
             )}
          </div>

          {events.length === 0 ? (
             <div className="py-32 bg-black/5 dark:bg-white/5 rounded-[40px] border border-dashed border-armoyu-card-border flex flex-col items-center justify-center text-center px-6">
                <div className="w-20 h-20 rounded-[30px] bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary mb-6 animate-pulse">
                   <Calendar size={36} />
                </div>
                <h4 className="text-lg font-black text-white uppercase italic tracking-tighter mb-2">Henüz Etkinlik Yok</h4>
                <p className="text-armoyu-text-muted font-bold opacity-60 uppercase tracking-widest text-[9px] italic max-w-xs">
                   Bu kategoride henüz bir aktivite planlanmamış. Yeni maceralar için takipte kal!
                </p>
             </div>
          ) : viewMode === 'grid' ? (
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {events.map((event: any) => (
                   <EventCard 
                     key={event.id}
                     event={event}
                     isOwner={isOwner}
                     onEdit={(e) => { setEditingEvent(e); setIsModalOpen(true); }}
                     onDelete={handleDelete}
                     getEventLink={getEventLink}
                     profilePrefix={profilePrefix}
                   />
                ))}
             </div>
          ) : (
            <div className="overflow-hidden rounded-[40px] border border-white/5 bg-black/20 backdrop-blur-xl">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5">
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">Etkinlik</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">Düzenleyen</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">Oyun</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">Zaman</th>
                    <th className="px-6 py-5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">Tür</th>
                    <th className="px-6 py-5 text-right text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted italic">İşlem</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {events.map((event: any) => (
                    <tr key={event.id} className="group hover:bg-armoyu-primary/5 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-xl bg-white/5 overflow-hidden border border-white/10 shrink-0">
                            <img src={event.thumbnail || event.gameLogo} className="w-full h-full object-cover" alt="" />
                          </div>
                          <span className="text-sm font-bold text-white group-hover:text-armoyu-primary transition-colors">{event.name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          {event.organizers && event.organizers.length > 0 ? (
                            <>
                              <img src={event.organizers[0].avatar} className="w-6 h-6 rounded-lg object-cover" alt="" />
                              <span className="text-[10px] font-black text-white uppercase tracking-tighter opacity-80">{event.organizers[0].displayName}</span>
                            </>
                          ) : (
                            <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-40 italic">PLATFORM</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="text-xs font-bold text-armoyu-text-muted opacity-80 uppercase">{event.gameName || 'Genel'}</span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex flex-col">
                          <span className="text-xs font-black text-white italic">{event.date?.split(' ')[0]}</span>
                          <span className="text-[10px] font-bold text-armoyu-primary opacity-60 uppercase">{event.date?.split(' ')[1] || '00:00'}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                         <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">
                           {event.type || 'Bireysel'}
                         </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <Link 
                          href={getEventLink ? getEventLink(event) : (event.link || `${profilePrefix}/${event.id}`)}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-armoyu-primary/10 hover:bg-armoyu-primary text-armoyu-primary hover:text-white rounded-xl transition-all text-[9px] font-black uppercase tracking-widest italic"
                        >
                          DETAY <ChevronRight size={12} />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
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
