'use client';

import React, { useState, useEffect } from 'react';
import { User } from '../../../models/auth/User';
import { Team } from '../../../models/community/Team';

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
import { TeamSelectorModal } from './widgets/TeamSelectorModal';
import { CloudModal } from '../../../index';
import { X } from 'lucide-react';

export function ProfileLayout({ user }: { user?: User }) {
  const { user: currentUser, updateUser } = useAuth();
  const { api: armoyuApi } = useArmoyu();
  
  const [activeTab, setActiveTab] = useState('Kariyer');
  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(user?.bio || '');
  
  const [friends, setFriends] = useState<User[]>([]);
  const [isLoadingFriends, setIsLoadingFriends] = useState(false);
  const [hasFetchedFriends, setHasFetchedFriends] = useState(false);
  const [friendsPage, setFriendsPage] = useState(1);
  const [hasMoreFriends, setHasMoreFriends] = useState(true);

  // Use currentUser from context if it's our own profile to ensure reactivity
  const isOwnProfile = currentUser?.username === user?.username;
  const displayUser = isOwnProfile ? currentUser : user;

  useEffect(() => {
    if (displayUser?.bio) {
      setTempBio(displayUser.bio);
    }
  }, [displayUser]);

  const handleBioSave = () => {
    if (isOwnProfile && currentUser) {
      updateUser({
        ...currentUser,
        bio: tempBio
      } as any);
      setIsBioModalOpen(false);
    }
  };

  const fetchFriends = async (isLoadMore = false) => {
    if (!displayUser?.id) return;
    
    setIsLoadingFriends(true);
    try {
      const targetPage = isLoadMore ? friendsPage + 1 : 1;
      const data = await armoyuApi.users.getFriendsList(targetPage, { 
        userId: Number(displayUser.id),
        limit: 20 
      });
      
      if (data && data.icerik && Array.isArray(data.icerik)) {
        const mappedFriends = data.icerik.map((u: any) => User.fromAPI(u));
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
        if (!isLoadMore) {
          setFriends([]);
          setHasFetchedFriends(true);
        }
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
  }, [activeTab, displayUser?.id, armoyuApi, hasFetchedFriends]);

  if (!displayUser) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Section */}
      <ProfileHeader user={displayUser} isOwnProfile={isOwnProfile} />

      {/* Stats Section */}
      <ProfileStats 
        user={displayUser as any} 
        isOwnProfile={isOwnProfile}
        onEditBio={() => setIsBioModalOpen(true)}
      />

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
          hasFetchedFriends={hasFetchedFriends}
          onLoadMoreFriends={() => fetchFriends(true)}
          onEditBio={() => setIsBioModalOpen(true)}
        />

      </div>

      <CloudModal isOpen={isCloudModalOpen} onClose={() => setIsCloudModalOpen(false)} />

      {/* Edit Bio Modal */}
      {isBioModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsBioModalOpen(false)} />
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl w-full max-w-md relative z-10 overflow-hidden shadow-2xl">
            <div className="p-6 border-b border-armoyu-card-border flex justify-between items-center bg-black/5 dark:bg-white/5">
              <h3 className="text-xl font-black text-armoyu-text italic uppercase tracking-tight">HAKKINDA'YI DÜZENLE</h3>
              <button onClick={() => setIsBioModalOpen(false)} className="text-armoyu-text-muted hover:text-red-500 transition-all">
                <X size={24} />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="space-y-3">
                <label className="text-[11px] font-black text-armoyu-text-muted uppercase tracking-widest italic flex justify-between">
                  <span>Kendinden Bahset</span>
                  <span>{(tempBio || '').length}/300</span>
                </label>
                <textarea
                  value={tempBio || ''}
                  onChange={(e) => setTempBio(e.target.value.slice(0, 300))}
                  placeholder="Diğer oyunculara kim olduğunu anlat..."
                  className="w-full h-32 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-4 text-sm font-medium text-armoyu-text focus:outline-none focus:border-blue-500 transition-all resize-none"
                />
              </div>

              <div className="flex gap-3 pt-4 border-t border-armoyu-card-border">
                <button
                  type="button"
                  onClick={() => setIsBioModalOpen(false)}
                  className="flex-1 px-6 py-4 rounded-xl text-xs font-black text-armoyu-text uppercase tracking-widest bg-black/5 hover:bg-black/10 transition-all border border-transparent hover:border-armoyu-card-border"
                >
                  İPTAL
                </button>
                <button
                  type="button"
                  onClick={handleBioSave}
                  className="flex-1 px-6 py-4 rounded-xl text-xs font-black text-white uppercase tracking-widest bg-blue-600 hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
                >
                  KAYDET
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
