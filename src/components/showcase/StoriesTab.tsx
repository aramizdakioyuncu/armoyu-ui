'use client';

import React from 'react';
import { Stories } from '../../index';

export function StoriesTab() {
  return (
    <div className="max-w-2xl mx-auto space-y-8 animate-in fade-in duration-700">
      <div className="bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/5">
        <h2 className="text-2xl font-black text-white uppercase tracking-tight italic mb-2">HİKAYE MODÜLÜ</h2>
        <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">
          Kullanıcı hikayelerini, geçiş efektlerini ve etkileşimleri test et.
        </p>
      </div>

      <div className="glass-panel p-1 rounded-[2.5rem] overflow-hidden">
        <Stories />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
          <h4 className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-3">HİKAYE OLUŞTURMA</h4>
          <p className="text-xs text-armoyu-text-muted leading-relaxed">
            API entegrasyonu tamamlandığında buradan yeni hikaye paylaşımı yapılabilecek.
          </p>
        </div>
        <div className="bg-black/20 p-6 rounded-3xl border border-white/5">
          <h4 className="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-3">İSTATİSTİKLER</h4>
          <p className="text-xs text-armoyu-text-muted leading-relaxed">
            Hikaye izlenme ve etkileşim verileri burada görüntülenecek.
          </p>
        </div>
      </div>
    </div>
  );
}
