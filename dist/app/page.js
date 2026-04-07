'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Box, Layers, Share2, User, MessageSquare, ShoppingBag, Users } from 'lucide-react';
// Showcase Components
import { GeneralTab } from '../components/showcase/GeneralTab';
import { CorporateTab } from '../components/showcase/CorporateTab';
import { SocialTab } from '../components/showcase/SocialTab';
import { ProfileTab } from '../components/showcase/ProfileTab';
import { MessagesTab } from '../components/showcase/MessagesTab';
import { CommunityTab } from '../components/showcase/CommunityTab';
import { ShopTab } from '../components/showcase/ShopTab';
export default function ShowcasePage() {
    const [activeTab, setActiveTab] = useState('Genel');
    const tabs = [
        { name: 'Genel', icon: _jsx(Box, { size: 18 }) },
        { name: 'Kurumsal', icon: _jsx(Layers, { size: 18 }) },
        { name: 'Sosyal', icon: _jsx(Share2, { size: 18 }) },
        { name: 'Profil', icon: _jsx(User, { size: 18 }) },
        { name: 'Mesajlar', icon: _jsx(MessageSquare, { size: 18 }) },
        { name: 'Topluluk', icon: _jsx(Users, { size: 18 }) },
        { name: 'Mağaza', icon: _jsx(ShoppingBag, { size: 18 }) },
    ];
    const renderTabContent = () => {
        switch (activeTab) {
            case 'Genel': return _jsx(GeneralTab, {});
            case 'Kurumsal': return _jsx(CorporateTab, {});
            case 'Sosyal': return _jsx(SocialTab, {});
            case 'Profil': return _jsx(ProfileTab, {});
            case 'Mesajlar': return _jsx(MessagesTab, {});
            case 'Topluluk': return _jsx(CommunityTab, {});
            case 'Mağaza': return _jsx(ShopTab, {});
            default: return _jsx(GeneralTab, {});
        }
    };
    return (_jsxs("div", { className: "min-h-screen bg-armoyu-bg flex flex-col font-sans selection:bg-blue-500/30", children: [_jsx("nav", { className: "sticky top-0 z-[110] w-full border-b border-white/5 bg-black/20 backdrop-blur-2xl", children: _jsxs("div", { className: "max-w-7xl mx-auto px-6 h-16 flex items-center justify-between", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: "w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20", children: _jsx("span", { className: "text-white font-black text-xs italic", children: "UI" }) }), _jsxs("div", { children: [_jsxs("h2", { className: "text-sm font-black text-armoyu-text uppercase tracking-tighter italic", children: ["ARMOYU ", _jsx("span", { className: "text-blue-500", children: "VITRINI" })] }), _jsx("p", { className: "text-[9px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50", children: "V3 Design System" })] })] }), _jsx("div", { className: "hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5", children: tabs.map((tab) => (_jsx("button", { onClick: () => setActiveTab(tab.name), className: `px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic ${activeTab === tab.name
                                    ? 'bg-white dark:bg-white/10 text-blue-500 shadow-sm'
                                    : 'text-armoyu-text-muted hover:text-armoyu-text'}`, children: tab.name }, tab.name))) }), _jsx("div", { className: "flex items-center gap-3", children: _jsx("span", { className: "text-[10px] font-black py-1.5 px-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest", children: "v1.0.0 Stable" }) })] }) }), _jsx("main", { className: "flex-1 max-w-7xl mx-auto w-full px-4 py-12", children: _jsx("div", { className: "animate-in fade-in slide-in-from-bottom-4 duration-700", children: renderTabContent() }) }), _jsx("footer", { className: "py-8 border-t border-white/5 text-center", children: _jsx("p", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-30 italic", children: "\u00A9 2024 ARMOYU DEVELOPER EXPERIENCE \u2022 VITRIN MODU" }) })] }));
}
//# sourceMappingURL=page.js.map