'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useArmoyu } from '../../../../context/ArmoyuContext';

export function MinecraftWidget() {
  const { user: currentUser } = useAuth();
  const { api } = useArmoyu();
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      if (!currentUser) {
        setStats(null);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await api.siteInfo.getMinecraftStats();
        if (response.durum === 1 && response.icerik) {
          setStats({
            ip: 'mc.armoyu.com',
            activePlayers: response.aciklamadetay || 0,
            maxPlayers: 500,
            leaders: response.icerik
          });
        }
      } catch (error) {
        console.error('Failed to fetch Minecraft stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchStats();
  }, [api, currentUser]);

  const ip = stats?.ip || 'mc.armoyu.com';
  const onlineCount = stats?.activePlayers || 0;
  const maxPlayers = stats?.maxPlayers || 500;
  const recentPlayers = stats?.recentPlayers || [];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg overflow-hidden relative group">
      <div className="absolute -right-4 -top-4 w-24 h-24 bg-armoyu-primary/10 blur-2xl rounded-full group-hover:bg-armoyu-primary/20 transition-colors" />
      
      <div className="flex items-center gap-2 mb-4 relative z-10">
         <div className={`w-2 h-2 rounded-full ${loading ? 'bg-gray-400' : 'bg-armoyu-primary animate-pulse'}`} />
         <h3 className="font-extrabold text-armoyu-text text-base">Minecraft Sunucu</h3>
      </div>

      <div className="space-y-4 relative z-10">
         <div className="flex items-center justify-between">
            <div className="flex flex-col">
               <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted opacity-60">Sunucu Adresi</span>
               <span className="text-sm font-bold text-armoyu-text group-hover:text-armoyu-primary transition-colors">{ip}</span>
            </div>
            <button 
              title="IP Kopyala"
              className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 transition-colors"
              onClick={() => {
                 if (navigator.clipboard && navigator.clipboard.writeText) {
                   navigator.clipboard.writeText(ip);
                   alert('IP Kopyalandı!');
                 } else {
                   alert('Tarayıcınız kopyalamayı desteklemiyor. IP: ' + ip);
                 }
              }}
            >
               <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
            </button>
         </div>

         <div className="flex items-center justify-between p-3 rounded-2xl bg-armoyu-primary/5 border border-armoyu-primary/10">
            <div className="flex flex-col">
               <span className="text-[10px] font-black text-armoyu-primary dark:text-emerald-400">Aktif Oyuncu</span>
               <span className="text-lg font-black text-armoyu-primary dark:text-emerald-400">
                 {loading ? '--' : onlineCount} / {loading ? '--' : maxPlayers}
               </span>
            </div>
            <div className="flex -space-x-2">
               {recentPlayers.length > 0 ? (
                 recentPlayers.slice(0, 3).map((player: any, i: number) => (
                   <img key={i} src={player.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${player.username}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0e] bg-white/10 shadow-sm object-cover" alt="Player" />
                 ))
               ) : (
                 [1, 2, 3].map(i => (
                   <div key={i} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0e] bg-black/5 dark:bg-white/5" />
                 ))
               )}
               {!loading && onlineCount > 3 && (
                 <div className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0e] bg-armoyu-primary flex items-center justify-center text-[8px] font-black text-white">+{onlineCount - 3}</div>
               )}
            </div>
         </div>

         {/* Liderlik Tablosu */}
         {!loading && stats?.leaders && (
           <div className="space-y-2.5">
              <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted opacity-60">Top 3 Savaşçı</span>
              <div className="space-y-2">
                 {stats.leaders.slice(0, 3).map((player: any, i: number) => (
                   <div key={i} className="flex items-center justify-between p-2 rounded-xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
                      <div className="flex items-center gap-2">
                         <span className={`text-[10px] font-black ${i === 0 ? 'text-yellow-500' : i === 1 ? 'text-slate-400' : 'text-orange-400'}`}>#{i+1}</span>
                         <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${player.username}`} className="w-5 h-5 rounded-full" alt="" />
                         <div className="flex flex-col">
                            <span className="text-[11px] font-bold text-armoyu-text">{player.username}</span>
                            {player.clan && (
                              <span className="text-[8px] font-black text-armoyu-text-muted" style={{ color: player.clanColor || undefined }}>{player.clan}</span>
                            )}
                         </div>
                      </div>
                      <span className="text-[10px] font-black text-armoyu-primary">{player.kills} Leş</span>
                   </div>
                 ))}
              </div>
           </div>
         )}

         <button className="w-full py-3 bg-gradient-to-r from-armoyu-primary to-armoyu-primary hover:from-armoyu-primary hover:to-emerald-400 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-armoyu-primary/20 transition-all active:scale-[0.98]">
            {loading ? 'Yükleniyor...' : 'Sunucuya Giriş Yap'}
         </button>
      </div>
    </div>
  );
}
