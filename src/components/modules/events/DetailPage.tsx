'use client';

import React, { useState, useEffect } from 'react';
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
   AlertCircle
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
   const { api, apiKey } = useArmoyu();
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
            <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
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
      <div className="animate-in fade-in slide-in-from-right-8 duration-700 pb-20">

         {/* Header / Back */}
         <div className="mb-10 flex flex-wrap items-center justify-between gap-4">
            <button
               onClick={onBack}
               className="flex items-center gap-2 text-armoyu-text-muted hover:text-blue-500 transition-colors group"
            >
               <div className="p-2 border border-white/5 bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
                  <ChevronLeft size={16} />
               </div>
               <span className="text-[10px] font-black uppercase tracking-widest italic opacity-60 group-hover:opacity-100">Geri Dön</span>
            </button>

            <div className="flex gap-2">
               <button className="p-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-2xl transition-all">
                  <Share2 size={18} />
               </button>
            </div>
         </div>

         <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">

            {/* Left Column: Visuals & Main Info */}
            <div className="lg:col-span-9 space-y-8">

               {/* Banner Hero */}
               <div className="relative aspect-video rounded-[40px] overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl group">
                  <img
                     src={event.image || event.thumbnail}
                     alt={event.name}
                     className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000"
                  />
                  <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent p-10">
                     <div className="flex flex-wrap items-end justify-between gap-6">
                        <div className="space-y-2">
                           <span className="px-4 py-1.5 bg-blue-600 text-white text-[9px] font-black uppercase tracking-[0.2em] rounded-full shadow-lg">
                              {event.gameName || 'Platform Etkinliği'}
                           </span>
                           <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                              {event.name}
                           </h1>
                        </div>

                        <div className="flex items-center gap-4 bg-white/10 backdrop-blur-md px-6 py-4 rounded-3xl border border-white/10 shadow-2xl">
                           <div className="text-right">
                              <span className="block text-[8px] font-black text-white/60 uppercase tracking-widest">Başlangıç</span>
                              <span className="text-lg font-black text-white uppercase tracking-tighter">{event.date}</span>
                           </div>
                           <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white">
                              <Calendar size={20} />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Quick Stats Grid */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                     { icon: <Clock />, label: 'Durum', value: event.status === 1 ? 'Aktif' : 'Tamamlandı', color: 'text-emerald-500' },
                     { icon: <Users />, label: 'Katılım', value: event.getParticipantProgress() || `${event.currentParticipants}/${event.participantLimit}`, color: 'text-blue-500' },
                     { icon: <Trophy />, label: 'Tür', value: event.type === 'bireysel' ? 'Bireysel' : 'Grup', color: 'text-purple-500' },
                     { icon: <MapPin />, label: 'Konum', value: event.location || 'Online', color: 'text-orange-500' },
                  ].map((stat, i) => (
                     <div key={i} className="bg-armoyu-card-bg p-5 rounded-[32px] border border-white/5 flex flex-col gap-3 shadow-xl">
                        <div className={`w-10 h-10 rounded-2xl bg-white/5 flex items-center justify-center ${stat.color}`}>
                           {stat.icon}
                        </div>
                        <div>
                           <span className="block text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest mb-1">{stat.label}</span>
                           <span className="text-sm font-black text-armoyu-text uppercase tracking-tighter">{stat.value}</span>
                        </div>
                     </div>
                  ))}
               </div>

               {/* Description Content */}
               <div className="bg-armoyu-card-bg rounded-[40px] p-8 md:p-12 border border-white/5 shadow-xl space-y-10">
                  <div className="space-y-6">
                     <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest italic border-l-4 border-blue-600 pl-4">ETKİNLİK <span className="text-blue-500">HAKKINDA</span></h3>
                     <div className="relative">
                        <div className={`text-armoyu-text-muted text-base leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullDescription ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                           {event.description || 'Bu etkinlik için henüz bir açıklama girilmemiş.'}
                        </div>
                        {event.description && event.description.split(/\s+/).length > 200 && (
                           <button
                              onClick={() => setShowFullDescription(!showFullDescription)}
                              className="mt-4 text-[10px] font-black text-blue-500 uppercase tracking-widest hover:text-blue-400 transition-colors"
                           >
                              {showFullDescription ? 'Daha Az Gör' : 'Devamını Gör'}
                           </button>
                        )}
                     </div>
                  </div>
               </div>

               {/* Participants Content */}
               <div className="bg-armoyu-card-bg rounded-[40px] p-8 md:p-12 border border-white/5 shadow-xl space-y-10">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black text-armoyu-text uppercase tracking-widest italic border-l-4 border-emerald-500 pl-4">ETKİNLİK <span className="text-emerald-500">KATILIMCILARI</span></h3>
                     <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-2xl border border-emerald-500/20 text-emerald-500 text-[10px] font-black uppercase tracking-widest italic">
                        <Users size={14} />
                        {participants.individuals.length + participants.groups.length} KATILIM
                     </div>
                  </div>

                  {participants.individuals.length === 0 && participants.groups.length === 0 ? (
                     <div className="py-10 text-center opacity-40">
                        <Users size={40} className="mx-auto mb-4" />
                        <p className="text-[10px] font-black uppercase tracking-widest">Henüz kimse katılmadı</p>
                     </div>
                  ) : (
                     <div className="space-y-10">
                        {/* Individuals */}
                        {participants.individuals.length > 0 && (
                           <div className="space-y-6">
                              <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Bireysel Katılımcılar</h4>
                              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                                 {participants.individuals.map((p: any) => (
                                    <div key={p.id} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-emerald-500/30 transition-all group">
                                       <img src={p.avatar} className="w-8 h-8 rounded-xl" alt="" />
                                       <div className="flex flex-col min-w-0">
                                          <span className="text-[11px] font-black text-armoyu-text uppercase tracking-tighter truncate group-hover:text-emerald-500 transition-colors">{p.name || p.username}</span>
                                          <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Oyuncu</span>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}

                        {/* Groups */}
                        {participants.groups.length > 0 && (
                           <div className="space-y-8">
                              <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Grup Katılımları</h4>
                              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8">
                                 {participants.groups.map((g: any) => (
                                    <div key={g.id} className="group relative bg-armoyu-card-bg rounded-[40px] border border-white/5 overflow-hidden shadow-2xl hover:border-blue-500/30 transition-all duration-500">
                                       {/* Team Banner */}
                                       <div className="relative h-24 overflow-hidden">
                                          {g.banner ? (
                                             <img src={g.banner} className="w-full h-full object-cover opacity-40 group-hover:scale-110 transition-transform duration-700" alt="" />
                                          ) : (
                                             <div className="w-full h-full bg-gradient-to-r from-blue-600/20 to-indigo-600/20" />
                                          )}
                                          <div className="absolute inset-0 bg-gradient-to-t from-armoyu-card-bg to-transparent" />
                                       </div>

                                       {/* Team Info Overlay */}
                                       <div className="relative px-6 -mt-10 mb-4 flex items-end gap-3">
                                          <div className="w-16 h-16 rounded-[22px] bg-armoyu-card-bg p-1 border border-white/10 shadow-xl shrink-0">
                                             <img src={g.logo} className="w-full h-full object-cover rounded-[18px]" alt="" />
                                          </div>
                                          <div className="pb-1">
                                             <h5 className="text-[15px] font-black text-white uppercase italic tracking-tighter leading-none truncate max-w-[150px]">{g.name}</h5>
                                             <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest italic">{g.shortName}</span>
                                          </div>
                                       </div>

                                       {/* Players "Table" */}
                                       <div className="px-5 pb-6">
                                          <div className="bg-black/20 rounded-[32px] border border-white/5 overflow-hidden">
                                             <table className="w-full text-left">
                                                <thead>
                                                   <tr className="border-b border-white/5 bg-white/5">
                                                      <th className="px-4 py-3 text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Oyuncu</th>
                                                      <th className="px-4 py-3 text-right text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic">Rol</th>
                                                   </tr>
                                                </thead>
                                                <tbody className="divide-y divide-white/5">
                                                   {g.players.map((p: any) => (
                                                      <tr key={p.id} className="hover:bg-white/5 transition-colors">
                                                         <td className="px-4 py-3">
                                                            <div className="flex items-center gap-3">
                                                               <img src={p.avatar} className="w-7 h-7 rounded-lg border border-white/10" alt="" />
                                                               <span className="text-[10px] font-bold text-white/80 uppercase tracking-tighter">{p.name}</span>
                                                            </div>
                                                         </td>
                                                         <td className="px-4 py-3 text-right">
                                                            <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest italic opacity-60">
                                                               {p.role || 'Oyuncu'}
                                                            </span>
                                                         </td>
                                                      </tr>
                                                   ))}
                                                </tbody>
                                             </table>
                                          </div>
                                       </div>
                                    </div>
                                 ))}
                              </div>
                           </div>
                        )}
                     </div>
                  )}
               </div>
            </div>

            {/* Right Column: Interaction Sidebar */}
            <div className="lg:col-span-3 space-y-8 sticky top-8">

               {/* Join Widget */}
               <div className="bg-armoyu-card-bg rounded-[40px] p-8 border border-white/5 shadow-2xl relative overflow-hidden group">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 blur-[80px] -mr-10 -mt-10 group-hover:bg-blue-600/20 transition-all duration-700"></div>

                  <div className="relative z-10 space-y-8">
                     <div className="space-y-2">
                        <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Kontenjan Durumu</span>
                        <div className="flex items-end justify-between">
                           <h4 className="text-4xl font-black text-armoyu-text uppercase tracking-tighter italic">
                              {event.getParticipantProgress() || `${event.currentParticipants}/${event.participantLimit}`}
                           </h4>
                           <span className={`text-[11px] font-black uppercase tracking-widest ${event.hasSpace() ? 'text-emerald-500' : 'text-red-500'}`}>
                              {event.hasSpace() ? 'YER VAR' : 'DOLU'}
                           </span>
                        </div>
                        {/* Progress Bar */}
                        <div className="h-3 w-full bg-black/20 rounded-full overflow-hidden border border-white/5 p-0.5">
                           <div
                              className="h-full bg-blue-600 rounded-full shadow-[0_0_10px_rgba(37,99,235,0.4)] transition-all duration-1000"
                              style={{ width: `${progressPercentage}%` }}
                           />
                        </div>
                     </div>

                     <button className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-[0_20px_40px_rgba(37,99,235,0.3)] active:scale-95 flex items-center justify-center gap-3">
                        <ShieldCheck size={18} strokeWidth={2.5} />
                        Hemen Katıl
                     </button>

                     <p className="text-[9px] text-center text-armoyu-text-muted font-bold uppercase tracking-widest opacity-40 leading-relaxed">
                        Etkinliğe katılarak platform kurallarını ve şartlarını kabul etmiş sayılırsınız.
                     </p>
                  </div>
               </div>

               {/* Organizers Widget */}
               <div className="bg-armoyu-card-bg rounded-[40px] p-8 border border-white/5 shadow-xl space-y-6">
                  <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Düzenleyenler</h4>
                  <div className="space-y-4">
                     {event.organizers && event.organizers.length > 0 ? event.organizers.map((organizer: any) => (
                        <div key={organizer.id} className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group">
                           <img src={organizer.avatar} className="w-10 h-10 rounded-xl" alt="" />
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-armoyu-text uppercase tracking-tighter group-hover:text-blue-500 transition-colors">{organizer.displayName}</span>
                              <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">Moderatör</span>
                           </div>
                        </div>
                     )) : (
                        <div className="flex items-center gap-4 p-3 bg-white/5 rounded-2xl border border-white/5">
                           <div className="w-10 h-10 rounded-xl bg-blue-600/10 flex items-center justify-center text-blue-500">
                              <Gamepad2 size={20} />
                           </div>
                           <div className="flex flex-col">
                              <span className="text-sm font-black text-armoyu-text uppercase tracking-tighter">Platform Ekibi</span>
                              <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">ARMOYU</span>
                           </div>
                        </div>
                     )}
                  </div>
               </div>

               {/* Rules Widget */}
               <div className="bg-armoyu-card-bg rounded-[40px] p-8 border border-white/5 shadow-xl space-y-6">
                  <h3 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60 italic border-l-4 border-red-600 pl-3">Kurallar & Şartlar</h3>
                  <div className="relative">
                     <div className={`text-armoyu-text-muted text-xs leading-relaxed font-medium opacity-80 whitespace-pre-wrap transition-all duration-500 ${!showFullRules ? 'max-h-[150px] overflow-hidden mask-fade-bottom' : 'max-h-[5000px]'}`}>
                        {event.rules || 'Genel platform kuralları geçerlidir.'}
                     </div>
                     {event.rules && event.rules.split(/\s+/).length > 200 && (
                        <button
                           onClick={() => setShowFullRules(!showFullRules)}
                           className="mt-4 text-[9px] font-black text-red-500 uppercase tracking-widest hover:text-red-400 transition-colors"
                        >
                           {showFullRules ? 'Daha Az Gör' : 'Devamını Gör'}
                        </button>
                     )}
                  </div>
               </div>

            </div>

         </div>
      </div>
   );
}
