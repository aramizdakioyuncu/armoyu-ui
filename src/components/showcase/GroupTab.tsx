'use client';

import React, { useState, useMemo } from 'react';
import { GroupCard } from '../modules/groups/widgets/GroupCard';
import { ListToolbar } from '../shared/ListToolbar';
import { PageWidth } from '../shared/PageWidth';
import { groupList } from '../../lib/constants/seedData';
import { type ViewMode } from '../ViewModeToggle';
import { useArmoyu } from '../../context/ArmoyuContext';
import { Group } from '../../models/community/Group';
import { Wifi, Database, Loader2, Play } from 'lucide-react';
import Link from 'next/link';

export function GroupTab() {
  const { api, apiKey } = useArmoyu();
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [isLiveMode, setIsLiveMode] = useState(false);
  const [liveGroups, setLiveGroups] = useState<Group[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const categories = ['Hepsi', 'E-Spor/Takım', 'Spor', 'Spor/Takım', 'Yazılım'];

  const fetchLiveGroups = async () => {
    if (apiKey === 'armoyu_showcase_key') return;
    setIsLoading(true);
    try {
      const response = await api.groups.getGroups(1);
      console.log("[GroupTab] Raw Groups Response:", response);
      
      const data = Array.isArray(response.icerik) ? response.icerik : (response.icerik ? [response.icerik] : []);
      if (Array.isArray(data)) {
        setLiveGroups(data.map((g: any) => Group.fromAPI(g)));
      }
    } catch (error) {
      console.error("[GroupTab] Fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleLive = () => {
    if (!isLiveMode) {
      fetchLiveGroups();
    }
    setIsLiveMode(!isLiveMode);
  };

  const currentGroups = isLiveMode ? liveGroups : groupList;

  const filteredGroups = useMemo(() => {
    return currentGroups.filter(group => {
      const matchesTab = activeTab === 'Hepsi' || group.category === activeTab;
      const matchesSearch =
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.shortName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (group.description || '').toLowerCase().includes(searchQuery.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [activeTab, searchQuery, currentGroups]);

  const tabCounts = useMemo(() => {
    const counts: Record<string, number> = {};
    categories.forEach(cat => {
      counts[cat] = cat === 'Hepsi'
        ? currentGroups.length
        : currentGroups.filter(g => g.category === cat).length;
    });
    return counts;
  }, [currentGroups]);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 px-4">
          <div className="space-y-1">
             <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-blue-500 pl-4 flex items-center gap-3 text-armoyu-text">
                GRUP TOPLULUKLARI
                {isLiveMode && (
                   <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500/10 text-blue-500 text-[10px] font-black rounded-full animate-pulse">
                      <Wifi className="w-3 h-3" />
                      CANLI
                   </span>
                )}
             </h3>
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
            
            <span>{isLiveMode ? 'API MODU AKTİF' : 'API\'DEN VERİLERİ ÇEK'}</span>
          </button>
       </div>

      {/* ListToolbar */}
      <ListToolbar
        title=""
        subtitle="ARMOYU dünyasındaki gruplara, takımlara ve çalışma gruplarına katılarak oyun deneyimini zirveye taşı."
        tabs={categories}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        tabCounts={tabCounts}
        searchPlaceholder="Grup ara..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
        resultCount={filteredGroups.length}
      />

      {/* Groups — Grid veya Table görünümü */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGroups.map((group, idx) => (
            <GroupCard 
              key={idx} 
              {...group} 
              slug={group.slug || group.name.toLowerCase().replace(/\s+/g, '-')} 
            />
          ))}

          {/* Yeni Grup Oluştur Card */}
          <div className="border-4 border-dashed border-armoyu-card-border rounded-3xl flex flex-col items-center justify-center p-8 text-center group hover:border-blue-500 transition-colors cursor-pointer min-h-[400px]">
            <div className="w-16 h-16 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center mb-4 group-hover:scale-110 group-hover:bg-blue-500 group-hover:text-white transition-all duration-300 shadow-lg shadow-blue-500/10">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
            </div>
            <h3 className="font-black text-armoyu-text text-xl mb-2">Kendi Grubunu Kur</h3>
            <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-6">Fikirlerini paylaşacak bir ekip mi arıyorsun? Hemen bir topluluk oluştur.</p>
            <button className="px-6 py-2.5 bg-armoyu-text text-armoyu-bg rounded-xl font-black text-xs uppercase tracking-widest hover:opacity-90 transition-opacity">Başlat</button>
          </div>
        </div>
      ) : (
        /* Tablo Görünümü */
        <div className="overflow-x-auto rounded-2xl border border-armoyu-card-border bg-armoyu-card-bg">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-armoyu-card-border bg-black/5 dark:bg-white/5">
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Grup</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hidden md:table-cell">Kategori</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hidden lg:table-cell">Kuruluş</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">Alım</th>
                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted text-right">İşlem</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-armoyu-card-border">
              {filteredGroups.map((group, idx) => {
                const slug = group.slug || group.name.toLowerCase().replace(/\s+/g, '-');
                return (
                  <tr key={idx} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors group/row">
                    <td className="px-6 py-4">
                      <Link href={`/gruplar/${slug}`} className="flex items-center gap-4">
                        <img src={group.logo} alt={group.name} className="w-10 h-10 rounded-xl object-cover border border-armoyu-card-border" />
                        <div>
                          <p className="text-sm font-black text-armoyu-text group-hover/row:text-blue-500 transition-colors">{group.name}</p>
                          <p className="text-xs font-bold text-blue-500">@{group.shortName}</p>
                        </div>
                      </Link>
                    </td>
                    <td className="px-6 py-4 hidden md:table-cell">
                      <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-lg border border-black/5 dark:border-white/5">
                        {group.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      <span className="text-xs font-bold text-armoyu-text-muted">{group.date}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs font-black uppercase tracking-widest ${group.recruitment === 'Açık' ? 'text-emerald-500' : 'text-red-400'}`}>
                        {group.recruitment}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Link 
                        href={`/gruplar/${slug}`}
                        className="px-4 py-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
                      >
                        Görüntüle
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
