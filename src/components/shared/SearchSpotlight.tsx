'use client';

import React, { useState, useEffect, useRef } from 'react';
import { readRecentProfiles } from '../../lib/cache';
import { createPortal } from 'react-dom';
import { Search, X, User, Users, GraduationCap, Building2, ArrowRight, Command, SearchIcon, Hash, Globe, Ghost } from 'lucide-react';
import Link from 'next/link';
import { useArmoyu } from '../../context/ArmoyuContext';

const PER_TYPE = 5;

type ResultItem = { href: string; image?: string; title: string; subtitle: string; round?: boolean };

/** Arama sonuçlarında bir tür (oyuncu / grup / iş yeri): başlık, sayı ve en çok PER_TYPE satır */
function ResultColumn({ icon, title, items, empty, fallback, onClose }: {
  icon: React.ReactNode; title: string; items: ResultItem[]; empty: string; fallback?: React.ReactNode; onClose: () => void;
}) {
  return (
    <section aria-label={title} className="min-w-0">
      <h4 className="px-2 mb-2 flex items-center gap-2 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">
        {icon} {title}
        <span className="ml-auto text-slate-300 dark:text-white/30">{items.length}</span>
      </h4>
      {items.length === 0 ? (
        <p className="px-2 py-3 text-[11px] font-bold text-slate-400/70">{empty}</p>
      ) : (
        <div className="grid gap-1">
          {items.map((item, i) => (
            <Link key={i} href={item.href} onClick={onClose} className="flex items-center gap-3 p-2.5 rounded-2xl min-w-0 border border-transparent hover:bg-armoyu-primary/10 hover:border-armoyu-primary/20 transition-colors">
              {item.image
                ? <img src={item.image} alt="" className={`w-9 h-9 shrink-0 object-cover ${item.round ? 'rounded-full' : 'rounded-xl'}`} />
                : <div className="w-9 h-9 shrink-0 rounded-xl bg-armoyu-primary/10 text-armoyu-primary flex items-center justify-center">{fallback}</div>}
              <div className="min-w-0">
                <p className="text-sm font-black text-slate-800 dark:text-white truncate">{item.title}</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest truncate">{item.subtitle}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}

interface SearchSpotlightProps {
  isOpen: boolean;
  onClose: () => void;
  prefix?: string;
}

export function SearchSpotlight({ isOpen, onClose, prefix = '/oyuncu' }: SearchSpotlightProps) {
  // Pencere her açılışta son bakılan profilleri yeniden okur
  const recentProfiles = isOpen ? readRecentProfiles() : [];
  const [query, setQuery] = useState('');
  const [mounted, setMounted] = useState(false);
  const [results, setResults] = useState<{ users: any[], groups: any[], schools: any[], venues: any[] }>({ users: [], groups: [], schools: [], venues: [] });
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
      setResults({ users: [], groups: [], schools: [], venues: [] });
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
        // Phatsa sınırı tür başına: her türden en çok 5 (oyuncu, grup, iş yeri) yan yana görünür
        const response = await api.search.globalSearch(val, 1, PER_TYPE);
        if (response.durum === 1 && response.icerik) {
          const raw = response.icerik;
          setResults({
            users: raw.filter(r => r.type === 'oyuncu').slice(0, PER_TYPE).map(u => ({ displayName: u.title, username: u.username, avatar: u.image })),
            groups: raw.filter(r => r.type === 'grup').slice(0, PER_TYPE).map(g => ({ name: g.title, logo: g.image, memberCount: 0, url: g.url })),
            schools: raw.filter(r => r.type === 'okul').slice(0, PER_TYPE).map(s => ({ name: s.title, logo: s.image, type: 'Eğitim Kurumu' })),
            venues: raw.filter(r => r.type === 'isyeri').slice(0, PER_TYPE).map(v => ({ name: v.title, logo: v.image, url: v.url }))
          });
        }
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    } else {
      setResults({ users: [], groups: [], schools: [], venues: [] });
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
      <div className="relative w-full max-w-4xl bg-white dark:bg-[#0d0d12] border border-slate-200 dark:border-white/10 rounded-[32px] shadow-[0_32px_128px_rgba(0,0,0,0.4)] overflow-hidden animate-in zoom-in-95 slide-in-from-top-8 duration-300">
        
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
          {query.trim().length <= 1 && recentProfiles.length > 0 ? (
            <div className="p-4 md:p-6">
               <h4 className="px-4 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
                 <User size={12} /> SON BAKILANLAR
               </h4>
               <div className="grid gap-1">
                 {recentProfiles.map((p) => (
                   <Link key={p.user_id} href={`${prefix}/${p.username}`} onClick={onClose} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-armoyu-primary/10 transition-all">
                     <img src={p.avatar_url || undefined} alt="" className="w-10 h-10 rounded-full object-cover bg-black/5" />
                     <div>
                       <p className="text-sm font-black text-slate-800 dark:text-white">{p.display_name || p.username}</p>
                       <p className="text-[10px] font-bold text-slate-400">@{p.username}</p>
                     </div>
                   </Link>
                 ))}
               </div>
            </div>
          ) : query.trim().length <= 1 ? (
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
          ) : (results.users.length > 0 || results.groups.length > 0 || results.schools.length > 0 || results.venues.length > 0) ? (
            <div className="p-4 md:p-5 space-y-5">
              <div className="grid gap-5 md:grid-cols-3">
                <ResultColumn
                  icon={<User size={12} />} title="Oyuncular" empty="Eşleşen oyuncu yok" onClose={onClose}
                  items={results.users.map((u) => ({ href: `${prefix}/${u.username}`, image: u.avatar, title: u.displayName, subtitle: `@${u.username}`, round: true }))}
                />
                <ResultColumn
                  icon={<Users size={12} />} title="Gruplar" empty="Eşleşen grup yok" onClose={onClose} fallback={<Users size={16} />}
                  items={results.groups.map((g) => ({ href: g.url?.startsWith('/') ? g.url : `/gruplar/${g.name.toLowerCase()}`, image: g.logo, title: g.name, subtitle: 'Grup' }))}
                />
                <ResultColumn
                  icon={<Building2 size={12} />} title="İş Yerleri" empty="Eşleşen iş yeri yok" onClose={onClose} fallback={<Building2 size={16} />}
                  items={results.venues.map((v) => ({ href: v.url, image: v.logo, title: v.name, subtitle: 'İş yeri' }))}
                />
              </div>
              {results.schools.length > 0 && (
                <ResultColumn
                  icon={<GraduationCap size={12} />} title="Okullar" empty="" onClose={onClose} fallback={<GraduationCap size={16} />}
                  items={results.schools.map((sc) => ({ href: `/egitim/${sc.name.toLowerCase()}`, image: sc.logo, title: sc.name, subtitle: 'Eğitim kurumu' }))}
                />
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
