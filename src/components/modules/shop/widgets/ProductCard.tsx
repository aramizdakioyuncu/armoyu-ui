'use client';

import React from 'react';
import Link from 'next/link';
import { Product } from '../../../../models/shop/Product';

interface ProductCardProps {
  product: Product;
  href?: string;
}

export function ProductCard({ product, href }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  const finalHref = href || `/shop/${product.id}`;

  return (
    <div 
      className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-2xl hover:shadow-blue-500/10 transition-all group overflow-hidden flex flex-col h-full cursor-pointer"
    >
      <div className="aspect-square rounded-2xl overflow-hidden mb-6 relative shrink-0">
        <img 
          src={product.image} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" 
          alt={product.name} 
        />
        <div className="absolute inset-0 bg-blue-600/10 opacity-0 group-hover:opacity-100 transition-opacity" />
        
        {product.badge && (
          <span className="absolute top-4 left-4 px-3 py-1 bg-blue-600 text-white text-[8px] font-black uppercase tracking-widest rounded-full shadow-lg">
            {product.badge}
          </span>
        )}
      </div>

      <div className="flex-1 flex flex-col">
        <span className="text-blue-500 font-black text-[9px] uppercase tracking-widest mb-1 block opacity-70">
          {product.category}
        </span>
        <h3 className="font-black text-armoyu-text uppercase text-sm tracking-tight mb-3 group-hover:text-blue-500 transition-colors line-clamp-2">
          {product.name}
        </h3>
        
        <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
          <span className="text-lg font-black text-armoyu-text">{formatPrice(product.price)}</span>
          <div className="w-8 h-8 rounded-full bg-blue-600/10 flex items-center justify-center text-blue-500 group-hover:bg-blue-600 group-hover:text-white transition-all">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
