'use client';

import React, { useState } from 'react';
import { LoginWidget, RegisterWidget } from '../../index';
import { User, UserPlus, ShieldCheck, Layout } from 'lucide-react';

export function AuthTab() {
  const [activeTab, setActiveTab] = useState<'login' | 'register'>('login');

  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-4 duration-700">
       <div className="flex flex-col items-center justify-center text-center space-y-4 max-w-2xl mx-auto mb-8">
          <div className="w-20 h-20 bg-armoyu-primary/10 rounded-[32px] flex items-center justify-center mb-2">
             <ShieldCheck className="w-10 h-10 text-armoyu-primary" />
          </div>
          <h2 className="text-4xl font-black italic uppercase tracking-tighter">Kimlik Yönetimi</h2>
          <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest opacity-60">
             Premium Giriş ve Kayıt Widget'ları
          </p>
       </div>

       <div className="max-w-xl mx-auto w-full relative">
          {/* Internal Tab Switcher */}
          <div className="flex p-2 bg-zinc-100 dark:bg-white/5 backdrop-blur-xl rounded-[32px] mb-8 border border-zinc-200 dark:border-white/5 shadow-inner">
             <button
                onClick={() => setActiveTab('login')}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                   activeTab === 'login' 
                      ? 'bg-white dark:bg-zinc-800 text-armoyu-primary shadow-xl scale-100' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
             >
                <User className="w-4 h-4" />
                Giriş Yap
             </button>
             <button
                onClick={() => setActiveTab('register')}
                className={`flex-1 flex items-center justify-center gap-3 py-4 rounded-[24px] text-xs font-black uppercase tracking-widest transition-all duration-500 ${
                   activeTab === 'register' 
                      ? 'bg-white dark:bg-zinc-800 text-armoyu-primary shadow-xl scale-100' 
                      : 'text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                }`}
             >
                <UserPlus className="w-4 h-4" />
                Kayıt Ol
             </button>
          </div>

          {/* Widget Container */}
          <div className="relative overflow-visible p-1 min-h-[500px]">
             {activeTab === 'login' ? (
                <div className="animate-in fade-in slide-in-from-left-4 duration-500">
                   <LoginWidget isModal={true} />
                </div>
             ) : (
                <div className="animate-in fade-in slide-in-from-right-4 duration-500">
                   <RegisterWidget isModal={true} />
                </div>
             )}
          </div>
       </div>

       {/* Technical Info */}
       <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 pt-16 border-t border-zinc-200 dark:border-white/5">
          <div className="flex gap-4 p-6 glass-panel rounded-[32px] bg-armoyu-primary/5 border-armoyu-primary/10">
             <div className="p-3 bg-armoyu-primary/10 rounded-2xl h-fit">
                <Layout className="w-6 h-6 text-armoyu-primary" />
             </div>
             <div className="space-y-2">
                <h4 className="text-sm font-black uppercase italic">Dinamik Adaptasyon</h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-tighter">
                   Bu widget'lar, bulundukları konteynerin genişliğine göre (Modal veya Sayfa) otomatik olarak kendilerini optimize ederler.
                </p>
             </div>
          </div>
          <div className="flex gap-4 p-6 glass-panel rounded-[32px] bg-emerald-500/5 border-emerald-500/10">
             <div className="p-3 bg-emerald-500/10 rounded-2xl h-fit">
                <ShieldCheck className="w-6 h-6 text-emerald-500" />
             </div>
             <div className="space-y-2">
                <h4 className="text-sm font-black uppercase italic">Güvenli Auth Katmanı</h4>
                <p className="text-xs font-bold text-zinc-500 dark:text-zinc-400 leading-relaxed uppercase tracking-tighter">
                   Core kütüphanesi ile %100 uyumlu, form doğrulama ve gerçek zamanlı API geri bildirimleri ile donatılmıştır.
                </p>
             </div>
          </div>
       </div>
    </div>
  );
}
