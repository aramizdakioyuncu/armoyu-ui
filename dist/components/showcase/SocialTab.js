'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useEffect, useState, useCallback } from 'react';
import { AuthSidebarLeft, Stories, PostCard, postList } from '../../index';
import { useArmoyu } from '../../context/ArmoyuContext';
import { RefreshCcw, Wifi, WifiOff, Settings2 } from 'lucide-react';
export function SocialTab() {
    const { api, apiKey, token } = useArmoyu();
    const [useLive, setUseLive] = useState(false);
    const [livePosts, setLivePosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [lastRawData, setLastRawData] = useState(null);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const fetchLivePosts = useCallback(async (isLoadMore = false) => {
        setLoading(true);
        if (!isLoadMore) {
            setError(null);
            setLastRawData(null);
        }
        try {
            const targetPage = isLoadMore ? page + 1 : 1;
            console.log(`[SocialTab] Veri çekiliyor... Sayfa: ${targetPage}, API Key: ${apiKey ? "Mevcut" : "Eksik"}`);
            const posts = await api.social.getPosts(targetPage);
            const lastRaw = api.lastResponse;
            setLastRawData(lastRaw);
            console.log("---------------- [SocialTab DEBUG] ----------------");
            console.log("Ham Yanıt (lastRaw):", lastRaw);
            console.log("İşlenmiş Veri (posts):", posts);
            console.log("Veri Tipi:", Array.isArray(posts) ? "Dizi (Array)" : typeof posts);
            if (Array.isArray(posts)) {
                console.log("Gönderi Sayısı (Length):", posts.length);
            }
            console.log("---------------------------------------------------");
            if (!posts || (Array.isArray(posts) && posts.length === 0)) {
                if (lastRaw && lastRaw.durum === 0) {
                    setError(lastRaw.aciklama || "API Hatası: Yetki veya veri erişim problemi.");
                    return;
                }
            }
            // Gelen veriyi PostCard'ın beklediği formata güvenli bir şekilde dönüştür (Mapping)
            const rawArray = Array.isArray(posts) ? posts : (posts ? [posts] : []);
            const mappedPosts = rawArray.map((p) => {
                if (!p || typeof p !== 'object')
                    return null;
                return {
                    ...p,
                    id: p.id?.toString() || p.postID?.toString() || Math.random().toString(),
                    author: p.author || p.owner || null,
                    content: p.content || p.paylasimicerik || '',
                    media: Array.isArray(p.media) ? p.media : (Array.isArray(p.paylasimfoto) ? p.paylasimfoto.map((f) => ({ type: 'image', url: f.fotourl || f.fotoufakurl })) : []),
                    createdAt: p.createdAt || p.paylasimzaman || 'Şimdi',
                    stats: {
                        likes: p.stats?.likes ?? p.likesCount ?? p.begenisay ?? 0,
                        comments: p.stats?.comments ?? p.commentsCount ?? p.yorumsay ?? 0,
                        reposts: p.stats?.reposts ?? p.repostsay ?? 0,
                        shares: p.stats?.shares ?? p.sikayetsay ?? 0
                    }
                };
            }).filter(Boolean);
            console.log(`[SocialTab] Mapleme Sonrası Gönderi Sayısı: ${mappedPosts.length}`);
            if (isLoadMore) {
                setLivePosts((prev) => [...prev, ...mappedPosts]);
            }
            else {
                setLivePosts(mappedPosts);
            }
            setPage(targetPage);
            setHasMore(mappedPosts.length > 0);
            setUseLive(true);
        }
        catch (err) {
            const lastRaw = api.lastResponse;
            setLastRawData(lastRaw);
            console.log("================ [SocialTab ERROR] ================");
            console.error("HATA:", err.message);
            console.log("API YANITI:", lastRaw);
            console.log("==================================================");
            if (lastRaw && lastRaw.durum === 0) {
                setError(lastRaw.aciklama || "API Hatası: Yetki veya veri erişim problemi.");
            }
            else {
                setError(err.message || "Veri çekilirken teknik bir hata oluştu.");
            }
        }
        finally {
            setLoading(false);
        }
    }, [api, apiKey]);
    // Sayfa açıldığında verileri otomatik çek (Opsiyonel: Eğer apiKey varsa)
    useEffect(() => {
        if (apiKey && apiKey !== 'armoyu_showcase_key') {
            fetchLivePosts(false);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [apiKey]); // API Key değiştiğinde veya ilk açılışta fetch et
    const displayPosts = useLive ? livePosts : postList.slice(0, 3);
    return (_jsxs("div", { className: "space-y-8 animate-in fade-in duration-700", children: [_jsxs("div", { className: "flex flex-col xl:flex-row xl:items-center justify-between gap-6 bg-white/5 backdrop-blur-md p-6 rounded-[2rem] border border-white/5", children: [_jsxs("div", { className: "flex items-center gap-4", children: [_jsx("div", { className: cn("w-12 h-12 rounded-2xl flex items-center justify-center shadow-2xl transition-all duration-500", useLive ? "bg-emerald-500 shadow-emerald-500/20" : "bg-blue-600 shadow-blue-600/20"), children: useLive ? _jsx(Wifi, { className: "text-white w-6 h-6" }) : _jsx(WifiOff, { className: "text-white w-6 h-6" }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-base font-black text-armoyu-text uppercase tracking-tight", children: useLive ? "CANLI VERİ AKIŞI" : "MOCK (PROTOTİP) VERİ" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("p", { className: "text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60", children: useLive ? "@armoyu/core üzerinden çekiliyor" : "Lokal seedData.ts kullanılıyor" }), useLive && (_jsx("span", { className: "flex h-2 w-2 rounded-full bg-emerald-500 animate-pulse" }))] })] })] }), _jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("div", { className: "hidden md:flex flex-col items-end mr-2", children: [_jsx("span", { className: "text-[10px] font-black text-zinc-500 uppercase tracking-widest", children: "AKT\u0130F ANAHTAR" }), _jsx("span", { className: "text-[11px] font-mono text-emerald-500 truncate max-w-[120px]", children: apiKey === 'armoyu_showcase_key' ? 'Varsayılan (Showcase)' : 'Özel Anahtar' })] }), _jsxs("button", { onClick: () => fetchLivePosts(false), disabled: loading, className: "bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 text-white px-8 py-3.5 rounded-2xl text-[11px] font-black uppercase tracking-widest flex items-center gap-2 transition-all shadow-xl shadow-blue-600/20 hover:scale-105 active:scale-95", children: [loading ? _jsx(RefreshCcw, { className: "w-4 h-4 animate-spin" }) : _jsx(RefreshCcw, { className: "w-4 h-4" }), "VER\u0130LER\u0130 \u00C7EK"] }), useLive && (_jsx("button", { onClick: () => setUseLive(false), className: "bg-white/5 hover:bg-white/10 text-armoyu-text-muted p-3.5 rounded-2xl transition-all", title: "Mock veriye d\u00F6n", children: _jsx(Settings2, { className: "w-4 h-4" }) }))] })] }), error && (_jsxs("div", { className: "space-y-4 animate-in slide-in-from-top-2", children: [_jsxs("div", { className: "bg-red-500/10 border border-red-500/20 p-5 rounded-2xl flex items-start gap-4", children: [_jsx("div", { className: "w-10 h-10 rounded-xl bg-red-500/20 flex items-center justify-center text-red-500 shrink-0", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "20", height: "20", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] }) }), _jsxs("div", { children: [_jsx("h4", { className: "text-sm font-black text-red-500 uppercase tracking-tight", children: "VER\u0130 HATASI" }), _jsx("p", { className: "text-red-500/80 text-[11px] leading-relaxed font-bold", children: error }), _jsx("p", { className: "mt-2 text-[10px] text-red-500/50 font-medium italic", children: "Sa\u011F alttaki \"Dev Tools\" panelinden ge\u00E7erli bir API Key girerek tekrar deneyebilirsiniz." })] })] }), lastRawData && (_jsxs("div", { className: "bg-black/40 border border-white/5 p-4 rounded-2xl", children: [_jsxs("div", { className: "flex items-center gap-2 mb-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-50", children: [_jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "12", height: "12", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [_jsx("polyline", { points: "4 17 10 11 4 5" }), _jsx("line", { x1: "12", y1: "19", x2: "20", y2: "19" })] }), "API YANITI (RAW)"] }), _jsx("pre", { className: "text-[10px] font-mono text-blue-400 overflow-x-auto p-2 bg-black/20 rounded-lg", children: JSON.stringify(lastRawData, null, 2) })] }))] })), _jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8", children: [_jsx("aside", { className: "lg:col-span-3 hidden lg:block", children: _jsx(AuthSidebarLeft, {}) }), _jsxs("div", { className: "lg:col-span-9 space-y-8", children: [_jsx(Stories, {}), _jsx("div", { className: "flex flex-col gap-6 max-w-2xl mx-auto", children: displayPosts.map((post) => (_jsx(PostCard, { ...post, author: post.owner || post.author }, post.id))) }), displayPosts.length === 0 && !loading && (_jsx("div", { className: "text-center py-24 border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.02]", children: _jsx("p", { className: "text-armoyu-text-muted font-bold opacity-30 uppercase tracking-[0.3em] text-[10px]", children: "Hen\u00FCz yay\u0131nlanm\u0131\u015F bir g\u00F6nderi yok." }) })), useLive && displayPosts.length > 0 && hasMore && (_jsx("div", { className: "flex justify-center mt-6", children: _jsx("button", { onClick: () => fetchLivePosts(true), disabled: loading, className: "px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2", children: loading ? (_jsxs(_Fragment, { children: [_jsx(RefreshCcw, { className: "w-4 h-4 animate-spin" }), " Y\u00DCKLEN\u0130YOR..."] })) : "DAHA FAZLA GÖSTER" }) }))] })] })] }));
}
function cn(...classes) {
    return classes.filter(Boolean).join(' ');
}
//# sourceMappingURL=SocialTab.js.map