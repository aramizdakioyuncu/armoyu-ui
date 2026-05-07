'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLayout } from '@armoyu/ui';

// Showcase Components
import { SocialTab } from '@armoyu/ui/components/showcase/SocialTab';
import { GroupTab } from '@armoyu/ui/components/showcase/GroupTab';
import { ShopTab } from '@armoyu/ui/components/showcase/ShopTab';
import { 
  ChatLayout, 
  ForumPage, 
  ModsPage, 
  EducationPage, 
  PollsPage, 
  GiveawaysPage,
  MyArticlesPage 
} from '@armoyu/ui';
import { EventsPage } from '@armoyu/ui/components/modules/events/EventsPage';
import { NewsPage } from '@armoyu/ui/components/modules/news/pages/NewsPage';
import { ProfileTab } from '@armoyu/ui/components/showcase/ProfileTab';
import { CorporateTab } from '@armoyu/ui/components/showcase/CorporateTab';
import { GeneralTab } from '@armoyu/ui/components/showcase/GeneralTab';
import { ReelsTab } from '@armoyu/ui/components/showcase/ReelsTab';
import { AuthTab } from '@armoyu/ui/components/showcase/AuthTab';

import { StoriesTab } from '@armoyu/ui/components/showcase/StoriesTab';
import { MyPostsTab } from '@armoyu/ui/components/showcase/MyPostsTab';
import { RulesTab } from '@armoyu/ui/components/showcase/RulesTab';

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const { pageWidth } = useLayout();
  const activeTab = searchParams.get('tab') || 'sosyal';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'sosyal': return <SocialTab />;
      case 'hikayeler': return <StoriesTab />;
      case 'profil': return <ProfileTab />;
      case 'gruplar': return <GroupTab />;
      case 'sohbet': return <ChatLayout />;
      case 'magaza': return <ShopTab />;
      case 'kurumsal': return <CorporateTab />;
      case 'kurallar': return <RulesTab />;
      case 'genel': return <GeneralTab />;
      case 'reels': return <ReelsTab />;
      case 'auth': return <AuthTab />;
      case 'forum': return <ForumPage />;
      case 'modlar': return <ModsPage />;
      case 'egitim': return <EducationPage />;
      case 'anketler': return <PollsPage />;
      case 'cekilisler': return <GiveawaysPage />;
      case 'etkinlikler': return <EventsPage profilePrefix="/?tab=etkinlikler&id=" />;
      case 'haberler': return <NewsPage />;
      case 'yazilarim': return <MyArticlesPage />;
      default: return <SocialTab />;
    }
  };

  return (
    <main className={`flex-1 ${pageWidth} mx-auto w-full px-4 py-8`}>
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
         {renderTabContent()}
      </div>
    </main>
  );
}

export default function ShowcasePage() {
  return (
    <Suspense fallback={<div className="flex-1 flex items-center justify-center">Yükleniyor...</div>}>
      <ShowcaseContent />
    </Suspense>
  );
}
