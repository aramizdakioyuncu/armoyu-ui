import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { AuthSidebarLeft, Stories, PostCard, postList } from '../../index';
import { ArmoyuApi } from '@armoyu/core';
import { RefreshCcw, Wifi, WifiOff, Key } from 'lucide-react';
export function SocialTab() {
    const [useLive, setUseLive] = useState(false);
    const [apiKey, setApiKey] = useState('');
    const [token, setToken] = useState(''); // Added token state
    const [livePosts, setLivePosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchLivePosts = async () => {
        if (!apiKey) {
            setError("API Key gereklidir.");
            return;
        }
        setLoading(true);
        setError(null);
        try {
            const api = new ArmoyuApi({
                apiKey: apiKey,
                token: token || null, // Pass token to API
                baseUrl: typeof window !== 'undefined' ? `${window.location.origin}/api/proxy` : '/api/proxy'
            });
            const posts = await api.social.getFeed(1);
            if (posts.length === 0 && !error) {
                // SocialService returns [] on error, but we want to know why
                const lastRaw = api.lastResponse;
                if (lastRaw && lastRaw.durum === 0) {
                    setError(lastRaw.aciklama || "API Hatası");
                    return;
                }
            }
            setLivePosts(posts);
            setUseLive(true);
        }
        catch (err) {
            setError(err.message || "Veri çekilirken bir hata oluştu.");
        }
        finally {
            setLoading(false);
        }
    };
    const displayPosts = useLive ? livePosts : postList.slice(0, 3);
    return (_jsxs("div", { className: "space-y-8", children: [_jsxs("div", { className: "flex flex-col xl:flex-row xl:items-center justify-between gap-4 bg-black/5 dark:bg-white/5 p-4 rounded-2xl border border-white/5", children: [_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: cn("w-10 h-10 rounded-xl flex items-center justify-center shadow-lg", useLive ? "bg-emerald-500 shadow-emerald-500/20" : "bg-blue-500 shadow-blue-500/20"), children: useLive ? _jsx(Wifi, { className: "text-white w-5 h-5" }) : _jsx(WifiOff, { className: "text-white w-5 h-5" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-armoyu-text uppercase tracking-tight", children: useLive ? "CANLI VERİ AKIŞI" : "MOCK (PROTOTİP) VERİ" }), _jsx("p", { className: "text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60", children: useLive ? "@armoyu/core üzerinden çekiliyor" : "Lokal seedData.ts kullanılıyor" })] })] }), _jsxs("div", { className: "flex flex-col md:flex-row items-center gap-2 flex-1 max-w-2xl", children: [_jsxs("div", { className: "relative flex-1 w-full md:w-auto group", children: [_jsx(Key, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-blue-500 transition-colors" }), _jsx("input", { type: "password", placeholder: "API Developer Key...", value: apiKey, onChange: (e) => setApiKey(e.target.value), className: "w-full bg-black/20 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-armoyu-text placeholder:text-gray-600 outline-none focus:border-blue-500 transition-all font-mono" })] }), _jsxs("div", { className: "relative flex-1 w-full md:w-auto group", children: [_jsx(Wifi, { className: "absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 group-focus-within:text-cyan-500 transition-colors" }), _jsx("input", { type: "password", placeholder: "Test User Token (Opsiyonel)...", value: token, onChange: (e) => setToken(e.target.value), className: "w-full bg-black/20 border border-white/5 rounded-xl pl-9 pr-4 py-2 text-xs text-armoyu-text placeholder:text-gray-600 outline-none focus:border-cyan-500 transition-all font-mono" })] }), _jsxs("button", { onClick: fetchLivePosts, disabled: loading || !apiKey, className: "w-full md:w-auto bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 text-white px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-600/20", children: [loading ? _jsx(RefreshCcw, { className: "w-3.5 h-3.5 animate-spin" }) : _jsx(RefreshCcw, { className: "w-3.5 h-3.5" }), "\u00C7EK"] }), useLive && (_jsx("button", { onClick: () => setUseLive(false), className: "bg-white/5 hover:bg-white/10 text-armoyu-text-muted px-3 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all", children: "SIFIRLA" }))] })] }), error && (_jsxs("div", { className: "bg-red-500/10 border border-red-500/20 text-red-500 text-[11px] font-bold px-4 py-3 rounded-xl animate-in fade-in zoom-in-95 duration-200", children: ["\u26A0\uFE0F ", error] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("aside", { className: "lg:col-span-3 hidden lg:block", children: _jsx(AuthSidebarLeft, {}) }), _jsxs("div", { className: "lg:col-span-9 space-y-8", children: [_jsx(Stories, {}), _jsx("div", { className: "flex flex-col gap-6 max-w-2xl mx-auto", children: displayPosts.map((post) => (_jsx(PostCard, { ...post, author: post.owner || post.author }, post.id))) }), displayPosts.length === 0 && !loading && (_jsx("div", { className: "text-center py-20 border-2 border-dashed border-white/5 rounded-3xl", children: _jsx("p", { className: "text-armoyu-text-muted font-bold opacity-40 uppercase tracking-[0.2em] text-xs", children: "Hen\u00FCz yay\u0131nlanm\u0131\u015F bir g\u00F6nderi yok." }) }))] })] })] }));
}
// Minimal cn implementation for simplicity here
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
//# sourceMappingURL=SocialTab.js.map