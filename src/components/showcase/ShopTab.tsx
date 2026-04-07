import React from 'react';
import { 
  StoreHeader, 
  NewsCard, 
  newsList 
} from '../../index';

export function ShopTab() {
  return (
    <div className="space-y-12">
       <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-yellow-500 pl-4">Mağaza & İçerik</h3>
       <div className="space-y-8">
          <div className="glass-panel p-6 rounded-[32px]">
             <StoreHeader searchQuery="" setSearchQuery={() => {}} />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
             {newsList.map(news => (
               <NewsCard key={news.slug} {...news} />
             ))}
          </div>
       </div>
    </div>
  );
}
