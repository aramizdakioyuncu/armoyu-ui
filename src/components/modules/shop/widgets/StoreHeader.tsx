'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';

export interface StoreHeaderProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

export function StoreHeader({ searchQuery, setSearchQuery }: StoreHeaderProps) {
  const { totalItems } = useCart();

  return (
    <div className="mb-12 space-y-8 animate-in fade-in slide-in-from-top-4 duration-500">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="flex-1">
          <p className="text-armoyu-text-muted text-lg max-w-2xl font-medium leading-relaxed opacity-80 mb-2">
            Oyun deneyimini bir üst seviyeye taşı. Özel üyelikler ve lisanslı ürünler burada.
          </p>
        </div>

        {/* Modular Header Controls */}
        <div className="flex items-center gap-4 shrink-0">
          {/* Search Bar */}
          <div className="relative group flex-1 md:w-80">
            <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <input 
              type="text" 
              placeholder="Ürün ara..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-white/5 dark:bg-black/20 border border-black/10 dark:border-white/10 rounded-2xl pl-12 pr-4 py-4 text-sm font-bold text-armoyu-text placeholder:text-armoyu-text-muted focus:outline-none focus:border-armoyu-primary focus:ring-4 focus:ring-armoyu-primary/10 transition-all shadow-inner"
            />
          </div>

          {/* My Orders Link */}
          <Link href="/magaza/siparislerim" className="p-4 bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-armoyu-text hover:text-armoyu-primary rounded-2xl transition-all group flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"></path><path d="M3 6h18"></path><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
            <span className="text-[10px] font-black uppercase tracking-widest hidden sm:block">Siparişlerim</span>
          </Link>

          {/* Cart Icon with Badge */}
          <Link href="/magaza/sepet" className="relative p-4 bg-armoyu-primary hover:bg-armoyu-primary text-white rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95 group overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
            
            {totalItems > 0 && (
              <span className="absolute top-2 right-2 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white ring-2 ring-armoyu-primary animate-in zoom-in duration-300">
                {totalItems}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Quick Stats / Info under header */}
      <div className="flex flex-wrap gap-4 pt-4">
        <div className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl flex items-center gap-2">
           <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)] animate-pulse" />
           <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Sistem Aktif</span>
        </div>
        <div className="px-4 py-2 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 rounded-xl flex items-center gap-2">
           <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-armoyu-primary"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
           <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">12.4K Aktif Müşteri</span>
        </div>
      </div>
    </div>
  );
}
