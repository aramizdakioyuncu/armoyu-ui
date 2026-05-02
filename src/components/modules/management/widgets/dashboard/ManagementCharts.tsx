import React from 'react';
import { TrendingUp, Users, Calendar, MessageSquare, ShieldCheck, Clock } from 'lucide-react';

export interface ChartDataPoint {
  label: string;
  value: number;
}

export interface ManagementChartsProps {
  memberData: ChartDataPoint[];
  eventData: ChartDataPoint[];
  reportData: {
    open: number;
    closed: number;
    pending: number;
  };
}

export const ManagementCharts = ({ memberData, eventData, reportData }: ManagementChartsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
      {/* Platform Performance Chart */}
      <div className="bg-white dark:bg-[#12121a] rounded-[40px] p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)] relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/5 blur-[80px] -z-10 rounded-full group-hover:bg-armoyu-primary/10 transition-colors duration-1000" />
        
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-armoyu-primary/10 rounded-xl">
                <TrendingUp className="text-armoyu-primary" size={20} />
              </div>
              Platform <span className="text-armoyu-primary">Performansı</span>
            </h3>
            <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-[0.2em] mt-2 opacity-60">Son 7 günlük büyüme verileri</p>
          </div>
          <div className="flex gap-3">
             <div className="flex items-center gap-2 px-4 py-2 bg-armoyu-primary/5 border border-armoyu-primary/10 rounded-2xl shadow-inner">
                <div className="w-1.5 h-1.5 bg-armoyu-primary rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-armoyu-primary">Üyeler</span>
             </div>
             <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl shadow-inner">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                <span className="text-[9px] font-black uppercase tracking-widest text-emerald-500">Etkinlikler</span>
             </div>
          </div>
        </div>

        {/* Visual Chart Placeholder */}
        <div className="h-56 flex items-end justify-between gap-3 px-2">
           {memberData.map((d, i) => (
             <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                <div className="w-full relative h-40 flex items-end gap-1.5">
                   <div 
                     className="flex-1 bg-gradient-to-t from-armoyu-primary/40 to-armoyu-primary/60 group-hover/bar:from-armoyu-primary/60 group-hover/bar:to-armoyu-primary/80 rounded-t-xl transition-all duration-700 relative group/val shadow-lg shadow-primary/5"
                     style={{ height: `${(d.value / 100) * 100}%` }}
                   >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/val:opacity-100 transition-all scale-75 group-hover/val:scale-100 border border-white/10 shadow-xl pointer-events-none z-10">
                        {d.value}
                      </div>
                   </div>
                   <div 
                     className="flex-1 bg-gradient-to-t from-emerald-600/20 to-emerald-400/30 group-hover/bar:from-emerald-600/40 group-hover/bar:to-emerald-400/50 rounded-t-xl transition-all duration-700 delay-75 relative group/val shadow-lg shadow-emerald-500/5"
                     style={{ height: `${(eventData[i]?.value / 100) * 100}%` }}
                   >
                      <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/val:opacity-100 transition-all scale-75 group-hover/val:scale-100 border border-white/10 shadow-xl pointer-events-none z-10">
                        {eventData[i]?.value}
                      </div>
                   </div>
                </div>
                <span className="text-[9px] font-black uppercase text-armoyu-text-muted tracking-widest opacity-40 group-hover/bar:opacity-100 transition-opacity">{d.label}</span>
             </div>
           ))}
        </div>
      </div>

      {/* Report Status Grid */}
      <div className="bg-white dark:bg-armoyu-header-bg/40 backdrop-blur-2xl rounded-[40px] p-8 border border-white/5 shadow-[0_20px_50px_rgba(0,0,0,0.1)] dark:shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h3 className="text-xl font-black uppercase tracking-tighter flex items-center gap-3">
              <div className="p-2 bg-amber-500/10 rounded-xl">
                <MessageSquare className="text-amber-500" size={20} />
              </div>
              Bildiri <span className="text-amber-500">Durumu</span>
            </h3>
            <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-[0.2em] mt-2 opacity-60">Sistem genelindeki bildiri oranları</p>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-5 h-48">
           {[
             { label: 'Kapalı', value: reportData.closed, color: 'emerald', icon: ShieldCheck },
             { label: 'Bekleyen', value: reportData.pending, color: 'armoyu-primary', icon: Clock },
             { label: 'Açık', value: reportData.open, color: 'red', icon: MessageSquare }
           ].map((stat, i) => (
             <div key={i} className={`bg-${stat.color}/5 rounded-[24px] p-6 flex flex-col items-center justify-center border border-${stat.color}/10 group hover:bg-${stat.color}/10 transition-all duration-500 hover:-translate-y-1`}>
                <stat.icon className={`text-${stat.color} mb-4 group-hover:scale-110 transition-transform duration-500`} size={28} />
                <span className={`text-3xl font-black text-${stat.color} tracking-tighter`}>{stat.value}</span>
                <span className={`text-[10px] font-black uppercase text-${stat.color}/60 mt-2 tracking-widest`}>{stat.label}</span>
             </div>
           ))}
        </div>

        <div className="mt-10 p-6 bg-black/5 dark:bg-white/5 rounded-[24px] flex flex-col gap-4 border border-white/5 shadow-inner">
           <div className="flex items-center justify-between">
              <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">Çözüm Performansı</span>
              <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">%{Math.round((reportData.closed / (reportData.closed + reportData.pending + reportData.open)) * 100)} Verimlilik</span>
           </div>
           <div className="h-3 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden flex shadow-inner">
              <div 
                className="h-full bg-gradient-to-r from-emerald-600 to-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]" 
                style={{ width: `${(reportData.closed / (reportData.closed + reportData.pending + reportData.open)) * 100}%` }} 
              />
              <div 
                className="h-full bg-gradient-to-r from-armoyu-primary to-armoyu-primary/80" 
                style={{ width: `${(reportData.pending / (reportData.closed + reportData.pending + reportData.open)) * 100}%` }} 
              />
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-red-400" 
                style={{ width: `${(reportData.open / (reportData.closed + reportData.pending + reportData.open)) * 100}%` }} 
              />
           </div>
           <div className="flex justify-between items-center opacity-40">
              <span className="text-[8px] font-bold uppercase tracking-widest">0 Hedef</span>
              <span className="text-[8px] font-bold uppercase tracking-widest">Tüm Zamanlar</span>
           </div>
        </div>
      </div>
    </div>
  );
};
