'use client';

import React from 'react';
import { 
  ArrowLeft, 
  RotateCcw, 
  Search, 
  Ghost,
  AlertTriangle,
  LucideIcon
} from 'lucide-react';

export interface NotFoundProps {
  /** Hata kodu (varsayılan: 404) */
  code?: string | number;
  /** Ana başlık */
  title?: string;
  /** Alt başlık / Mesaj */
  message?: string;
  /** Görünecek ana ikon (varsayılan: Ghost) */
  icon?: LucideIcon;
  /** Ana aksiyon butonu metni */
  actionText?: string;
  /** Ana aksiyon butonu hedefi (varsayılan: /) */
  actionHref?: string;
  /** Ekstra CSS sınıfları */
  className?: string;
  /** Konsol log benzeri alt bilgi (opsiyonel) */
  footerMessage?: string;
}

export function NotFound({
  code = "404",
  title = "HARİTA YÜKLENEMEDİ!",
  message = "Eyvah! Aradığın sayfa ya platformdan banlandı, ya da admin seni yanlışlıkla gerçeklikten kickledi.",
  icon: Icon = Ghost,
  actionText = "ANA SAYFAYA RESPAWN OL",
  actionHref = "/",
  className = "",
  footerMessage = "error: target_not_found"
}: NotFoundProps) {
  return (
    <div className={`flex flex-col items-center justify-center p-6 text-center animate-in fade-in zoom-in duration-700 relative overflow-hidden min-h-[60vh] ${className}`}>
      
      {/* Decorative Glows */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-armoyu-primary/10 blur-[120px] rounded-full -z-10" />

      {/* Main Content */}
      <div className="space-y-8 max-w-2xl relative">
        
        {/* Funny Icon */}
        <div className="relative inline-block group">
           <div className="absolute inset-0 bg-armoyu-primary/20 blur-2xl rounded-full group-hover:bg-armoyu-primary/40 transition-all duration-500" />
           <div className="relative p-8 bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-2xl animate-bounce-slow">
              <Icon size={80} className="text-armoyu-primary group-hover:scale-110 transition-transform duration-500" />
           </div>
           <div className="absolute -top-2 -right-2 p-3 bg-red-500 text-white rounded-2xl shadow-lg animate-pulse">
              <AlertTriangle size={20} />
           </div>
        </div>

        {/* Error Code & Message */}
        <div className="space-y-4">
           {code && (
             <h1 className="text-9xl font-black text-armoyu-text tracking-tighter opacity-10 leading-none">
               {code}
             </h1>
           )}
           <h2 className="text-4xl font-black text-armoyu-text uppercase italic tracking-tight -mt-16">
              {title}
           </h2>
           <p className="text-lg font-medium text-armoyu-text-muted leading-relaxed max-w-md mx-auto">
              {message}
           </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
           <a 
             href={actionHref} 
             className="flex items-center gap-3 px-8 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95 group uppercase tracking-widest text-xs italic"
           >
              <RotateCcw size={18} className="group-hover:rotate-180 transition-transform duration-500" />
              {actionText}
           </a>
           
           <button 
             onClick={() => typeof window !== 'undefined' && window.history.back()}
             className="flex items-center gap-3 px-8 py-4 bg-armoyu-card-bg border border-armoyu-card-border text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 font-black rounded-2xl transition-all active:scale-95 uppercase tracking-widest text-xs italic"
           >
              <ArrowLeft size={18} />
              Önceki Checkpoint'e Dön
           </button>
        </div>

        {/* Console-like Footer */}
        {footerMessage && (
          <div className="pt-12">
             <div className="inline-flex items-center gap-2 px-4 py-2 bg-black/5 dark:bg-white/5 rounded-xl border border-armoyu-card-border font-mono text-[10px] text-armoyu-text-muted uppercase tracking-widest">
                <Search size={12} /> console.log("{footerMessage}")
             </div>
          </div>
        )}

      </div>

    </div>
  );
}
