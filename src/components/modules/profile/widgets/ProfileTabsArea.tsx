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
import { Briefcase } from 'lucide-react';

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

  const [visitedTabs, setVisitedTabs] = useState<Set<string>>(new Set([activeTab]));
  
  // Reset visitedTabs when user changes to prevent "ghosting" of cached tabs
  useEffect(() => {
    setVisitedTabs(new Set([activeTab]));
    console.log(`[ProfileTabsArea] Visited tabs reset for new user: ${displayUser?.username}`);
  }, [displayUser?.id, displayUser?.username]);

  useEffect(() => {
    setVisitedTabs(prev => new Set(prev).add(activeTab));
  }, [activeTab]);

  const tabs = ['Gönderiler', 'Etiketlenenler', 'Medya', 'Soru-Cevap', 'Duvar', 'Kariyer'];

  const hideTabsMenu = ['Arkadaşlar', 'Gruplar', 'Oynadığı Oyunlar'].includes(activeTab);

  return (
    <div className="flex-1 min-w-0 flex flex-col gap-6">

      {/* Modern Tabs */}
      {!hideTabsMenu && (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl p-2 shadow-sm overflow-x-auto hide-scrollbar">
          <div className="flex gap-2 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                // Kariyer yalnızca simgeyle, en sağda
                aria-label={tab === 'Kariyer' ? 'Kariyer' : undefined}
                title={tab === 'Kariyer' ? 'Kariyer' : undefined}
                className={`${tab === 'Kariyer' ? 'ml-auto px-3' : 'px-5'} py-2.5 rounded-xl text-sm font-bold transition-all ${activeTab === tab
                  ? 'bg-armoyu-primary text-white shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb), 0.4)]'
                  : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
              >
                {tab === 'Kariyer' ? <Briefcase size={18} aria-hidden="true" /> : tab}
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
             <MediaTab user={displayUser || null} isOwnProfile={isOwnProfile} />
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
             <QuestionsTab isOwnProfile={isOwnProfile} userId={displayUser?.id} />
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

    </div>
  );
}
