"use client";

import { useRouter, useSearchParams } from 'next/navigation';
import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { 
  Users, MessageSquare, Newspaper, ShoppingBag, 
  ChevronDown, GraduationCap, Zap, LayoutGrid, 
  UserCircle, Image as ImageIcon, Info, Scale, 
  Trophy, MessageCircle, FileText, Gift, Calendar, Camera, LogOut
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useArmoyu } from '../../context/ArmoyuContext';
import { useTheme } from '../../context/ThemeContext';
import { UserDrawer } from '../shared/UserDrawer';

interface SubItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  desc: string;
}

interface NavCategory {
  id: string;
  label: string;
  icon: React.ReactNode;
  items: SubItem[];
}

export function ShowcaseNavigation() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialTab = searchParams.get('tab') || 'sosyal';
  const [activeTab, setActiveTab] = useState(initialTab);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const menuTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const { api, navigation } = useArmoyu();
  const { theme, toggleTheme } = useTheme();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userGroups, setUserGroups] = useState<any[]>([]);

  useEffect(() => {
    const currentTab = searchParams.get('tab') || 'sosyal';
    setActiveTab(currentTab);
  }, [searchParams]);

  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const response = await api.groups.getUserGroups();
          if (response.durum === 1 && response.icerik) {
            setUserGroups(Array.isArray(response.icerik) ? response.icerik : []);
          }
        } catch (error) {
          console.error("[ShowcaseNav] Fetch Groups Error:", error);
        }
      };
      fetchGroups();
    }
  }, [user, api]);

  const goToMyProfile = () => {
    if (user) {
      handleTabChange('profil');
      setIsUserMenuOpen(false);
    }
  };

  const categories: NavCategory[] = [
    {
      id: 'social',
      label: 'SOSYAL',
      icon: <MessageSquare size={16} />,
      items: [
        { id: 'sosyal', label: 'AKIŞ', icon: <Newspaper size={16} />, desc: 'Sosyal medya akışı ve paylaşımlar' },
        { id: 'hikayeler', label: 'HİKAYELER', icon: <ImageIcon size={16} />, desc: 'Kullanıcı hikayeleri ve etkileşim' },
        { id: 'profil', label: 'PROFİL', icon: <UserCircle size={16} />, desc: 'Kullanıcı profili ve istatistikler' },
        { id: 'sohbet', label: 'SOHBET', icon: <MessageCircle size={16} />, desc: 'Anlık mesajlaşma ve arkadaşlar' },
        { id: 'reels', label: 'REELS', icon: <Camera size={16} />, desc: 'Kısa videolar ve hikayeler' },
      ]
    },
    {
      id: 'community',
      label: 'TOPLULUK',
      icon: <Users size={16} />,
      items: [
        { id: 'haberler', label: 'HABERLER', icon: <Newspaper size={16} />, desc: 'Platform duyuruları ve güncel haberler' },
        { id: 'gruplar', label: 'GRUPLAR', icon: <Users size={16} />, desc: 'Klanlar ve sosyal topluluklar' },
        { id: 'forum', label: 'FORUM', icon: <FileText size={16} />, desc: 'Tartışma konuları ve rehberler' },
        { id: 'egitim', label: 'EĞİTİM', icon: <GraduationCap size={16} />, desc: 'Okullar ve akademik hayat' },
        { id: 'anketler', label: 'ANKETLER', icon: <Zap size={16} />, desc: 'Topluluk kararları ve oylamalar' },
        { id: 'cekilisler', label: 'ÇEKİLİŞLER', icon: <Gift size={16} />, desc: 'Ödüllü etkinlikler ve şans' },
        { id: 'etkinlikler', label: 'ETKİNLİKLER', icon: <Calendar size={16} />, desc: 'Turnuvalar ve topluluk buluşmaları' },
      ]
    },
    {
      id: 'services',
      label: 'HİZMETLER',
      icon: <LayoutGrid size={16} />,
      items: [
        { id: 'magaza', label: 'MAĞAZA', icon: <ShoppingBag size={16} />, desc: 'Dijital ürünler ve market' },
        { id: 'kurumsal', label: 'KURALLAR', icon: <Scale size={16} />, desc: 'Platform kuralları ve ilkeler' },
        { id: 'genel', label: 'GENEL', icon: <Info size={16} />, desc: 'Hakkımızda ve genel bilgiler' },
        { id: 'modlar', label: 'MODLAR', icon: <Trophy size={16} />, desc: 'Sunucu modları ve eklentiler' },
      ]
    }
  ];

  const handleTabChange = (id: string) => {
    setActiveTab(id);
    setActiveMenu(null);
    router.push(`/?tab=${id}`);
  };

  const handleMenuEnter = (id: string) => {
    if (menuTimeoutRef.current) clearTimeout(menuTimeoutRef.current);
    setActiveMenu(id);
  };

  const handleMenuLeave = () => {
    menuTimeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 150);
  };

  return (
    <nav className="sticky top-0 z-[200] w-full border-b border-white/5 bg-black/40 backdrop-blur-3xl">
      <div className="w-full px-6 md:px-12 h-20 flex items-center justify-between gap-8">
        
        {/* Logo */}
        <Link href="/" className="flex items-center gap-4 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-105 transition-all duration-500">
             <span className="text-white font-black text-xs italic">UI</span>
          </div>
          <div className="hidden sm:block">
             <h2 className="text-sm font-black text-white uppercase tracking-tighter italic leading-none">ARMOYU <span className="text-blue-500">VITRINI</span></h2>
             <p className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-[0.2em] opacity-50 mt-1">Design System V3</p>
          </div>
        </Link>

        {/* Categories with Submenus */}
        <div className="flex-1 flex items-center gap-2">
          {categories.map((cat) => (
            <div 
              key={cat.id}
              className="relative"
              onMouseEnter={() => handleMenuEnter(cat.id)}
              onMouseLeave={handleMenuLeave}
            >
              <button
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                  cat.items.some(i => i.id === activeTab)
                    ? 'text-blue-500 bg-blue-500/10'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                {cat.label}
                <ChevronDown size={12} className={`transition-transform duration-300 ${activeMenu === cat.id ? 'rotate-180' : ''}`} />
              </button>

              {/* Submenu Dropdown */}
              {activeMenu === cat.id && (
                <div className="absolute top-full left-0 mt-2 w-64 rounded-3xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden p-3 animate-in fade-in zoom-in duration-200">
                  <div className="grid gap-1">
                    {cat.items.map((item) => (
                      <button
                        key={item.id}
                        onClick={() => handleTabChange(item.id)}
                        className={`flex items-start gap-4 p-3 rounded-2xl text-left transition-all group ${
                          activeTab === item.id 
                            ? 'bg-blue-600 text-white' 
                            : 'hover:bg-white/5 text-gray-400 hover:text-white'
                        }`}
                      >
                        <div className={`mt-1 p-2 rounded-lg ${activeTab === item.id ? 'bg-white/20' : 'bg-white/5 group-hover:bg-blue-600/20 group-hover:text-blue-500'} transition-colors`}>
                          {item.icon}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[10px] font-black uppercase tracking-widest">{item.label}</span>
                          <span className={`text-[8px] font-bold opacity-60 leading-tight mt-1 ${activeTab === item.id ? 'text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                            {item.desc}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Member Actions */}
        <div className="flex items-center gap-4">
          {user ? (
            <div className="flex items-center gap-3 pl-4 border-l border-white/10 group relative">
              <div className="flex flex-col items-end hidden sm:flex">
                <span className="text-[10px] font-black text-white uppercase tracking-tighter italic">{user.displayName || user.username}</span>
                <span className="text-[8px] font-bold text-blue-500 uppercase tracking-widest opacity-80">Online</span>
              </div>
              <button 
                onClick={() => setIsUserMenuOpen(true)}
                className="w-10 h-10 rounded-2xl bg-white/5 border border-white/10 overflow-hidden hover:border-blue-500/50 transition-all active:scale-95"
              >
                <img 
                  src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                  alt="Profile" 
                  className="w-full h-full object-cover"
                />
              </button>
              <button 
                onClick={() => logout()}
                className="p-2.5 rounded-xl bg-red-500/10 text-red-500 hover:bg-red-500 hover:text-white transition-all group/logout"
                title="Çıkış Yap"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <button
              onClick={() => handleTabChange('auth')}
              className={`flex items-center gap-3 px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all ${
                activeTab === 'auth'
                  ? 'bg-white text-black shadow-xl shadow-white/10'
                  : 'bg-blue-600 text-white hover:bg-blue-500 shadow-xl shadow-blue-600/20'
              }`}
            >
              <UserCircle size={16} strokeWidth={2.5} />
              <span>Giriş Yap</span>
            </button>
          )}
        </div>

      </div>
      <UserDrawer 
        isOpen={isUserMenuOpen} 
        onClose={() => setIsUserMenuOpen(false)} 
        user={user}
        logout={logout}
        userGroups={userGroups}
        navigation={navigation}
        theme={theme}
        toggleTheme={toggleTheme}
        goToMyProfile={goToMyProfile}
        links={{
            posts: '/?tab=yazilarim',
            comments: '/?tab=yazilarim',
            polls: '/?tab=anketler',
            giveaways: '/?tab=cekilisler',
            education: '/?tab=egitim',
            support: '/?tab=destek'
        }}
      />
    </nav>
  );
}
