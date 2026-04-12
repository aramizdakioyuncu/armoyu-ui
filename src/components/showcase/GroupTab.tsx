'use client';

import React, { useState } from 'react';
import { 
  GroupHeader, 
  GroupMenu, 
  GroupStatsGrid, 
  GroupAboutCard, 
  GroupEventsList, 
  GroupFeedSection, 
  GroupTopMembers, 
  GroupPermissions,
  groupList,
  userList
} from '../../index';

export function GroupTab() {
  const [activeTab, setActiveTab] = useState('ANASAYFA');
  const mockGroup = groupList[0];

  return (
    <div className="space-y-12">
      <div className="mb-4">
        <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-emerald-500 pl-4 mb-2">Grup Arayüzü Mimarisi</h3>
        <p className="text-sm font-medium text-armoyu-text-muted">Grup içerisindeki bağımsız widget'ların nasıl yan yana gelerek dizildiğini gösterir.</p>
      </div>

      <div className="space-y-6">
        {/* Üst Alan */}
        <GroupHeader group={mockGroup} isJoined={true} isAdmin={true} onJoin={() => {}} onLeave={() => {}} />
        <GroupMenu group={mockGroup} user={userList[0]} onLeave={() => {}} />

        {/* İçerik Alanı Örnek Düzen */}
        <div className="grid grid-cols-1 xl:grid-cols-4 gap-12 mt-6">
          <div className="xl:col-span-3 space-y-6">
            <GroupStatsGrid stats={{ members: mockGroup.memberCount || 100, online: 42, posts: mockGroup.postCount || 10, founded: '2024' }} />
            <GroupEventsList events={[]} isOwner={true} onCreateEvent={() => {}} onEditEvent={() => {}} onDeleteEvent={() => {}} />
            <GroupFeedSection 
              posts={[]} 
              isJoined={true} 
              onNewPostClick={() => {}} 
              hasMore={false} 
              onLoadMore={() => {}} 
              isLoadingPosts={false} 
            />
          </div>
          
          <div className="space-y-10">
            <GroupAboutCard />
            <GroupPermissions isAdmin={true} />
            <GroupTopMembers members={[]} />
          </div>
        </div>
      </div>
    </div>
  );
}
