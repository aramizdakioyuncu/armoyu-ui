'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  SocialSidebar,
  NewMembersWidget,
  Stories,
  PostCard,
  postList,
  SocialFeed,
  PostComposer,
  CloudModal,
  useAuth,
  SocialFeedRef
} from '../../index';
import { TrendingWidget } from '../modules/social/widgets/TrendingWidget';
import { useArmoyu } from '../../context/ArmoyuContext';
import { RefreshCcw, Wifi, WifiOff, Settings2 } from 'lucide-react';

export function SocialTab() {
  const { apiKey, api, isMockEnabled, setMockEnabled } = useArmoyu();
  const { user } = useAuth();
  const [isPosting, setIsPosting] = useState(false);
  const [isCloudOpen, setIsCloudOpen] = useState(false);
  const [attachments, setAttachments] = useState<{ url: string; type: 'image' | 'video' | 'audio' }[]>([]);
  const feedRef = React.useRef<SocialFeedRef>(null);

  // useLive is inverse of isMockEnabled
  const useLive = !isMockEnabled;

  const handleToggleMode = () => {
    if (isMockEnabled && (!apiKey || apiKey === 'armoyu_showcase_key')) {
      alert("Canlı akış verilerini çekebilmek için lütfen Dev Tools panelinden geçerli bir API Anahtarı giriniz.");
      return;
    }
    setMockEnabled(!isMockEnabled);
    
    // If we just switched to live, trigger a refresh
    if (isMockEnabled) {
      setTimeout(() => feedRef.current?.refresh(), 100);
    }
  };

  const displayPosts = useLive ? [] : postList.slice(0, 3);

  return (
    <div className="space-y-8 animate-in fade-in duration-700">
      <CloudModal 
        isOpen={isCloudOpen} 
        onClose={() => setIsCloudOpen(false)} 
        isSelectionMode={true}
        onSelectMedia={(media) => {
          setAttachments(prev => [...prev, media]);
          setIsCloudOpen(false);
        }}
      />


      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <aside className="lg:col-span-3 hidden lg:block">
          <SocialSidebar />
        </aside>
        <div className="lg:col-span-6">
          <div className="max-w-3xl mx-auto space-y-8">
            <Stories />

            <PostComposer 
              user={user}
              isPosting={isPosting}
              onOpenCloudGallery={() => setIsCloudOpen(true)}
              attachments={attachments}
              onRemoveAttachment={(index) => setAttachments(prev => prev.filter((_, i) => i !== index))}
              onPost={async (content, mediaUrls) => {
                if (useLive) {
                  setIsPosting(true);
                  try {
                    const result = await api.social.createPost(content, []);
                    if (result.durum === 1) {
                      setAttachments([]);
                      feedRef.current?.refresh();
                    } else {
                      alert(result.aciklama || "Paylaşım başarısız.");
                    }
                  } catch (err) {
                    console.error("Post error:", err);
                    alert("Canlı paylaşım hatası!");
                  } finally {
                    setIsPosting(false);
                  }
                } else {
                  console.log("Mock Post Created:", content, mediaUrls);
                  alert("Showcase (Mock): " + content + (mediaUrls?.length ? ` [${mediaUrls.length} Medya]` : ''));
                }
              }}
            />
            
            <div className="space-y-6">
              {useLive ? (
                <SocialFeed 
                  ref={feedRef}
                  emptyMessage="Henüz yayınlanmış bir gönderi yok."
                />
              ) : (
                <div className="flex flex-col gap-6">
                  {displayPosts.map((post: any) => (
                    <PostCard
                      key={post.id}
                      {...post}
                      author={post.owner || post.author}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
        <aside className="lg:col-span-3 hidden lg:flex flex-col gap-6">
           <NewMembersWidget />
           <TrendingWidget />
        </aside>
      </div>
    </div>
  );
}

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(' ');
}
