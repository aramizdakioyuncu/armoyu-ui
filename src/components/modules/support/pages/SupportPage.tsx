'use client';

import React, { useState } from 'react';
import { PageWidth } from '../../../shared/PageWidth';
import { 
    Plus, 
    MessageCircle, 
    Clock, 
    CheckCircle2, 
    AlertCircle,
    Search,
    ChevronRight,
    Filter
} from 'lucide-react';

const MOCK_TICKETS = [
    {
        id: 'T-1042',
        subject: 'Hesap Doğrulama Hatası',
        status: 'Açık',
        priority: 'Yüksek',
        date: '2 saat önce',
        lastMessage: 'Belgeleriniz inceleniyor, lütfen bekleyiniz.',
        category: 'Hesap İşlemleri'
    },
    {
        id: 'T-1039',
        subject: 'Market Alışverişi Hakkında',
        status: 'Yanıtlandı',
        priority: 'Normal',
        date: '1 gün önce',
        lastMessage: 'Ödemeniz onaylandı, teşekkür ederiz.',
        category: 'Mağaza'
    },
    {
        id: 'T-1025',
        subject: 'Sunucu Bağlantı Sorunu',
        status: 'Kapalı',
        priority: 'Kritik',
        date: '3 gün önce',
        lastMessage: 'Sorun çözüldü, iyi oyunlar dileriz.',
        category: 'Teknik Destek'
    }
];

export function SupportPage() {
    const [activeTab, setActiveTab] = useState<'Tümü' | 'Açık' | 'Kapalı'>('Tümü');

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Açık': return 'bg-armoyu-primary/10 text-armoyu-primary border-armoyu-primary/20';
            case 'Yanıtlandı': return 'bg-armoyu-success/10 text-armoyu-success border-armoyu-success/20';
            case 'Kapalı': return 'bg-armoyu-secondary/10 text-armoyu-secondary border-armoyu-secondary/20';
            default: return 'bg-white/5 text-armoyu-text-muted border-white/5';
        }
    };

    return (
        <div className="pb-32 animate-in fade-in duration-700 bg-armoyu-bg min-h-screen">
            <PageWidth width="max-w-[1280px]" />

            <div className="max-w-[1280px] mx-auto px-6 md:px-12">
                {/* Header Section */}
                <div className="flex flex-col md:flex-row items-center justify-between gap-8 mb-16 pt-12">
                    <div className="flex-1 text-center md:text-left">
                        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none mb-4 drop-shadow-xl">
                            DESTEK <span className="text-armoyu-primary">BİLDİRİMLERİ</span>
                        </h1>
                        <p className="text-armoyu-text-muted text-sm md:text-base font-medium opacity-80 max-w-2xl leading-relaxed mx-auto md:mx-0">
                            Yaşadığın sorunları bize ilet, ARMOYU ekibi olarak en kısa sürede yardımcı olalım. Tüm taleplerin burada saklanır.
                        </p>
                    </div>

                    <button className="px-8 py-5 bg-armoyu-primary text-white rounded-[25px] font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-armoyu-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center gap-3 italic">
                        <Plus size={20} strokeWidth={3} /> YENİ DESTEK TALEBİ
                    </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                    {/* Sidebar Filters */}
                    <div className="lg:col-span-3 space-y-8">
                        <div className="glass-panel p-2 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg">
                            {['Tümü', 'Açık', 'Kapalı'].map((tab) => (
                                <button
                                    key={tab}
                                    onClick={() => setActiveTab(tab as any)}
                                    className={`w-full flex items-center justify-between px-6 py-4 rounded-3xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-armoyu-primary text-white shadow-xl shadow-armoyu-primary/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                                >
                                    <div className="flex items-center gap-3">
                                        {tab === 'Tümü' && <Filter size={14} />}
                                        {tab === 'Açık' && <Clock size={14} />}
                                        {tab === 'Kapalı' && <CheckCircle2 size={14} />}
                                        {tab}
                                    </div>
                                    <span className={`text-[10px] opacity-60 ${activeTab === tab ? 'text-white' : 'text-armoyu-primary'}`}>
                                        {tab === 'Tümü' ? '3' : tab === 'Açık' ? '2' : '1'}
                                    </span>
                                </button>
                            ))}
                        </div>

                        <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl overflow-hidden relative group">
                             <div className="absolute -top-10 -right-10 w-32 h-32 bg-armoyu-primary/5 rounded-full blur-3xl group-hover:bg-armoyu-primary/10 transition-all" />
                             <h4 className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest mb-4 relative z-10">Ortalama Yanıt Süresi</h4>
                             <div className="flex items-end gap-2 relative z-10">
                                <span className="text-3xl font-black text-armoyu-text italic">14</span>
                                <span className="text-xs font-bold text-armoyu-text-muted mb-1 uppercase">Dakika</span>
                             </div>
                             <p className="text-[9px] font-bold text-armoyu-text-muted mt-4 uppercase tracking-widest opacity-60">Son 24 saatteki verilerdir.</p>
                        </div>
                    </div>

                    {/* Tickets List */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Search Bar */}
                        <div className="relative group">
                            <input 
                                type="text" 
                                placeholder="BİLDİRİM ARA (ID, KONU...)"
                                className="w-full h-16 pl-14 pr-6 bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl text-[10px] font-black uppercase tracking-[0.15em] focus:border-armoyu-primary outline-none transition-all placeholder:text-armoyu-text-muted/40 shadow-sm"
                            />
                            <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors opacity-50" />
                        </div>

                        <div className="space-y-4">
                            {MOCK_TICKETS.map((ticket) => (
                                <div 
                                    key={ticket.id}
                                    className="group glass-panel p-6 md:p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:shadow-2xl transition-all cursor-pointer flex flex-col md:flex-row items-center gap-6"
                                >
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 border ${getStatusStyles(ticket.status)}`}>
                                        {ticket.status === 'Yanıtlandı' ? <MessageCircle size={24} /> : ticket.status === 'Açık' ? <Clock size={24} /> : <CheckCircle2 size={24} />}
                                    </div>

                                    <div className="flex-1 text-center md:text-left min-w-0">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-2">
                                            <span className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest">{ticket.id}</span>
                                            <span className="text-[10px] font-black text-armoyu-text-muted opacity-40 uppercase tracking-widest">•</span>
                                            <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">{ticket.category}</span>
                                        </div>
                                        <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic group-hover:text-armoyu-primary transition-colors mb-2 truncate">
                                            {ticket.subject}
                                        </h3>
                                        <p className="text-sm text-armoyu-text-muted font-medium opacity-60 truncate">
                                            {ticket.lastMessage}
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center md:items-end gap-3 shrink-0">
                                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border ${getStatusStyles(ticket.status)}`}>
                                            {ticket.status}
                                        </div>
                                        <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-40 italic">{ticket.date}</span>
                                    </div>

                                    <div className="hidden md:flex w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 items-center justify-center text-armoyu-text-muted group-hover:bg-armoyu-primary group-hover:text-white transition-all">
                                        <ChevronRight size={20} strokeWidth={3} />
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Bottom Info */}
                        <div className="py-12 flex flex-col items-center justify-center text-center">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-armoyu-text-muted mb-4">
                                <AlertCircle size={24} />
                            </div>
                            <h4 className="text-[10px] font-black text-armoyu-text uppercase tracking-widest mb-2">Başka Bir Sorun mu Var?</h4>
                            <p className="text-[11px] font-medium text-armoyu-text-muted max-w-xs leading-relaxed uppercase opacity-60">
                                Eğer aradığını bulamadıysan Discord sunucumuz üzerinden de bize ulaşabilirsin.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
