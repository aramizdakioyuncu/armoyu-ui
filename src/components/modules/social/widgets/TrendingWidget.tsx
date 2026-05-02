'use client';

import React, { useEffect, useState } from 'react';
import { TrendingUp, MessageSquare, RefreshCcw } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import Link from 'next/link';

export const TrendingWidget: React.FC = () => {
  const { api } = useArmoyu();
  const [trends, setTrends] = useState<{ tag: string; count: string | number }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrends = async () => {
      try {
        // SearchService içindeki popüler etiketleri getir
        const response = await api.search.searchTags();
        if (response.durum === 1 && Array.isArray(response.icerik)) {
          setTrends(response.icerik.map((item: any) => ({
            tag: item.value || '',
            count: item.useCount || '0'
          })));
        }
      } catch (error) {
        console.error("Gündem verileri çekilemedi:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTrends();
  }, [api]);

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] overflow-hidden shadow-sm">
      <div className="p-5 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-gradient-to-r from-armoyu-primary/5 to-transparent">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
            <TrendingUp size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-armoyu-text">Gündem</h3>
        </div>
      </div>

      <div className="p-2">
        {loading ? (
          <div className="py-10 flex flex-col items-center gap-3 opacity-40">
            <RefreshCcw size={24} className="animate-spin text-armoyu-primary" />
            <span className="text-[10px] font-black uppercase tracking-widest">Yükleniyor...</span>
          </div>
        ) : trends.length > 0 ? (
          trends.map((trend, i) => (
            <Link
              key={i}
              href={`/?tab=sosyal&tag=${trend.tag}`}
              className="w-full flex items-center justify-between p-3 hover:bg-black/5 dark:hover:bg-white/5 rounded-2xl transition-all group text-left"
            >
              <div className="min-w-0">
                <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-tighter mb-0.5 opacity-60">Türkiye konumunda popüler</div>
                <div className="text-sm font-black text-armoyu-text group-hover:text-armoyu-primary transition-colors">#{trend.tag}</div>
                <div className="flex items-center gap-1.5 mt-1">
                  <MessageSquare size={10} className="text-armoyu-text-muted" />
                  <span className="text-[10px] font-bold text-armoyu-text-muted">{trend.count} Paylaşım</span>
                </div>
              </div>
              <div className="w-8 h-8 rounded-full border border-black/5 dark:border-white/5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all -translate-x-2 group-hover:translate-x-0">
                <div className="w-1.5 h-1.5 rounded-full bg-armoyu-primary" />
              </div>
            </Link>
          ))
        ) : (
          <div className="py-8 text-center opacity-40">
            <span className="text-[10px] font-bold uppercase tracking-widest">Şu an gündem sakin.</span>
          </div>
        )}
      </div>

      <div className="p-4 bg-black/5 dark:bg-white/5 text-center">
        <button className="text-[11px] font-black uppercase tracking-widest text-armoyu-primary hover:text-armoyu-primary transition-colors">Daha Fazla Göster</button>
      </div>
    </div>
  );
};
