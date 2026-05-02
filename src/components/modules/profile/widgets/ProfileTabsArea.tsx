'use client';

import React, { useState, useEffect } from 'react';
import { PostsTab } from '../tabs/PostsTab';
import { WallTab } from '../tabs/WallTab';
import { TaggedPostsTab } from '../tabs/TaggedPostsTab';
import { CareerTab } from '../tabs/CareerTab';
import { GamesTab } from '../tabs/GamesTab';
import { GroupsTab } from '../tabs/GroupsTab';
import { FriendsTab } from '../tabs/FriendsTab';
import { MediaTab } from '../tabs/MediaTab';
import { QuestionsTab } from '../tabs/QuestionsTab';
import { User } from '../../../../models/auth/User';
import { Team } from '../../../../models/community/Team';
import { useAuth } from '../../../../context/AuthContext';
import { X, Shield } from 'lucide-react';
import { TeamSelectorModal } from './TeamSelectorModal';

interface ProfileTabsAreaProps {
  displayUser?: User | null;
  isOwnProfile: boolean;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onEditBio?: () => void;
  schools?: any[];
}

export function ProfileTabsArea({
  displayUser,
  isOwnProfile,
  activeTab,
  setActiveTab,
  schools
}: ProfileTabsAreaProps) {
  const { user: currentUser, updateUser } = useAuth();

  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [showTeamBanner, setShowTeamBanner] = useState(false);

  useEffect(() => {
    // Show banner only on own profile and if team is missing and not dismissed
    if (isOwnProfile && !displayUser?.favoriteTeam) {
      const dismissed = localStorage.getItem(`team_prompt_dismissed_${displayUser?.id}`);
      if (!dismissed) {
        setShowTeamBanner(true);
      }
    }
  }, [isOwnProfile, displayUser]);

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

  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set([activeTab]));
  
  // Reset visitedTabs when user changes to prevent "ghosting" of cached tabs
  useEffect(() => {
    setVisitedTabs(new Set([activeTab]));
    console.log(`[ProfileTabsArea] Visited tabs reset for new user: ${displayUser?.username}`);
  }, [displayUser?.id, displayUser?.username]);

  useEffect(() => {
    setVisitedTabs(prev => new Set(prev).add(activeTab));
  }, [activeTab]);

  const tabs = ['Duvar', 'Gönderiler', 'Etiketlenenler', 'Medya', 'Kariyer', 'Soru-Cevap'];

  const hideTabsMenu = ['Arkadaşlar', 'Gruplar', 'Oynadığı Oyunlar'].includes(activeTab);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-6">

      {/* Team Selection Prompt Banner */}
      {showTeamBanner && (
        <div className="glass-panel p-6 rounded-[32px] border border-armoyu-primary/30 bg-armoyu-primary/5 relative overflow-hidden group animate-in slide-in-from-top duration-700">
          <div className="absolute -right-8 -top-8 w-32 h-32 bg-armoyu-primary/10 blur-3xl rounded-full group-hover:scale-150 transition-transform duration-1000" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
            <div className="flex items-center gap-5 text-center md:text-left">
              <div className="w-16 h-16 rounded-[24px] bg-armoyu-primary flex items-center justify-center text-white shadow-xl shadow-armoyu-primary/20">
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
                className="flex-1 md:flex-none px-8 py-3.5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-xl shadow-armoyu-primary/20 transition-all active:scale-95 italic"
              >
                ŞİMDİ SEÇ
              </button>
              <button
                onClick={() => {
                  setShowTeamBanner(false);
                  localStorage.setItem(`team_prompt_dismissed_${displayUser?.id}`, 'true');
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
      {!hideTabsMenu && (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl p-2 shadow-sm overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                  ? 'bg-armoyu-primary text-white shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb), 0.4)]'
                  : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Tab İçerikleri (Lazy + Persistent Caching) */}
      <div className="min-h-[400px]">
        {/* Duvar */}
        {visitedTabs.has('Duvar') && (
          <div style={{ display: activeTab === 'Duvar' ? 'block' : 'none' }}>
             <WallTab user={displayUser || null} />
          </div>
        )}

        {/* Gönderiler */}
        {visitedTabs.has('Gönderiler') && (
          <div style={{ display: activeTab === 'Gönderiler' ? 'block' : 'none' }}>
             <PostsTab user={displayUser || null} />
          </div>
        )}

        {/* Etiketlenenler */}
        {visitedTabs.has('Etiketlenenler') && (
          <div style={{ display: activeTab === 'Etiketlenenler' ? 'block' : 'none' }}>
             <TaggedPostsTab user={displayUser || null} />
          </div>
        )}

        {/* Medya */}
        {visitedTabs.has('Medya') && (
          <div style={{ display: activeTab === 'Medya' ? 'block' : 'none' }}>
             <MediaTab user={displayUser || null} />
          </div>
        )}

        {/* Kariyer */}
        {visitedTabs.has('Kariyer') && (
          <div style={{ display: activeTab === 'Kariyer' ? 'block' : 'none' }}>
             <CareerTab displayUser={displayUser as any} schools={schools} />
          </div>
        )}

        {/* Soru-Cevap */}
        {visitedTabs.has('Soru-Cevap') && (
          <div style={{ display: activeTab === 'Soru-Cevap' ? 'block' : 'none' }}>
             <QuestionsTab isOwnProfile={isOwnProfile} />
          </div>
        )}

        {/* Oynadığı Oyunlar */}
        {visitedTabs.has('Oynadığı Oyunlar') && (
          <div style={{ display: activeTab === 'Oynadığı Oyunlar' ? 'block' : 'none' }}>
             <GamesTab user={displayUser as any} />
          </div>
        )}

        {/* Gruplar */}
        {visitedTabs.has('Gruplar') && (
          <div style={{ display: activeTab === 'Gruplar' ? 'block' : 'none' }}>
             <GroupsTab groups={displayUser?.groups || []} />
          </div>
        )}

        {/* Arkadaşlar */}
        {visitedTabs.has('Arkadaşlar') && (
          <div style={{ display: activeTab === 'Arkadaşlar' ? 'block' : 'none' }}>
            <FriendsTab
              user={displayUser || null}
            />
          </div>
        )}
      </div>

      <TeamSelectorModal isOpen={isTeamModalOpen} onClose={() => setIsTeamModalOpen(false)} onSelect={handleTeamSelect} />
    </div>
  );
}
