'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  SocialSidebar,
  Stories,
  PostCard,
  postList,
  SocialFeed,
  SocialFeedRef
} from '../../index';
import { useArmoyu } from '../../context/ArmoyuContext';
import { RefreshCcw, Wifi, WifiOff, Settings2 } from 'lucide-react';

export function SocialTab() {
  const { apiKey } = useArmoyu();
  const [useLive, setUseLive] = useState(false);
  const feedRef = React.useRef<SocialFeedRef>(null);

  const handleFetchClick = () => {
    if (apiKey && apiKey !== 'armoyu_showcase_key') {
      setUseLive(true);
      feedRef.current?.refresh();
    } else {
      alert("Canlı akış verilerini çekebilmek için lütfen Dev Tools panelinden geçerli bir API Anahtarı giriniz.");
    }
  };

  const displayPosts = useLive ? [] : postList.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5">
        <div className="flex items-center gap-4">
          <div className={cn(
            "w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500",
            useLive ? "bg-emerald-500 shadow-emerald-500/20" : "bg-blue-600 shadow-blue-600/20"
          )}>
            {useLive ? <Wifi className="text-white w-6 h-6" /> : <WifiOff className="text-white w-6 h-6" />}
          </div>
          <div>
            <h3 className="text-base font-black text-armoyu-text uppercase tracking-tight">
              {useLive ? "CANLI VERİ AKIŞI" : "MOCK (PROTOTİP) VERİ"}
            </h3>
            <div className="flex items-center gap-2">
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">
                {useLive ? "@armoyu/core üzerinden çekiliyor" : "Lokal seedData.ts kullanılıyor"}
              </p>
              {useLive && (
                <span className="flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              )}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden md:flex flex-col items-end mr-2">
            <span className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">AKTİF ANAHTAR</span>
            <span className="text-[11px] font-mono text-emerald-500 truncate max-w-[120px]">
              {apiKey === 'armoyu_showcase_key' ? 'Varsayılan (Showcase)' : 'Özel Anahtar'}
            </span>
          </div>

          <button
            onClick={handleFetchClick}
            className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
          >
            <RefreshCcw className="w-4 h-4" />
            VERİLERİ ÇEK
          </button>

          {useLive && (
            <button
              onClick={() => setUseLive(false)}
              className="bg-white/5 hover:bg-white/10 text-armoyu-text-muted p-3.5 rounded-2xl transition-all"
              title="Mock veriye dön"
            >
              <RefreshCcw className="w-4 h-4 rotate-180" />
            </button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 hidden lg:block">
          <SocialSidebar />
        </aside>
        <div className="lg:col-span-9 space-y-8">
          <Stories />
          
          {useLive ? (
            <SocialFeed 
              ref={feedRef}
              emptyMessage="Henüz yayınlanmış bir gönderi yok."
            />
          ) : (
            <div className="flex flex-col gap-6 max-w-2xl mx-auto">
              {displayPosts.map((post: any) => (
                <PostCard
                  key={post.id}
                  {...post}
                  author={post.owner || post.author}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
