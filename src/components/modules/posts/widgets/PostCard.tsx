'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { MediaLightbox, type PostMedia } from './MediaLightbox';
import { ArmoyuPlayer } from '../../../shared/ArmoyuPlayer';
import { parseMentions } from '../../../../utils/text/MentionUtils';
import { RepostModal } from './RepostModal';
import { PostInteractionsModal } from './PostInteractionsModal';
import { useAuth } from '../../../../context/AuthContext';
import { useSocket } from '../../../../context/SocketContext';
import { RollingNumber } from '../../../RollingNumber';
import { User } from '../../../../models/auth/User';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { Post } from '../../../../models/social/feed/Post';
import { Comment } from '../../../../models/social/feed/Comment';
import { PostShareModal } from './PostShareModal';
import { Smartphone, Monitor } from 'lucide-react';

export interface PostCardRef {
  like: () => Promise<void>;
  unlike: () => Promise<void>;
  delete: () => Promise<void>;
  toggleComments: () => void;
  focus: () => void;
}



export interface PostCardProps {
  id: string;
  author: User | null;
  content: string;
  imageUrl?: string; // Legacy support
  media?: PostMedia[];
  createdAt: string;
  stats: {
    likes: number;
    comments: number;
    reposts?: number;
    shares: number;
  };
  hashtags?: string[];
  onTagClick?: (tag: string) => void;
  isPending?: boolean;
  
  // social lists
  likeList?: User[];
  repostList?: User[];
  commentList?: Comment[];
  repostOf?: Post | null; // The original post object
  profilePrefix?: string;
  device?: 'mobile' | 'web';
  timeLabel?: string;
  location?: string;
}

