import React from 'react';
import { ManagementHeader } from './ManagementHeader';
import { ManagementStatsGrid, StatItem } from './ManagementStatsGrid';
import { ManagementActivityFeed, ActivityItem } from './ManagementActivityFeed';
import { ManagementQuickActions, QuickActionItem } from './ManagementQuickActions';
import { ManagementCharts, ChartDataPoint } from './ManagementCharts';
import { Plus } from 'lucide-react';

export interface ManagementOverviewProps {
  title?: React.ReactNode;
  subtitle?: string;
  stats: StatItem[];
  activities: ActivityItem[];
  quickActions: QuickActionItem[];
  pendingCount?: number;
  platformVersion?: string;
  platformStatus?: string;
  memberData?: ChartDataPoint[];
  eventData?: ChartDataPoint[];
  reportData?: {
    open: number;
    closed: number;
    pending: number;
  };
  onNewContentClick?: () => void;
  onUpdateNotesClick?: () => void;
  children?: React.ReactNode;
}

export const ManagementOverview = ({
  title = <>Genel <span className="text-armoyu-primary text-shadow-glow">Bakış</span></>,
  subtitle = "Platformun güncel durumu ve bekleyen görevler.",
  stats,
  activities,
  quickActions,
  pendingCount = 0,
  platformVersion = "ARMOV V3.4",
  platformStatus = "Şu an sistem en güncel sürümde çalışıyor. Herhangi bir sorun tespit edilmedi.",
  memberData = [],
  eventData = [],
  reportData = { open: 0, closed: 0, pending: 0 },
  onNewContentClick,
  onUpdateNotesClick,
  children
}: ManagementOverviewProps) => {
  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      {/* Dashboard Header */}
      <ManagementHeader 
        title={title}
        subtitle={subtitle}
        actions={
          <div className="flex items-center gap-3">
            <button 
              onClick={onNewContentClick}
              className="flex items-center gap-2 px-6 py-3 bg-armoyu-primary hover:opacity-90 text-white font-bold rounded-2xl transition-all shadow-lg shadow-primary/20 active:scale-95 text-xs uppercase tracking-widest leading-none"
            >
              <Plus size={18} /> Yeni İçerik
            </button>
          </div>
        }
      />
      {/* Stats Grid */}
      <ManagementStatsGrid stats={stats} />

      {/* Statistics Charts */}
      {memberData.length > 0 && (
        <ManagementCharts 
          memberData={memberData} 
          eventData={eventData} 
          reportData={reportData} 
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <ManagementActivityFeed 
            activities={activities}
            viewAllHref="/management-panel/logs"
          />
          {children}
        </div>

        {/* Side Panel */}
        <div className="space-y-6 leading-none">
            {/* Platform Version Card */}
            <div className="bg-armoyu-primary rounded-[32px] p-8 shadow-xl shadow-primary/20 relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-[40px] -z-10 rounded-full" />
               <h3 className="text-xl font-black text-white mb-2 uppercase italic leading-tight">
                 Platform Versiyonu <br/> 
                 <span className="text-black/30 tracking-[0.2em]">{platformVersion}</span>
               </h3>
               <p className="text-white/80 text-[11px] mb-6 font-medium leading-relaxed font-bold italic">
                 {platformStatus}
               </p>
               <button 
                 onClick={onUpdateNotesClick}
                 className="w-full py-4 bg-white text-armoyu-primary font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg hover:scale-[1.02] transition-all active:scale-95 italic leading-none"
               >
                Güncelleme Notları
              </button>
           </div>

           <ManagementQuickActions 
             actions={quickActions}
             pendingCount={pendingCount}
           />
        </div>
      </div>
    </div>
  );
};
