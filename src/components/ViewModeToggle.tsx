'use client';

import React from 'react';

export type ViewMode = 'grid' | 'table';

interface ViewModeToggleProps {
  mode: ViewMode;
  onChange: (mode: ViewMode) => void;
}

export function ViewModeToggle({ mode, onChange }: ViewModeToggleProps) {
  return (
    <div className="flex bg-black/5 dark:bg-white/5 p-1 rounded-2xl border border-black/5 dark:border-white/5 shadow-inner">
      <button
        onClick={() => onChange('grid')}
        className={`p-2.5 rounded-xl transition-all ${
          mode === 'grid' 
          ? 'bg-white dark:bg-armoyu-primary text-armoyu-primary dark:text-white shadow-lg' 
          : 'text-gray-400 hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        title="Izgara Görünümü"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
      </button>
      <button
        onClick={() => onChange('table')}
        className={`p-2.5 rounded-xl transition-all ${
          mode === 'table' 
          ? 'bg-white dark:bg-armoyu-primary text-armoyu-primary dark:text-white shadow-lg' 
          : 'text-gray-400 hover:text-white hover:bg-black/5 dark:hover:bg-white/5'
        }`}
        title="Tablo Görünümü"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="8" y1="6" x2="21" y2="6"></line><line x1="8" y1="12" x2="21" y2="12"></line><line x1="8" y1="18" x2="21" y2="18"></line><line x1="3" y1="6" x2="3.01" y2="6"></line><line x1="3" y1="12" x2="3.01" y2="12"></line><line x1="3" y1="18" x2="3.01" y2="18"></line></svg>
      </button>
    </div>
  );
}
