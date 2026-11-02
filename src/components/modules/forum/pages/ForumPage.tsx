'use client';

import React, { useEffect, useState } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { PageWidth } from '../../../shared/PageWidth';
import { ForumHeaderWidget } from '../widgets/ForumHeaderWidget';
import { ForumSidebar } from '../widgets/ForumSidebar';
import { ForumCategoryList } from '../widgets/ForumCategoryList';
import { NewTopicModal } from '../widgets/NewTopicModal';
import { MOCK_FORUM_CATEGORIES } from '../../../../lib/constants/seedData';

export function ForumPage() {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  // shortcut: yayınlanan @armoyu/core tiplerinde bu forum metotları yok; yeni sürüm çıkınca cast kalkacak
  const { api } = useArmoyu();
  const [boards, setBoards] = useState<any[] | null>(null);

  const loadBoards = () => {
    (api.forum as any).getCategories().then((response: any) => {
      if (response.durum === 1 && Array.isArray(response.icerik)) setBoards(response.icerik);
    });
  };

  useEffect(loadBoards, [api]);

  // API'ye ulaşılamazsa önizleme verisi gösterilir
  const categories = boards ? [{ title: 'FORUM', boards }] : MOCK_FORUM_CATEGORIES;

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      <NewTopicModal 
        isOpen={isNewTopicModalOpen}
        boards={boards ?? undefined}
        onCreated={loadBoards} 
        onClose={() => setIsNewTopicModalOpen(false)} 
      />
      
      {/* 1. Header Alanı */}
      <ForumHeaderWidget onNewTopicClick={() => setIsNewTopicModalOpen(true)} />

      {/* 2. Grid Sistemi - İskelet */}
      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
         
         {/* Main Content */}
         <div className="xl:col-span-3 space-y-8">
            <ForumCategoryList categories={categories} />
         </div>

         {/* Sidebar */}
         <div className="space-y-8 xl:col-span-1">
            <ForumSidebar />
         </div>

      </div>
    </div>
  );
}
