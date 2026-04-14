'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useMemo } from 'react';
import { StoreLayout, DetailLayout, StoreSidebar, StoreHeader, ProductCard, MOCK_PRODUCTS, StoreTrustBadges } from '../../index';
import { Product } from '@armoyu/core';
export function ShopTab() {
    const [activeCategory, setActiveCategory] = useState('Tüm Ürünler');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState(null);
    const categories = ['Tüm Ürünler', 'Üyelik & VIP', 'Oyun İçi Paralar', 'Minecraft Eşyaları', 'Lisanslı Giyim', 'Dijital Kodlar'];
    const filteredProducts = useMemo(() => {
        let filtered = MOCK_PRODUCTS;
        if (activeCategory !== 'Tüm Ürünler') {
            const categoryMap = {
                'Üyelik & VIP': 'Üyelik',
                'Oyun İçi Paralar': 'Oyun İçi',
                'Minecraft Eşyaları': 'Oyun İçi',
                'Lisanslı Giyim': 'Giyim'
            };
            const searchCat = categoryMap[activeCategory] || activeCategory;
            filtered = filtered.filter((p) => p.category === searchCat);
        }
        if (searchQuery.trim()) {
            const query = searchQuery.toLowerCase().trim();
            filtered = filtered.filter((p) => p.name.toLowerCase().includes(query) ||
                p.category.toLowerCase().includes(query));
        }
        return filtered;
    }, [activeCategory, searchQuery]);
    return (_jsx(StoreLayout, { sidebar: _jsx(StoreSidebar, { activeCategory: activeCategory, setActiveCategory: setActiveCategory, categories: categories }), children: selectedProduct ? (_jsx(DetailLayout, { product: selectedProduct, onBack: () => setSelectedProduct(null) })) : (_jsxs("div", { className: "space-y-12", children: [_jsx(StoreHeader, { searchQuery: searchQuery, setSearchQuery: setSearchQuery }), _jsxs("div", { className: "space-y-12", children: [filteredProducts.length > 0 ? (_jsx("div", { className: "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6", children: filteredProducts.map(product => (_jsx("div", { className: "cursor-pointer", onClick: (e) => { e.preventDefault(); setSelectedProduct(Product.fromJSON(product)); }, children: _jsx(ProductCard, { product: Product.fromJSON(product), href: "#" }) }, product.id))) })) : (_jsxs("div", { className: "glass-panel p-20 rounded-[40px] flex flex-col items-center justify-center text-center space-y-4 border border-white/5", children: [_jsx("div", { className: "w-20 h-20 rounded-full bg-white/5 flex items-center justify-center text-armoyu-text-muted opacity-20", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "40", height: "40", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("circle", { cx: "11", cy: "11", r: "8" }), _jsx("line", { x1: "21", y1: "21", x2: "16.65", y2: "16.65" })] }) }), _jsx("h4", { className: "text-xl font-black text-armoyu-text uppercase tracking-tighter italic", children: "\u00DCr\u00FCn Bulunamad\u0131" }), _jsx("p", { className: "text-sm text-armoyu-text-muted max-w-xs", children: "Araman\u0131za uygun \u00FCr\u00FCn bulunamad\u0131. L\u00FCtfen filtreleri kontrol edin." }), _jsx("button", { onClick: () => { setActiveCategory('Tüm Ürünler'); setSearchQuery(''); }, className: "px-6 py-3 bg-blue-600 text-white text-[10px] font-black rounded-full uppercase tracking-widest hover:bg-blue-500 transition-all shadow-xl shadow-blue-500/20", children: "F\u0130LTRELER\u0130 SIFIRLA" })] })), _jsx(StoreTrustBadges, {})] })] })) }));
}
//# sourceMappingURL=ShopTab.js.map