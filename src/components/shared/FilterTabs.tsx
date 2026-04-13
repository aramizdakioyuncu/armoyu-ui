'use client';

import React from 'react';

export interface FilterTabsProps {
  /** Sekme isimleri listesi */
  tabs: string[];
  /** Aktif olan tab */
  active: string;
  /** Tab değiştiğinde tetiklenir */
  onChange: (tab: string) => void;
  /** Görsel varyant */
  variant?: 'pill' | 'underline';
  /** Her tab'ın yanında gösterilecek sayılar (opsiyonel) */
  counts?: Record<string, number>;
  /** Ek CSS sınıfları */
  className?: string;
}

export function FilterTabs({
  tabs,
  active,
  onChange,
  variant = 'pill',
  counts,
  className = '',
}: FilterTabsProps) {
  if (variant === 'underline') {
    return (
      <div className={`flex border-b border-armoyu-card-border overflow-x-auto no-scrollbar ${className}`}>
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => onChange(tab)}
            className={`px-5 py-3 text-xs font-black uppercase tracking-widest transition-all relative shrink-0 ${
              active === tab
                ? 'text-blue-500'
                : 'text-armoyu-text-muted hover:text-armoyu-text'
            }`}
          >
            <span className="flex items-center gap-2">
              {tab}
              {counts?.[tab] !== undefined && (
                <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                  active === tab
                    ? 'bg-blue-500/10 text-blue-500'
                    : 'bg-black/5 dark:bg-white/5 text-armoyu-text-muted'
                }`}>
                  {counts[tab]}
                </span>
              )}
            </span>
            {active === tab && (
              <div className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-500 rounded-full" />
            )}
          </button>
        ))}
      </div>
    );
  }

  // Pill variant (varsayılan)
  return (
    <div className={`flex bg-black/5 dark:bg-white/5 p-1.5 rounded-2xl border border-black/5 dark:border-white/5 overflow-x-auto no-scrollbar max-w-full ${className}`}>
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => onChange(tab)}
          className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all shrink-0 ${
            active === tab
              ? 'bg-white dark:bg-blue-600 text-blue-600 dark:text-white shadow-xl'
              : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
          }`}
        >
          <span className="flex items-center gap-2">
            {tab}
            {counts?.[tab] !== undefined && (
              <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-black ${
                active === tab
                  ? 'bg-blue-600/20 dark:bg-white/20'
                  : 'bg-black/10 dark:bg-white/10'
              }`}>
                {counts[tab]}
              </span>
            )}
          </span>
        </button>
      ))}
    </div>
  );
}
