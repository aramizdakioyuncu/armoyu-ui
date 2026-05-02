import React from 'react';
import { Gift, Timer, Users, Trophy, Plus, MoreVertical, ExternalLink } from 'lucide-react';

export const GiveawaysManagement = () => {
  const giveaways = [
    { id: 1, title: 'Steam 50$ Cüzdan Kodu', participants: 1240, status: 'Aktif', end_date: '2 gün kaldı', type: 'Cüzdan Kodu' },
    { id: 2, title: 'Logitech G502 Mouse', participants: 3450, status: 'Sonuçlandı', end_date: 'Dün bitti', type: 'Donanım' },
    { id: 3, title: 'Discord Nitro (1 Yıllık)', participants: 850, status: 'Beklemede', end_date: 'Başlamadı', type: 'Abonelik' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Çekiliş <span className="text-armoyu-primary">Yönetimi</span></h2>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1">Platformdaki aktif ve geçmiş çekilişleri yönetin.</p>
        </div>
        <button className="flex items-center gap-2 px-5 py-2.5 bg-armoyu-primary text-white text-[10px] font-black uppercase tracking-widest rounded-xl shadow-lg shadow-primary/20 hover:scale-105 transition-all active:scale-95">
          <Plus size={16} /> Yeni Çekiliş
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {giveaways.map((giveaway, i) => (
          <div key={i} className="bg-white dark:bg-[#12121a] rounded-[32px] p-6 border border-white/5 shadow-xl relative overflow-hidden group hover:border-armoyu-primary/30 transition-all">
             <div className="absolute top-0 right-0 w-24 h-24 bg-armoyu-primary/5 blur-[40px] -z-10 group-hover:bg-armoyu-primary/10 transition-colors" />
             
             <div className="flex items-start justify-between mb-6">
                <div className={`p-3 rounded-2xl ${
                  giveaway.status === 'Aktif' ? 'bg-emerald-500/10 text-emerald-500' : 
                  giveaway.status === 'Sonuçlandı' ? 'bg-armoyu-primary/10 text-armoyu-primary' : 'bg-amber-500/10 text-amber-500'
                }`}>
                   <Gift size={24} />
                </div>
                <button className="p-2 text-armoyu-text-muted hover:bg-white/5 rounded-xl transition-all">
                   <MoreVertical size={18} />
                </button>
             </div>

             <div className="mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.2em] text-armoyu-primary/70">{giveaway.type}</span>
                <h3 className="text-sm font-black uppercase tracking-tight mt-1 group-hover:text-armoyu-primary transition-colors">{giveaway.title}</h3>
             </div>

             <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-2xl">
                   <div className="flex items-center gap-2 text-armoyu-text-muted">
                      <Users size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Katılımcı</span>
                   </div>
                   <span className="text-xs font-black text-armoyu-text">{giveaway.participants}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-2xl">
                   <div className="flex items-center gap-2 text-armoyu-text-muted">
                      <Timer size={14} />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Kalan Süre</span>
                   </div>
                   <span className={`text-[10px] font-black uppercase ${giveaway.status === 'Aktif' ? 'text-emerald-500' : 'text-armoyu-text-muted'}`}>{giveaway.end_date}</span>
                </div>
             </div>

             <div className="flex gap-2">
                {giveaway.status === 'Sonuçlandı' ? (
                  <button className="flex-1 py-3 bg-armoyu-primary text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                    <Trophy size={14} /> KAZANANLARI GÖR
                  </button>
                ) : (
                  <button className="flex-1 py-3 bg-black/5 dark:bg-white/5 hover:bg-armoyu-primary hover:text-white text-armoyu-text-muted text-[9px] font-black uppercase tracking-widest rounded-xl transition-all flex items-center justify-center gap-2">
                    <ExternalLink size={14} /> ÇEKİLİŞE GİT
                  </button>
                )}
             </div>
          </div>
        ))}
      </div>

      {/* Quick Stats Card */}
      <div className="bg-gradient-to-r from-armoyu-primary/20 via-armoyu-primary/5 to-transparent p-8 rounded-[40px] border border-armoyu-primary/10 flex flex-col md:flex-row items-center justify-between gap-8">
         <div className="flex items-center gap-6">
            <div className="w-16 h-16 bg-armoyu-primary rounded-3xl flex items-center justify-center text-white shadow-2xl shadow-primary/40">
               <Trophy size={32} />
            </div>
            <div>
               <h4 className="text-xl font-black uppercase tracking-tighter italic">Çekiliş Performansı</h4>
               <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-[0.2em] mt-1">Bu ay toplam 12.450 kişi çekilişlere katılım sağladı.</p>
            </div>
         </div>
         <div className="flex gap-12">
            <div className="text-center">
               <span className="block text-2xl font-black text-armoyu-primary leading-none">12</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">Aktif</span>
            </div>
            <div className="text-center">
               <span className="block text-2xl font-black text-armoyu-text leading-none">154</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">Tamamlanan</span>
            </div>
            <div className="text-center">
               <span className="block text-2xl font-black text-emerald-500 leading-none">2.4k</span>
               <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-text-muted">Yeni Üye</span>
            </div>
         </div>
      </div>
    </div>
  );
};
