'use client';

import React, { useState } from 'react';
import { X, ShieldCheck, GraduationCap, Lock, ArrowRight, CheckCircle2 } from 'lucide-react';

interface SchoolJoinModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedSchool?: string;
}

const MOCK_SCHOOLS = [
  "İstanbul Teknik Üniversitesi",
  "Yıldız Teknik Üniversitesi",
  "Boğaziçi Üniversitesi",
  "Orta Doğu Teknik Üniversitesi",
  "Hacettepe Üniversitesi",
  "Koç Üniversitesi",
  "Sabancı Üniversitesi"
];

export function SchoolJoinModal({ isOpen, onClose, selectedSchool }: SchoolJoinModalProps) {
  const [school, setSchool] = useState(selectedSchool || MOCK_SCHOOLS[0]);
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
      }, 2000);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div className="relative w-full max-w-lg glass-panel bg-armoyu-card-bg border border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header Decor */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-armoyu-primary/20 to-indigo-600/20 -z-10" />
        
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-16 rounded-2xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
              <GraduationCap size={32} />
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-white/5 hover:bg-white/10 rounded-2xl text-armoyu-text-muted hover:text-white transition-all"
            >
              <X size={20} />
            </button>
          </div>

          {!isSuccess ? (
            <>
              <div className="mb-8">
                <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">OKULA KATIL</h2>
                <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">
                   Akademik dünyada yerini almak için bilgilerini gir.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] ml-2">Okul / Kampüs Seçimi</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors">
                      <GraduationCap size={18} />
                    </div>
                    <select 
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      className="w-full h-16 pl-14 pr-6 bg-black/5 dark:bg-white/5 border border-white/5 rounded-[24px] text-xs font-black uppercase tracking-widest focus:border-armoyu-primary outline-none transition-all appearance-none cursor-pointer"
                    >
                      {MOCK_SCHOOLS.map(s => (
                        <option key={s} value={s} className="bg-zinc-900 text-white">{s}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="space-y-4">
                  <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] ml-2">Giriş Parolası</label>
                  <div className="relative group">
                    <div className="absolute left-5 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors">
                      <Lock size={18} />
                    </div>
                    <input 
                      type="password"
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full h-16 pl-14 pr-6 bg-black/5 dark:bg-white/5 border border-white/5 rounded-[24px] text-sm font-black tracking-widest focus:border-armoyu-primary outline-none transition-all focus:ring-4 focus:ring-armoyu-primary/10"
                    />
                  </div>
                </div>

                <div className="p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 flex gap-4 items-start">
                   <ShieldCheck className="text-emerald-500 shrink-0" size={20} />
                   <p className="text-[10px] font-bold text-emerald-500/80 leading-relaxed uppercase">
                      Bu okul onaylı bir eğitim kurumudur. Parola gereksinimi okul yönetimi tarafından belirlenmiştir.
                   </p>
                </div>

                <button 
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-16 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white font-black text-sm uppercase tracking-[0.2em] rounded-[24px] shadow-xl shadow-armoyu-primary/20 transition-all active:scale-95 disabled:opacity-50 flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>BAŞVURUYU TAMAMLA <ArrowRight size={18} strokeWidth={3} /></>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="py-12 text-center animate-in fade-in zoom-in duration-500">
               <div className="w-24 h-24 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto mb-6">
                  <CheckCircle2 size={48} />
               </div>
               <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">TEBRİKLER!</h2>
               <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">
                  Katılım talebin başarıyla iletildi.
               </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
