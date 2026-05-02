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
   List
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

   return (
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700 pb-10">
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

         <div className="mx-auto px-4 space-y-8">
            {/* HERO SECTION - COMPACT */}
            <div className="relative aspect-[21/8] md:aspect-[21/6] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl group">
               <img
                  src={event.image || event.thumbnail}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  alt={event.name}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
               
               {/* Hero Overlay Content - MINIMAL PADDING */}
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

            {/* QUICK STATS & JOIN - COMPACT */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
               <div className="lg:col-span-3 grid grid-cols-2 md:grid-cols-4 gap-3">
                  {[
                     { icon: <Clock />, label: 'Durum', value: event.status === 1 ? 'Aktif' : 'Tamamlandı', color: 'text-emerald-500' },
                     { icon: <Users />, label: 'Katılım', value: event.getParticipantProgress(), color: 'text-armoyu-primary' },
                     { icon: <Trophy />, label: 'Tür', value: event.type === 'bireysel' ? 'Bireysel' : 'Grup', color: 'text-purple-500' },
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
                     <button className="w-full py-3 bg-armoyu-primary hover:bg-armoyu-primary text-white rounded-xl font-black text-[10px] uppercase tracking-[0.2em] transition-all shadow-lg active:scale-95 flex items-center justify-center gap-2 relative z-10">
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

            {/* Organizers Section - COMPACT */}
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

            {/* Info Sections - COMPACT */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {/* Description */}
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

               {/* Rules */}
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

            {/* Participants - COMPACT */}
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
      </div>
   );
};

export default DetailPage;
