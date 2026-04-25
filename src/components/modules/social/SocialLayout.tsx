'use client';

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { 
    PostCard, 
    Stories, 
    SocialSidebar, 
    NewMembersWidget,
    CloudModal,
    SocialFeed,
    PostComposer,
    type SocialFeedRef
} from '../../../index';
import Link from 'next/link';
import { userList, groupList } from '../../../lib/constants/seedData';
import { Post } from '../../../models/social/feed/Post';
import { Group } from '../../../models/community/Group';
import { CheckCircle2, ArrowLeft } from 'lucide-react';

export function SocialLayout() {
  const { user } = useAuth();
  const { on } = useSocket();
  const searchParams = useSearchParams();
  const router = useRouter();

  const focusedPostId = searchParams.get('post');

  const [isCloudOpen, setIsCloudOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [tempBio, setTempBio] = useState(user?.bio || '');
  const [selectedMedia, setSelectedMedia] = useState<{ url: string, type: 'image' | 'video' | 'audio' }[]>([]);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const { updateUser } = useAuth();
  const [isAtTop, setIsAtTop] = useState(true);
  const [isPosting, setIsPosting] = useState(false);
  const feedRef = useRef<SocialFeedRef>(null);

  const handleBioSave = () => {
    if (user) {
      updateUser({
        ...user,
        bio: tempBio
      } as any);
      setIsBioModalOpen(false);
    }
  };

  // Gündemdeki Etiketleri Dinamik Hesapla (Burada trend verisi API'den gelmeli ama şimdilik mock)
  const trendingTags = [
    { name: 'ARMOYU', count: 42 },
    { name: 'Gaming', count: 28 },
    { name: 'Web3', count: 14 },
    { name: 'Haber', count: 7 }
  ];

  useEffect(() => {
    const handleScroll = () => {
      setIsAtTop(window.scrollY < 150);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Socket Listeners Moved to SocialFeed (Smart Component)
  const mergeNewPosts = () => {
    feedRef.current?.refresh();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { emit } = useSocket();

  const handleCreatePost = (content: string, mediaUrls?: string[]) => {
    try {
      if (isPosting || !user) return;

      // Create optimistic local post
      const optimisticPost = new Post({
        id: 'p-optimistic-' + Date.now(),
        author: user,
        content: content,
        media: (mediaUrls || []).map(url => ({ url, type: 'image' })), // Simplified for optimistic UI
        timestamp: 'Az önce',
        likeCount: 0,
        commentCount: 0,
        hashtags: content.match(/#\w+/g)?.map(t => t.replace('#', '')) || []
      } as any);

      // Prepend to feed
      feedRef.current?.prependPost({
        ...optimisticPost,
        createdAt: optimisticPost.timestamp,
        stats: { likes: 0, comments: 0, shares: 0, reposts: 0 }
      } as any);
      
      setSelectedMedia([]);

      // Emit to socket server
      emit('post', optimisticPost);

    } catch (error) {
      console.error('[SocialLayout] Error in handleCreatePost:', error);
    }
  };

  return (
    <div className="w-full flex-1 flex gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">

      {/* Sol Yan Panel (Ranking & Economy & MC) */}
      <SocialSidebar />


      {/* Ana Akış (Feed) */}
      <div className="flex-1 flex flex-col pt-2 min-w-0">

        {/* Hikayeler (Stories) */}
        <Stories />

        {/* Yeni Gönderi Paylaşma Alanı */}
        <PostComposer 
          user={user}
          onPost={async (c, m) => handleCreatePost(c, m)}
          isPosting={isPosting}
          onOpenCloudGallery={() => setIsCloudOpen(true)}
          attachments={selectedMedia}
          onRemoveAttachment={(index) => setSelectedMedia(prev => prev.filter((_, i) => i !== index))}
        />

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

        {/* Post Akışı (Smart Component) */}
        <div className="space-y-6">
          {selectedTag && (
            <div className="flex items-center justify-between bg-blue-500/10 border border-blue-500/20 p-4 rounded-2xl animate-in fade-in slide-in-from-left-4 duration-300">
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-armoyu-text-muted">Filtrelenen Etiket:</span>
                <span className="text-sm font-black text-blue-500">{selectedTag}</span>
              </div>
              <button
                onClick={() => { setSelectedTag(null); feedRef.current?.reset(); }}
                className="text-xs font-bold text-red-500 hover:underline"
              >
                Filtreyi Temizle
              </button>
            </div>
          )}
          
          <SocialFeed 
            ref={feedRef}
            category={selectedTag ? 'tag' : (focusedPostId ? 'post' : undefined)}
            categoryDetail={selectedTag || focusedPostId || undefined}
            live={true}
          />
        </div>
      </div>

      {/* Sağ Yan Panel (Sidebar Widget Area) */}
      <div className="hidden md:flex w-[300px] lg:w-[320px] flex-col gap-6 shrink-0">
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

        {/* Yeni Üyeler Widget */}
        <NewMembersWidget />

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
                onClick={() => { setSelectedTag(tagObj.name === selectedTag ? null : tagObj.name); feedRef.current?.reset(); }}
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
      <CloudModal 
        isOpen={isCloudOpen} 
        onClose={() => setIsCloudOpen(false)}
        isSelectionMode={true}
        onSelectMedia={(media) => {
          setSelectedMedia(prev => [...prev, media]);
          setIsCloudOpen(false);
        }}
      />
    </div>
  );
}
