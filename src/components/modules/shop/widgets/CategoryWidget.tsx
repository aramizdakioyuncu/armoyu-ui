'use client';

import React from 'react';
import { LayoutGrid, Crown, Coins, Box, Shirt, Key, ChevronRight } from 'lucide-react';

interface CategoryWidgetProps {
  activeCategory: string;
  setActiveCategory: (category: string) => void;
  categories: string[];
}

export function CategoryWidget({ activeCategory, setActiveCategory, categories }: CategoryWidgetProps) {
  const getIcon = (category: string, size: number = 18) => {
    switch (category) {
      case 'Tüm Ürünler': return <LayoutGrid size={size} />;
      case 'Üyelik & VIP': return <Crown size={size} />;
      case 'Oyun İçi Paralar': return <Coins size={size} />;
      case 'Minecraft Eşyaları': return <Box size={size} />;
      case 'Lisanslı Giyim': return <Shirt size={size} />;
      case 'Dijital Kodlar': return <Key size={size} />;
      default: return <Box size={size} />;
    }
  };

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg shadow-sm">
      <h3 className="text-[9px] font-black uppercase tracking-[0.2em] text-armoyu-text-muted mb-5 ml-2 opacity-50">Mağaza Kategorileri</h3>
      
      <div className="space-y-1">
        {categories.map((category) => {
          const isActive = activeCategory === category;
          return (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`w-full flex items-center justify-between p-3.5 rounded-2xl transition-all group ${
                isActive 
                  ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/30' 
                  : 'text-armoyu-text-muted hover:bg-white/5 hover:text-armoyu-text'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`transition-colors ${isActive ? 'text-white' : 'group-hover:text-armoyu-primary'}`}>
                  {getIcon(category, 18)}
                </div>
                <span className="text-[11px] font-black uppercase tracking-tight italic">{category}</span>
              </div>
              {isActive && <ChevronRight size={12} className="animate-in slide-in-from-left-2 duration-300" />}
            </button>
          );
        })}
      </div>
    </div>
  );
}
