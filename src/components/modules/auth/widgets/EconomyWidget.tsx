'use client';

import React, { useState, useEffect } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';

export function EconomyWidget() {
  const { api } = useArmoyu();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchEconomy() {
      setLoading(true);
      try {
        const stats = await api.siteInfo.getStatistics('ekonomi');
        if (stats) {
          setData(stats);
        }
      } catch (error) {
        console.error('Failed to fetch economy stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEconomy();
  }, [api]);

  // Fallback data if API doesn't return anything yet or fails
  const currencies = (data?.currencies && data.currencies.length > 0) ? data.currencies : [
    { code: 'USD', name: 'Dolar', source: 'Merkez Bankası', price: data?.usd || '32.45', trend: 'up', change: '+0.24%', color: 'emerald' },
    { code: 'EUR', name: 'Euro', source: 'Merkez Bankası', price: '35.12', trend: 'up', change: '+0.15%', color: 'blue' },
    { code: 'AU', name: 'Gram Altın', source: 'Spot Piyasa', price: data?.gold || '2,450', trend: 'down', change: '-0.12%', color: 'yellow' },
    { code: 'AG', name: 'Gümüş', source: 'Spot Piyasa', price: data?.silver || '31.20', trend: 'up', change: '+0.45%', color: 'slate' }
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
      <div className="flex items-center gap-2 mb-4">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-emerald-500"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
         <h3 className="font-extrabold text-armoyu-text text-base">Ekonomi</h3>
      </div>
      
      <div className="space-y-4">
         {currencies.map((c: any, i: number) => (
           <div key={i} className={`flex items-center justify-between p-3 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 ${loading ? 'animate-pulse' : ''}`}>
             <div className="flex items-center gap-2.5">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-xs ${
                  c.color === 'emerald' ? 'bg-emerald-500/10 text-emerald-600' : 
                  c.color === 'yellow' ? 'bg-yellow-500/10 text-yellow-600' : 
                  'bg-slate-400/20 text-slate-500 dark:text-slate-300'
                }`}>
                  {c.code}
                </div>
                <div>
                   <span className="block text-xs font-bold text-armoyu-text">{c.name}</span>
                   <span className="block text-[10px] text-armoyu-text-muted">{c.source}</span>
                </div>
             </div>
             <div className="text-right">
                <span className="block text-sm font-black text-armoyu-text">₺{c.price}</span>
                <span className={`flex items-center justify-end text-[10px] font-bold ${c.trend === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                   <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`mr-0.5 ${c.trend === 'down' ? 'rotate-180' : ''}`}><polyline points="18 15 12 9 6 15"></polyline></svg>
                   {c.change}
                </span>
             </div>
           </div>
         ))}
      </div>
    </div>
  );
}
