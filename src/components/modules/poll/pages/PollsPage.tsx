'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { surveyList } from '../../../../lib/constants/seedData';
import { SurveyCard } from '../../community/widgets/SurveyCard';
import { Plus, Search, TrendingUp, BarChart3, History, RefreshCw } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { Survey } from '../../../../models/community/Survey';

export function PollsPage() {
  const { ui } = useArmoyu();
  const [activeTab, setActiveTab] = useState<'Aktif' | 'Katıldıklarım' | 'Arşiv'>('Aktif');
  const [searchQuery, setSearchQuery] = useState('');
  const [polls, setPolls] = useState<Survey[]>(() => 
    (surveyList || []).map(s => Survey.fromAPI(s))
  );
  const [isFetching, setIsFetching] = useState(false);

  const fetchPollsFromApi = useCallback(async () => {
    setIsFetching(true);
    try {
      const response = await ui.api.polls.getPolls(1);
      if (response.durum === 1) {
        const apiPolls = (response.icerik || []).map((poll: any) => Survey.fromAPI(poll));
        setPolls(prev => {
          const combined = [...apiPolls, ...prev];
          return Array.from(new Map(combined.map(p => [p.id, p])).values());
        });
      }
    } catch (error) {
      console.error("Failed to fetch polls:", error);
    } finally {
      setIsFetching(false);
    }
  }, [ui.api.polls]);

  useEffect(() => {
    fetchPollsFromApi();
  }, [fetchPollsFromApi]);

  const filteredSurveys = polls.filter((survey) => {
    // 1. Search Query
    if (searchQuery && !survey.question.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    
    // 2. Tab Filter
    if (activeTab === 'Katıldıklarım') return survey.hasVoted;
    if (activeTab === 'Arşiv') return survey.expiresAt && new Date(survey.expiresAt) < new Date();
    if (activeTab === 'Aktif') return !survey.expiresAt || new Date(survey.expiresAt) >= new Date();

    return true;
  });

  return (
    <div className="pb-32 animate-in fade-in duration-700 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[1280px]" />
      
      <div className="max-w-[1280px] mx-auto px-6 md:px-12">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pt-12">
          <div className="flex-1">
            <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4 drop-shadow-xl">
              TOPLULUK <span className="text-armoyu-primary">ANKETLERİ</span>
            </h1>
            <p className="text-armoyu-text-muted text-sm md:text-base font-medium opacity-80 max-w-2xl leading-relaxed">
              ARMOYU dünyasının geleceğini birlikte şekillendiriyoruz. Fikrini belirt, oyunu kullan ve topluluğun nabzını tut!
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button 
              onClick={fetchPollsFromApi}
              disabled={isFetching}
              className={`px-8 py-4 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-[25px] font-black text-xs uppercase tracking-[0.2em] border border-white/5 shadow-xl transition-all flex items-center gap-3 active:scale-95 ${isFetching ? 'opacity-50' : ''}`}
            >
               <RefreshCw size={18} strokeWidth={3} className={isFetching ? 'animate-spin' : ''} /> 
               {isFetching ? 'VERİ ÇEKİLİYOR...' : 'API BİLGİSİ ÇEK'}
            </button>
            <button className="px-8 py-4 bg-armoyu-primary text-white rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-armoyu-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3">
               <Plus size={18} strokeWidth={3} /> YENİ ANKET OLUŞTUR
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
           {/* Sidebar Filters */}
           <div className="lg:col-span-3 space-y-8">
              <div className="space-y-3">
                 <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] ml-4 mb-4">Görünüm Filtrele</p>
                 {[
                   { name: 'Aktif', icon: TrendingUp },
                   { name: 'Katıldıklarım', icon: BarChart3 },
                   { name: 'Arşiv', icon: History }
                 ].map((tab) => (
                    <button
                       key={tab.name}
                       onClick={() => setActiveTab(tab.name as any)}
                       className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === tab.name ? 'bg-armoyu-primary text-white shadow-xl shadow-armoyu-primary/20 active:scale-95' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                    >
                       <div className="flex items-center gap-3">
                          <tab.icon size={18} />
                          {tab.name}
                       </div>
                    </button>
                 ))}
              </div>

              <div className="pt-8 border-t border-armoyu-card-border">
                <div className="relative group">
                   <input 
                     type="text" 
                     placeholder="ANKET ARA..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full h-14 pl-12 pr-6 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-[10px] font-black uppercase tracking-[0.15em] focus:border-armoyu-primary outline-none transition-all placeholder:text-armoyu-text-muted/50"
                   />
                   <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors" />
                </div>
              </div>

              <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
                 <h4 className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest mb-4">Bilgi Kutusu</h4>
                 <p className="text-[11px] font-medium text-armoyu-text-muted leading-relaxed uppercase">
                   Anketlere sadece doğrulanmış topluluk üyeleri katılabilir. Her anket için tek bir oy hakkınız bulunmaktadır.
                 </p>
              </div>
           </div>

           {/* Surveys List */}
           <div className="lg:col-span-9 space-y-8">
              {filteredSurveys.length > 0 ? (
                 <>
                    {filteredSurveys.map((survey: any) => (
                      <SurveyCard key={survey.id} survey={survey} />
                    ))}
                 </>
              ) : (
                 <div className="py-24 text-center glass-panel rounded-[50px] border border-armoyu-card-border">
                    <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mx-auto mb-6">
                       <Search size={32} />
                    </div>
                    <h3 className="text-xl font-black text-armoyu-text mb-2 uppercase italic">Sonuç Bulunamadı</h3>
                    <p className="text-[11px] font-black text-armoyu-text-muted uppercase tracking-widest">Arama kriterlerinize uyan aktif bir anket bulunmuyor.</p>
                 </div>
              )}
           </div>
        </div>
      </div>
    </div>
  );
}