export const PostCard = React.forwardRef<PostCardRef, PostCardProps>((props, ref) => {
  const { id, author, content, imageUrl, media, createdAt, stats, hashtags, onTagClick, isPending, likeList, repostList, commentList, repostOf, profilePrefix, device, timeLabel, location } = props;
  const { user } = useAuth(); // Oturum bilgisini çek
  const { emit } = useSocket();
  const { api, navigation } = useArmoyu();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!author) return null;

  // Repost Edilen Gönderinin Medyası
  const repostMedia = repostOf?.media || [];

  const displayMedia: PostMedia[] = (media 
    ? media 
    : (imageUrl ? [{ type: 'image' as const, url: imageUrl }] : [])).map(m => ({
      ...m,
      owner: author ? {
        id: Number(author.id),
        username: author.username,
        displayName: author.displayName,
        avatar: author.avatar
      } : undefined
    }));

  // Interaction States
  const [isLiked, setIsLiked] = React.useState(false);
  const [likeCount, setLikeCount] = React.useState(stats.likes);
  
  // Props değiştikçe local state'i güncelle (Soket desteği için kritik)
  React.useEffect(() => {
    setLikeCount(stats.likes);
  }, [stats.likes]);

  const [isCommentOpen, setIsCommentOpen] = React.useState(false);
  const [isRepostModalOpen, setIsRepostModalOpen] = useState(false);
  const [isInteractionsModalOpen, setIsInteractionsModalOpen] = useState(false);
  const [interactionsTab, setInteractionsTab] = useState<'likes' | 'reposts'>('likes');
  const [commentText, setCommentText] = React.useState('');
  const [commentsList, setCommentsList] = React.useState<Comment[]>(commentList || []);
  const [commentsLoading, setCommentsLoading] = React.useState(false);
  const [fullLikesList, setFullLikesList] = useState<User[]>([]);
  const [fullRepostsList, setFullRepostsList] = useState<User[]>([]);
  const [interactionsLoading, setInteractionsLoading] = useState(false);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // Hangi yoruma yanıt veriliyor
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);

  const handleLike = async () => {
    if (isPending) return;
    const newLiked = !isLiked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    
    // Pessimistic/Optimistic Update Mix
    setIsLiked(newLiked);
    setLikeCount(newCount);

    try {
      if (newLiked) {
        await api.social.addLike(Number(id));
      } else {
        await api.social.removeLike(Number(id));
      }

      // Emit live update for other clients
      emit('post_like', {
        postId: id,
        userId: user?.id,
        isLiked: newLiked,
        newCount: newCount
      });
    } catch (error) {
      // Revert on failure
      setIsLiked(!newLiked);
      setLikeCount(likeCount);
      console.error('[PostCard] Like failed:', error);
    }
  };

  const handleDelete = async () => {
    if (typeof window !== 'undefined' && !window.confirm('Bu gönderiyi silmek istediğinizden emin misiniz?')) return;
    try {
      await api.social.deletePost(Number(id));
      // Let the parent handle the removal from UI if needed, or emit event
      emit('post_delete' as any, { postId: id });
    } catch (error) {
      console.error('[PostCard] Delete failed:', error);
    }
  };

  // Expose methods via ref (OOP Style)
  React.useImperativeHandle(ref, () => ({
    like: async () => {
      if (!isLiked) await handleLike();
    },
    unlike: async () => {
      if (isLiked) await handleLike();
    },
    delete: handleDelete,
    toggleComments: () => setIsCommentOpen(!isCommentOpen),
    focus: () => {
      if (typeof document !== 'undefined') {
        const el = document.getElementById(`post-${id}`);
        el?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  }));
  
  // Dynamic Comment Loading
  const fetchAllComments = async () => {
    if (commentsLoading) return;
    
    setCommentsLoading(true);
    try {
      const response = await api.social.getComments(Number(id));
      console.log(`[DEBUG] Full Comments for Post ${id}:`, response);
      if (response.durum === 1 && Array.isArray(response.icerik)) {
        const freshComments = response.icerik.map((c: any) => Comment.fromAPI(c));
        setCommentsList(freshComments);
      }
    } catch (error) {
      console.error('[PostCard] Failed to fetch comments:', error);
    } finally {
      setCommentsLoading(false);
    }
  };

  React.useEffect(() => {
    // Sadece yorumlar açıksa ve liste henüz tamamen boşsa otomatik çek (previe'lar bile yoksa)
    if (!isCommentOpen || commentsLoading || commentsList.length > 0) return;
    
    fetchAllComments();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCommentOpen, id]);

  const fetchInteractions = async (type: 'likes' | 'reposts' = 'likes', reset = false) => {
    if (interactionsLoading) return;
    
    setInteractionsLoading(true);
    setInteractionsTab(type);
    try {
      if (type === 'likes') {
        const response = await api.social.getLikers(Number(id), 'post');
        if (response.durum === 1 && Array.isArray(response.icerik)) {
          const mapped = response.icerik.map((u: any) => User.fromAPI(u));
          setFullLikesList(reset ? mapped : prev => [...prev, ...mapped]);
        }
      }
    } catch (error) {
      console.error('[PostCard] Failed to fetch interactions:', error);
    } finally {
      setInteractionsLoading(false);
    }
  };

  const handleOpenInteractions = (type: 'likes' | 'reposts') => {
    setInteractionsTab(type);
    setIsInteractionsModalOpen(true);
    fetchInteractions(type, true); // İlk yüklemeyi otomatik yap (reset = true)
  };

  const handleCommentSubmit = async () => {
    if (!commentText.trim()) return;
    
    try {
      const response = await api.social.createComment(
        Number(id),
        commentText,
        replyingTo ? Number(replyingTo) : undefined
      );

      if (response && response.durum === 1) {
        const json = response.icerik as any;
        
        if (replyingTo) {
          setCommentsList(prev => prev.map(c => {
            if (c.id === replyingTo) {
              const newReply = new Comment({
                id: String(json?.id || json?.yorumid || json?.yorum_id || json?.paylasimyorumid || json?.yorumID || Math.random().toString(36).substr(2, 9)),
                author: user,
                content: commentText,
                timestamp: 'Şimdi',
                date: 'Şimdi',
                createdAt: 'Şimdi'
              });
              return new Comment({
                ...c,
                replies: [...(c.replies || []), newReply]
              });
            }
            return c;
          }));
          setReplyingTo(null);
        } else {
          const newComment = new Comment({
            id: Date.now().toString(),
            author: user,
            content: commentText,
            timestamp: 'Şimdi',
            date: 'Şimdi',
            createdAt: 'Şimdi',
            replies: []
          });
          setCommentsList(prev => [newComment, ...prev]);
        }
        setCommentText('');
      }
    } catch (error) {
      console.error('[PostCard] Comment failed:', error);
    }
  };

  const finalProfilePrefix = profilePrefix || navigation.profilePrefix;

  const goToProfile = () => {
    router.push(`${finalProfilePrefix}/${author.username}`);
  };

  return (
    <div className={`w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 relative ${isPending ? 'opacity-70 pointer-events-none' : ''} ${isMenuOpen ? 'z-50' : 'z-0'}`}>
      
      {/* Pending Overlay/Indicator */}
      {isPending && (
        <div className="absolute top-4 right-4 z-30 bg-armoyu-primary/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-2 animate-pulse">
           <div className="w-2.5 h-2.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">Gönderiliyor...</span>
        </div>
      )}
      
      {/* Üst Kısım: Profil ve Zaman */}
      <div className="p-5 flex items-start gap-4">
        <img 
          src={author?.avatar} 
          alt={author?.displayName} 
          className="w-12 h-12 rounded-full border-2 border-transparent hover:border-armoyu-primary transition-colors shadow-sm bg-black/5 dark:bg-white/5 object-cover cursor-pointer" 
          onClick={goToProfile}
          title="Profile Git"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-1.5 flex-wrap">
               <h3 
                 className="font-bold text-armoyu-text truncate max-w-[200px] cursor-pointer hover:text-armoyu-primary transition-colors"
                 onClick={goToProfile}
                 title="Profile Git"
               >
                 {author.displayName}
               </h3>
               {author.verified && (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-armoyu-primary"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
               )}
               {author.role?.name && (
                 <span 
                   style={{ 
                     backgroundColor: `${author.role.color}15`, 
                     color: author.role.color,
                     borderColor: `${author.role.color}40`
                   }}
                   className="text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider border"
                 >
                   {author.role.name}
                 </span>
               )}
               {device && (
                 <div className="flex items-center text-armoyu-text-muted/40 hover:text-armoyu-primary transition-colors" title={device === 'mobile' ? 'Mobil üzerinden paylaşıldı' : 'Web üzerinden paylaşıldı'}>
                    {device === 'mobile' ? (
                      <Smartphone size={12} strokeWidth={2.5} />
                    ) : (
                      <Monitor size={12} strokeWidth={2.5} />
                    )}
                 </div>
               )}
             </div>
              <div className="relative flex items-center gap-1">
                 {/* Quick Edit (Only for Owner) */}
                 {user?.username === author.username && (
                   <button 
                     className="text-armoyu-text-muted hover:text-armoyu-primary p-1.5 transition-colors bg-armoyu-primary/5 rounded-lg border border-armoyu-primary/10"
                     title="Düzenle"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                   </button>
                 )}

                 <button 
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="text-armoyu-text-muted hover:text-armoyu-primary p-1 transition-colors"
                   title="Seçenekler"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                 </button>
                 
                 {isMenuOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                     <div className="absolute right-0 mt-1 w-56 bg-armoyu-drawer-bg border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
                       {user?.username === author.username && (
                         <button onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-armoyu-primary hover:bg-armoyu-primary/10 transition-colors flex items-center gap-3">
                           <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path></svg>
                           Gönderiyi Düzenle
                         </button>
                       )}
                       <button onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-medium text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5 transition-colors flex items-center gap-3">
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path></svg>
                         Gönderiyi Kaydet
                       </button>
                       <button onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-red-600 dark:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors flex items-center gap-3 border-t border-gray-100 dark:border-white/5 mt-1 pt-2.5">
                         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path><line x1="4" y1="22" x2="4" y2="15"></line></svg>
                         Gönderiyi Şikayet Et
                       </button>
                     </div>
                   </>
                 )}
              </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-medium text-armoyu-text-muted mt-0.5">
            <span className="text-armoyu-primary font-bold cursor-pointer hover:underline" onClick={goToProfile}>@{author.username}</span>
            <span>•</span>
            <span title={createdAt}>{timeLabel || createdAt}</span>
            {location && (
              <>
                <span>•</span>
                <span className="flex items-center gap-1 hover:text-armoyu-primary cursor-default transition-colors" title={`Konum: ${location}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                  {location}
                </span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* İçerik (Metin) */}
      <div className="px-5 pb-3">
        <p className="text-sm md:text-base text-armoyu-text leading-relaxed whitespace-pre-wrap font-medium">
          {content.split(/(\s+|#[\w\d]+|@[\w\d._]+)/).map((part, i) => {
            if (part.startsWith('#')) {
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(part);
                  }}
                  className="text-armoyu-primary hover:underline inline-block font-bold"
                >
                  {part}
                </button>
              );
            }
            if (part.startsWith('@')) {
              const username = part.substring(1);
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`${finalProfilePrefix}/${username}`);
                  }}
                  className="text-armoyu-primary hover:underline inline-block font-bold"
                >
                  {part}
                </button>
              );
            }
            return part;
          })}
        </p>

        {/* REPOST OF (ORİJİNAL GÖNDERİ ÖNİZLEMESİ) */}
        {repostOf && (
          <div 
            className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-black/20 hover:border-armoyu-primary/30 transition-all cursor-pointer group/repost"
            onClick={(e) => {
               e.stopPropagation();
               router.push(`/?post=${repostOf.id}`);
            }}
          >
             {/* Orijinal Yazar Bilgisi */}
             <div className="p-3 flex items-center gap-2 border-b border-black/5 dark:border-white/5">
                <img src={repostOf.author?.avatar} className="w-5 h-5 rounded-full object-cover" alt="" />
                <span className="text-[11px] font-black text-armoyu-text uppercase tracking-tight">{repostOf.author?.displayName}</span>
                <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60">@{repostOf.author?.username}</span>
                <span className="text-[10px] text-armoyu-text-muted ml-auto">{repostOf.timestamp}</span>
             </div>
             
             {/* Orijinal İçerik Metni */}
             <div className="p-4 pt-3">
                <p className="text-xs text-armoyu-text-muted line-clamp-3 leading-relaxed">
                   {repostOf.content}
                </p>
                
                {/* Orijinal Medya Önizlemesi (Küçük) */}
                {repostMedia.length > 0 && (
                  <div className="mt-3 rounded-xl overflow-hidden grid grid-cols-2 gap-1 aspect-[21/9]">
                    {repostMedia.slice(0, 4).map((m: any, i: number) => (
                      <div key={i} className={`relative ${repostMedia.length === 1 ? 'col-span-2' : ''}`}>
                         <img src={m.url} className="w-full h-full object-cover brightness-95 group-hover/repost:scale-105 transition-transform duration-700" alt="" />
                         {m.type === 'video' && (
                           <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                              <div className="w-6 h-6 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white">
                                 <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                              </div>
                           </div>
                         )}
                      </div>
                    ))}
                  </div>
                )}
             </div>
          </div>
        )}
      </div>

      {/* Görsel/Medya Grid Sistemi */}
      {displayMedia.length > 0 && (
        <div className="px-5 pb-5">
          <div className={`grid gap-2 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 shadow-sm ${
            displayMedia.length === 1 
              ? 'grid-cols-1 aspect-auto max-h-[700px]' 
              : displayMedia.length === 2 
                ? 'grid-cols-2 aspect-video' 
                : 'grid-cols-2 grid-rows-2 aspect-square md:aspect-video'
          }`}>
            {displayMedia.slice(0, 4).map((m, idx) => (
              <div 
                key={idx} 
                className="relative cursor-pointer group bg-black/10 dark:bg-black/40"
                onClick={() => setLightboxIndex(idx)}
              >
                {m.type === 'video' ? (
                   <div className="w-full h-full bg-black flex items-center justify-center [&_.plyr]:h-full [&_.plyr]:w-full [&_.plyr--video]:h-full [&_video]:h-full [&_video]:w-full">
                     <ArmoyuPlayer
                        source={{ type: 'video', sources: [{ src: m.url }] }}
                        options={{ 
                          controls: ['play-large', 'play', 'progress', 'current-time', 'mute', 'volume'],
                          ratio: '16:9'
                        }}
                     />
                   </div>
                ) : (
                   <img 
                    src={m.url} 
                    alt="Medya" 
                    className={`w-full h-full ${displayMedia.length === 1 ? 'object-contain' : 'object-cover'} group-hover:scale-[1.05] transition-transform duration-700`} 
                  />
                )}
                
                {/* Fullscreen Icon overlay (Optional) */}
                {m.type === 'video' && (
                  <div className="absolute top-3 right-3 z-10">
                    <div className="p-1.5 rounded-lg bg-black/40 backdrop-blur-md border border-white/10 text-white/60">
                       <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"></path></svg>
                    </div>
                  </div>
                )}

                {/* +More Katmanı (4'ten fazla medya varsa) */}
                {displayMedia.length > 4 && idx === 3 && (
                  <div className="absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center text-white font-black text-2xl md:text-3xl z-20">
                    +{displayMedia.length - 4}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}


      {/* Social Proof (Liked by...) */}
      {likeCount > 0 && (
         <div 
           className="px-5 py-3 flex items-center gap-2.5 cursor-pointer transition-opacity hover:opacity-80 group/likes"
           onClick={() => handleOpenInteractions('likes')}
         >
            {likeList && likeList.length > 0 ? (
              <div className="flex items-center gap-2">
                 <div className="flex -space-x-2 overflow-hidden">
                    {likeList.slice(0, 3).map((l, i) => (
                       <img 
                         key={i} 
                         src={l.avatar} 
                         alt={l.displayName} 
                         className="inline-block h-6 w-6 rounded-full border-2 border-white dark:border-[#1a1a20] bg-white dark:bg-[#1a1a20] object-cover shadow-sm transition-transform hover:scale-110 hover:z-10" 
                         title={l.displayName}
                       />
                    ))}
                 </div>
                 <div className="text-[11px] font-bold text-armoyu-text-muted flex items-center gap-1">
                    <span className="text-armoyu-text">{likeList[0].displayName}</span>
                    {likeCount > 1 && (
                      <>
                         <span>ve</span>
                         <span className="text-armoyu-text">{likeCount - 1} kişi</span>
                      </>
                    )}
                    <span className="ml-0.5">beğendi</span>
                 </div>
              </div>
            ) : (
               <div className="text-[11px] font-bold text-armoyu-text-muted flex items-center gap-2">
                  <div className="w-6 h-6 rounded-full bg-armoyu-primary/10 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-armoyu-primary"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  </div>
                  <span className="text-armoyu-text">{likeCount} kişi beğendi</span>
               </div>
            )}
         </div>
      )}

      {/* Etkileşim Butonları (Beğeni, Yorum, Paylaş) */}
      <div className="px-5 py-3.5 border-t border-armoyu-card-border flex justify-between items-center bg-black/5 dark:bg-white/5">
        <div className="flex gap-6">
          <div className="flex items-center">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm font-bold transition-colors group ${isLiked ? 'text-armoyu-primary' : 'text-armoyu-text-muted hover:text-armoyu-primary'}`}
            >
               <div className={`p-1.5 rounded-full transition-colors ${isLiked ? 'bg-armoyu-primary/10' : 'group-hover:bg-armoyu-primary/10'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-0.5 transition-transform"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
               </div>
            </button>
            <button 
              onClick={() => handleOpenInteractions('likes')}
              className="text-sm font-black text-armoyu-text-muted hover:text-armoyu-primary transition-colors ml-1 px-1"
            >
              <RollingNumber value={likeCount || 0} />
            </button>
          </div>
          
          <div className="flex items-center">
            <button 
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              className={`flex items-center gap-2 text-sm font-bold transition-colors group ${isCommentOpen ? 'text-emerald-500' : 'text-armoyu-text-muted hover:text-emerald-500'}`}
              title="Yorum Yap"
            >
              <div className={`p-1.5 rounded-full transition-colors ${isCommentOpen ? 'bg-emerald-500/10' : 'group-hover:bg-emerald-500/10'}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
            </button>
            <button 
              onClick={() => setIsCommentOpen(!isCommentOpen)}
              className={`text-sm font-black transition-colors ml-1 px-1 ${isCommentOpen ? 'text-emerald-500' : 'text-armoyu-text-muted hover:text-emerald-500'}`}
            >
              <RollingNumber value={stats.comments || 0} />
            </button>
          </div>

          <div className="flex items-center">
            <button 
              onClick={() => setIsRepostModalOpen(true)}
              className="flex items-center gap-2 text-sm font-bold text-armoyu-text-muted hover:text-green-500 transition-colors group" 
              title="Yeniden Paylaş (Retweet)"
            >
               <div className="p-1.5 rounded-full group-hover:bg-green-500/10 transition-colors">
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-y-0.5 transition-transform"><polyline points="17 1 21 5 17 9"></polyline><path d="M3 11V9a4 4 0 0 1 4-4h14"></path><polyline points="7 23 3 19 7 15"></polyline><path d="M21 13v2a4 4 0 0 1-4 4H3"></path></svg>
               </div>
            </button>
            <button 
              onClick={() => handleOpenInteractions('reposts')}
              className="text-sm font-black text-armoyu-text-muted hover:text-green-500 transition-colors ml-1 px-1"
            >
              <RollingNumber value={stats.reposts || 0} />
            </button>
          </div>
        </div>
        
        <button 
          onClick={() => setIsShareModalOpen(true)}
          className="flex items-center gap-2 text-sm font-bold text-armoyu-text-muted hover:text-purple-500 transition-colors group"
        >
           <div className="p-1.5 rounded-full group-hover:bg-purple-500/10 transition-colors">
             <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-0.5 transition-transform"><circle cx="18" cy="5" r="3"></circle><circle cx="6" cy="12" r="3"></circle><circle cx="18" cy="19" r="3"></circle><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"></line><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"></line></svg>
           </div>
        </button>
      </div>



      {/* Ekstrapole Edilmiş Yorum Alanı (Açılır/Kapanır) */}
      {isCommentOpen && (
        <div className="bg-black/5 dark:bg-white/5 border-t border-armoyu-card-border p-4 animate-in fade-in slide-in-from-top-2 duration-200">
          
          {/* Aktif Yanıt (Reply) Durumu Geri Bildirimi */}
          {replyingTo && (
             <div className="flex justify-between items-center mb-2.5 px-2">
               <span className="text-xs font-bold text-armoyu-primary flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                   <span className="text-armoyu-text-muted">Yanıtlanıyor:</span> @{(() => {
                    const replyAuthor = commentsList.find(c => c.id === replyingTo)?.author;
                    return typeof replyAuthor === 'string' ? replyAuthor : (replyAuthor?.displayName || 'Anonim');
                  })()}
               </span>
               <button onClick={() => setReplyingTo(null)} className="text-[11px] font-black uppercase tracking-wider text-armoyu-text-muted hover:text-red-500 transition-colors bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">İptal Et</button>
             </div>
          )}

          {/* Yorum Yapma Girdisi */}
          <div className="flex gap-3 mb-2 animate-in fade-in zoom-in-95 duration-300">
             <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"} alt="Sen" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 shrink-0 shadow-sm object-cover" />
             <div className="flex-1 flex items-center bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3 py-1.5 shadow-sm focus-within:border-armoyu-primary focus-within:ring-1 focus-within:ring-armoyu-primary transition-all">
                <input 
                  type="text" 
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleCommentSubmit()}
                  placeholder={replyingTo ? "Yanıtını yaz..." : "Fikrini paylaş..."} 
                  className="flex-1 bg-transparent border-none outline-none text-sm text-armoyu-text placeholder:text-armoyu-text-muted font-medium" 
                />
                <button 
                  onClick={handleCommentSubmit}
                  disabled={!commentText.trim()}
                  className="p-2 ml-2 text-armoyu-primary disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-armoyu-primary/10 rounded-xl transition-colors shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
             </div>
          </div>
          
          {/* Loading Indicator */}
          {commentsLoading && (
            <div className="py-6 flex flex-col items-center gap-2 opacity-50">
               <div className="w-5 h-5 border-2 border-armoyu-primary/20 border-t-armoyu-primary rounded-full animate-spin" />
               <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text">Yorumlar Yükleniyor...</span>
            </div>
          )}

          {/* Yorumlar Listesi */}
          {commentsList.length > 0 && (
            <div className="space-y-6 mt-5 px-1">
              {commentsList.map((c) => (
                <div key={c.id} className="animate-in fade-in slide-in-from-left-2 zoom-in-95 duration-500">
                  {/* Ana Yorum */}
                  <div className="flex gap-3">
                    <Link href={`/oyuncular/${typeof c.author === 'string' ? c.author : (c.author?.username || c.author?.id)}`} className="shrink-0 mt-1">
                      <img 
                        src={(typeof c.author !== 'string' ? c.author?.avatar : null) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${typeof c.author === 'string' ? c.author : (c.author?.displayName || c.author?.username || 'Anonim')}`} 
                        alt="Yorumcu" 
                        className="w-9 h-9 rounded-full bg-white/5 border border-black/10 dark:border-white/10 shadow-sm object-cover" 
                      />
                    </Link>
                    <div className="flex-1">
                      <div className="bg-armoyu-drawer-bg border border-gray-200 dark:border-white/5 rounded-2xl rounded-tl-sm px-4 py-2.5 shadow-sm inline-block min-w-[30%]">
                        <Link href={`/oyuncular/${typeof c.author === 'string' ? c.author : (c.author?.username || c.author?.id)}`} className="block">
                          <div className="text-xs font-black text-armoyu-text mb-0.5 hover:text-armoyu-primary transition-colors uppercase tracking-tight italic">
                            {typeof c.author === 'string' ? c.author : (c.author?.displayName || c.author?.username || c.author?.firstName || 'Anonim Üye')}
                          </div>
                        </Link>
                        <div className="text-sm font-medium text-armoyu-text-muted leading-relaxed">{parseMentions(c.content)}</div>
                      </div>
                      <div className="flex items-center gap-4 mt-2 ml-2 text-[11px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-80">
                         <span className="hover:text-armoyu-primary cursor-pointer transition-colors">Beğen</span>
                         <span onClick={() => { setReplyingTo(c.id); setCommentText('@' + (typeof c.author === 'string' ? c.author : (c.author?.username || '')) + ' '); }} className="hover:text-armoyu-primary cursor-pointer transition-colors">Yanıtla</span>
                         <span className="opacity-50">{c.date || c.createdAt || 'Şimdi'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alt Yorumlar (Replies Loop) */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-4 ml-12 space-y-4 border-l-2 border-black/5 dark:border-white/5 pl-5">
                      {c.replies.map((r: any) => (
                        <div key={r.id} className="flex gap-3 animate-in fade-in slide-in-from-top-2 duration-300">
                          <Link href={`/oyuncular/${typeof r.author === 'string' ? r.author : (r.author?.username || r.author?.id)}`} className="shrink-0">
                            <img 
                              src={(typeof r.author !== 'string' ? r.author?.avatar : null) || `https://api.dicebear.com/7.x/avataaars/svg?seed=${typeof r.author === 'string' ? r.author : (r.author?.displayName || r.author?.username || 'Anonim')}`} 
                              alt="Yanıtlayan" 
                              className="w-7 h-7 rounded-full bg-white/5 border border-black/10 dark:border-white/10 shadow-sm object-cover" 
                            />
                          </Link>
                          <div className="flex-1">
                            <div className="bg-black/5 dark:bg-white/2 border border-gray-100 dark:border-white/5 rounded-2xl px-4 py-2 shadow-sm inline-block min-w-[30%]">
                              <Link href={`/oyuncular/${typeof r.author === 'string' ? r.author : (r.author?.username || r.author?.id)}`} className="block">
                                <div className="text-[10px] font-black text-armoyu-text mb-0.5 hover:text-armoyu-primary transition-colors uppercase tracking-tight italic">
                                  {typeof r.author === 'string' ? r.author : (r.author?.displayName || r.author?.username || r.author?.firstName || 'Anonim Üye')}
                                </div>
                              </Link>
                              <div className="text-xs font-medium text-armoyu-text-muted leading-relaxed">{parseMentions(r.content)}</div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Daha fazla yorum varsa 'Tümünü Gör' butonu */}
              {stats.comments > commentsList.length && !commentsLoading && (
                <button 
                  onClick={fetchAllComments}
                  className="w-full py-2.5 mt-2 text-[11px] font-black uppercase tracking-widest text-armoyu-primary hover:text-armoyu-primary/80 bg-armoyu-primary/5 hover:bg-armoyu-primary/10 border border-armoyu-primary/10 rounded-xl transition-all animate-in fade-in slide-in-from-top-2"
                >
                   Tüm Yorumları Gör ({stats.comments})
                </button>
              )}
            </div>
          )}
        </div>
      )}

      {/* Repost Modal Popup */}
      <RepostModal 
        isOpen={isRepostModalOpen} 
        onClose={() => setIsRepostModalOpen(false)} 
        post={{ id, author, content, media, createdAt, stats } as any} 
      />

      {/* Interactions Modal Popup (Likes/Reposts List) */}
      <PostInteractionsModal
        isOpen={isInteractionsModalOpen}
        onClose={() => setIsInteractionsModalOpen(false)}
        title={interactionsTab === 'likes' ? 'Beğenenler' : 'Paylaşanlar'}
        likes={fullLikesList.length > 0 ? fullLikesList : (likeList || [])}
        reposts={fullRepostsList.length > 0 ? fullRepostsList : (repostList || [])}
        defaultTab={interactionsTab}
        isLoading={interactionsLoading}
        hasMore={interactionsTab === 'likes' ? (stats.likes > (fullLikesList.length || (likeList?.length || 0))) : ((stats.reposts || 0) > (fullRepostsList.length || (repostList?.length || 0)))}
        onLoadMore={fetchInteractions}
      />

      {/* Media Lightbox Popup */}
      {lightboxIndex !== null && (
        <MediaLightbox 
          isOpen={lightboxIndex !== null} 
          onClose={() => setLightboxIndex(null)} 
          media={displayMedia} 
          initialIndex={lightboxIndex} 
        />
      )}

      {/* Share Modal Popup */}
      <PostShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        url={`/?post=${id}`}
        title={`${author?.displayName || 'Bir kullanıcı'} kullanıcısının ARMOYU üzerindeki gönderisini keşfet!`}
      />

    </div>
  );
});

PostCard.displayName = 'PostCard';
