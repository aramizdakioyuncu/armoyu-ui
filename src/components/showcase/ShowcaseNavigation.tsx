'use client';

import React from 'react';
import { 
  Box, 
  Layers, 
  Share2, 
  User, 
  MessageSquare, 
  ShoppingBag, 
  Users,
  Building2,
  Video,
  ShieldCheck,
  Box as BoxIcon
} from 'lucide-react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';

export function ShowcaseNavigation() {
  const { user, logout, setIsLoginModalOpen, setIsRegisterModalOpen } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'Genel';

  const tabs = [
    { name: 'Genel', icon: <Box size={18} /> },
    { name: 'Kurumsal', icon: <Layers size={18} /> },
    { name: 'Sosyal', icon: <Share2 size={18} /> },
    { name: 'Profil', icon: <User size={18} /> },
    { name: 'Giriş / Kayıt', icon: <ShieldCheck size={18} /> },
    { name: 'Mesajlar', icon: <MessageSquare size={18} /> },
    { name: 'Topluluk', icon: <Users size={18} /> },
    { name: 'Gruplar', icon: <Building2 size={18} /> },
    { name: 'Etkinlikler', icon: <Box size={18} /> },
    { name: 'Shop', icon: <ShoppingBag size={18} /> },
    { name: 'Reels', icon: <Video size={18} /> },
  ];

  return (
    <nav className="sticky top-0 z-[110] w-full border-b border-white/5 bg-black/20 backdrop-blur-2xl">
      <div className="max-w-full mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-4 hover:opacity-80 transition-opacity">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20">
             <span className="text-white font-black text-xs italic">UI</span>
          </div>
          <div>
             <h2 className="text-sm font-black text-armoyu-text uppercase tracking-tighter italic">ARMOYU <span className="text-blue-500">VITRINI</span></h2>
             <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50">V3 Design System</p>
          </div>
        </Link>

        <div className="hidden md:flex items-center gap-1 bg-white/5 p-1 rounded-xl border border-white/5">
           {tabs.map((tab) => {
             const isActive = pathname === '/' && activeTab === tab.name;
             return (
               <Link
                 key={tab.name}
                 href={tab.name === 'Genel' ? '/' : `/?tab=${tab.name}`}
                 className={`px-4 py-2 rounded-lg text-[10px] font-black uppercase tracking-widest transition-all italic ${
                   isActive
                     ? 'bg-white dark:bg-white/10 text-blue-500 shadow-sm'
                     : 'text-armoyu-text-muted hover:text-armoyu-text'
                 }`}
               >
                 {tab.name}
               </Link>
             );
           })}
        </div>

        <div className="flex items-center gap-3">
           <span className="text-[10px] font-black py-1.5 px-3 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 uppercase tracking-widest">v1.0.0 Stable</span>
        </div>
      </div>
    </nav>
  );
}
