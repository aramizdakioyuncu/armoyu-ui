'use client';

import React from 'react';
import { SearchBar } from './SearchBar';
import { FilterTabs } from './FilterTabs';
import { ViewModeToggle, type ViewMode } from '../ViewModeToggle';

export interface ListToolbarProps {
  /** Başlık (opsiyonel) */
  title?: string;
  /** Alt başlık (opsiyonel) */
  subtitle?: string;

  /** Filtre sekmeleri (opsiyonel) */
  tabs?: string[];
  activeTab?: string;
  onTabChange?: (tab: string) => void;
  tabVariant?: 'pill' | 'underline';
  tabCounts?: Record<string, number>;

  /** Arama (opsiyonel) */
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchSize?: 'sm' | 'md' | 'lg';

  /** Görünüm modu toggle (opsiyonel) */
  viewMode?: ViewMode;
  onViewModeChange?: (mode: ViewMode) => void;

  /** Sağ tarafa eklenecek özel elemanlar */
  actions?: React.ReactNode;

  /** Sonuç sayısı göstergesi (opsiyonel) */
  resultCount?: number;

  /** Görünüm modunu tamamen gizle (opsiyonel) */
  hideViewMode?: boolean;

  /** Ek CSS sınıfları */
  className?: string;
}

export function ListToolbar({
  title,
  subtitle,
  tabs,
  activeTab,
  onTabChange,
  tabVariant = 'pill',
  tabCounts,
  searchPlaceholder = 'Ara...',
  searchValue,
  onSearchChange,
  searchSize = 'md',
  viewMode,
  onViewModeChange,
  actions,
  resultCount,
  hideViewMode = false,
  className = '',
}: ListToolbarProps) {
  const hasSearch = searchValue !== undefined && onSearchChange !== undefined;
  const hasTabs = tabs && activeTab !== undefined && onTabChange;
  const hasViewToggle = !hideViewMode && viewMode !== undefined && onViewModeChange !== undefined;
  const hasTitle = title || subtitle;

  return (
    <div className={`space-y-6 mb-12 ${className}`}>
      {/* Başlık */}
      {hasTitle && (
        <div className="text-center lg:text-left">
          {title && (
            <h1 className="text-4xl md:text-5xl font-black text-armoyu-text mb-4 tracking-tighter">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-armoyu-text-muted text-lg font-medium max-w-2xl">
              {subtitle}
            </p>
          )}
        </div>
      )}

      {/* Toolbar satırı */}
      {(hasTabs || hasSearch || hasViewToggle || actions) && (
        <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
          {/* Sol: Filtre tabları */}
          {hasTabs && (
            <FilterTabs
              tabs={tabs}
              active={activeTab!}
              onChange={onTabChange!}
              variant={tabVariant}
              counts={tabCounts}
            />
          )}

          {/* Sağ: Arama + View Toggle + Actions */}
          <div className="flex items-center gap-3 w-full md:w-auto">
            {hasSearch && (
              <SearchBar
                placeholder={searchPlaceholder}
                value={searchValue!}
                onChange={onSearchChange!}
                size={searchSize}
              />
            )}

            {hasViewToggle && (
              <ViewModeToggle mode={viewMode!} onChange={onViewModeChange!} />
            )}

            {actions}
          </div>
        </div>
      )}

      {/* Sonuç sayısı */}
      {resultCount !== undefined && (
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-armoyu-text-muted">
            {resultCount} sonuç bulundu
          </span>
          {hasSearch && searchValue && (
            <span className="text-xs font-black text-armoyu-primary bg-armoyu-primary/10 px-2 py-0.5 rounded-md">
              "{searchValue}"
            </span>
          )}
        </div>
      )}
    </div>
  );
}
