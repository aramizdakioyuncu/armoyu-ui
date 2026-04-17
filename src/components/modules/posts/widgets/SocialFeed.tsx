'use client';

import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useSocket } from '../../../../context/SocketContext';
import { PostCard, PostCardProps } from './PostCard';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import { mapApiPostToCardProps } from '../../../../lib/utils/postUtils';
import { RefreshCcw, FileX } from 'lucide-react';

export interface SocialFeedProps {
  category?: string;
  categoryDetail?: string | number;
  initialPosts?: PostCardProps[];
  profilePrefix?: string;
  emptyMessage?: string;
  autoFetch?: boolean;
  live?: boolean; // NEW: Support live socket updates
  className?: string;
}

export interface SocialFeedRef {
  refresh: () => Promise<void>;
  loadMore: () => Promise<void>;
  reset: () => void;
  prependPost: (post: PostCardProps) => void;
}

export const SocialFeed = forwardRef<SocialFeedRef, SocialFeedProps>((props, ref) => {
  const {
    category,
    categoryDetail,
    initialPosts = [],
    profilePrefix,
    emptyMessage = 'Henüz bir paylaşım bulunamadı.',
    autoFetch = true,
    live = false,
    className = ''
  } = props;

  const { api } = useArmoyu();
  const { user: currentUser } = useAuth();
  const { on } = useSocket();
  
  const [posts, setPosts] = useState<PostCardProps[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (isLoadMore = false, forcePage?: number) => {
    // Auth Guard: Only fetch if we have a user
    if (!currentUser) {
      setError("Paylaşımları görmek için giriş yapmalısınız.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const targetPage = forcePage ?? (isLoadMore ? page + 1 : 1);
      const limit = 20; // Default limit for pagination
      const params = { 
        limit,
        category, 
        categoryDetail: categoryDetail?.toString() 
      };
      
      const response = await api.social.getPosts(targetPage, params);
      
      if (response.durum !== 1) {
        throw new Error(response.aciklama || "Paylaşımlar yüklenemedi.");
      }

      // Standardize response into array
      const rawPosts = Array.isArray(response.icerik) ? response.icerik : (response.icerik ? [response.icerik] : []);
      const mappedPosts = rawPosts.map(mapApiPostToCardProps);

      if (isLoadMore) {
        setPosts(prev => {
          // Prevent duplicates by checking IDs
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewPosts = mappedPosts.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPosts];
        });
      } else {
        setPosts(mappedPosts);
      }

      setPage(targetPage);
      setHasMore(mappedPosts.length >= limit); // If we got fewer than limit, there probably isn't more
    } catch (err: any) {
      console.error('[SocialFeed] Fetch error:', err);
      setError(err.message || "İçerik yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [api, currentUser, category, categoryDetail, page]);

  // Live Socket Listeners
  useEffect(() => {
    if (!live) return;

    const offPost = on('post', (data: any) => {
      const newPost = mapApiPostToCardProps(data);
      setPosts(prev => {
        if (prev.some(p => p.id === newPost.id)) return prev;
        return [newPost, ...prev];
      });
    });

    const offLike = on('post_like', (data: { postId: string; newCount: number }) => {
      const { postId, newCount } = data;
      setPosts(prev => prev.map(p => {
        if (p.id === postId) {
          return { ...p, stats: { ...p.stats, likes: newCount } };
        }
        return p;
      }));
    });

    const offDelete = on('post_delete', (data: { postId: string }) => {
      const { postId } = data;
      setPosts(prev => prev.filter(p => p.id !== postId));
    });

    return () => {
      offPost();
      offLike();
      offDelete();
    };
  }, [live, on]);

  // Expose methods to parent (The "Object Oriented" part)
  useImperativeHandle(ref, () => ({
    refresh: () => fetchPosts(false, 1),
    loadMore: () => fetchPosts(true),
    reset: () => {
      setPosts([]);
      setPage(1);
      setHasMore(true);
      setError(null);
    },
    prependPost: (post: PostCardProps) => {
      setPosts(prev => [post, ...prev]);
    }
  }));

  useEffect(() => {
    if (autoFetch) {
      setPosts([]); // Clear previous content when category changes
      fetchPosts(false, 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoryDetail, currentUser, autoFetch]);

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Content Area */}
      <div className="flex flex-col gap-6">
        {loading && posts.length === 0 ? (
          <div className="py-20 flex flex-col items-center gap-4 opacity-50">
            <RefreshCcw size={32} className="animate-spin text-blue-500" />
            <span className="text-xs font-black uppercase tracking-widest text-armoyu-text">Akış Güncelleniyor...</span>
          </div>
        ) : posts.length > 0 ? (
          <>
            {posts.map((post) => (
              <PostCard 
                key={post.id} 
                {...post} 
                profilePrefix={profilePrefix}
              />
            ))}
            
            {hasMore && (
              <div className="flex justify-center mt-6">
                <button
                  onClick={() => fetchPosts(true)}
                  disabled={loading}
                  className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700/50 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl shadow-blue-600/20 active:scale-95 flex items-center gap-3"
                >
                  {loading ? <RefreshCcw size={14} className="animate-spin" /> : <RefreshCcw size={14} />}
                  {loading ? 'YÜKLENİYOR...' : 'DAHA FAZLA GÖSTER'}
                </button>
              </div>
            )}
          </>
        ) : !loading && (
          <div className="py-20 text-center border-2 border-dashed border-white/5 rounded-[40px] opacity-40">
            <div className="mb-4 flex justify-center text-armoyu-text-muted">
              <FileX size={48} strokeWidth={1} />
            </div>
            <p className="text-xs font-black uppercase tracking-widest text-armoyu-text">{error ? 'BİR HATA OLUŞTU' : emptyMessage}</p>
            {error && <p className="text-[10px] font-bold text-red-500 mt-2 italic">{error}</p>}
          </div>
        )}
      </div>
    </div>
  );
});

SocialFeed.displayName = 'SocialFeed';
