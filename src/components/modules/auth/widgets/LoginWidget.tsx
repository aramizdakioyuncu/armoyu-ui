'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '../../../../components/Button';
import { useAuth } from '../../../../context/AuthContext';
import { Mail, Lock, QrCode, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface LoginWidgetProps {
  onSuccess?: () => void;
  onRegisterClick?: () => void;
  registerHref?: string;
  forgotPasswordHref?: string;
  isModal?: boolean;
}

export function LoginWidget({ 
  onSuccess, 
  onRegisterClick,
  registerHref = "/register", 
  forgotPasswordHref = "/forgot-password",
  isModal = false
}: LoginWidgetProps) {
  const { login, user, logout } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      console.log('[LoginWidget] Giriş denemesi:', username);
      await login(username, password);
      
      // Eğer login fırlatmadıysa başarılı kabul et
      console.log('[LoginWidget] Giriş başarılı!');
      setIsSuccess(true);
      
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 1500);
    } catch (err: any) {
      console.error('[LoginWidget] Giriş hatası:', err);
      setError(err?.message || 'Giriş yapılamadı! Kullanıcı adı veya şifre hatalı olabilir.');
      setIsSuccess(false);
      setIsSubmitting(false);
    }
  };

  // Zaten Giriş Yapılmış Ekranı
  if (user && !isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center animate-in fade-in zoom-in duration-500 ${isModal ? 'bg-transparent' : 'bg-[#0a0a0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl min-h-[400px]'}`}>
        <div className="w-24 h-24 rounded-[40px] bg-armoyu-primary/10 border-4 border-armoyu-bg overflow-hidden mb-8 shadow-2xl shadow-armoyu-primary/20">
           <img 
              src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
              alt={user.displayName} 
              className="w-full h-full object-cover"
           />
        </div>
        <h2 className="text-2xl font-black text-white italic uppercase tracking-tighter mb-2">ZATEN OTURUM AÇILDI</h2>
        <p className="text-armoyu-text-muted text-xs font-bold uppercase tracking-widest opacity-60 mb-8">
           Şu an <span className="text-armoyu-primary">{user.displayName || user.username}</span> olarak giriş yapmış durumdasınız.
        </p>
        <div className="flex gap-4">
           <button 
             onClick={() => { if (onSuccess) onSuccess(); }}
             className="px-8 py-3 bg-armoyu-primary text-white rounded-2xl font-black text-[10px] uppercase tracking-widest shadow-xl shadow-armoyu-primary/20 hover:scale-105 transition-all"
           >
              KONTROL PANELİNE GİT
           </button>
           <button 
             onClick={() => logout()}
             className="px-8 py-3 bg-white/5 text-red-500 border border-red-500/20 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-red-500/10 transition-all"
           >
              ÇIKIŞ YAP
           </button>
        </div>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className={`flex flex-col items-center justify-center p-12 text-center animate-in zoom-in fade-in duration-500 ${isModal ? 'bg-transparent' : 'bg-[#0a0a0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl min-h-[400px]'}`}>
        <div className="w-24 h-24 bg-emerald-500/10 rounded-[40px] flex items-center justify-center mb-8 relative group">
           <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
           <ShieldCheck className="w-12 h-12 text-emerald-500 relative z-10 animate-bounce" />
        </div>
        <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter mb-4">GİRİŞ BAŞARILI!</h2>
        <p className="text-armoyu-text-muted text-xs font-bold uppercase tracking-[0.3em] opacity-60 mb-8">Evine hoş geldin oyuncu. Yönlendiriliyorsun...</p>
        <div className="flex gap-1">
           {[0, 1, 2].map(i => (
             <div key={i} className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
           ))}
        </div>
      </div>
    );
  }

  return (
    <div className={`grid lg:grid-cols-2 gap-0 overflow-hidden ${isModal ? 'bg-transparent' : 'bg-[#0a0a0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl'}`}>
      
      {/* Left Side: Traditional Login */}
      <div className={`${isModal ? 'p-6 md:p-10' : 'p-8 md:p-12 lg:p-16'} flex flex-col justify-center relative`}>
        <header className="mb-8">
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tighter italic uppercase mb-2">
            Giriş <span className="text-armoyu-primary">Yap</span>
          </h2>
          <p className="text-armoyu-text-muted text-xs font-bold italic uppercase tracking-widest opacity-60">Dünyanı yönetmeye hazır mısın?</p>
        </header>

        {/* Test Account Assistant */}
        <div className="mb-8 p-3 bg-armoyu-primary/10 border border-armoyu-primary/20 rounded-2xl flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-armoyu-primary/20 flex items-center justify-center text-armoyu-primary">
              <ShieldCheck size={16} />
            </div>
            <p className="text-[10px] font-black text-white uppercase tracking-wider italic">Test Asistanı</p>
          </div>
          <button 
            type="button"
            onClick={() => { setUsername('berkaytikenoglu'); setPassword('armo-v3'); }}
            className="px-3 py-1.5 bg-armoyu-primary hover:bg-armoyu-primary text-white text-[9px] font-black uppercase tracking-widest rounded-lg transition-all active:scale-95"
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
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors">
                <Mail size={16} />
              </div>
              <input 
                required
                type="text" 
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-armoyu-primary/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-armoyu-primary/5 transition-all font-bold text-sm"
                placeholder="Kullanıcı adın..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <div className="flex justify-between items-end mb-1">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Şifre</label>
            </div>
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors">
                <Lock size={16} />
              </div>
              <input 
                required
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-armoyu-primary/50 rounded-xl pl-11 pr-4 py-3.5 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-armoyu-primary/5 transition-all font-bold tracking-[0.3em] text-sm"
                placeholder="••••••••"
              />
            </div>
          </div>

          <div className="flex justify-between items-center px-1">
            <div className="flex items-center gap-2">
               <input type="checkbox" id="remember-widget" className="w-3.5 h-3.5 rounded bg-white/5 border-white/10 text-armoyu-primary focus:ring-armoyu-primary cursor-pointer" />
               <label htmlFor="remember-widget" className="text-[10px] font-bold text-armoyu-text-muted cursor-pointer hover:text-white transition-colors uppercase tracking-widest">Beni Hatırla</label>
            </div>
            <Link href={forgotPasswordHref} className="text-[10px] font-black text-armoyu-primary hover:text-armoyu-primary uppercase tracking-widest transition-colors italic">Şifremi Unuttum?</Link>
          </div>

          <Button 
             variant="primary" 
             className="w-full h-12 text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-armoyu-primary/10 mt-6 group"
             isLoading={isSubmitting}
          >
            <div className="flex items-center justify-center gap-2">
              OTURUM AÇ
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </div>
          </Button>

          <p className="text-center text-armoyu-text-muted text-[10px] font-black mt-8 uppercase tracking-[0.2em]">
            Aramızda değil misin? 
            {onRegisterClick ? (
              <button 
                type="button"
                onClick={onRegisterClick}
                className="text-white hover:text-armoyu-primary ml-2 underline underline-offset-4 decoration-armoyu-primary/30 transition-colors italic cursor-pointer"
              >
                KAYIT OL
              </button>
            ) : (
              <Link href={registerHref} className="text-white hover:text-armoyu-primary ml-2 underline underline-offset-4 decoration-armoyu-primary/30 transition-colors italic">
                KAYIT OL
              </Link>
            )}
          </p>
        </form>
      </div>

      {/* Right Side: QR Login */}
      <div className={`flex bg-gradient-to-br from-armoyu-primary/5 via-[#0a0a0f] to-purple-600/5 p-10 flex-col items-center justify-center relative border-l border-white/5 overflow-hidden ${isModal ? 'hidden md:flex' : 'hidden lg:flex'}`}>
        <div className="relative z-10 text-center w-full max-w-[260px]">
          <div className="flex justify-center mb-6">
             <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center shadow-xl group">
                <QrCode size={32} className="text-armoyu-primary group-hover:scale-110 transition-transform" />
             </div>
          </div>

          <h3 className="text-xl font-black text-white italic uppercase tracking-tighter mb-3">Mobil Giriş</h3>
          <p className="text-[10px] font-bold text-armoyu-text-muted leading-relaxed uppercase tracking-widest mb-8 opacity-60">
            Uygulamayı aç ve saniyeler içinde bağlan.
          </p>

          <div className="relative p-4 bg-white/5 backdrop-blur-3xl rounded-[32px] border border-white/5 shadow-2xl group mx-auto w-fit">
             <div className="absolute inset-x-0 top-0 h-0.5 bg-gradient-to-r from-transparent via-armoyu-primary to-transparent animate-scan" />
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
                  className="h-full bg-gradient-to-r from-armoyu-primary to-purple-500 shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.3)] transition-all duration-100"
                  style={{ width: `${qrProgress}%` }}
                />
             </div>
             <span className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
               <Sparkles size={10} className="text-armoyu-primary animate-pulse" />
               Yenileniyor: {Math.ceil((qrProgress / 100) * 20)}s
             </span>
          </div>
        </div>
      </div>
    </div>
  );
}
