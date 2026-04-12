'use client';

import React from 'react';

interface ProfileCloudWidgetProps {
  onManageCloud: () => void;
}

export function ProfileCloudWidget({ onManageCloud }: ProfileCloudWidgetProps) {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-black text-armoyu-text flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
          ARMOYU Cloud
        </h3>
        <span className="text-xs font-bold text-armoyu-text-muted">48%</span>
      </div>

      <div className="w-full h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden mb-3 shadow-inner">
        <div className="w-[48%] h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.6)]"></div>
      </div>

      <p className="text-xs font-medium text-armoyu-text-muted mb-4">
        5 GB alanın <span className="font-bold text-armoyu-text">2.4 GB</span> kadarı hesaba yedeklendi.
      </p>

      <button
        onClick={onManageCloud}
        className="w-full py-2.5 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-500/10 hover:bg-blue-500/20 rounded-xl transition-colors border border-blue-500/10"
      >
        Depolamayı Yönet
      </button>
    </div>
  );
}
