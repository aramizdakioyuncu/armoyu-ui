'use client';

import * as React from 'react';
import { useState, useEffect, use } from 'react';
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
import { Search, X, Users, MessageSquare, Bell, User, Flag, ShieldAlert, ShieldCheck, Crown, LogOut, Moon, Sun, ArrowRight, Menu, ArrowLeft, GraduationCap } from 'lucide-react';

interface HeaderProps {
  items?: NavItem[];
}

export function Header({ items }: HeaderProps) {
  const { user, session, login, logout, isLoading, isLoginModalOpen, setIsLoginModalOpen } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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

  const defaultNavItems: NavItem[] = [
    { name: 'Gruplar', href: navigation.groupPrefix },
    { name: 'Okullar', href: navigation.educationPrefix },
    { name: 'Forum', href: navigation.forumPrefix },
    { name: 'Haberler', href: navigation.newsPrefix },
    { name: 'Çekilişler', href: navigation.giveawayPrefix },
    { name: 'Anketler', href: navigation.pollPrefix },
    { name: 'Modlar', href: '/modlar' },
    { name: 'Galeriler', href: navigation.galleryPrefix },
    {
      name: 'Ekibimiz',
      href: '#',
      submenu: [
        { name: 'Çalışma Ekibi', href: '/ekibimiz/ekip' },
        { name: 'İnsan Kaynakları', href: '/ekibimiz/ik' },
        { name: 'Topluluk Kuralları', href: '/kurallar' },
        { name: 'Hakkımızda', href: '/ekibimiz/hakkimizda' },
        { name: 'Gizlilik Politikası', href: '/ekibimiz/gizlilik' }
      ]
    },
    { name: 'Mağaza', href: navigation.storePrefix },
  ];

  const activeNavItems = items || defaultNavItems;

  // Navigasyon gerçekleştiğinde تمام menüleri kapat
  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSearchOpen(false);
    setIsUserMenuOpen(false);
    setIsNotificationOpen(false);
    setSearchQuery('');
  }, [pathname]);

  // Canlı Arama Mantığı
  useEffect(() => {
    if (searchQuery.trim().length < 2) {
      setSearchResults({ users: [], groups: [], schools: [] });
      return;
    }

    const timer = setTimeout(async () => {
      try {
        // Core kütüphanesi üzerinden gerçek arama yap
        const response = await api.search.globalSearch(searchQuery);
        const results = (response.icerik || []).map((r: any) => SearchResult.fromAPI(r));
        
        const users = results.filter(r => r.isPlayer()).map(r => ({
          username: r.username,
          displayName: r.title,
          avatar: r.avatar
        }));

        const groups = results.filter(r => r.isTeam()).map(r => ({
          id: r.id,
          name: r.title,
          logo: r.avatar,
          memberCount: 0 
        }));

        // Okullar için ayrı bir tip gelirse buraya eklenebilir
        const schools = results.filter(r => r.type === 'SCHOOL' as any).map(r => ({
          id: r.id,
          name: r.title,
          logo: r.avatar,
          memberCount: 0,
          slug: r.username || String(r.id)
        }));

        setSearchResults({ users, groups, schools });
      } catch (error) {
        console.error("[Header] Live Search Error:", error);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, api]);

  const unreadCount = session?.notifications?.filter((n: any) => !n.isRead).length || 0;

  const markAllAsRead = () => {
    if (session?.notifications) {
      session.notifications.forEach((n: any) => n.isRead = true);
      setIsNotificationOpen(false);
      setTimeout(() => setIsNotificationOpen(true), 10);
    }
  };

  const closeSearch = () => {
    setSearchQuery('');
    setIsSearchOpen(false);
  };

  const goToMyProfile = () => {
    if (user?.username) {
      router.push(`${navigation.profilePrefix}/${user.username}`);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const handleNotificationClick = (notif: any) => {
    notif.isRead = true;
    if (notif.isClickable && notif.link) {
      router.push(notif.link);
      setIsNotificationOpen(false);
    } else {
      setIsNotificationOpen(false);
      setTimeout(() => setIsNotificationOpen(true), 10);
    }
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b border-armoyu-header-border bg-armoyu-header-bg transition-all duration-500 backdrop-blur-md">
        <div className="flex items-center justify-between px-4 md:px-8 h-16 w-full max-w-[100vw]">

          {/* Mobile Hamburger Button */}
          <button
            className="md:hidden flex items-center justify-center w-10 h-10 text-armoyu-text hover:text-blue-500 transition-colors border border-transparent hover:border-armoyu-header-border rounded-lg bg-transparent hover:bg-black/5 dark:hover:bg-white/5"
            onClick={() => setIsMobileMenuOpen(true)}
            title="Menü"
          >
            <Menu size={24} />
          </button>

          {/* Logo */}
          <div className="flex-shrink-0 flex items-center pr-4 md:pr-8 md:border-r border-armoyu-header-border ml-2 md:ml-0">
            <Link href="/" className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-indigo-600 dark:from-white dark:to-gray-400 hover:opacity-80 transition-opacity uppercase italic">
              ARMOYU
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 xl:gap-2 mx-4">
            {activeNavItems.map((item) => (
              <div key={item.name} className="relative group">
                <Link
                  href={item.href}
                  className="px-3 xl:px-4 py-2 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all flex items-center gap-1.5 whitespace-nowrap"
                >
                  {item.name}
                  {item.submenu && (
                    <Menu size={14} className="opacity-50 group-hover:rotate-90 transition-transform" />
                  )}
                </Link>

                {/* Submenu Dropdown */}
                {item.submenu && (
                  <div className="absolute top-full left-0 pt-3 opacity-0 translate-y-4 pointer-events-none group-hover:opacity-100 group-hover:translate-y-0 group-hover:pointer-events-auto transition-all duration-300 z-50">
                    <div className="bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[28px] shadow-2xl p-2 w-56 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                      {item.submenu.map((sub) => (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className="flex items-center gap-2.5 px-4 py-3 rounded-xl text-xs font-black uppercase tracking-widest text-armoyu-text-muted hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-500/5 transition-all decoration-0 group/sub"
                        >
                          <div className="w-1.5 h-1.5 rounded-full bg-blue-500/40 group-hover/sub:bg-blue-500 transition-colors" />
                          {sub.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search Bar (Desktop) - Aligned to Right */}
          <div className="hidden lg:flex items-center flex-1 max-w-[280px] ml-auto relative">
            <div className="relative w-full group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Search size={16} className="text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                className="block w-full pl-11 pr-4 py-2.5 bg-black/5 dark:bg-white/5 border border-transparent focus:border-blue-500/50 rounded-2xl text-sm font-bold text-armoyu-text placeholder:text-armoyu-text-muted/50 focus:outline-none focus:ring-4 focus:ring-blue-500/10 transition-all"
                placeholder="Ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsSearchOpen(true)}
              />

              {/* Desktop Search Results */}
              {isSearchOpen && (searchQuery.length > 0) && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setIsSearchOpen(false)} />
                  <div className="absolute top-full right-0 mt-3 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[28px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200 w-[350px]">
                    {searchResults.users.length === 0 && searchResults.groups.length === 0 && searchResults.schools.length === 0 ? (
                      <div className="p-8 text-center">
                        <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full flex items-center justify-center mx-auto mb-3">
                          <Search size={20} className="text-armoyu-text-muted opacity-50" />
                        </div>
                        <p className="text-xs font-black text-armoyu-text uppercase tracking-widest">Sonuç Bulunamadı</p>
                        <p className="text-[10px] text-armoyu-text-muted mt-1">Farklı bir anahtar kelime dene.</p>
                      </div>
                    ) : (
                      <div className="max-h-[70vh] overflow-y-auto p-2 space-y-4 py-4">
                        {searchResults.users.length > 0 && (
                          <div>
                            <h5 className="px-4 mb-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                              <User size={12} /> Oyuncular
                            </h5>
                            <div className="space-y-1">
                              {searchResults.users.map((u) => (
                                <Link
                                  key={u.username}
                                  href={`${navigation.profilePrefix}/${u.username}`}
                                  onClick={closeSearch}
                                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-500/10 transition-colors group"
                                >
                                  <img src={u.avatar || undefined} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all" alt={u.displayName} />
                                  <div>
                                    <div className="text-sm font-black text-armoyu-text group-hover:text-blue-500 transition-colors">{u.displayName}</div>
                                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">@{u.username}</div>
                                  </div>
                                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {searchResults.groups.length > 0 && (
                          <div>
                            <h5 className="px-4 mb-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                              <Users size={12} /> Gruplar
                            </h5>
                            <div className="space-y-1">
                              {searchResults.groups.map((g) => (
                                <Link
                                  key={g.id}
                                  href={`${navigation.groupPrefix}/${g.id}`}
                                  onClick={closeSearch}
                                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-emerald-500/10 transition-colors group"
                                >
                                  <img src={g.logo || undefined} className="w-10 h-10 rounded-xl object-cover ring-2 ring-transparent group-hover:ring-emerald-500/30 transition-all" alt={g.name} />
                                  <div>
                                    <div className="text-sm font-black text-armoyu-text group-hover:text-emerald-500 transition-colors">{g.name}</div>
                                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{g.memberCount || 0} Üye</div>
                                  </div>
                                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-emerald-500" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}

                        {searchResults.schools.length > 0 && (
                          <div>
                            <h5 className="px-4 mb-2 text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] flex items-center gap-2">
                              <GraduationCap size={12} /> Okullar
                            </h5>
                            <div className="space-y-1">
                              {searchResults.schools.map((s) => (
                                <Link
                                  key={s.id}
                                  href={`${navigation.educationPrefix}/${s.slug}`}
                                  onClick={closeSearch}
                                  className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-500/10 transition-colors group"
                                >
                                  <img src={s.logo || undefined} className="w-10 h-10 rounded-xl object-contain bg-white p-1 ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all" alt={s.name} />
                                  <div>
                                    <div className="text-sm font-black text-armoyu-text group-hover:text-blue-500 transition-colors">{s.name}</div>
                                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{s.memberCount || 0} Üye</div>
                                  </div>
                                  <ArrowRight size={14} className="ml-auto opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all text-blue-500" />
                                </Link>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                    <div className="p-3 bg-black/5 dark:bg-white/5 border-t border-gray-200 dark:border-white/10 text-center">
                      <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">Arama modunu kapatmak için dışarı tıkla</span>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {/* User Actions */}
          <div className="flex-shrink-0 pl-4 md:pl-8 border-l border-armoyu-header-border flex items-center gap-2 md:gap-4 h-full ml-auto md:ml-0">

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
                  className={`relative p-2 rounded-xl transition-all ${isNotificationOpen ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                  title="Bildirimler"
                >
                  <Bell size={22} />
                  {unreadCount > 0 && (
                    <span className="absolute -top-0.5 -right-0.5 w-5 h-5 bg-red-500 text-white text-[10px] font-black flex items-center justify-center rounded-full border-2 border-armoyu-header-bg animate-bounce">
                      {unreadCount}
                    </span>
                  )}
                </button>

                {/* Notifications Popover */}
                {isNotificationOpen && (
                  <>
                    <div className="fixed inset-0 z-40" onClick={() => setIsNotificationOpen(false)} />
                    <div className="absolute right-0 mt-3 w-80 md:w-96 bg-white/95 dark:bg-[#12121a]/95 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-[32px] shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
                      <div className="p-5 border-b border-gray-200 dark:border-white/10 flex justify-between items-center bg-gray-50/50 dark:bg-white/5">
                        <h4 className="text-[11px] font-black text-armoyu-text uppercase tracking-[0.2em]">BİLDİRİMLER</h4>
                        <button
                          onClick={markAllAsRead}
                          className="text-[10px] font-bold text-blue-500 hover:text-blue-400 transition-colors uppercase tracking-widest"
                        >
                          Hepsini Oku
                        </button>
                      </div>

                      <div className="max-h-[450px] overflow-y-auto p-1.5">
                        {(session?.notifications || []).length > 0 ? (
                          (session?.notifications || []).map((notif: any) => (
                            <div
                              key={notif.id}
                              onClick={() => handleNotificationClick(notif)}
                              className={`p-4 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group flex gap-4 ${!notif.isRead ? 'bg-blue-500/5' : ''}`}
                            >
                               <div className="relative shrink-0">
                                 <img src={notif.sender?.avatar || undefined} className="w-11 h-11 rounded-2xl object-cover ring-2 ring-black/5 dark:ring-white/5 shadow-sm" alt="Sender" />
                                 <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-lg bg-blue-500 border-2 border-white dark:border-[#12121a] flex items-center justify-center text-white shadow-sm">
                                  {(notif.type === 'POST_LIKE') && <Flag size={10} fill="currentColor" />}
                                  {(notif.type === 'POST_COMMENT') && <MessageSquare size={10} fill="currentColor" />}
                                  {(notif.type === 'GROUP_INVITE') && <Users size={10} fill="currentColor" />}
                                  {(notif.category === 'SYSTEM') && <ShieldAlert size={10} fill="currentColor" />}
                                </div>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start mb-0.5">
                                  <p className="text-sm font-black text-armoyu-text truncate">{notif.title}</p>
                                  <span className="text-[9px] font-bold text-armoyu-text-muted uppercase tracking-tighter">{notif.createdAt}</span>
                                </div>
                                <p className="text-[11px] font-medium text-armoyu-text-muted leading-relaxed line-clamp-2">{notif.message}</p>
                              </div>
                              {!notif.isRead && <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-2 shadow-[0_0_10px_rgba(59,130,246,0.6)]" />}
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
                  onClick={() => setIsUserMenuOpen(true)}
                  className="flex items-center gap-3 p-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors border border-transparent hover:border-armoyu-header-border focus:outline-none"
                  title="Profilim"
                >
                  <img
                    src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"}
                    alt="Avatar"
                    className="w-8 h-8 rounded-full border border-blue-500/50 shadow-[0_0_10px_rgba(59,130,246,0.5)] object-cover bg-white/5"
                  />
                  <span className="text-sm font-bold text-armoyu-text hidden md:inline-block pr-2">
                    {user.displayName.split(' ')[0]}
                  </span>
                </button>
              ) : (
                <button
                  onClick={() => setIsLoginModalOpen(true)}
                  className="flex items-center justify-center w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text-muted hover:text-blue-600 dark:hover:text-blue-400 transition-all border border-armoyu-header-border shadow-sm"
                  title="Giriş Yap"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </button>
              )
            )}

            {isLoading && (
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 animate-pulse border border-armoyu-header-border" />
            )}
          </div>

        </div>
      </header>

      {/* Mobile Search Overlay */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] bg-white dark:bg-[#0a0a0b] flex flex-col lg:hidden animate-in fade-in slide-in-from-top duration-300">
          <div className="flex items-center gap-4 p-4 border-b border-gray-200 dark:border-white/10">
            <button onClick={closeSearch} className="p-2 text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors">
              <ArrowLeft size={24} />
            </button>
            <input
              autoFocus
              type="text"
              className="flex-1 bg-transparent border-none text-lg font-bold text-armoyu-text focus:outline-none placeholder:text-armoyu-text-muted/30"
              placeholder="Kimi aramıştın?"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery.length > 0 && (
              <button onClick={() => setSearchQuery('')} className="p-2 text-armoyu-text-muted hover:text-red-500 transition-colors">
                <X size={20} />
              </button>
            )}
          </div>

          <div className="flex-1 overflow-y-auto p-4 hide-scrollbar">
            {searchQuery.length > 0 ? (
              searchResults.users.length === 0 && searchResults.groups.length === 0 && searchResults.schools.length === 0 ? (
                <div className="py-20 text-center">
                  <Search size={48} className="mx-auto text-armoyu-text-muted/10 mb-4" />
                  <p className="text-sm font-black text-armoyu-text uppercase tracking-widest">Sonuç Bulunamadı</p>
                </div>
              ) : (
                <div className="space-y-8">
                  {searchResults.users.length > 0 && (
                    <div>
                      <h5 className="mb-4 text-[11px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
                        <User size={14} /> Oyuncular ({searchResults.users.length})
                      </h5>
                      <div className="space-y-2">
                        {searchResults.users.map((u) => (
                          <Link
                            key={u.username}
                            href={`${navigation.profilePrefix}/${u.username}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 p-3 rounded-[24px] bg-black/5 dark:bg-white/5 border border-transparent active:scale-95 transition-all"
                          >
                            <img src={u.avatar || undefined} className="w-12 h-12 rounded-2xl object-cover shadow-lg" alt={u.displayName} />
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-armoyu-text truncate">{u.displayName}</div>
                              <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">@{u.username}</div>
                            </div>
                            <ArrowRight size={18} className="text-blue-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.groups.length > 0 && (
                    <div>
                      <h5 className="mb-4 text-[11px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
                        <Users size={14} /> Gruplar ({searchResults.groups.length})
                      </h5>
                      <div className="space-y-2">
                        {searchResults.groups.map((g) => (
                          <Link
                            key={g.id}
                            href={`${navigation.groupPrefix}/${g.id}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 p-3 rounded-[24px] bg-black/5 dark:bg-white/5 border border-transparent active:scale-95 transition-all"
                          >
                            <img src={g.logo || undefined} className="w-12 h-12 rounded-2xl object-cover shadow-lg" alt={g.name} />
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-armoyu-text truncate">{g.name}</div>
                              <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{g.memberCount || 0} Üye</div>
                            </div>
                            <ArrowRight size={18} className="text-emerald-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {searchResults.schools.length > 0 && (
                    <div>
                      <h5 className="mb-4 text-[11px] font-black text-armoyu-text-muted uppercase tracking-[0.3em] flex items-center gap-2">
                        <GraduationCap size={14} /> Okullar ({searchResults.schools.length})
                      </h5>
                      <div className="space-y-2">
                        {searchResults.schools.map((s) => (
                          <Link
                            key={s.id}
                            href={`${navigation.educationPrefix}/${s.slug}`}
                            onClick={closeSearch}
                            className="flex items-center gap-4 p-3 rounded-[32px] bg-black/5 dark:bg-white/5 border border-transparent active:scale-95 transition-all"
                          >
                            <img src={s.logo || undefined} className="w-14 h-14 rounded-2xl object-contain bg-white p-2 shadow-lg" alt={s.name} />
                            <div className="flex-1 min-w-0">
                              <div className="font-black text-armoyu-text truncate italic">{s.name}</div>
                              <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">{s.memberCount || 0} Üye</div>
                            </div>
                            <ArrowRight size={20} className="text-blue-500" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )
            ) : (
              <div className="py-12 text-center text-armoyu-text-muted">
                <p className="text-xs font-bold uppercase tracking-widest">Aramak için yazmaya başla...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Mobile Menu Drawer Overlay */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 flex animate-in fade-in duration-200">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsMobileMenuOpen(false)} />
          <div className="relative w-[280px] max-w-[80vw] h-full glass-panel bg-armoyu-drawer-bg border-r border-armoyu-drawer-border shadow-2xl flex flex-col pt-6 pb-8 px-6 animate-in slide-in-from-left duration-300">
            <div className="flex items-center justify-between mb-8 border-b border-armoyu-drawer-border pb-4">
              <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-xl font-extrabold tracking-wider text-armoyu-text hover:text-blue-500 transition-colors">
                ARMOYU
              </Link>
              <button onClick={() => setIsMobileMenuOpen(false)} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-2 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 border border-armoyu-drawer-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto hide-scrollbar space-y-1 pr-2">
              {user && (
                <button
                  onClick={goToMyProfile}
                  className="w-full flex items-center gap-3 py-3.5 px-4 rounded-xl text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 transition-all text-sm font-black border border-blue-500/10 mb-2 group/mobprof"
                >
                  <User size={20} className="group-hover/mobprof:scale-110 transition-transform" />
                  Profilim
                  <ArrowRight size={16} className="ml-auto opacity-40 group-hover/mobprof:opacity-100 group-hover/mobprof:translate-x-1 transition-all" />
                </button>
              )}
              {activeNavItems.map((item, idx) => (
                <div key={idx}>
                  {item.submenu ? (
                    <div className="space-y-1">
                      <div className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-bold text-armoyu-text-muted">
                        <span>{item.name}</span>
                      </div>
                      <div className="pl-3 space-y-1 border-l border-black/5 dark:border-white/10 ml-4">
                        {item.submenu.map((sub, sidx) => (
                          <Link
                            key={sidx}
                            href={sub.href}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all block"
                          >
                            {sub.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block py-3.5 px-4 rounded-xl text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-all text-sm font-bold border border-transparent"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            <div className="mt-6 pt-6 border-t border-armoyu-drawer-border space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-bold text-sm"
              >
                <span>Tema Değiştir</span>
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </button>

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
                  className="w-full py-4 px-4 rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 text-white transition-all text-md font-bold shadow-[0_0_15px_rgba(37,99,235,0.4)]"
                >
                  Giriş Yap / Kayıt Ol
                </button>
              )}
            </div>
          </div>
        </div>
      )}

      {/* User Actions Drawer Overlay */}
      {isUserMenuOpen && user && (
        <div className="fixed inset-0 z-[60] flex justify-end animate-in fade-in duration-200">
          <div
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
            onClick={() => setIsUserMenuOpen(false)}
          />
          <div className="relative w-[340px] max-w-[85vw] h-full glass-panel bg-armoyu-drawer-bg border-l border-armoyu-drawer-border shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">

            {/* Profil Üst Bilgi */}
            <div className="p-6 border-b border-armoyu-drawer-border flex justify-between items-start relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/20 blur-[50px] -z-10 rounded-full" />

              <div className="flex gap-4 items-center">
                <img
                  src={user.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"}
                  alt="Avatar"
                  className="w-14 h-14 rounded-full border-2 border-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.4)] object-cover bg-white/5"
                />
                <div>
                  <h3 className="text-armoyu-text font-bold text-lg leading-tight truncate max-w-[150px]">{user.displayName}</h3>
                  <span className="text-blue-600 dark:text-blue-400 text-sm font-medium">@{user.username}</span>
                </div>
              </div>
              <button onClick={() => setIsUserMenuOpen(false)} className="text-armoyu-text-muted hover:text-armoyu-text transition-colors bg-black/5 dark:bg-white/5 p-1.5 rounded-lg hover:bg-black/10 dark:hover:bg-white/10 border border-armoyu-drawer-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            {/* Menü İkonları / Linkleri */}
            <nav className="flex-1 overflow-y-auto p-4 space-y-1.5 mt-2 hide-scrollbar">
              <button 
                onClick={goToMyProfile} 
                className="w-full flex items-center gap-3 p-3 text-blue-600 dark:text-blue-400 bg-blue-500/5 hover:bg-blue-500/10 rounded-xl transition-all font-black border border-blue-500/20 text-left focus:outline-none group/prof mb-1"
              >
                <User size={18} className="group-hover/prof:scale-110 transition-transform" />
                Profilime Git
                <ArrowRight size={14} className="ml-auto opacity-40 group-hover/prof:opacity-100 group-hover/prof:translate-x-1 transition-all" />
              </button>

              {/* Management Panel Link (Conditional) */}
              {['admin', 'member_mgmt', 'discipline', 'event_mgmt'].includes(user.role?.id || '') && (
                <Link
                  href={navigation.managementPrefix}
                  onClick={() => setIsUserMenuOpen(false)}
                  className="flex items-center gap-3 p-3 bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 border border-blue-500/30 rounded-xl transition-all font-black shadow-[0_0_15px_rgba(59,130,246,0.15)] mb-2 group animate-in slide-in-from-right-4 duration-500"
                >
                  <ShieldCheck size={18} className="group-hover:scale-110 transition-transform" />
                  Yönetim Paneli
                  <Crown size={14} className="ml-auto opacity-50" />
                </Link>
              )}

              <Link href="/yazilarim" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>
                Yazılarım
              </Link>

              <Link
                href="/yazilarim"

                onClick={() => setIsUserMenuOpen(false)}

                className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
                Yorumlarım
              </Link>

              <Link
                href="/anketler"
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="12" y2="16"></line><line x1="16" y1="10" x2="16" y2="16"></line></svg>
                Anketler
              </Link>

              <div className="space-y-1">
                <button
                  onClick={() => setIsGroupsSubmenuOpen(!isGroupsSubmenuOpen)}
                  className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border text-left focus:outline-none ${isGroupsSubmenuOpen ? 'text-blue-500 bg-blue-500/5' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  Gruplarım
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className={`ml-auto transition-transform duration-300 ${isGroupsSubmenuOpen ? 'rotate-180' : ''}`}><polyline points="6 9 12 15 18 9"></polyline></svg>
                </button>

                {isGroupsSubmenuOpen && (
                  <div className="pl-4 space-y-1 mt-1 animate-in slide-in-from-top-2 duration-200">
                    {userGroups.length > 0 ? (
                      userGroups.map((group: any, gidx: number) => (
                        <Link
                          key={gidx}
                          href={`${navigation.groupPrefix}/${group.group_ID || group.id || group.name.toLowerCase().replace(/\s+/g, '-')}`}
                          onClick={() => setIsUserMenuOpen(false)}
                          className="flex items-center gap-3 p-2.5 rounded-xl text-xs font-bold text-armoyu-text-muted hover:text-blue-500 hover:bg-black/5 dark:hover:bg-white/5 transition-all"
                        >
                          <img src={group.logo_URL || group.logo || undefined} className="w-7 h-7 rounded-lg bg-white dark:bg-zinc-800 border border-armoyu-drawer-border object-cover" />
                          <span className="truncate">{group.name || group.group_name}</span>
                        </Link>
                      ))
                    ) : (
                      <div className="py-3 px-4 text-center bg-black/5 dark:bg-white/5 rounded-xl border border-dashed border-armoyu-drawer-border mx-2">
                        <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60 block leading-tight">Henüz bir gruba<br />dahil değilsin</span>
                      </div>
                    )}
                    <Link
                      href="/gruplar"
                      onClick={() => setIsUserMenuOpen(false)}
                      className="flex items-center justify-center p-2.5 rounded-xl text-[10px] font-black text-blue-500/60 hover:text-blue-500 hover:bg-blue-500/5 transition-all uppercase tracking-widest"
                    >
                      Tüm Grupları Gör
                    </Link>
                  </div>
                )}
              </div>

              <Link
                href={navigation.giveawayPrefix}
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="20 12 20 22 4 22 4 12"></polyline><rect x="2" y="7" width="20" height="5"></rect><line x1="12" y1="22" x2="12" y2="7"></line><path d="M12 7H7.5a2.5 2.5 0 0 1 0-5C11 2 12 7 12 7z"></path><path d="M12 7h4.5a2.5 2.5 0 0 0 0-5C13 2 12 7 12 7z"></path></svg>
                Çekiliş
              </Link>

              <Link
                href={navigation.educationPrefix}
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-all font-medium border border-transparent hover:border-armoyu-drawer-border"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path></svg>
                Eğitim
              </Link>

              <Link
                href={navigation.supportPrefix}
                onClick={() => setIsUserMenuOpen(false)}
                className="flex items-center gap-3 p-3 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/10 rounded-xl transition-all font-bold border border-transparent hover:border-emerald-500/20 mt-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
                Destek Bildirimleri
              </Link>

            </nav>

            {/* Tema Butonu & Çıkış */}
            <div className="p-4 border-t border-armoyu-drawer-border space-y-3">
              <button
                onClick={toggleTheme}
                className="w-full py-3 px-4 rounded-xl bg-black/5 dark:bg-white/5 border border-armoyu-drawer-border text-armoyu-text-muted hover:text-armoyu-text flex items-center justify-between transition-colors font-bold text-sm"
              >
                <span>Koyu / Açık Tema Değiştir</span>
                {theme === 'dark' ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                )}
              </button>

              <button
                onClick={() => {
                  logout();
                  setIsUserMenuOpen(false);
                }}
                className="flex items-center gap-3 w-full p-4 text-white hover:text-white bg-red-600 hover:bg-red-500 hover:shadow-[0_0_15px_rgba(239,68,68,0.5)] border border-transparent rounded-xl transition-all font-bold"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
                Sistemden Çıkış Yap
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Misafirler için Login Popup */}
      <LoginModal isOpen={!user && isLoginModalOpen} onClose={() => setIsLoginModalOpen(false)} />
    </>
  );
}
