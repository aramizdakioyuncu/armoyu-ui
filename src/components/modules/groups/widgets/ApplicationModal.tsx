'use client';

import React, { useEffect } from 'react';

interface ApplicationModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedRole?: string;
}

const ACTIVE_ROLES = [
  "Genel Başvuru",
  "Yazılım Geliştirici",
  "Grafik Tasarımcı",
  "Sosyal Medya Sorumlusu",
  "Oyun Yetkilisi",
  "Yayıncı",
  "E-Spor Oyuncusu",
  "Moderatör"
];

export function ApplicationModal({ isOpen, onClose, selectedRole }: ApplicationModalProps) {
  // ESC tuşu ile kapatma
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-xl animate-in fade-in duration-500"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-xl glass-panel bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-[0_32px_120px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 fade-in duration-500">
        
        {/* Glow Effects */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-armoyu-primary/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-armoyu-primary/5 blur-[80px] rounded-full -ml-24 -mb-24 pointer-events-none" />

        {/* Header */}
        <div className="p-10 pb-8 border-b border-armoyu-card-border flex items-start justify-between relative z-10">
           <div>
              <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">EKİP BAŞVURUSU</h2>
              <div className="flex items-center gap-2 mt-3">
                 <span className="w-2 h-2 rounded-full bg-armoyu-primary animate-pulse shadow-[0_0_8px_rgba(var(--armoyu-primary-rgb),0.8)]" />
                 <p className="text-[10px] font-black text-armoyu-primary uppercase tracking-[0.2em]">
                    ARMOYU AKADEMİSİNE HOŞ GELDİNİZ
                 </p>
              </div>
           </div>
           <button 
             onClick={onClose}
             className="w-12 h-12 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group active:scale-90"
           >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="group-hover:rotate-90 transition-transform"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>

        {/* Form Body */}
        <form className="p-10 pt-8 space-y-8 relative z-10" onSubmit={(e) => { e.preventDefault(); alert('Başvurunuz başarıyla alındı!'); onClose(); }}>
           <div className="space-y-6">
              
              {/* Pozisyon Seçimi */}
              <div className="space-y-2.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-armoyu-primary/50" />
                    Pozisyon (Aktif İlanlar)
                 </label>
                 <div className="relative group">
                    <select 
                       defaultValue={selectedRole || "Genel Başvuru"}
                       className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-6 py-4 text-armoyu-text focus:outline-none focus:border-armoyu-primary/50 focus:ring-1 focus:ring-armoyu-primary/50 transition-all font-black text-sm appearance-none cursor-pointer group-hover:border-armoyu-text-muted/30 uppercase tracking-tight"
                    >
                       {ACTIVE_ROLES.map(role => (
                          <option key={role} value={role} className="bg-[#12121a] text-white py-4">{role}</option>
                       ))}
                    </select>
                    <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none text-armoyu-text-muted transition-transform group-hover:translate-y-[-40%]">
                       <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
                    </div>
                 </div>
              </div>

              {/* Kişisel Bilgiler Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">AD SOYAD</label>
                    <input required type="text" className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-6 py-4 text-armoyu-text placeholder:text-armoyu-text-muted/40 focus:outline-none focus:border-armoyu-primary/50 focus:ring-1 focus:ring-armoyu-primary/50 transition-all font-bold text-sm uppercase tracking-tight" placeholder="Örn: Berkay Tikenoğlu" />
                 </div>
                 <div className="space-y-2.5">
                    <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">YAŞ</label>
                    <input required type="number" min="13" max="99" className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-6 py-4 text-armoyu-text focus:outline-none focus:border-armoyu-primary/50 focus:ring-1 focus:ring-armoyu-primary/50 transition-all font-bold text-sm" placeholder="Örn: 24" />
                 </div>
              </div>

              <div className="space-y-2.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">E-POSTA ADRESİ</label>
                 <input required type="email" className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-6 py-4 text-armoyu-text placeholder:text-armoyu-text-muted/40 focus:outline-none focus:border-armoyu-primary/50 focus:ring-1 focus:ring-armoyu-primary/50 transition-all font-bold text-sm" placeholder="ornek@armoyu.com" />
              </div>

              <div className="space-y-2.5">
                 <label className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1">TECRÜBELER & KENDİNDEN BAHSET</label>
                 <textarea required rows={4} className="w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-6 py-4 text-armoyu-text placeholder:text-armoyu-text-muted/40 focus:outline-none focus:border-armoyu-primary/50 focus:ring-1 focus:ring-armoyu-primary/50 transition-all font-medium text-sm no-scrollbar resize-none leading-relaxed" placeholder="Neden sizi aramıza almalıyız? İlgili tecrübeleriniz nelerdir?.." />
              </div>
           </div>

           <div className="pt-4">
              <button className="w-full py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl shadow-armoyu-primary/20 transition-all active:scale-95 relative overflow-hidden group/btn">
                 <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000" />
                 BAŞVURUYU TAMAMLA
              </button>
           </div>
           
           <div className="flex items-center gap-3 p-4 bg-armoyu-primary/5 border border-armoyu-primary/10 rounded-2xl">
              <div className="w-1.5 h-full bg-armoyu-primary rounded-full" />
              <p className="text-[9px] text-armoyu-text-muted uppercase tracking-widest leading-relaxed font-bold">
                 Başvurunuz incelendikten sonra e-posta ve SMS yoluyla tarafınıza bilgilendirme yapılacaktır. Lütfen bilgilerin doğruluğundan emin olun. ✨
              </p>
           </div>
        </form>
      </div>
    </div>
  );
}
