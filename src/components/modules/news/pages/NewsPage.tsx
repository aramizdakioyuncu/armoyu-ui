'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { News } from '../../../../models/content/News';

import { NewsCard } from '../widgets/NewsCard';
import { NewsLayout } from '../NewsLayout';
import { NewsDetailPage } from './NewsDetailPage';
import { ListToolbar } from '../../../shared/ListToolbar';
import { Search, Loader2 } from 'lucide-react';

// Mock news data (Fallback)
const MOCK_NEWS = [
  {
    slug: 'v3-yayinda',
    title: 'ARMOYU UI V3: Modern Tasarımın Zirvesi Yayında!',
    excerpt: 'Platformumuzun yeni yüzü olan V3 tasarımı, kullanıcı deneyimini baştan aşağı değiştiriyor. Daha hızlı, daha şık ve daha güçlü.',
    date: '24 Nisan 2026',
    category: 'SİSTEM',
    image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1600',
    author: { displayName: 'Admin' }
  }
];

export function NewsPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { api, apiKey } = useArmoyu();
  const slug = searchParams.get('slug');

  const [newsList, setNewsList] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Hepsi');

  const categories = ['Hepsi', 'SİSTEM', 'GAMES', 'TOPLULUK', 'DUYURU'];

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      // Core kütüphanesindeki BlogService'i kullanıyoruz
      const response = await api.blog.getNews(1, 20);
      if (response.durum === 1 && Array.isArray(response.icerik)) {
        setNewsList(response.icerik.map((n: any) => News.fromAPI(n)));
      } else {
        setNewsList(MOCK_NEWS.map(n => News.fromAPI(n)));
      }
    } catch (error) {
      console.error("[NewsPage] Fetch failed:", error);
      setNewsList(MOCK_NEWS.map(n => News.fromAPI(n)));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchNews();
  }, [api]);

  // Handle Detail View
  if (slug) {
    return (
      <NewsDetailPage 
        slug={slug} 
        onBack={() => router.push('/?tab=haberler')} 
      />
    );
  }

  const filteredNews = newsList.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         news.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'Hepsi' || news.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <NewsLayout>
      <div className="space-y-12">
        {/* Toolbar */}
        <ListToolbar 
          searchValue={searchQuery}
          onSearchChange={setSearchQuery}
          activeTab={activeCategory}
          onTabChange={setActiveCategory}
          tabs={categories}
          viewMode="grid"
          hideViewMode={true}
        />

        {isLoading ? (
          <div className="py-32 flex flex-col items-center gap-6 opacity-50">
            <Loader2 size={48} className="text-armoyu-primary animate-spin" />
            <p className="text-xs font-black uppercase tracking-widest text-white italic">Haberler Getiriliyor...</p>
          </div>
        ) : (
          <>
            {/* News Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredNews.map((news, index) => (
                <div key={news.id || index} className="animate-in fade-in slide-in-from-bottom-4 duration-500" style={{ animationDelay: `${index * 100}ms` }}>
                  <NewsCard 
                    slug={news.slug}
                    title={news.title}
                    excerpt={news.excerpt || news.getSummary(100)}
                    date={news.date || news.relativeTime}
                    category={news.category}
                    image={news.image}
                    author={news.author}
                    baseUrl="/?tab=haberler&slug=" 
                  />
                </div>
              ))}
            </div>

            {filteredNews.length === 0 && (
              <div className="py-32 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-40">
                <Search size={48} className="mx-auto mb-4 text-armoyu-text-muted" />
                <p className="text-sm font-black text-armoyu-text uppercase tracking-widest italic">Aramanızla eşleşen bir haber bulunamadı.</p>
              </div>
            )}
          </>
        )}
      </div>
    </NewsLayout>
  );
}
