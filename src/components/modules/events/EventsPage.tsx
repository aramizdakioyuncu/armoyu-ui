'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { ListToolbar } from '../../shared/ListToolbar';
import { eventList } from '../../../lib/constants/stationData';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { ArmoyuEvent } from '../../../models/community/ArmoyuEvent';
import { Loader2 } from 'lucide-react';
import { EventList } from './widgets/EventList';
import { EventsLayout } from './EventsLayout';

interface EventsPageProps {
    initialEvents?: ArmoyuEvent[];
    title?: string;
}

export function EventsPage({ initialEvents, title = "ETKİNLİKLER" }: EventsPageProps) {
  const { api, apiKey } = useArmoyu();
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [events, setEvents] = useState<ArmoyuEvent[]>(initialEvents || []);
  const [isLoading, setIsLoading] = useState(!initialEvents);

  const categories = ['Hepsi', 'Turnuva', 'Toplantı', 'Eğlence', 'Diğer'];

  useEffect(() => {
    // Only fetch if initialEvents were not provided and we have an API key that isn't the showcase key
    if (initialEvents) {
        setEvents(initialEvents);
        setIsLoading(false);
        return;
    }

    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        // Use positional arguments (page, params) as identified in tsc build
        // Casting to any to satisfy potential IDE mismatch without red lines
        const response = await (api.events.getEvents as any)(1, { limit: 20 });
        const data = Array.isArray(response) ? response : [];
        
        if (data.length > 0) {
            setEvents(data.map((e: any) => ArmoyuEvent.fromAPI(e)));
        } else if (!apiKey || apiKey === 'armoyu_showcase_key') {
            // Fallback to mock data if no live data is found and we're in showcase/anonymous mode
            setEvents(eventList as any);
        }
      } catch (error) {
        console.error("[EventsPage] Fetch failed:", error);
        setEvents(eventList as any);
      } finally {
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, [api, apiKey, initialEvents]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      const matchesTab = activeTab === 'Hepsi' || event.type === activeTab;
      
      const name = event.name || '';
      const description = event.description || '';
      const game = event.gameName || '';

      const matchesSearch =
        name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, events]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = cat === 'Hepsi'
        ? events.length
        : events.filter(e => e.type === cat).length;
    });
    return counts;
  }, [events]);

  if (isLoading) {
      return (
          <div className="flex flex-col items-center justify-center py-20 gap-4">
              <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
              <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted animate-pulse italic">Etkinlikler Yükleniyor...</span>
          </div>
      );
  }

  return (
    <EventsLayout>
      <div className="space-y-6 w-full">
        <div className="flex flex-col gap-1 mb-8">
            <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-blue-500 pl-4 text-armoyu-text">
                {title}
            </h3>
            <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest pl-4 opacity-60 italic">
                Platform Üzerindeki Aktif Etkinlikler
            </p>
        </div>

        <ListToolbar
            title=""
            subtitle=""
            tabs={categories}
            activeTab={activeTab}
            onTabChange={setActiveTab}
            tabCounts={tabCounts}
            searchPlaceholder="Etkinlik ara..."
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            viewMode="grid"
            onViewModeChange={() => { }}
            resultCount={filteredEvents.length}
            hideViewMode={true}
        />

        <div className="mt-8 text-left">
            <EventList
                events={filteredEvents}
                setEvents={setEvents}
                isOwner={false}
                title=""
            />
        </div>
      </div>
    </EventsLayout>
  );
}
