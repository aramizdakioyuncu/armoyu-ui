'use client';

import React, { useState, useEffect } from 'react';
import { useArmoyu } from '../../context/ArmoyuContext';
import { EventCard } from '../../components/modules/events/widgets/EventCard';
import { ArmoyuEvent } from '../../models/community/ArmoyuEvent';
import { PageWidth } from '../../components/shared/PageWidth';
import { Calendar, Search, Filter } from 'lucide-react';

export default function EventsPage() {
  const { api } = useArmoyu();
  const [events, setEvents] = useState<ArmoyuEvent[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await api.events.getEvents(1);
        if (response.durum === 1 && response.icerik) {
          setEvents(response.icerik.map((e: any) => ArmoyuEvent.fromAPI(e)));
        }
      } catch (err) {
        console.error('[EventsPage] Fetch error:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, [api]);

  return (
    <div className="py-12 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[80%]" />
      <div className="flex flex-col gap-8 px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-black text-armoyu-text uppercase tracking-tighter italic flex items-center gap-3">
              <Calendar className="text-armoyu-primary" size={32} />
              Etkinlikler
            </h1>
            <p className="text-armoyu-text-muted font-bold text-sm uppercase tracking-widest mt-2 opacity-60">
              Tüm oyun etkinlikleri ve turnuvalar
            </p>
          </div>

          <div className="flex items-center gap-3">
             <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors" />
                <input 
                  type="text" 
                  placeholder="ETKİNLİK ARA..." 
                  className="pl-12 pr-6 py-3 bg-white/5 border border-armoyu-header-border rounded-2xl text-xs font-black uppercase tracking-widest focus:outline-none focus:ring-2 focus:ring-armoyu-primary/20 transition-all w-full md:w-64"
                />
             </div>
             <button className="p-3 bg-white/5 border border-armoyu-header-border rounded-2xl text-armoyu-text-muted hover:text-armoyu-primary transition-all">
                <Filter size={20} />
             </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-96 rounded-[40px] bg-white/5 animate-pulse border border-white/5" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {events.map(event => (
              <EventCard 
                key={event.id} 
                event={event} 
                profilePrefix="/etkinlikler" 
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
