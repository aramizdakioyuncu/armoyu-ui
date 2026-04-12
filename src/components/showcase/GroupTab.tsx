'use client';

import React, { useState, useMemo } from 'react';
import { 
  GroupHeader, 
  GroupMenu, 
  GroupStatsGrid, 
  GroupAboutCard, 
  GroupEventsList, 
  GroupFeedSection, 
  GroupTopMembers, 
  GroupPermissions,
  groupList,
  userList
} from '../../index';

export function GroupTab() {
  const [query, setQuery] = useState('');
  const [selectedGroupId, setSelectedGroupId] = useState<string | number>(groupList[0]?.id ?? '');

  // Arama: id, slug, urlName veya name ile eşleş
  const searchResults = useMemo(() => {
    if (!query.trim()) return groupList;
    const q = query.trim().toLowerCase();
    return groupList.filter(g =>
      g.id?.toString() === q ||
      g.slug?.toLowerCase().includes(q) ||
      (g as any).urlName?.toLowerCase().includes(q) ||
      g.name.toLowerCase().includes(q) ||
      g.shortName?.toLowerCase().includes(q)
    );
  }, [query]);

  const mockGroup = groupList.find(g => g.id?.toString() === selectedGroupId?.toString()) || groupList[0];

  return (
    <div className="space-y-10">
      <div>
        <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-emerald-500 pl-4 mb-2">Grup Arayüzü Mimarisi</h3>
        <p className="text-sm font-medium text-armoyu-text-muted">ID, URL adı veya grup adıyla aratarak önizleme yapabilirsin.</p>
      </div>

      {/* Arama Kutusu */}
      <div className="flex flex-col md:flex-row gap-4 items-start">
        <div className="relative w-full md:w-96">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Grup ID, URL adı veya isim..."
            className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl px-5 py-3 pr-10 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-armoyu-text-muted/40"
          />
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="absolute right-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
        </div>

        {/* Arama Sonuçları Chip'leri */}
        {query.trim() && (
          <div className="flex flex-wrap gap-2">
            {searchResults.length === 0 ? (
              <span className="text-xs font-bold text-red-400 py-3">Sonuç bulunamadı</span>
            ) : (
              searchResults.map(g => (
                <button
                  key={g.id}
                  onClick={() => { setSelectedGroupId(g.id); setQuery(''); }}
                  className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all border ${
                    selectedGroupId?.toString() === g.id?.toString()
                      ? 'bg-blue-600 text-white border-blue-500'
                      : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted border-armoyu-card-border hover:border-blue-500 hover:text-blue-500'
                  }`}
                >
                  #{g.id} · {g.shortName || g.name}
                </button>
              ))
            )}
          </div>
        )}
      </div>

      {/* Seçili Grup Bilgi Bandı */}
      <div className="flex items-center gap-3 p-4 bg-black/5 dark:bg-white/5 rounded-2xl border border-armoyu-card-border">
        {mockGroup.logo && <img src={mockGroup.logo} className="w-10 h-10 rounded-xl object-cover" alt={mockGroup.name} />}
        <div>
          <p className="text-xs font-black text-armoyu-text uppercase tracking-widest">{mockGroup.name}</p>
          <p className="text-[10px] font-bold text-armoyu-text-muted">
            ID: {mockGroup.id} · Slug: {mockGroup.slug || (mockGroup as any).urlName || '—'}
          </p>
        </div>
      </div>

      {/* Widget Önizlemesi */}
      <div className="space-y-6">
        <GroupHeader group={mockGroup} isMember={true} onJoin={() => {}} onLeave={() => {}} />
        <GroupMenu group={mockGroup} user={userList[0]} onLeave={() => {}} />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 mt-6">
          <div className="xl:col-span-3 space-y-6">
            <GroupStatsGrid stats={{ members: mockGroup.memberCount || 100, online: 42, posts: 10, founded: '2024' }} />
            <GroupEventsList events={[]} setEvents={() => {}} isGroupAdmin={true} />
            <GroupFeedSection 
              group={mockGroup}
              user={userList[0]}
              isMember={true} 
              posts={[]} 
            />
          </div>
          
          <div className="space-y-10">
            <GroupAboutCard description={mockGroup.description} />
            <GroupPermissions permissions={mockGroup.permissions || []} />
            <GroupTopMembers members={mockGroup.members || []} groupUrl={mockGroup.getGroupUrl()} />
          </div>
        </div>
      </div>
    </div>
  );
}
