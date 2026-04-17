'use client';

import React, { useState, useMemo } from 'react';
import { 
  StoreLayout,
  DetailLayout,
  StoreSidebar,
  StoreHeader, 
  ProductCard, 
  MOCK_PRODUCTS,
  StoreTrustBadges
} from '../../index';
import { Product } from '../../models/shop/Product';

export function ShopTab() {
  const [activeCategory, setActiveCategory] = useState('Tüm Ürünler');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const categories = ['Tüm Ürünler', 'Üyelik & VIP', 'Oyun İçi Paralar', 'Minecraft Eşyaları', 'Lisanslı Giyim', 'Dijital Kodlar'];

  const filteredProducts = useMemo(() => {
    let filtered = MOCK_PRODUCTS;
    if (activeCategory !== 'Tüm Ürünler') {
      const categoryMap: Record<string, string> = {
        'Üyelik & VIP': 'Üyelik',
        'Oyun İçi Paralar': 'Oyun İçi',
        'Minecraft Eşyaları': 'Oyun İçi',
        'Lisanslı Giyim': 'Giyim'
      };
      const searchCat = categoryMap[activeCategory] || activeCategory;
      filtered = filtered.filter((p: Product) => p.category === searchCat);
    }
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      filtered = filtered.filter((p: Product) =>
        p.name.toLowerCase().includes(query) ||
        p.category.toLowerCase().includes(query)
      );
    }
    return filtered;
  }, [activeCategory, searchQuery]);

  return (
    <StoreLayout 
      sidebar={
        <StoreSidebar 
          activeCategory={activeCategory} 
          setActiveCategory={setActiveCategory} 
          categories={categories} 
        />
      }
    >
      {selectedProduct ? (
        <DetailLayout 
          product={selectedProduct} 
          onBack={() => setSelectedProduct(null)} 
        />
      ) : (
        <div className="space-y-12">
          <StoreHeader searchQuery={searchQuery} setSearchQuery={setSearchQuery} />

          <div className="space-y-12">
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(product => (
                  <div key={product.id} className="cursor-pointer" onClick={(e) => { e.preventDefault(); setSelectedProduct(Product.fromAPI(product)); }}>
                    <ProductCard product={Product.fromAPI(product)} href="#" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="glass-panel p-20 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 border border-white/5">
                <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-armoyu-text-muted opacity-20">
                  <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                </div>
                <h4 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic">Ürün Bulunamadı</h4>
                <p className="text-sm text-armoyu-text-muted max-w-xs">Aramanıza uygun ürün bulunamadı. Lütfen filtreleri kontrol edin.</p>
                <button 
                  onClick={() => {setActiveCategory('Tüm Ürünler'); setSearchQuery('');}}
                  className="px-6 py-3 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20"
                >
                  FİLTRELERİ SIFIRLA
                </button>
              </div>
            )}

            <StoreTrustBadges />
          </div>
        </div>
      )}
    </StoreLayout>
  );
}
