'use client';

import React from 'react';

export function ForumSidebar() {
   return (
      <div className="space-y-10">
         {/* Search */}
         <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
            <h4 className="text-xs font-black text-armoyu-text mb-4 uppercase tracking-widest">FORUMDA ARA</h4>
            <div className="relative">
               <input type="text" placeholder="Kelime yazın..." className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-xl px-4 py-3 text-sm font-bold focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all" />
               <svg className="absolute right-4 top-1/2 -translate-y-1/2 opacity-50" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
         </div>

         {/* Stats */}
         <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
            <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">İSTATİSTİKLER</h4>
            <div className="space-y-6">
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-armoyu-text-muted">Toplam Üye</span>
                  <span className="text-lg font-black text-armoyu-text">1,240</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-armoyu-text-muted">Toplam Konu</span>
                  <span className="text-lg font-black text-armoyu-text">5,432</span>
               </div>
               <div className="flex items-center justify-between">
                  <span className="text-sm font-bold text-armoyu-text-muted">Toplam Mesaj</span>
                  <span className="text-lg font-black text-armoyu-text">42,850</span>
               </div>
            </div>
            <div className="mt-8 pt-6 border-t border-armoyu-card-border">
               <p className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-4">Yeni Kayıt</p>
               <div className="flex items-center gap-3">
                  <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=New" className="w-8 h-8 rounded-full" />
                  <span className="text-sm font-bold text-armoyu-text">YeniOyuncu2024</span>
               </div>
            </div>
         </div>

         {/* Online Members */}
         <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
            <h4 className="text-xs font-black text-armoyu-text mb-6 uppercase tracking-widest">ÇEVRİMİÇİ ÜYELER (124)</h4>
            <div className="flex flex-wrap gap-2">
               {[...Array(12)].map((_, i) => (
                 <img key={i} title={`Kullanıcı ${i}`} src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} className="w-8 h-8 rounded-full border border-armoyu-card-border hover:scale-110 transition-transform cursor-pointer" />
               ))}
            </div>
         </div>
      </div>
   );
}
