import React from 'react';
import { TrendingUp, Clock } from 'lucide-react';
import { News } from '../../../../models/content/News';

interface NewsDetailSidebarProps {
  news: News[];
  onBack: () => void;
}

export function NewsDetailSidebar({ news, onBack }: NewsDetailSidebarProps) {
  return (
    <div className="lg:col-span-4 space-y-8">
      <div className="glass-panel p-8 rounded-[40px] border border-white/5 space-y-6 sticky top-24">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-2 bg-orange-500/10 text-orange-500 rounded-xl">
            <TrendingUp size={20} />
          </div>
          <h2 className="text-xl font-black text-white uppercase italic tracking-tighter">İlgini Çekebilir</h2>
        </div>

        <div className="space-y-6">
          {news.map((item, idx) => (
            <button 
              key={item.id || idx}
              onClick={() => window.location.href = `/?tab=haberler&slug=${item.slug}`}
              className="flex gap-4 group text-left w-full"
            >
              <div className="w-24 h-20 rounded-2xl overflow-hidden flex-shrink-0 bg-zinc-900 border border-white/5">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <div className="space-y-1 flex-1">
                <span className="text-[9px] font-black text-armoyu-primary uppercase tracking-widest">{item.category || 'HABER'}</span>
                <h4 className="text-sm font-bold text-white leading-snug group-hover:text-armoyu-primary transition-colors line-clamp-2 uppercase italic tracking-tight">
                  {item.title}
                </h4>
                <div className="flex items-center gap-2 text-[9px] text-armoyu-text-muted font-bold">
                  <Clock size={10} />
                  <span>{item.relativeTime || item.date}</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="pt-4">
          <button 
            onClick={onBack}
            className="w-full py-4 bg-white/5 hover:bg-white/10 text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all border border-white/5"
          >
            Tüm Haberleri Gör
          </button>
        </div>
      </div>

      <div className="p-8 rounded-[40px] bg-armoyu-primary relative overflow-hidden group">
        <div className="relative z-10 space-y-4">
          <h3 className="text-2xl font-black text-white uppercase italic leading-none">Armoyu'ya<br/>Katılın</h3>
          <p className="text-xs text-white/80 font-medium leading-relaxed">En güncel oyun haberleri ve topluluk etkinlikleri için profilinizi oluşturun.</p>
          <button className="px-6 py-2 bg-white text-armoyu-primary rounded-xl font-black text-[10px] uppercase tracking-widest shadow-xl">KAYIT OL</button>
        </div>
        <div className="absolute -right-4 -bottom-4 opacity-20 group-hover:scale-110 transition-transform duration-700">
          <TrendingUp size={120} />
        </div>
      </div>
    </div>
  );
}
