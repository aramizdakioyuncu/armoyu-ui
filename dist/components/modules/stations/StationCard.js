'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import Link from 'next/link';
import { MapPin, Star, Coffee, Monitor, Trophy, Dumbbell, ChevronRight } from 'lucide-react';
export function StationCard(station) {
    const Icon = {
        'YEMEK': Coffee,
        'INTERNET_KAFE': Monitor,
        'HALI_SAHA': Trophy,
        'SPOR_KOMPLEKSI': Dumbbell
    }[station.type];
    const typeLabel = {
        'YEMEK': 'Yemek & Kahve',
        'INTERNET_KAFE': 'İnternet Kafe',
        'HALI_SAHA': 'Halı Saha',
        'SPOR_KOMPLEKSI': 'Spor Kompleksi'
    }[station.type];
    const typeColor = {
        'YEMEK': 'text-amber-500 bg-amber-500/10',
        'INTERNET_KAFE': 'text-blue-500 bg-blue-500/10',
        'HALI_SAHA': 'text-emerald-500 bg-emerald-500/10',
        'SPOR_KOMPLEKSI': 'text-purple-500 bg-purple-500/10'
    }[station.type];
    return (_jsxs("div", { className: "group relative glass-panel rounded-[32px] border border-armoyu-card-border overflow-hidden bg-armoyu-card-bg hover:shadow-2xl transition-all duration-500 flex flex-col h-full animate-in fade-in zoom-in duration-700", children: [_jsxs("div", { className: "relative h-48 overflow-hidden", children: [_jsx("img", { src: station.banner, alt: station.name, className: "w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" }), _jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" }), _jsxs("div", { className: `absolute top-4 left-4 flex items-center gap-2 px-3 py-1.5 rounded-xl backdrop-blur-md border border-white/10 ${typeColor}`, children: [_jsx(Icon, { size: 14, strokeWidth: 2.5 }), _jsx("span", { className: "text-[10px] font-black uppercase tracking-widest", children: typeLabel })] })] }), _jsxs("div", { className: "p-6 flex flex-col flex-1 relative", children: [_jsx("div", { className: "absolute -top-10 left-6 w-20 h-20 rounded-2xl border-4 border-armoyu-card-bg overflow-hidden shadow-xl bg-white", children: _jsx("img", { src: station.logo, alt: station.name, className: "w-full h-full object-cover" }) }), _jsxs("div", { className: "mt-12 flex-1", children: [_jsxs("div", { className: "flex justify-between items-start mb-2", children: [_jsx("h3", { className: "text-xl font-black text-armoyu-text uppercase tracking-tight group-hover:text-blue-500 transition-colors truncate pr-2", children: station.name }), _jsxs("div", { className: "flex items-center gap-1 shrink-0", children: [_jsx(Star, { size: 14, className: "text-amber-500 fill-amber-500" }), _jsx("span", { className: "text-sm font-black text-armoyu-text", children: station.rating })] })] }), _jsxs("div", { className: "flex items-center gap-2 mb-4 text-armoyu-text-muted", children: [_jsx(MapPin, { size: 14, className: "shrink-0 opacity-50" }), _jsx("span", { className: "text-xs font-bold truncate", children: station.location })] }), _jsx("p", { className: "text-sm text-armoyu-text-muted font-medium line-clamp-2 leading-relaxed mb-6 opacity-80", children: station.description })] }), _jsxs("div", { className: "pt-6 border-t border-armoyu-card-border flex items-center justify-between", children: [_jsxs("div", { className: "flex flex-col", children: [_jsx("span", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-50", children: "YORUMLAR" }), _jsxs("span", { className: "text-xs font-black text-armoyu-text", children: [station.reviewCount, " De\u011Ferlendirme"] })] }), _jsx(Link, { href: `/istasyonlar/${station.slug}`, className: "w-10 h-10 rounded-xl bg-armoyu-text dark:bg-white text-white dark:text-black flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-lg", children: _jsx(ChevronRight, { size: 20, strokeWidth: 3 }) })] })] })] }));
}
//# sourceMappingURL=StationCard.js.map