'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { MailWarning, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useArmoyu } from '../../context/ArmoyuContext';

/** Giriş yapmış ama e-postasını doğrulamamış kullanıcıya header altında hatırlatma */
export function EmailVerifyBanner() {
  const { user } = useAuth();
  const { api } = useArmoyu();
  // shortcut: yayınlanan @armoyu/core 1.2.2 tiplerinde yok (1.2.3'te var); UI core bağımlılığı yükselince cast kalkacak
  const auth = api.auth as any;
  const [email, setEmail] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    setVisible(false);
    setStatus('idle');
    // Eski API'de doğrulama yok
    if (!user || (api as any).version !== 'current' || !auth.emailVerification) return;

    let cancelled = false;
    auth.emailVerification().then((res: any) => {
      if (cancelled || res?.durum !== 1) return;
      setEmail(res.icerik?.email ?? null);
      setVisible(!res.icerik?.verified);
    });
    return () => { cancelled = true; };
  }, [user?.id]);

  if (!visible) return null;

  const resend = async () => {
    setStatus('sending');
    const res = await auth.resendVerification();
    setStatus(res?.durum === 1 ? 'sent' : 'error');
    setMessage(res?.aciklama || '');
  };

  return (
    <div role="status" className="w-full bg-amber-500/10 border-b border-amber-500/30">
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 py-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs font-bold text-armoyu-text">
        <MailWarning size={16} className="text-amber-500 shrink-0" />
        <p className="flex-1 min-w-[200px]">
          {status === 'sent'
            ? message || 'Doğrulama bağlantısı gönderildi. Gelen kutunu (ve gereksiz klasörünü) kontrol et.'
            : status === 'error'
              ? message || 'Gönderilemedi, biraz sonra tekrar dene.'
              : <>E-posta adresini doğrulamadın{email ? <> (<span className="text-armoyu-primary">{email}</span>)</> : null}. Hesabını güvende tutmak ve bildirimleri alabilmek için doğrula.</>}
        </p>
        {status !== 'sent' && (
          <button
            type="button"
            onClick={resend}
            disabled={status === 'sending'}
            className="px-4 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 disabled:opacity-60 text-white text-[10px] font-black uppercase tracking-widest"
          >
            {status === 'sending' ? 'Gönderiliyor…' : 'Doğrulama e-postası gönder'}
          </button>
        )}
        <button type="button" onClick={() => setVisible(false)} aria-label="Kapat" className="p-1 text-armoyu-text-muted hover:text-armoyu-text">
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
