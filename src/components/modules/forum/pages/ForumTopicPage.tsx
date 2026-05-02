'use client';

import React from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { ForumPost } from '../widgets/ForumPost';
import { MOCK_FORUM_TOPICS } from '../../../../lib/constants/seedData';

// Mock data for posts
const MOCK_POSTS = [
  {
    id: 'p1',
      author: 'Berkay Tikenoğlu',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay',
      authorRank: 'KURUCU',
      authorRankColor: 'red',
      authorJoined: 'HAZİRAN 2023',
      authorPosts: 1240,
      content: 'Arkadaşlar selamlar!\n\nSunucuya girmek aslında çok basit. İlk olarak Minecraft 1.20.1 sürümünü açın. Ardından sunucu ekle kısmına "play.armoyu.com" yazarak giriş yapabilirsiniz.\n\nEğer bir hata alırsanız buradan paylaşın, yardımcı olalım!',
      time: 'DÜN 14:30',
      isMainPost: true
    },
    {
      id: 'p2',
      author: 'Gamer_Ali',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ali',
      authorRank: 'ÜYE',
      authorRankColor: 'gray',
      authorJoined: ' OCAK 2024',
      authorPosts: 42,
      content: 'Teşekkürler hocam, girebildim gayet akıcı!',
      time: 'DÜN 16:15'
    },
    {
      id: 'p3',
      author: 'Bey Ev',
      authorAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Beytullah',
      authorRank: 'YÖNETİCİ',
      authorRankColor: 'blue',
      authorJoined: 'TEMMUZ 2023',
      authorPosts: 850,
      content: '@Gamer_Ali Rica ederiz! Sunucuda takıldığın bir şey olursa Discord üzerinden de ulaşabilirsin.',
      time: 'DÜN 18:00'
    }
  ];

interface ForumTopicPageProps {
  topicId: string;
  onBackToForum?: () => void;
  onBackToBoard?: (boardId: string) => void;
}

export function ForumTopicPage({ topicId, onBackToForum, onBackToBoard }: ForumTopicPageProps) {
  const topicData = (MOCK_FORUM_TOPICS || []).find((t: any) => t.id === topicId) || MOCK_FORUM_TOPICS[0];
  const boardId = topicData.boardId;
  const boardName = boardId.charAt(0).toUpperCase() + boardId.slice(1);

  // Dinamik olarak ilk post'un yazarını konuyu açan kişi yapıyoruz
  const dynamicPosts = [
    { ...MOCK_POSTS[0], author: topicData.author, authorAvatar: topicData.authorAvatar, content: `${topicData.title} hakkında yardımcı olabilecek var mı?` },
    MOCK_POSTS[1],
    MOCK_POSTS[2]
  ];

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1280px]" />
      
      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
         <button onClick={onBackToForum} className="hover:text-armoyu-primary transition-colors uppercase">FORUM</button>
         <span>/</span>
         <button onClick={() => onBackToBoard?.(boardId)} className="hover:text-armoyu-primary transition-colors uppercase">{boardName}</button>
         <span>/</span>
         <span className="text-armoyu-primary uppercase">{topicData.title}</span>
      </div>

      {/* Topic Title */}
      <div className="mb-12">
         <h1 className="text-3xl lg:text-5xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight drop-shadow-xl">
            {topicData.title}
         </h1>
      </div>

      {/* Content Area */}
      <div className="space-y-12">
         {dynamicPosts.map((post) => (
            <ForumPost key={post.id} {...post} />
         ))}

         {/* Quick Reply */}
         <div className="glass-panel p-8 md:p-12 rounded-[50px] border border-armoyu-card-border bg-armoyu-card-bg mt-16 shadow-2xl">
            <h3 className="text-xl font-black text-armoyu-text mb-8 uppercase tracking-tighter italic flex items-center gap-4">
              <div className="w-12 h-1 bg-armoyu-primary/30 rounded-full" /> HIZLI YANIT GÖNDER
            </h3>
            <div className="space-y-6">
               <textarea rows={6} className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-3xl px-8 py-6 text-armoyu-text placeholder:text-armoyu-text-muted focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all font-bold text-sm leading-relaxed resize-none hide-scrollbar" placeholder="Mesajınızı buraya yazın..." />
               <div className="flex justify-end gap-4">
                  <button className="px-12 py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-armoyu-primary/30 active:scale-95 transition-all outline-none">
                     CEVABI GÖNDER
                  </button>
               </div>
            </div>
         </div>
      </div>

      {/* Stats Footer */}
      <div className="mt-20 pt-12 border-t border-armoyu-card-border flex flex-wrap gap-12 justify-center opacity-40">
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-armoyu-text uppercase tracking-[0.3em]">{topicData.replies} YANIT</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-armoyu-text uppercase tracking-[0.3em]">{topicData.views} İZLENME</span>
          </div>
          <div className="flex flex-col items-center">
             <span className="text-[10px] font-black text-armoyu-text uppercase tracking-[0.3em]">Bu konuyu 3 kişi görüntülüyor</span>
          </div>
      </div>

    </div>
  );
}
