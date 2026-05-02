'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ListToolbar } from '../../shared/ListToolbar';
import { eventList } from '../../../lib/constants/stationData';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { ArmoyuEvent } from '../../../models/community/ArmoyuEvent';
import { ArmoyuEvent as ArmoyuEventCore } from '@armoyu/core';
import { Loader2 } from 'lucide-react';
import { EventList } from './widgets/EventList';
import { EventsLayout } from './EventsLayout';
import { EventShowcase } from './widgets/EventShowcase';
import { DetailPage } from './DetailPage';
import { useRouter, useSearchParams } from 'next/navigation';

interface EventsPageProps {
    initialEvents?: ArmoyuEvent[];
    title?: string;
    profilePrefix?: string;
    getEventLink?: (event: ArmoyuEvent) => string;
    activeEventId?: string | number;
}

export function EventsPage({ 
  initialEvents, 
  title = "ETKİNLİKLER", 
  profilePrefix = "/etkinlikler",
  getEventLink,
  activeEventId: propEventId
}: EventsPageProps) {
  const { api, apiKey } = useArmoyu();
  const router = useRouter();
  const searchParams = useSearchParams();
  const eventId = propEventId || searchParams.get('id');

  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
  const [events, setEvents] = useState<ArmoyuEvent[]>(initialEvents || []);
  const [isLoading, setIsLoading] = useState(!initialEvents);

  const categories = ['Hepsi', 'Bireysel', 'Gruplu', 'Turnuva', 'Toplantı', 'Diğer'];

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      console.log('[EventsPage] Fetching events...');
      const response = await api.events.getEvents(1, { limit: 50 });
      const data = response.icerik || [];
      
      if (Array.isArray(data) && data.length > 0) {
          setEvents(data.map((e: ArmoyuEventCore) => ArmoyuEvent.fromClass(e)));
      } else if (!apiKey || apiKey === 'armoyu_showcase_key') {
          setEvents(eventList.map(e => ArmoyuEvent.fromAPI(e as any)));
      }
    } catch (error) {
      console.error("[EventsPage] Fetch failed:", error);
      setEvents(eventList.map(e => ArmoyuEvent.fromAPI(e as any)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialEvents) {
        setEvents(initialEvents);
        setIsLoading(false);
        return;
    }
    fetchEvents();
  }, [api, apiKey, initialEvents]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const eventType = event.type?.toLowerCase() || '';
      const activeTabLower = activeTab.toLowerCase();

      const matchesTab = activeTab === 'Hepsi' || 
                         eventType === activeTabLower ||
                         (activeTab === 'Diğer' && !['bireysel', 'gruplu', 'turnuva', 'toplantı'].includes(eventType));
      
      const matchesSearch =
        (event.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.gameName || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, events]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      if (cat === 'Hepsi') counts[cat] = events.length;
      else if (cat === 'Diğer') {
        counts[cat] = events.filter(e => !['bireysel', 'gruplu', 'turnuva', 'toplantı'].includes(e.type?.toLowerCase() || '')).length;
      } else {
        counts[cat] = events.filter(e => (e.type?.toLowerCase() || '') === cat.toLowerCase()).length;
      }
    });
    return counts;
  }, [events]);

  // Handle Detail View (Moved after hooks to avoid hook order violation)
  if (eventId) {
    const selectedEvent = events.find(e => String(e.id) === String(eventId));
    return (
      <EventsLayout>
        <DetailPage 
          eventId={eventId} 
          initialData={selectedEvent}
          onBack={() => router.push(profilePrefix.split('&id=')[0].split('?id=')[0])} 
        />
      </EventsLayout>
    );
  }

  if (isLoading) {
      return (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-armoyu-primary" />
              <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted animate-pulse italic">Etkinlikler Yükleniyor...</span>
          </div>
      );
  }

  return (
    <EventsLayout>
      <div className="space-y-4 w-full">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
            <div className="flex flex-col gap-1">
                <h3 className="text-3xl font-black italic uppercase tracking-tighter border-l-4 border-armoyu-primary pl-6 text-armoyu-text leading-none">
                    {title}
                </h3>
                <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest pl-6 opacity-60 italic mt-2">
                    Topluluk aktiviteleri ve turnuva listesi
                </p>
            </div>
            
            <button 
                onClick={() => { setIsLoading(true); fetchEvents(); }}
                className="flex items-center gap-2 px-5 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl transition-all text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-white group active:scale-95"
            >
                <div className="w-1.5 h-1.5 rounded-full bg-armoyu-primary group-hover:animate-ping" />
                Yenile
            </button>
        </div>

        <EventShowcase onFilter={setSearchQuery} />

        <div className="mt-4">
            <ListToolbar
                title=""
                subtitle=""
                tabs={categories}
                activeTab={activeTab}
                onTabChange={setActiveTab}
                tabCounts={tabCounts}
                searchPlaceholder="Etkinlik veya oyun ara..."
                searchValue={searchQuery}
                onSearchChange={setSearchQuery}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                resultCount={filteredEvents.length}
                hideViewMode={false}
            />
        </div>

        <div className="mt-8 text-left">
            <EventList
                events={filteredEvents}
                setEvents={setEvents}
                isOwner={false}
                viewMode={viewMode}
                profilePrefix={profilePrefix}
                getEventLink={getEventLink}
                title={`Aktif ${activeTab !== 'Hepsi' ? activeTab : ''} Listesi`}
            />
        </div>
      </div>
    </EventsLayout>
  );
}
