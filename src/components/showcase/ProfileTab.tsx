'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { 
  ProfileHeader, 
  ProfileStats, 
  ProfileLayout, 
} from '../../index';
import { useArmoyu } from '../../context/ArmoyuContext';
import { User } from '@armoyu/core';
import { Search, User as UserIcon, Loader2, RefreshCcw } from 'lucide-react';

export function ProfileTab() {
  const { api, apiKey } = useArmoyu();
  const [username, setUsername] = useState('');
  const [profile, setProfile] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fetchProfile = useCallback(async (searchName: string = '') => {
    setLoading(true);
    setError(null);
    
    if (!apiKey || apiKey === 'armoyu_showcase_key') {
      setError("Profil verilerini canlı çekebilmek için lütfen geçerli bir API Anahtarı giriniz (Sağ alttaki Dashboard panelinden).");
      setLoading(false);
      return;
    }

    try {
      console.log(`[ProfileTab] Profil çekiliyor: ${searchName || 'Kendi Profilim'}`);
      const response = await api.users.getUserByUsername(searchName);
      
      if (response.durum !== 1 || !response.icerik) {
        setError(response.aciklama || "Kullanıcı bulunamadı.");
        setProfile(null);
      } else {
        setProfile(response.icerik);
        console.log("[ProfileTab] Profil başarıyla yüklendi:", response.icerik.username);
      }
    } catch (err: any) {
      console.error("[ProfileTab] Hata:", err);
      setError("Profil bilgileri alınırken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [api]);

  // İlk açılışta kendi profilini çek
  useEffect(() => {
    fetchProfile('');
  }, [fetchProfile, apiKey]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchProfile(username);
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      
      {/* SEARCH BAR */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm">
        <form onSubmit={handleSearch} className="flex flex-col md:flex-row items-center gap-4">
          <div className="flex items-center gap-3 shrink-0 px-2">
             <div className="w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500">
                <UserIcon size={20} />
             </div>
             <div>
                <h3 className="text-sm font-black text-armoyu-text uppercase tracking-tighter italic">Oyuncu Bak</h3>
                <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-50">Profil İnceleme</p>
             </div>
          </div>

          <div className="relative flex-1 group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-pink-500 transition-colors" />
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Kullanıcı adı yazın (boş bırakırsanız kendi profiliniz gelir)..."
              className="w-full bg-black/5 dark:bg-white/5 border border-pink-500/10 focus:border-pink-500/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-armoyu-text outline-none transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-pink-600/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 italic"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Search className="w-4 h-4" />}
            PROFİLİ GETİR
          </button>
        </form>
      </div>

      {/* ERROR STATE */}
      {error && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center animate-in zoom-in-95 duration-300">
           <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
           </div>
           <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tighter mb-2">HATA OLUŞTU</h3>
           <p className="text-sm font-bold text-red-500/80 uppercase tracking-widest mb-6">{error}</p>
           <button 
             onClick={() => fetchProfile(username)}
             className="px-6 py-2.5 bg-armoyu-card-bg border border-armoyu-card-border hover:border-red-500/50 text-armoyu-text text-xs font-black rounded-xl transition-all uppercase tracking-widest flex items-center gap-2 mx-auto"
           >
              <RefreshCcw size={14} /> TEKRAR DENE
           </button>
        </div>
      )}

      {/* LOADING STATE */}
      {loading && !profile && (
        <div className="py-24 text-center">
           <Loader2 className="w-12 h-12 animate-spin text-pink-500 mx-auto mb-4 opacity-50" />
           <p className="text-xs font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Profil Verileri Yükleniyor...</p>
        </div>
      )}

      {/* PROFILE CONTENT */}
      {profile && (
        <div className={`space-y-12 transition-all duration-700 ${loading ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`}>
          <ProfileLayout user={profile} />

        </div>
      )}

      {!profile && !loading && !error && (
        <div className="py-24 text-center border-2 border-dashed border-armoyu-card-border rounded-[40px]">
           <UserIcon className="w-16 h-16 text-armoyu-text-muted mx-auto mb-4 opacity-20" />
           <p className="text-xs font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic">Görüntülemek için bir kullanıcı arayın.</p>
        </div>
      )}
      
    </div>
  );
}
