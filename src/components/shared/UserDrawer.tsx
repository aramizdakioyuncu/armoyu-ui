'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { 
    X, 
    User, 
    UserPlus, 
    ShieldCheck, 
    Crown, 
    ArrowRight, 
    Users,
    LogOut,
    Bell,
    MessageSquare,
    Search,
    Gift,
    GraduationCap,
    Palette,
    Check,
    RefreshCw,
    Plus
} from 'lucide-react';
import { InviteWidget } from '../modules/auth/widgets/InviteWidget';
import { useTheme, AccentColor } from '../../context/ThemeContext';

interface UserDrawerProps {
    isOpen: boolean;
    onClose: () => void;
    user: any;
    logout: () => void;
    userGroups: any[];
    navigation: any;
    theme: string;
    toggleTheme: () => void;
    goToMyProfile: () => void;
    initialView?: 'main' | 'invite';
    links?: {
        posts?: string;
        comments?: string;
        polls?: string;
        giveaways?: string;
        education?: string;
        support?: string;
    };
}

export function UserDrawer({
    isOpen,
    onClose,
    user,
    logout,
    userGroups,
    navigation,
    theme: propTheme,
    toggleTheme: propToggleTheme,
    goToMyProfile,
    initialView = 'main',
    links
}: UserDrawerProps) {
    const { theme, toggleTheme, accentColor, setAccentColor } = useTheme();
    const [userMenuView, setUserMenuView] = useState<'main' | 'invite' | 'colors'>(initialView);
    const [isGroupsSubmenuOpen, setIsGroupsSubmenuOpen] = useState(false);

    const colors: { id: AccentColor; color: string; name: string }[] = [
        { id: 'blue', color: '#3b82f6', name: 'Okyanus' },
        { id: 'green', color: '#10b981', name: 'Doğa' },
        { id: 'pink', color: '#ec4899', name: 'Neon' },
        { id: 'purple', color: '#8b5cf6', name: 'Asil' },
        { id: 'red', color: '#ef4444', name: 'Ateş' },
        { id: 'amber', color: '#f59e0b', name: 'Güneş' },
        { id: 'emerald', color: '#059669', name: 'Zümrüt' },
    ];

    // Sync view state when opened or initialView changes
    React.useEffect(() => {
        if (isOpen) {
            setUserMenuView(initialView);
        }
    }, [isOpen, initialView]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex justify-end animate-in fade-in duration-200">
            <div
                className="absolute inset-0 bg-black/60"
                onClick={onClose}
            />
            <div className="relative w-[340px] max-w-[85vw] h-screen bg-armoyu-header-bg border-l border-armoyu-drawer-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-50">
                {userMenuView === 'main' ? (
                    <>
                        {/* Profil Üst Bilgi */}
                        <div className="p-6 border-b border-armoyu-drawer-border flex justify-between items-start relative overflow-hidden group">
                            
                            <div className="flex gap-4 items-center">
                                <img 
                                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                                    alt="Avatar" 
                                    className="w-14 h-14 rounded-full border-2 border-armoyu-primary shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb),0.4)] object-cover bg-white/5" 
                                />
                                <div className="min-w-0">
                                    <h3 className="text-armoyu-text font-black text-lg leading-tight truncate">{user.displayName}</h3>
                                    <span className="text-armoyu-primary text-sm font-bold tracking-tighter">@{user.username}</span>
                                </div>
                            </div>
                            <button onClick={onClose} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 border border-armoyu-drawer-border">
                                <X size={20} />
                            </button>
                        </div>

                        {/* Menü İkonları / Linkleri */}
                        <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 mt-2 hide-scrollbar">
                            <button 
                                onClick={goToMyProfile} 
                                className="w-full flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none group/prof"
                            >
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><User size={18} /></span>
                                Profilime Git
                                <ArrowRight size={14} className="ml-auto opacity-0 group-hover/prof:opacity-40 transition-all" />
                            </button>

                            {/* Management Panel Link */}
                            <Link
                                href={navigation.managementPrefix}
                                onClick={onClose}
                                className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border group"
                            >
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><ShieldCheck size={18} /></span>
                                Yönetim Paneli
                                <Crown size={14} className="ml-auto opacity-30" />
                            </Link>

                            <Link href={links?.posts || "/yazilarim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Bell size={14} /></span>
                                Yazılarım
                            </Link>

                            <Link href={links?.comments || "/yazilarim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><MessageSquare size={14} /></span>
                                Yorumlarım
                            </Link>

                            <Link href={links?.education || navigation.educationPrefix || "/egitim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><GraduationCap size={14} /></span>
                                Eğitim
                            </Link>

                            <Link href={links?.support || navigation.supportPrefix || "/destek"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Bell size={14} /></span>
                                Destek Bildirimleri
                            </Link>

                            <div className="space-y-1">
                                <button
                                    onClick={() => setIsGroupsSubmenuOpen(!isGroupsSubmenuOpen)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none ${isGroupsSubmenuOpen ? 'text-armoyu-primary bg-armoyu-primary/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                                >
                                    <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Users size={18} /></span>
                                    Gruplarım
                                    <ChevronDown size={14} className={`ml-auto transition-transform duration-300 ${isGroupsSubmenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isGroupsSubmenuOpen && (
                                    <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                                        <Link
                                            href="/?tab=gruplar"
                                            onClick={onClose}
                                            className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-black text-armoyu-primary bg-armoyu-primary/10 border border-armoyu-primary/20 hover:bg-armoyu-primary/20 transition-all mb-2"
                                        >
                                            <span className="p-1.5 rounded-lg bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/30"><Plus size={14} strokeWidth={3} /></span>
                                            Grup Kur
                                        </Link>
                                        {userGroups.length > 0 ? (
                                            userGroups.map((group: any, gidx: number) => (
                                                <Link
                                                    key={gidx}
                                                    href={`${navigation.groupPrefix}/${group.group_ID || group.id || group.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-armoyu-text-muted hover:text-armoyu-primary hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                                                >
                                                    <img src={group.logo_URL || group.logo || undefined} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-800 border border-armoyu-drawer-border object-cover" />
                                                    <span className="truncate">{group.name || group.group_name}</span>
                                                </Link>
                                            ))
                                        ) : (
                                            <div className="py-3 px-4 text-center bg-black/5 dark:bg-white/5 rounded-xl border border-dashed border-armoyu-drawer-border mx-2">
                                                <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60 block leading-tight">Henüz bir gruba<br />dahil değilsin</span>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="my-2 border-t border-armoyu-drawer-border opacity-30" />
                            <button 
                                onClick={() => setUserMenuView('invite')}
                                className="w-full flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none group/invite mb-1"
                            >
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><UserPlus size={18} /></span>
                                Davet Et & Kazan
                                <ArrowRight size={14} className="ml-auto opacity-0 group-hover/invite:opacity-40 transition-all" />
                            </button>
                        </nav>

                        {/* Tema Butonu & Çıkış */}
                        <div className="p-4 border-t border-armoyu-drawer-border space-y-3">
                            <div className="flex gap-2">
                                <button
                                    onClick={toggleTheme}
                                    className="flex-1 py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-black text-[10px] uppercase tracking-widest"
                                >
                                    <span>{theme === 'dark' ? 'Açık' : 'Koyu'}</span>
                                    {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                                </button>
                                <button
                                    onClick={() => setUserMenuView('colors')}
                                    className="flex-1 py-3 px-4 rounded-xl bg-armoyu-primary/10 border border-armoyu-primary/20 text-armoyu-primary hover:bg-armoyu-primary/20 flex items-center justify-between transition-colors font-black text-[10px] uppercase tracking-widest"
                                >
                                    <span>Kişiselleştir</span>
                                    <Palette size={14} />
                                </button>
                            </div>

                            <button
                                onClick={() => {
                                    logout();
                                    onClose();
                                }}
                                className="flex items-center gap-3 w-full p-4 text-white bg-red-600 hover:bg-red-500 rounded-2xl transition-all font-black text-[10px] uppercase tracking-widest justify-center shadow-lg shadow-red-600/20 active:scale-95"
                            >
                                <LogOut size={16} />
                                Sistemden Çıkış Yap
                            </button>
                        </div>
                    </>
                ) : userMenuView === 'invite' ? (
                    <InviteWidget onBack={() => setUserMenuView('main')} />
                ) : (
                    /* Colors View */
                    <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
                        <div className="p-6 border-b border-armoyu-drawer-border flex items-center gap-4">
                            <button onClick={() => setUserMenuView('main')} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-1.5 rounded-lg border border-armoyu-drawer-border">
                                <ArrowRight size={18} className="rotate-180" />
                            </button>
                            <div>
                                <h3 className="text-armoyu-text font-black text-lg leading-tight uppercase italic tracking-tighter">Görünüm</h3>
                                <p className="text-[10px] text-armoyu-text-muted font-bold uppercase tracking-widest">Platform ana rengini belirle</p>
                            </div>
                        </div>

                        <div className="flex-1 p-6 space-y-6 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-3">
                                {colors.map((c) => (
                                    <button
                                        key={c.id}
                                        onClick={() => setAccentColor(c.id)}
                                        className={`group relative flex flex-col items-center gap-3 p-4 rounded-3xl border transition-all ${
                                            accentColor === c.id 
                                            ? 'border-armoyu-primary bg-armoyu-primary/10 shadow-lg shadow-primary/10 scale-[1.02]' 
                                            : 'border-armoyu-drawer-border bg-black/5 dark:bg-white/5 hover:border-armoyu-primary/30'
                                        }`}
                                    >
                                        <div 
                                            className="w-10 h-10 rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-110"
                                            style={{ backgroundColor: c.color }}
                                        >
                                            {accentColor === c.id && <Check size={18} className="text-white" strokeWidth={3} />}
                                        </div>
                                        <span className={`text-[10px] font-black uppercase tracking-widest ${accentColor === c.id ? 'text-armoyu-primary' : 'text-armoyu-text-muted'}`}>{c.name}</span>
                                    </button>
                                ))}
                            </div>

                            <div className="p-6 bg-armoyu-primary/5 rounded-[32px] border border-armoyu-primary/10 space-y-3">
                                <div className="flex items-center gap-3 text-armoyu-primary">
                                    <RefreshCw size={16} />
                                    <span className="text-[10px] font-black uppercase tracking-widest">Önizleme</span>
                                </div>
                                <p className="text-[11px] text-armoyu-text-muted font-medium leading-relaxed italic">
                                    Seçtiğin renk anında tüm platformda aktif olur. <span className="text-armoyu-primary font-bold">Butonlar, grafikler ve bildirimler</span> bu renge bürünür.
                                </p>
                            </div>
                        </div>

                        <div className="p-6 border-t border-armoyu-drawer-border">
                            <button
                                onClick={() => setUserMenuView('main')}
                                className="w-full py-4 bg-armoyu-primary text-white font-black rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-primary/20 active:scale-95"
                            >
                                Değişiklikleri Onayla
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

function ChevronDown({ size, className }: { size: number, className: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
    );
}

function Sun({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
    );
}

function Moon({ size }: { size: number }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
    );
}
