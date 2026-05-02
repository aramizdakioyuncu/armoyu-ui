import React from 'react';
import { Users, Shield, Star, MoreHorizontal, Settings } from 'lucide-react';

export const GroupsManagement = () => {
  const groups = [
    { name: 'ARMOYU Racing', category: 'Sim-Racing', members: 156, status: 'Aktif', level: 12 },
    { name: 'Techno Devs', category: 'Yazılım', members: 42, status: 'Onay Bekliyor', level: 5 },
    { name: 'Elite Gamers', category: 'E-Spor', members: 890, status: 'Aktif', level: 25 },
    { name: 'Creative Arts', category: 'Tasarım', members: 24, status: 'Pasif', level: 3 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">Grup <span className="text-armoyu-primary">Yönetimi</span></h2>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1">Topluluk gruplarını ve yetkilerini denetleyin.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {groups.map((group, i) => (
          <div key={i} className="bg-white dark:bg-[#12121a] rounded-[32px] p-6 border border-white/5 shadow-xl group hover:border-armoyu-primary/30 transition-all relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-armoyu-primary/5 blur-[40px] -z-10 group-hover:bg-armoyu-primary/10 transition-colors" />
            
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-armoyu-primary to-armoyu-primary/60 p-0.5 shadow-lg shadow-primary/20">
                   <div className="w-full h-full bg-[#12121a] rounded-[14px] flex items-center justify-center text-armoyu-primary">
                      <Users size={24} />
                   </div>
                </div>
                <div>
                  <h3 className="text-sm font-black uppercase tracking-tight group-hover:text-armoyu-primary transition-colors">{group.name}</h3>
                  <span className="text-[10px] font-bold text-armoyu-text-muted italic">{group.category}</span>
                </div>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-xl transition-all">
                <Settings size={18} className="text-armoyu-text-muted" />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-6">
               <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <span className="block text-lg font-black text-armoyu-primary leading-none">{group.members}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Üye</span>
               </div>
               <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-3 text-center border border-white/5">
                  <span className="block text-lg font-black text-amber-500 leading-none">{group.level}</span>
                  <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Seviye</span>
               </div>
               <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-3 flex flex-col items-center justify-center border border-white/5">
                  <div className={`w-2 h-2 rounded-full mb-1 ${group.status === 'Aktif' ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : group.status === 'Pasif' ? 'bg-red-500' : 'bg-amber-500 animate-pulse'}`} />
                  <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted leading-none">Durum</span>
               </div>
            </div>

            <div className="flex gap-2">
               <button className="flex-1 py-3 bg-armoyu-primary/10 hover:bg-armoyu-primary text-armoyu-primary hover:text-white text-[9px] font-black uppercase tracking-widest rounded-xl transition-all shadow-sm">
                  DETAYLAR
               </button>
               <button className="px-4 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text-muted rounded-xl transition-all">
                  <Shield size={14} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
