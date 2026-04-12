'use client';

import React, { useState } from 'react';
import { Group, User } from '@armoyu/core';
import Link from 'next/link';
import {
   Calendar,
   Plus,
   Settings,
   Trash2,
   Edit3,
   Clock,
   MapPin,
   ChevronRight,
   ShieldCheck,
   X,
   Save,
   CheckCircle2
} from 'lucide-react';

// Dahili Aktarımlar
import { PageWidth } from '../../shared/PageWidth';
import { PostCard } from '../auth/PostCard';
import { GroupMenu } from './GroupMenu';
import { GroupHeader } from './GroupHeader';
import { useAuth } from '../../../context/AuthContext';
import { userList, postList, groupList, eventList } from '../../../lib/constants/seedData';

interface GroupProfileContentProps {
   groupId: string;
}

export function GroupProfileContent({ groupId }: GroupProfileContentProps) {
   const { user, updateUser } = useAuth();
   const normalizedGroupId = groupId?.toLowerCase() || '';

   // Find group by slug or name and ensuring it's a Group instance
   const groupRaw = groupList.find((g: any) =>
      g.slug === normalizedGroupId ||
      g.name.toLowerCase() === normalizedGroupId ||
      g.name.toLowerCase().replace(/\\s+/g, '-') === normalizedGroupId
   );

   const initialGroup = groupRaw ? (groupRaw instanceof Group ? groupRaw : new Group(groupRaw)) : null;
   const [group, setGroup] = useState<Group | null>(initialGroup);
   const [localEvents, setLocalEvents] = useState<any[]>(eventList.slice(0, 3));

   // Local membership state
   const initialIsMember = user && initialGroup ? initialGroup.members.some(m => m.username === user.username) : false;
   const [isMember, setIsMember] = useState(initialIsMember);

   // Group Admin Check (Leader or Admin)
   const isGroupAdmin = user && initialGroup && (
      initialGroup.owner?.displayName === user.displayName ||
      initialGroup.members.some(m => m.username === user.username && (m.role?.id === 'admin' || m.role?.id === 'member_mgmt'))
   );

   // Modal States
   const [isEventModalOpen, setIsEventModalOpen] = useState(false);
   const [editingEvent, setEditingEvent] = useState<any>(null);

   if (!group) {
      return (
         <div className="flex flex-col items-center justify-center min-h-[60vh] bg-armoyu-bg text-armoyu-text">
            <h2 className="text-2xl font-bold mb-4 uppercase italic tracking-tighter">Grup bulunamadı</h2>
            <Link href="/gruplar" className="text-blue-500 hover:underline uppercase italic font-black text-sm tracking-widest">Gruplara geri dön</Link>
         </div>
      );
   }

   const handleJoin = () => {
      if (!user) {
         alert('Lütfen önce giriş yapın!');
         return;
      }
      setIsMember(true);
      group.members.push(user);
      group.memberCount = group.members.length;
      setGroup(new Group(group));
      const updatedUser = new User({ ...user });
      updatedUser.groups = [...(updatedUser.groups || []), {
         name: group.name,
         shortName: group.shortName,
         logo: group.logo,
         role: 'Üye'
      }];
      updateUser(updatedUser);
   };

   const handleLeave = () => {
      if (!confirm('Gruptan ayrılmak istediğinize emin misiniz?')) return;
      setIsMember(false);
      group.members = group.members.filter(m => m.username !== user?.username);
      group.memberCount = group.members.length;
      setGroup(new Group(group));
      if (user) {
         const updatedUser = new User({ ...user });
         updatedUser.groups = updatedUser.groups?.filter(g => g.name !== group.name);
         updateUser(updatedUser);
      }
   };

   const handleEventSave = (e: React.FormEvent) => {
      e.preventDefault();
      const formData = new FormData(e.target as HTMLFormElement);
      const eventData = {
         id: editingEvent?.id || `EVT-${Math.random().toString(36).substr(2, 5).toUpperCase()}`,
         title: formData.get('title') as string,
         date: formData.get('date') as string,
         time: formData.get('time') as string,
         game: formData.get('game') as string,
         participants: editingEvent?.participants || 1,
         maxParticipants: 50,
         image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=800&auto=format&fit=crop'
      };

      if (editingEvent) {
         setLocalEvents((prev: any[]) => prev.map((ev: any) => ev.id === editingEvent.id ? eventData : ev));
      } else {
         setLocalEvents((prev: any[]) => [eventData, ...prev]);
      }
      setIsEventModalOpen(false);
      setEditingEvent(null);
   };

   const groupPosts = postList.filter((p: any) =>
      p.hashtags?.some((h: string) => h.toLowerCase() === group.name.toLowerCase() || h.toLowerCase() === group.shortName.toLowerCase())
   );

   const stats = {
      members: group.memberCount || group.members.length,
      online: Math.floor((group.memberCount || group.members.length) * 0.15),
      posts: groupPosts.length + Math.floor(Math.random() * 50),
      founded: group.date?.split('.')?.[2] || '2024'
   };

   return (
      <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 relative text-left leading-none">
         <PageWidth width="max-w-[1440px]" />

         {/* Event Management Modal */}
         {isEventModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 sm:p-0">
               <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsEventModalOpen(false)} />
               <form onSubmit={handleEventSave} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
                  <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                           <Calendar size={24} />
                        </div>
                        <div>
                           <h3 className="text-xl font-black text-armoyu-text uppercase italic tracking-tighter">
                              {editingEvent ? 'ETKİNLİĞİ DÜZENLE' : 'YENİ ETKİNLİK'}
                           </h3>
                           <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">Grup içi aktivite planla</p>
                        </div>
                     </div>
                     <button type="button" onClick={() => setIsEventModalOpen(false)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                        <X size={20} />
                     </button>
                  </div>
                  <div className="p-8 space-y-6">
                     <div className="space-y-2">
                        <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">BAŞLIK</label>
                        <input name="title" required defaultValue={editingEvent?.title} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: Haftalık Turnuva" />
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">OYUN</label>
                           <input name="game" required defaultValue={editingEvent?.game} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: Minecraft" />
                        </div>
                        <div className="space-y-2">
                           <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1 italic">TARİH</label>
                           <input name="date" required defaultValue={editingEvent?.date} className="w-full bg-black/5 border border-armoyu-card-border rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:border-blue-500 transition-all italic" placeholder="Örn: 24.04.2024" />
                        </div>
                     </div>
                     <button type="submit" className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic">
                        <Save size={18} /> {editingEvent ? 'DEĞİŞİKLİKLERİ KAYDET' : 'ETKİNLİĞİ OLUŞTUR'}
                     </button>
                  </div>
               </form>
            </div>
         )}

         {/* Reusable Group Header */}
         <GroupHeader
            group={group as unknown as any}
            isMember={isMember}
            onJoin={handleJoin}
            onLeave={handleLeave}
            onReport={() => alert('Şikayet iletildi.')}
         />

         <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">

            {/* Main Content */}
            <div className="xl:col-span-3 space-y-12">

               {/* Stats Row */}
               <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {[
                     { label: 'ÜYELER', value: stats.members, icon: 'users' },
                     { label: 'AKTİF', value: stats.online, icon: 'activity', color: 'text-emerald-500' },
                     { label: 'PAYLAŞIM', value: stats.posts, icon: 'edit-3' },
                     { label: 'KURULUŞ', value: stats.founded, icon: 'calendar' }
                  ].map((stat, idx) => (
                     <div key={idx} className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg text-center">
                        <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-2 leading-none">{stat.label}</p>
                        <p className={`text-2xl font-black leading-none ${stat.color || 'text-armoyu-text'}`}>{stat.value}</p>
                     </div>
                  ))}
               </div>

               {/* Description */}
               <div className="glass-panel p-10 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg">
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight mb-6 italic">GRUP HAKKINDA</h3>
                  <p className="text-armoyu-text-muted text-lg leading-relaxed font-medium">
                     {group.description || 'Grup açıklaması henüz eklenmemiş.'}
                  </p>
               </div>

               {/* Events Section */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP ETKİNLİKLERİ</h3>
                     {isGroupAdmin && (
                        <button
                           onClick={() => { setEditingEvent(null); setIsEventModalOpen(true); }}
                           className="flex items-center gap-2 px-6 py-3 bg-blue-600/10 hover:bg-blue-600 text-blue-500 hover:text-white rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest italic"
                        >
                           <Plus size={16} /> ETKİNLİK OLUŞTUR
                        </button>
                     )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     {localEvents.map((event: any) => (
                        <div key={event.id} className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group relative overflow-hidden">
                           <div className="flex items-start justify-between mb-4">
                              <div className={`px-3 py-1 bg-blue-600/10 text-blue-500 rounded-lg text-[9px] font-black uppercase tracking-widest italic`}>
                                 {event.game}
                              </div>
                              {isGroupAdmin && (
                                 <div className="flex gap-1">
                                    <button onClick={() => { setEditingEvent(event); setIsEventModalOpen(true); }} className="p-2 text-armoyu-text-muted hover:text-amber-500 transition-colors bg-white/5 rounded-lg">
                                       <Edit3 size={14} />
                                    </button>
                                    <button onClick={() => setLocalEvents((prev: any[]) => prev.filter((e: any) => e.id !== event.id))} className="p-2 text-armoyu-text-muted hover:text-red-500 transition-colors bg-white/5 rounded-lg">
                                       <Trash2 size={14} />
                                    </button>
                                 </div>
                              )}
                           </div>
                           <h4 className="text-lg font-black text-armoyu-text mb-4 uppercase italic leading-tight">{event.title}</h4>
                           <div className="space-y-2 mb-6">
                              <div className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted italic uppercase leading-none">
                                 <Calendar size={14} className="text-blue-500" /> {event.date}
                              </div>
                              <div className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted italic uppercase leading-none">
                                 <Clock size={14} className="text-blue-500" /> {event.time}
                              </div>
                           </div>
                           <Link href={`/etkinlikler/${event.id}`} className="w-full py-4 bg-white/5 hover:bg-white/10 rounded-2xl flex items-center justify-center gap-2 text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-text transition-all uppercase tracking-widest italic">
                              DETAYLARI GÖR <ChevronRight size={14} />
                           </Link>
                        </div>
                     ))}
                  </div>
               </div>

               {/* Feed Section */}
               <div className="space-y-8">
                  <div className="flex items-center justify-between">
                     <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">GRUP PAYLAŞIMLARI</h3>
                  </div>

                  {isMember && user && (
                     <div className="glass-panel p-6 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                        <div className="flex gap-5 items-center leading-none">
                           <img src={user.avatar} className="w-14 h-14 rounded-2xl border-2 border-blue-500/20 object-cover" />
                           <div className="flex-1 relative group">
                              <input type="text" placeholder={`${group.name} grubunda neler oluyor?`} className="w-full bg-black/5 dark:bg-white/5 border border-black/5 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:ring-2 focus:ring-blue-500/20 transition-all font-bold italic" />
                           </div>
                        </div>
                        <div className="flex justify-between items-center mt-6 pt-6 border-t border-black/5 leading-none">
                           <div className="flex gap-4">
                              <button className="text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 italic uppercase">MEDYA EKLE</button>
                           </div>
                           <button className="px-10 py-3 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all italic">PAYLAŞ</button>
                        </div>
                     </div>
                  )}

                  <div className="space-y-6">
                     {groupPosts.map((post: any) => (
                        <PostCard key={post.id} {...post} />
                     ))}
                     {groupPosts.length === 0 && (
                        <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-[40px] border border-dashed border-armoyu-card-border">
                           <p className="text-armoyu-text-muted font-bold opacity-60 uppercase tracking-widest text-[10px] italic">Henüz bu grupta paylaşım yapılmamış.</p>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-10">
               {isMember && user && (
                  <div className="xl:col-span-1 py-2">
                     <GroupMenu group={group as any} user={user as any} onLeave={handleLeave} />
                  </div>
               )}

               {/* Top Members */}
               <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
                  <div className="flex items-center justify-between mb-8 leading-none">
                     <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-widest italic leading-none">ÖNE ÇIKAN ÜYELER</h4>
                     <Link href={`${group.getGroupUrl()}/uyeler`} className="text-[10px] font-black text-blue-500 uppercase hover:underline leading-none">TÜMÜ</Link>
                  </div>
                  <div className="space-y-6">
                     {(group.members || []).slice(0, 10).map((member: any, idx: number) => (
                        <Link key={idx} href={`/oyuncular/${member.username}`} className="flex items-center gap-4 group cursor-pointer transition-all">
                           <img src={member.avatar} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-105 transition-transform object-cover shadow-lg" alt="Avatar" />
                           <div>
                              <p className="text-sm font-black text-armoyu-text mb-1 group-hover:text-blue-500 transition-colors uppercase italic leading-none">{member.displayName}</p>
                              <p className={`text-[9px] font-bold uppercase tracking-widest leading-none ${idx === 0 ? 'text-blue-500' : 'text-armoyu-text-muted'}`}>{member.role?.name || 'Üye'}</p>
                           </div>
                        </Link>
                     ))}
                  </div>
               </div>

               {/* Group Permissions */}
               <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg leading-none">
                  <h4 className="text-[11px] font-black text-armoyu-text mb-8 uppercase tracking-widest italic">GRUP YETKİLERİ</h4>
                  <div className="space-y-3">
                     {(group.permissions || []).map((perm: string, idx: number) => (
                        <div key={idx} className="flex items-center gap-3 p-3 rounded-2xl bg-black/5 border border-white/5">
                           <ShieldCheck size={14} className="text-blue-500" />
                           <span className="text-[10px] font-black text-armoyu-text uppercase tracking-wider italic">{perm.replace(/_/g, ' ')}</span>
                        </div>
                     ))}
                     {(group.permissions?.length || 0) === 0 && (
                        <p className="text-[10px] text-armoyu-text-muted italic opacity-60 font-bold uppercase tracking-widest">Özel yetki tanımlanmamış.</p>
                     )}
                  </div>
               </div>
            </div>

         </div>
      </div>
   );
}
