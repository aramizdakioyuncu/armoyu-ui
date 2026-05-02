'use client';

import React, { useState } from 'react';
import { CreditCard, ShieldCheck, ArrowLeft, ArrowRight, CheckCircle2 } from 'lucide-react';

interface CheckoutLayoutProps {
  onBack: () => void;
  onSuccess: () => void;
  totalAmount: number;
}

export function CheckoutLayout({ onBack, onSuccess, totalAmount }: CheckoutLayoutProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cardNumber: '',
    expiry: '',
    cvv: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY' }).format(price);
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
      <div className="mb-12">
        <button 
          onClick={onBack}
          className="group inline-flex items-center gap-3 px-6 py-3 bg-white/5 hover:bg-white/10 text-armoyu-text rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all border border-white/5 mb-8 active:scale-95"
        >
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span>GERİ DÖN</span>
        </button>

        <h1 className="text-4xl md:text-6xl font-black text-armoyu-text uppercase tracking-tighter italic leading-tight text-center">
          GÜVENLİ <span className="text-armoyu-primary">ÖDEME</span>
        </h1>
        
        {/* Progress Stepper */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 1 ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>1</div>
          <div className={`w-12 h-0.5 rounded-full ${step >= 2 ? 'bg-armoyu-primary' : 'bg-white/10'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 2 ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>2</div>
          <div className={`w-12 h-0.5 rounded-full ${step >= 3 ? 'bg-armoyu-primary' : 'bg-white/10'}`} />
          <div className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-xs transition-all ${step >= 3 ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/20' : 'bg-white/5 text-armoyu-text-muted border border-white/10'}`}>3</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-5xl mx-auto">
        
        {/* Form Area */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
          {step === 1 && (
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
              <h2 className="text-sm font-black text-armoyu-text uppercase tracking-widest mb-8">İLETİŞİM BİLGİLERİ</h2>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Ad Soyad</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} placeholder="Adınız ve Soyadınız" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">E-Posta</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="ornek@mail.com" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Telefon</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="05XX XXX XX XX" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                </div>
                <button onClick={() => setStep(2)} className="group w-full py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95 flex items-center justify-center gap-2">
                  <span>SONRAKİ ADIM</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl">
              <h2 className="text-sm font-black text-armoyu-text uppercase tracking-widest mb-8">ÖDEME BİLGİLERİ</h2>
              
              {/* Card Preview Mockup */}
              <div className="w-full aspect-[1.586/1] bg-gradient-to-br from-armoyu-primary to-indigo-900 rounded-3xl p-8 mb-8 text-white shadow-2xl relative overflow-hidden flex flex-col justify-between group">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32 blur-3xl group-hover:scale-110 transition-transform duration-700" />
                <div className="flex justify-between items-start z-10">
                  <CreditCard size={32} className="opacity-80" />
                  <span className="text-[10px] font-black tracking-widest opacity-80 uppercase italic">GÜVENLİ KART</span>
                </div>
                <div className="space-y-4 z-10">
                  <div className="text-2xl font-mono tracking-[0.2em] font-medium transition-all group-hover:scale-105 origin-left">
                    {formData.cardNumber ? formData.cardNumber.padEnd(16, '•').replace(/(.{4})/g, '$1 ') : '•••• •••• •••• ••••'}
                  </div>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">Kart Sahibi</p>
                      <p className="text-xs uppercase font-bold tracking-tight">{formData.name || 'AD SOYAD'}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-[8px] font-black uppercase tracking-widest opacity-60 mb-1 leading-none">SKT</p>
                      <p className="text-xs font-bold">{formData.expiry || 'MM/YY'}</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Kart Numarası</label>
                  <input type="text" name="cardNumber" maxLength={16} value={formData.cardNumber} onChange={handleInputChange} placeholder="0000 0000 0000 0000" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">Son Kullanma</label>
                    <input type="text" name="expiry" maxLength={5} value={formData.expiry} onChange={handleInputChange} placeholder="AA/YY" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-1">CVV</label>
                    <input type="password" name="cvv" maxLength={3} value={formData.cvv} onChange={handleInputChange} placeholder="***" className="w-full bg-black/10 dark:bg-white/5 border border-white/10 rounded-2xl px-6 py-4 text-sm font-bold text-armoyu-text focus:outline-none focus:border-armoyu-primary transition-all shadow-inner" />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button onClick={() => setStep(1)} className="flex-1 py-5 bg-white/5 hover:bg-white/10 text-armoyu-text font-black text-xs uppercase tracking-widest rounded-2xl transition-all border border-white/5 active:scale-95">GERİ</button>
                  <button onClick={() => {onSuccess(); setStep(3);}} className="flex-[2] py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95">ÖDEME YAP</button>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="text-center py-20 glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl animate-in zoom-in-95 duration-500">
              <div className="w-20 h-20 bg-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 mx-auto mb-8 animate-bounce">
                <CheckCircle2 size={40} strokeWidth={3} />
              </div>
              <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-4">SİPARİŞİN ALINDI!</h2>
              <p className="text-armoyu-text-muted font-medium mb-12 italic">Siparişin başarıyla oluşturuldu. <span className="text-armoyu-primary font-bold uppercase tracking-widest">#AR-2024-812</span> numaralı siparişini profilinden takip edebilirsin.</p>
              <div className="flex flex-col gap-4">
                <button 
                  onClick={onBack}
                  className="w-full py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95"
                >
                  MAĞAZAYA DÖN
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info Sidebar */}
        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500">
          <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg">
            <h2 className="text-xs font-black text-armoyu-text uppercase tracking-widest mb-6">SİPARİŞ ÖZETİ</h2>
            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center bg-black/10 dark:bg-white/5 p-4 rounded-2xl border border-white/5">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-armoyu-primary/10 rounded-lg flex items-center justify-center text-armoyu-primary font-black text-xs">ÖZET</div>
                  <div className="text-[10px] font-black uppercase text-armoyu-text leading-tight">Sepet Toplamı</div>
                </div>
                <span className="text-xs font-black text-armoyu-primary">{formatPrice(totalAmount)}</span>
              </div>
            </div>
            <div className="border-t border-white/5 pt-6 space-y-4">
              <div className="flex justify-between text-xl font-black text-armoyu-text pt-4 italic">
                <span>TOPLAM</span>
                <span className="text-armoyu-primary">{formatPrice(totalAmount * 1.2)}</span>
              </div>
              <p className="text-[9px] text-armoyu-text-muted font-bold text-center uppercase tracking-widest opacity-60">%20 KDV DAHİL</p>
            </div>
          </div>

          {/* Security Badges */}
          <div className="flex flex-col gap-4 text-center p-6 border border-dashed border-armoyu-card-border rounded-[32px]">
            <div className="flex items-center justify-center gap-6 opacity-30 grayscale invert dark:invert-0">
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Visa_Inc._logo.svg/2560px-Visa_Inc._logo.svg.png" className="h-4 object-contain" alt="Visa" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Mastercard-logo.svg/1280px-Mastercard-logo.svg.png" className="h-6 object-contain" alt="Mastercard" />
               <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b5/PayPal.svg/1200px-PayPal.svg.png" className="h-4 object-contain" alt="PayPal" />
            </div>
            <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-widest flex items-center justify-center gap-2">
              <ShieldCheck size={12} className="text-emerald-500" />
              TÜM VERİLERİNİZ SSL İLE ŞİFRELENMEKTEDİR
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}
