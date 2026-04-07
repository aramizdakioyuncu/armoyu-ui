'use client';

import React, { useState, useEffect } from 'react';
import { PostCard } from '../auth/PostCard';
import { CloudStorageModal } from './CloudStorageModal';
import { X, Calendar, Plus, Edit3, Trash2, Shield, Sparkles } from 'lucide-react';
import { User } from '@armoyu/core';
import { TeamSelectorModal } from './TeamSelectorModal';
import { Team } from '@armoyu/core';
import { ZODIAC_SIGNS } from '../../../lib/constants/teamData';
import { useAuth } from '../../../context/AuthContext';

export function ProfileContent({ user }: { user?: User }) {
  const { user: currentUser, updateUser } = useAuth();
  const [activeTab, setActiveTab] = useState('Kariyer');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [showTeamBanner, setShowTeamBanner] = useState(false);

  // Use currentUser from context if it's our own profile to ensure reactivity
  const isOwnProfile = currentUser?.username === user?.username;
  const displayUser = isOwnProfile ? currentUser : user;
  const [tempBio, setTempBio] = useState(displayUser?.bio || '');

  useEffect(() => {
    // Show banner only on own profile and if team is missing and not dismissed
    if (isOwnProfile && !displayUser?.favoriteTeam) {
      const dismissed = localStorage.getItem(`team_prompt_dismissed_${displayUser?.id}`);
      if (!dismissed) {
        setShowTeamBanner(true);
      }
    }
  }, [isOwnProfile, user]);

  const handleTeamSelect = (team: Team | null, zodiac: string) => {
    if (displayUser) {
      if (isOwnProfile && currentUser) {
        updateUser({
          ...currentUser,
          favoriteTeam: team,
          zodiac: zodiac
        } as any);
      }
    }
    setIsTeamModalOpen(false);
    setShowTeamBanner(false);
    localStorage.setItem(`team_prompt_dismissed_${displayUser?.id}`, 'true');
  };

  const handleBioSave = () => {
    if (isOwnProfile && currentUser) {
      updateUser({
        ...currentUser,
        bio: tempBio
      } as any);
      setIsBioModalOpen(false);
    }
  };

  const userZodiac = ZODIAC_SIGNS.find(s => s.name === displayUser?.zodiac);

  const tabs = ['Gönderiler', 'Hakkında', 'Kariyer', 'Oynadığı Oyunlar', 'Arkadaşlar'];

  const mockCareerEvents = displayUser?.career?.length ? displayUser.career : [
    { id: '1', date: '12.03.2018', title: 'ARMOYU Ailesine Katıldı', description: 'Platformdaki ilk adımlarını attı.', type: 'JOIN' },
    { id: '2', date: '05.06.2020', title: 'Yayıncı Rütbesi Aldı', description: 'Oyun yayınlarına ve içerik üretimine başladı.', type: 'RANK' },
    { id: '3', date: '15.01.2022', title: 'RIHTIM Grubunu Kurdu', description: 'Kendi topluluğunu oluşturarak liderlik yolculuğuna başladı.', type: 'GROUP' },
    { id: '4', date: '01.04.2024', title: 'V3 Beta Testçisi', description: 'Yeni nesil platformun gelişimine katkıda bulundu.', type: 'AWARD' },
  ];

  return (
    <div className="w-full flex flex-col lg:flex-row gap-6 mt-6">

      {/* Sol Panel: Hakkında Özeti */}
      <div className="w-full lg:w-80 shrink-0 space-y-6">
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-black text-armoyu-text">Hakkında</h3>
            {isOwnProfile && (
              <button
                onClick={() => {
                  setTempBio(displayUser?.bio || '');
                  setIsBioModalOpen(true);
                }}
                className="p-2 text-armoyu-text-muted hover:text-blue-500 bg-black/5 hover:bg-blue-500/10 rounded-xl transition-all"
                title="Hakkında Yazısını Düzenle"
              >
                <Edit3 size={14} />
              </button>
            )}
          </div>
          <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-6">
            {displayUser?.bio || 'Bu kullanıcı henüz hakkında bir bilgi eklememiş.'}
          </p>

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Konum</div>
                <div className="text-sm font-bold text-armoyu-text">İstanbul, Türkiye</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Katılım Tarihi</div>
                <div className="text-sm font-bold text-armoyu-text">Ağustos 2018</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line></svg>
              </div>
              <div>
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Ana Platform</div>
                <div className="text-sm font-bold text-armoyu-text">PC (Steam)</div>
              </div>
            </div>

            {displayUser?.zodiac ? (
              <div className="flex items-center justify-between group/item">
                <div className="flex items-center gap-3 animate-in slide-in-from-left duration-500">
                  <div className="w-8 h-8 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 text-lg">
                    {userZodiac?.icon || '✨'}
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Burç</div>
                    <div className="text-sm font-bold text-armoyu-text">{displayUser.zodiac}</div>
                  </div>
                </div>
                {isOwnProfile && (
                  <button onClick={() => setIsTeamModalOpen(true)} className="p-2 text-armoyu-text-muted hover:text-blue-500 opacity-0 group-hover/item:opacity-100 transition-all bg-black/5 rounded-lg mr-1" title="Burcu Değiştir">
                    <Edit3 size={12} />
                  </button>
                )}
              </div>
            ) : isOwnProfile && (
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-purple-500/5 border border-dashed border-armoyu-card-border group transition-all w-full text-left"
              >
                <div className="w-8 h-8 rounded-full bg-purple-500/5 group-hover:bg-purple-500/10 flex items-center justify-center text-purple-500/40 group-hover:text-purple-500 transition-colors">
                  <Sparkles size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-armoyu-text-muted uppercase opacity-60">Burç</div>
                  <div className="text-[11px] font-black text-purple-500/60 group-hover:text-purple-500 uppercase italic tracking-widest transition-colors">Burç Ekle</div>
                </div>
              </button>
            )}

            {displayUser?.favoriteTeam && displayUser.favoriteTeam.id !== 'none' ? (
              <div className="flex items-center justify-between group/item">
                <div className="flex items-center gap-3 animate-in slide-in-from-left duration-700">
                  <div className="w-8 h-8 rounded-full bg-black/10 flex items-center justify-center overflow-hidden">
                    <img src={displayUser.favoriteTeam.logo} alt={displayUser.favoriteTeam.name} className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase">Favori Takım</div>
                    <div className="text-sm font-bold text-armoyu-text">{displayUser.favoriteTeam.name}</div>
                  </div>
                </div>
                {isOwnProfile && (
                  <button onClick={() => setIsTeamModalOpen(true)} className="p-2 text-armoyu-text-muted hover:text-blue-500 opacity-0 group-hover/item:opacity-100 transition-all bg-black/5 rounded-lg mr-1" title="Takımı Değiştir">
                    <Edit3 size={12} />
                  </button>
                )}
              </div>
            ) : isOwnProfile && (
              <button
                onClick={() => setIsTeamModalOpen(true)}
                className="flex items-center gap-3 p-2 rounded-2xl hover:bg-blue-500/5 border border-dashed border-armoyu-card-border group transition-all w-full text-left"
              >
                <div className="w-8 h-8 rounded-full bg-blue-500/5 group-hover:bg-blue-500/10 flex items-center justify-center text-blue-500/40 group-hover:text-blue-500 transition-colors">
                  <Shield size={14} />
                </div>
                <div>
                  <div className="text-[10px] font-bold text-armoyu-text-muted uppercase opacity-60">Favori Takım</div>
                  <div className="text-[11px] font-black text-blue-500/60 group-hover:text-blue-500 uppercase italic tracking-widest transition-colors">Takım Seç</div>
                </div>
              </button>
            )}
          </div>
        </div>

        {/* Rozetler Vitrini */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
          <h3 className="text-lg font-black text-armoyu-text mb-4">Rozetler</h3>
          <div className="flex flex-wrap gap-2">
            <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-red-500/20">Kurucu</span>
            <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">5 Yıllık Üye</span>
            <span className="bg-purple-500/10 text-purple-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-500/20">Turnuva Şampiyonu</span>
            <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-yellow-500/20">Premium</span>
          </div>
        </div>

        {/* Cloud Depolama Temsili Kutusu - Sadece Kendi Profilinde */}
        {isOwnProfile && (
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-black text-armoyu-text flex items-center gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
                ARMOYU Cloud
              </h3>
              <span className="text-xs font-bold text-armoyu-text-muted">48%</span>
            </div>

            <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-3 shadow-inner">
              <div className="w-[48%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
            </div>

            <p className="text-xs font-medium text-armoyu-text-muted mb-4">
              5 GB alanın <span className="font-bold text-armoyu-text">2.4 GB</span> kadarı hesaba yedeklendi.
            </p>

            <button
              onClick={() => setIsCloudModalOpen(true)}
              className="w-full py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors border border-blue-500/10"
            >
              Depolamayı Yönet
            </button>
          </div>
        )}

        {/* Arkadaşlar Widget */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-lg font-black text-armoyu-text">
              Arkadaşlar <span className="text-blue-500 ml-1">{displayUser?.friends?.length || 0}</span>
            </h3>
            <button
              onClick={() => setActiveTab('Arkadaşlar')}
              className="text-xs font-bold text-blue-500 hover:underline"
            >
              Tümünü Gör
            </button>
          </div>

          <div className="grid grid-cols-5 gap-2">
            {(displayUser?.friends || []).slice(0, 5).map((friend, idx) => (
              <div key={friend.id || idx} className="group relative">
                <img
                  src={friend.avatar}
                  alt={friend.displayName}
                  className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform cursor-pointer shadow-sm"
                  title={friend.displayName}
                />
              </div>
            ))}
            {(displayUser?.friends?.length || 0) === 0 && (
              <p className="col-span-5 text-xs text-armoyu-text-muted text-center py-2 italic">
                Henüz arkadaş eklenmemiş.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Sağ Panel: İçerik ve Sekmeler */}
      <div className="flex-1 min-w-0 flex flex-col gap-6">

        {/* Team Selection Prompt Banner */}
        {showTeamBanner && (
          <div className="glass-panel p-6 rounded-[32px] border border-blue-500/30 bg-blue-600/5 relative overflow-hidden group animate-in slide-in-from-top duration-700">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-blue-500/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />

            <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
              <div className="flex items-center gap-5 text-center md:text-left">
                <div className="w-16 h-16 rounded-[24px] bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
                  <Shield size={32} />
                </div>
                <div>
                  <h3 className="text-lg font-black text-armoyu-text uppercase italic tracking-tighter leading-none">TAKIMINI SEÇMEDİN!</h3>
                  <p className="text-xs font-bold text-armoyu-text-muted mt-2 max-w-xs leading-relaxed uppercase tracking-wider italic">Favori takımını ve burcunu ekleyerek profilini daha renkli hale getir.</p>
                </div>
              </div>
              <div className="flex items-center gap-3 w-full md:w-auto">
                <button
                  onClick={() => setIsTeamModalOpen(true)}
                  className="flex-1 md:flex-none px-8 py-3.5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-blue-600/20 transition-all active:scale-95 italic"
                >
                  ŞİMDİ SEÇ
                </button>
                <button
                  onClick={() => {
                    setShowTeamBanner(false);
                    localStorage.setItem(`team_prompt_dismissed_${user?.id}`, 'true');
                  }}
                  className="p-3.5 text-armoyu-text-muted hover:text-armoyu-text bg-black/5 hover:bg-black/10 rounded-2xl transition-all"
                >
                  <X size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modern Tabs */}
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl p-2 shadow-sm overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                  ? 'bg-blue-500 text-white shadow-[0_0_15px_rgba(37,99,235,0.4)]'
                  : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* Tab İçerikleri */}
        {activeTab === 'Gönderiler' && (
          <div className="space-y-6">
            <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 shadow-sm">
              <div className="flex gap-4">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay" className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 shrink-0 object-cover" alt="Avatar" />
                <input type="text" placeholder="Profiline sabit bir gönderi yaz..." className="flex-1 bg-transparent border-none outline-none text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted" />
              </div>
            </div>

            {(user?.myPosts || []).map(post => (
              <PostCard key={post.id} {...post} />
            ))}
            {(user?.myPosts?.length || 0) === 0 && (
              <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-12 text-center">
                <p className="text-armoyu-text-muted font-medium">Henüz bir paylaşım yapılmamış.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Arkadaşlar' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {(displayUser?.friends || []).map((friend) => (
              <div
                key={friend.id}
                className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 shadow-sm hover:shadow-md transition-all group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-armoyu-card-border group-hover:scale-105 transition-transform">
                    <img src={friend.avatar} alt={friend.displayName} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="text-base font-bold text-armoyu-text truncate">{friend.displayName}</h4>
                    <p className="text-sm font-medium text-blue-500 truncate">@{friend.username}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                      <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wider">Çevrimiçi</span>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-5">
                  <a
                    href={`/oyuncular/${friend.username}`}
                    className="py-2 text-center text-xs font-bold text-armoyu-text bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl transition-colors border border-armoyu-card-border"
                  >
                    Profili Gör
                  </a>
                  <button className="py-2 text-center text-xs font-bold text-white bg-blue-500 hover:bg-blue-600 rounded-xl shadow-lg shadow-blue-500/20 transition-all">
                    Mesaj At
                  </button>
                </div>
              </div>
            ))}
            {(displayUser?.friends?.length || 0) === 0 && (
              <div className="col-span-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-12 text-center">
                <p className="text-armoyu-text-muted font-medium">Henüz arkadaş listeniz boş.</p>
              </div>
            )}
          </div>
        )}

        {activeTab === 'Kariyer' && (
          <div className="space-y-8 py-4">
            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-8 bottom-4 w-1 bg-gradient-to-b from-blue-500 to-purple-500/20 rounded-full" />

              <div className="space-y-12">
                {mockCareerEvents.map((event: any) => (
                  <div key={event.id} className="relative flex gap-8 group">
                    {/* Event Dot/Icon */}
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-2xl bg-armoyu-card-bg border-4 border-armoyu-bg flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 duration-500 shrink-0">
                        {event.type === 'JOIN' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>}
                        {event.type === 'RANK' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>}
                        {event.type === 'GROUP' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-purple-500"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>}
                        {event.type === 'AWARD' && <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-amber-500"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>}
                      </div>
                    </div>

                    {/* Event Content */}
                    <div className="flex-1 pt-1 text-left">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-2">
                        <h4 className="text-lg font-black text-armoyu-text uppercase italic leading-none">{event.title}</h4>
                        <span className="text-[10px] font-black text-armoyu-text-muted bg-black/5 dark:bg-white/5 px-3 py-1.5 rounded-xl uppercase tracking-widest leading-none">{event.date}</span>
                      </div>
                      <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] shadow-sm group-hover:border-blue-500/30 transition-all leading-normal">
                        <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed italic">
                          {event.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab !== 'Gönderiler' && activeTab !== 'Arkadaşlar' && activeTab !== 'Kariyer' && (
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-12 shadow-sm flex flex-col items-center justify-center text-center">
            <div className="w-16 h-16 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center text-armoyu-text-muted mb-4 font-bold uppercase italic">
              <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>
            </div>
            <h3 className="text-xl font-bold text-armoyu-text mb-2">Bu alan henüz yapım aşamasında</h3>
            <p className="text-armoyu-text-muted text-sm max-w-sm italic">"{activeTab}" sekmesine ait içerikler yakında eklenecek. Sabrınız için teşekkür ederiz.</p>
          </div>
        )}

      </div>

      <CloudStorageModal isOpen={isCloudModalOpen} onClose={() => setIsCloudModalOpen(false)} />
      <TeamSelectorModal
        isOpen={isTeamModalOpen}
        onClose={() => setIsTeamModalOpen(false)}
        onSelect={handleTeamSelect}
        initialTeam={displayUser?.favoriteTeam}
        initialZodiac={displayUser?.zodiac}
      />

      {/* Bio Güncelleme Modalı */}
      {isBioModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 text-left">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsBioModalOpen(false)} />
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl">
                  ✍️
                </div>
                <div>
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">Biyografini Düzenle</h3>
                  <p className="text-xs font-medium text-armoyu-text-muted">Kendini ARMOYU üyelerine tanıt.</p>
                </div>
              </div>
              <button onClick={() => setIsBioModalOpen(false)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">HAKKINDA</label>
                <textarea
                  className="w-full bg-black/10 border border-armoyu-card-border rounded-3xl px-6 py-5 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all min-h-[150px] resize-none"
                  placeholder="Kendinden bahset..."
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  autoFocus
                />
              </div>

              <button
                onClick={handleBioSave}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[20px] text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic"
              >
                DEĞİŞİKLİKLERİ KAYDET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

