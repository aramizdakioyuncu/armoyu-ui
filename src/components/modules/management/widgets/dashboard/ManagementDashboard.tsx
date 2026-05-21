import React from 'react';
import { Plus } from 'lucide-react';
import { ManagementHeader } from './ManagementHeader';
import { ManagementStatsGrid, StatItem } from './ManagementStatsGrid';
import { ManagementActivityFeed, ActivityItem } from './ManagementActivityFeed';
import { ManagementQuickActions, QuickActionItem } from './ManagementQuickActions';
import { ManagementCharts, ChartDataPoint } from './ManagementCharts';
import { Shield, Users as UsersIcon, Edit3, Heart, Gamepad2 } from 'lucide-react';

export interface ManagementTab {
  id: string;
  label: string;
  icon?: React.ReactNode;
  content: React.ReactNode;
}

export interface ManagementDashboardProps {
  title?: React.ReactNode;
  subtitle?: string;
  stats?: StatItem[];
  activities?: ActivityItem[];
  quickActions?: QuickActionItem[];
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
  tabs?: ManagementTab[];
  activeTabId?: string;
  onTabChange?: (id: string) => void;
  children?: React.ReactNode;
}

export const ManagementDashboard = ({
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
  tabs = [],
  activeTabId,
  onTabChange,
  children
}: ManagementDashboardProps) => {
  const [localActiveTab, setLocalActiveTab] = React.useState(activeTabId || (tabs.length > 0 ? tabs[0].id : 'general'));
  
  const currentTabId = activeTabId || localActiveTab;
  
  const handleTabClick = (id: string) => {
    setLocalActiveTab(id);
    if (onTabChange) onTabChange(id);
  };

  const activeTabContent = tabs.find(t => t.id === currentTabId)?.content;

  const renderDefaultDashboard = () => (
    <div className="space-y-8 animate-in fade-in duration-700">
      <ManagementHeader 
        title={title}
        subtitle={subtitle}
        actions={
          <div className="flex gap-2">
            {onNewContentClick && (
              <button onClick={onNewContentClick} className="px-4 py-2 bg-armoyu-primary text-white text-xs font-bold rounded-xl flex items-center gap-2">
                <Plus size={16} /> Yeni İçerik
              </button>
            )}
          </div>
        }
      />
      {stats && stats.length > 0 && <ManagementStatsGrid stats={stats} />}
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 space-y-8">
          <ManagementCharts memberData={memberData} eventData={eventData} reportData={reportData} />
          {activities && activities.length > 0 && <ManagementActivityFeed activities={activities} />}
        </div>
        <div className="lg:col-span-4">
          {quickActions && quickActions.length > 0 && <ManagementQuickActions actions={quickActions} />}
        </div>
      </div>
    </div>
  );

  return (
    <div className="relative text-left leading-none">
      <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
         {activeTabContent || children || renderDefaultDashboard()}
      </div>
    </div>
  );
};
