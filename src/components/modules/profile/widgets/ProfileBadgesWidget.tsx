'use client';

import React from 'react';

export function ProfileBadgesWidget() {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm hidden lg:block">
      <h3 className="text-lg font-black text-armoyu-text mb-4">Rozetler</h3>
      <div className="flex flex-wrap gap-2">
        <span className="bg-red-500/10 text-red-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-red-500/20">Kurucu</span>
        <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-emerald-500/20">5 Yıllık Üye</span>
        <span className="bg-purple-500/10 text-purple-500 text-xs font-bold px-3 py-1.5 rounded-xl border border-purple-500/20">Turnuva Şampiyonu</span>
        <span className="bg-yellow-500/10 text-yellow-600 dark:text-yellow-400 text-xs font-bold px-3 py-1.5 rounded-xl border border-yellow-500/20">Premium</span>
      </div>
    </div>
  );
}
