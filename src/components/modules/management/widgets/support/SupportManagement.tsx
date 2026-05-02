import React, { useState } from 'react';
import { Search, Filter, MessageSquare, Clock, CheckCircle2, AlertCircle, ChevronRight, User, MoreVertical } from 'lucide-react';

export interface SupportTicket {
  id: string;
  user: { name: string; avatar: string };
  subject: string;
  category: string;
  status: 'open' | 'pending' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
}

export const SupportManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const tickets: SupportTicket[] = [
    { id: '1024', user: { name: 'Berkay', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=berkay' }, subject: 'Hesap kurtarma yardımı', category: 'Hesap İşlemleri', status: 'open', priority: 'high', createdAt: '10 dk önce' },
    { id: '1025', user: { name: 'Alperen', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=alperen' }, subject: 'Mağaza ödeme sorunu', category: 'Finans', status: 'pending', priority: 'medium', createdAt: '1 saat önce' },
    { id: '1026', user: { name: 'Metehan', avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=metehan' }, subject: 'Grup ismi değişikliği', category: 'Genel', status: 'closed', priority: 'low', createdAt: 'Dün' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={18} />
          <input 
            type="text" 
            placeholder="Destek talebi ara..." 
            className="w-full pl-12 pr-4 py-4 bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-xl border border-white/5 rounded-2xl text-sm font-bold focus:outline-none focus:ring-2 focus:ring-armoyu-primary/50 transition-all shadow-xl shadow-black/5"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-3">
           <button className="p-4 bg-white dark:bg-armoyu-header-bg/40 border border-white/5 rounded-2xl text-armoyu-text-muted hover:text-white transition-all">
             <Filter size={18} />
           </button>
        </div>
      </div>

      <div className="grid gap-4">
        {tickets.map((ticket) => (
          <div key={ticket.id} className="group bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-3xl border border-white/5 p-6 hover:bg-white/5 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
               <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                 ticket.status === 'open' ? 'bg-red-500/10 text-red-500' :
                 ticket.status === 'pending' ? 'bg-amber-500/10 text-amber-500' :
                 'bg-emerald-500/10 text-emerald-500'
               }`}>
                  <MessageSquare size={24} />
               </div>
               <div>
                  <div className="flex items-center gap-2 mb-1">
                     <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted opacity-50">#{ticket.id}</span>
                     <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-tighter ${
                       ticket.priority === 'high' ? 'bg-red-500 text-white' :
                       ticket.priority === 'medium' ? 'bg-amber-500 text-white' :
                       'bg-blue-500 text-white'
                     }`}>
                        {ticket.priority}
                     </span>
                  </div>
                  <h4 className="font-black text-sm uppercase tracking-tight text-armoyu-text group-hover:text-armoyu-primary transition-colors">{ticket.subject}</h4>
                  <div className="flex items-center gap-3 mt-1">
                     <span className="text-[10px] font-bold text-armoyu-text-muted italic">{ticket.category}</span>
                     <span className="w-1 h-1 rounded-full bg-armoyu-text-muted opacity-30" />
                     <span className="text-[10px] font-bold text-armoyu-text-muted italic">{ticket.createdAt}</span>
                  </div>
               </div>
            </div>

            <div className="flex items-center justify-between md:justify-end gap-8">
               <div className="flex items-center gap-3">
                  <img src={ticket.user.avatar} className="w-8 h-8 rounded-full border border-white/10" alt="" />
                  <span className="text-xs font-black text-armoyu-text-muted uppercase italic">{ticket.user.name}</span>
               </div>
               
               <div className="flex items-center gap-3">
                  <button className="px-6 py-3 bg-armoyu-primary/10 hover:bg-armoyu-primary text-armoyu-primary hover:text-white font-black rounded-xl text-[10px] uppercase tracking-widest transition-all">Yanıtla</button>
                  <button className="p-3 bg-white/5 hover:bg-white/10 rounded-xl transition-all text-armoyu-text-muted">
                     <MoreVertical size={16} />
                  </button>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
