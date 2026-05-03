'use client';

import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Search, X, User, Users, GraduationCap, ArrowRight, Command, SearchIcon, Hash, Globe, Ghost } from 'lucide-react';
import Link from 'next/link';
import { useArmoyu } from '../../context/ArmoyuContext';

interface SearchSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  prefix?: string;
}

export function SearchSpotlight({ isOpen, onClose, prefix = '/oyuncu' }: SearchSpotlightProps) {
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<{ users: any[], groups: any[], schools: any[] }>({ users: [], groups: [], schools: [] });
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { api } = useArmoyu();

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setResults({ users: [], groups: [], schools: [] });
      setTimeout(() => inputRef.current?.focus(), 100);
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const handleSearch = async (val: string) => {
    setQuery(val);
    if (val.trim().length > 1) {
      setIsLoading(true);
      try {
        const response = await api.search.globalSearch(val, 1, 15);
        if (response.durum === 1 && response.icerik) {
          const raw = response.icerik;
          setResults({
            users: raw.filter(r => r.type === 'oyuncu').map(u => ({ displayName: u.title, username: u.username, avatar: u.image })),
            groups: raw.filter(r => r.type === 'grup').map(g => ({ name: g.title, logo: g.image, memberCount: 0 })),
            schools: raw.filter(r => r.type === 'okul').map(s => ({ name: s.title, logo: s.image, type: 'Eğitim Kurumu' }))
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults({ users: [], groups: [], schools: [] });
    }
  };

  if (!isOpen || !mounted) return null;

  return createPortal(
    <div className="fixed inset-0 z-[6000] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-xl animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Spotlight Box */}
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#0d0d12] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-[0_32px_128px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 slide-in-from-top-8 duration-300">
        
        {/* Search Header */}
        <div className="p-4 md:p-6 border-b border-slate-100 dark:border-white/5 flex items-center gap-4 relative">
          <div className={`p-3 rounded-2xl transition-all duration-500 ${query.length > 0 ? 'bg-armoyu-primary text-white rotate-[360deg] shadow-lg shadow-armoyu-primary/20' : 'bg-slate-100 dark:bg-white/5 text-slate-400'}`}>
            <Search size={24} strokeWidth={2.5} />
          </div>
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => handleSearch(e.target.value)}
            placeholder="Ne aramak istersin?"
            className="flex-1 bg-transparent border-none outline-none text-lg md:text-xl font-bold text-slate-800 dark:text-white placeholder:text-slate-400 dark:placeholder:text-white/20"
          />
          <div className="hidden md:flex items-center gap-1 px-3 py-1.5 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl">
             <span className="text-[10px] font-black text-slate-400 dark:text-white/40 uppercase tracking-widest">ESC</span>
          </div>
          <button onClick={onClose} className="md:hidden p-2 text-slate-400">
            <X size={20} />
          </button>
        </div>

        {/* Results Area */}
        <div className="max-h-[60vh] overflow-y-auto custom-scrollbar">
          {query.trim().length <= 1 ? (
            <div className="p-10 text-center space-y-4">
               <div className="w-20 h-20 bg-armoyu-primary/10 rounded-[32px] flex items-center justify-center mx-auto text-armoyu-primary">
                  <Command size={40} strokeWidth={1.5} />
               </div>
               <div>
                  <h3 className="text-lg font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">Aradığın her şey burada</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">Oyuncuları, gruplari ve okulları keşfetmeye başla.</p>
               </div>
               <div className="flex flex-wrap justify-center gap-2 pt-4">
                  {['#gaming', '#turnuva', '#topluluk', '#egitim'].map(tag => (
                    <span key={tag} className="px-3 py-1.5 bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/5 rounded-lg text-[10px] font-black text-slate-500 uppercase tracking-widest">{tag}</span>
                  ))}
               </div>
            </div>
          ) : isLoading ? (
            <div className="p-12 text-center flex flex-col items-center gap-4">
               <div className="w-10 h-10 border-4 border-armoyu-primary/20 border-t-armoyu-primary rounded-full animate-spin" />
               <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Sonuçlar Getiriliyor...</p>
            </div>
          ) : (results.users.length > 0 || results.groups.length > 0 || results.schools.length > 0) ? (
            <div className="p-4 md:p-6 space-y-8">
               {results.users.length > 0 && (
                 <div>
                   <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <User size={12} /> OYUNCULAR
                   </h4>
                   <div className="grid gap-1">
                     {results.users.map((u, i) => (
                       <Link key={i} href={`${prefix}/${u.username}`} onClick={onClose} className="flex items-center justify-between p-4 rounded-2xl hover:bg-armoyu-primary/10 transition-all group/res border border-transparent hover:border-armoyu-primary/20">
                         <div className="flex items-center gap-4">
                           <img src={u.avatar} className="w-11 h-11 rounded-full border-2 border-transparent group-hover/res:border-armoyu-primary/30" />
                           <div>
                             <p className="text-sm font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{u.displayName}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">@{u.username}</p>
                           </div>
                         </div>
                         <ArrowRight size={16} className="text-armoyu-primary opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
                       </Link>
                     ))}
                   </div>
                 </div>
               )}

               {results.groups.length > 0 && (
                 <div>
                   <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <Users size={12} /> GRUPLAR
                   </h4>
                   <div className="grid gap-1">
                     {results.groups.map((g, i) => (
                       <Link key={i} href={`/gruplar/${g.name.toLowerCase()}`} onClick={onClose} className="flex items-center justify-between p-4 rounded-2xl hover:bg-emerald-500/10 transition-all group/res border border-transparent hover:border-emerald-500/20">
                         <div className="flex items-center gap-4">
                           <img src={g.logo} className="w-11 h-11 rounded-2xl border-2 border-transparent group-hover/res:border-emerald-500/30" />
                           <div>
                             <p className="text-sm font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{g.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Topluluk Grubu</p>
                           </div>
                         </div>
                         <ArrowRight size={16} className="text-emerald-500 opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
                       </Link>
                     ))}
                   </div>
                 </div>
               )}

               {results.schools.length > 0 && (
                 <div>
                   <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                     <GraduationCap size={12} /> OKULLAR
                   </h4>
                   <div className="grid gap-1">
                     {results.schools.map((s, i) => (
                       <Link key={i} href={`/egitim/${s.name.toLowerCase()}`} onClick={onClose} className="flex items-center justify-between p-4 rounded-2xl hover:bg-amber-500/10 transition-all group/res border border-transparent hover:border-amber-500/20">
                         <div className="flex items-center gap-4">
                           <img src={s.logo} className="w-11 h-11 rounded-2xl border-2 border-transparent group-hover/res:border-amber-500/30" />
                           <div>
                             <p className="text-sm font-black text-slate-800 dark:text-white uppercase italic tracking-tighter">{s.name}</p>
                             <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Eğitim Kurumu</p>
                           </div>
                         </div>
                         <ArrowRight size={16} className="text-amber-500 opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
                       </Link>
                     ))}
                   </div>
                 </div>
               )}
            </div>
          ) : (
            <div className="p-20 text-center opacity-30 flex flex-col items-center gap-4">
               <Ghost size={48} strokeWidth={1} />
               <p className="text-xs font-black uppercase tracking-[0.2em]">Eşleşen sonuç bulunamadı</p>
            </div>
          )}
        </div>

        {/* Footer Hint */}
        <div className="p-4 bg-slate-50 dark:bg-black/40 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[10px] font-bold text-slate-400 dark:text-white/20 uppercase tracking-widest px-8">
           <div className="flex items-center gap-4">
              <span className="flex items-center gap-1"><ArrowRight size={10} /> Seç</span>
              <span className="flex items-center gap-1"><ArrowRight size={10} className="rotate-90" /> Gez</span>
           </div>
           <div>ARMOYU SEARCH v2.0</div>
        </div>
      </div>
    </div>,
    document.body
  );
}
