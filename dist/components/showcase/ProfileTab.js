'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { ProfileHeader, ProfileLayout, } from '../../index';
import { useArmoyu } from '../../context/ArmoyuContext';
import { Search, User as UserIcon, Loader2, RefreshCcw } from 'lucide-react';
export function ProfileTab() {
    const { api, apiKey } = useArmoyu();
    const [username, setUsername] = useState('');
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const fetchProfile = useCallback(async (searchName = '') => {
        setLoading(true);
        setError(null);
        if (!apiKey || apiKey === 'armoyu_showcase_key') {
            setError("Profil verilerini canlı çekebilmek için lütfen geçerli bir API Anahtarı giriniz (Sağ alttaki Dashboard panelinden).");
            setLoading(false);
            return;
        }
        try {
            console.log(`[ProfileTab] Profil çekiliyor: ${searchName || 'Kendi Profilim'}`);
            const userData = await api.users.getUserByUsername(searchName);
            if (!userData) {
                const lastRaw = api.lastResponse;
                setError(lastRaw?.aciklama || "Kullanıcı bulunamadı.");
                setProfile(null);
            }
            else {
                setProfile(userData);
                console.log("[ProfileTab] Profil başarıyla yüklendi:", userData.username);
            }
        }
        catch (err) {
            console.error("[ProfileTab] Hata:", err);
            setError("Profil bilgileri alınırken bir hata oluştu.");
        }
        finally {
            setLoading(false);
        }
    }, [api]);
    // İlk açılışta kendi profilini çek
    useEffect(() => {
        fetchProfile('');
    }, [fetchProfile, apiKey]);
    const handleSearch = (e) => {
        e.preventDefault();
        fetchProfile(username);
    };
    return (_jsxs("div", { className: "space-y-8 animate-in fade-in duration-700", children: [_jsx("div", { className: "bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm", children: _jsxs("form", { onSubmit: handleSearch, className: "flex flex-col md:flex-row items-center gap-4", children: [_jsxs("div", { className: "flex items-center gap-3 shrink-0 px-2", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-pink-500/10 flex items-center justify-center text-pink-500", children: _jsx(UserIcon, { size: 20 }) }), _jsxs("div", { children: [_jsx("h3", { className: "text-sm font-black text-armoyu-text uppercase tracking-tighter italic", children: "Oyuncu Bak" }), _jsx("p", { className: "text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-50", children: "Profil \u0130nceleme" })] })] }), _jsxs("div", { className: "relative flex-1 group w-full", children: [_jsx(Search, { className: "absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-pink-500 transition-colors" }), _jsx("input", { type: "text", value: username, onChange: (e) => setUsername(e.target.value), placeholder: "Kullan\u0131c\u0131 ad\u0131 yaz\u0131n (bo\u015F b\u0131rak\u0131rsan\u0131z kendi profiliniz gelir)...", className: "w-full bg-black/5 dark:bg-white/5 border border-pink-500/10 focus:border-pink-500/50 rounded-2xl pl-12 pr-4 py-3 text-sm font-bold text-armoyu-text outline-none transition-all" })] }), _jsxs("button", { type: "submit", disabled: loading, className: "w-full md:w-auto px-8 py-3 bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-500 hover:to-rose-500 text-white font-black rounded-2xl text-xs uppercase tracking-widest shadow-xl shadow-pink-600/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-2 italic", children: [loading ? _jsx(Loader2, { className: "w-4 h-4 animate-spin" }) : _jsx(Search, { className: "w-4 h-4" }), "PROF\u0130L\u0130 GET\u0130R"] })] }) }), error && (_jsxs("div", { className: "bg-red-500/10 border border-red-500/20 rounded-3xl p-8 text-center animate-in zoom-in-95 duration-300", children: [_jsx("div", { className: "w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500 mx-auto mb-4", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", children: [_jsx("circle", { cx: "12", cy: "12", r: "10" }), _jsx("line", { x1: "12", y1: "8", x2: "12", y2: "12" }), _jsx("line", { x1: "12", y1: "16", x2: "12.01", y2: "16" })] }) }), _jsx("h3", { className: "text-xl font-black text-armoyu-text uppercase italic tracking-tighter mb-2", children: "HATA OLU\u015ETU" }), _jsx("p", { className: "text-sm font-bold text-red-500/80 uppercase tracking-widest mb-6", children: error }), _jsxs("button", { onClick: () => fetchProfile(username), className: "px-6 py-2.5 bg-armoyu-card-bg border border-armoyu-card-border hover:border-red-500/50 text-armoyu-text text-xs font-black rounded-xl transition-all uppercase tracking-widest flex items-center gap-2 mx-auto", children: [_jsx(RefreshCcw, { size: 14 }), " TEKRAR DENE"] })] })), loading && !profile && (_jsxs("div", { className: "py-24 text-center", children: [_jsx(Loader2, { className: "w-12 h-12 animate-spin text-pink-500 mx-auto mb-4 opacity-50" }), _jsx("p", { className: "text-xs font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic", children: "Profil Verileri Y\u00FCkleniyor..." })] })), profile && (_jsxs("div", { className: `space-y-12 transition-all duration-700 ${loading ? 'opacity-50 grayscale pointer-events-none' : 'opacity-100'}`, children: [_jsxs("div", { className: "relative", children: [loading && (_jsx("div", { className: "absolute inset-0 z-50 flex items-center justify-center", children: _jsx("div", { className: "bg-white/10 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/20 shadow-2xl", children: _jsx(Loader2, { className: "w-6 h-6 animate-spin text-white" }) }) })), _jsx(ProfileHeader, { user: profile, isOwnProfile: profile.username === api.client.config.username || username === '' })] }), _jsx(ProfileLayout, { user: profile })] })), !profile && !loading && !error && (_jsxs("div", { className: "py-24 text-center border-2 border-dashed border-armoyu-card-border rounded-[40px]", children: [_jsx(UserIcon, { className: "w-16 h-16 text-armoyu-text-muted mx-auto mb-4 opacity-20" }), _jsx("p", { className: "text-xs font-black text-armoyu-text-muted uppercase tracking-[0.3em] italic", children: "G\u00F6r\u00FCnt\u00FClemek i\u00E7in bir kullan\u0131c\u0131 aray\u0131n." })] }))] }));
}
//# sourceMappingURL=ProfileTab.js.map