'use client';

import * as React from 'react';
import { useState, useEffect } from 'react';
import { LoginModal } from './LoginModal';
import { useAuth } from '../../context/AuthContext';
import { useChat } from '../../context/ChatContext';
import { useLayout } from '../../context/LayoutContext';
import { useTheme } from '../../context/ThemeContext';
import { useSocket } from '../../context/SocketContext';
import { useRouter, usePathname } from 'next/navigation';
import { useArmoyu } from '../../context/ArmoyuContext';
import Link from 'next/link';
import { userList, groupList, schoolList } from '../../lib/constants/seedData';
import { SearchResult } from '../../models/social/search/SearchResult';
import { NavItem } from '../../types/navigation';
import { 
    Search, X, Users, MessageSquare, Bell, User, Flag, 
    ShieldAlert, ShieldCheck, Crown, LogOut, Moon, Sun, 
    ArrowRight, Menu, ArrowLeft, GraduationCap, UserPlus 
} from 'lucide-react';
import { UserDrawer } from './UserDrawer';

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
}

export function Header({ items, drawerLinks, profilePrefix = '/oyuncu' }: HeaderProps) {
  const { user, session, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [userMenuView, setUserMenuView] = useState<'main' | 'invite'>('main');
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isGroupsSubmenuOpen, setIsGroupsSubmenuOpen] = useState(false);
  const [userGroups, setUserGroups] = useState<any[]>([]);

  // Search States
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchResults, setSearchResults] = useState<{ users: any[], groups: any[], schools: any[] }>({ users: [], groups: [], schools: [] });

  const { theme, toggleTheme } = useTheme();
  const { openChat } = useChat();
  const router = useRouter();
  const pathname = usePathname();
  const { api, navigation } = useArmoyu();

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

  // Navigasyon gerçekleştiğinde تمام menüleri kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
    setIsSearchOpen(false);
  }, [pathname]);

  const handleSearch = async (query: string) => {
    setSearchQuery(query);
    if (query.trim().length > 1) {
      try {
        const response = await api.search.globalSearch(query, 1, 10);
        if (response.durum === 1 && response.icerik) {
          const results = response.icerik;
          
          const users = results.filter(r => r.type === 'oyuncu').map(u => ({
            displayName: u.title,
            username: u.username,
            avatar: u.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.username}`
          }));
          
          const groups = results.filter(r => r.type === 'grup').map(g => ({
            name: g.title,
            logo: g.image,
            memberCount: 0 // API might not provide this in global search
          }));

          const schools = results.filter(r => r.type === 'okul').map(s => ({
            name: s.title,
            logo: s.image,
            type: 'Eğitim Kurumu'
          }));

          setSearchResults({ users, groups, schools });
        }
      } catch (error) {
        console.error("[Header] Search error:", error);
      }
    } else {
      setSearchResults({ users: [], groups: [], schools: [] });
    }
  };

  const goToMyProfile = () => {
    if (user) {
      router.push(`${profilePrefix}/${user.username}`);
      setIsUserMenuOpen(false);
    }
  };

  // Mock Notification Data
  const [notifications, setNotifications] = useState([
    { id: 1, type: 'like', user: userList[0], text: 'gönderini beğendi', time: '2 dk önce', isRead: false },
    { id: 2, type: 'comment', user: userList[1], text: 'fotoğrafına yorum yaptı', time: '15 dk önce', isRead: false },
    { id: 3, type: 'follow', user: userList[2], text: 'seni takip etmeye başladı', time: '1 saat önce', isRead: true }
  ]);
  
  const unreadCount = notifications.filter(n => !n.isRead).length;

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  return (
    <>
      <header className="sticky top-0 z-[100] w-full bg-armoyu-header-bg backdrop-blur-md border-b border-armoyu-header-border shadow-sm shadow-black/5 transition-all duration-300">
        <div className="max-w-[1800px] mx-auto px-4 md:px-6 h-16 md:h-18 flex items-center justify-between gap-4">
          
          <div className="flex items-center gap-4 shrink-0 min-w-0 flex-1">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="w-9 h-9 bg-armoyu-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/30 group-hover:scale-105 transition-all duration-500 overflow-hidden">
                <span className="text-white font-black italic text-lg">A</span>
              </div>
              <div className="hidden 2xl:block">
                <h1 className="text-lg font-black text-armoyu-text uppercase tracking-tighter leading-none italic">ARMOYU</h1>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-0.5">
              {activeNavItems.map((item, index) => (
                <div key={index} className="relative group">
                  <Link
                    href={item.href}
                    className={`px-2 py-1.5 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all flex items-center gap-1.5 ${
                      pathname === item.href ? 'text-armoyu-primary bg-armoyu-primary/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    {item.name}
                    {item.submenu && <ChevronDown size={10} className="opacity-40 group-hover:rotate-180 transition-transform duration-300" />}
                  </Link>
                  
                  {item.submenu && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 translate-y-2 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-[150]">
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
          </div>

          <div className="flex items-center gap-2 md:gap-4 shrink-0 z-50">
            {/* Mobile Search Overlay */}
            {isSearchOpen && (
              <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[150] lg:hidden" onClick={() => setIsSearchOpen(false)} />
            )}
            
            {/* Mobile Search Input Bar */}
            {isSearchOpen && (
              <div className="fixed top-0 left-0 w-full bg-armoyu-header-bg border-b border-armoyu-header-border p-4 z-[999] lg:hidden animate-in slide-in-from-top duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex-1 relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-primary" size={18} />
                    <input
                      autoFocus
                      type="text"
                      placeholder="ARAMA YAPIN..."
                      value={searchQuery}
                      onChange={(e) => handleSearch(e.target.value)}
                      className="w-full bg-white dark:bg-white/10 border-2 border-armoyu-primary/40 rounded-2xl py-4 pl-12 pr-12 text-sm font-black text-armoyu-text focus:outline-none focus:border-armoyu-primary focus:ring-4 focus:ring-armoyu-primary/10 transition-all uppercase tracking-widest placeholder:text-armoyu-text-muted/60 shadow-lg"
                    />
                    {searchQuery && (
                      <button 
                        onClick={() => handleSearch('')}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-1 bg-black/5 dark:bg-white/10 rounded-full text-armoyu-text-muted hover:text-armoyu-text transition-colors"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                  <button 
                    onClick={() => setIsSearchOpen(false)} 
                    className="p-3 bg-black/5 dark:bg-white/10 rounded-2xl text-armoyu-text-muted hover:text-red-500 hover:bg-red-500/10 transition-all flex items-center justify-center"
                    title="Kapat"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>
            )}

            {/* Mobile Search Results */}
            {isSearchOpen && (
              <div className="fixed top-20 left-0 w-full bg-armoyu-header-bg border-b border-armoyu-header-border shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-[998] lg:hidden max-h-[calc(100vh-100px)]">
                <div className="p-6 overflow-y-auto hide-scrollbar">
                  {searchQuery.trim().length <= 1 ? (
                    <div className="py-12 text-center opacity-40">
                      <Search size={40} className="mx-auto mb-4" />
                      <p className="text-[10px] font-black uppercase tracking-[0.2em]">Arama yapmaya başla...</p>
                    </div>
                  ) : (
                    <SearchContent results={searchResults} onClose={() => setIsSearchOpen(false)} prefix={profilePrefix} query={searchQuery} />
                  )}
                </div>
              </div>
            )}

            {/* Desktop Search */}
            <div className="hidden xl:flex items-center relative group w-48 2xl:w-64 pointer-events-auto">
              <div className="w-full relative z-30">
                <div className={`absolute inset-0 bg-armoyu-primary/10 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500`} />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-armoyu-primary transition-colors z-10" size={16} />
                <input
                  id="desktop-search"
                  name="search"
                  type="text"
                  placeholder="ARAMA..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  onFocus={() => setIsSearchOpen(true)}
                  className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-header-border rounded-xl py-2 pl-11 pr-4 text-[11px] font-bold text-armoyu-text focus:outline-none focus:ring-2 focus:ring-armoyu-primary/20 transition-all placeholder:text-armoyu-text-muted/50 relative z-20"
                />
              </div>

              {/* Desktop Search Results Dropdown */}
              {isSearchOpen && searchQuery.trim().length > 1 && (
                <div className="hidden lg:block absolute top-full right-0 mt-3 w-[400px] bg-armoyu-header-bg border border-armoyu-header-border rounded-[32px] shadow-2xl overflow-hidden animate-in fade-in slide-in-from-top-4 duration-300 z-40">
                  <div className="p-6 max-h-[70vh] overflow-y-auto hide-scrollbar">
                    <SearchContent results={searchResults} onClose={() => setIsSearchOpen(false)} prefix={profilePrefix} query={searchQuery} />
                  </div>
                </div>
              )}
            </div>

            {/* User Actions */}
            <div className="flex-shrink-0 pl-4 md:pl-8 border-l border-armoyu-header-border flex items-center gap-2 md:gap-4 h-full">

              {/* Mobile Search Trigger */}
              <button
                className="lg:hidden p-2 rounded-xl text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                onClick={() => setIsSearchOpen(true)}
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
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                      <div className="absolute right-0 mt-3 w-80 md:w-96 bg-armoyu-header-bg border border-gray-200 dark:border-white/10 rounded-[32px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
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
                              <div key={notif.id} className={`p-5 flex items-start gap-4 hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer border-b border-gray-100 dark:border-white/5 last:border-0 ${!notif.isRead ? 'bg-armoyu-primary/5' : ''}`}>
                                <div className="relative">
                                  <img src={notif.user.avatar} className="w-12 h-12 rounded-full border border-gray-200 dark:border-white/10 shadow-sm" alt="" />
                                  <div className="absolute -bottom-1 -right-1 p-1 bg-white dark:bg-zinc-900 rounded-full border border-gray-200 dark:border-white/10 shadow-sm">
                                    {notif.type === 'like' && <Flag size={10} className="text-red-500" />}
                                    {notif.type === 'comment' && <MessageSquare size={10} className="text-armoyu-primary" />}
                                    {notif.type === 'follow' && <Users size={10} className="text-emerald-500" />}
                                    {notif.type === 'alert' && <ShieldAlert size={10} className="text-amber-500" />}
                                  </div>
                                </div>
                                <div className="flex-1 min-w-0">
                                  <p className="text-xs text-armoyu-text leading-relaxed">
                                    <span className="font-black uppercase tracking-tight mr-1">{notif.user.displayName}</span>
                                    <span className="font-medium text-armoyu-text-muted">{notif.text}</span>
                                  </p>
                                  <span className="text-[10px] font-bold text-armoyu-text-muted opacity-40 uppercase tracking-widest mt-1 block italic">{notif.time}</span>
                                </div>
                                {!notif.isRead && <div className="w-2.5 h-2.5 rounded-full bg-armoyu-primary mt-2 shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.6)]" />}
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
        <div className="fixed inset-0 z-[110] lg:hidden animate-in fade-in duration-200">
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
              <div className="relative mb-6">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted" size={16} />
                <input
                  id="mobile-search"
                  name="search"
                  type="text"
                  placeholder="ARA..."
                  className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-header-border rounded-xl py-3 pl-12 pr-4 text-xs font-bold text-armoyu-text focus:outline-none"
                />
              </div>

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
          <ChevronDown size={14} className={`transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
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

function SearchContent({ results, onClose, prefix, query }: { results: any, onClose: () => void, prefix: string, query: string }) {
  if (results.users.length === 0 && results.groups.length === 0 && results.schools.length === 0) {
    return (
      <div className="py-12 text-center opacity-40">
        <X size={40} className="mx-auto mb-4" />
        <p className="text-[10px] font-black uppercase tracking-[0.2em]">Sonuç bulunamadı</p>
      </div>
    );
  }

  return (
    <>
      {results.users.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <User size={12} /> OYUNCULAR
          </h4>
          <div className="grid gap-2">
            {results.users.map((u: any, i: number) => (
              <Link key={i} href={`${prefix}/${u.username}`} onClick={onClose} className="flex items-center justify-between p-3 rounded-2xl hover:bg-armoyu-primary/5 border border-transparent hover:border-armoyu-primary/20 transition-all group/res">
                <div className="flex items-center gap-3">
                  <img src={u.avatar} className="w-10 h-10 rounded-full border border-armoyu-header-border" />
                  <div>
                    <p className="text-xs font-black text-armoyu-text uppercase">{u.displayName}</p>
                    <p className="text-[10px] font-bold text-armoyu-text-muted italic">@{u.username}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-armoyu-primary opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.groups.length > 0 && (
        <div className="mb-6">
          <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <Users size={12} /> GRUPLAR
          </h4>
          <div className="grid gap-2">
            {results.groups.map((g: any, i: number) => (
              <Link key={i} href={`/gruplar/${g.name}`} onClick={onClose} className="flex items-center justify-between p-3 rounded-2xl hover:bg-armoyu-primary/5 border border-transparent hover:border-armoyu-primary/20 transition-all group/res">
                <div className="flex items-center gap-3">
                  <img src={g.logo} className="w-10 h-10 rounded-2xl border border-armoyu-header-border" />
                  <div>
                    <p className="text-xs font-black text-armoyu-text uppercase">{g.name}</p>
                    <p className="text-[10px] font-bold text-armoyu-text-muted italic">{g.memberCount} ÜYE</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-armoyu-primary opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}

      {results.schools.length > 0 && (
        <div>
          <h4 className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <GraduationCap size={12} /> OKULLAR
          </h4>
          <div className="grid gap-2">
            {results.schools.map((s: any, i: number) => (
              <Link key={i} href={`/egitim/${s.name}`} onClick={onClose} className="flex items-center justify-between p-3 rounded-2xl hover:bg-armoyu-primary/5 border border-transparent hover:border-armoyu-primary/20 transition-all group/res">
                <div className="flex items-center gap-3">
                  <img src={s.logo} className="w-10 h-10 rounded-xl border border-armoyu-header-border" />
                  <div>
                    <p className="text-xs font-black text-armoyu-text uppercase">{s.name}</p>
                    <p className="text-[10px] font-bold text-armoyu-text-muted italic">{s.type}</p>
                  </div>
                </div>
                <ArrowRight size={14} className="text-armoyu-primary opacity-0 group-hover/res:opacity-100 group-hover/res:translate-x-1 transition-all" />
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
}

function ChevronDown({ size, className }: { size: number, className: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={className} strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
  );
}
