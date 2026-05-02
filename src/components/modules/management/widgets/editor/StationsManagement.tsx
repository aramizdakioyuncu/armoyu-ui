import React from 'react';
import { Radio, Zap, Globe, Users, Power, BarChart2 } from 'lucide-react';

export const StationsManagement = () => {
  const stations = [
    { name: 'ARMOYU Hub - İst1', region: 'Avrupa', status: 'Online', load: '45%', uptime: '14 Gün' },
    { name: 'ARMOYU Hub - İst2', region: 'Asya', status: 'Bakımda', load: '0%', uptime: '0 Gün' },
    { name: 'Global CDN Node', region: 'Global', status: 'Online', load: '78%', uptime: '124 Gün' },
    { name: 'Beta Test Node', region: 'Lokal', status: 'Offline', load: '0%', uptime: '0 Gün' },
  ];

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tighter">İstasyon <span className="text-armoyu-primary">Yönetimi</span></h2>
          <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest mt-1">Sistem istasyonlarını ve sunucu düğümlerini izleyin.</p>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
           <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse" />
           <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Tüm Sistemler Stabil</span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stations.map((station, i) => (
          <div key={i} className="bg-white dark:bg-[#12121a] rounded-[32px] p-6 border border-white/5 shadow-xl flex flex-col group relative overflow-hidden">
            <div className={`absolute top-0 right-0 w-24 h-24 blur-[40px] -z-10 transition-colors ${
              station.status === 'Online' ? 'bg-emerald-500/5 group-hover:bg-emerald-500/10' : 
              station.status === 'Bakımda' ? 'bg-amber-500/5' : 'bg-red-500/5'
            }`} />
            
            <div className="flex items-start justify-between mb-8">
              <div className={`p-3 rounded-2xl ${
                station.status === 'Online' ? 'bg-emerald-500/10 text-emerald-500' : 
                station.status === 'Bakımda' ? 'bg-amber-500/10 text-amber-500' : 'bg-red-500/10 text-red-500'
              }`}>
                <Radio size={24} />
              </div>
              <button className={`p-2 rounded-xl transition-all ${
                station.status === 'Online' ? 'text-emerald-500 hover:bg-emerald-500/10' : 'text-armoyu-text-muted hover:bg-white/5'
              }`}>
                <Power size={20} />
              </button>
            </div>

            <div className="space-y-1 mb-8">
               <h3 className="text-sm font-black uppercase tracking-tight">{station.name}</h3>
               <div className="flex items-center gap-2 text-armoyu-text-muted">
                  <Globe size={12} className="text-armoyu-primary" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">{station.region} Bölgesi</span>
               </div>
            </div>

            <div className="space-y-4 mt-auto">
               <div className="space-y-1.5">
                  <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                     <span className="text-armoyu-text-muted">Yük Durumu</span>
                     <span className={parseInt(station.load) > 70 ? 'text-red-500' : 'text-emerald-500'}>{station.load}</span>
                  </div>
                  <div className="h-1.5 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden">
                     <div 
                       className={`h-full transition-all duration-1000 ${
                         parseInt(station.load) > 70 ? 'bg-red-500' : 'bg-emerald-500'
                       }`}
                       style={{ width: station.load }}
                     />
                  </div>
               </div>

               <div className="flex justify-between items-center pt-4 border-t border-white/5">
                  <div className="flex flex-col">
                     <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Uptime</span>
                     <span className="text-[10px] font-black">{station.uptime}</span>
                  </div>
                  <div className="flex flex-col text-right">
                     <span className="text-[8px] font-black uppercase tracking-widest text-armoyu-text-muted">Status</span>
                     <span className={`text-[10px] font-black uppercase ${
                       station.status === 'Online' ? 'text-emerald-500' : 
                       station.status === 'Bakımda' ? 'text-amber-500' : 'text-red-500'
                     }`}>{station.status}</span>
                  </div>
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
