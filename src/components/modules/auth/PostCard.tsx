'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { MediaLightbox, PostMedia } from './MediaLightbox';
import { RepostModal } from './RepostModal';
import { PostInteractionsModal } from './PostInteractionsModal';
import { useAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
import { RollingNumber } from '../../RollingNumber';
import { User } from '@armoyu/core';
import { useArmoyu } from '../../../context/ArmoyuContext';

// Yorumların Tipini (Type) Nested Destekleyecek Şekilde Güncelledik
interface CommentType {
  id: string;
  author: string | User;
  text?: string;
  content?: string;
  date?: string;
  createdAt?: string;
  replies?: CommentType[];
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
  commentList?: any[];
  repostOf?: any; // The original post object
  profilePrefix?: string;
}

export function PostCard({ id, author, content, imageUrl, media, createdAt, stats, hashtags, onTagClick, isPending, likeList, repostList, commentList, repostOf, profilePrefix }: PostCardProps) {
  const { user } = useAuth(); // Oturum bilgisini çek
  const { emit } = useSocket();
  const { navigation } = useArmoyu();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  if (!author) return null;

  // Repost Edilen Gönderinin Medyası
  const repostMedia = repostOf?.media || (repostOf?.imageUrl ? [{ type: 'image', url: repostOf.imageUrl }] : []);

  const displayMedia: PostMedia[] = media 
    ? media 
    : (imageUrl ? [{ type: 'image', url: imageUrl }] : []);

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
  const [commentsList, setCommentsList] = React.useState<CommentType[]>(commentList || []);
  const [replyingTo, setReplyingTo] = useState<string | null>(null); // Hangi yoruma yanıt veriliyor

  const handleLike = () => {
    if (isPending) return;
    const newLiked = !isLiked;
    const newCount = newLiked ? likeCount + 1 : likeCount - 1;
    
    setIsLiked(newLiked);
    setLikeCount(newCount);

    // Emit live update
    emit('post_like', {
      postId: id,
      userId: user?.id,
      isLiked: newLiked,
      newCount: newCount
    });
  };

  const handleCommentSubmit = () => {
    if (!commentText.trim()) return;
    
    const dynamicAuthorName = user?.displayName?.split(' ')[0] || 'Kullanıcı';
    
    if (replyingTo) {
      // Yanıtı Ana Yoruma Ekle
      setCommentsList(prev => prev.map(c => {
        if (c.id === replyingTo) {
          return {
            ...c,
            replies: [...(c.replies || []), {
              id: Date.now().toString(),
              author: dynamicAuthorName,
              text: commentText,
              date: 'Şimdi'
            }]
          };
        }
        return c;
      }));
      setReplyingTo(null);
    } else {
      // Normal Ana Yorum Ekle
      setCommentsList(prev => [...prev, {
        id: Date.now().toString(),
        author: dynamicAuthorName,
        text: commentText,
        date: 'Şimdi',
        replies: []
      }]);
    }
    setCommentText('');
  };

  const finalProfilePrefix = profilePrefix || navigation.profilePrefix;

  const goToProfile = () => {
    router.push(`${finalProfilePrefix}/${author.username}`);
  };

  return (
    <div className={`w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 relative ${isPending ? 'opacity-70 pointer-events-none' : ''}`}>
      
      {/* Pending Overlay/Indicator */}
      {isPending && (
        <div className="absolute top-4 right-4 z-30 bg-blue-600/90 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 shadow-xl flex items-center gap-2 animate-pulse">
           <div className="w-2.5 h-2.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
           <span className="text-[10px] font-black text-white uppercase tracking-widest">Gönderiliyor...</span>
        </div>
      )}
      
      {/* Üst Kısım: Profil ve Zaman */}
      <div className="p-5 flex items-start gap-4">
        <img 
          src={author.avatar} 
          alt={author.displayName} 
          className="w-12 h-12 rounded-full border-2 border-transparent hover:border-blue-500 transition-colors shadow-sm bg-black/5 dark:bg-white/5 object-cover cursor-pointer" 
          onClick={goToProfile}
          title="Profile Git"
        />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between">
             <div className="flex items-center gap-1.5 flex-wrap">
               <h3 
                 className="font-bold text-armoyu-text truncate max-w-[200px] cursor-pointer hover:text-blue-500 transition-colors"
                 onClick={goToProfile}
                 title="Profile Git"
               >
                 {author.displayName}
               </h3>
               {author.verified && (
                 <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
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
             </div>
              <div className="relative flex items-center gap-1">
                 {/* Quick Edit (Only for Owner) */}
                 {user?.username === author.username && (
                   <button 
                     className="text-armoyu-text-muted hover:text-blue-500 p-1.5 transition-colors bg-blue-500/5 rounded-lg border border-blue-500/10"
                     title="Düzenle"
                   >
                     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
                   </button>
                 )}

                 <button 
                   onClick={() => setIsMenuOpen(!isMenuOpen)}
                   className="text-armoyu-text-muted hover:text-blue-500 p-1 transition-colors"
                   title="Seçenekler"
                 >
                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="1"></circle><circle cx="19" cy="12" r="1"></circle><circle cx="5" cy="12" r="1"></circle></svg>
                 </button>
                 
                 {isMenuOpen && (
                   <>
                     <div className="fixed inset-0 z-40" onClick={() => setIsMenuOpen(false)} />
                     <div className="absolute right-0 mt-1 w-56 bg-armoyu-drawer-bg border border-gray-200 dark:border-white/10 rounded-xl shadow-xl z-50 py-1.5 animate-in fade-in zoom-in-95 duration-200">
                       {user?.username === author.username && (
                         <button onClick={() => setIsMenuOpen(false)} className="w-full text-left px-4 py-2.5 text-sm font-bold text-blue-500 hover:bg-blue-500/10 transition-colors flex items-center gap-3">
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
            <span className="text-blue-600 dark:text-blue-400 font-bold cursor-pointer hover:underline" onClick={goToProfile}>@{author.username}</span>
            <span>•</span>
            <span>{createdAt}</span>
          </div>
        </div>
      </div>

      {/* İçerik (Metin) */}
      <div className="px-5 pb-3">
        <p className="text-sm md:text-base text-armoyu-text leading-relaxed whitespace-pre-wrap font-medium">
          {content.split(/(\s+)/).map((part, i) => {
            if (part.startsWith('#')) {
              return (
                <button
                  key={i}
                  onClick={(e) => {
                    e.stopPropagation();
                    onTagClick?.(part);
                  }}
                  className="text-blue-500 hover:underline inline-block font-bold"
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
            className="mt-4 rounded-2xl border border-black/10 dark:border-white/10 overflow-hidden bg-black/5 dark:bg-black/20 hover:border-blue-500/30 transition-all cursor-pointer group/repost"
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
                <span className="text-[10px] text-armoyu-text-muted ml-auto">{repostOf.createdAt}</span>
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
          <div className={`grid gap-1.5 overflow-hidden rounded-2xl border border-black/5 dark:border-white/10 shadow-sm ${displayMedia.length === 1 ? 'grid-cols-1' : displayMedia.length === 2 ? 'grid-cols-2 aspect-[16/9]' : displayMedia.length === 3 ? 'grid-cols-2 aspect-[16/9]' : 'grid-cols-2 aspect-square md:aspect-[16/9]'}`}>
            {displayMedia.slice(0, 4).map((m, idx) => (
              <div 
                key={idx} 
                className={`relative cursor-pointer group bg-black/5 dark:bg-white/5 ${displayMedia.length === 3 && idx === 0 ? 'row-span-2' : ''}`}
                onClick={() => setLightboxIndex(idx)}
              >
                {m.type === 'video' ? (
                   // eslint-disable-next-line jsx-a11y/media-has-caption
                   <video src={m.url} className="w-full h-full object-cover" />
                ) : (
                   <img src={m.url} alt="Medya" className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500" />
                )}
                
                {/* Oynat İkonu (Videolar İçin) */}
                {m.type === 'video' && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-colors z-10">
                    <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center text-white border border-white/30 shadow-lg">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="none"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
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
      {likeList && likeList.length > 0 && (
         <div 
           className="px-6 py-2 flex items-center gap-2.5 bg-black/5 dark:bg-white/2 border-y border-armoyu-card-border/50 transition-all hover:bg-black/10 dark:hover:bg-white/5 cursor-pointer"
           onClick={() => { setInteractionsTab('likes'); setIsInteractionsModalOpen(true); }}
         >
            <div className="flex -space-x-2.5 overflow-hidden">
               {likeList.slice(0, 3).map((l, i) => (
                  <img 
                    key={i} 
                    src={l.avatar} 
                    alt={l.displayName} 
                    className="inline-block h-6 w-6 rounded-full ring-2 ring-armoyu-card-bg bg-armoyu-card-bg object-cover shadow-sm transition-transform hover:scale-110 hover:z-10" 
                    title={l.displayName}
                  />
               ))}
            </div>
            <div className="text-[11px] font-bold text-armoyu-text-muted flex items-center gap-1">
               {likeCount > 0 && (
                 <>
                   <span className="text-armoyu-text">{likeList[0].displayName}</span>
                   {likeCount > 1 && (
                     <>
                        <span>ve</span>
                        <span className="text-armoyu-text">{likeCount - 1} diğer kişi</span>
                     </>
                   )}
                   <span>beğendi</span>
                 </>
               )}
            </div>
         </div>
      )}

      {/* Etkileşim Butonları (Beğeni, Yorum, Paylaş) */}
      <div className="px-5 py-3.5 border-t border-armoyu-card-border flex justify-between items-center bg-black/5 dark:bg-white/5">
        <div className="flex gap-6">
          <div className="flex items-center">
            <button 
              onClick={handleLike}
              className={`flex items-center gap-2 text-sm font-bold transition-colors group ${isLiked ? 'text-blue-500' : 'text-armoyu-text-muted hover:text-blue-500'}`}
            >
               <div className={`p-1.5 rounded-full transition-colors ${isLiked ? 'bg-blue-500/10' : 'group-hover:bg-blue-500/10'}`}>
                 <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-0.5 transition-transform"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path></svg>
               </div>
            </button>
            {likeCount > 0 && (
              <button 
                onClick={() => { setInteractionsTab('likes'); setIsInteractionsModalOpen(true); }}
                className="text-sm font-black text-armoyu-text-muted hover:text-blue-500 transition-colors ml-1 px-1"
              >
                <RollingNumber value={likeCount} />
              </button>
            )}
          </div>
          
          <button 
            onClick={() => setIsCommentOpen(!isCommentOpen)}
            className={`flex items-center gap-2 text-sm font-bold transition-colors group ${isCommentOpen ? 'text-emerald-500' : 'text-armoyu-text-muted hover:text-emerald-500'}`}
            title="Yorum Yap"
          >
             <div className={`p-1.5 rounded-full transition-colors ${isCommentOpen ? 'bg-emerald-500/10' : 'group-hover:bg-emerald-500/10'}`}>
               <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="group-hover:-translate-y-0.5 transition-transform"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
             </div>
             {(stats.comments + commentsList.length + commentsList.reduce((acc, c) => acc + (c.replies?.length || 0), 0)) > 0 && 
              (stats.comments + commentsList.length + commentsList.reduce((acc, c) => acc + (c.replies?.length || 0), 0))}
          </button>

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
            {stats.reposts && stats.reposts > 0 && (
              <button 
                onClick={() => { setInteractionsTab('reposts'); setIsInteractionsModalOpen(true); }}
                className="text-sm font-black text-armoyu-text-muted hover:text-green-500 transition-colors ml-1 px-1"
              >
                {stats.reposts}
              </button>
            )}
          </div>
        </div>
        
        <button className="flex items-center gap-2 text-sm font-bold text-armoyu-text-muted hover:text-purple-500 transition-colors group">
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
               <span className="text-xs font-bold text-blue-500 flex items-center gap-1.5">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 10 20 15 15 20"></polyline><path d="M4 4v7a4 4 0 0 0 4 4h12"></path></svg>
                  <span className="text-armoyu-text-muted">Yanıtlanıyor:</span> @{(() => {
                    const author = commentsList.find(c => c.id === replyingTo)?.author;
                    return typeof author === 'string' ? author : author?.displayName;
                  })()}
               </span>
               <button onClick={() => setReplyingTo(null)} className="text-[11px] font-black uppercase tracking-wider text-armoyu-text-muted hover:text-red-500 transition-colors bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">İptal Et</button>
             </div>
          )}

          {/* Yorum Yapma Girdisi */}
          <div className="flex gap-3 mb-2 animate-in fade-in zoom-in-95 duration-300">
             <img src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"} alt="Sen" className="w-9 h-9 rounded-full bg-white/5 border border-white/10 shrink-0 shadow-sm object-cover" />
             <div className="flex-1 flex items-center bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-3 py-1.5 shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500 transition-all">
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
                  className="p-2 ml-2 text-blue-500 disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed hover:bg-blue-500/10 rounded-xl transition-colors shrink-0"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                </button>
             </div>
          </div>

          {/* Local State'e Eklenen Yorumlar ve Yanıtlar (Nested Comments Thread) */}
          {commentsList.length > 0 && (
            <div className="space-y-4 mt-5 px-1">
              {commentsList.map((c) => (
                <div key={c.id} className="animate-in fade-in slide-in-from-left-2 zoom-in-95 duration-500">
                  
                  {/* Ana Yorum */}
                  <div className="flex gap-3">
                    <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${typeof c.author === 'string' ? c.author : c.author?.displayName}`} alt={typeof c.author === 'string' ? c.author : c.author?.displayName} className="w-8 h-8 rounded-full bg-white/5 border border-black/10 dark:border-white/10 shrink-0 mt-1 shadow-sm" />
                    <div className="flex-1">
                      <div className="bg-armoyu-drawer-bg border border-gray-200 dark:border-white/5 rounded-2xl rounded-tl-sm px-4 py-2 shadow-sm inline-block min-w-[30%]">
                        <div className="text-xs font-black text-armoyu-text mb-0.5">{typeof c.author === 'string' ? c.author : c.author?.displayName}</div>
                        <div className="text-sm font-medium text-armoyu-text-muted">{c.text || c.content}</div>
                      </div>
                      <div className="flex items-center gap-4 mt-1.5 ml-2 text-[11px] font-bold text-armoyu-text-muted">
                         <span className="hover:text-blue-500 cursor-pointer transition-colors">Beğen</span>
                         <span onClick={() => { setReplyingTo(c.id); setCommentText(''); }} className="hover:text-blue-500 cursor-pointer transition-colors">Yanıtla</span>
                         <span className="opacity-50">{c.date || c.createdAt}</span>
                      </div>
                    </div>
                  </div>

                  {/* Alt Yorumlar (Replies Loop) */}
                  {c.replies && c.replies.length > 0 && (
                    <div className="mt-3 ml-11 space-y-3 border-l-2 border-black/10 dark:border-white/10 pl-4">
                      {c.replies.map(r => (
                        <div key={r.id} className="flex gap-2.5 animate-in fade-in slide-in-from-left-2 duration-300">
                          <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${typeof r.author === 'string' ? r.author : r.author?.displayName}`} alt={typeof r.author === 'string' ? r.author : r.author?.displayName} className="w-6 h-6 rounded-full bg-white/5 border border-black/10 dark:border-white/10 shrink-0 mt-0.5 shadow-sm relative -left-[27px] ring-4 ring-black/5 dark:ring-[#0a0a0e]/60" />
                          <div className="flex-1 -ml-[18px]">
                            <div className="bg-armoyu-drawer-bg border border-gray-200 dark:border-white/5 rounded-2xl rounded-tl-sm px-3.5 py-1.5 shadow-sm inline-block">
                              <span className="text-xs font-black text-armoyu-text mr-2">{typeof r.author === 'string' ? r.author : r.author?.displayName}</span>
                              <span className="text-[13px] font-medium text-armoyu-text-muted">{r.text || r.content}</span>
                            </div>
                            <div className="flex items-center gap-4 mt-1 ml-2 text-[10px] font-bold text-armoyu-text-muted">
                               <span className="hover:text-blue-500 cursor-pointer transition-colors">Beğen</span>
                               <span onClick={() => { setReplyingTo(c.id); setCommentText(''); }} className="hover:text-blue-500 cursor-pointer transition-colors">Yanıtla</span>
                               <span className="opacity-50">{r.date || r.createdAt}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Repost Modal Popup */}
      <RepostModal 
        isOpen={isRepostModalOpen} 
        onClose={() => setIsRepostModalOpen(false)} 
        post={{ id, author, content, media, createdAt, stats }} 
      />

      {/* Interactions Modal Popup (Likes/Reposts List) */}
      <PostInteractionsModal
        isOpen={isInteractionsModalOpen}
        onClose={() => setIsInteractionsModalOpen(false)}
        title={interactionsTab === 'likes' ? 'Beğenenler' : 'Paylaşanlar'}
        likes={likeList}
        reposts={repostList}
        defaultTab={interactionsTab}
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

    </div>
  );
}

