'use client';

import { useState } from 'react';
import * as React from 'react';
import { LoginWidget } from '../modules/auth/widgets/LoginWidget';
import { RegisterWidget } from '../modules/auth/widgets/RegisterWidget';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function LoginModal({ isOpen, onClose }: LoginModalProps) {
  const [mode, setMode] = useState<'login' | 'register'>('login');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className={`relative glass-panel bg-[#0a0a0e]/95 w-full ${mode === 'register' ? 'max-w-6xl' : 'max-w-4xl'} rounded-[2rem] shadow-[0_0_50px_rgba(0,0,0,1)] border border-white/10 flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300`}>
        
        {/* Kapat butonu */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 text-gray-400 hover:text-white transition-colors bg-white/5 p-2 rounded-full hover:bg-white/10 border border-white/5"
          title="Kapat"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
        </button>

        {mode === 'login' ? (
          <LoginWidget 
            isModal={true}
            onSuccess={onClose}
            onRegisterClick={() => setMode('register')}
            registerHref="/register"
            forgotPasswordHref="/forgot-password"
          />
        ) : (
          <RegisterWidget 
            isModal={true}
            onSuccess={onClose}
            onLoginClick={() => setMode('login')}
            loginHref="/login"
          />
        )}
      </div>
    </div>
  );
}
