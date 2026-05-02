import React from 'react';
import Link from 'next/link';
import { Calendar, ChevronRight, MapPin } from 'lucide-react';

export const EventSummaryWidget = () => {
  const events = [
    { title: 'CS2 Topluluk Gecesi', date: 'Bugün, 21:00', type: 'Oyun', participants: 45 },
    { title: 'ETS 2 Konvoyu', date: '15 Mayıs, 20:00', type: 'Oyun', participants: 28 },
  ];

  return (
    <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 p-6 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-500">
            <Calendar size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight">Yaklaşan Etkinlikler</h3>
        </div>
        <Link href="/management-panel?tab=events" className="text-[10px] font-black text-blue-500 uppercase tracking-widest hover:opacity-80 transition-all flex items-center gap-1">
          TÜMÜ <ChevronRight size={12} />
        </Link>
      </div>

      <div className="space-y-4">
        {events.map((event, i) => (
          <div key={i} className="relative pl-4 border-l-2 border-blue-500/30 py-1">
            <div className="flex justify-between items-start">
               <h4 className="text-xs font-black text-armoyu-text uppercase tracking-tight">{event.title}</h4>
               <span className="text-[9px] font-black text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded uppercase">{event.type}</span>
            </div>
            <div className="flex items-center gap-3 mt-2 text-armoyu-text-muted">
               <div className="flex items-center gap-1">
                  <MapPin size={10} className="text-blue-500" />
                  <span className="text-[10px] font-bold italic">{event.date}</span>
               </div>
               <div className="flex items-center gap-1">
                  <span className="text-[10px] font-black text-armoyu-text-muted opacity-50">{event.participants} KATILIMCI</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/management-panel?tab=events" className="w-full mt-6 py-4 bg-blue-500/5 hover:bg-blue-500/10 text-blue-500 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
        <Calendar size={14} /> ETKİNLİK PLANLA
      </Link>
    </div>
  );
};
