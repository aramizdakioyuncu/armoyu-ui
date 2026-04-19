'use client';

import React from 'react';
import { ShoppingBag, Trash2, Plus, Minus, CreditCard, ShieldCheck, Ticket } from 'lucide-react';
import { CartItem } from '../../../models/shop/CartItem';
import { Product } from '../../../models/shop/Product';

interface CartLayoutProps {
  cart: CartItem[];
  totalPrice: number;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveFromCart: (productId: string) => void;
  onCheckout: () => void;
  onBackToStore: () => void;
}

import { BackToStore } from './widgets/BackToStore';

export function CartLayout({
  cart,
  totalPrice,
  onUpdateQuantity,
  onRemoveFromCart,
  onCheckout,
  onBackToStore
}: CartLayoutProps) {
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  const subtotal = totalPrice;
  const tax = subtotal * 0.20; // %20 KDV
  const total = subtotal + tax;

  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <BackToStore />
      </div>

      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-[24px] bg-blue-600/10 flex items-center justify-center text-blue-600">
          <ShoppingBag size={32} />
        </div>
        <h1 className="text-5xl md:text-7xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">
          SEPETİM <span className="text-blue-600">({cart.length})</span>
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
        {/* Item List */}
        <div className="lg:col-span-8 space-y-6">
          {cart.map((item) => (
            <div key={item.product.id} className="glass-panel p-8 rounded-[48px] border border-armoyu-card-border bg-armoyu-card-bg flex flex-col sm:flex-row gap-8 items-center group relative overflow-hidden transition-all hover:shadow-2xl hover:shadow-blue-500/5">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/[0.02] to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              
              <div className="relative w-32 h-32 shrink-0 z-10 transition-transform duration-500 group-hover:scale-105">
                <img src={item.product.image} alt={item.product.name} className="w-full h-full rounded-[32px] object-cover border border-white/10 shadow-xl" />
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-blue-600 text-white flex items-center justify-center text-[10px] font-black shadow-lg">
                  {item.quantity}
                </div>
              </div>
              
              <div className="flex-1 min-w-0 z-10 text-center sm:text-left">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest mb-1 block">{item.product.category}</span>
                <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tight truncate italic mb-2">{item.product.name}</h3>
                <p className="text-blue-600 font-black text-xl">{formatPrice(item.product.price)}</p>
              </div>

              <div className="flex items-center gap-6 bg-black/5 dark:bg-white/5 p-3 rounded-[24px] border border-white/5 z-10">
                <button 
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)} 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white text-armoyu-text transition-all active:scale-90"
                >
                  <Minus size={18} strokeWidth={3} />
                </button>
                <span className="text-lg font-black text-armoyu-text w-6 text-center">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)} 
                  className="w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 hover:bg-blue-600 hover:text-white text-armoyu-text transition-all active:scale-90"
                >
                  <Plus size={18} strokeWidth={3} />
                </button>
              </div>

              <button 
                onClick={() => onRemoveFromCart(item.product.id)} 
                className="p-4 text-armoyu-text-muted hover:text-rose-500 hover:bg-rose-500/10 rounded-2xl transition-all z-10 active:scale-90"
              >
                <Trash2 size={24} strokeWidth={2.5} />
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div className="lg:col-span-4 space-y-8">
          <div className="glass-panel p-10 rounded-[56px] border border-armoyu-card-border bg-armoyu-card-bg shadow-2xl shadow-blue-500/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/5 blur-3xl -z-10" />
            
            <div className="flex items-center gap-3 mb-10 border-b border-white/5 pb-6">
              <CreditCard size={20} className="text-blue-500" />
              <h2 className="text-xs font-black text-armoyu-text uppercase tracking-[0.2em]">ÖDEME ÖZETİ</h2>
            </div>
            
            <div className="space-y-5 mb-10">
              <div className="flex justify-between text-sm font-bold text-armoyu-text-muted uppercase tracking-tight">
                <span>ARA TOPLAM</span>
                <span className="text-armoyu-text">{formatPrice(subtotal)}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-armoyu-text-muted uppercase tracking-tight">
                <span>KDV (%20)</span>
                <span className="text-armoyu-text">{formatPrice(tax)}</span>
              </div>
              <div className="pt-6 border-t border-white/5 flex justify-between items-end">
                <div>
                  <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest block mb-1">ÖDENECEK TUTAR</span>
                  <span className="text-3xl font-black text-armoyu-text italic leading-none">{formatPrice(total)}</span>
                </div>
              </div>
            </div>

            <button 
              onClick={onCheckout}
              className="group relative w-full py-6 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs uppercase tracking-[0.2em] rounded-[24px] transition-all shadow-2xl shadow-blue-500/20 text-center block active:scale-95 overflow-hidden"
            >
              <span className="relative z-10">GÜVENLİ ÖDEMEYE GEÇ</span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-shimmer" />
            </button>
            
            <div className="flex items-center justify-center gap-2 mt-8 opacity-40">
              <ShieldCheck size={14} className="text-emerald-500" />
              <p className="text-[9px] text-armoyu-text-muted font-black uppercase tracking-widest text-center">
                256-BIT SSL SECURE PAYMENT
              </p>
            </div>
          </div>
          
          <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg group">
            <div className="flex items-center gap-3 mb-6 opacity-60">
              <Ticket size={18} className="text-blue-500" />
              <span className="text-[10px] font-black text-armoyu-text uppercase tracking-widest">KUPON KODU</span>
            </div>
            <div className="flex gap-2">
              <input 
                type="text" 
                placeholder="KODU BURAYA YAZ" 
                className="flex-1 bg-black/10 dark:bg-white/5 border border-white/5 rounded-2xl px-5 py-4 text-[10px] font-black uppercase tracking-widest focus:outline-none focus:border-blue-500 transition-all placeholder:opacity-30" 
              />
              <button className="px-8 py-4 bg-white/5 hover:bg-blue-600 hover:text-white text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-2xl transition-all border border-white/5 active:scale-95">
                UYGULA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
