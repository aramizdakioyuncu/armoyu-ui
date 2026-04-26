'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { ArmoyuPlayer } from '../../../shared/ArmoyuPlayer';

export interface PostMedia {
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  name?: string;
  owner?: {
    id: number;
    username: string;
    displayName?: string;
    avatar: string;
  };
}

interface MediaLightboxProps {
  isOpen: boolean;
  onClose: () => void;
  media: PostMedia[];
  initialIndex?: number;
  defaultOwner?: {
    id: number;
    username: string;
    displayName?: string;
    avatar: string;
  };
}

export function MediaLightbox({ isOpen, onClose, media, initialIndex = 0, defaultOwner }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [direction, setDirection] = useState<'left' | 'right'>('right');

  // Prefetch adjacent images
  useEffect(() => {
    if (!media || media.length <= 1) return;
    
    const prefetch = (index: number) => {
      const item = media[index];
      if (item && item.type === 'image') {
        const img = new Image();
        img.src = item.url;
      }
    };

    // Prefetch next and prev
    prefetch((currentIndex + 1) % media.length);
    prefetch((currentIndex - 1 + media.length) % media.length);
  }, [currentIndex, media]);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (currentIndex > 0) {
      setDirection('left');
      setImageLoading(true);
      setCurrentIndex(prev => prev - 1);
    }
  }, [currentIndex]);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    if (currentIndex < media.length - 1) {
      setDirection('right');
      setImageLoading(true);
      setCurrentIndex(prev => prev + 1);
    }
  }, [currentIndex, media.length]);

  useEffect(() => {
    if (isOpen) {
      setCurrentIndex(initialIndex);
      setImageLoading(true);
    }
  }, [isOpen, initialIndex]);

  useEffect(() => {
    setMounted(true);
    
    if (isOpen && typeof document !== 'undefined') {
      document.body.style.overflow = 'hidden';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'Escape') onClose();
    };

    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.body.style.overflow = '';
      }
      if (typeof window !== 'undefined') {
        window.removeEventListener('keydown', handleKeyDown);
      }
    };
  }, [isOpen, initialIndex, handlePrev, handleNext, onClose]);

  if (!isOpen || !media || media.length === 0 || !mounted) return null;

  const currentMedia = media[currentIndex] || media[0];
  const currentOwner = currentMedia?.owner || defaultOwner;

  const modalContent = (
    <div className="fixed inset-0 z-[10001] flex items-center justify-center p-0 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-white/95 dark:bg-[#050507]/98 backdrop-blur-2xl" onClick={onClose} />
      
      {/* Container */}
      <div 
        className="relative w-full h-full max-w-[1400px] bg-white dark:bg-black/40 rounded-none md:rounded-[40px] overflow-hidden flex flex-col md:flex-row border-none md:border border-slate-200 dark:border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.1)] dark:shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content Area (Left) */}
        <div className="flex-1 relative flex items-center justify-center bg-slate-100 dark:bg-black/20 group">
          
          {/* Gezinme Okları (İçeride) */}
          {media.length > 1 && currentIndex > 0 && (
            <button onClick={(e) => handlePrev(e)} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white flex items-center justify-center transition-all z-20 border border-slate-200 dark:border-white/5 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          )}
          {media.length > 1 && currentIndex < media.length - 1 && (
            <button onClick={(e) => handleNext(e)} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/15 text-slate-800 dark:text-white flex items-center justify-center transition-all z-20 border border-slate-200 dark:border-white/5 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          )}
          
          {/* Close Button for Mobile */}
          <button onClick={onClose} className="absolute top-6 right-6 md:hidden w-10 h-10 rounded-full bg-black/5 dark:bg-white/10 text-slate-800 dark:text-white flex items-center justify-center z-30">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
          </button>

          {/* Media Rendering */}
          <div className="w-full h-full flex items-center justify-center p-4 overflow-hidden">
            {currentMedia.type === 'video' || currentMedia.type === 'audio' ? (
              <div 
                key={currentIndex}
                className={`w-full h-full bg-black rounded-3xl overflow-hidden shadow-2xl [&_.plyr]:h-full [&_.plyr]:w-full [&_video]:h-full [&_video]:object-contain ${
                  direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'
                } ${currentMedia.type === 'audio' ? 'flex items-center justify-center bg-emerald-950' : ''}`}
              >
                <div className={currentMedia.type === 'audio' ? 'w-[80%]' : 'w-full h-full'}>
                  <ArmoyuPlayer
                    key={currentMedia.url}
                    source={{ 
                      type: currentMedia.type as 'video' | 'audio', 
                      sources: [{ src: currentMedia.url }] 
                    }}
                    options={{ 
                      autoplay: true,
                      controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'],
                    }}
                  />
                  {currentMedia.type === 'audio' && (
                    <div className="mt-8 text-center animate-in fade-in slide-in-from-bottom-4 duration-1000">
                      <div className="w-24 h-24 rounded-[32px] bg-emerald-500/20 flex items-center justify-center mx-auto mb-6 relative">
                        <div className="absolute inset-0 bg-emerald-500/20 blur-2xl rounded-full animate-pulse" />
                        <svg className="w-12 h-12 text-emerald-400 relative z-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                        </svg>
                      </div>
                      <h4 className="text-xl font-black text-white uppercase tracking-tighter italic">{currentMedia.name || 'Ses Dosyası'}</h4>
                      <p className="text-emerald-400/60 font-bold text-[10px] uppercase tracking-[0.2em] mt-2">Şu an oynatılıyor</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div 
                key={currentIndex}
                className={`relative w-full h-full flex items-center justify-center ${
                  direction === 'right' ? 'animate-slide-right' : 'animate-slide-left'
                }`}
              >
                {imageLoading && (
                  <div className="absolute inset-0 flex items-center justify-center z-10 animate-in fade-in duration-700 delay-500">
                    <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin" />
                  </div>
                )}
                {/* Thumbnail (if exists) can be shown here while loading */}
                {imageLoading && currentMedia.thumbnail && (
                  <img 
                    src={currentMedia.thumbnail} 
                    className="absolute inset-0 w-full h-full object-contain blur-lg scale-110 opacity-30" 
                    alt="" 
                  />
                )}
                <img 
                  src={currentMedia.url} 
                  alt="Medya" 
                  className={`max-w-full max-h-full object-contain rounded-xl shadow-2xl transition-all duration-300 ${imageLoading ? 'opacity-0 scale-98' : 'opacity-100 scale-100'}`} 
                  onLoad={() => setImageLoading(false)}
                />
              </div>
            )}
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full md:w-[400px] shrink-0 bg-white dark:bg-[#0d0d12] border-t md:border-t-0 md:border-l border-slate-200 dark:border-white/10 flex flex-col h-full md:h-auto overflow-hidden">
          
          {/* Header (User Info) */}
          <div className="p-6 border-b border-slate-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 overflow-hidden shrink-0">
                <img src={currentOwner?.avatar || 'https://api.armoyu.com/assets/images/default_avatar.png'} alt={currentOwner?.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-slate-800 dark:text-white leading-none uppercase tracking-tight">
                  {currentOwner?.displayName || currentOwner?.username || 'Bilinmeyen'}
                </span>
                {currentOwner?.username && (
                  <span className="text-[10px] font-bold text-slate-400 dark:text-white/40 uppercase tracking-widest mt-1">@{currentOwner?.username}</span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="hidden md:block text-slate-400 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Comments Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6 scrollbar-thin scrollbar-thumb-slate-200 dark:scrollbar-thumb-white/5">
            {/* Mock Comments */}
            <div className="space-y-4">
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/10">
                     <span className="text-[10px] font-black text-blue-400">BT</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase">Berkay Tikenoğlu</span>
                     <p className="text-[11px] text-slate-600 dark:text-white/60 leading-normal">Harika bir kare olmuş hocam, eline sağlık!</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center shrink-0 border border-purple-500/10">
                     <span className="text-[10px] font-black text-purple-400">AM</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-black text-slate-800 dark:text-white uppercase">Armoyu</span>
                     <p className="text-[11px] text-slate-600 dark:text-white/60 leading-normal">Bu içeriği çok beğendik! 🔥</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Interaction Bar (Bottom) */}
          <div className="p-6 bg-slate-50 dark:bg-black/20 border-t border-slate-100 dark:border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-slate-400 dark:text-white/60 hover:text-red-500 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-active:scale-125 transition-transform"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 7.78-7.78z"></path></svg>
                  <span className="text-xs font-black">2.4K</span>
                </button>
                <button className="flex items-center gap-2 text-slate-400 dark:text-white/60 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span className="text-xs font-black">128</span>
                </button>
              </div>
              <button className="text-slate-300 dark:text-white/40 hover:text-slate-800 dark:hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </button>
            </div>
            
            {/* Comment Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Yorum yap..." 
                className="w-full bg-black/5 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 text-xs text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors pr-12"
              />
              <button className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-500 font-black text-[10px] uppercase tracking-widest hover:text-blue-400">
                GÖNDER
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  if (typeof document === 'undefined') return null;
  return createPortal(modalContent, document.body);
}
