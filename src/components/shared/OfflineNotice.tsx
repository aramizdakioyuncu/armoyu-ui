'use client';

import React from 'react';
import { WifiOff } from 'lucide-react';

/** Önbellekten gösterilen listenin üstünde: "Çevrimdışı · son güncelleme 14:32" */
export function OfflineNotice({ at, className = '' }: { at: number | null; className?: string }) {
  if (!at) return null;
  const time = new Date(at).toLocaleString('tr-TR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' });
  return (
    <div role="status" className={`flex items-center gap-2 px-4 py-2 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-xs font-bold ${className}`}>
      <WifiOff size={14} /> Çevrimdışı · son güncelleme {time}
    </div>
  );
}
