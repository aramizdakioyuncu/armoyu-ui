'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Plus, Edit3, Trash2, Calendar, Clock, ChevronRight, X, Save } from 'lucide-react';

interface GroupEventsListProps {
   events: any[];
   setEvents: (events: any) => void;
   isGroupAdmin: boolean;
}

export function GroupEventsList({ events, setEvents, isGroupAdmin }: GroupEventsListProps) {
   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
   const [editingEvent, setEditingEvent] = useState<any>(null);

   const handleEventSave = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const eventData = {
         id: editingEvent?.id || `EVT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
         title: formData.get('title') as string,
         date: formData.get('date') as string,
         time: formData.get('time') as string,
         game: formData.get('game') as string,
         participants: editingEvent?.participants || 1,
         maxParticipants: 50,
         image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
      };

      if (editingEvent) {
         setEvents((prev: any[]) => prev.map((ev: any) => ev.id === editingEvent.id ? eventData : ev));
      } else {
         setEvents((prev: any[]) => [eventData, ...prev]);
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
   };

   return (
      <div className="space-y-8">
         <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP ETKİNLİKLERİ</h3>
            {isGroupAdmin && (
               <button
                  onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic"
               >
                  <Plus size={16} /> ETKİNLİK OLUŞTUR
               </button>
            )}
         </div>

         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {events.map((event: any) => (
               <div key={event.id} className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group relative overflow-hidden">
                  <div className="flex items-start justify-between mb-4">
                     <div className={`px-3 py-1 bg-blue-600/10 text-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest italic`}>
                        {event.game}
                     </div>
                     {isGroupAdmin && (
                        <div className="flex gap-1">
                           <button onClick={() => { setEditingEvent(event); setIsEventModalOpen(true); }} className="p-2 text-armoyu-text-muted hover:text-amber-500 transition-colors bg-white/5 rounded-lg">
                              <Edit3 size={14} />
                           </button>
                           <button onClick={() => setEvents((prev: any[]) => prev.filter((e: any) => e.id !== event.id))} className="p-2 text-armoyu-text-muted hover:text-red-500 transition-colors bg-white/5 rounded-lg">
                              <Trash2 size={14} />
                           </button>
                        </div>
                     )}
                  </div>
                  <h4 className="text-lg font-black text-armoyu-text mb-4 uppercase italic leading-tight">{event.title}</h4>
                  <div className="space-y-2 mb-6">
                     <div className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted italic uppercase leading-none">
                        <Calendar size={14} className="text-blue-500" /> {event.date}
                     </div>
                     <div className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted italic uppercase leading-none">
                        <Clock size={14} className="text-blue-500" /> {event.time}
                     </div>
                  </div>
                  <Link href={`/etkinlikler/${event.id}`} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-text transition-all uppercase tracking-widest italic">
                     DETAYLARI GÖR <ChevronRight size={14} />
                  </Link>
               </div>
            ))}
         </div>

         {/* Event Modal */}
         {isEventModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsEventModalOpen(false)} />
               <form onSubmit={handleEventSave} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                  <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <Calendar size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tighter">
                              {editingEvent ? 'ETKİNLİĞİ DÜZENLE' : 'YENİ ETKİNLİK'}
                           </h3>
                           <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Grup içi aktivite planla</p>
                        </div>
                     </div>
                     <button type="button" onClick={() => setIsEventModalOpen(false)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">BAŞLIK</label>
                        <input name="title" required defaultValue={editingEvent?.title} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: Haftalık Turnuva" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">OYUN</label>
                           <input name="game" required defaultValue={editingEvent?.game} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: Minecraft" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">TARİH</label>
                           <input name="date" required defaultValue={editingEvent?.date} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: 24.04.2024" />
                        </div>
                     </div>
                     <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic">
                        <Save size={18} /> {editingEvent ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ETKİNLİĞİ OLUŞTUR'}
                     </button>
                  </div>
               </form>
            </div>
         )}
      </div>
   );
}
