import React, { useState, useRef, useEffect } from 'react';
import { Group } from '@armoyu/core';

interface GroupHeaderProps {
  group: Group;
  isMember: boolean;
  onJoin?: () => void;
  onLeave?: () => void;
  onReport?: () => void;
}

export function GroupHeader({ group, isMember, onJoin, onLeave, onReport }: GroupHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative h-64 md:h-80 lg:h-96 rounded-[60px] overflow-hidden mb-12 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-700">
      {/* Banner Image */}
      <img src={group.banner} className="w-full h-full object-cover" alt={group.name} />

      {/* Premium Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

      {/* Header Content */}
      <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row items-end justify-between gap-6">
        <div className="flex items-center gap-6">
          <div className="relative">
            <img
              src={group.logo}
              className="w-24 h-24 md:w-32 md:h-32 rounded-[32px] border-4 border-armoyu-bg bg-white dark:bg-zinc-900 shadow-2xl object-cover"
              alt="Logo"
            />
            <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white p-2 rounded-xl border-4 border-armoyu-bg">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="20 6 9 17 4 12"></polyline></svg>
            </div>
          </div>
          <div className="mb-2 text-left">
            <div className="flex items-center gap-3 mb-1">
              <h1 className="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter italic drop-shadow-lg">{group.name}</h1>
              <span className="px-3 py-1 bg-blue-600 text-white text-[10px] font-black uppercase tracking-widest rounded-lg shadow-lg">{group.category}</span>
            </div>
            <p className="text-white/70 font-bold text-lg uppercase tracking-tight">@{group.shortName} &bull; {group.recruitment}</p>
          </div>
        </div>

        <div className="flex gap-4 mb-2 relative" ref={menuRef}>
          {!isMember && (
            <button
              onClick={onJoin}
              className="px-10 py-4 bg-white text-blue-600 font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              GRUBA KATIL
            </button>
          )}

          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className={`px-4 py-4 ${isMenuOpen ? 'bg-blue-600' : 'bg-white/10 backdrop-blur-md'} border border-white/20 text-white rounded-2xl hover:bg-white/20 transition-all group`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={`${isMenuOpen ? 'rotate-90' : 'group-hover:rotate-12'} transition-transform`}><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
          </button>

          {/* Dropdown Menu */}
          {isMenuOpen && (
            <div className="absolute bottom-full right-0 mb-4 w-56 glass-panel p-3 rounded-2xl border border-white/20 bg-black/80 backdrop-blur-xl shadow-2xl animate-in fade-in zoom-in-95 duration-200 z-50">
              <div className="flex flex-col gap-1">
                <button className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-white/10 text-white transition-all group text-left">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/50 group-hover:text-white transition-colors"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" /><polyline points="16 6 12 2 8 6" /><line x1="12" y1="2" x2="12" y2="15" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">Grubu Paylaş</span>
                </button>

                <button
                  onClick={() => { onReport?.(); setIsMenuOpen(false); }}
                  className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-500/10 text-red-500 transition-all group text-left"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-red-500/50 group-hover:text-red-500 transition-colors"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" /><line x1="12" y1="9" x2="12" y2="13" /><line x1="12" y1="17" x2="12.01" y2="17" /></svg>
                  <span className="text-[10px] font-black uppercase tracking-widest">Grubu Şikayet Et</span>
                </button>

                {isMember && (
                  <>
                    <div className="h-px bg-white/10 my-1 mx-2" />
                    <button
                      onClick={() => { onLeave?.(); setIsMenuOpen(false); }}
                      className="flex items-center gap-3 w-full p-3 rounded-xl hover:bg-red-600 text-white transition-all group text-left bg-red-600/20"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-white/70 group-hover:text-white transition-colors"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" /></svg>
                      <span className="text-[10px] font-black uppercase tracking-widest">Gruptan Ayrıl</span>
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

