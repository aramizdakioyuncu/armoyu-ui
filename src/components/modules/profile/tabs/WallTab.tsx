'use client';

import React, { useState } from 'react';
import { SocialFeed, SocialFeedRef } from '../../../../index';
import { User } from '@/models/auth/User';
import { useAuth } from '../../../../context/AuthContext';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { RefreshCcw } from 'lucide-react';

interface WallTabProps {
  user: User | null;
}

export function WallTab({ user }: WallTabProps) {
  const { user: currentUser } = useAuth();
  const { api } = useArmoyu();
  const [newPostContent, setNewPostContent] = useState('');
  const [isPublishing, setIsPublishing] = useState(false);
  const feedRef = React.useRef<SocialFeedRef>(null);

  if (!user) return null;

  const handleCreateWallPost = async () => {
    if (!newPostContent.trim() || isPublishing) return;

    setIsPublishing(true);
    try {
      // For now, we use standard createPost. 
      // If we want it to specifically target this user's wall in the backend, 
      // the backend should support category/categoryDetail in sosyal/olustur.
      // But per user request, we focus on the "UI feeling" of a wall.
      const response = await api.social.createPost(newPostContent);
      if (response.durum === 1) {
        setNewPostContent('');
        feedRef.current?.refresh();
      }
    } catch (error) {
      console.error('Failed to create wall post:', error);
    } finally {
      setIsPublishing(false);
    }
  };

  const isOwnProfile = currentUser?.username === user.username;

  return (
    <div className="space-y-6 animate-in fade-in duration-700">
      {/* Wall Post Input */}
      {currentUser && (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-5 shadow-sm group focus-within:border-blue-500/50 transition-all">
          <div className="flex gap-4">
            <img
              src={currentUser.avatar || "https://api.dicebear.com/7.x/avataaars/svg?seed=User"}
              className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 shrink-0 object-cover border border-white/10"
              alt="My Avatar"
            />
            <div className="flex-1 space-y-4">
              <textarea
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder={isOwnProfile ? "Duvarına bir şeyler yaz..." : `${user.getName()} kişisinin duvarına bir şeyler yaz...`}
                className="w-full bg-transparent border-none outline-none text-sm font-medium text-armoyu-text placeholder:text-armoyu-text-muted resize-none min-h-[80px] pt-2"
              />
              <div className="flex justify-end pt-2 border-t border-armoyu-card-border/50">
                <button
                  onClick={handleCreateWallPost}
                  disabled={!newPostContent.trim() || isPublishing}
                  className="bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-xl shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2"
                >
                  {isPublishing ? <RefreshCcw size={12} className="animate-spin" /> : 'Paylaş'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}


      {/* SocialFeed removed per user request for now */}
    </div>
  );
}
