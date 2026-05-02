'use client';

import * as React from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { Button } from '../../../../components/Button';
import { Sparkles, Sword, Trophy, Users, ShieldCheck } from 'lucide-react';

export function AuthJoinCard() {
  const { setIsLoginModalOpen, setIsRegisterModalOpen, user } = useAuth();

  if (user) return null; // Already logged in

  return (
    <div className="w-full max-w-[320px] bg-[#0a0a0f]/60 backdrop-blur-xl rounded-[32px] border border-white/5 p-8 relative overflow-hidden group shadow-2xl">
      {/* Background Animated Glow */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-armoyu-primary/10 blur-[60px] rounded-full group-hover:bg-armoyu-primary/20 transition-all duration-700" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-purple-500/10 blur-[60px] rounded-full group-hover:bg-purple-500/20 transition-all duration-700" />

      <header className="relative z-10 mb-8">
        <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-armoyu-primary to-purple-600 flex items-center justify-center mb-6 shadow-lg shadow-armoyu-primary/20 group-hover:scale-110 transition-transform duration-500">
           <Sword size={24} className="text-white" />
        </div>
        <h3 className="text-2xl font-black text-white italic uppercase tracking-tighter leading-tight mb-3">
          AKSİYONUN <br/> <span className="text-armoyu-primary">PARÇASI OL</span>
        </h3>
        <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-60 leading-relaxed">
          Sadece izleme, dünyanı yönetmeye bugün başla.
        </p>
      </header>

      <div className="relative z-10 space-y-4 mb-8">
         {[
           { icon: <Trophy size={14} />, text: "Özel Başarılar" },
           { icon: <Users size={14} />, text: "Devasa Topluluk" },
           { icon: <ShieldCheck size={14} />, text: "Güvenli Profil" }
         ].map((item, i) => (
           <div key={i} className="flex items-center gap-3 group/item">
              <div className="w-6 h-6 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-armoyu-primary group-hover/item:bg-armoyu-primary group-hover/item:text-white transition-all">
                 {item.icon}
              </div>
              <span className="text-[10px] font-black text-white/70 uppercase tracking-widest">{item.text}</span>
           </div>
         ))}
      </div>

      <div className="relative z-10 space-y-3">
         <Button 
            variant="primary" 
            className="w-full h-11 text-[10px] font-black uppercase tracking-[0.2em] rounded-xl shadow-lg shadow-armoyu-primary/10 group/btn"
            onClick={() => setIsRegisterModalOpen(true)}
         >
           <div className="flex items-center justify-center gap-2">
             <Sparkles size={14} className="group-hover/btn:animate-spin" />
             KAYIT OL
           </div>
         </Button>
         
         <button 
            onClick={() => setIsLoginModalOpen(true)}
            className="w-full h-11 bg-white/5 hover:bg-white/10 border border-white/5 rounded-xl text-[10px] font-black text-white uppercase tracking-[0.2em] transition-all active:scale-95"
         >
           ZATEN ÜYEYİM
         </button>
      </div>

      {/* Decorative footer */}
      <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between opacity-30">
         <span className="text-[8px] font-black text-armoyu-text-muted uppercase tracking-[0.3em]">DXP EDITION</span>
         <div className="flex gap-1.5">
            <div className="w-1 h-1 rounded-full bg-armoyu-primary" />
            <div className="w-1 h-1 rounded-full bg-purple-500" />
         </div>
      </div>
    </div>
  );
}
