'use client';

import React, { useState, useEffect } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { 
  GraduationCap, Users, Trophy, MapPin, 
  ChevronRight, Globe, Shield, Calendar,
  Gamepad2, Search, Filter, Loader2, BookOpen,
  Sword, Target, Zap, LayoutGrid, Info
} from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';

export function SchoolDetailPage() {
  const { slug } = useParams();
  const router = useRouter();
  const { api, isMockEnabled } = useArmoyu();
  const [activeTab, setActiveTab] = useState('genel');
  const [school, setSchool] = useState<any>(null);
  const [classrooms, setClassrooms] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Mock Teams Data
  const mockTeams = [
    { id: 1, name: 'Valorant Takımı', game: 'Valorant', members: 6, logo: 'https://storage.aramizdakioyuncu.com/galeri/oyunresimleri/valorant.png', color: 'bg-red-500' },
    { id: 2, name: 'Futbol Takımı', game: 'Futbol', members: 22, logo: 'https://storage.aramizdakioyuncu.com/galeri/oyunresimleri/football.png', color: 'bg-emerald-500' },
    { id: 3, name: 'League of Legends', game: 'LoL', members: 7, logo: 'https://storage.aramizdakioyuncu.com/galeri/oyunresimleri/lol.png', color: 'bg-armoyu-primary' },
    { id: 4, name: 'Satranç Topluluğu', game: 'Satranç', members: 15, logo: 'https://storage.aramizdakioyuncu.com/galeri/oyunresimleri/chess.png', color: 'bg-amber-500' },
  ];

  // Mock Leagues Data
  const mockLeagues = [
    { id: 1, name: 'Üniversiteler Arası Valorant Ligi', status: 'Devam Ediyor', prize: '10,000 TL', participants: 32 },
    { id: 2, name: 'Kampüs İçi Futbol Turnuvası', status: 'Kayıtlar Başladı', prize: 'Kupa & Madalya', participants: 16 },
  ];

  useEffect(() => {
    const fetchSchoolDetail = async () => {
      setIsLoading(true);
      try {
        // Burada normalde slug'a göre okul detayını çeken bir API olmalı.
        // Şimdilik listeyi çekip slug eşleşmesine göre bulalım veya mock verelim.
        const response = await api.education.getSchools();
        if (response.durum === 1 && Array.isArray(response.icerik)) {
          const found = response.icerik.find((s: any) => s.url === slug || s.okul_URL === slug);
          if (found) {
            setSchool(found);
            // Okul bulunduysa sınıfları çekelim (Canlı API)
            const classResp = await api.education.getClassrooms(found.id);
            if (classResp.durum === 1) {
              setClassrooms(classResp.icerik || []);
            }
          }
        }
      } catch (error) {
        console.error("[SchoolDetailPage] Fetch failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSchoolDetail();
  }, [slug, api]);

  if (isLoading) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-armoyu-bg">
        <Loader2 className="w-16 h-16 text-armoyu-primary animate-spin opacity-50" />
        <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.5em] animate-pulse">Kampüs Yükleniyor...</p>
      </div>
    );
  }

  if (!school) {
    return (
      <div className="h-screen flex flex-col items-center justify-center gap-6 bg-armoyu-bg">
        <Shield size={64} className="text-red-500 opacity-20" />
        <h2 className="text-4xl font-black text-armoyu-text uppercase italic">Okul Bulunamadı</h2>
        <button onClick={() => router.push('/?tab=egitim')} className="px-8 py-3 bg-armoyu-primary text-white rounded-2xl font-black text-xs uppercase tracking-widest">Listeye Dön</button>
      </div>
    );
  }

  return (
    <div className="pb-32 bg-armoyu-bg min-h-screen">
      {/* Hero Banner */}
      <div className="relative h-[400px] w-full overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-armoyu-primary/20 to-armoyu-bg z-10" />
        <img 
          src={school.logo} 
          className="w-full h-full object-cover blur-2xl opacity-20 scale-110" 
          alt="" 
        />
        
        <div className="absolute inset-0 z-20 flex items-end">
          <div className="max-w-[1280px] mx-auto w-full px-6 md:px-12 pb-12">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-8">
              <div className="w-40 h-40 rounded-[40px] bg-white dark:bg-zinc-900 border-8 border-armoyu-bg shadow-2xl overflow-hidden shrink-0 relative group">
                <img src={school.logo} className="w-full h-full object-contain p-4 group-hover:scale-110 transition-transform duration-700" alt={school.name} />
              </div>
              
              <div className="flex-1 text-center md:text-left mb-4">
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                  <span className="px-4 py-1 bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest rounded-full italic shadow-lg shadow-armoyu-primary/20">Onaylı Kampüs</span>
                  <span className="px-4 py-1 bg-white/10 text-armoyu-text-muted text-[10px] font-black uppercase tracking-widest rounded-full border border-white/5">ID: {school.id}</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4 drop-shadow-2xl">
                  {school.name}
                </h1>
                <div className="flex flex-wrap justify-center md:justify-start items-center gap-6 text-armoyu-text-muted">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-armoyu-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">Türkiye / İstanbul</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Globe size={16} className="text-armoyu-primary" />
                    <span className="text-[11px] font-bold uppercase tracking-widest opacity-80">{school.url}.edu.tr</span>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                 <button className="px-8 py-4 bg-armoyu-primary text-white rounded-[24px] font-black text-[10px] uppercase tracking-widest shadow-xl shadow-armoyu-primary/20 hover:scale-105 active:scale-95 transition-all">OKULUNA KATIL</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-20 z-50 bg-armoyu-bg/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-[1280px] mx-auto px-6 md:px-12">
          <div className="flex items-center gap-8 overflow-x-auto no-scrollbar py-4">
            {[
              { id: 'genel', label: 'GENEL BAKIŞ', icon: <LayoutGrid size={16} /> },
              { id: 'takimlar', label: 'OKUL TAKIMLARI', icon: <Sword size={16} /> },
              { id: 'siniflar', label: 'SINIFLAR & ŞUBELER', icon: <BookOpen size={16} /> },
              { id: 'ligler', label: 'AKTİF LİGLER', icon: <Trophy size={16} /> },
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2.5 px-2 py-2 whitespace-nowrap text-[10px] font-black uppercase tracking-[0.2em] transition-all relative group ${
                  activeTab === tab.id ? 'text-armoyu-primary' : 'text-armoyu-text-muted hover:text-armoyu-text'
                }`}
              >
                {tab.icon}
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute -bottom-4 left-0 w-full h-1 bg-armoyu-primary rounded-full animate-in slide-in-from-left duration-300" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-6 md:px-12 pt-12">
        {/* TAB CONTENT: GENEL */}
        {activeTab === 'genel' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 animate-in fade-in duration-500">
            <div className="lg:col-span-2 space-y-12">
              <div className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border">
                <h3 className="text-xl font-black text-armoyu-text mb-6 uppercase italic tracking-widest flex items-center gap-3">
                  <Info className="text-armoyu-primary" /> OKUL HAKKINDA
                </h3>
                <p className="text-armoyu-text-muted text-sm leading-relaxed opacity-80 font-medium">
                  {school.name}, Türkiye'nin önde gelen akademik kurumlarından biri olmasının yanı sıra, ARMOYU platformu üzerinden öğrencilerinin sosyal ve rekabetçi gelişimine de büyük önem vermektedir. Kampüs içi e-spor turnuvaları, spor müsabakaları ve dijital etkileşim alanları ile öğrencilerimize eşsiz bir deneyim sunuyoruz.
                  <br /><br />
                  Hemen okul takımına katılarak kampüsünü ulusal liglerde temsil edebilir veya kendi sınıf grubunu oluşturarak arkadaşlarınla mücadele edebilirsin.
                </p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                {[
                  { label: 'ÖĞRENCİ SAYISI', value: school.memberCount, icon: <Users />, color: 'text-armoyu-primary' },
                  { label: 'AKTİF TAKIMLAR', value: '12', icon: <Trophy />, color: 'text-emerald-500' },
                  { label: 'KAMPÜS PUANI', value: '8.4k', icon: <Zap />, color: 'text-amber-500' },
                ].map((stat, i) => (
                  <div key={i} className="glass-panel p-6 rounded-[30px] border border-armoyu-card-border text-center group hover:border-armoyu-primary/30 transition-colors">
                    <div className={`w-12 h-12 rounded-2xl bg-white/5 mx-auto mb-4 flex items-center justify-center ${stat.color} group-hover:scale-110 transition-transform`}>
                      {stat.icon}
                    </div>
                    <div className="text-xl font-black text-armoyu-text mb-1 uppercase italic">{stat.value}</div>
                    <div className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8">
              <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-primary/5">
                <h3 className="text-sm font-black text-armoyu-text mb-6 uppercase italic tracking-widest">KAMPÜS TEMSİLCİSİ</h3>
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-armoyu-primary border-2 border-white/10 overflow-hidden shadow-xl shadow-armoyu-primary/20">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Represent" alt="Temsilci" />
                  </div>
                  <div>
                    <div className="text-xs font-black text-armoyu-text uppercase tracking-tight">Berkay Tiken</div>
                    <div className="text-[9px] font-bold text-armoyu-primary uppercase tracking-widest mt-1 italic">RESMİ TEMSİLCİ</div>
                  </div>
                </div>
                <button className="w-full mt-6 py-3 bg-white dark:bg-white/10 text-armoyu-text rounded-2xl font-black text-[9px] uppercase tracking-widest border border-white/5 shadow-lg">MESAJ GÖNDER</button>
              </div>

              <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border">
                <h3 className="text-sm font-black text-armoyu-text mb-6 uppercase italic tracking-widest flex items-center gap-3">
                   <Calendar size={16} className="text-emerald-500" /> YAKLAŞANLAR
                </h3>
                <div className="space-y-4">
                  {[
                    { title: 'Kampüs Bahar Ligi', date: '15 Mayıs 2024' },
                    { title: 'Üniversite Tanıtım Günü', date: '22 Haziran 2024' },
                  ].map((event, i) => (
                    <div key={i} className="p-4 rounded-2xl bg-white/5 border border-white/5 group hover:bg-white/10 transition-colors">
                      <div className="text-[10px] font-black text-armoyu-text uppercase mb-1">{event.title}</div>
                      <div className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">{event.date}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB CONTENT: TAKIMLAR */}
        {activeTab === 'takimlar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-in slide-in-from-bottom-8 duration-500">
            {mockTeams.map((team) => (
              <div key={team.id} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border group hover:border-armoyu-primary/50 hover:shadow-2xl transition-all duration-500 overflow-hidden relative">
                <div className={`absolute top-0 right-0 w-24 h-24 ${team.color} opacity-5 blur-[40px] -mr-12 -mt-12`} />
                
                <div className="relative z-10">
                  <div className="w-20 h-20 rounded-[24px] bg-white dark:bg-zinc-900 shadow-xl mb-6 p-4 group-hover:scale-110 transition-transform duration-500">
                    <img src={team.logo} className="w-full h-full object-contain" alt={team.name} />
                  </div>
                  <h3 className="text-xl font-black text-armoyu-text mb-2 uppercase italic tracking-tighter leading-tight group-hover:text-armoyu-primary transition-colors">
                    {team.name}
                  </h3>
                  <div className="flex items-center justify-between mt-6 pt-6 border-t border-white/5">
                    <div className="flex items-center gap-2">
                       <Users size={14} className="text-armoyu-text-muted" />
                       <span className="text-[10px] font-black text-armoyu-text-muted">{team.members} ÜYE</span>
                    </div>
                    <button className="p-2 rounded-xl bg-white/5 text-armoyu-text-muted hover:text-white hover:bg-armoyu-primary transition-all">
                      <ChevronRight size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Create Team Card */}
            <div className="glass-panel p-8 rounded-[40px] border border-dashed border-white/10 flex flex-col items-center justify-center text-center group hover:border-armoyu-primary/50 transition-all cursor-pointer bg-white/5">
                <div className="w-16 h-16 rounded-full bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary mb-6 group-hover:scale-110 transition-transform">
                  <Plus size={32} />
                </div>
                <h3 className="text-sm font-black text-armoyu-text mb-2 uppercase italic">TAKIMINI KUR</h3>
                <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Okulunu temsil edecek yeni bir branş aç.</p>
            </div>
          </div>
        )}

        {/* TAB CONTENT: SINIFLAR (CANLI) */}
        {activeTab === 'siniflar' && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12">
                <div>
                  <h2 className="text-3xl font-black text-armoyu-text uppercase italic tracking-tighter mb-2">SINIFLAR & ŞUBELER</h2>
                  <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-60">Resmi okul kayıtlarına göre listelenen şubeler</p>
                </div>
                <div className="w-full md:w-[300px] relative">
                   <input type="text" placeholder="SINIF ARA..." className="w-full h-12 pl-12 pr-4 bg-white/5 border border-white/5 rounded-2xl text-[10px] font-black uppercase tracking-widest outline-none focus:border-armoyu-primary transition-all" />
                   <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" />
                </div>
             </div>

             <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {classrooms.length > 0 ? classrooms.map((cls) => (
                  <div key={cls.id} className="glass-panel p-6 rounded-[30px] border border-armoyu-card-border text-center group hover:bg-armoyu-primary hover:border-armoyu-primary transition-all cursor-pointer">
                    <div className="text-2xl font-black text-armoyu-text mb-1 italic group-hover:text-white transition-colors">{cls.name}</div>
                    <div className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60 group-hover:text-white/70 transition-colors">ŞUBE</div>
                  </div>
                )) : (
                  <div className="col-span-full py-20 text-center opacity-30">
                    <BookOpen size={48} className="mx-auto mb-4" />
                    <p className="text-[10px] font-black uppercase tracking-widest">Bu okul için henüz sınıf verisi girilmemiş.</p>
                  </div>
                )}
             </div>
          </div>
        )}

        {/* TAB CONTENT: LİGLER */}
        {activeTab === 'ligler' && (
           <div className="space-y-8 animate-in slide-in-from-right-8 duration-500">
              {mockLeagues.map((league) => (
                <div key={league.id} className="glass-panel p-10 rounded-[40px] border border-armoyu-card-border flex flex-col md:flex-row items-center gap-12 group hover:border-emerald-500/30 transition-all overflow-hidden relative">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 blur-[80px] -mr-32 -mt-32" />
                   
                   <div className="w-32 h-32 rounded-[32px] bg-emerald-500/10 flex items-center justify-center text-emerald-500 shrink-0">
                      <Target size={64} />
                   </div>

                   <div className="flex-1 text-center md:text-left">
                      <div className="flex flex-wrap justify-center md:justify-start items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-emerald-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg italic">{league.status}</span>
                        <span className="text-xs font-black text-armoyu-text-muted uppercase italic">Ödül: {league.prize}</span>
                      </div>
                      <h3 className="text-3xl font-black text-armoyu-text mb-4 uppercase italic tracking-tighter leading-tight">
                        {league.name}
                      </h3>
                      <p className="text-armoyu-text-muted text-xs font-bold uppercase tracking-widest opacity-60 italic leading-none">{league.participants} TAKIM KATILIYOR</p>
                   </div>

                   <button className="px-10 py-5 bg-emerald-600 text-white rounded-[24px] font-black text-xs uppercase tracking-widest shadow-xl shadow-emerald-600/20 hover:scale-105 active:scale-95 transition-all">KATILIM BAŞVURUSU</button>
                </div>
              ))}
           </div>
        )}
      </div>
    </div>
  );
}

// Helper icons
function Plus({ size, strokeWidth = 2 }: { size: number, strokeWidth?: number }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"></path><path d="M12 5v14"></path></svg>
  );
}
