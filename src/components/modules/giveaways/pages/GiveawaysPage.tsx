'use client';

import React, { useState } from 'react';
import { GiveawayCard } from '../widgets/GiveawayCard';
import { PageWidth } from '../../../shared/PageWidth';
import { ViewModeToggle, ViewMode } from '../../../ViewModeToggle';

const MOCK_GIVEAWAYS = [
  {
    title: 'HAFTALIK ÇEKİLİŞ',
    prize: 'Logitech G502 Hero',
    status: 'active' as const,
    participants: 1245,
    timeLeft: '02G 14S 30D',
    image: 'https://resource.logitechg.com/w_1000,c_limit,q_auto,f_auto,dpr_auto/d_transparent.gif/content/dam/gaming/en/products/g502-hero/g502-hero-gallery-1.png?v=1'
  },
  {
    title: 'TOPLULUK ÖDÜLÜ',
    prize: 'Steam 250 TL Cüzdan Kodu',
    status: 'active' as const,
    participants: 856,
    timeLeft: '14S 12D',
    image: 'https://store.steampowered.com/public/shared/images/header/logo_steam.svg?t=962016'
  },
  {
    title: 'OYUN İÇİ PARA',
    prize: 'Valorant 1250 VP',
    status: 'active' as const,
    participants: 2150,
    timeLeft: '04G 08S',
    image: 'https://images.contentstack.io/v3/assets/blt731acb051bd37b0c/blt0dfa6c8e310cf6e3/5af5e2a222851253457597c2/valorant-points-pack-1250-vp.png'
  },
  {
    title: 'SUNUCU ÖDÜLÜ',
    prize: 'Minecraft Premium Hesap',
    status: 'ended' as const,
    participants: 450,
    timeLeft: 'Bitti',
    image: 'https://www.minecraft.net/etc.clientlibs/minecraft/clientlibs/main/resources/img/minecraft-creeper-face.png'
  },
  {
    title: 'SPONSOR ÖDÜLÜ',
    prize: 'Discord Nitro (1 Yıllık)',
    status: 'active' as const,
    participants: 124,
    timeLeft: '06G 22S',
    image: 'https://assets-global.website-files.com/6257adef93467e42288dbbc1/6257adef93467e42288dbbc9_discord-nitro.png'
  }
];

