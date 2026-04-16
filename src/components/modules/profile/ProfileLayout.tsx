'use client';

import React, { useState, useEffect } from 'react';
import { User, Team } from '@armoyu/core';

// Shared Contexts from main index
import { 
    useAuth, 
    useArmoyu 
} from '../../../index';

// Module specific widgets
import { ProfileHeader } from './widgets/ProfileHeader';
import { ProfileStats } from './widgets/ProfileStats';
import { ProfileSidebar } from './widgets/ProfileSidebar';
import { ProfileTabsArea } from './widgets/ProfileTabsArea';
import { CloudStorageModal } from './widgets/CloudStorageModal';
import { TeamSelectorModal } from './widgets/TeamSelectorModal';

export function ProfileLayout({ user }: { user?: User }) {
  const { user: currentUser } = useAuth();
  const { api: armoyuApi } = useArmoyu();
  
  const [activeTab, setActiveTab] = useState('Kariyer');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
  const [friendsPage, setFriendsPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Use currentUser from context if it's our own profile to ensure reactivity
  const isOwnProfile = currentUser?.username === user?.username;
  const displayUser = isOwnProfile ? currentUser : user;

  const fetchFriends = async (isLoadMore = false) => {
    if (!displayUser?.id) return;
    
    setIsLoadingFriends(true);
    try {
      const targetPage = isLoadMore ? friendsPage + 1 : 1;
      const data = await armoyuApi.users.getFriendsList(targetPage, { 
        userId: Number(displayUser.id),
        limit: 20 
      });
      
      if (data && Array.isArray(data)) {
        const mappedFriends = data.map((u: any) => User.fromJSON(u));
        if (isLoadMore) {
          setFriends(prev => [...prev, ...mappedFriends]);
        } else {
          setFriends(mappedFriends);
        }
        setFriendsPage(targetPage);
        setHasMoreFriends(mappedFriends.length > 0);
        setHasFetchedFriends(true);
        console.log(`[ProfileLayout] Fetched ${mappedFriends.length} friends for ${displayUser.username}, Page: ${targetPage}`);
      } else {
        setHasMoreFriends(false);
      }
    } catch (error) {
      console.error('[ProfileLayout] Friends fetch error:', error);
    } finally {
      setIsLoadingFriends(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'Arkadaşlar' && !hasFetchedFriends) {
      fetchFriends(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, hasFetchedFriends, displayUser?.id, armoyuApi]);

  if (!displayUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <ProfileHeader user={displayUser} isOwnProfile={isOwnProfile} />

      {/* Stats Section */}
      <ProfileStats user={displayUser as any} />

      <div className="w-full flex flex-col lg:flex-row gap-8">

        {/* Left Side: Widgets */}
        <div className="w-full lg:w-80 shrink-0">
          <ProfileSidebar 
            displayUser={displayUser as any}
            isOwnProfile={isOwnProfile}
            friends={friends.length > 0 ? friends : (displayUser?.friends || [])}
            onSeeAllFriends={() => setActiveTab('Arkadaşlar')}
            onManageCloud={() => setIsCloudModalOpen(true)}
          />
        </div>

        {/* Right Side: Tab Area */}
        <ProfileTabsArea 
          displayUser={displayUser as any}
          isOwnProfile={isOwnProfile}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          friends={friends}
          hasMoreFriends={hasMoreFriends}
          isLoadingFriends={isLoadingFriends}
          onLoadMoreFriends={() => fetchFriends(true)}
        />

      </div>

      <CloudStorageModal isOpen={isCloudModalOpen} onClose={() => setIsCloudModalOpen(false)} />
    </div>
  );
}
