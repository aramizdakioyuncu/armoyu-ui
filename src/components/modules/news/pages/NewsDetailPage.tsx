'use client';

import React, { useEffect, useState, useRef } from 'react';
import { ChevronLeft, Share2, Loader2 } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { News } from '../../../../models/content/News';

// Widgets
import { NewsComments } from '../widgets/NewsComments';
import { NewsDetailHero } from '../widgets/NewsDetailHero';
import { NewsDetailSidebar } from '../widgets/NewsDetailSidebar';
import { NewsDetailInteraction } from '../widgets/NewsDetailInteraction';
import { NewsDetailAuthor } from '../widgets/NewsDetailAuthor';

interface NewsDetailPageProps {
  slug: string;
  onBack: () => void;
}

export function NewsDetailPage({ slug, onBack }: NewsDetailPageProps) {
  const { api } = useArmoyu();
  const [news, setNews] = useState<News | null>(null);
  const [otherNews, setOtherNews] = useState<News[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const commentSectionRef = useRef<HTMLDivElement>(null);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const detailResponse = await api.blog.getNewsBySlug(slug);
      if (detailResponse.durum === 1 && detailResponse.icerik) {
        setNews(News.fromAPI(detailResponse.icerik));
      }

      const listResponse = await api.blog.getNews(1, 6);
      if (listResponse.durum === 1 && Array.isArray(listResponse.icerik)) {
        setOtherNews(listResponse.icerik
          .map((n: any) => News.fromAPI(n))
          .filter(n => n.slug !== slug)
          .slice(0, 5)
        );
      }
    } catch (error) {
      console.error("[NewsDetailPage] Fetch data failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  const scrollToComments = () => {
    commentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  if (isLoading) {
    return (
      <div className="py-32 flex flex-col items-center gap-6 opacity-50">
        <Loader2 size={48} className="text-armoyu-primary animate-spin" />
        <p className="text-[10px] font-black uppercase tracking-widest text-white italic">Haber Yükleniyor...</p>
      </div>
    );
  }

  if (!news) {
    return (
      <div className="flex flex-col items-center justify-center py-32 gap-6">
        <h2 className="text-3xl font-black text-white uppercase italic tracking-tighter">Haber Bulunamadı</h2>
        <button onClick={onBack} className="px-10 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-2xl shadow-armoyu-primary/30">
          LİSTEYE GERİ DÖN
        </button>
      </div>
    );
  }

  return (
    <div className="animate-in fade-in slide-in-from-bottom-12 duration-1000 pb-24 max-w-7xl mx-auto px-4">
      {/* Top Navigation */}
      <div className="mb-10 flex items-center justify-between">
        <button 
          onClick={onBack}
          className="flex items-center gap-3 text-armoyu-text-muted hover:text-armoyu-primary transition-colors group"
        >
          <div className="p-3 border border-white/5 bg-white/5 rounded-2xl group-hover:bg-armoyu-primary group-hover:text-white transition-all shadow-xl">
            <ChevronLeft size={18} />
          </div>
          <span className="text-[11px] font-black uppercase tracking-widest italic">Geri Dön</span>
        </button>

        <button className="p-4 bg-white/5 border border-white/5 rounded-2xl text-white hover:bg-armoyu-primary transition-all shadow-xl">
          <Share2 size={20} />
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
        {/* MAIN AREA */}
        <div className="lg:col-span-8 space-y-12">
          
          <NewsDetailHero 
            title={news.title}
            category={news.category}
            date={news.relativeTime || news.date}
            views={news.views}
          />

          <div className="aspect-video rounded-[40px] overflow-hidden border border-white/5 bg-zinc-900 shadow-2xl relative group ring-1 ring-white/5">
             <img src={news.image} alt={news.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" />
             <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-40" />
          </div>

          <NewsDetailInteraction 
            onCommentClick={scrollToComments}
          />

          <article className="prose prose-invert max-w-none">
             <div 
               className="text-xl md:text-2xl text-armoyu-text/90 leading-relaxed font-medium selection:bg-armoyu-primary/30 tracking-tight"
               dangerouslySetInnerHTML={{ __html: news.content }}
             />
          </article>

          <NewsDetailAuthor 
            name={news.authorName}
            avatar={news.authorAvatar}
          />

          <div ref={commentSectionRef} className="pt-8 border-t border-white/5">
             <NewsComments comments={[]} />
          </div>
        </div>

        {/* SIDEBAR AREA */}
        <NewsDetailSidebar 
          news={otherNews} 
          onBack={onBack} 
        />
      </div>
    </div>
  );
}
