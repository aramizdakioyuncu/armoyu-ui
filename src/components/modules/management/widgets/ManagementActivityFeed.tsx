import React from 'react';
import Link from 'next/link';
import { Activity, ArrowRight, ExternalLink } from 'lucide-react';

export interface ActivityItem {
  id: string | number;
  user: {
     name: string;
     avatar?: string;
  };
  action: string;
  target?: string;
  time: string;
  type?: string;
}

export interface ManagementActivityFeedProps {
  activities: ActivityItem[];
  title?: string;
  viewAllHref?: string;
}

export const ManagementActivityFeed = ({ 
  activities, 
  title = 'Sistem Aktiviteleri',
  viewAllHref = '#'
}: ManagementActivityFeedProps) => {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[32px] overflow-hidden shadow-sm">
      <div className="p-6 border-b border-black/5 dark:border-white/5 flex items-center justify-between bg-black/[0.01] dark:bg-white/[0.01]">
        <div className="flex items-center gap-3">
          <Activity size={20} className="text-blue-500" />
          <h3 className="font-black uppercase tracking-widest text-[10px] text-armoyu-text">{title}</h3>
        </div>
        <Link href={viewAllHref} className="text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-text transition-colors uppercase tracking-widest">Tümünü Gör</Link>
      </div>
      <div className="p-2">
        {activities.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group text-left">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 flex items-center justify-center text-xs font-black text-armoyu-text-muted group-hover:text-blue-500 transition-colors uppercase leading-none overflow-hidden">
              {item.user.avatar ? <img src={item.user.avatar} className="w-full h-full object-cover" alt="" /> : item.user.name[0]}
            </div>
            <div className="flex-1 min-w-0">
               <p className="text-sm font-medium text-armoyu-text-muted leading-tight">
                  <span className="font-black text-armoyu-text uppercase italic">{item.user.name}</span> {item.action} 
                  {item.target && <span className="text-blue-500 font-bold ml-1">#{item.target}</span>}
               </p>
               <span className="text-[9px] font-bold text-armoyu-text-muted opacity-50 uppercase tracking-widest italic">{item.time}</span>
            </div>
            <button className="p-2 text-armoyu-text-muted hover:text-armoyu-text transition-colors">
               <ExternalLink size={14} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};
