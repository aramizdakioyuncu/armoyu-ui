'use client';

import React, { useState } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { schoolList } from '../../../../lib/constants/seedData';
import { Users, GraduationCap, Trophy, LayoutDashboard, ShieldCheck, Users2, Swords, MessageSquare, ChevronRight, Lock } from 'lucide-react';

interface SchoolDetailPageProps {
  slug: string;
}

export function SchoolDetailPage({ slug }: SchoolDetailPageProps) {
  const school = (schoolList || []).find((s: any) => s.slug === slug);
  const [activeTab, setActiveTab ] = useState<'Genel' | 'Takımlar' | 'Sınıflar' | 'Akış'>('Genel');

  if (!school) {
    return (
       <div className="py-20 text-center animate-in fade-in duration-500">
          <GraduationCap size={64} className="mx-auto text-armoyu-text-muted/20 mb-8" />
          <h1 className="text-4xl font-black text-armoyu-text uppercase tracking-tighter italic">OKUL BULUNAMADI</h1>
          <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest mt-4">Aradığınız okul sistemlerimizde kayıtlı değil.</p>
       </div>
    );
  }

  return (
    <div className="pb-32 animate-in fade-in duration-700 bg-armoyu-bg min-h-screen">
       {/* Hero Section */}
       <div className="relative h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-blue-600/10" />
          {school.background && <img src={school.background} className="w-full h-full object-cover opacity-40" alt="Cover" />}
          <div className="absolute inset-0 bg-gradient-to-t from-armoyu-bg via-armoyu-bg/80 to-transparent" />
          
          <div className="absolute bottom-0 left-0 w-full p-8 md:p-16">
             <div className="max-w-[1280px] mx-auto flex flex-col md:flex-row items-end gap-10">
                <div className="relative group">
                   <div className="w-40 h-40 rounded-[40px] bg-white dark:bg-zinc-900 border-8 border-armoyu-bg overflow-hidden shadow-2xl relative z-10 group-hover:scale-105 transition-all duration-500">
                      <img src={school.logo} className="w-full h-full object-contain p-4" alt={school.name} />
                   </div>
                   <div className="absolute -bottom-4 -right-4 w-12 h-12 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-xl border-4 border-armoyu-bg z-20">
                      <ShieldCheck size={24} />
                   </div>
                </div>

                <div className="flex-1 space-y-4 pb-4">
                   <div className="flex items-center gap-3">
                      <span className="px-3 py-1 bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-lg border border-blue-500/20">RESMİ ÜNİVERSİTE</span>
                   </div>
                   <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none drop-shadow-2xl">
                      {school.name}
                   </h1>
                   <div className="flex flex-wrap items-center gap-6 text-armoyu-text-muted">
                      <div className="flex items-center gap-2">
                         <Users size={18} className="text-blue-500" />
                         <span className="text-sm font-black uppercase tracking-widest">{school.memberCount} ÜYE</span>
                      </div>
                      <div className="flex items-center gap-2 border-l border-armoyu-card-border pl-6">
                         <GraduationCap size={18} className="text-blue-500" />
                         <span className="text-sm font-black uppercase tracking-widest">{(school.faculties || []).length} FAKÜLTE</span>
                      </div>
                   </div>
                </div>

                <div className="flex gap-4 pb-4">
                   <button className="px-10 py-5 bg-blue-600 text-white rounded-[30px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-blue-500/30 hover:scale-105 active:scale-95 transition-all">
                      OKULA KATIL
                   </button>
                </div>
             </div>
          </div>
       </div>

       <PageWidth width="max-w-[1280px]" />
       
       <div className="max-w-[1280px] mx-auto px-6 md:px-12 mt-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
             
             {/* Left Column - Navigation */}
             <div className="lg:col-span-3 space-y-8">
                <div className="space-y-2">
                   {[
                      { id: 'Genel', icon: LayoutDashboard },
                      { id: 'Takımlar', icon: Trophy },
                      { id: 'Sınıflar', icon: Users2 },
                      { id: 'Akış', icon: MessageSquare }
                   ].map((tab) => (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-white dark:bg-white/10 text-armoyu-text shadow-xl border border-armoyu-card-border' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                      >
                         <div className="flex items-center gap-3">
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-blue-500' : ''} />
                            {tab.id}
                         </div>
                         {activeTab === tab.id && <ChevronRight size={14} className="text-blue-500" />}
                      </button>
                   ))}
                </div>

                <div className="pt-8 border-t border-armoyu-card-border space-y-6">
                   <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                      <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                         <ShieldCheck size={14} /> Temsilci
                      </h4>
                      <div className="flex items-center gap-3 mb-6">
                         <img src={school.representative?.avatar} className="w-12 h-12 rounded-xl object-cover ring-2 ring-blue-500/20" alt="Rep" />
                         <div>
                            <div className="text-[11px] font-black text-armoyu-text uppercase">{school.representative?.displayName}</div>
                            <div className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest">Okul Temsilcisi</div>
                         </div>
                      </div>
                      <button className="w-full py-3 bg-black/5 dark:bg-white/5 rounded-2xl text-[9px] font-black uppercase tracking-widest hover:bg-black/10 transition-all border border-armoyu-card-border">
                         MESAJ GÖNDER
                      </button>
                   </div>
                </div>
             </div>

             {/* Right Column - Content */}
             <div className="lg:col-span-9 space-y-12">
                
                {activeTab === 'Genel' && (
                   <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                         <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl overflow-hidden relative group">
                            <div className="relative z-10">
                               <div className="w-16 h-16 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500 mb-8 group-hover:scale-110 transition-transform">
                                  <Trophy size={32} />
                               </div>
                               <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4">TAKIMLAR</h3>
                               <p className="text-xs font-medium text-armoyu-text-muted uppercase tracking-widest leading-relaxed mb-8">
                                  Okulunu spor ve e-spor arenalarında temsil eden takımlarımız.
                                </p>
                               <div className="flex flex-wrap gap-2">
                                  {(school.teams || []).map((t: any, i: number) => (
                                     <div key={i} className="px-4 py-2 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border text-[9px] font-black uppercase tracking-widest text-armoyu-text">
                                        {t.gameOrSport}
                                     </div>
                                  ))}
                               </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-purple-500/5 blur-[50px] rounded-full" />
                         </div>

                         <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl overflow-hidden relative group">
                            <div className="relative z-10">
                               <div className="w-16 h-16 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                                  <Users2 size={32} />
                               </div>
                               <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4">SINIFLAR</h3>
                               <p className="text-xs font-medium text-armoyu-text-muted uppercase tracking-widest leading-relaxed mb-8">
                                  Akademik konularda yardımlaşabileceğin çalışma sınıfları.
                               </p>
                                <div className="space-y-3">
                                   {(school.classrooms || []).slice(0, 2).map((c: any, i: number) => (
                                      <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border">
                                         <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                                               <Users2 size={14} />
                                            </div>
                                            <span className="text-[10px] font-black uppercase text-armoyu-text">{c.name}</span>
                                         </div>
                                         {c.password && <Lock size={12} className="text-armoyu-text-muted opacity-50" />}
                                      </div>
                                   ))}
                                </div>
                            </div>
                            <div className="absolute -bottom-10 -right-10 w-48 h-48 bg-emerald-500/5 blur-[50px] rounded-full" />
                         </div>
                      </div>

                      <div className="space-y-8">
                         <div className="flex items-center justify-between">
                            <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-[0.4em] italic flex items-center gap-3">
                               <div className="w-8 h-1 bg-blue-500/30 rounded-full" /> KAYITLI FAKÜLTELER
                            </h4>
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {(school.faculties || []).map((f: any) => (
                               <div key={f.id} className="flex items-center gap-4 p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border hover:bg-black/10 transition-all group">
                                  <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 group-hover:scale-110 transition-transform">
                                     <GraduationCap size={24} />
                                  </div>
                                  <div className="flex-1">
                                     <div className="text-[11px] font-black text-armoyu-text uppercase">{f.name}</div>
                                     <div className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Temsilci: {f.representative?.displayName}</div>
                                  </div>
                                  <ChevronRight size={18} className="text-armoyu-text-muted opacity-30 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                               </div>
                            ))}
                         </div>
                      </div>
                   </div>
                )}

                {activeTab === 'Takımlar' && (
                   <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                         {(school.teams || []).map((team: any) => (
                            <div key={team.id} className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl group hover:border-purple-500/50 transition-all">
                               <div className="flex items-start justify-between mb-8">
                                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-zinc-900 border border-armoyu-bg flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                                      <Swords size={32} className="text-purple-500" />
                                  </div>
                                  <div className={`px-4 py-1.5 rounded-full text-[9px] font-black italic uppercase tracking-widest ${team.type === 'ESPORTS' ? 'bg-purple-500/10 text-purple-500' : 'bg-orange-500/10 text-orange-500'}`}>
                                     {team.type === 'ESPORTS' ? 'E-SPOR TAKIMI' : 'SPORTİF TAKIM'}
                                  </div>
                               </div>
                               <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic mb-2">{team.name}</h3>
                               <p className="text-[11px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] mb-8">{team.gameOrSport}</p>
                               
                               <div className="flex items-center justify-between pt-6 border-t border-armoyu-card-border">
                                  <div className="flex -space-x-3">
                                     {[1,2,3,4,5].map((i) => (
                                        <img key={i} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${team.id}${i}`} className="w-8 h-8 rounded-full border-2 border-armoyu-bg" alt="P" />
                                     ))}
                                  </div>
                                  <button className="text-[10px] font-black text-purple-500 uppercase tracking-widest flex items-center gap-2 hover:translate-x-1 transition-transform">
                                     TAKIMA GÖZ AT <ChevronRight size={14} />
                                  </button>
                               </div>
                            </div>
                         ))}
                      </div>
                   </div>
                )}

                {activeTab === 'Sınıflar' && (
                   <div className="space-y-8 animate-in fade-in slide-in-from-bottom-2 duration-500">
                      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                         {(school.classrooms || []).map((classroom: any) => (
                             <div key={classroom.id} className="p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:bg-emerald-500/5 transition-all group">
                                <div className="flex items-center justify-between mb-8">
                                   <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform duration-500">
                                      <Users2 size={24} />
                                   </div>
                                   {classroom.password && (
                                      <div className="px-4 py-2 rounded-xl bg-amber-500/10 text-amber-500 flex items-center gap-2">
                                         <Lock size={12} />
                                         <span className="text-[9px] font-black uppercase tracking-widest">ŞİFRELİ</span>
                                      </div>
                                   )}
                                </div>
                                <h4 className="text-lg font-black text-armoyu-text uppercase tracking-tight italic mb-2">{classroom.name}</h4>
                                <div className="flex items-center gap-2 mb-8">
                                   <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] border-r border-armoyu-card-border pr-2">TEACHER: {classroom.teacher?.displayName}</div>
                                   <div className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-[0.2em]">{classroom.members?.length || 0} ÖĞRENCİ</div>
                                </div>
                                <button className="w-full py-4 rounded-[20px] bg-emerald-500 text-white font-black text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-500/20 active:scale-95 transition-all">
                                   SINIF PORTALINA GİR
                                </button>
                             </div>
                         ))}
                      </div>
                   </div>
                )}
                
                {activeTab === 'Akış' && (
                   <div className="py-32 text-center glass-panel rounded-[60px] border border-armoyu-card-border bg-white overflow-hidden relative">
                      <div className="relative z-10">
                         <MessageSquare size={64} className="mx-auto text-armoyu-text-muted/20 mb-8" />
                         <h3 className="text-3xl font-black text-armoyu-text mb-4 uppercase italic">Okul Akışı</h3>
                         <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Okulunuza özel sosyal akış yakında burada olacak.</p>
                      </div>
                      <div className="absolute inset-0 bg-blue-500/5 blur-[100px] -z-0 rounded-full" />
                   </div>
                )}

             </div>
          </div>
       </div>
    </div>
  );
}
