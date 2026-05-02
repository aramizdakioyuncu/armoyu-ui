'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { useLayout } from '../context/LayoutContext';

// Showcase Components
import { SocialTab } from '../components/showcase/SocialTab';
import { GroupTab } from '../components/showcase/GroupTab';
import { ShopTab } from '../components/showcase/ShopTab';
import { ChatLayout } from '../components/modules/chat/ChatLayout';
import { ForumPage } from '../components/modules/forum/pages/ForumPage';
import { ModsPage } from '../components/modules/mods/pages/ModsPage';
import { EducationPage } from '../components/modules/education/pages/EducationPage';
import { PollsPage } from '../components/modules/poll/pages/PollsPage';
import { GiveawaysPage } from '../components/modules/giveaways/pages/GiveawaysPage';
import { EventsPage } from '../components/modules/events/EventsPage';
import { NewsPage } from '../components/modules/news/pages/NewsPage';
import { ProfileTab } from '../components/showcase/ProfileTab';
import { CorporateTab } from '../components/showcase/CorporateTab';
import { GeneralTab } from '../components/showcase/GeneralTab';
import { ReelsTab } from '../components/showcase/ReelsTab';
import { AuthTab } from '../components/showcase/AuthTab';

import { MyArticlesPage } from '../components/modules/blog/pages/MyArticlesPage';
import { StoriesTab } from '../components/showcase/StoriesTab';
import { MyPostsTab } from '../components/showcase/MyPostsTab';
import { RulesTab } from '../components/showcase/RulesTab';

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
