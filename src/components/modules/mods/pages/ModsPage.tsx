'use client';

import React, { useState } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { ViewModeToggle, ViewMode} from '../../../ViewModeToggle';
import { LayoutGrid, List } from 'lucide-react';

// Mock Data
export const MOCK_MODS = [
  {
    id: '1',
    name: 'Realistic Minecraft Pack',
    game: 'Minecraft',
    version: '1.20.1',
    downloads: '15.4K',
    image: 'https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=800&q=80',
    isFeatured: true,
    description: 'En gelişmiş ve optimize edilmiş gerçekçi Minecraft mod paketi.',
    author: { displayName: 'Armoyu Ekibi', avatar: '' }
  },
  {
    id: '2',
    name: 'Assetto Corsa V3 Realism Pack',
    game: 'Assetto Corsa',
    version: 'V3.2',
    downloads: '8.2K',
    image: 'https://images.unsplash.com/photo-1614204424926-196a80bf0be8?w=800&q=80',
    isFeatured: false,
    description: 'Gerçekçi sürüş deneyimi için fizik ve ses güncellemeleri.',
    author: { displayName: 'Berkay', avatar: '' }
  },
  {
    id: '3',
    name: 'CS2 Pro HUD & Radar',
    game: 'CS2',
    version: '1.0',
    downloads: '2.1K',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&q=80',
    isFeatured: true,
    description: 'Profesyonel oyuncular için optimize edilmiş minimal HUD.',
    author: { displayName: 'Armoyu Ekibi', avatar: '' }
  }
];

interface ModsPageProps {
   onModClick?: (id: string) => void;
}

export function ModsPage({ onModClick }: ModsPageProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <div className="mb-8 text-center relative">
        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic drop-shadow-xl">OYUN MODLARI</h1>
        <p className="text-armoyu-text-muted text-lg max-w-2xl mx-auto font-medium leading-relaxed opacity-80">
          ARMOYU ekibi ve topluluk tarafından geliştirilen en iyi oyun modlarını keşfet ve hemen indir.
        </p>

        {/* View Toggle - Desktop Only Position */}
        <div className="hidden md:flex absolute bottom-0 right-0">
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
         
         {/* Filter Sidebar */}
         <div className="w-full lg:w-64 shrink-0 space-y-6">
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
               <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">KATEGORİLER</h4>
               <div className="space-y-2">
                  {['Hepsi', 'Minecraft', 'Assetto Corsa', 'Counter-Strike', 'Diğer'].map((cat) => (
                    <button key={cat} className={`w-full text-left px-5 py-3 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${cat === 'Hepsi' ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20' : 'text-armoyu-text-muted hover:bg-black/5 dark:hover:bg-white/5 hover:text-armoyu-text'}`}>
                       {cat}
                    </button>
                  ))}
               </div>
            </div>

            {/* Mobile View Toggle */}
            <div className="md:hidden flex justify-center py-2">
               <ViewModeToggle mode={viewMode} onChange={setViewMode} />
            </div>
            
            <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h3 className="text-xs font-black text-armoyu-primary mb-4 uppercase tracking-widest flex items-center gap-2">ARMOYU ÖNERİSİ</h3>
               <p className="text-[10px] font-bold text-armoyu-text-muted leading-relaxed italic uppercase">
                 "Realistic Minecraft Pack" modumuz %20 daha fazla performans sağlaması için optimize edilmiştir.
               </p>
            </div>
         </div>

         {/* Content Area */}
         <div className="flex-1">
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {MOCK_MODS.map((mod) => (
                  <div key={mod.id} onClick={() => onModClick?.(mod.id)} className="group glass-panel rounded-[40px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg flex flex-col h-full cursor-pointer">
                    <div className="relative h-48 overflow-hidden shrink-0">
                      <img src={mod.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={mod.name} />
                      <div className="absolute top-4 left-4">
                        <span className="px-4 py-1.5 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10">
                            {mod.game}
                        </span>
                      </div>
                      {mod.isFeatured && (
                        <div className="absolute top-4 right-4 animate-pulse">
                            <span className="px-3 py-1.5 bg-armoyu-primary text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-armoyu-primary/30">
                              GÜNCEL
                            </span>
                        </div>
                      )}
                    </div>
                    
                    <div className="p-6 flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-4">
                          <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight group-hover:text-armoyu-primary transition-colors line-clamp-2 leading-tight italic">
                              {mod.name}
                          </h3>
                        </div>
                        
                        <div className="flex items-center gap-4 mb-8 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">
                          <div className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                              {mod.downloads}
                          </div>
                          <div className="flex items-center gap-1">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                              {mod.version}
                          </div>
                        </div>

                        <div className="mt-auto flex items-center justify-between gap-4 border-t border-black/5 dark:border-white/5 pt-6">
                          <div className="flex items-center gap-2">
                              <div className="w-6 h-6 rounded-full bg-armoyu-primary/10 flex items-center justify-center text-[10px] font-black text-armoyu-primary">
                                {mod.author?.displayName.charAt(0) || 'A'}
                              </div>
                              <span className="text-[10px] font-black text-armoyu-text uppercase opacity-60">
                                {mod.author?.displayName || 'Armoyu Ekibi'}
                              </span>
                          </div>
                          <button className="px-6 py-3 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-[9px] uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-armoyu-primary/20 active:scale-95">
                              İNDİRMEYE GİT
                          </button>
                        </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel overflow-hidden rounded-[32px] border border-armoyu-card-border shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500 bg-armoyu-card-bg">
                <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-black/5 dark:bg-white/5 border-b border-armoyu-card-border">
                  <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">RESİM</div>
                  <div className="col-span-4 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">MOD ADI</div>
                  <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">OYUN</div>
                  <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">SÜRÜM</div>
                  <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">İNDİRME</div>
                  <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">#</div>
                </div>
                <div className="divide-y divide-black/5 dark:divide-white/5">
                  {MOCK_MODS.map((mod) => (
                    <div key={mod.id} onClick={() => onModClick?.(mod.id)} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-armoyu-primary/5 transition-all group cursor-pointer">
                      <div className="col-span-1">
                        <img src={mod.image} className="w-12 h-12 rounded-xl object-cover border border-black/10 dark:border-white/10" alt="" />
                      </div>
                      <div className="col-span-4">
                        <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-armoyu-primary transition-colors italic">{mod.name}</h4>
                        <p className="text-[10px] text-armoyu-text-muted font-bold mt-1 uppercase">Yapımcı: {mod.author?.displayName || 'Armoyu Ekibi'}</p>
                      </div>
                      <div className="col-span-2">
                        <span className="px-3 py-1 bg-black/5 dark:bg-white/5 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest rounded-lg border border-black/5 dark:border-white/5">{mod.game}</span>
                      </div>
                      <div className="col-span-2 text-[10px] font-black text-armoyu-text uppercase tracking-widest">{mod.version}</div>
                      <div className="col-span-2 flex items-center gap-1.5 text-[10px] font-black text-emerald-500">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
                        {mod.downloads}
                      </div>
                      <div className="col-span-1 text-right">
                        <div className="w-8 h-8 rounded-full bg-armoyu-primary text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all ml-auto hover:scale-110 shadow-lg shadow-armoyu-primary/30">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="9 18 15 12 9 6"></polyline></svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
         </div>

      </div>
    </div>
  );
}
