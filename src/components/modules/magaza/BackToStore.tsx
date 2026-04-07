'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useCart } from '../../../context/CartContext';

export function BackToStore() {
  const [searchQuery, setSearchQuery] = useState('');
  const { totalItems } = useCart();

  return (
    <div className="mb-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6 animate-in fade-in slide-in-from-top-4 duration-500 bg-black/5 dark:bg-white/5 p-4 rounded-[32px] border border-black/10 dark:border-white/10 backdrop-blur-md">
      
      {/* Back Button */}
      <Link 
        href="/magaza" 
        className="inline-flex items-center gap-3 px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest group transition-all shadow-xl shadow-blue-500/20 active:scale-95 shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-1.5 transition-transform duration-300">
          <polyline points="15 18 9 12 15 6"></polyline>
        </svg>
        <span>MAĞAZA ANA SAYFA</span>
      </Link>

      <div className="flex items-center gap-4 flex-1 justify-end">
        {/* Compact Search */}
        <div className="relative group max-w-[300px] flex-1">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
          <input 
            type="text" 
            placeholder="Ürün ara..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/10 dark:bg-black/40 border border-transparent focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-armoyu-text placeholder:text-armoyu-text-muted focus:outline-none transition-all"
          />
        </div>

        {/* Cart Link with Badge */}
        <Link href="/magaza/sepet" className="relative p-3 bg-white/10 hover:bg-white/20 text-armoyu-text rounded-xl transition-all active:scale-95 border border-white/5">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          {totalItems > 0 && (
            <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-[10px] font-black text-white ring-2 ring-[#121216]">
              {totalItems}
            </span>
          )}
        </Link>
      </div>

    </div>
  );
}
