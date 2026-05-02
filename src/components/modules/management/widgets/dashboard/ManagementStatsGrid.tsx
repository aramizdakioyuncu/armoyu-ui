import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { RollingNumber } from '../../../../RollingNumber';

export interface StatItem {
  name: string;
  value: string;
  change: string;
  isUp: boolean;
  icon: React.ElementType;
  color: string;
  bg: string;
}

export const ManagementStatsGrid = ({ stats }: { stats: StatItem[] }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat) => (
        <div key={stat.name} className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[32px] p-6 hover:border-armoyu-primary/30 transition-all group overflow-hidden relative shadow-sm">
          <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} blur-[40px] -z-10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity`} />
          <div className="flex items-center justify-between mb-4">
             <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                <stat.icon size={24} />
             </div>
             <div className={`flex items-center gap-1 text-[10px] font-black uppercase tracking-tighter ${stat.isUp ? 'text-armoyu-success' : 'text-armoyu-danger'}`}>
                {stat.isUp ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {stat.change}
             </div>
          </div>
          <div className="text-3xl font-black text-armoyu-text mb-1">
            <RollingNumber value={stat.value} />
          </div>
          <div className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{stat.name}</div>
        </div>
      ))}
    </div>
  );
};
