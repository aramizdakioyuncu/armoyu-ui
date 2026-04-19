'use client';

import React from 'react';
import { Package, Calendar, CheckCircle2, ChevronRight } from 'lucide-react';
import { BackToStore } from './widgets/BackToStore';

interface Order {
  id: string;
  date: string;
  total: string;
  status: string;
  color: string;
  items: string[];
}

interface OrdersLayoutProps {
  orders: Order[];
  onOrderClick?: (orderId: string) => void;
}

export function OrdersLayout({ orders, onOrderClick }: OrdersLayoutProps) {
  return (
    <div className="animate-in fade-in duration-1000">
      <div className="mb-8">
        <BackToStore />
      </div>

      <div className="flex items-center gap-6 mb-12">
        <div className="w-16 h-16 rounded-[24px] bg-blue-600/10 flex items-center justify-center text-blue-600">
          <Package size={32} />
        </div>
        <div>
          <h1 className="text-5xl md:text-7xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">
            SİPARİŞ <span className="text-blue-600">GEÇMİŞİM</span>
          </h1>
          <p className="text-armoyu-text-muted font-medium mt-4">Tüm satın alımlarını buradan takip edebilirsin.</p>
        </div>
      </div>

      <div className="space-y-6">
        {orders.map((order: Order) => (
          <div 
            key={order.id} 
            onClick={() => onOrderClick?.(order.id)}
            className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl hover:shadow-blue-500/5 transition-all group overflow-hidden relative cursor-pointer"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            
            <div className="flex flex-col md:flex-row justify-between gap-8 relative z-10">
               
               <div className="space-y-4">
                  <div className="flex items-center gap-4">
                     <span className="text-lg font-black text-armoyu-text tracking-tight italic">#{order.id}</span>
                     <span 
                       style={{ backgroundColor: `${order.color}20`, color: order.color }}
                       className="px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border border-current transition-all group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]"
                     >
                        {order.status}
                     </span>
                  </div>
                  <div className="flex flex-wrap gap-6 text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-80">
                      <div className="flex items-center gap-2">
                        <Calendar size={14} strokeWidth={2.5} />
                        {order.date}
                      </div>
                      <div className="flex items-center gap-2">
                        <CheckCircle2 size={14} strokeWidth={2.5} />
                        {order.items.length} Ürün
                      </div>
                  </div>
               </div>

               <div className="flex flex-col md:items-end justify-between gap-4">
                  <div className="text-2xl font-black text-armoyu-text">{order.total}</div>
                  <div className="px-8 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text font-black text-[10px] uppercase tracking-widest rounded-xl transition-all border border-white/5 flex items-center gap-2 group/btn">
                     DETAYLARI GÖR
                     <ChevronRight size={14} strokeWidth={3} className="group-hover/btn:translate-x-1 transition-transform" />
                  </div>
               </div>
            </div>

            <div className="mt-8 pt-8 border-t border-white/5 space-y-3">
               {order.items.map((item: string, idx: number) => (
                 <div key={idx} className="flex items-center gap-3 text-[11px] font-bold text-armoyu-text-muted opacity-60">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                    {item}
                 </div>
               ))}
            </div>

            <div className="mt-8 h-1 w-full bg-black/20 dark:bg-white/5 rounded-full overflow-hidden flex">
               <div className={`h-full transition-all duration-1000 ${order.status === 'Tamamlandı' ? 'w-full bg-emerald-500' : 'w-1/3 bg-blue-500 animate-pulse'}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 text-center border-t border-white/5 pt-12">
        <p className="text-armoyu-text-muted text-sm font-medium">Bir sorun mu yaşıyorsun?</p>
        <button className="text-blue-500 font-black text-xs uppercase tracking-widest hover:underline mt-2 inline-block bg-transparent border-none cursor-pointer">
          MÜŞTERİ HİZMETLERİYLE GÖRÜŞ
        </button>
      </div>
    </div>
  );
}
