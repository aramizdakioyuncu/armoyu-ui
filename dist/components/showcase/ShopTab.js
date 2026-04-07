import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { StoreHeader, NewsCard, newsList } from '../../index';
export function ShopTab() {
    return (_jsxs("div", { className: "space-y-12", children: [_jsx("h3", { className: "text-2xl font-black italic uppercase tracking-tighter border-l-4 border-yellow-500 pl-4", children: "Ma\u011Faza & \u0130\u00E7erik" }), _jsxs("div", { className: "space-y-8", children: [_jsx("div", { className: "glass-panel p-6 rounded-[32px]", children: _jsx(StoreHeader, { searchQuery: "", setSearchQuery: () => { } }) }), _jsx("div", { className: "grid grid-cols-1 md:grid-cols-3 gap-6", children: newsList.map(news => (_jsx(NewsCard, { ...news }, news.slug))) })] })] }));
}
//# sourceMappingURL=ShopTab.js.map