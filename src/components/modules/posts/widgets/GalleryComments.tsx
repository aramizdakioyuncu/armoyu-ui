'use client';

import React, { useCallback, useEffect, useState } from 'react';
import Link from 'next/link';
import { Trash2, Loader2 } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import { timeAgo } from '../../../../lib/timeAgo';

type GalleryComment = { id: string; userId: string; username: string; displayName: string; avatar: string; body: string; createdAt: string; canDelete: boolean };
type CommentState = { enabled: boolean; count: number; comments: GalleryComment[] };

/** Galeri dosyasının yorumları (Phatsa Galeri 1.2.0): okuma herkese, yazma giriş ister, silme yazar / dosya sahibi */
export function GalleryComments({ itemId }: { itemId: string }) {
  const { api, navigation } = useArmoyu();
  const { user, setIsLoginModalOpen } = useAuth();
  // shortcut: yayınlanan @armoyu/core 1.2.4 tiplerinde yok (1.2.5'te var); UI core bağımlılığı yükselince cast kalkacak
  const users = api.users as any;
  const [state, setState] = useState<CommentState | null>(null);
  const [error, setError] = useState('');
  const [text, setText] = useState('');
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    const res = await users.getGalleryComments?.(itemId);
    if (res?.durum === 1) setState(res.icerik);
    else setError(res?.aciklama || 'Yorumlar yüklenemedi.');
  }, [itemId, users]);

  useEffect(() => { setState(null); setError(''); load(); }, [load]);

  const send = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return setIsLoginModalOpen(true);
    if (!text.trim() || busy) return;
    setBusy(true);
    const res = await users.addGalleryComment(itemId, text.trim());
    setBusy(false);
    if (res?.durum !== 1) return setError(res?.aciklama || 'Yorum gönderilemedi.');
    setText('');
    setError('');
    load();
  };

  const remove = async (id: string) => {
    const res = await users.deleteGalleryComment(id);
    if (res?.durum === 1) load();
    else setError(res?.aciklama || 'Yorum silinemedi.');
  };

  const profilePrefix = navigation?.profilePrefix ?? '/oyuncular';

  return (
    <>
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        <h4 className="text-[10px] font-black uppercase tracking-widest text-slate-400">Yorumlar {state ? `(${state.count})` : ''}</h4>
        {!state && !error && <Loader2 className="animate-spin text-slate-400" size={18} />}
        {state && state.comments.length === 0 && (
          <p className="text-xs text-slate-400 dark:text-white/40">{state.enabled ? 'İlk yorumu sen yaz.' : 'Bu dosyada yorumlar kapalı.'}</p>
        )}
        {state?.comments.map((c) => (
          <div key={c.id} className="group flex gap-3">
            <img src={c.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${c.username || c.userId}`} alt="" className="w-8 h-8 rounded-full object-cover shrink-0" />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <Link href={`${profilePrefix}/${c.username}`} className="text-[11px] font-black text-slate-800 dark:text-white hover:text-armoyu-primary truncate">{c.displayName}</Link>
                <span className="text-[10px] text-slate-400">{timeAgo(Date.now() - Date.parse(c.createdAt))}</span>
                {c.canDelete && (
                  <button type="button" onClick={() => remove(c.id)} aria-label="Yorumu sil" className="ml-auto opacity-0 group-hover:opacity-100 focus:opacity-100 text-slate-400 hover:text-red-500 transition-opacity">
                    <Trash2 size={12} />
                  </button>
                )}
              </div>
              <p className="text-[12px] text-slate-600 dark:text-white/70 leading-normal break-words">{c.body}</p>
            </div>
          </div>
        ))}
        {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}
      </div>

      {state?.enabled !== false && (
        <form onSubmit={send} className="p-4 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 relative">
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={1000}
            placeholder={user ? 'Yorum yap...' : 'Yorum yapmak için giriş yap'}
            aria-label="Yorum"
            onFocus={() => { if (!user) setIsLoginModalOpen(true); }}
            className="w-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 pr-20 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-armoyu-primary/50"
          />
          <button type="submit" disabled={busy || !text.trim()} className="absolute right-7 top-1/2 -translate-y-1/2 text-armoyu-primary font-black text-[10px] uppercase tracking-widest disabled:opacity-40">
            {busy ? '…' : 'Gönder'}
          </button>
        </form>
      )}
    </>
  );
}
