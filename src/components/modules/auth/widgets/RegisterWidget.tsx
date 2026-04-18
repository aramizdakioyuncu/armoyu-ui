'use client';

import * as React from 'react';
import { useState } from 'react';
import { Button } from '../../../../components/Button';
import { useAuth } from '../../../../context/AuthContext';
import { User, Mail, Lock, ArrowRight, Calendar, UserCheck, Shield, Sparkles } from 'lucide-react';
import Link from 'next/link';

interface RegisterWidgetProps {
  onSuccess?: () => void;
  onLoginClick?: () => void;
  loginHref?: string;
  isModal?: boolean;
}

export function RegisterWidget({ 
  onSuccess, 
  onLoginClick,
  loginHref = "/login",
  isModal = false
}: RegisterWidgetProps) {
  const { register } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    confirmPassword: '',
    birthday: '',
    gender: '1',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler birbiriyle uyuşmuyor.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      await register(formData);
      if (onSuccess) onSuccess();
    } catch (err: any) {
      setError(err?.message || 'Kayıt işlemi başarısız!');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`grid lg:grid-cols-5 gap-0 overflow-hidden ${isModal ? 'bg-transparent' : 'bg-[#0a0a0f]/80 backdrop-blur-2xl rounded-[40px] border border-white/5 shadow-2xl overflow-y-auto max-h-[90vh] hide-scrollbar'}`}>
      
      {/* Left Side: Info (2 cols) - Hidden on very small models if inside modal */}
      <div className={`lg:col-span-2 bg-gradient-to-br from-blue-600/5 via-[#0a0a0f] to-emerald-600/5 p-10 flex-col justify-between relative border-r border-white/5 overflow-hidden ${isModal ? 'hidden md:flex' : 'hidden lg:flex'}`}>
        <div className="relative z-10">
          <header className="mb-10">
             <h2 className="text-3xl font-black text-white italic uppercase tracking-tighter leading-none mb-4">
               YENİ BİR <br/> <span className="text-blue-500">DÜNYA</span> <br/> SENİ BEKLİYOR
             </h2>
             <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">ARMOYU topluluğuna katıl.</p>
          </header>
          
          <div className="space-y-6 mt-8">
             {[
               { icon: <Shield size={18} className="text-blue-500" />, title: "GÜVENLİ", desc: "Verilerin şifrelenmiş olarak saklanır." },
               { icon: <Sparkles size={18} className="text-emerald-500" />, title: "PREMIUM", desc: "Sana özel profil seçenekleri." },
               { icon: <UserCheck size={18} className="text-purple-500" />, title: "REAL PLAYER", desc: "Gerçek oyuncularla etkileşim." }
             ].map((item, i) => (
               <div key={i} className="flex gap-4 items-start group">
                  <div className="w-9 h-9 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center shrink-0 group-hover:bg-blue-500/10 transition-colors">
                     {item.icon}
                  </div>
                  <div>
                     <h4 className="text-[10px] font-black text-white uppercase tracking-widest mb-1">{item.title}</h4>
                     <p className="text-[9px] text-armoyu-text-muted font-bold tracking-wider leading-relaxed opacity-60">{item.desc}</p>
                  </div>
               </div>
             ))}
          </div>
        </div>

        <div className="relative z-10 pt-10 border-t border-white/5 flex items-center gap-3">
           <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,1)]" />
           <span className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-[0.4em] opacity-40">DXP EDITION</span>
        </div>
      </div>

      {/* Right Side: Form (3 cols) */}
      <div className={`${isModal ? 'lg:col-span-5 md:col-span-3 p-6 md:p-8' : 'lg:col-span-3 p-8 md:p-12'} flex flex-col justify-center`}>
        <form onSubmit={handleRegister} className="space-y-4">
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 text-red-500 text-[10px] font-black rounded-xl text-center uppercase tracking-widest">
              {error}
            </div>
          )}

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Oyuncu Adı</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                  <User size={16} />
                </div>
                <input 
                  required
                  name="username"
                  type="text" 
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs"
                  placeholder="nick..."
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">E-Posta</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                  <Mail size={16} />
                </div>
                <input 
                  required
                  name="email"
                  type="email" 
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs"
                  placeholder="mail@ornek.com"
                />
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Adın</label>
              <input 
                required
                name="firstName"
                type="text" 
                value={formData.firstName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs"
                placeholder="Örn: Berkay"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Soyadın</label>
              <input 
                required
                name="lastName"
                type="text" 
                value={formData.lastName}
                onChange={handleChange}
                className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs"
                placeholder="Örn: Tiken"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Doğum Tarihi</label>
                <div className="relative group">
                   <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                      <Calendar size={16} />
                   </div>
                   <input 
                      required
                      name="birthday"
                      type="date" 
                      value={formData.birthday}
                      onChange={handleChange}
                      className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs"
                   />
                </div>
             </div>

             <div className="space-y-1.5">
                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Cinsiyet</label>
                <select 
                  name="gender"
                  value={formData.gender}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold text-xs appearance-none bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%2212%22%20height%3D%2212%22%20fill%3D%22none%22%20stroke%3D%22%236b7280%22%20stroke-width%3D%222%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3Cpath%20d%3D%22M2%204l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-[length:10px] bg-[right_1rem_center] bg-no-repeat"
                >
                  <option value="1" className="bg-[#0a0a0f]">Erkek</option>
                  <option value="0" className="bg-[#0a0a0f]">Kadın</option>
                </select>
             </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Şifre</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  required
                  name="password"
                  type="password" 
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold tracking-[0.3em] text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="space-y-1.5">
              <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] ml-2">Şifre Tekrar</label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors">
                  <Lock size={16} />
                </div>
                <input 
                  required
                  name="confirmPassword"
                  type="password" 
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/5 hover:border-white/10 focus:border-blue-500/50 rounded-xl pl-11 pr-4 py-3 text-white placeholder-white/10 focus:outline-none focus:ring-4 focus:ring-blue-500/5 transition-all font-bold tracking-[0.3em] text-xs"
                  placeholder="••••••••"
                />
              </div>
            </div>
          </div>

          <div className="pt-4">
             <Button 
                variant="primary" 
                className="w-full h-12 text-xs font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-blue-600/10 group"
                isLoading={isSubmitting}
             >
               <div className="flex items-center justify-center gap-2">
                 TAMAMLA
                 <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
               </div>
             </Button>
          </div>

          <p className="text-center text-armoyu-text-muted text-[10px] font-black mt-6 uppercase tracking-[0.2em]">
            Zaten hesabın var mı? 
            {onLoginClick ? (
              <button 
                type="button"
                onClick={onLoginClick}
                className="text-white hover:text-blue-500 ml-2 underline underline-offset-4 decoration-blue-500/30 transition-colors italic cursor-pointer"
              >
                GİRİŞ YAP
              </button>
            ) : (
              <Link href={loginHref} className="text-white hover:text-blue-500 ml-2 underline underline-offset-4 decoration-blue-500/30 transition-colors italic">
                GİRİŞ YAP
              </Link>
            )}
          </p>
        </form>
      </div>
    </div>
  );
}
