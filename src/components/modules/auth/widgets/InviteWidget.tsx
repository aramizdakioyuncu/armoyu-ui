'use client';

import React, { useState, useEffect } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import {
    UserPlus,
    RefreshCw,
    Copy,
    Check,
    Users,
    ChevronRight,
    Search,
    User as UserIcon,
    ArrowLeft,
    Bell
} from 'lucide-react';

interface InviteWidgetProps {
    onBack?: () => void;
}

export function InviteWidget({ onBack }: InviteWidgetProps) {
    const { api } = useArmoyu();
    const { user } = useAuth();
    const [inviteCode, setInviteCode] = useState<string>(user?.inviteCode || '');
    const [invitations, setInvitations] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isRefreshing, setIsRefreshing] = useState(false);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        fetchInvitations();
    }, []);

    const fetchInvitations = async () => {
        setIsLoading(true);
        try {
            const response = await api.users.getInvitationsList(1);
            if (response.durum === 1) {
                setInvitations(response.icerik || []);
            }
        } catch (error) {
            console.error('[InviteWidget] Fetch invitations error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleRefreshCode = async () => {
        if (isRefreshing) return;
        setIsRefreshing(true);
        try {
            const response = await api.users.refreshInviteCode();
            if (response.durum === 1) {
                setInviteCode(response.icerik || '');
            }
        } catch (error) {
            console.error('[InviteWidget] Refresh code error:', error);
        } finally {
            setIsRefreshing(false);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(inviteCode);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleSendVerification = async (userId: string | number) => {
        try {
            const response = await api.users.sendVerificationEmail(userId);
            if (response.durum === 1) {
                // Success feedback if needed
            }
        } catch (error) {
            console.error('[InviteWidget] Send verification error:', error);
        }
    };

    return (
        <div className="flex flex-col h-full animate-in slide-in-from-right duration-300">
            {/* Header */}
            <div className="p-4 border-b border-armoyu-drawer-border flex items-center gap-3">
                <button
                    onClick={onBack}
                    className="p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-xl text-armoyu-text-muted transition-all"
                >
                    <ArrowLeft size={20} />
                </button>
                <h3 className="text-armoyu-text font-black uppercase tracking-tighter italic">Davet Et & Kazan</h3>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-6 hide-scrollbar">
                {/* Invite Code Card */}
                <div className="bg-gradient-to-br from-blue-600 to-indigo-600 rounded-[32px] p-6 text-white shadow-xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 blur-3xl -mr-10 -mt-10 group-hover:bg-white/20 transition-all duration-700" />

                    <div className="relative z-10 space-y-4">
                        <div className="flex items-center justify-between">
                            <span className="text-[10px] font-black uppercase tracking-widest opacity-80 italic">Özel Davet Kodun</span>
                            <button
                                onClick={handleRefreshCode}
                                className={`p-2 bg-white/10 hover:bg-white/20 rounded-xl transition-all ${isRefreshing ? 'animate-spin' : ''}`}
                                title="Yenile"
                            >
                                <RefreshCw size={14} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between bg-black/20 backdrop-blur-md rounded-2xl p-4 border border-white/10">
                            <span className="text-2xl font-black tracking-widest font-mono">{inviteCode || '------'}</span>
                            <button
                                onClick={copyToClipboard}
                                className="flex items-center gap-2 px-3 py-2 bg-white text-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest hover:bg-blue-50 transition-all active:scale-95"
                            >
                                {copied ? <Check size={14} /> : <Copy size={14} />}
                                {copied ? 'KOPYALANDI' : 'KOPYALA'}
                            </button>
                        </div>

                        <p className="text-[9px] font-bold opacity-60 uppercase tracking-widest text-center leading-relaxed">
                            Arkadaşlarını bu kodla davet et, aramıza katılan her kişi için ödüller kazan!
                        </p>
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3">
                    <div className="bg-armoyu-card-bg border border-armoyu-drawer-border rounded-3xl p-4 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="text-xl font-black text-armoyu-text italic">{invitations.length}</span>
                        <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">Toplam Davet</span>
                    </div>
                    <div className="bg-armoyu-card-bg border border-armoyu-drawer-border rounded-3xl p-4 flex flex-col items-center justify-center text-center gap-1 shadow-sm">
                        <span className="text-xl font-black text-blue-500 italic">0</span>
                        <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">Kazanılan Puan</span>
                    </div>
                </div>

                {/* Invitations List */}
                <div className="space-y-4">
                    <div className="flex items-center justify-between px-1">
                        <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-60">Davet Edilenler</h4>
                        <Users size={14} className="text-armoyu-text-muted opacity-40" />
                    </div>

                    <div className="space-y-2">
                        {isLoading ? (
                            Array.from({ length: 3 }).map((_, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 animate-pulse">
                                    <div className="w-10 h-10 rounded-xl bg-white/10" />
                                    <div className="flex-1 space-y-2">
                                        <div className="h-3 w-24 bg-white/10 rounded" />
                                        <div className="h-2 w-16 bg-white/5 rounded" />
                                    </div>
                                </div>
                            ))
                        ) : invitations.length > 0 ? (
                            invitations.map((inv, idx) => (
                                <div key={idx} className="flex items-center gap-3 p-3 bg-white/5 rounded-2xl border border-white/5 hover:border-blue-500/30 transition-all group/item">
                                    <img
                                        src={inv.avatar}
                                        className="w-10 h-10 rounded-xl object-cover"
                                        alt=""
                                    />
                                    <div className="flex-1 min-w-0">
                                        <div className="text-xs font-black text-armoyu-text uppercase tracking-tighter truncate">{inv.displayName || inv.username}</div>
                                        <div className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-widest">{inv.date || 'Yeni Katıldı'}</div>
                                    </div>

                                    {inv.verified ? (
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]" />
                                    ) : (
                                        <button
                                            onClick={() => handleSendVerification(inv.id)}
                                            className="p-2 bg-blue-500/10 hover:bg-blue-500 text-blue-600 hover:text-white rounded-lg transition-all"
                                            title="Doğrulama Maili Gönder"
                                        >
                                            <Bell size={12} />
                                        </button>
                                    )}
                                </div>
                            ))
                        ) : (
                            <div className="py-12 text-center bg-white/5 rounded-[32px] border border-dashed border-white/10">
                                <UserPlus size={32} className="mx-auto mb-3 text-armoyu-text-muted opacity-20" />
                                <p className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest opacity-40">Henüz kimseyi davet etmedin</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Action */}
            <div className="p-6 mt-auto">
                <button
                    onClick={copyToClipboard}
                    className="w-full py-4 bg-white/5 hover:bg-blue-600 hover:text-white rounded-2xl border border-white/10 text-armoyu-text font-black text-[10px] uppercase tracking-widest transition-all shadow-xl flex items-center justify-center gap-3 group"
                >
                    <UserPlus size={16} className="group-hover:scale-110 transition-transform" />
                    Davet Bağlantısını Paylaş
                </button>
            </div>
        </div>
    );
}
