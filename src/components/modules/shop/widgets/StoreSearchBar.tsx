import React from 'react';
import Link from 'next/link';
import { useCart } from '../../../../context/CartContext';
import { ShoppingCart } from 'lucide-react';

interface StoreSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  placeholder?: string;
  className?: string;
}

export function StoreSearchBar({ 
  searchQuery, 
  setSearchQuery, 
  placeholder = "Ürün ara...", 
  className = "" 
}: StoreSearchBarProps) {
  const { totalItems } = useCart();

  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <div className="relative group flex-1">
        <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
        </div>
        <input 
          type="text" 
          placeholder={placeholder}
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full bg-black/10 dark:bg-black/40 border border-transparent focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-xs font-bold text-armoyu-text placeholder:text-armoyu-text-muted focus:outline-none transition-all shadow-inner"
        />
      </div>

      <Link href="/magaza/sepet" className="relative p-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-xl transition-all border border-white/5 active:scale-95 group shrink-0">
        <ShoppingCart size={20} strokeWidth={2.5} className="group-hover:text-blue-500 transition-colors" />
        {totalItems > 0 && (
          <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-blue-600 text-[9px] font-black text-white ring-2 ring-armoyu-card-bg animate-in zoom-in duration-300">
            {totalItems}
          </span>
        )}
      </Link>
    </div>
  );
}
