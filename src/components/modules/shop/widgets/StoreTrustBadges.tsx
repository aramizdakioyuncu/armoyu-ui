'use client';

import React from 'react';
import { ShieldCheck, Zap, CreditCard, Headphones } from 'lucide-react';

export function StoreTrustBadges() {
  const badges = [
    {
      icon: <ShieldCheck size={28} className="text-armoyu-primary" />,
      title: 'GÜVENLİ ÖDEME',
      desc: '256-bit SSL şifreleme ile ödemeleriniz her zaman güvende.'
    },
    {
      icon: <Zap size={28} className="text-yellow-500" />,
      title: 'HIZLI TESLİMAT',
      desc: 'Dijital ürünleriniz satın alım sonrası anında teslim edilir.'
    },
    {
      icon: <CreditCard size={28} className="text-emerald-500" />,
      title: 'TAKSİT İMKANI',
      desc: 'Seçili kartlara vade farksız taksit seçenekleri.'
    },
    {
      icon: <Headphones size={28} className="text-purple-500" />,
      title: '7/24 DESTEK',
      desc: 'Olası tüm sorunlarınız için destek ekibimiz yanınızda.'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-20 pt-12 border-t border-white/5 animate-in fade-in slide-in-from-bottom-8 duration-1000">
      {badges.map((badge, idx) => (
        <div 
          key={idx} 
          className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg hover:border-white/10 transition-all group flex flex-col items-center text-center"
        >
          <div className="w-16 h-16 rounded-2xl bg-black/10 dark:bg-white/5 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
            {badge.icon}
          </div>
          <h4 className="text-xs font-black text-armoyu-text uppercase tracking-widest mb-2 italic">{badge.title}</h4>
          <p className="text-[11px] font-medium text-armoyu-text-muted leading-relaxed uppercase opacity-70">
            {badge.desc}
          </p>
        </div>
      ))}
    </div>
  );
}
