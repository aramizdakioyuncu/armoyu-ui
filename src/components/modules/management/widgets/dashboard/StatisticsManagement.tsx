import React from 'react';
import { BarChart3, TrendingUp, Users, MessageSquare, Shield, ArrowUpRight, ArrowDownRight, Activity, Zap, ExternalLink } from 'lucide-react';
import { ManagementHeader } from './ManagementHeader';
import { RollingNumber } from '../../../../RollingNumber';

export const StatisticsManagement = () => {
  const [viewRange, setViewRange] = React.useState('monthly');

  const stats = [
    { name: 'Aktif Kullanıcı (Anlık)', value: '142', change: '+12', isUp: true, icon: Activity, color: 'text-emerald-500' },
    { name: 'Yeni Kayıt (Bugün)', value: '24', change: '+5', isUp: true, icon: Users, color: 'text-armoyu-primary' },
    { name: 'Destek Talebi (Açık)', value: '8', change: '-2', isUp: false, icon: MessageSquare, color: 'text-amber-500' },
    { name: 'Sistem Yükü', value: '42', change: 'Stabil', isUp: true, icon: Zap, color: 'text-blue-500' },
  ];

  const getChartData = () => {
    switch(viewRange) {
      case 'daily':
        return [
          { label: '00:00', value: 450 },
          { label: '06:00', value: 120 },
          { label: '12:00', value: 890 },
          { label: '18:00', value: 1240 },
          { label: '23:00', value: 950 },
        ];
      case 'weekly':
        return [
          { label: 'Pzt', value: 2100 },
          { label: 'Sal', value: 1800 },
          { label: 'Çar', value: 2400 },
          { label: 'Per', value: 3100 },
          { label: 'Cum', value: 4200 },
          { label: 'Cmt', value: 5800 },
          { label: 'Paz', value: 4900 },
        ];
      case 'yearly':
        return [
          { label: '2022', value: 12400 },
          { label: '2023', value: 28900 },
          { label: '2024', value: 45000 },
          { label: '2025', value: 68000 },
          { label: '2026', value: 124000 },
        ];
      default:
        return [
          { label: 'Ocak', value: 1200 },
          { label: 'Şubat', value: 1500 },
          { label: 'Mart', value: 1800 },
          { label: 'Nisan', value: 2400 },
          { label: 'Mayıs', value: 3100 },
        ];
    }
  };

  const currentData = getChartData();
  const maxValue = Math.max(...currentData.map(d => d.value));

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <ManagementHeader 
        title={<>Detaylı <span className="text-armoyu-primary text-shadow-glow">İstatistikler</span></>}
        subtitle="Platformun büyüme ve etkileşim verilerini derinlemesine analiz edin."
      />

      {/* Real-time Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-[#12121a] p-6 rounded-[32px] border border-white/5 shadow-xl group hover:-translate-y-1 transition-all duration-500">
            <div className="flex items-start justify-between mb-4">
              <div className={`p-3 rounded-2xl bg-black/5 dark:bg-white/5 ${stat.color} group-hover:scale-110 transition-transform`}>
                <stat.icon size={24} />
              </div>
              <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-lg ${stat.isUp ? 'bg-emerald-500/10 text-emerald-500' : 'bg-red-500/10 text-red-500'}`}>
                {stat.isUp ? <ArrowUpRight size={10} /> : <ArrowDownRight size={10} />}
                {stat.change}
              </div>
            </div>
            <h4 className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted mb-1 opacity-60">{stat.name}</h4>
            <span className="text-2xl font-black text-armoyu-text">
               <RollingNumber value={stat.value} suffix={stat.name === 'Sistem Yükü' ? '%' : ''} />
            </span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Growth Chart */}
        <div className="bg-white dark:bg-[#12121a] p-8 rounded-[40px] border border-white/5 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/5 blur-[100px] -z-10" />
           <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3">
                 <BarChart3 className="text-armoyu-primary" size={20} />
                 Büyüme <span className="text-armoyu-primary">Grafiği</span>
              </h3>
              <div className="flex p-1 bg-black/5 dark:bg-white/5 rounded-2xl border border-white/5 overflow-x-auto no-scrollbar">
                 {[
                   { id: 'daily', label: 'GÜNLÜK' },
                   { id: 'weekly', label: 'HAFTALIK' },
                   { id: 'monthly', label: 'AYLIK' },
                   { id: 'yearly', label: 'YILLIK' },
                 ].map((range) => (
                   <button
                     key={range.id}
                     onClick={() => setViewRange(range.id)}
                     className={`px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-widest transition-all whitespace-nowrap ${
                       viewRange === range.id 
                         ? 'bg-armoyu-primary text-white shadow-lg shadow-primary/20' 
                         : 'text-armoyu-text-muted hover:text-armoyu-text'
                     }`}
                   >
                     {range.label}
                   </button>
                 ))}
              </div>
           </div>

           <div className="h-64 flex items-end justify-between gap-4 px-2">
              {currentData.map((d, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-4 group/bar">
                   <div className="w-full relative h-48 flex items-end">
                      <div 
                        className="w-full bg-gradient-to-t from-armoyu-primary/20 to-armoyu-primary group-hover/bar:from-armoyu-primary/40 group-hover/bar:to-armoyu-primary rounded-t-2xl transition-all duration-700 relative group/val"
                        style={{ height: `${(d.value / maxValue) * 100}%` }}
                      >
                         <div className="absolute -top-10 left-1/2 -translate-x-1/2 bg-zinc-900 text-white text-[10px] font-black px-3 py-1.5 rounded-xl opacity-0 group-hover/val:opacity-100 transition-all scale-75 group-hover/val:scale-100 border border-white/10 shadow-xl pointer-events-none z-10 whitespace-nowrap">
                           {d.value.toLocaleString()}
                         </div>
                      </div>
                   </div>
                   <span className="text-[9px] font-black uppercase text-armoyu-text-muted tracking-widest opacity-40 group-hover/bar:opacity-100 transition-opacity">{d.label}</span>
                </div>
              ))}
           </div>
        </div>

        {/* Detailed Interaction Stats */}
        <div className="space-y-8">
           <div className="bg-white dark:bg-[#12121a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
              <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 mb-10">
                 <TrendingUp className="text-emerald-500" size={20} />
                 Etkileşim <span className="text-emerald-500">Analizi</span>
              </h3>

              <div className="space-y-6">
                 {[
                   { label: 'Sayfa Görüntüleme', value: '1.2M', percentage: 85, color: 'armoyu-primary' },
                   { label: 'Ortalama Oturum', value: '12dk', percentage: 65, color: 'blue-500' },
                   { label: 'Hemen Çıkma Oranı', value: '%18', percentage: 20, color: 'emerald-500' },
                   { label: 'Yeni Üye Kazanımı', value: '+450', percentage: 75, color: 'purple-500' },
                 ].map((item, i) => (
                   <div key={i} className="space-y-2">
                      <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest">
                         <span className="text-armoyu-text-muted">{item.label}</span>
                         <span className="text-armoyu-text">{item.value}</span>
                      </div>
                      <div className="h-2 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
                         <div 
                           className={`h-full bg-${item.color} rounded-full`}
                           style={{ width: `${item.percentage}%` }}
                         />
                      </div>
                   </div>
                 ))}
              </div>
           </div>

           {/* Top Visited Profiles */}
           <div className="bg-white dark:bg-[#12121a] p-8 rounded-[40px] border border-white/5 shadow-2xl">
              <h3 className="text-lg font-black uppercase tracking-tighter flex items-center gap-3 mb-8">
                 <Users className="text-blue-500" size={20} />
                 Popüler <span className="text-blue-500">Profiller</span>
              </h3>

              <div className="space-y-4">
                 {[
                   { name: 'Berkay Tikenoglu', username: 'berkay', visits: '12.4k', growth: '+5%' },
                   { name: 'Alperen Kaymak', username: 'alperen', visits: '8.2k', growth: '+12%' },
                   { name: 'Metehan G.', username: 'metehan', visits: '5.1k', growth: '+2%' },
                   { name: 'MythX Gamer', username: 'mythx', visits: '4.8k', growth: '-1%' },
                   { name: 'Sistem Admin', username: 'admin', visits: '3.2k', growth: '+15%' },
                 ].map((user, i) => (
                   <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-white/5 hover:border-blue-500/30 transition-all group">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 rounded-xl bg-blue-500/10 p-0.5">
                            <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} className="w-full h-full rounded-[9px] object-cover" alt="" />
                         </div>
                         <div>
                            <h4 className="text-xs font-black uppercase tracking-tight group-hover:text-blue-500 transition-colors">{user.name}</h4>
                            <p className="text-[9px] font-bold text-armoyu-text-muted italic">@{user.username}</p>
                         </div>
                      </div>
                      <div className="flex items-center gap-6">
                         <div className="text-right">
                            <span className="block text-xs font-black text-armoyu-text">{user.visits}</span>
                            <span className={`text-[8px] font-black uppercase ${user.growth.startsWith('+') ? 'text-emerald-500' : 'text-red-500'}`}>{user.growth}</span>
                         </div>
                         <a 
                           href={`/profil/${user.username}`} 
                           target="_blank" 
                           rel="noopener noreferrer"
                           className="p-2 bg-blue-500/10 text-blue-500 rounded-lg hover:bg-blue-500 hover:text-white transition-all"
                         >
                            <ExternalLink size={14} />
                         </a>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};
