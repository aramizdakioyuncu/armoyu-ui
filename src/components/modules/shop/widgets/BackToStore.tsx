'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { StoreSearchBar } from './StoreSearchBar';
import { Package } from 'lucide-react';

export function BackToStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();

  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500 bg-black/5 dark:bg-white/5 p-4 rounded-[32px] border border-black/10 dark:border-white/10 backdrop-blur-md">
      
      {/* Back Button */}
      <Link 
        href="/magaza" 
        className="inline-flex items-center gap-3 px-6 py-3 bg-armoyu-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest group transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95 shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1.5 transition-transform duration-300">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>MAĞAZA ANA SAYFA</span>
      </Link>

      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* Compact Search (Includes Cart) */}
        <StoreSearchBar 
          searchQuery={searchQuery} 
          setSearchQuery={setSearchQuery} 
          className="max-w-[300px] flex-1"
        />

        {/* Orders Link */}
        <Link href="/magaza/siparislerim" className="relative p-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-xl transition-all active:scale-95 border border-white/5 group shrink-0" title="Siparişlerim">
          <Package size={20} strokeWidth={2.5} className="group-hover:text-armoyu-primary transition-colors" />
        </Link>
      </div>

    </div>
  );
}
