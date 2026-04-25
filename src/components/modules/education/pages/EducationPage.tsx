'use client';

import React, { useState } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { SchoolCard } from '../../community/widgets/SchoolCard';
import { schoolList } from '../../../../lib/constants/seedData';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { Search, GraduationCap, Users, Trophy, Plus, MapPin, Building2, Filter, Loader2 } from 'lucide-react';
import { useEffect } from 'react';

export function EducationPage() {
  const { api, isMockEnabled, apiKey } = useArmoyu();
  const [searchQuery, setSearchQuery] = useState('');
  const [liveSchools, setLiveSchools] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const isLiveMode = !isMockEnabled;

  const fetchSchools = async () => {
    if (apiKey === 'armoyu_showcase_key') return;
    setIsLoading(true);
    try {
      const response = await api.education.getSchools();
      if (response.durum === 1 && Array.isArray(response.icerik)) {
        // Core kütüphanesi veriyi zaten map'leyip (id, name, logo, url) dönüyor.
        // Sadece UI bileşeninin beklediği ek alanları (faculties, teams) ekliyoruz.
        const mappedSchools = response.icerik.map((s: any) => ({
          ...s,
          id: String(s.id || Math.random()),
          slug: s.url || '',
          faculties: [],
          teams: []
        }));
        setLiveSchools(mappedSchools);
      }
    } catch (error) {
      console.error("[EducationPage] Fetch failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLiveMode) {
      fetchSchools();
    }
  }, [isLiveMode, apiKey]);

  const currentSchools = isLiveMode ? liveSchools : (schoolList || []);

  const filteredSchools = currentSchools.filter((school: any) => {
    const name = school.name || '';
    if (searchQuery && !name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="pb-32 animate-in fade-in duration-700 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[1280px]" />

      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 mb-20 pt-16">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-6">
              <div className="px-4 py-1.5 rounded-full bg-blue-600/10 border border-blue-500/20 text-blue-500 text-[10px] font-black uppercase tracking-widest animate-pulse">
                Eğitim Portalı Yayında
              </div>
            </div>
            <h1 className="text-4xl md:text-7xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-6 drop-shadow-xl">
              OKUL & <span className="text-blue-500">KAMPÜS</span>
            </h1>
            <p className="text-armoyu-text-muted text-sm md:text-lg font-medium opacity-80 max-w-2xl leading-relaxed">
              ARMOYU dünyasının akademik ayağını keşfet. Okul takımına katıl, sınıf arkadaşlarınla etkileşime geç ve üniversiteler arası rekabette yerini al!
            </p>

            <div className="flex flex-wrap gap-4 mt-12">
              <div className="flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-armoyu-card-border shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-armoyu-text uppercase leading-none">{currentSchools.length}</div>
                  <div className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Okul</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-armoyu-card-border shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-armoyu-text uppercase leading-none">2.4k+</div>
                  <div className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Öğrenci</div>
                </div>
              </div>
              <div className="flex items-center gap-2 px-6 py-3 bg-black/5 dark:bg-white/5 rounded-2xl border border-armoyu-card-border shadow-xl">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                  <Trophy size={20} />
                </div>
                <div>
                  <div className="text-xs font-black text-armoyu-text uppercase leading-none">120+</div>
                  <div className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Takım</div>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full md:w-auto">
            <div className="glass-panel p-10 rounded-[60px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl relative group overflow-hidden">
              <div className="relative z-10">
                <h3 className="text-xl font-black text-armoyu-text mb-6 uppercase italic tracking-tighter leading-none">OKULUNU<br />TEMSİL ET!</h3>
                <p className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest mb-8 leading-relaxed max-w-[200px]">
                  Hala listenizde yok mu? Okulunu sisteme eklemek için temsilci başvurusu yap.
                </p>
                <button className="w-full px-8 py-4 bg-white dark:bg-zinc-800 text-armoyu-text rounded-[30px] font-black text-[10px] uppercase tracking-widest shadow-xl group-hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 border border-armoyu-card-border">
                  <Plus size={18} strokeWidth={3} /> HEMEN BAŞVUR
                </button>
              </div>
              {/* Background glow */}
              <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-blue-500/10 blur-[60px] rounded-full group-hover:bg-blue-500/20 transition-colors" />
            </div>
          </div>
        </div>

        {/* Schools Filter & Search */}
        <div className="flex flex-col md:flex-row gap-6 mb-16 items-center justify-between">
          <div className="w-full md:w-[400px] relative group">
            <input
              type="text"
              placeholder="OKUL ARA (ÖR: İTÜ)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-16 pl-14 pr-6 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-[30px] text-xs font-black uppercase tracking-[0.2em] focus:border-blue-500 outline-none transition-all placeholder:text-armoyu-text-muted/50 focus:ring-4 focus:ring-blue-500/10"
            />
            <Search size={22} className="absolute left-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-8 h-16 rounded-[30px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/10 transition-all flex items-center justify-center gap-3">
              <Filter size={18} /> FİLTRELE
            </button>
            <button className="flex-1 md:flex-none px-8 h-16 rounded-[30px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/10 transition-all flex items-center justify-center gap-3">
              <MapPin size={18} /> ŞEHİR SEÇ
            </button>
          </div>
        </div>

        {/* Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {isLoading ? (
            <div className="col-span-full py-40 flex flex-col items-center justify-center gap-6">
              <Loader2 className="w-12 h-12 text-blue-500 animate-spin opacity-50" />
              <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] animate-pulse">Okullar Yükleniyor...</p>
            </div>
          ) : filteredSchools.length > 0 ? (
            <>
              {filteredSchools.map((school: any) => (
                <SchoolCard key={school.id} school={school} />
              ))}
            </>
          ) : (
            <div className="col-span-full py-40 text-center glass-panel rounded-[60px] border border-armoyu-card-border bg-white overflow-hidden relative">
              <div className="relative z-10">
                <Building2 size={64} className="mx-auto text-armoyu-text-muted/20 mb-8" />
                <h3 className="text-3xl font-black text-armoyu-text mb-4 uppercase italic">Henüz Bir Sonuç Yok</h3>
                <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Arama kriterlerinize uyan kayıtlı bir okul bulunamadı.</p>
              </div>
              <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-0 rounded-full" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
