'use client';

import React, { useState, useEffect, useCallback, useImperativeHandle, forwardRef } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useSocket } from '../../../../context/SocketContext';
import { PostCard, PostCardProps } from './PostCard';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import { mapApiPostToCardProps } from '../../../../lib/utils/postUtils';
import { RefreshCcw, FileX, X } from 'lucide-react';

export interface SocialFeedProps {
  category?: string;
  categoryDetail?: string | number;
  userId?: number;
  username?: string;
  feature?: string;
  initialPosts?: PostCardProps[];
  profilePrefix?: string;
  emptyMessage?: string;
  autoFetch?: boolean;
  live?: boolean; 
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
    userId,
    username,
    feature,
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
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const activeTag = searchParams.get('tag');
  
  const [posts, setPosts] = useState<PostCardProps[]>(initialPosts);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchPosts = useCallback(async (isLoadMore = false, forcePage?: number) => {
    console.log(`[SocialFeed] Fetching posts for:`, { username, userId, feature, category, tag: activeTag, page: forcePage ?? (isLoadMore ? page + 1 : 1) });

    setLoading(true);
    setError(null);

    try {
      const targetPage = forcePage ?? (isLoadMore ? page + 1 : 1);
      const limit = 20;
      
      const response = await api.social.getPosts(targetPage, limit, { 
        userId: userId ? Number(userId) : undefined, 
        username, 
        filter: activeTag ? `tag:${activeTag}` : feature 
      });
      
      if (response.durum !== 1) {
        throw new Error(response.aciklama || "Paylaşımlar yüklenemedi.");
      }

      const rawPosts = Array.isArray(response.icerik) ? response.icerik : (response.icerik ? [response.icerik] : []);
      const mappedPosts = rawPosts.map(mapApiPostToCardProps);

      if (isLoadMore) {
        setPosts(prev => {
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNewPosts = mappedPosts.filter(p => !existingIds.has(p.id));
          return [...prev, ...uniqueNewPosts];
        });
      } else {
        setPosts(mappedPosts);
      }

      setPage(targetPage);
      setHasMore(mappedPosts.length >= limit);
    } catch (err: any) {
      console.error('[SocialFeed] Fetch error:', err);
      setError(err.message || "İçerik yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [api, currentUser, category, categoryDetail, userId, username, feature, page, activeTag]);

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
    if (autoFetch && currentUser) {
      setPosts([]);
      fetchPosts(false, 1);
    } else if (!currentUser) {
      setPosts([]);
      setHasMore(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category, categoryDetail, userId, username, feature, currentUser, autoFetch, activeTag]);

  const clearFilter = () => {
    router.push('/?tab=sosyal');
  };

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
