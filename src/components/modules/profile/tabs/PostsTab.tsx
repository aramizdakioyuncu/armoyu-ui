'use client';

import React, { useState, useEffect } from 'react';
import { PostCard } from '../../posts/widgets/PostCard';
import { User } from '@/models/auth/User';
import { Post } from '@/models/social/feed/Post';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import { SocialFeed, SocialFeedRef } from '../../../../index';

interface PostsTabProps {
  user: User | null;
}

export function PostsTab({ user }: PostsTabProps) {
  const { api } = useArmoyu();
  const { user: currentUser } = useAuth();
  const [newPostContent, setNewPostContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const feedRef = React.useRef<SocialFeedRef>(null);

  const handleCreatePost = async () => {
    if (!newPostContent.trim() || isPublishing) return;

    setIsPublishing(true);
    try {
      const response = await api.social.createPost(newPostContent);
      if (response) {
        setNewPostContent('');
        feedRef.current?.refresh(); // Refresh feed using the centralized component's method
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

      <SocialFeed 
        ref={feedRef}
        category="oyuncu"
        categoryDetail={user?.id}
        emptyMessage={isOwnProfile ? 'Profilini canlandırmak için ilk gönderini hemen paylaş!' : 'Bu kullanıcı henüz bir şey paylaşmamış.'}
      />
    </div>
  );
}
