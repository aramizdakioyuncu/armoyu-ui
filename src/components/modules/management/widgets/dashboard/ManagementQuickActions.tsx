import React from 'react';
import Link from 'next/link';
import { AlertCircle } from 'lucide-react';

export interface QuickActionItem {
  name: string;
  path: string;
  color: string;
}

export const ManagementQuickActions = ({ 
  actions, 
  pendingCount = 0 
}: { 
  actions: QuickActionItem[], 
  pendingCount?: number 
}) => {
  return (
    <div className="bg-white dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-[32px] p-6 space-y-4 shadow-sm">
      <div className="flex items-center justify-between mb-2">
         <h4 className="font-black uppercase tracking-widest text-[10px] text-armoyu-text-muted px-2">Hızlı İşlemler</h4>
         {pendingCount > 0 && (
            <div className="flex items-center gap-1.5 px-2 py-1 bg-amber-500/10 text-amber-500 rounded-lg animate-pulse">
               <AlertCircle size={12} />
               <span className="text-[9px] font-black uppercase tracking-widest">{pendingCount} Bekleyen Onay</span>
            </div>
         )}
      </div>
      <div className="grid grid-cols-2 gap-3">
         {actions.map(action => (
            <Link 
              key={action.name} 
              href={action.path}
              className={`px-2 py-4 rounded-[24px] ${action.color} border border-transparent transition-all text-[10px] font-black uppercase text-center active:scale-95 hover:shadow-lg flex flex-col items-center justify-center italic leading-none`}
            >
               {action.name}
            </Link>
         ))}
      </div>
    </div>
  );
};
