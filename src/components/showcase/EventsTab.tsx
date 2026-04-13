'use client';

import React, { useState, useEffect, useMemo } from 'react';
import { GroupEventsList } from '../modules/community/widgets/GroupEventsList';
import { ListToolbar } from '../shared/ListToolbar';
import { PageWidth } from '../shared/PageWidth';
import { eventList } from '../../lib/constants/stationData';
import { useArmoyu } from '../../context/ArmoyuContext';
import { ArmoyuEvent } from '@armoyu/core';
import { Wifi, Database, Loader2, Play } from 'lucide-react';

export function EventsTab() {
  const { api, apiKey } = useArmoyu();
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveEvents, setLiveEvents] = useState<ArmoyuEvent[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Hepsi', 'Turnuva', 'Toplantı', 'Eğlence', 'Diğer'];

  const fetchLiveEvents = async () => {
    if (!apiKey || apiKey === 'armoyu_showcase_key') return;
    setIsLoading(true);
    try {
      const events = await api.events.getEvents();
      console.log("[EventsTab] Raw Events Response:", events);
      
      const data = Array.isArray(events) ? events : ((events as any)?.icerik || (events as any)?.liste || []);
      if (Array.isArray(data)) {
        // Map to ArmoyuEvent if they aren't already (BaseService handleResponse usually handles this if types are set, 
        // but let's be safe and ensure consistent mapping)
        const mapped = data.map((e: any) => e instanceof ArmoyuEvent ? e : ArmoyuEvent.fromJSON(e));
        setLiveEvents(mapped);
      }
    } catch (error) {
      console.error("[EventsTab] Fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLive = () => {
    if (!isLiveMode) {
      fetchLiveEvents();
    }
    setIsLiveMode(!isLiveMode);
  };

  const currentEvents = isLiveMode ? liveEvents : eventList;

  const filteredEvents = useMemo(() => {
    return currentEvents.filter(event => {
      const matchesTab = activeTab === 'Hepsi' || (event as any).category === activeTab || event.type === activeTab;
      const matchesSearch =
        event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (event as any).game?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.gameName.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, currentEvents]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = cat === 'Hepsi'
        ? currentEvents.length
        : currentEvents.filter(e => ((e as any).category === cat || e.type === cat)).length;
    });
    return counts;
  }, [currentEvents]);

  // For GroupEventsList compatibility, wrap setLiveEvents
  const handleSetEvents = (newEvents: any) => {
    if (typeof newEvents === 'function') {
      setLiveEvents(newEvents);
    } else {
      setLiveEvents(newEvents);
    }
  };

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
          <div className="space-y-1 text-left">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-blue-500 pl-4 flex items-center gap-3 text-armoyu-text">
                PLATFORM ETKİNLİKLERİ
                {isLiveMode && (
                   <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded-full animate-pulse">
                      <Wifi className="w-3 h-3" />
                      CANLI
                   </span>
                )}
             </h3>
             <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest pl-4 opacity-60">
                Turnuvalar, Toplantılar ve Topluluk Buluşmaları
             </p>
          </div>

          <button
            onClick={handleToggleLive}
            disabled={isLoading}
            className={`group relative flex items-center gap-3 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all active:scale-95 ${
              isLiveMode 
                ? 'bg-blue-600 text-white shadow-[0_10px_30px_rgba(37,99,235,0.3)]' 
                : 'bg-zinc-100 dark:bg-white/5 text-zinc-500 dark:text-zinc-400 hover:bg-zinc-200 dark:hover:bg-white/10'
            }`}
          >
            {isLoading ? (
               <Loader2 className="w-4 h-4 animate-spin" />
            ) : isLiveMode ? (
               <Database className="w-4 h-4" />
            ) : (
               <Play className="w-4 h-4 fill-current" />
            )}
            
            <span>{isLiveMode ? 'API MODU AKTİF' : 'API\'DEN ETKİNLİKLERİ ÇEK'}</span>
          </button>
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
        onViewModeChange={() => {}}
        resultCount={filteredEvents.length}
        hideViewMode={true}
      />

      <div className="mt-8 text-left">
        <GroupEventsList 
          events={filteredEvents}
          setEvents={handleSetEvents}
          isGroupAdmin={false}
        />
      </div>
    </div>
  );
}
