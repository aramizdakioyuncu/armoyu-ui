'use client';

import React, { useState, useEffect } from 'react';
import { PostCard } from '../../auth/PostCard';
import { User, Post } from '@armoyu/core';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';

interface PostsTabProps {
  user: User | null;
}

export function PostsTab({ user }: PostsTabProps) {
  const { api } = useArmoyu();
  const { user: currentUser } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [newPostContent, setNewPostContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const fetchPosts = async (isLoadMore = false) => {
    if (!user?.id) return;
    setLoading(true);
    try {
      const targetPage = isLoadMore ? page + 1 : 1;
      // Fetch posts for specific user
      console.log(`[PostsTab] Veri çekiliyor... Kullanıcı ID: ${user.id}, Sayfa: ${targetPage}`);
      const data = await api.social.getPosts(targetPage, {
        category: 'oyuncu',
        categoryDetail: user.id
      });

      const lastRaw = (api as any).lastResponse;
      console.log("[PostsTab] Ham Yanıt/Raw Response:", lastRaw);

      if (Array.isArray(data)) {
        // Map core Post model to UI PostCard props
        const mappedPosts = data.map((p: any) => ({
          ...p,
          id: p.id?.toString() || p.postID?.toString() || '',
          author: p.author || p.owner || null,
          content: p.content || p.paylasimicerik || '',
          media: p.media || p.paylasimfoto || [],
          createdAt: p.createdAt || p.paylasimzaman || 'Şimdi',
          stats: {
            likes: p.stats?.likes ?? p.likesCount ?? p.begenisay ?? 0,
            comments: p.stats?.comments ?? p.commentsCount ?? p.yorumsay ?? 0,
            reposts: p.stats?.reposts ?? p.repostsay ?? 0,
            shares: p.stats?.shares ?? p.sikayetsay ?? 0
          }
        }));
        
        console.log(`[PostsTab] ${mappedPosts.length} gönderi başarıyla çekildi ve işlendi.`);
        if (isLoadMore) {
          setPosts(prev => [...prev, ...mappedPosts]);
        } else {
          setPosts(mappedPosts);
        }
        setPage(targetPage);
        setHasMore(mappedPosts.length > 0);
      } else {
         console.log("[PostsTab] Veri bir dizi (array) olarak gelmedi.");
      }
    } catch (error) {
      console.error('[PostsTab] Gönderiler çekilirken hata oluştu:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.id, api]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || isPublishing) return;

    setIsPublishing(true);
    try {
      const response = await api.social.createPost(newPostContent);
      if (response) {
        setNewPostContent('');
        await fetchPosts(false); // Refresh feed
      }
    } catch (error) {
      console.error('Failed to create post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const isOwnProfile = currentUser?.username === user?.username;

  return (
    <div className="space-y-6">
      {/* Create Post Input (Only on own profile) */}
      {isOwnProfile && (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 shadow-sm group focus-within:border-blue-500/50 transition-all">
          <div className="flex gap-4">
            <img
              src={user?.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=Berkay"}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 shrink-0 object-cover"
              alt="Avatar"
            />
            <div className="flex-1 space-y-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="Neler oluyor? Bir şeyler paylaş..."
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted resize-none min-h-[60px] pt-2"
              />
              <div className="flex justify-end pt-2 border-t border-armoyu-card-border/50">
                <button
                  onClick={handleCreatePost}
                  disabled={!newPostContent.trim() || isPublishing}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                >
                  {isPublishing ? (
                    <>
                      <div className="w-3 h-3 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                      Yayınlanıyor
                    </>
                  ) : 'Paylaş'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {loading ? (
        <div className="space-y-6">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 h-64 animate-pulse">
              <div className="flex gap-4 mb-4">
                <div className="w-12 h-12 bg-black/5 dark:bg-white/5 rounded-full" />
                <div className="space-y-2 flex-1">
                  <div className="w-24 h-4 bg-black/5 dark:bg-white/5 rounded" />
                  <div className="w-16 h-3 bg-black/5 dark:bg-white/5 rounded" />
                </div>
              </div>
              <div className="w-full h-32 bg-black/5 dark:bg-white/5 rounded-2xl" />
            </div>
          ))}
        </div>
      ) : (
        <>
          {posts.map(post => (
            <PostCard key={post.id} {...post} />
          ))}

          {posts.length === 0 && (
            <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] py-20 text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mx-auto mb-6 relative z-10">
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
              </div>
              <h3 className="text-xl font-bold text-armoyu-text mb-2 uppercase italic relative z-10">Henüz bir paylaşım yok</h3>
              <p className="text-armoyu-text-muted text-sm max-w-xs mx-auto italic font-medium relative z-10">
                {isOwnProfile ? 'Profilini canlandırmak için ilk gönderini hemen paylaş!' : 'Bu kullanıcı henüz bir şey paylaşmamış.'}
              </p>
            </div>
          )}

          {posts.length > 0 && hasMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={() => fetchPosts(true)}
                disabled={loading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
              >
                {loading ? (
                  <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> YÜKLENİYOR...</>
                ) : "DAHA FAZLA GÖSTER"}
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
