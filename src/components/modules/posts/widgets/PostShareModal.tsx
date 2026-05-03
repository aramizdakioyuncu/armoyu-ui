'use client';

import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, Check, MessageCircle, Send, Share2 } from 'lucide-react';
import { TwitterIcon } from '../../../shared/Icons';

interface PostShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  url: string;
  title: string;
}

const FacebookIcon = ({ size = 24 }: { size?: number }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
);

export function PostShareModal({ isOpen, onClose, url, title }: PostShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); return () => setMounted(false); }, []);

  if (!isOpen || !mounted) return null;

  const shareUrl = typeof window !== 'undefined' ? `${window.location.origin}${url}` : url;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const platforms = [
    {
      name: 'X (Twitter)',
      icon: <TwitterIcon size={24} strokeWidth={2.5} />,
      color: 'bg-black text-white',
      link: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'Facebook',
      icon: <FacebookIcon size={24} />,
      color: 'bg-[#1877F2] text-white',
      link: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`
    },
    {
      name: 'WhatsApp',
      icon: <MessageCircle size={24} />,
      color: 'bg-[#25D366] text-white',
      link: `https://wa.me/?text=${encodeURIComponent(title + ' ' + shareUrl)}`
    },
    {
      name: 'Telegram',
      icon: <Send size={24} />,
      color: 'bg-[#0088cc] text-white',
      link: `https://t.me/share/url?url=${encodeURIComponent(shareUrl)}&text=${encodeURIComponent(title)}`
    }
  ];

  return createPortal(
    <div className="fixed inset-0 z-[5000] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-sm glass-panel bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
        <div className="p-8">
          <div className="flex justify-between items-start mb-8">
            <div className="w-16 h-16 rounded-2xl bg-armoyu-primary/10 flex items-center justify-center text-armoyu-primary">
              <Share2 size={32} />
            </div>
            <button 
              onClick={onClose}
              className="p-3 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-2xl text-armoyu-text-muted hover:text-armoyu-text transition-all"
            >
              <X size={20} />
            </button>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-black text-armoyu-text uppercase tracking-tighter italic mb-2">PAYLAŞ</h2>
            <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">
              Bu gönderiyi arkadaşlarınla paylaş.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-8">
            {platforms.map((p) => (
              <a 
                key={p.name}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex flex-col items-center justify-center gap-3 p-5 rounded-3xl ${p.color} transition-transform hover:scale-105 active:scale-95 shadow-lg`}
              >
                {p.icon}
                <span className="text-[10px] font-black uppercase tracking-widest">{p.name}</span>
              </a>
            ))}
          </div>

          <div className="space-y-3">
             <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] ml-2">Bağlantıyı Kopyala</label>
             <div className="flex items-center gap-2 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl p-2 pl-5 overflow-hidden">
                <span className="flex-1 text-[11px] font-bold text-armoyu-text truncate opacity-50">
                  {shareUrl}
                </span>
                <button 
                  onClick={handleCopyLink}
                  className={`px-5 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest transition-all flex items-center gap-2 ${copied ? 'bg-emerald-500 text-white' : 'bg-armoyu-primary text-white hover:bg-armoyu-primary/90'}`}
                >
                  {copied ? (
                    <><Check size={14} strokeWidth={3} /> KOPYALANDI</>
                  ) : (
                    <><Copy size={14} strokeWidth={3} /> KOPYALA</>
                  )}
                </button>
             </div>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
}
