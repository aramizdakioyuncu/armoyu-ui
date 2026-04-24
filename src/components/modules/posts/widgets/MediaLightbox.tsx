'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Plyr } from 'plyr-react';
import 'plyr-react/plyr.css';

export interface PostMedia {
  type: 'image' | 'video' | 'audio';
  url: string;
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
}

export function MediaLightbox({ isOpen, onClose, media, initialIndex = 0 }: MediaLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [mounted, setMounted] = useState(false);

  const handlePrev = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === 0 ? 0 : prev - 1));
  }, []);

  const handleNext = useCallback((e?: React.MouseEvent | KeyboardEvent) => {
    e?.stopPropagation();
    setCurrentIndex(prev => (prev === media.length - 1 ? prev : prev + 1));
  }, [media.length]);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      setCurrentIndex(initialIndex);
      document.body.style.overflow = 'hidden';
    }
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === 'ArrowLeft') handlePrev(e);
      if (e.key === 'ArrowRight') handleNext(e);
      if (e.key === 'Escape') onClose();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, initialIndex, handlePrev, handleNext, onClose]);

  if (!isOpen || !media || media.length === 0 || !mounted) return null;

  const currentMedia = media[currentIndex];

  const modalContent = (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center p-0 md:p-10 animate-in fade-in duration-300">
      <div className="absolute inset-0 bg-[#050507]/98 backdrop-blur-2xl" onClick={onClose} />
      
      {/* Container */}
      <div 
        className="relative w-full h-full max-w-[1400px] bg-black/40 rounded-none md:rounded-[40px] overflow-hidden flex flex-col md:flex-row border-none md:border md:border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.5)] z-[10000]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Main Content Area (Left) */}
        <div className="flex-1 relative flex items-center justify-center bg-black/20 group">
          
          {/* Gezinme Okları (İçeride) */}
          {media.length > 1 && currentIndex > 0 && (
            <button onClick={(e) => handlePrev(e)} className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all z-20 border border-white/5 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>
            </button>
          )}
          {media.length > 1 && currentIndex < media.length - 1 && (
            <button onClick={(e) => handleNext(e)} className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/5 hover:bg-white/15 text-white flex items-center justify-center transition-all z-20 border border-white/5 opacity-0 group-hover:opacity-100">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
            </button>
          )}

          {/* Media Rendering */}
          <div className="w-full h-full flex items-center justify-center p-4">
            {currentMedia.type === 'video' ? (
              <div className="w-full h-full max-h-[85vh] rounded-3xl overflow-hidden bg-black [&_.plyr]:h-full [&_.plyr]:w-auto [&_video]:h-full [&_video]:w-auto">
                <Plyr
                  source={{ type: 'video', sources: [{ src: currentMedia.url }] }}
                  options={{ controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume', 'fullscreen'], tooltips: { controls: true, seek: true } }}
                />
              </div>
            ) : (
              <img src={currentMedia.url} alt="Medya" className="max-w-full max-h-full object-contain rounded-xl shadow-2xl" />
            )}
          </div>
        </div>

        {/* Sidebar (Right) */}
        <div className="w-full md:w-[400px] shrink-0 bg-[#0d0d12] border-t md:border-t-0 md:border-l border-white/10 flex flex-col h-full md:h-auto overflow-hidden">
          
          {/* Header (User Info) */}
          <div className="p-6 border-b border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full border-2 border-blue-500/20 overflow-hidden shrink-0">
                <img src={currentMedia.owner?.avatar || 'https://api.armoyu.com/assets/images/default_avatar.png'} alt={currentMedia.owner?.username} className="w-full h-full object-cover" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black text-white leading-none uppercase tracking-tight">
                  {currentMedia.owner?.displayName || currentMedia.owner?.username || 'Bilinmeyen'}
                </span>
                {currentMedia.owner?.username && (
                  <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest mt-1">@{currentMedia.owner?.username}</span>
                )}
              </div>
            </div>
            <button onClick={onClose} className="text-white/40 hover:text-white transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Comments Area (Scrollable) */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* Mock Comments */}
            <div className="space-y-4">
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center shrink-0 border border-blue-500/10">
                     <span className="text-[10px] font-black text-blue-400">BT</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-black text-white uppercase">Berkay Tikenoğlu</span>
                     <p className="text-[11px] text-white/60 leading-normal">Harika bir kare olmuş hocam, eline sağlık!</p>
                  </div>
               </div>
               <div className="flex gap-3">
                  <div className="w-8 h-8 rounded-full bg-purple-600/20 flex items-center justify-center shrink-0 border border-purple-500/10">
                     <span className="text-[10px] font-black text-purple-400">AM</span>
                  </div>
                  <div className="flex flex-col gap-1">
                     <span className="text-[11px] font-black text-white uppercase">Armoyu</span>
                     <p className="text-[11px] text-white/60 leading-normal">Bu içeriği çok beğendik! 🔥</p>
                  </div>
               </div>
            </div>
          </div>

          {/* Interaction Bar (Bottom) */}
          <div className="p-6 bg-black/20 border-t border-white/5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <button className="flex items-center gap-2 text-white/60 hover:text-red-500 transition-colors group">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-active:scale-125 transition-transform"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 7.78-7.78z"></path></svg>
                  <span className="text-xs font-black">2.4K</span>
                </button>
                <button className="flex items-center gap-2 text-white/60 hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  <span className="text-xs font-black">128</span>
                </button>
              </div>
              <button className="text-white/40 hover:text-white transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
              </button>
            </div>
            
            {/* Comment Input */}
            <div className="relative">
              <input 
                type="text" 
                placeholder="Yorum yap..." 
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-xs text-white placeholder:text-white/20 focus:outline-none focus:border-blue-500/50 transition-colors pr-12"
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

  return createPortal(modalContent, document.body);
}
