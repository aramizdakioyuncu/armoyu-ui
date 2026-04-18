'use client';

import React, { useState } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { TopicItem } from '../widgets/TopicItem';
import { NewTopicModal } from '../widgets/NewTopicModal';
import { MOCK_FORUM_TOPICS } from '../../../../lib/constants/seedData';

interface ForumBoardPageProps {
  boardId: string;
  onTopicClick?: (topicId: string) => void;
  onBackClick?: () => void;
}

export function ForumBoardPage({ boardId, onTopicClick, onBackClick }: ForumBoardPageProps) {
  const [isNewTopicModalOpen, setIsNewTopicModalOpen] = useState(false);
  const boardName = boardId.charAt(0).toUpperCase() + boardId.slice(1);
  const boardTopics = (MOCK_FORUM_TOPICS || []).filter((t: any) => t.boardId === boardId);

  return (
    <div className="pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700">
      <PageWidth width="max-w-[1440px]" />
      
      <NewTopicModal 
        isOpen={isNewTopicModalOpen} 
        onClose={() => setIsNewTopicModalOpen(false)} 
        defaultBoard={boardName}
      />

      {/* Breadcrumbs */}
      <div className="mb-8 flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted">
         <button onClick={onBackClick} className="hover:text-blue-500 uppercase">FORUM</button>
         <span>/</span>
         <span className="text-blue-500">{boardName}</span>
      </div>

      <div className="mb-12 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="text-center md:text-left">
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text mb-4 uppercase tracking-tighter italic drop-shadow-xl">{boardName} SUNUCUSU</h1>
            <p className="text-armoyu-text-muted text-lg font-medium opacity-80">{boardName} dünyasındaki tüm gelişmeler ve topluluk etkileşimi.</p>
         </div>
         <button 
           onClick={() => setIsNewTopicModalOpen(true)}
           className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-blue-500/20 active:scale-95 transition-all outline-none"
         >
            YENİ KONU AÇ
         </button>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-12">
         
         <div className="xl:col-span-3 space-y-8">
            
            {/* Topic Filter Tabs */}
            <div className="flex gap-4 border-b border-armoyu-card-border pb-4">
               <button className="px-6 py-2 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/10">HEPSİ</button>
               <button className="px-6 py-2 bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-blue-500 transition-colors">POPÜLER</button>
               <button className="px-6 py-2 bg-black/5 dark:bg-white/5 text-armoyu-text-muted text-[10px] font-black uppercase tracking-widest rounded-xl hover:text-blue-500 transition-colors">ÇÖZÜLDÜ</button>
            </div>

            {/* Topic List */}
            <div className="space-y-4">
               {boardTopics.length > 0 ? boardTopics.map((topic: any) => (
                  <div key={topic.id} onClick={() => onTopicClick?.(topic.id)} className="cursor-pointer">
                     <TopicItem {...topic} />
                  </div>
               )) : (
                 <div className="p-16 text-center glass-panel rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                    <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Bu kategoriye henüz konu açılmamış.</p>
                 </div>
               )}
            </div>

            {/* Pagination Placeholder */}
            {boardTopics.length > 0 && (
               <div className="flex justify-center pt-8">
                  <div className="flex gap-2">
                     <button className="w-10 h-10 bg-blue-600 text-white rounded-xl font-black text-xs">1</button>
                     <button className="w-10 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500">2</button>
                     <button className="w-10 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500">3</button>
                     <button className="px-6 h-10 bg-black/5 dark:bg-white/5 text-armoyu-text-muted rounded-xl font-black text-xs hover:text-blue-500 uppercase tracking-widest">SONRAKİ</button>
                  </div>
               </div>
            )}
         </div>

         <div className="space-y-10">
            {/* Board Rules */}
            <div className="glass-panel p-8 rounded-[40px] border border-blue-500/20 bg-blue-600/5 shadow-xl">
               <h4 className="text-[10px] font-black text-blue-500 mb-6 uppercase tracking-[0.3em]">Sunucu Kuralları</h4>
               <ul className="space-y-5">
                  {[
                    'Reklam yapmak kesinlikle yasaktır.',
                    'Diğer üyelere saygılı davranın.',
                    'Konularınızı doğru kategoriye açın.'
                  ].map((rule, idx) => (
                    <li key={idx} className="flex gap-3 text-xs font-bold text-armoyu-text uppercase tracking-tight leading-relaxed">
                       <span className="text-blue-500">{(idx+1).toString().padStart(2, '0')}.</span> {rule}
                    </li>
                  ))}
               </ul>
            </div>

            {/* Top Posters */}
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
               <h4 className="text-[10px] font-black text-armoyu-text-muted mb-6 uppercase tracking-[0.3em]">En Aktif Üyeler</h4>
               <div className="space-y-6">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-4 group">
                       <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 55}`} className="w-12 h-12 rounded-2xl border border-blue-500/20 group-hover:scale-110 transition-transform" alt="Avatar" />
                       <div>
                          <p className="text-[11px] font-black text-armoyu-text mb-1 uppercase italic">Üye Adı {i}</p>
                          <p className="text-[9px] font-bold text-blue-500 uppercase tracking-widest">{i * 120} MESAJ</p>
                       </div>
                    </div>
                  ))}
               </div>
            </div>
         </div>

      </div>
    </div>
  );
}
