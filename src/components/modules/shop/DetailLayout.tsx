'use client';

import React, { useState } from 'react';
import { Product } from '@armoyu/core';
import { ChevronLeft, ShoppingCart, ShieldCheck, Zap, Minus, Plus } from 'lucide-react';
import { StoreTrustBadges } from './widgets/StoreTrustBadges';
import { ProductCard } from './widgets/ProductCard';
import { MOCK_PRODUCTS } from '../../../lib/constants/seedData';

interface DetailLayoutProps {
  product: Product;
  onBack: () => void;
}

export function DetailLayout({ product, onBack }: DetailLayoutProps) {
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  const tabs = [
    { id: 'description', label: 'ÖZELLİKLER' },
    { id: 'usage', label: 'NASIL KULLANILIR?' },
    { id: 'faq', label: 'SIKÇA SORULANLAR' }
  ];

  return (
    <div className="animate-in fade-in slide-in-from-right-8 duration-700">
      
      {/* Back Button Area */}
      <div className="mb-8">
        <button 
          onClick={onBack}
          className="flex items-center gap-2 text-armoyu-text-muted hover:text-blue-500 transition-colors group"
        >
          <div className="p-2 border border-white/5 bg-white/5 rounded-xl group-hover:bg-blue-600 group-hover:text-white transition-all shadow-lg">
            <ChevronLeft size={16} />
          </div>
          <span className="text-[10px] font-black uppercase tracking-widest italic opacity-60 group-hover:opacity-100">Geri Dön</span>
        </button>
      </div>

      <div className="flex flex-col xl:flex-row gap-12 items-start">
        
        {/* Left: Product Visuals */}
        <div className="w-full xl:w-[380px] shrink-0 space-y-6">
          <div className="relative aspect-video rounded-[40px] overflow-hidden border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl group">
             <img 
               src={product.image} 
               alt={product.name} 
               className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000" 
             />
             {product.badge && (
               <div className="absolute top-8 left-8 px-5 py-2 bg-blue-600 text-white text-[9px] font-black uppercase tracking-widest rounded-full shadow-2xl shadow-blue-500/40 animate-in fade-in zoom-in duration-500">
                  {product.badge}
               </div>
             )}
          </div>
          
          <div className="flex gap-4">
             {[0, 1, 2].map(i => (
               <div key={i} className={`flex-1 aspect-square rounded-[20px] overflow-hidden border-2 transition-all cursor-pointer ${i === 0 ? 'border-blue-500' : 'border-white/5 hover:border-white/20'}`}>
                  <img src={product.image} className={`w-full h-full object-cover ${i === 0 ? 'opacity-100' : 'opacity-40 hover:opacity-100'}`} alt="Thumb" />
               </div>
             ))}
          </div>
        </div>

        {/* Right: Product Info */}
        <div className="flex-1 space-y-8 py-2 min-w-0">
          <div className="space-y-3">
            <span className="text-blue-500 font-black text-[10px] uppercase tracking-widest bg-blue-500/10 px-3 py-1.5 rounded-lg border border-blue-500/20 w-fit block">
              {product.category}
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight">
              {product.name}
            </h1>
          </div>

          <div className="flex flex-wrap items-center gap-6 border-b border-white/5 pb-8">
            <div className="flex flex-col">
               <span className="text-armoyu-text-muted text-[10px] font-black uppercase tracking-[0.2em] mb-1">Fiyat (KDV Dahil)</span>
               <span className="text-4xl font-black text-armoyu-text">{formatPrice(product.price)}</span>
            </div>
            <div className="px-5 py-2.5 bg-emerald-500/10 text-emerald-500 rounded-2xl text-[9px] font-black uppercase tracking-widest border border-emerald-500/20 h-fit">
               STOKTA VAR
            </div>
          </div>

          <div className="space-y-8">
            <p className="text-armoyu-text-muted text-base font-medium leading-relaxed max-w-2xl opacity-80">
              {product.description}
            </p>

            <div className="flex flex-wrap gap-4 pt-2">
              {/* Quantity Selector */}
              <div className="flex items-center gap-4 bg-black/20 p-1.5 rounded-2xl border border-white/10 w-fit shadow-inner">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-armoyu-text transition-all active:scale-90"
                >
                  <Minus size={16} strokeWidth={3} />
                </button>
                <span className="text-lg font-black text-armoyu-text w-6 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-white/10 text-armoyu-text transition-all active:scale-90" 
                >
                  <Plus size={16} strokeWidth={3} />
                </button>
              </div>

              {/* Add to Cart Button */}
              <button className="flex-1 min-w-[200px] h-[58px] bg-blue-600 hover:bg-blue-500 text-white flex items-center justify-center gap-3 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all shadow-[0_20px_40px_rgba(37,99,235,0.25)] active:scale-95 group">
                <ShoppingCart size={18} strokeWidth={2.5} className="group-hover:-translate-y-1 transition-transform" />
                SEPETE EKLE
              </button>
            </div>
          </div>

          {/* Quick Features Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="flex items-center gap-4 p-4 bg-black/10 rounded-3xl border border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="p-3 bg-blue-500/10 text-blue-500 rounded-2xl group-hover:bg-blue-600 group-hover:text-white transition-all">
                   <ShieldCheck size={20} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase text-armoyu-text-muted">Güvenlik</span>
                   <span className="text-[11px] font-black uppercase text-armoyu-text">GÜVENLİ ÖDEME</span>
                </div>
             </div>
             <div className="flex items-center gap-4 p-4 bg-black/10 rounded-3xl border border-white/5 group hover:border-emerald-500/30 transition-all">
                <div className="p-3 bg-emerald-500/10 text-emerald-500 rounded-2xl group-hover:bg-emerald-600 group-hover:text-white transition-all">
                   <Zap size={20} />
                </div>
                <div className="flex flex-col">
                   <span className="text-[8px] font-black uppercase text-armoyu-text-muted">Hız</span>
                   <span className="text-[11px] font-black uppercase text-armoyu-text">ANINDA AKTİVASYON</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Product Information Tabs */}
      <div className="mt-16 border-t border-white/5 pt-10">
        <div className="flex gap-8 mb-8 border-b border-white/5 scrollbar-hide overflow-x-auto">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`text-[9px] font-black uppercase tracking-[0.2em] pb-4 transition-all relative whitespace-nowrap italic ${
                activeTab === tab.id ? 'text-armoyu-text' : 'text-armoyu-text-muted opacity-40 hover:opacity-100'
              }`}
            >
              {tab.label}
              {activeTab === tab.id && (
                <div className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-blue-600 rounded-full animate-in slide-in-from-left-4 duration-500" />
              )}
            </button>
          ))}
        </div>
        
        <div className="max-w-3xl animate-in fade-in duration-500">
           <p className="text-armoyu-text-muted text-base leading-relaxed font-medium opacity-80">
             {activeTab === 'description' && `Bu ürün ${product.name} kategorisi altında en çok tercih edilen seçeneklerden biridir. Dijital varlık olarak anında teslim edilir ve profiliniz üzerinde aktifleşir. ${product.description}`}
             {activeTab === 'usage' && 'Satın alma tamamlandığında tarafınıza bir aktivasyon kodu iletilecektir. Bu kodu "Profil > Envanter > Kod Kullan" alanından aktif edebilirsiniz.'}
             {activeTab === 'faq' && 'Ürün iadesi dijital içeriklerde teslimat sonrası yapılamamaktadır. Teknik sorunlarda destek ekibimizle iletişime geçebilirsiniz.'}
           </p>
        </div>
      </div>

      {/* Trust & Verification Badges */}
      <div className="mt-12 scale-90 origin-left">
        <StoreTrustBadges />
      </div>

      {/* Similar Products Recommendation Filter */}
      <div className="mt-20">
        <h2 className="text-xl font-black text-armoyu-text uppercase tracking-widest mb-8 italic border-l-4 border-blue-600 pl-4">SİZİN İÇİN <span className="text-blue-500">SEÇTİKLERİMİZ</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {MOCK_PRODUCTS.slice(0, 3).map((p: any) => (
            <div key={p.id}>
               <ProductCard product={Product.fromJSON(p)} href="#" />
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
