'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { mockGlobalStats, MOCK_RANKING_LEVEL, MOCK_RANKING_POPULARITY } from '../../../lib/constants/seedData';

export function SidebarLeft() {
  const [rankingType, setRankingType] = useState<'level' | 'popularity'>('level');
  const [visibleCount, setVisibleCount] = useState(5);
  const router = useRouter();
  const { user: currentUser } = useAuth();
  
  const allRankings = rankingType === 'level' ? MOCK_RANKING_LEVEL : MOCK_RANKING_POPULARITY;
  const currentRanking = allRankings.slice(0, visibleCount);

  const goToProfile = (user: { displayName: string, username: string, avatar: string }) => {
    const params = new URLSearchParams();
    if (user.displayName) params.set('name', user.displayName);
    if (user.avatar) params.set('avatar', user.avatar);
    
    router.push(`/oyuncular/${user.username}?${params.toString()}`);
  };

  return (
    <div className="hidden lg:flex w-[280px] flex-col gap-6 animate-in fade-in slide-in-from-left-8 duration-700">
      
      {/* Sıralama (Level / Popularity) Widget */}
      <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg flex flex-col gap-4">
        <div className="flex items-center justify-center mb-2">
           <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-xl border border-black/5 dark:border-white/5 relative h-9 w-[140px]">
              {/* Sliding Background */}
              <div 
                className={`absolute inset-y-1 transition-all duration-300 ease-out bg-white dark:bg-blue-600 rounded-lg shadow-sm ${rankingType === 'level' ? 'left-1 w-[64px]' : 'left-[73px] w-[62px]'}`}
              />
              <button 
                onClick={() => { setRankingType('level'); setVisibleCount(5); }}
                className={`flex-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all relative z-10 ${rankingType === 'level' ? 'text-blue-600 dark:text-white' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
              >
                Seviye
              </button>
              <button 
                onClick={() => { setRankingType('popularity'); setVisibleCount(5); }}
                className={`flex-1 text-[10px] font-black uppercase tracking-wider rounded-lg transition-all relative z-10 ${rankingType === 'popularity' ? 'text-blue-600 dark:text-white' : 'text-armoyu-text-muted hover:text-armoyu-text'}`}
              >
                Popüler
              </button>
           </div>
        </div>

        <div className="space-y-3">
          {currentRanking.map((user, idx) => {
            const isMe = currentUser?.username === user.username;
            return (
              <div 
                key={idx} 
                onClick={() => goToProfile(user)}
                className={`flex items-center justify-between group cursor-pointer p-1.5 rounded-xl transition-all ${
                  isMe 
                    ? 'bg-blue-600/10 border border-blue-500/30' 
                    : 'hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <div className="flex items-center gap-3">
                 <div className="relative">
                    <img src={user.avatar} alt={user.displayName} className="w-9 h-9 rounded-full border border-black/10 dark:border-white/10 group-hover:border-blue-500 transition-colors" />
                    <div className={`absolute -top-1 -left-1 w-4 h-4 rounded-full flex items-center justify-center text-[8px] font-black text-white shadow-sm transition-transform group-hover:scale-110 ${
                      idx === 0 ? 'bg-yellow-500' : 
                      idx === 1 ? 'bg-gray-400' : 
                      idx === 2 ? 'bg-orange-600' : 
                      'bg-armoyu-card-border text-armoyu-text-muted dark:bg-white/10 dark:text-white/60'
                    }`}>
                      {idx + 1}
                    </div>
                 </div>
                 <span className="text-sm font-bold text-armoyu-text-muted group-hover:text-armoyu-text transition-colors truncate max-w-[100px]">{user.displayName}</span>
              </div>
              <span className="text-[10px] font-black text-blue-500 bg-blue-500/10 px-2 py-1 rounded-md">{rankingType === 'level' ? user.level : user.popScore}</span>
            </div>
          );
        })}
        </div>
        
        {visibleCount < allRankings.length && (
          <button 
            onClick={() => setVisibleCount(prev => prev + 10)}
            className="w-full pt-2 text-[11px] font-bold text-armoyu-text-muted hover:text-blue-500 transition-colors border-t border-armoyu-card-border mt-1"
          >
             Sıralamadan {Math.min(10, allRankings.length - visibleCount)} Kişi Daha Gör
          </button>
        )}
      </div>

      {/* Ekonomi Widget */}
      <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
        <div className="flex items-center gap-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
           <h3 className="font-extrabold text-armoyu-text text-base">Ekonomi</h3>
        </div>
        
        <div className="space-y-4">
           {/* Dolar */}
           <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-600 font-black text-xs">USD</div>
                 <div>
                    <span className="block text-xs font-bold text-armoyu-text">Dolar</span>
                    <span className="block text-[10px] text-armoyu-text-muted">Merkez Bankası</span>
                 </div>
              </div>
              <div className="text-right">
                 <span className="block text-sm font-black text-armoyu-text">₺32.45</span>
                 <span className="flex items-center justify-end text-[10px] font-bold text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mr-0.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    0.24%
                 </span>
              </div>
           </div>

           {/* Altın */}
           <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5">
              <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 rounded-full bg-yellow-500/10 flex items-center justify-center text-yellow-600 font-black text-xs">AU</div>
                 <div>
                    <span className="block text-xs font-bold text-armoyu-text">Gram Altın</span>
                    <span className="block text-[10px] text-armoyu-text-muted">Spot Piyasa</span>
                 </div>
              </div>
              <div className="text-right">
                 <span className="block text-sm font-black text-armoyu-text">₺2,450</span>
                 <span className="flex items-center justify-end text-[10px] font-bold text-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mr-0.5 rotate-180"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    0.12%
                 </span>
              </div>
           </div>

           {/* Gümüş */}
           <div className="flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 font-inter">
              <div className="flex items-center gap-2.5">
                 <div className="w-8 h-8 rounded-full bg-slate-400/20 flex items-center justify-center text-slate-500 dark:text-slate-300 font-black text-xs">AG</div>
                 <div>
                    <span className="block text-xs font-bold text-armoyu-text">Gümüş</span>
                    <span className="block text-[10px] text-armoyu-text-muted">Spot Piyasa</span>
                 </div>
              </div>
              <div className="text-right">
                 <span className="block text-sm font-black text-armoyu-text">₺31.20</span>
                 <span className="flex items-center justify-end text-[10px] font-bold text-emerald-500">
                    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="mr-0.5"><polyline points="18 15 12 9 6 15"></polyline></svg>
                    0.45%
                 </span>
              </div>
           </div>
        </div>
      </div>

      {/* Süper Lig Puan Durumu Widget */}
      <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
        <div className="flex items-center gap-2 mb-4">
           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
           <h3 className="font-extrabold text-armoyu-text text-base">Süper Lig</h3>
        </div>
        
        <div className="space-y-3">
          {[
            { team: 'Galatasaray', p: '84', color: 'bg-red-600' },
            { team: 'Fenerbahçe', p: '82', color: 'bg-yellow-500' },
            { team: 'Beşiktaş', p: '65', color: 'bg-black dark:bg-white' },
            { team: 'Trabzonspor', p: '60', color: 'bg-blue-600' },
            { team: 'Başakşehir', p: '55', color: 'bg-orange-600' },
          ].map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-black/5 transition-colors">
              <div className="flex items-center gap-2.5">
                 <span className="text-[10px] font-black text-armoyu-text-muted w-3">{idx + 1}</span>
                 <div className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                 <span className="text-xs font-bold text-armoyu-text">{item.team}</span>
              </div>
              <span className="text-xs font-black text-armoyu-text">{item.p}</span>
            </div>
          ))}
        </div>

        <button className="w-full pt-3 text-[10px] font-bold text-blue-500 hover:underline border-t border-armoyu-card-border mt-3">
           Tüm Puan Durumu
        </button>
      </div>

      {/* Minecraft Sunucu Widget */}
      <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg overflow-hidden relative group">
        <div className="absolute -right-4 -top-4 w-24 h-24 bg-emerald-500/10 blur-2xl rounded-full group-hover:bg-emerald-500/20 transition-colors" />
        
        <div className="flex items-center gap-2 mb-4 relative z-10">
           <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
           <h3 className="font-extrabold text-armoyu-text text-base">Minecraft Sunucu</h3>
        </div>

        <div className="space-y-4 relative z-10">
           <div className="flex items-center justify-between">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted opacity-60">Sunucu Adresi</span>
                 <span className="text-sm font-bold text-armoyu-text group-hover:text-blue-500 transition-colors">mc.armoyu.com</span>
              </div>
              <button 
                title="IP Kopyala"
                className="p-2 rounded-lg bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:bg-black/10 transition-colors"
                onClick={() => {
                   navigator.clipboard.writeText('mc.armoyu.com');
                   alert('IP Kopyalandı!');
                }}
              >
                 <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
              </button>
           </div>

           <div className="flex items-center justify-between p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10">
              <div className="flex flex-col">
                 <span className="text-[10px] font-black text-emerald-600 dark:text-emerald-400">Aktif Oyuncu</span>
                 <span className="text-lg font-black text-emerald-600 dark:text-emerald-400">142 / 500</span>
              </div>
              <div className="flex -space-x-2">
                 {[1,2,3].map(i => (
                   <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i+99}`} className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0e] bg-white/10 shadow-sm" alt="Player" />
                 ))}
                 <div className="w-7 h-7 rounded-full border-2 border-white dark:border-[#0a0a0e] bg-emerald-500 flex items-center justify-center text-[8px] font-black text-white">+139</div>
              </div>
           </div>

           <button className="w-full py-3 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white text-xs font-black uppercase tracking-widest rounded-xl shadow-lg shadow-emerald-500/20 transition-all active:scale-[0.98]">
              Sunucuya Giriş Yap
           </button>
        </div>
      </div>

    </div>
  );
}
