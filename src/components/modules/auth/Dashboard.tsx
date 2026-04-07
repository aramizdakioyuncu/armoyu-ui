import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { PostCard } from './PostCard';
import { Stories } from './Stories';
import { SidebarLeft } from './SidebarLeft';
import { CloudStorageModal } from '../profile/CloudStorageModal';
import Link from 'next/link';
import { userList, postList, groupList } from '../../../lib/constants/seedData';
import { Post, Group } from '@armoyu/core';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const { on } = useSocket();
  const searchParams = useSearchParams();
  const router = useRouter();

  const focusedPostId = searchParams.get('post');

  const [isCloudModalOpen, setIsCloudModalOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(user?.bio || '');
  const [selectedMedia, setSelectedMedia] = useState<{ url: string, type: 'image' | 'video' }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [visibleCount, setVisibleCount] = useState(10);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const { updateUser } = useAuth();
  const [posts, setPosts] = useState<Post[]>(postList);
  const [newPostsBuffer, setNewPostsBuffer] = useState<Post[]>([]);
  const [isAtTop, setIsAtTop] = useState(true);
  const [postContent, setPostContent] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleBioSave = () => {
    if (user) {
      updateUser({
        ...user,
        bio: tempBio
      } as any);
      setIsBioModalOpen(false);
    }
  };

  // Gündemdeki Etiketleri Dinamik Hesapla
  const trendingTags = useMemo(() => {
    const counts: Record<string, number> = {};
    posts.forEach(post => {
      post.hashtags?.forEach(tag => {
        counts[tag] = (counts[tag] || 0) + 1;
      });
    });
    return Object.entries(counts)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [posts]);

  // Filtremele ve Pagination Mantığı
  const allFilteredPosts = useMemo(() => {
    // 1. Post ID filtresi (En yüksek öncelik)
    if (focusedPostId) {
      return posts.filter(p => p.id === focusedPostId);
    }

    // 2. Tag filtresi
    if (selectedTag) {
      return posts.filter(post => post.hashtags?.includes(selectedTag.replace('#', '')));
    }

    return posts;
  }, [posts, focusedPostId, selectedTag]);

  const visiblePosts = allFilteredPosts.slice(0, visibleCount);

  // Auto-resize logic for textarea
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [postContent]);

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Socket Listener for New Posts
  useEffect(() => {
    console.log('[Dashboard] Setting up socket listener for "post" event');
    const offPost = on('post', (data: any) => {
      console.log('[Dashboard] New socket post received!', data);
      const newPost = Post.fromJSON(data);

      setPosts(currentPosts => {
        // If this is a post from the CURRENT USER, find the pending version and replace it
        if (newPost.author?.username === user?.username) {
          // Check if there is a pending post (we look for matches in content and media count as a heuristic)
          const pendingIdx = currentPosts.findIndex(p => p.isPending && p.content === newPost.content);
          if (pendingIdx !== -1) {
            const updated = [...currentPosts];
            updated[pendingIdx] = newPost; // Replace pending with confirmed
            return updated;
          }
        }

        // Standard duplicate check
        if (currentPosts.some(p => p.id === newPost.id)) return currentPosts;

        if (window.scrollY < 150) {
          return [newPost, ...currentPosts];
        } else {
          setNewPostsBuffer(prev => {
            if (prev.some(p => p.id === newPost.id)) return prev;
            return [newPost, ...prev];
          });
          return currentPosts;
        }
      });
    });

    const offLike = on('post_like', (data: any) => {
      const { postId, newCount } = data;
      setPosts(currentPosts =>
        currentPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              stats: { ...p.stats, likes: newCount }
            };
          }
          return p;
        })
      );
    });

    const offRepostCount = on('post_repost_count', (data: any) => {
      const { postId } = data;
      setPosts(currentPosts =>
        currentPosts.map(p => {
          if (p.id === postId) {
            return {
              ...p,
              stats: { ...p.stats, reposts: (p.stats.reposts || 0) + 1 }
            };
          }
          return p;
        })
      );
    });

    return () => {
      offPost();
      offLike();
      offRepostCount();
    };
  }, [on]);

  const mergeNewPosts = () => {
    setPosts(prev => [...newPostsBuffer, ...prev]);
    setNewPostsBuffer([]);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { emit } = useSocket();

  const handleCreatePost = () => {
    try {
      if ((!postContent.trim() && selectedMedia.length === 0) || isPosting || !user) {
        return;
      }

      // 1. Create optimistic local post
      const tempId = 'p-temp-' + Date.now();
      const optimisticPost = new Post({
        id: tempId,
        author: user,
        content: postContent,
        media: selectedMedia,
        createdAt: 'Gönderiliyor...',
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
        hashtags: postContent.match(/#\w+/g)?.map(t => t.replace('#', '')) || [],
        isPending: true
      });

      // 2. Clear inputs & Add to state immediately
      const savedContent = postContent;
      const savedMedia = [...selectedMedia];

      setPosts(prev => [optimisticPost, ...prev]);
      setPostContent('');
      setSelectedMedia([]);

      console.log('[Dashboard] Optimistic post added, inputs cleared.');

      // 3. Prepare wire data
      const wireData = {
        id: 'p-' + Date.now(), // Real ID candidate
        author: {
          id: user.id,
          username: user.username,
          displayName: user.displayName,
          avatar: user.avatar,
          role: user.role,
          verified: user.verified,
          level: user.level
        },
        content: savedContent,
        media: savedMedia,
        createdAt: 'Şimdi',
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 },
        hashtags: savedContent.match(/#\w+/g)?.map(t => t.replace('#', '')) || []
      };

      // 4. Emit to socket server
      emit('post', wireData);

    } catch (error) {
      console.error('[Dashboard] Error in handleCreatePost:', error);
    }
  };

  // Sonsuz Kaydırma Trigger (Intersection Observer)
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isLoadingMore && visibleCount < allFilteredPosts.length) {
          setIsLoadingMore(true);
          setTimeout(() => {
            setVisibleCount(prev => prev + 10);
            setIsLoadingMore(false);
          }, 800);
        }
      },
      { threshold: 0.1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => observer.disconnect();
  }, [isLoadingMore, visibleCount, allFilteredPosts.length]);

  return (
    <div className="w-full flex-1 flex gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">

      {/* Sol Yan Panel (Ranking & Economy & MC) */}
      <SidebarLeft />


      {/* Ana Akış (Feed) */}
      <div className="flex-1 flex flex-col pt-2">

        {/* Hikayeler (Stories) */}
        <Stories />

        {/* Yeni Gönderi Paylaşma Alanı */}
        <div className="glass-panel p-4 md:p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg shadow-sm mb-8">
          <div className="flex gap-4 items-start">
            <img
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu"}
              alt="Avatar"
              className="w-12 h-12 rounded-full border border-black/10 dark:border-white/10 shadow-sm mt-1"
            />
            <div className="flex-1 flex flex-col gap-3">
              <textarea
                ref={textareaRef}
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleCreatePost();
                  }
                }}
                placeholder="Neler yapıyorsun, düşüncelerini paylaş..."
                className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 rounded-2xl px-5 py-3 text-sm text-armoyu-text placeholder-armoyu-text-muted focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all font-medium resize-none min-h-[44px] max-h-[300px] overflow-y-auto"
              ></textarea>

              {/* Seçili Medya Önizlemesi */}
              {selectedMedia.length > 0 && (
                <div className="flex gap-2.5 overflow-x-auto pb-2 scrollbar-hide animate-in fade-in slide-in-from-left-4 duration-300">
                  {selectedMedia.map((media, idx) => (
                    <div key={idx} className="relative group shrink-0">
                      {media.type === 'video' ? (
                        <div className="w-24 h-24 rounded-2xl bg-black/20 flex items-center justify-center border border-white/10 overflow-hidden">
                          <video src={media.url} className="w-full h-full object-cover opacity-60" />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                          </div>
                        </div>
                      ) : (
                        <img
                          src={media.url}
                          alt="Preview"
                          className="w-24 h-24 rounded-2xl object-cover border border-white/10 shadow-md group-hover:scale-105 transition-transform"
                        />
                      )}
                      <button
                        onClick={() => setSelectedMedia(prev => prev.filter((_, i) => i !== idx))}
                        className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-between items-center mt-3 pl-16">
            <div className="flex gap-2">
              <button
                onClick={() => setIsCloudModalOpen(true)}
                className="flex items-center justify-center p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-colors shrink-0"
                title="Cloud Medya Galerisini Aç"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
              </button>
              <button className="p-2 text-armoyu-text-muted hover:text-blue-500 hover:bg-blue-500/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg></button>
              <button className="p-2 text-armoyu-text-muted hover:text-emerald-500 hover:bg-emerald-500/10 rounded-full transition-colors"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M8 14s1.5 2 4 2 4-2 4-2"></path><line x1="9" y1="9" x2="9.01" y2="9"></line><line x1="15" y1="9" x2="15.01" y2="9"></line></svg></button>
            </div>
            <button
              onClick={handleCreatePost}
              disabled={isPosting || (!postContent.trim() && selectedMedia.length === 0)}
              className="px-6 py-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 disabled:opacity-50 disabled:cursor-not-allowed text-white text-sm font-bold rounded-xl shadow-md transition-all active:scale-95"
            >
              {isPosting ? 'Gidiyor...' : 'Gönder'}
            </button>
          </div>
        </div>

        {/* Tekil Gönderi Filtre Banner'ı */}
        {focusedPostId && (
          <div className="flex items-center justify-between bg-blue-600/10 border border-blue-600/20 p-5 rounded-3xl mb-6 animate-in fade-in zoom-in duration-500">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /></svg>
              </div>
              <div>
                <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight">Tekil Gönderi Modu</h4>
                <p className="text-xs text-armoyu-text-muted font-bold">Şu an sadece bu bildirime ait paylaşımı görüyorsunuz.</p>
              </div>
            </div>
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2 bg-blue-600 text-white text-xs font-black rounded-xl hover:bg-blue-500 shadow-md transition-all active:scale-95 uppercase tracking-widest"
            >
              Tüm Akışa Dön
            </button>
          </div>
        )}

        {/* Yeni Paylaşım Banner'ı - Bottom Center Fixed */}
        {newPostsBuffer.length > 0 && (
          <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60] flex justify-center pointer-events-none">
            <button
              onClick={mergeNewPosts}
              className="pointer-events-auto flex items-center gap-3 px-8 py-3 bg-blue-600/95 backdrop-blur-xl text-white text-sm font-black rounded-full shadow-[0_15px_35px_rgba(37,99,235,0.45)] border border-white/30 hover:bg-blue-500 hover:scale-105 hover:-translate-y-1 transition-all animate-in slide-in-from-bottom-12 fade-in duration-500"
            >
              <div className="flex -space-x-2">
                {newPostsBuffer.slice(0, 3).map((p, i) => (
                  <img
                    key={i}
                    src={p.author?.avatar}
                    className="w-7 h-7 rounded-full border-2 border-white shadow-sm bg-armoyu-card-bg"
                  />
                ))}
              </div>
              <span className="whitespace-nowrap">{newPostsBuffer.length} Yeni Paylaşımı Görüntüle</span>
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6" /></svg>
            </button>
          </div>
        )}

        {/* Post Akışı Tablosu */}
        <div className="space-y-6">
          {selectedTag && (
            <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-armoyu-text-muted">Filtrelenen Etiket:</span>
                <span className="text-sm font-black text-blue-500">{selectedTag}</span>
              </div>
              <button
                onClick={() => { setSelectedTag(null); setVisibleCount(10); }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Filtreyi Temizle
              </button>
            </div>
          )}
          {visiblePosts.length > 0 ? (
            visiblePosts.map(post => (
              <PostCard
                key={post.id}
                {...post}
                onTagClick={(tag: string) => { setSelectedTag(tag); setVisibleCount(10); }}
              />
            ))
          ) : (
            <div className="text-center py-20 bg-black/5 dark:bg-white/5 rounded-3xl border border-dashed border-armoyu-card-border">
              <p className="text-armoyu-text-muted font-bold">Bu etikete ait henüz bir paylaşım yok.</p>
            </div>
          )}

          {/* Infinity Scroll Loader Area */}
          <div ref={loaderRef} className="py-10 flex flex-col items-center justify-center gap-3">
            {visibleCount < allFilteredPosts.length ? (
              <>
                <div className="w-8 h-8 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                <p className="text-xs font-bold text-armoyu-text-muted animate-pulse italic">Daha fazla içerik yükleniyor...</p>
              </>
            ) : (
              <div className="flex items-center gap-4 opacity-50">
                <div className="h-px w-20 bg-armoyu-card-border"></div>
                <span className="text-[10px] uppercase font-black tracking-widest text-armoyu-text-muted">Tüm akış görüntülendi</span>
                <div className="h-px w-20 bg-armoyu-card-border"></div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sağ Yan Panel (Sidebar Widget Area) */}
      <div className="hidden lg:flex w-[320px] flex-col gap-6">
        {/* Kullanıcı Profili Widget - Gelişmiş */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg group overflow-hidden relative">
          {/* Arkaplan Süsü */}
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl group-hover:bg-blue-500/10 transition-all duration-700" />

          <div className="relative z-10">
            <h3 className="font-extrabold text-armoyu-text text-xl tracking-tight mb-6">
              Hoş Geldin, <span className="text-blue-500">{user?.displayName?.split(' ')[0]}</span>
            </h3>

            {/* Görev Sistemi */}
            {(() => {
              const steps = [
                { id: 'avatar', label: 'Profil Fotoğrafı Ekle', completed: !!user?.avatar && !user.avatar.includes('seed=Armoyu'), icon: '🖼️' },
                { id: 'bio', label: 'Hakkında Yazısı Yaz', completed: !!user?.bio && user.bio.length > 5, icon: '✍️' },
                { id: 'verified', label: 'E-posta Onayla', completed: !!user?.verified, icon: '📧' },
                { id: 'groups', label: 'Bir Gruba Katıl', completed: (user?.groups?.length || 0) > 0, icon: '🛡️' }
              ];
              const totalPercentage = steps.reduce((acc, step) => acc + (step.completed ? 25 : 0), 0);
              const nextStep = steps.find(s => !s.completed);

              if (totalPercentage === 100) {
                return (
                  <div className="flex items-center gap-2 animate-in fade-in duration-700">
                    <CheckCircle2 size={16} className="text-emerald-500" />
                    <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">Tüm görevler tamamlandı</span>
                  </div>
                );
              }

              return (
                <div className="animate-in fade-in slide-in-from-top-4 duration-500">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest">Aktif Görevin</span>
                    <span className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-2 py-0.5 rounded">%{totalPercentage} Tamamlandı</span>
                  </div>

                  <button
                    onClick={() => {
                      if (nextStep?.id === 'bio') {
                        setIsBioModalOpen(true);
                      } else if (nextStep?.id === 'groups') {
                        router.push('/gruplar');
                      } else {
                        router.push('/ayarlar/profil');
                      }
                    }}
                    className="w-full flex items-center gap-4 p-4 bg-black/20 hover:bg-blue-600 border border-white/5 rounded-2xl group/task transition-all active:scale-95 shadow-xl text-left"
                  >
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center text-2xl group-hover/task:bg-white/20 transition-colors">
                      {nextStep?.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-sm font-black text-armoyu-text group-hover/task:text-white uppercase tracking-tight">{nextStep?.label}</h4>
                      <p className="text-[10px] font-bold text-armoyu-text-muted group-hover/task:text-white/80 uppercase tracking-widest mt-1 italic">Hemen Tamamla →</p>
                    </div>
                  </button>
                </div>
              );
            })()}
          </div>
        </div>

        {/* Gruplarım Widget (Dynamic) - Sadece grupları varsa göster */}
        {(user?.groups?.length || 0) > 0 && (
          <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg transition-all animate-in fade-in zoom-in duration-500">
            <div className="flex items-center justify-between mb-5">
              <h3 className="font-extrabold text-armoyu-text text-lg">Gruplarım</h3>
              <span className="bg-blue-500/10 text-blue-500 text-[10px] font-black px-2 py-0.5 rounded-md uppercase">{(user?.groups?.length || 0)} Grup</span>
            </div>

            <div className="space-y-4">
              {user?.groups?.map((group: any, idx: number) => (
                <Link
                  key={idx}
                  href={`/gruplar/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                  className="flex items-center gap-3 group cursor-pointer p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                >
                  <img src={group.logo} alt={group.name} className="w-10 h-10 rounded-xl object-cover border border-black/5 shadow-sm group-hover:scale-105 transition-transform" />
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-bold text-armoyu-text truncate group-hover:text-blue-500 transition-colors uppercase tracking-tight">{group.name}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      <span className="text-[10px] text-armoyu-text-muted truncate opacity-80 uppercase font-bold tracking-widest">{group.shortName} • AKTİF</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Gündemdekiler Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
          <h3 className="font-extrabold text-armoyu-text mb-5 text-lg">Gündemdeki Etiketler</h3>
          <div className="space-y-4">
            {trendingTags.map((tagObj: { name: string, count: number }, idx: number) => (
              <div
                key={idx}
                className={`flex justify-between items-center cursor-pointer group p-2 rounded-xl transition-all ${selectedTag === tagObj.name ? 'bg-blue-500/10' : 'hover:bg-black/5 dark:hover:bg-white/5'}`}
                onClick={() => { setSelectedTag(tagObj.name === selectedTag ? null : tagObj.name); setVisibleCount(10); }}
              >
                <div>
                  <span className={`block text-sm font-bold transition-colors ${selectedTag === tagObj.name ? 'text-blue-500' : 'text-armoyu-text-muted group-hover:text-blue-500'}`}>{tagObj.name}</span>
                  <span className="block text-[11px] text-armoyu-text-muted opacity-70 mt-0.5">{tagObj.count} Gönderi</span>
                </div>
                <button className={`text-xs border rounded-full w-7 h-7 flex items-center justify-center transition-colors ${selectedTag === tagObj.name ? 'bg-blue-500 border-blue-500 text-white' : 'bg-black/5 dark:bg-white/5 border-black/5 dark:border-transparent text-armoyu-text-muted group-hover:text-armoyu-text'}`}>
                  {selectedTag === tagObj.name ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                  )}
                </button>
              </div>
            ))}

            <button className="w-full mt-2 pt-4 border-t border-armoyu-card-border text-blue-500 hover:text-blue-600 dark:hover:text-blue-400 text-sm font-bold flex justify-center transition-colors">
              Tümünü Gör
            </button>
          </div>
        </div>


        {/* Popüler Gruplar Widget */}
        <div className="glass-panel p-6 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
          <div className="flex items-center justify-between mb-5">
            <h3 className="font-extrabold text-armoyu-text text-lg">Popüler Gruplar</h3>
            <Link href="/gruplar" className="text-xs font-bold text-blue-500 hover:underline">Tümü</Link>
          </div>

          <div className="space-y-4">
            {groupList.slice(0, 4).map((group, idx) => (
              <Link
                key={idx}
                href={`/gruplar/${group.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3 group cursor-pointer p-1 rounded-xl hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
              >
                <div className="relative">
                  <img src={group.logo} alt={group.name} className="w-10 h-10 rounded-xl object-cover border border-black/5 shadow-sm" />
                  {group.recruitment === 'Açık' && (
                    <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-armoyu-card-bg shadow-sm" title="Alımlar Açık" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="text-sm font-bold text-armoyu-text truncate group-hover:text-blue-500 transition-colors uppercase tracking-tight">{group.name}</h4>
                  <p className="text-[10px] text-armoyu-text-muted truncate opacity-80">{group.category} • {group.recruitment === 'Açık' ? 'Katıl' : 'Kapalı'}</p>
                </div>
              </Link>
            ))}

            <button className="w-full py-3 bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-blue-500/30 hover:bg-blue-500/5 text-armoyu-text text-xs font-bold rounded-xl transition-all active:scale-[0.98]">
              Yeni Grup Oluştur
            </button>
          </div>
        </div>

      </div>

      {/* Cloud Manager Global Linker */}
      <CloudStorageModal
        isOpen={isCloudModalOpen}
        onClose={() => setIsCloudModalOpen(false)}
        onSelectMedia={(url, type) => {
          setSelectedMedia(prev => [...prev, { url, type }]);
          setIsCloudModalOpen(false);
        }}
      />

      {/* Bio Güncelleme Modalı */}
      {isBioModalOpen && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsBioModalOpen(false)} />
          <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 shadow-2xl animate-in zoom-in-95 duration-300 overflow-hidden">
            <div className="p-8 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500 text-2xl">
                  ✍️
                </div>
                <div>
                  <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic">Hakkında Yazısı Yaz</h3>
                  <p className="text-xs font-medium text-armoyu-text-muted">Profilinde kendini ifade et.</p>
                </div>
              </div>
              <button onClick={() => setIsBioModalOpen(false)} className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 rounded-xl transition-all">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
              </button>
            </div>

            <div className="p-8 space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest ml-4">SENİ TANIYALIM</label>
                <textarea
                  className="w-full bg-black/10 border border-armoyu-card-border rounded-3xl px-6 py-5 text-sm font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all min-h-[150px] resize-none"
                  placeholder="Örneğin: Merhaba! Ben bir ARMOYU üyesiyim ve oyun geliştirmeyi seviyorum..."
                  value={tempBio}
                  onChange={(e) => setTempBio(e.target.value)}
                  autoFocus
                />
              </div>

              <button
                onClick={handleBioSave}
                className="w-full py-5 bg-blue-600 hover:bg-blue-500 text-white font-black rounded-[20px] text-xs uppercase tracking-widest shadow-xl shadow-blue-500/20 active:scale-95 transition-all flex items-center justify-center gap-2 italic"
              >
                BİYOGRAFİMİ KAYDET
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

