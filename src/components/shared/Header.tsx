'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useTheme } from '../../context/ThemeContext';
import { useRouter, usePathname } from 'next/navigation';
import { useArmoyu } from '../../context/ArmoyuContext';
import Link from 'next/link';
import { userList } from '../../lib/constants/seedData';
import { NavItem } from '../../types/navigation';
import { 
    Search, X, Users, MessageSquare, Bell, User, Flag, 
    ShieldAlert, ArrowRight, Menu, ArrowLeft, GraduationCap, ChevronDown, Command
} from 'lucide-react';
import { UserDrawer } from './UserDrawer';
import { SearchSpotlight } from './SearchSpotlight';

interface HeaderProps {
  items?: NavItem[];
  drawerLinks?: {
    posts?: string;
    comments?: string;
    polls?: string;
    giveaways?: string;
    education?: string;
    support?: string;
  };
  profilePrefix?: string;
  menuAlign?: 'left' | 'center' | 'right';
  logoUrl?: string;
}

export function Header({ 
  items, 
  drawerLinks, 
  profilePrefix = '/oyuncu',
  menuAlign = 'left',
  logoUrl
}: HeaderProps) {
  const { user, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuView, setUserMenuView] = useState<'main' | 'invite'>('main');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [userGroups, setUserGroups] = useState<any[]>([]);

  // Search Spotlight State
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const { theme, toggleTheme } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const { api, navigation } = useArmoyu();

  // CMD+K Shortcut
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSpotlightOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // ESC to close all overlays
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsNotificationOpen(false);
        setIsUserMenuOpen(false);
        setIsMobileMenuOpen(false);
        setIsSpotlightOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  // Gruplarımı Canlı Getir
  useEffect(() => {
    if (user) {
      const fetchGroups = async () => {
        try {
          const response = await api.groups.getUserGroups();
          if (response.durum === 1 && response.icerik) {
            setUserGroups(Array.isArray(response.icerik) ? response.icerik : []);
          }
        } catch (error) {
          console.error("[Header] Fetch Groups Error:", error);
        }
      };
      fetchGroups();
    } else {
      setUserGroups([]);
    }
  }, [user, api]);

  const activeNavItems = React.useMemo(() => {
    if (items) return items;

    const nav = [
      { name: 'Gruplar', href: navigation.groupPrefix },
      { name: 'Etkinlikler', href: '/etkinlikler' },
      { name: 'Okullar', href: navigation.educationPrefix },
      { name: 'Forum', href: navigation.forumPrefix },
      { name: 'Haberler', href: navigation.newsPrefix },
      { name: 'Çekilişler', href: navigation.giveawayPrefix },
      { name: 'Anketler', href: navigation.pollPrefix },
      { name: 'Modlar', href: '/modlar' },
      { name: 'Galeriler', href: navigation.galleryPrefix },
      {
        name: 'Kurumsal',
        href: '#',
        submenu: [
          { name: 'Hakkımızda', href: '/ekibimiz/hakkimizda' },
          { name: 'Çalışma Ekibi', href: '/ekibimiz/ekip' },
          { name: 'Topluluk Kuralları', href: '/kurallar' },
          { name: 'İnsan Kaynakları', href: '/ekibimiz/ik' },
          { name: 'Gizlilik Politikası', href: '/ekibimiz/gizlilik' }
        ]
      },
      { name: 'Mağaza', href: navigation.storePrefix },
    ];

    nav.push({ name: 'Yönetim', href: navigation.managementPrefix });

    return nav;
  }, [items, user, navigation]);

  // Navigasyon gerçekleştiğinde tüm menüleri kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
    setIsSpotlightOpen(false);
  }, [pathname]);

  const goToMyProfile = () => {
    if (user) {
      router.push(`${profilePrefix}/${user.username}`);
      setIsUserMenuOpen(false);
    }
  };

  // Mock Notification Data
  const [notifications, setNotifications] = useState<any[]>([]);
  
  const unreadCount = notifications.filter(notif => notif.status === 0).length;

  useEffect(() => {
    if (user) {
      const fetchNotifications = async () => {
        try {
          const response = await api.users.getNotifications();
          if (response.durum === 1 && response.icerik) {
            setNotifications(Array.isArray(response.icerik) ? response.icerik : []);
          }
        } catch (error) {
          console.error("[Header] Fetch Notifications Error:", error);
        }
      };
      fetchNotifications();
      
      // Opsiyonel: Her 30 saniyede bir güncelle
      const interval = setInterval(fetchNotifications, 30000);
      return () => clearInterval(interval);
    } else {
      setNotifications([]);
    }
  }, [user, api]);

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, status: 1 })));
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-armoyu-header-bg backdrop-blur-md border-b border-armoyu-header-border shadow-sm shadow-black/5 transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-12 md:h-14 flex items-center justify-between gap-4 flex-nowrap">
          
          <div className="flex items-center gap-4 shrink-0">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group relative">
              {logoUrl ? (
                <img 
                  src={logoUrl} 
                  alt="Logo" 
                  className="h-10 md:h-14 w-auto object-contain transition-all duration-500 group-hover:scale-110 drop-shadow-2xl relative z-[10] translate-y-1 md:translate-y-2" 
                />
              ) : (
                <>
                  <div className="w-9 h-9 bg-armoyu-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                    <span className="text-white font-black italic text-sm">A</span>
                  </div>
                  <div className="hidden 2xl:block">
                    <h1 className="text-lg font-black text-armoyu-text uppercase tracking-tighter leading-none italic">ARMOYU</h1>
                  </div>
                </>
              )}
            </Link>
          </div>

          {/* Right Side Block: Nav + Actions */}
          <div className={`flex-1 flex items-center gap-4 min-w-0 ${
            menuAlign === 'center' ? 'justify-between' : 'justify-end'
          }`}>
            {/* Desktop Navigation */}
            <nav className={`hidden lg:flex items-center gap-0.5 min-w-0 ${
              menuAlign === 'center' ? 'flex-1 justify-center' : 
              menuAlign === 'right' ? 'justify-end' : 
              'justify-start'
            }`}>
              {activeNavItems.map((item, index) => (
                <div key={index} className="relative group shrink-0">
                  <Link
                    href={item.href}
                    className={`px-2 py-1 rounded-lg text-[10px] 2xl:text-[11px] font-black uppercase tracking-wider transition-all flex items-center gap-1 whitespace-nowrap ${
                      pathname === item.href ? 'text-armoyu-primary bg-armoyu-primary/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown size={10} className="opacity-40 group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>
                  
                  {item.submenu && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[2000]">
                      <div className="w-64 bg-white dark:bg-[#12121a] border border-armoyu-header-border rounded-[24px] shadow-2xl p-3 grid gap-1">
                        {item.submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            href={sub.href}
                            className="flex items-center gap-3 p-3 rounded-xl text-[10px] font-bold text-armoyu-text-muted hover:text-armoyu-primary hover:bg-armoyu-primary/5 transition-all uppercase tracking-widest"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            <div className="flex items-center gap-2 md:gap-4 shrink-0 z-50">
              
              {/* Spotlight Search Trigger */}
              <button
                onClick={() => setIsSpotlightOpen(true)}
                className="p-2.5 rounded-xl text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all active:scale-95"
                title="Arama (⌘K)"
              >
                <Search size={22} />
              </button>

              {user && (
                <div className="relative">
                  <button
                    onClick={() => setIsNotificationOpen(!isNotificationOpen)}
                    className={`relative p-2 rounded-xl transition-all ${isNotificationOpen ? 'bg-armoyu-primary text-white shadow-lg shadow-armoyu-primary/30' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                    title="Bildirimler"
                  >
                    <Bell size={22} />
                    {unreadCount > 0 && (
                      <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-white dark:border-[#0d0d12] animate-bounce">
                        {unreadCount}
                      </span>
                    )}
                  </button>

                  {/* Notifications Popover */}
                  {isNotificationOpen && (
                    <>
                      <div className="fixed inset-0 z-[1999]" onClick={() => setIsNotificationOpen(false)} />
                      <div className="absolute right-0 mt-3 w-80 md:w-96 bg-armoyu-header-bg border border-gray-200 dark:border-white/10 rounded-[32px] shadow-2xl z-[2000] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                        <div className="p-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                          <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-[0.2em]">BİLDİRİMLER</h4>
                          <button
                            onClick={markAllAsRead}
                            className="text-[10px] font-bold text-armoyu-primary hover:opacity-80 transition-colors uppercase tracking-widest"
                          >
                            HEPSİNİ OKUNDU İŞARETLE
                          </button>
                        </div>
                        <div className="max-h-[450px] overflow-y-auto hide-scrollbar">
                          {notifications.length > 0 ? (
                            notifications.map((notif) => (
                              <div key={notif.id} className={`p-5 flex items-start gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-gray-100 dark:border-white/5 last:border-0 ${notif.status === 0 ? 'bg-armoyu-primary/5' : ''}`}>
                                <div className="relative">
                                  <img 
                                    src={notif.user?.avatar || '/img/logo.png'} 
                                    className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 shadow-sm" 
                                    alt="" 
                                    onError={(e) => { (e.target as HTMLImageElement).src = '/img/logo.png' }}
                                  />
                                  <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                                    {notif.type === 'like' && <Flag size={10} className="text-red-500" />}
                                    {notif.type === 'comment' && <MessageSquare size={10} className="text-armoyu-primary" />}
                                    {notif.type === 'follow' && <Users size={10} className="text-emerald-500" />}
                                    {notif.type === 'alert' && <ShieldAlert size={10} className="text-amber-500" />}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-armoyu-text leading-relaxed">
                                    <span className="font-black uppercase tracking-tight mr-1">{notif.user?.displayName || 'ARMOYU'}</span>
                                    <span className="font-medium text-armoyu-text-muted">{notif.content}</span>
                                  </p>
                                  <span className="text-[10px] font-bold text-armoyu-text-muted opacity-40 uppercase tracking-widest mt-1 block italic">{notif.date}</span>
                                </div>
                                {notif.status === 0 && <div className="w-2.5 h-2.5 rounded-full bg-armoyu-primary mt-2 shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.6)]" />}
                              </div>
                            ))
                          ) : (
                            <div className="py-16 text-center">
                              <Bell size={40} className="mx-auto text-armoyu-text-muted/20 mb-4" />
                              <p className="text-xs font-black text-armoyu-text uppercase tracking-widest">Bildirim Bulunmuyor</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!isLoading && (
                user ? (
                  <button
                    onClick={() => { setIsUserMenuOpen(true); setUserMenuView('main'); }}
                    className="flex items-center gap-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-armoyu-header-border focus:outline-none"
                    title="Profilim"
                  >
                    <img
                      src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`}
                      alt="Avatar"
                      className="w-8 h-8 rounded-full border border-armoyu-primary/50 shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.5)] object-cover bg-white/5"
                    />
                    <span className="text-sm font-bold text-armoyu-text hidden md:inline-block pr-2">
                      {user.displayName.split(' ')[0]}
                    </span>
                  </button>
                ) : (
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setIsLoginModalOpen(true)}
                      className="px-6 py-2.5 bg-armoyu-primary hover:bg-armoyu-primary text-white text-xs font-black uppercase tracking-widest rounded-2xl transition-all shadow-lg shadow-armoyu-primary/20 active:scale-95"
                    >
                      Giriş Yap
                    </button>
                  </div>
                )
              )}

              {/* Mobile Menu Trigger */}
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="lg:hidden p-2 rounded-xl text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all"
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[5000] lg:hidden animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="absolute inset-y-0 left-0 w-[300px] bg-armoyu-header-bg border-r border-armoyu-header-border shadow-2xl flex flex-col animate-in slide-in-from-left duration-300">
            <div className="p-6 border-b border-armoyu-header-border flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-armoyu-primary rounded-xl flex items-center justify-center">
                  <span className="text-white font-black italic text-sm">A</span>
                </div>
                <span className="text-lg font-black text-armoyu-text italic">ARMOYU</span>
              </div>
              <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 text-armoyu-text-muted">
                <ArrowLeft size={20} />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-4 space-y-1">
              <button
                onClick={() => { setIsMobileMenuOpen(false); setIsSpotlightOpen(true); }}
                className="w-full flex items-center gap-3 p-4 mb-6 rounded-2xl bg-black/5 dark:bg-white/5 text-armoyu-text-muted border border-armoyu-header-border"
              >
                <Search size={18} />
                <span className="text-xs font-bold uppercase tracking-widest">ARAMA YAP...</span>
              </button>

              {activeNavItems.map((item, idx) => (
                <MobileNavItem 
                  key={idx} 
                  item={item} 
                  onClose={() => setIsMobileMenuOpen(false)} 
                />
              ))}
            </nav>

            <div className="p-6 border-t border-armoyu-header-border space-y-4">
              {user ? (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsUserMenuOpen(true); }}
                  className="w-full py-4 px-4 rounded-xl font-bold bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text flex justify-center items-center gap-2 hover:bg-black/10 dark:hover:bg-white/10 transition-colors"
                >
                  Profil Menüsü
                </button>
              ) : (
                <button
                  onClick={() => { setIsMobileMenuOpen(false); setIsLoginModalOpen(true); }}
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-armoyu-primary to-armoyu-primary text-white transition-all text-md font-bold shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb),0.4)]"
                >
                  Giriş Yap / Kayıt Ol
                </button>
              )}
            </div>
          </div>
        </div>
      )}

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
        initialView={userMenuView}
        links={drawerLinks || {
            posts: '/yazilarim',
            comments: '/yazilarim',
            polls: navigation.pollPrefix,
            giveaways: navigation.giveawayPrefix,
            education: navigation.educationPrefix,
            support: navigation.supportPrefix
        }}
      />

      <SearchSpotlight 
        isOpen={isSpotlightOpen} 
        onClose={() => setIsSpotlightOpen(false)} 
        prefix={profilePrefix}
      />

      {/* Misafirler için Login Popup */}
      <LoginModal isOpen={!user && isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}

function MobileNavItem({ item, onClose }: { item: NavItem, onClose: () => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const hasSubmenu = item.submenu && item.submenu.length > 0;

  return (
    <div className="space-y-1">
      {hasSubmenu ? (
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`w-full flex items-center justify-between p-3.5 rounded-xl text-sm font-bold transition-all ${isOpen ? 'text-armoyu-primary bg-armoyu-primary/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
        >
          <div className="flex items-center gap-3">
            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
            {item.name}
          </div>
          <ChevronDownIcon size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <Link
          href={item.href}
          onClick={onClose}
          className="flex items-center gap-3 p-3.5 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-current opacity-20" />
          {item.name}
        </Link>
      )}
      
      {hasSubmenu && isOpen && (
        <div className="pl-4 space-y-1 border-l-2 border-armoyu-primary/10 ml-6 animate-in slide-in-from-top-2 duration-200">
          {item.submenu?.map((sub, sidx) => (
            <Link
              key={sidx}
              href={sub.href}
              onClick={onClose}
              className="flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-armoyu-text-muted hover:text-armoyu-primary transition-all"
            >
              <ArrowRight size={14} />
              {sub.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

function ChevronDownIcon({ size, className }: { size: number, className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"/></svg>
  );
}
