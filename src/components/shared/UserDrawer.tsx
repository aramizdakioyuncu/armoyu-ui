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
    GraduationCap
} from 'lucide-react';
import { InviteWidget } from '../modules/auth/widgets/InviteWidget';

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
    theme,
    toggleTheme,
    goToMyProfile,
    initialView = 'main',
    links
}: UserDrawerProps) {
    const [userMenuView, setUserMenuView] = useState<'main' | 'invite'>(initialView);
    const [isGroupsSubmenuOpen, setIsGroupsSubmenuOpen] = useState(false);

    // Sync view state when opened or initialView changes
    React.useEffect(() => {
        if (isOpen) {
            setUserMenuView(initialView);
        }
    }, [isOpen, initialView]);

    if (!isOpen || !user) return null;

    return (
        <div className="fixed inset-0 z-[300] flex justify-end animate-in fade-in duration-200">
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-sm"
                onClick={onClose}
            />
            <div className="relative w-[340px] max-w-[85vw] h-screen bg-armoyu-drawer-bg border-l border-armoyu-drawer-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300 z-50">
                {userMenuView === 'main' ? (
                    <>
                        {/* Profil Üst Bilgi */}
                        <div className="p-6 border-b border-armoyu-drawer-border flex justify-between items-start relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] -z-10 rounded-full" />
                            
                            <div className="flex gap-4 items-center">
                                <img 
                                    src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                                    alt="Avatar" 
                                    className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] object-cover bg-white/5" 
                                />
                                <div className="min-w-0">
                                    <h3 className="text-armoyu-text font-black text-lg leading-tight truncate">{user.displayName}</h3>
                                    <span className="text-blue-600 dark:text-blue-400 text-sm font-bold tracking-tighter">@{user.username}</span>
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
                                className="w-full flex items-center gap-3 p-3 text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 rounded-xl transition-all font-black border border-blue-500/20 text-left focus:outline-none group/prof mb-1"
                            >
                                <User size={18} className="group-hover/prof:scale-110 transition-transform" />
                                Profilime Git
                                <ArrowRight size={14} className="ml-auto opacity-40 group-hover/prof:opacity-100 group-hover/prof:translate-x-1 transition-all" />
                            </button>

                            <button 
                                onClick={() => setUserMenuView('invite')}
                                className="w-full flex items-center gap-3 p-3 text-emerald-600 dark:text-emerald-400 bg-emerald-500/5 hover:bg-emerald-500/10 rounded-xl transition-all font-black border border-emerald-500/20 text-left focus:outline-none group/invite mb-1"
                            >
                                <UserPlus size={18} className="group-hover/invite:scale-110 transition-transform" />
                                Davet Et & Kazan
                                <ArrowRight size={14} className="ml-auto opacity-40 group-hover/invite:opacity-100 group-hover/invite:translate-x-1 transition-all" />
                            </button>

                            {/* Management Panel Link */}
                            {['admin', 'member_mgmt', 'discipline', 'event_mgmt'].includes(user.role?.id || '') && (
                                <Link
                                    href={navigation.managementPrefix}
                                    onClick={onClose}
                                    className="flex items-center gap-3 p-3 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 rounded-xl transition-all font-black shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-2 group animate-in slide-in-from-right-4 duration-500"
                                >
                                    <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                                    Yönetim Paneli
                                    <Crown size={14} className="ml-auto opacity-50" />
                                </Link>
                            )}

                            <Link href={links?.posts || "/yazilarim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Bell size={14} /></span>
                                Yazılarım
                            </Link>

                            <Link href={links?.comments || "/yazilarim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><MessageSquare size={14} /></span>
                                Yorumlarım
                            </Link>

                            <Link href={links?.polls || navigation.pollPrefix || "/anketler"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Search size={14} /></span>
                                Anketler
                            </Link>

                            <Link href={links?.giveaways || navigation.giveawayPrefix || "/cekilisler"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><Gift size={14} /></span>
                                Çekilişler
                            </Link>

                            <Link href={links?.education || navigation.educationPrefix || "/egitim"} onClick={onClose} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border">
                                <span className="p-1.5 rounded-lg bg-black/5 dark:bg-white/5"><GraduationCap size={14} /></span>
                                Eğitim
                            </Link>

                            <Link href={links?.support || navigation.supportPrefix || "/destek"} onClick={onClose} className="flex items-center gap-3 p-3 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all font-bold border border-transparent hover:border-emerald-500/20">
                                <span className="p-1.5 rounded-lg bg-emerald-500/10"><Bell size={14} /></span>
                                Destek Bildirimleri
                            </Link>

                            <div className="space-y-1">
                                <button
                                    onClick={() => setIsGroupsSubmenuOpen(!isGroupsSubmenuOpen)}
                                    className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-bold border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none ${isGroupsSubmenuOpen ? 'text-blue-500 bg-blue-500/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                                >
                                    <Users size={18} />
                                    Gruplarım
                                    <ChevronDown size={14} className={`ml-auto transition-transform duration-300 ${isGroupsSubmenuOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {isGroupsSubmenuOpen && (
                                    <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                                        {userGroups.length > 0 ? (
                                            userGroups.map((group: any, gidx: number) => (
                                                <Link
                                                    key={gidx}
                                                    href={`${navigation.groupPrefix}/${group.group_ID || group.id || group.name.toLowerCase().replace(/\s+/g, '-')}`}
                                                    onClick={onClose}
                                                    className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-armoyu-text-muted hover:text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
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
                        </nav>

                        {/* Tema Butonu & Çıkış */}
                        <div className="p-4 border-t border-armoyu-drawer-border space-y-3">
                            <button
                                onClick={toggleTheme}
                                className="w-full py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-black text-[10px] uppercase tracking-widest"
                            >
                                <span>{theme === 'dark' ? 'Açık Temaya Geç' : 'Koyu Temaya Geç'}</span>
                                {theme === 'dark' ? <Sun size={14} /> : <Moon size={14} />}
                            </button>

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
                ) : (
                    <InviteWidget onBack={() => setUserMenuView('main')} />
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
