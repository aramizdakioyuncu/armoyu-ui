'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { useAuth } from '../../../../context/AuthContext';
import { Mail, Lock, QrCode, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LoginWidgetProps {
  onSuccess?: () => void;
  registerHref?: string;
  forgotPasswordHref?: string;
  isModal?: boolean;
}

export function LoginWidget({ 
  onSuccess, 
  registerHref = "/register", 
  forgotPasswordHref = "/forgot-password",
  isModal = false
}: LoginWidgetProps) {
  const { login } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // QR Kod State'leri
  const [qrValue, setQrValue] = useState('');
  const [qrProgress, setQrProgress] = useState(100);

  useEffect(() => {
    const generateQR = () => {
      setQrValue(`armoyu_mobile_auth_${Math.random().toString(36).substring(2, 15)}`);
      setQrProgress(100);
    };

    generateQR();
    const refreshInterval = setInterval(generateQR, 20000);
    const progressInterval = setInterval(() => {
      setQrProgress((prev) => Math.max(0, prev - (100 / (20000 / 100)))); 
    }, 100);

    return () => {
      clearInterval(refreshInterval);
      clearInterval(progressInterval);
    };
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);
    
    try {
      await login(username, password);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Giriş yapılamadı!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`grid lg:grid-cols-2 gap-0 overflow-hidden ${isModal ? 'bg-transparent' : 'bg-[#0a0a0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl'}`}>
      
      {/* Left Side: Traditional Login */}
      <div className={`${isModal ? 'p-6 md:p-10' : 'p-8 md:p-12 lg:p-16'} flex flex-col justify-center relative`}>
        <header className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic uppercase mb-2">
            Giriş <span className="text-blue-500">Yap</span>
          </h2>
          <p className="text-armoyu-text-muted text-xs font-bold italic uppercase tracking-widest opacity-60">Dünyanı yönetmeye hazır mısın?</p>
        </header>

        {/* Test Account Assistant */}
        <div className="mb-8 p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400">
              <ShieldCheck size={16} />
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-wider italic">Test Asistanı</p>
          </div>
          <button 
            type="button"
            onClick={() => { setUsername('berkaytikenoglu'); setPassword('armo-v3'); }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95"
          >
            Doldur
          </button>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-xl text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="space-y-1.5">
            <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Oyuncu Adı</label>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                <Mail size={16} />
              </div>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-sm"
                placeholder="Kullanıcı adın..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Şifre</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                <Lock size={16} />
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold tracking-[0.3em] text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
               <input type="checkbox" id="remember-widget" className="w-3.5 h-3.5 rounded bg-white/5 border-white/10 text-blue-500 focus:ring-blue-500 cursor-pointer" />
               <label htmlFor="remember-widget" className="text-[10px] font-bold text-armoyu-text-muted cursor-pointer hover:text-white transition-colors uppercase tracking-widest">Beni Hatırla</label>
            </div>
            <Link href={forgotPasswordHref} className="text-[10px] font-black text-blue-500 hover:text-blue-400 uppercase tracking-widest transition-colors italic">Şifremi Unuttum?</Link>
          </div>

          <Button 
             variant="primary" 
             className="w-full h-12 text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/10 mt-6 group"
             isLoading={isSubmitting}
          >
            <div className="flex items-center justify-center gap-2">
              OTURUM AÇ
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          {!isModal && (
            <p className="text-center text-armoyu-text-muted text-[10px] font-black mt-8 uppercase tracking-[0.2em]">
              Aramızda değil misin? 
              <Link href={registerHref} className="text-white hover:text-blue-500 ml-2 underline underline-offset-4 decoration-blue-500/30 transition-colors italic">KAYIT OL</Link>
            </p>
          )}
        </form>
      </div>

      {/* Right Side: QR Login */}
      <div className={`flex bg-gradient-to-br from-blue-600/5 via-[#0a0a0f] to-purple-600/5 p-10 flex-col items-center justify-center relative border-l border-white/5 overflow-hidden ${isModal ? 'hidden md:flex' : 'hidden lg:flex'}`}>
        <div className="relative z-10 text-center w-full max-w-[260px]">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group">
                <QrCode size={32} className="text-blue-500 group-hover:scale-110 transition-transform" />
             </div>
          </div>

          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-3">Mobil Giriş</h3>
          <p className="text-[10px] font-bold text-armoyu-text-muted leading-relaxed uppercase tracking-widest mb-8 opacity-60">
            Uygulamayı aç ve saniyeler içinde bağlan.
          </p>

          <div className="relative p-4 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5 shadow-2xl group mx-auto w-fit">
             <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-blue-400 to-transparent animate-scan" />
             <div className="bg-white p-4 rounded-[18px]">
                <img 
                  src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${qrValue}`}
                  alt="QR"
                  className="w-36 h-36 opacity-90 group-hover:opacity-100 transition-opacity"
                />
             </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
             <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 to-purple-500 shadow-[0_0_10px_rgba(59,130,246,0.3)] transition-all duration-100"
                  style={{ width: `${qrProgress}%` }}
                />
             </div>
             <span className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
               <Sparkles size={10} className="text-blue-500 animate-pulse" />
               Yenileniyor: {Math.ceil((qrProgress / 100) * 20)}s
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