export function GiveawaysPage() {
  const [activeTab, setActiveTab] = useState('Hepsi');
  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  
  const categories = ['Hepsi', 'Aktif', 'Sona Erdi'];
  
  const filteredGiveaways = activeTab === 'Hepsi' 
    ? MOCK_GIVEAWAYS 
    : MOCK_GIVEAWAYS.filter(g => (activeTab === 'Aktif' ? g.status === 'active' : g.status === 'ended'));

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Header Section */}
      <div className="mb-10 text-center lg:text-left flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter uppercase italic">KATIL VE KAZAN!</h1>
          <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl leading-relaxed">
            ARMOYU topluluğu için düzenlediğimiz çekilişlere katılarak harika ödüllere sahip ol. Her hafta yeni şanslar seni bekliyor.
          </p>
        </div>
        
        {/* View Toggle & Info Bar */}
        <div className="flex flex-col items-center md:items-end gap-4">
          <div className="bg-armoyu-primary/10 border border-armoyu-primary/20 px-6 py-4 rounded-[32px] flex items-center gap-4 max-w-md shadow-lg shadow-armoyu-primary/5 animate-pulse-slow">
            <div className="w-10 h-10 rounded-full bg-armoyu-primary text-white flex items-center justify-center shrink-0">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
            </div>
            <p className="text-[11px] font-black text-armoyu-primary dark:text-armoyu-primary leading-tight uppercase tracking-wider text-left">
                Tüm çekilişlerimiz tamamen <strong>ÜCRETSİZDİR</strong> ve <strong>KAR AMACI GÜTMEMEKTEDİR</strong>.
            </p>
          </div>
          <ViewModeToggle mode={viewMode} onChange={setViewMode} />
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col md:flex-row gap-6 items-center justify-between mb-12">
        <div className="flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full">
           {categories.map((cat) => (
             <button
                key={cat}
                onClick={() => setActiveTab(cat)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === cat ? 'bg-white dark:bg-armoyu-primary text-armoyu-primary dark:text-white shadow-xl' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
             >
                {cat}
             </button>
           ))}
        </div>
        
        <div className="relative w-full md:w-80">
           <input 
             type="text" 
             placeholder="Ödül ara..." 
             className="w-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-2xl px-5 py-3 text-sm text-armoyu-text focus:outline-none focus:border-armoyu-primary focus:ring-1 focus:ring-armoyu-primary transition-all font-medium" 
           />
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="absolute right-4 top-3 text-armoyu-text-muted opacity-40"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
        </div>
      </div>

      {/* Content Area */}
      {viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredGiveaways.map((giveaway, idx) => (
            <GiveawayCard key={idx} {...giveaway} />
          ))}
          
          {/* VIP Section Call-to-action */}
          <div className="glass-panel p-10 rounded-[40px] border border-yellow-500 bg-gradient-to-br from-yellow-500/10 to-orange-500/5 flex flex-col items-center justify-center text-center group transition-all duration-500">
            <div className="w-16 h-16 rounded-full bg-yellow-500 text-white flex items-center justify-center mb-6 shadow-xl shadow-yellow-500/20 group-hover:scale-110 transition-transform">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
            </div>
            <h3 className="font-black text-armoyu-text text-xl mb-3">VIP ÇEKİLİŞLER</h3>
            <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-8 px-4">Özel VIP üyelik ile sadece sana özel ödülleri yakalama şansını kaçırma.</p>
            <button className="px-8 py-3 bg-yellow-500 hover:bg-yellow-400 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-yellow-500/30 transition-all active:scale-95">VIP Ol</button>
          </div>
        </div>
      ) : (
        <div className="glass-panel overflow-hidden rounded-[32px] border border-armoyu-card-border shadow-xl shadow-black/[0.02] dark:shadow-2xl animate-in fade-in slide-in-from-right-8 duration-500">
          <div className="hidden md:grid grid-cols-12 gap-4 px-8 py-5 bg-gray-50/50 dark:bg-white/5 border-b border-armoyu-card-border">
            <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">RESİM</div>
            <div className="col-span-4 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">ÖDÜL</div>
            <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">KATEGORİ</div>
            <div className="col-span-1 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">KATILIMCI</div>
            <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-center">KALAN SÜRE</div>
            <div className="col-span-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest text-right">#</div>
          </div>
          <div className="divide-y divide-black/5 dark:divide-white/5">
            {filteredGiveaways.map((giveaway, idx) => (
              <div key={idx} className="grid grid-cols-1 md:grid-cols-12 gap-4 px-8 py-5 items-center hover:bg-armoyu-primary/5 transition-all group">
                <div className="col-span-1">
                  <img src={giveaway.image} className="w-12 h-12 rounded-xl object-contain bg-white p-1 border border-black/10 dark:border-white/10" alt="" />
                </div>
                <div className="col-span-4">
                  <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{giveaway.prize}</h4>
                </div>
                <div className="col-span-2">
                  <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">{giveaway.title}</span>
                </div>
                <div className="col-span-1 text-center font-black text-xs text-armoyu-primary flex items-center justify-center gap-1">
                   <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                   {giveaway.participants}
                </div>
                <div className="col-span-2 text-center text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">
                  {giveaway.timeLeft}
                </div>
                <div className="col-span-2 text-right">
                  <button className={`px-5 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    giveaway.status === 'active' 
                    ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20 hover:scale-105 active:scale-95' 
                    : 'bg-zinc-500/20 text-zinc-500 cursor-not-allowed'
                  }`}>
                    {giveaway.status === 'active' ? 'KATIL' : 'BITTI'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Winners Banner / Announcement */}
      <div className="mt-24 p-8 rounded-[40px] bg-emerald-500/5 border border-emerald-500/10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
            <div>
               <h4 className="text-xl font-black text-armoyu-text">Tebrikler!</h4>
               <p className="text-sm font-medium text-armoyu-text-muted">Son Valorant çekilişini kazanan <strong>@emirhan_top</strong> ödülünü teslim aldı.</p>
            </div>
         </div>
         <button className="px-6 py-3 border border-emerald-500 text-emerald-600 hover:bg-emerald-500 hover:text-white rounded-xl font-black text-[10px] uppercase tracking-widest transition-all active:scale-95">Kazanları Gör</button>
      </div>
    </div>
  );
}
