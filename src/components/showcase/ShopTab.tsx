'use client';

import React, { useState, useMemo } from 'react';
import { 
  StoreLayout,
  DetailLayout,
  CartLayout,
  CheckoutLayout,
  StoreSidebar,
  StoreHeader, 
  ProductCard, 
  MOCK_PRODUCTS,
  StoreTrustBadges,
  useCart,
  OrdersLayout,
  BackToStore
} from '../../index';
import { Product } from '../../models/shop/Product';

const MOCK_ORDERS = [
  { id: 'AR-2024-812', date: '31 Mart 2024', total: '₺297.48', status: 'Hazırlanıyor', color: '#3b82f6', items: ['Premium VIP Üyelik', '1000 ARMOYU Coin (x2)'] },
  { id: 'AR-2024-754', date: '15 Mart 2024', total: '₺599.00', status: 'Tamamlandı', color: '#10b981', items: ['ARMOYU Kapşonlu (Siyah)'] },
  { id: 'AR-2024-102', date: '02 Ocak 2024', total: '₺89.90', status: 'Tamamlandı', color: '#10b981', items: ['Elite Minecraft Paketi'] }
];

export function ShopTab() {
  const [view, setView] = useState<'store' | 'cart' | 'checkout' | 'orders'>('store');
  const [activeCategory, setActiveCategory] = useState('Tüm Ürünler');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { cart, totalPrice, updateQuantity, removeFromCart, clearCart } = useCart();

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
    <div onClickCapture={(e) => {
      const target = e.target as HTMLElement;
      const link = target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      // Intercept all shop-related links in showcase
      if (href?.startsWith('/magaza')) {
        e.preventDefault();
        e.stopPropagation(); // Stop Next.js router from seeing this
        
        if (href === '/magaza') {
          setSelectedProduct(null);
          setView('store');
        } else if (href === '/magaza/sepet') {
          setView('cart');
        } else if (href === '/magaza/siparislerim') {
          setView('orders');
        } else if (href === '/magaza/odeme') {
          setView('checkout');
        }
      }
    }}>
      <StoreLayout 
        sidebar={
          (view === 'store' && !selectedProduct) ? (
            <StoreSidebar 
              activeCategory={activeCategory} 
              setActiveCategory={setActiveCategory} 
              categories={categories} 
            />
          ) : null
        }
      >
        {selectedProduct ? (
          <DetailLayout 
            product={selectedProduct} 
            onBack={() => setSelectedProduct(null)} 
          />
        ) : (
          <>
            {view === 'store' && (
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

            {view === 'cart' && (
              <CartLayout 
                cart={cart}
                totalPrice={totalPrice}
                onUpdateQuantity={updateQuantity}
                onRemoveFromCart={removeFromCart}
                onCheckout={() => setView('checkout')}
                onBackToStore={() => setView('store')}
              />
            )}

            {view === 'checkout' && (
              <CheckoutLayout 
                onBack={() => setView('cart')}
                onSuccess={() => {}}
                totalAmount={totalPrice}
              />
            )}

            {view === 'orders' && (
              <OrdersLayout 
                orders={MOCK_ORDERS}
                onOrderClick={(id) => console.log('Order clicked:', id)}
              />
            )}
          </>
        )}
      </StoreLayout>
    </div>
  );
}
