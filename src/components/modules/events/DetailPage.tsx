'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PageWidth } from '../../shared/PageWidth';
import { ArmoyuEvent } from '../../../models/community/ArmoyuEvent';
import {
   ChevronLeft,
   Calendar,
   MapPin,
   Users,
   Trophy,
   ShieldCheck,
   Gamepad2,
   Share2,
   Clock,
   AlertCircle,
   LayoutGrid,
   List,
   Award,
   Zap,
   Flame,
   Sword,
   Coins,
   Crown,
   ShieldAlert,
   Compass
} from 'lucide-react';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { eventList } from '../../../lib/constants/stationData';
import { ArmoyuEvent as ArmoyuEventCore } from '@armoyu/core';

interface DetailLayoutProps {
   eventId: string | number;
   initialData?: ArmoyuEvent;
   onBack?: () => void;
}

export function DetailPage({ eventId, initialData, onBack }: DetailLayoutProps) {
   const router = useRouter();
   const { api, apiKey } = useArmoyu();
   const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');
   const [event, setEvent] = useState<ArmoyuEvent | null>(initialData || null);
   const [participants, setParticipants] = useState<{ groups: any[], individuals: any[] }>({ groups: [], individuals: [] });
   const [isLoading, setIsLoading] = useState(!initialData);
   const [error, setError] = useState<string | null>(null);

   const [showFullDescription, setShowFullDescription] = useState(false);
   const [showFullRules, setShowFullRules] = useState(false);

   // DEV TEMPLATE STYLES
   const [activeStyle, setActiveStyle] = useState<'standard' | 'tournament' | 'game_special'>('standard');

   useEffect(() => {
      const fetchDetail = async () => {
         setIsLoading(true);
         setError(null);
         try {
            const isNumeric = /^\d+$/.test(String(eventId));
            const idNum = isNumeric ? Number(eventId) : NaN;

            const response = await api.events.getEventDetail({
               eventId: isNumeric ? idNum : undefined,
               eventUrl: !isNumeric ? String(eventId) : undefined
            });

            if (response.durum === 1 && response.icerik) {
               const mappedEvent = ArmoyuEvent.fromClass(response.icerik as ArmoyuEventCore);
               setEvent(mappedEvent);

               // Fetch participants if event is found
               try {
                  const partRes = await api.events.getEventParticipants(mappedEvent.id);
                  if (partRes.durum === 1 && partRes.icerik) {
                     setParticipants(partRes.icerik);
                  }
               } catch (partErr) {
                  console.error('[DetailPage] Participants fetch error:', partErr);
               }
            } else if (!apiKey || apiKey === 'armoyu_showcase_key' || response.durum !== 1) {
               // Fallback to mock data
               const mockEvent = eventList.find(e => String(e.id) === String(eventId));
               if (mockEvent) {
                  setEvent(ArmoyuEvent.fromAPI(mockEvent as any));
               } else {
                  setError(response.aciklama || 'Etkinlik bilgisi bulunamadı.');
               }
            }
         } catch (err) {
            console.error('[DetailLayout] Fetch error:', err);
            // Fallback to mock data on catch
            const mockEvent = eventList.find(e => String(e.id) === String(eventId));
            if (mockEvent) {
               setEvent(ArmoyuEvent.fromAPI(mockEvent as any));
            } else {
               setError('Etkinlik yüklenirken bir sorun oluştu.');
            }
         } finally {
            setIsLoading(false);
         }
      };

      fetchDetail();
   }, [eventId, api]);

   if (isLoading) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
            <div className="w-12 h-12 border-4 border-armoyu-primary/20 border-t-armoyu-primary rounded-full animate-spin"></div>
            <span className="text-xs font-black uppercase tracking-widest text-armoyu-text-muted animate-pulse">Etkinlik Yükleniyor...</span>
         </div>
      );
   }

   if (error || !event) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
            <div className="p-4 bg-red-500/10 rounded-full text-red-500 mb-4">
               <AlertCircle size={40} />
            </div>
            <h2 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">HATA OLUŞTU</h2>
            <p className="text-armoyu-text-muted font-medium mb-8 max-w-md">{error || 'Beklenmedik bir hata meydana geldi.'}</p>
            <button
               onClick={onBack}
               className="px-8 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-2xl font-black text-xs uppercase tracking-widest transition-all"
            >
               GERİ DÖN
            </button>
         </div>
      );
   }

   const progressPercentage = event.participantLimit > 0
      ? Math.min(100, (event.currentParticipants / event.participantLimit) * 100)
      : 0;

   const getParticipantTypeLabel = (type: string) => {
      switch (type) {
         case 'bireysel': return 'Bireysel';
         case 'gruplu': return 'Gruplu';
         case 'bireysel_gruplu': return 'Bireysel & Gruplu';
         default: return 'Bireysel';
      }
   };

   // RENDER: STANDARD VIEW (Original Elegancy)
   const renderStandardView = () => {
      return (
         <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
            {/* HERO SECTION */}
            <div className="relative aspect-[21/8] md:aspect-[21/6] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group">
               <img
                  src={event.image || event.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={event.name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
               <div className="absolute inset-0 p-6 md:p-8 flex flex-col justify-end gap-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                     <span className="bg-armoyu-primary text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest shadow-lg">
                        {event.gameName}
                     </span>
                     <span className="bg-white/10 backdrop-blur-md text-white px-3 py-1 rounded-full text-[8px] font-black uppercase tracking-widest border border-white/10">
                        {event.type}
                     </span>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-2xl">
                     {event.name}
                  </h1>
                  <div className="flex items-center gap-6 mt-1 opacity-80">
                     <div className="flex items-center gap-2 shrink-0">
                        <Calendar className="text-armoyu-primary" size={16} />
                        <span className="text-xs font-black text-white uppercase tracking-wider">{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 shrink-0">
                        <MapPin className="text-armoyu-primary" size={16} />
                        <span className="text-xs font-black text-white uppercase tracking-wider">{event.location}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* QUICK STATS & JOIN */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                     { icon: <Clock />, label: 'Durum', value: event.status === 1 ? 'Aktif' : 'Tamamlandı', color: 'text-emerald-500' },
                     { icon: <Users />, label: 'Katılım', value: event.getParticipantProgress(), color: 'text-armoyu-primary' },
                     { icon: <Trophy />, label: 'Tür', value: getParticipantTypeLabel(event.type), color: 'text-purple-500' },
                     { icon: <MapPin />, label: 'Konum', value: event.location || 'Online', color: 'text-orange-500' },
                  ].map((stat, i) => (
                     <div key={i} className="bg-armoyu-card-bg p-4 rounded-2xl border border-white/5 flex items-center gap-4 shadow-xl">
                        <div className={`w-8 h-8 rounded-xl bg-white/5 flex items-center justify-center ${stat.color} shrink-0`}>
                           {React.cloneElement(stat.icon as any, { size: 16 })}
                        </div>
                        <div className="min-w-0">
                           <span className="block text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest mb-0.5">{stat.label}</span>
                           <span className="text-[11px] font-black text-armoyu-text uppercase tracking-tighter truncate block">{stat.value}</span>
                        </div>
                     </div>
                  ))}
               </div>

               <div className="bg-armoyu-card-bg rounded-2xl p-4 border border-white/5 shadow-2xl relative overflow-hidden group flex flex-col gap-4">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-armoyu-primary/5 blur-[40px] -mr-8 -mt-8"></div>
                  <div className="h-1.5 w-full bg-black/20 rounded-full overflow-hidden border border-white/5">
                     <div
                        className="h-full bg-armoyu-primary rounded-full transition-all duration-1000"
                        style={{ width: `${progressPercentage}%` }}
                     />
                  </div>

                  {event.status === 1 ? (
                     <button className="w-full py-3 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 relative z-10">
                        <ShieldCheck size={14} strokeWidth={3} />
                        <span>Hemen Katıl</span>
                        {event.minOdp > 0 && (
                           <span className="text-[7px] opacity-70 bg-black/20 px-1.5 py-0.5 rounded-md font-bold">
                              {event.minOdp} ODP
                           </span>
                        )}
                     </button>
                  ) : (
                     <div className="w-full py-3 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center gap-2 opacity-50">
                        <ShieldCheck size={14} className="text-armoyu-text-muted" />
                        <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">Etkinlik Tamamlandı</span>
                     </div>
                  )}
               </div>
            </div>

            {/* Organizers */}
            <div className="space-y-4">
               <h3 className="text-[10px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-armoyu-primary pl-4">ETKİNLİK SORUMLULARI</h3>
               <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                  {event.organizers && event.organizers.length > 0 ? event.organizers.map((organizer: any) => (
                     <div 
                        key={organizer.id} 
                        onClick={() => router.push(`/oyuncu/${organizer.displayName}`)}
                        className="flex items-center gap-3 p-3 bg-armoyu-card-bg rounded-2xl border border-white/5 hover:border-armoyu-primary/30 transition-all group cursor-pointer active:scale-95 shadow-lg"
                     >
                        <img src={organizer.avatar} className="w-8 h-8 rounded-lg border border-white/10" alt="" />
                        <div className="flex flex-col min-w-0">
                           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-tighter group-hover:text-armoyu-primary transition-colors truncate">{organizer.displayName}</span>
                           <span className="text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest italic opacity-60">Yönetici</span>
                        </div>
                     </div>
                  )) : (
                     <div className="flex items-center gap-3 p-3 bg-armoyu-card-bg rounded-2xl border border-white/5">
                        <div className="w-8 h-8 rounded-lg bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
                           <Gamepad2 size={16} />
                        </div>
                        <div className="flex flex-col">
                           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-tighter italic">Platform Ekibi</span>
                           <span className="text-[7px] font-black text-armoyu-text-muted uppercase tracking-widest italic">ARMOYU</span>
                        </div>
                     </div>
                  )}
               </div>
            </div>

            {/* Description & Rules */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-armoyu-card-bg rounded-3xl p-6 border border-white/5 shadow-xl space-y-4">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic border-l-4 border-armoyu-primary pl-4">HAKKINDA</h3>
                  <div className="relative">
                     <div className={`text-armoyu-text-muted text-xs leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullDescription ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                        {event.description || 'Bu etkinlik için henüz bir açıklama girilmemiş.'}
                     </div>
                     {event.description && event.description.split(/\s+/).length > 30 && (
                        <button
                           onClick={() => setShowFullDescription(!showFullDescription)}
                           className="mt-3 text-[8px] font-black text-armoyu-primary hover:text-white uppercase tracking-widest transition-all"
                        >
                           {showFullDescription ? '▲ DAHA AZ GÖR' : '▼ DEVAMINI GÖR'}
                        </button>
                     )}
                  </div>
               </div>

               <div className="bg-armoyu-card-bg rounded-3xl p-6 border border-white/5 shadow-xl space-y-4">
                  <h3 className="text-[11px] font-black text-white uppercase tracking-[0.2em] italic border-l-4 border-red-600 pl-4">KURALLAR</h3>
                  <div className="relative">
                     <div className={`text-armoyu-text-muted text-xs leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullRules ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                        {event.rules || 'Genel platform kuralları geçerlidir.'}
                     </div>
                     {(event.rules || 'Genel platform kuralları geçerlidir.').split(/\s+/).length > 20 && (
                        <button
                           onClick={() => setShowFullRules(!showFullRules)}
                           className="mt-3 text-[8px] font-black text-red-500 hover:text-white uppercase tracking-widest transition-all"
                        >
                           {showFullRules ? '▲ DAHA AZ GÖR' : '▼ DEVAMINI GÖR'}
                        </button>
                     )}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   // RENDER: TOURNAMENT VIEW (Cyberpunk Esports Vibe)
   const renderTournamentView = () => {
      return (
         <div className="mx-auto px-4 space-y-8 animate-in zoom-in-95 duration-500 relative">
            {/* Cyberpunk Tech Background Details */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808008_1px,transparent_1px)] bg-[size:32px_32px] pointer-events-none -z-20"></div>

            {/* HERO BANNER WITH CORNER BRACKETS */}
            <div className="relative aspect-[21/8] md:aspect-[21/6] rounded-[32px] overflow-hidden border-2 border-amber-500/40 shadow-[0_0_40px_rgba(245,158,11,0.15)] group">
               <img
                  src={event.image || event.thumbnail}
                  className="w-full h-full object-cover saturate-120 group-hover:scale-105 transition-transform duration-1000"
                  alt={event.name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/40 to-transparent" />
               
               {/* Glowing corner decors */}
               <div className="absolute top-4 left-4 w-4 h-4 border-t-2 border-l-2 border-amber-500"></div>
               <div className="absolute top-4 right-4 w-4 h-4 border-t-2 border-r-2 border-amber-500"></div>
               <div className="absolute bottom-4 left-4 w-4 h-4 border-b-2 border-l-2 border-amber-500"></div>
               <div className="absolute bottom-4 right-4 w-4 h-4 border-b-2 border-r-2 border-amber-500"></div>

               <div className="absolute inset-0 p-6 md:p-10 flex flex-col justify-end gap-3">
                  <div className="flex flex-wrap gap-2 mb-1">
                     <span className="bg-gradient-to-r from-amber-500 to-yellow-600 text-black px-4 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest shadow-[0_0_15px_rgba(245,158,11,0.4)] flex items-center gap-1.5">
                        <Trophy size={10} /> TURNUVA ETKİNLİĞİ
                     </span>
                     <span className="bg-black/60 backdrop-blur-md text-amber-500 px-3 py-1 rounded-xl text-[8px] font-black uppercase tracking-widest border border-amber-500/20">
                        {event.gameName}
                     </span>
                  </div>
                  <h1 className="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic drop-shadow-[0_4px_8px_rgba(0,0,0,0.8)] text-shadow-glow">
                     {event.name}
                  </h1>
                  <div className="flex flex-wrap items-center gap-6 mt-1 text-gray-300">
                     <div className="flex items-center gap-2 shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <Calendar className="text-amber-500" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{event.date}</span>
                     </div>
                     <div className="flex items-center gap-2 shrink-0 bg-black/40 px-3 py-1.5 rounded-xl border border-white/5">
                        <MapPin className="text-amber-500" size={14} />
                        <span className="text-[10px] font-black uppercase tracking-wider">{event.location || 'Discord Arenası'}</span>
                     </div>
                  </div>
               </div>
            </div>

            {/* PRIZE POOL SECTION */}
            <div className="bg-gradient-to-r from-amber-500/10 via-yellow-500/5 to-transparent rounded-[32px] border border-amber-500/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl relative overflow-hidden">
               <div className="absolute -right-16 -bottom-16 w-48 h-48 bg-amber-500/5 blur-[50px] rounded-full"></div>
               <div className="flex items-center gap-5 relative z-10">
                  <div className="p-4 bg-amber-500/20 rounded-2xl border border-amber-500/30 text-amber-400 animate-bounce">
                     <Trophy size={32} />
                  </div>
                  <div>
                     <span className="text-[9px] font-black text-amber-500 uppercase tracking-[0.2em]">ETKİNLİK ÖDÜL HAVUZU</span>
                     <h2 className="text-2xl font-black text-white uppercase tracking-tight mt-0.5">15,000 ODP + Discord Sponsor Rolü</h2>
                  </div>
               </div>
               <div className="flex gap-3 relative z-10 w-full md:w-auto">
                  <div className="bg-[#0b0b12] border border-amber-500/30 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px] shadow-lg">
                     <span className="block text-[8px] font-black text-amber-500 uppercase tracking-widest">🏆 1. BİRİNCİ</span>
                     <span className="text-sm font-black text-white block mt-1">8,000 ODP</span>
                  </div>
                  <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px]">
                     <span className="block text-[8px] font-black text-gray-400 uppercase tracking-widest">🥈 2. İKİNCİ</span>
                     <span className="text-sm font-black text-white block mt-1">4,000 ODP</span>
                  </div>
                  <div className="bg-[#0b0b12] border border-white/10 rounded-2xl p-4 text-center flex-1 md:flex-initial min-w-[100px]">
                     <span className="block text-[8px] font-black text-amber-700 uppercase tracking-widest">🥉 3. ÜÇÜNCÜ</span>
                     <span className="text-sm font-black text-white block mt-1">3,000 ODP</span>
                  </div>
               </div>
            </div>

            {/* TOURNAMENT DETAILS GRID */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
               {/* Left Big: Brackets & Participants */}
               <div className="lg:col-span-3 space-y-6">
                  {/* Bracket view */}
                  <div className="bg-armoyu-card-bg border border-white/5 rounded-[32px] p-6 md:p-8 space-y-6 shadow-2xl relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-32 h-32 bg-amber-500/5 blur-[50px] -mr-10 -mt-10 rounded-full"></div>
                     <h3 className="text-[11px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-amber-500 pl-4">DÜELLO EŞLEŞMELERİ (TURNUVA AĞACI)</h3>
                     
                     <div className="flex flex-col lg:flex-row items-center justify-between gap-8 py-8 overflow-x-auto min-w-full">
                        {/* Quarter Final */}
                        <div className="flex flex-col gap-6 w-full lg:w-60 shrink-0">
                           <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.25em] text-center border-b border-white/5 pb-2">ÇEYREK FİNAL</div>
                           <div className="space-y-4">
                              <div className="bg-black/40 border border-white/10 p-3.5 rounded-2xl space-y-2 relative">
                                 <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Alpha</span><span className="text-amber-500">2</span></div>
                                 <div className="flex justify-between items-center text-[10px] font-black text-gray-500"><span className="truncate">Team Beta</span><span>1</span></div>
                              </div>
                              <div className="bg-black/40 border border-white/10 p-3.5 rounded-2xl space-y-2">
                                 <div className="flex justify-between items-center text-[10px] font-black text-gray-500"><span className="truncate">Team Delta</span><span>0</span></div>
                                 <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Gamma</span><span className="text-amber-500">2</span></div>
                              </div>
                           </div>
                        </div>
                        
                        {/* Semi Final */}
                        <div className="flex flex-col gap-12 w-full lg:w-60 shrink-0">
                           <div className="text-[8px] font-black text-gray-400 uppercase tracking-[0.25em] text-center border-b border-white/5 pb-2">YARI FİNAL</div>
                           <div className="space-y-8">
                              <div className="bg-black/40 border border-amber-500/20 p-3.5 rounded-2xl space-y-2 shadow-lg shadow-amber-500/5">
                                 <div className="flex justify-between items-center text-[10px] font-black text-white"><span className="truncate">Team Alpha</span><span className="text-amber-500">3</span></div>
                                 <div className="flex justify-between items-center text-[10px] font-black text-gray-400"><span className="truncate">Team Gamma</span><span>2</span></div>
                              </div>
                           </div>
                        </div>

                        {/* Grand Final */}
                        <div className="flex flex-col gap-6 w-full lg:w-60 shrink-0 items-center justify-center">
                           <div className="text-[8px] font-black text-amber-500 uppercase tracking-[0.25em] text-center border-b border-amber-500/20 pb-2 w-full">BÜYÜK FİNAL</div>
                           <div className="bg-gradient-to-b from-amber-500/20 to-black/80 border-2 border-amber-500 p-6 rounded-3xl text-center w-full shadow-2xl shadow-amber-500/15 relative overflow-hidden">
                              <Crown className="text-amber-500 mx-auto mb-2 animate-bounce" size={36} />
                              <h4 className="text-[9px] font-black text-white uppercase tracking-widest">ŞAMPİYONLUK MAÇI</h4>
                              <div className="mt-4 space-y-1.5 text-center">
                                 <span className="block text-xs font-black text-amber-500 uppercase">Team Alpha</span>
                                 <span className="text-[8px] font-black text-gray-400 uppercase">VS</span>
                                 <span className="block text-[10px] font-black text-gray-300">TBD (Yarı Final 2 Kazananı)</span>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Side: Registration status & Limits */}
               <div className="space-y-6">
                  {/* Registration Card */}
                  <div className="bg-[#0b0b12] border-2 border-amber-500/40 rounded-[32px] p-6 shadow-2xl space-y-6 relative overflow-hidden">
                     <div className="absolute top-0 right-0 w-24 h-24 bg-amber-500/10 blur-[40px] rounded-full -mr-8 -mt-8"></div>
                     <span className="text-[8px] font-black text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full uppercase tracking-widest inline-block">KAYIT AŞAMASI</span>
                     
                     <div className="space-y-2">
                        <div className="flex justify-between items-center text-xs font-bold text-gray-400">
                           <span>Kayıtlı Oyuncu</span>
                           <span>{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                        </div>
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden border border-white/5 p-0.5">
                           <div 
                             className="h-full bg-gradient-to-r from-amber-600 to-amber-400 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)] transition-all duration-1000" 
                             style={{ width: `${progressPercentage}%` }}
                           />
                        </div>
                     </div>

                     <div className="space-y-3">
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                           <Award className="text-amber-500" size={16} />
                           <span>Min ODP Gereksinimi: <strong className="text-white">{event.minOdp}+</strong></span>
                        </div>
                        <div className="flex items-center gap-3 text-xs text-gray-300">
                           <Zap className="text-amber-500" size={16} />
                           <span>Katılımcı Türü: <strong className="text-white">{getParticipantTypeLabel(event.type)}</strong></span>
                        </div>
                     </div>

                     {event.status === 1 ? (
                        <button className="w-full py-4 bg-gradient-to-r from-amber-500 to-yellow-600 hover:brightness-110 text-black font-black rounded-2xl text-[10px] uppercase tracking-[0.25em] transition-all shadow-[0_0_20px_rgba(245,158,11,0.2)] active:scale-95 flex items-center justify-center gap-2">
                           <Sword size={14} /> TURNUVAYA KAYDOL
                        </button>
                     ) : (
                        <div className="w-full py-4 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center gap-2 opacity-50">
                           <ShieldAlert size={14} className="text-gray-400" />
                           <span className="text-[9px] font-black uppercase tracking-widest text-gray-400">TURNUVA KAPANDI</span>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Description & Rules in Tournament Vibe */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-armoyu-card-bg rounded-[32px] p-6 border border-white/5 shadow-2xl space-y-4">
                  <h3 className="text-[11px] font-black text-amber-500 uppercase tracking-[0.2em] italic border-l-4 border-amber-500 pl-4">DETAYLAR & AÇIKLAMA</h3>
                  <div className="text-gray-300 text-xs leading-relaxed font-medium opacity-90 whitespace-pre-wrap">
                     {event.description || 'Turnuva detayları belirtilmedi.'}
                  </div>
               </div>

               <div className="bg-armoyu-card-bg rounded-[32px] p-6 border border-white/5 shadow-2xl space-y-4">
                  <h3 className="text-[11px] font-black text-red-500 uppercase tracking-[0.2em] italic border-l-4 border-red-500 pl-4">TURNUVA KURALLARI</h3>
                  <div className="text-gray-300 text-xs leading-relaxed font-medium opacity-90 whitespace-pre-wrap">
                     {event.rules || 'Genel rekabetçi turnuva kuralları geçerlidir.'}
                  </div>
               </div>
            </div>
         </div>
      );
   };

   // RENDER: GAME SPECIAL VIEW (Immersive HUD matching Minecraft/CS2/ETS2)
   const renderGameSpecialView = () => {
      const gName = (event.gameName || '').toLowerCase();

      // MINECRAFT SPECIAL LAYOUT (Green voxel style)
      if (gName.includes('minecraft') || gName.includes('mc')) {
         return (
            <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500 font-mono">
               {/* Minecraft-like header container */}
               <div className="bg-[#3b2d1f] border-4 border-[#2d2116] p-6 rounded-none shadow-[0_0_0_4px_#5c4a37] relative overflow-hidden">
                  <div className="absolute top-2 right-2 px-3 py-1 bg-green-700 text-white border-2 border-green-900 text-[10px] font-bold">
                     MINECRAFT SUNUCUSU
                  </div>
                  <h1 className="text-2xl md:text-4xl font-bold text-yellow-400 drop-shadow-[2px_2px_0px_#000] uppercase tracking-wide">
                     ⛏️ {event.name}
                  </h1>
                  <p className="text-xs text-gray-300 mt-2">Sunucu Buluşması & Macera Etkinliği</p>
                  <div className="flex gap-4 mt-4 text-[10px] text-green-400">
                     <span>[Tarih]: {event.date}</span>
                     <span>[Konum]: {event.location || 'ARMOYU Hub'}</span>
                  </div>
               </div>

               {/* MC Inventory Slots themed participants & Quick stats */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Left Column stats */}
                  <div className="md:col-span-2 space-y-6">
                     <div className="bg-[#2e2e2e] border-4 border-[#1c1c1c] p-6 text-xs text-gray-300 space-y-4">
                        <h3 className="text-yellow-400 font-bold uppercase border-b-2 border-[#1c1c1c] pb-2">ETKİNLİK DETAYLARI</h3>
                        <div className="space-y-2">
                           <p><strong className="text-white">Açıklama:</strong></p>
                           <p className="bg-[#181818] p-3 border-2 border-[#101010] text-gray-400 whitespace-pre-wrap">{event.description}</p>
                        </div>
                     </div>
                  </div>

                  {/* MC HUD Register Box */}
                  <div className="bg-[#382b26] border-4 border-[#1f1714] p-6 text-center space-y-4">
                     <span className="text-yellow-400 text-xs font-bold block">KATILIM DURUMU</span>
                     <div className="bg-black/60 p-4 border-2 border-[#1f1714] text-xs">
                        <span className="block text-gray-400 text-[10px]">OYUNCU SAYISI</span>
                        <span className="text-xl font-bold text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                     </div>
                     <button className="w-full py-3 bg-[#4c8c2b] hover:bg-[#3f7324] border-b-4 border-[#284e18] text-white font-bold text-xs uppercase tracking-widest transition-all active:translate-y-1 active:border-b-0">
                        ETKİNLİĞE KATIL
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      // CS2 SPECIAL LAYOUT (Military Orange & Radar)
      if (gName.includes('counter-strike') || gName.includes('cs')) {
         return (
            <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
               {/* CS2 Tactical HUD */}
               <div className="bg-zinc-950 border border-amber-500/40 p-8 rounded-3xl relative overflow-hidden shadow-2xl">
                  {/* Neon orange stripes */}
                  <div className="absolute top-0 left-0 w-2 h-full bg-amber-500"></div>
                  
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                     <div>
                        <div className="flex items-center gap-2 mb-2">
                           <span className="bg-amber-500 text-black px-2 py-0.5 rounded text-[8px] font-black tracking-widest">TAC_EVENT</span>
                           <span className="text-gray-400 text-[9px] font-bold">MATCHMAKING ACTIVE</span>
                        </div>
                        <h1 className="text-3xl md:text-5xl font-black text-white tracking-tighter uppercase italic text-shadow-glow">
                           💥 {event.name}
                        </h1>
                        <p className="text-xs text-gray-400 mt-2 font-mono">BOMBSITE LOC: {event.location || 'Discord Arenası'}</p>
                     </div>
                     <div className="bg-zinc-900 border border-white/5 px-6 py-4 rounded-2xl text-right">
                        <span className="text-[8px] font-black text-gray-500 block uppercase">MATCH_START</span>
                        <span className="text-sm font-black text-amber-500 block mt-1">{event.date}</span>
                     </div>
                  </div>
               </div>

               {/* CS2 Stats Grid */}
               <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="md:col-span-2 space-y-6">
                     <div className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xs font-black text-amber-500 tracking-wider uppercase border-l-4 border-amber-500 pl-3">TAKTIK TALİMATLAR (AÇIKLAMA)</h3>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                     </div>
                     <div className="bg-zinc-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                        <h3 className="text-xs font-black text-red-500 tracking-wider uppercase border-l-4 border-red-500 pl-3">ANGARYA KURALLARI</h3>
                        <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.rules}</p>
                     </div>
                  </div>

                  <div className="bg-zinc-950 border border-white/5 rounded-3xl p-6 space-y-6">
                     <div className="text-center pb-4 border-b border-white/5">
                        <span className="text-[9px] font-black text-gray-500 block uppercase">LOBBY CAPACITY</span>
                        <span className="text-2xl font-black text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                     </div>
                     
                     <div className="space-y-3">
                        <div className="flex justify-between items-center text-xs font-bold">
                           <span className="text-gray-400">Min ODP:</span>
                           <span className="text-amber-500">{event.minOdp}</span>
                        </div>
                        <div className="flex justify-between items-center text-xs font-bold">
                           <span className="text-gray-400">Tür:</span>
                           <span className="text-white">{getParticipantTypeLabel(event.type)}</span>
                        </div>
                     </div>

                     <button className="w-full py-4 bg-amber-500 hover:bg-amber-600 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-amber-500/10 active:scale-95 transition-all">
                        DEPLOY TO SERVER
                     </button>
                  </div>
               </div>
            </div>
         );
      }

      // RACING / ETS2 SPECIAL LAYOUT (Asphalt black & hazard stripes)
      return (
         <div className="mx-auto px-4 space-y-8 animate-in fade-in duration-500">
            {/* ETS2 Dashboard HUD styling */}
            <div className="bg-neutral-900 border-b-8 border-yellow-500 p-8 rounded-3xl shadow-2xl relative overflow-hidden">
               {/* Diagonal striping background */}
               <div className="absolute inset-0 bg-repeat bg-[linear-gradient(45deg,#000_25%,transparent_25%,transparent_50%,#000_50%,#000_75%,transparent_75%,transparent)] bg-[size:10px_10px] opacity-5 pointer-events-none"></div>
               
               <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 relative z-10">
                  <div>
                     <span className="px-3 py-1 bg-yellow-500 text-black text-[9px] font-black uppercase rounded-lg tracking-widest inline-block mb-3">ETS 2 SEFER GÖREVİ</span>
                     <h1 className="text-3xl md:text-5xl font-black text-white uppercase italic tracking-tighter">
                        🚚 {event.name}
                     </h1>
                     <div className="flex gap-4 mt-3 text-xs text-gray-400 font-mono">
                        <span>[Başlangıç]: {event.location || 'Duisburg'}</span>
                        <span>[Tarih]: {event.date}</span>
                     </div>
                  </div>
                  
                  {/* Tachometer gauge mock design */}
                  <div className="w-24 h-24 rounded-full border-4 border-yellow-500/20 border-t-yellow-500 flex flex-col items-center justify-center text-center bg-black/40">
                     <span className="text-[7px] text-gray-500 font-bold uppercase">SPEED</span>
                     <span className="text-md font-black text-white font-mono">90</span>
                     <span className="text-[7px] text-yellow-500 font-bold uppercase">KM/S</span>
                  </div>
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
               <div className="md:col-span-2 space-y-6">
                  <div className="bg-neutral-900/60 border border-white/5 rounded-3xl p-6 space-y-4">
                     <h3 className="text-xs font-black text-yellow-500 tracking-wider uppercase border-l-4 border-yellow-500 pl-3">KONVOY ROTASI VE DETAYLARI</h3>
                     <p className="text-xs text-gray-300 leading-relaxed whitespace-pre-wrap">{event.description}</p>
                  </div>
               </div>

               <div className="bg-neutral-950 border border-white/5 rounded-3xl p-6 space-y-6">
                  <div className="text-center pb-4 border-b border-white/5">
                     <span className="text-[9px] font-black text-gray-500 block uppercase">KONVOY KAPASİTESİ</span>
                     <span className="text-2xl font-black text-white mt-1 block">{event.currentParticipants} / {event.participantLimit > 0 ? event.participantLimit : 'Sınırsız'}</span>
                  </div>

                  <button className="w-full py-4 bg-yellow-500 hover:bg-yellow-600 text-black font-black rounded-2xl text-[10px] uppercase tracking-widest transition-all active:scale-95 shadow-lg shadow-yellow-500/10">
                     TELSİZE BAĞLAN & KATIL
                  </button>
               </div>
            </div>
         </div>
      );
   };

   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10 relative">
         {/* Subtle Background Glows */}
         <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-armoyu-primary/5 blur-[100px] rounded-full" />
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/5 blur-[100px] rounded-full" />
         </div>

         {/* Navigation Header - COMPACT */}
         <PageWidth width="max-w-[1280px]" />
         <div className="mx-auto mb-6 px-4">
            <button
               onClick={onBack}
               className="group flex items-center gap-3 text-armoyu-text-muted hover:text-white transition-all bg-white/5 hover:bg-white/10 px-5 py-2.5 rounded-2xl border border-white/5"
            >
               <ChevronLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
               <span className="text-[10px] font-black uppercase tracking-widest">Geri Dön</span>
            </button>
         </div>

         {/* RENDER ACTIVE STYLE SELECTION */}
         {activeStyle === 'standard' && renderStandardView()}
         {activeStyle === 'tournament' && renderTournamentView()}
         {activeStyle === 'game_special' && renderGameSpecialView()}

         {/* Participants - COMMON FOR ALL STYLES (Kept at bottom) */}
         <div className="max-w-[1280px] mx-auto px-4 mt-8">
            <div className="bg-armoyu-card-bg rounded-[32px] p-6 md:p-8 border border-white/5 shadow-2xl space-y-6">
               <div className="flex items-center justify-between gap-4">
                  <h3 className="text-[12px] font-black text-white uppercase tracking-[0.3em] italic border-l-4 border-armoyu-primary pl-4">KATILIMCILAR</h3>
                  <div className="flex items-center gap-3">
                     <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-armoyu-primary/10 rounded-xl border border-armoyu-primary/20 text-armoyu-primary text-[8px] font-black uppercase tracking-widest italic">
                        <Users size={12} />
                        {participants.individuals.length + participants.groups.length} KATILIM
                     </div>
                     <div className="flex items-center gap-1 bg-black/40 p-1 rounded-xl border border-white/5 scale-90">
                        <button onClick={() => setViewMode('grid')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-armoyu-primary text-white shadow-lg' : 'text-armoyu-text-muted'}`}>
                           <LayoutGrid size={14} />
                        </button>
                        <button onClick={() => setViewMode('table')} className={`p-1.5 rounded-lg transition-all ${viewMode === 'table' ? 'bg-armoyu-primary text-white shadow-lg' : 'text-armoyu-text-muted'}`}>
                           <List size={14} />
                        </button>
                     </div>
                  </div>
               </div>

               <div className="space-y-12">
                  {/* Individuals */}
                  {participants.individuals.length > 0 && (
                     <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-60">OYUNCULAR</h4>
                        {viewMode === 'grid' ? (
                           <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 xl:grid-cols-10 gap-3">
                              {participants.individuals.map((p: any) => (
                                 <div 
                                    key={p.id} 
                                    onClick={() => router.push(`/oyuncu/${p.username}`)}
                                    className="flex flex-col items-center gap-2 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-armoyu-primary/30 transition-all group text-center cursor-pointer active:scale-95"
                                 >
                                    <img src={p.avatar} className="w-10 h-10 rounded-xl border border-white/5" alt="" />
                                    <span className="text-[9px] font-black text-armoyu-text uppercase tracking-tighter truncate w-full group-hover:text-armoyu-primary transition-colors">{p.name || p.username}</span>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                              <table className="w-full text-left">
                                 <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Oyuncu</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic text-right">Durum</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                    {participants.individuals.map((p: any) => (
                                       <tr key={p.id} onClick={() => router.push(`/oyuncu/${p.username}`)} className="hover:bg-white/5 transition-all cursor-pointer group">
                                          <td className="px-4 py-2.5">
                                             <div className="flex items-center gap-3">
                                                <img src={p.avatar} className="w-8 h-8 rounded-lg border border-white/5" alt="" />
                                                <div className="flex flex-col">
                                                   <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{p.name || p.username}</span>
                                                   <span className="text-[8px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60 italic">Bireysel</span>
                                                </div>
                                             </div>
                                          </td>
                                          <td className="px-4 py-2.5 text-right">
                                             <span className="text-[8px] font-black text-armoyu-primary uppercase tracking-widest italic bg-armoyu-primary/10 px-3 py-1 rounded-full border border-armoyu-primary/20">KATILDI</span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        )}
                     </div>
                  )}

                  {/* Groups */}
                  {participants.groups.length > 0 && (
                     <div className="space-y-4">
                        <h4 className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-60">GRUPLAR</h4>
                        
                        {viewMode === 'grid' ? (
                           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                              {participants.groups.map((g: any) => (
                                 <div key={g.id} onClick={() => router.push(`/grup/${g.shortName}`)} className="group bg-armoyu-card-bg rounded-2xl border border-white/5 overflow-hidden shadow-xl hover:border-armoyu-primary/30 transition-all cursor-pointer active:scale-[0.98]">
                                    <div className="relative h-16 overflow-hidden">
                                       {g.banner ? <img src={g.banner} className="w-full h-full object-cover opacity-20" alt="" /> : <div className="w-full h-full bg-gradient-to-r from-armoyu-primary/20 to-indigo-600/20" />}
                                       <div className="absolute inset-0 bg-gradient-to-t from-armoyu-card-bg to-transparent" />
                                    </div>
                                    <div className="relative px-4 -mt-8 mb-3 flex items-end gap-3">
                                       <img src={g.logo} className="w-10 h-10 rounded-xl bg-armoyu-card-bg p-0.5 border border-white/10 shadow-xl" alt="" />
                                       <div className="pb-0.5 min-w-0">
                                          <h5 className="text-[12px] font-black text-white uppercase italic tracking-tighter leading-none truncate group-hover:text-armoyu-primary transition-colors">{g.name}</h5>
                                          <span className="text-[8px] font-bold text-armoyu-primary uppercase tracking-widest italic">{g.shortName}</span>
                                       </div>
                                    </div>
                                    <div className="px-4 pb-4">
                                       <div className="bg-black/20 rounded-xl border border-white/5 overflow-hidden">
                                          <table className="w-full text-left">
                                             <tbody className="divide-y divide-white/5">
                                                {g.players.slice(0, 3).map((p: any) => (
                                                   <tr 
                                                      key={p.id} 
                                                      onClick={(e) => {
                                                         e.stopPropagation();
                                                         router.push(`/oyuncu/${p.username || p.name}`);
                                                       }}
                                                      className="hover:bg-white/5 cursor-pointer transition-colors group/player"
                                                   >
                                                      <td className="px-3 py-1.5 flex items-center gap-2 text-[9px] font-black text-white/80 uppercase truncate">
                                                         <img src={p.avatar} className="w-5 h-5 rounded-md border border-white/5 object-cover" alt="" />
                                                         <span className="truncate group-hover/player:text-armoyu-primary transition-colors">{p.name}</span>
                                                      </td>
                                                      <td className="px-3 py-1.5 text-right text-[7px] font-black text-armoyu-text-muted uppercase italic opacity-60">{p.role || 'Oyuncu'}</td>
                                                   </tr>
                                                ))}
                                             </tbody>
                                          </table>
                                       </div>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        ) : (
                           <div className="bg-black/20 rounded-2xl border border-white/5 overflow-hidden shadow-xl">
                              <table className="w-full text-left">
                                 <thead>
                                    <tr className="border-b border-white/5 bg-white/5">
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Grup</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Kısaltma</th>
                                       <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic text-right">Oyuncu Sayısı</th>
                                    </tr>
                                 </thead>
                                 <tbody className="divide-y divide-white/5">
                                    {participants.groups.map((g: any) => (
                                       <tr key={g.id} onClick={() => router.push(`/grup/${g.shortName}`)} className="hover:bg-white/5 transition-all cursor-pointer group">
                                          <td className="px-4 py-2.5">
                                             <div className="flex items-center gap-3">
                                                <img src={g.logo} className="w-8 h-8 rounded-lg border border-white/5" alt="" />
                                                <span className="text-[11px] font-black text-white uppercase tracking-tight group-hover:text-armoyu-primary transition-colors truncate">{g.name}</span>
                                             </div>
                                          </td>
                                          <td className="px-4 py-2.5">
                                             <span className="text-[9px] font-black text-armoyu-primary uppercase italic">{g.shortName}</span>
                                          </td>
                                          <td className="px-4 py-2.5 text-right">
                                             <span className="text-[10px] font-black text-white uppercase tracking-tighter bg-white/5 px-3 py-1 rounded-full border border-white/5">{g.players.length} OYUNCU</span>
                                          </td>
                                       </tr>
                                    ))}
                                 </tbody>
                              </table>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>
         </div>

         {/* DEV SELECTION CONTROLS */}
         <div className="fixed bottom-6 right-6 z-[500] bg-black/90 border border-white/20 p-4 rounded-3xl backdrop-blur-xl shadow-2xl flex flex-col gap-3">
            <span className="text-[9px] font-black text-amber-500 uppercase tracking-widest">🛠️ GELİŞTİRİCİ TASARIM SEÇİMİ</span>
            <div className="flex gap-2">
               <button 
                  onClick={() => setActiveStyle('standard')}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'standard' ? 'bg-armoyu-primary text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                  Standart
               </button>
               <button 
                  onClick={() => setActiveStyle('tournament')}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'tournament' ? 'bg-amber-500 text-black shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                  Turnuva
               </button>
               <button 
                  onClick={() => setActiveStyle('game_special')}
                  className={`px-3 py-1.5 rounded-xl text-[9px] font-black uppercase transition-all ${activeStyle === 'game_special' ? 'bg-red-500 text-white shadow-lg' : 'bg-white/5 text-gray-400 hover:bg-white/10'}`}
               >
                  Oyuna Özel
               </button>
            </div>
         </div>
      </div>
   );
};

export default DetailPage;
