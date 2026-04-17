'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

// Showcase Components
import { GeneralTab } from '../components/showcase/GeneralTab';
import { CorporateTab } from '../components/showcase/CorporateTab';
import { SocialTab } from '../components/showcase/SocialTab';
import { ProfileTab } from '../components/showcase/ProfileTab';
import { MessagesTab } from '../components/showcase/MessagesTab';
import { CommunityTab } from '../components/showcase/CommunityTab';
import { ShopTab } from '../components/showcase/ShopTab';
import { GroupTab } from '../components/showcase/GroupTab';
import { EventsPage } from '../components/modules/events';
import { ReelsTab } from '../components/showcase/ReelsTab';
import { AuthTab } from '../components/showcase/AuthTab';

function ShowcaseContent() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Genel';

  const renderTabContent = () => {
    switch (activeTab) {
      case 'Genel': return <GeneralTab />;
      case 'Kurumsal': return <CorporateTab />;
      case 'Sosyal': return <SocialTab />;
      case 'Profil': return <ProfileTab />;
      case 'Mesajlar': return <MessagesTab />;
      case 'Topluluk': return <CommunityTab />;
      case 'Gruplar': return <GroupTab />;
      case 'Etkinlikler': return <EventsPage />;
      case 'Shop': return <ShopTab />;
      case 'Reels': return <ReelsTab />;
      case 'Giriş / Kayıt': return <AuthTab />;
      default: return <GeneralTab />;
    }
  };

  return (
    <main className="flex-1 max-w-7xl mx-auto w-full px-4 py-12">
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
