import React from 'react';
import Link from 'next/link';
import { MessageSquare, ChevronRight, AlertCircle } from 'lucide-react';

export const SupportSummaryWidget = () => {
  const tickets = [
    { id: '1024', subject: 'Hesap kurtarma', priority: 'Yüksek', status: 'Açık' },
    { id: '1025', subject: 'Mağaza ödeme', priority: 'Orta', status: 'Beklemede' },
  ];

  return (
    <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[32px] border border-white/5 p-6 shadow-xl shadow-black/5">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 rounded-xl text-amber-500">
            <MessageSquare size={18} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-tight">Destek Talepleri</h3>
        </div>
        <Link href="/management-panel?tab=support" className="text-[10px] font-black text-amber-500 uppercase tracking-widest hover:opacity-80 transition-all flex items-center gap-1">
          TÜMÜ <ChevronRight size={12} />
        </Link>
      </div>

      <div className="space-y-3">
        {tickets.map((ticket, i) => (
          <div key={i} className="p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-amber-500/30 transition-all cursor-pointer group">
            <div className="flex justify-between items-start mb-2">
               <span className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-50">#{ticket.id}</span>
               <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${ticket.priority === 'Yüksek' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'}`}>
                 {ticket.priority}
               </span>
            </div>
            <h4 className="text-xs font-black text-armoyu-text uppercase tracking-tight group-hover:text-amber-500 transition-colors">{ticket.subject}</h4>
            <div className="mt-3 flex items-center justify-between">
               <span className="text-[9px] font-bold text-armoyu-text-muted italic">2 dk önce</span>
               <div className="flex items-center gap-1">
                  <div className={`w-1.5 h-1.5 rounded-full ${ticket.status === 'Açık' ? 'bg-red-500' : 'bg-amber-500'}`} />
                  <span className="text-[9px] font-black uppercase text-armoyu-text-muted">{ticket.status}</span>
               </div>
            </div>
          </div>
        ))}
      </div>

      <Link href="/management-panel?tab=support" className="w-full mt-6 py-4 bg-amber-500/5 hover:bg-amber-500/10 text-amber-500 text-[10px] font-black uppercase tracking-widest rounded-2xl transition-all flex items-center justify-center gap-2">
        <AlertCircle size={14} /> TALEPLERİ YÖNET
      </Link>
    </div>
  );
};
