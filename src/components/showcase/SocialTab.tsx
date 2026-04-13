'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  AuthSidebarLeft,
  Stories,
  PostCard,
  postList
} from '../../index';
import { Post } from '@armoyu/core';
import { useArmoyu } from '../../context/ArmoyuContext';
import { RefreshCcw, Wifi, WifiOff, Settings2, Info } from 'lucide-react';

export function SocialTab() {
  const { api, apiKey, token } = useArmoyu();
  const [useLive, setUseLive] = useState(false);
  const [livePosts, setLivePosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastRawData, setLastRawData] = useState<any>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchLivePosts = useCallback(async (isLoadMore = false) => {
    setLoading(true);
    if (!isLoadMore) {
      setError(null);
      setLastRawData(null);
    }

    if (!apiKey || apiKey === 'armoyu_showcase_key') {
      setError("Canlı akış verilerini çekebilmek için lütfen geçerli bir API Anahtarı giriniz.");
      setLoading(false);
      return;
    }
    
    try {
      const targetPage = isLoadMore ? page + 1 : 1;
      console.log(`[SocialTab] Veri çekiliyor... Sayfa: ${targetPage}, API Key: ${apiKey ? "Mevcut" : "Eksik"}`);
      const posts = await api.social.getPosts(targetPage);

      const lastRaw = (api as any).lastResponse;
      setLastRawData(lastRaw);

      console.log("---------------- [SocialTab DEBUG] ----------------");
      console.log("Ham Yanıt (lastRaw):", lastRaw);
      console.log("İşlenmiş Veri (posts):", posts);
      console.log("Veri Tipi:", Array.isArray(posts) ? "Dizi (Array)" : typeof posts);

      if (Array.isArray(posts)) {
        console.log("Gönderi Sayısı (Length):", posts.length);
      }
      console.log("---------------------------------------------------");

      if (!posts || (Array.isArray(posts) && posts.length === 0)) {
        if (lastRaw && lastRaw.durum === 0) {
          setError(lastRaw.aciklama || "API Hatası: Yetki veya veri erişim problemi.");
          return;
        }
      }

      // Gelen veriyi PostCard'ın beklediği formata güvenli bir şekilde dönüştür (Mapping)
      const rawArray = Array.isArray(posts) ? posts : (posts ? [posts] : []);

      const mappedPosts = rawArray.map((p: any) => {
        if (!p || typeof p !== 'object') return null;

        return {
          ...p,
          id: p.id?.toString() || p.postID?.toString() || Math.random().toString(),
          author: p.author || p.owner || null,
          content: p.content || p.paylasimicerik || '',
          media: Array.isArray(p.media) ? p.media : (Array.isArray(p.paylasimfoto) ? p.paylasimfoto.map((f: any) => ({ type: 'image', url: f.fotourl || f.fotoufakurl })) : []),
          createdAt: p.createdAt || p.paylasimzaman || 'Şimdi',
          stats: {
            likes: p.stats?.likes ?? p.likesCount ?? p.begenisay ?? 0,
            comments: p.stats?.comments ?? p.commentsCount ?? p.yorumsay ?? 0,
            reposts: p.stats?.reposts ?? p.repostsay ?? 0,
            shares: p.stats?.shares ?? p.sikayetsay ?? 0
          }
        };
      }).filter(Boolean);

      console.log(`[SocialTab] Mapleme Sonrası Gönderi Sayısı: ${mappedPosts.length}`);
      
      if (isLoadMore) {
        setLivePosts((prev: any) => [...prev, ...mappedPosts]);
      } else {
        setLivePosts(mappedPosts as any);
      }
      
      setPage(targetPage);
      setHasMore(mappedPosts.length > 0);
      setUseLive(true);
    } catch (err: any) {
      const lastRaw = (api as any).lastResponse;
      setLastRawData(lastRaw);

      console.log("================ [SocialTab ERROR] ================");
      console.error("HATA:", err.message);
      console.log("API YANITI:", lastRaw);
      console.log("==================================================");

      if (lastRaw && lastRaw.durum === 0) {
        setError(lastRaw.aciklama || "API Hatası: Yetki veya veri erişim problemi.");
      } else {
        setError(err.message || "Veri çekilirken teknik bir hata oluştu.");
      }
    } finally {
      setLoading(false);
    }
  }, [api, apiKey]);

  // Sayfa açıldığında verileri otomatik çek (Opsiyonel: Eğer apiKey varsa)
  useEffect(() => {
    if (apiKey && apiKey !== 'armoyu_showcase_key') {
      fetchLivePosts(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiKey]); // API Key değiştiğinde veya ilk açılışta fetch et

  const displayPosts = useLive ? livePosts : postList.slice(0, 3);

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
            onClick={() => fetchLivePosts(false)}
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95"
          >
            {loading ? <RefreshCcw className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
            VERİLERİ ÇEK
          </button>

          {useLive && (
            <button
              onClick={() => setUseLive(false)}
              className="bg-white/5 hover:bg-white/10 text-armoyu-text-muted p-3.5 rounded-2xl transition-all"
              title="Mock veriye dön"
            >
              <Settings2 className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {error && (
        <div className="space-y-4 animate-in slide-in-from-top-2">
          <div className="bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4">
            <div className="w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <div>
              <h4 className="text-sm font-black text-red-500 uppercase tracking-tight">VERİ HATASI</h4>
              <p className="text-red-500/80 text-[11px] leading-relaxed font-bold">{error}</p>
              <p className="mt-2 text-[10px] text-red-500/50 font-medium italic">Sağ alttaki "Dev Tools" panelinden geçerli bir API Key girerek tekrar deneyebilirsiniz.</p>
            </div>
          </div>

          {lastRawData && (
            <div className="bg-black/40 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-2 mb-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-50">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="4 17 10 11 4 5"></polyline><line x1="12" y1="19" x2="20" y2="19"></line></svg>
                API YANITI (RAW)
              </div>
              <pre className="text-[10px] font-mono text-blue-400 overflow-x-auto p-2 bg-black/20 rounded-lg">
                {JSON.stringify(lastRawData, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 hidden lg:block">
          <AuthSidebarLeft />
        </aside>
        <div className="lg:col-span-9 space-y-8">
          <Stories />
          <div className="flex flex-col gap-6 max-w-2xl mx-auto">
            {displayPosts.map((post: any) => (
              <PostCard
                key={post.id}
                {...post}
                author={post.owner || post.author}
              />
            ))}
          </div>
          {displayPosts.length === 0 && !loading && (
            <div className="text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]">
              <p className="text-armoyu-text-muted font-bold opacity-30 uppercase tracking-[0.3em] text-[10px]">Henüz yayınlanmış bir gönderi yok.</p>
            </div>
          )}
          {useLive && displayPosts.length > 0 && hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchLivePosts(true)}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
              >
                {loading ? (
                  <><RefreshCcw className="w-4 h-4 animate-spin" /> YÜKLENİYOR...</>
                ) : "DAHA FAZLA GÖSTER"}
              </button>
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
