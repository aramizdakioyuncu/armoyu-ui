'use client';

import React from 'react';
import Link from 'next/link';

interface StoreProductGridProps {
   filteredProducts: any[];
   addToCart: (product: any) => void;
}

export function StoreProductGrid({ filteredProducts, addToCart }: StoreProductGridProps) {
   const formatPrice = (price: number) => {
      return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
   };

   if (filteredProducts.length === 0) {
      return (
         <div className="w-full flex-1 flex flex-col items-center justify-center p-20 glass-panel rounded-[50px] border border-armoyu-card-border text-center">
            <div className="w-20 h-20 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mb-6">
               <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-armoyu-text-muted"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </div>
            <h3 className="text-2xl font-black text-armoyu-text mb-2 uppercase tracking-tighter">Burası Çok Issız</h3>
            <p className="text-sm font-medium text-armoyu-text-muted">Bu kategoride henüz bir ürün bulunmuyor. Geliştirici ekibimiz burayı yakında dolduracak!</p>
         </div>
      );
   }

   return (
      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-10">
         {filteredProducts.map((product: any) => (
            <div key={product.id} className="group glass-panel rounded-[50px] border border-armoyu-card-border overflow-hidden hover:shadow-2xl transition-all duration-500 bg-armoyu-card-bg flex flex-col">
               <div className="relative h-64 overflow-hidden shrink-0">
                  <img src={product.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={product.name} />
                  <div className="absolute top-6 left-6 flex flex-col gap-2">
                     <span className="px-4 py-2 bg-black/60 backdrop-blur-md text-white text-[9px] font-black uppercase tracking-widest rounded-full border border-white/10 w-fit">
                        {product.category}
                     </span>
                     {product.badge && (
                        <span className="px-4 py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-lg shadow-blue-500/30 w-fit">
                           {product.badge}
                        </span>
                     )}
                  </div>
               </div>

               <div className="p-10 flex-1 flex flex-col">
                  <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight mb-2 group-hover:text-blue-500 transition-colors leading-tight">
                     {product.name}
                  </h3>

                  <div className="mt-4 flex items-baseline gap-2 mb-8">
                     <span className="text-3xl font-black text-armoyu-text">{formatPrice(product.price)}</span>
                     <span className="text-[10px] font-bold text-armoyu-text-muted line-through opacity-50">{formatPrice(product.price * 1.2)}</span>
                  </div>

                  <div className="mt-auto space-y-3">
                     <button
                        onClick={() => addToCart(product)}
                        className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-blue-500/20 active:scale-95 text-center flex items-center justify-center"
                     >
                        SEPETE EKLE
                     </button>
                     <Link href={`/magaza/${product.id}`} className="w-full py-4 bg-black/5 dark:bg-white/5 text-armoyu-text-muted hover:text-armoyu-text font-black text-[9px] uppercase tracking-widest rounded-2xl transition-all border border-transparent hover:border-armoyu-card-border text-center flex items-center justify-center">
                        DETAYLARI GÖR
                     </Link>
                  </div>
               </div>
            </div>
         ))}
      </div>
   );
}
