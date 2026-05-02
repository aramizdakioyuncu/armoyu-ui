import React, { useState, useEffect } from 'react';
import { MOCK_STORIES } from '../../../../lib/constants/seedData';
import { StoryOverlay } from './StoryOverlay';
import { CloudModal } from '../../cloud/CloudModal';
import { AddStoryModal } from './AddStoryModal';
import { Story } from '../../../../models/social/feed/Story';
import { StoryAuthor } from '../../../../models/social/feed/StoryAuthor';
import { useAuth } from '../../../../context/AuthContext';
import { useArmoyu } from '../../../../context/ArmoyuContext';

export function Stories() {
  const { api, isMockEnabled } = useArmoyu();
  const { user: currentUser } = useAuth();
  const [stories, setStories] = useState<Story[]>([]);
  const [myStories, setMyStories] = useState<Story[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);
  const [showMyOverlay, setShowMyOverlay] = useState(false);

  // Modals state
  const [isCloudOpen, setIsCloudOpen] = useState(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [selectedMedia, setSelectedMedia] = useState<{ url: string; type: 'image' | 'video' | 'audio' } | null>(null);
  const [shareLoading, setShareLoading] = useState(false);

  const fetchStories = async () => {
    setLoading(true);
    try {
      if (isMockEnabled) {
        setStories(MOCK_STORIES);
        setMyStories([]);
        setLoading(false);
        return;
      }

      const response = await api.stories.getStories();
      if (response.durum === 1 && response.icerik) {
        const mappedStories = response.icerik.map((s: any) => Story.fromAPI(s));
        
        // Benim hikayelerimi ve diğerlerini ayır (authorId ile currentUser.id karşılaştır)
        const currentUserId = Number(currentUser?.id || 0);
        const mine: Story[] = [];
        const others: Story[] = [];
        
        for (const s of mappedStories) {
          if (
            (s.author?.id && s.author.id === currentUserId) ||
            s.author?.isMe === true
          ) {
            mine.push(s);
          } else {
            others.push(s);
          }
        }

        setMyStories(mine);

        // "Ben" öğesi: her zaman en başta
        const meItem = new Story({
          id: 'me-story',
          author: new StoryAuthor({
            username: currentUser?.username || '',
            displayName: currentUser?.displayName || '',
            avatar: currentUser?.avatar || '',
            isMe: true
          }),
          isRead: false, // mavi kenarlık için her zaman false
          media: mine.length > 0 ? mine[0].media : '',
        });

        // Ben en başta, sonra diğerleri
        setStories([meItem, ...others]);
      } else {
        setStories(MOCK_STORIES);
        setMyStories([]);
      }
    } catch (error) {
      console.error('[ARMOYU] Stories fetch error:', error);
      setStories(MOCK_STORIES);
      setMyStories([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser || isMockEnabled) {
      fetchStories();
    } else {
      setStories([]);
      setLoading(false);
    }
  }, [api, isMockEnabled, currentUser]);

  const handleMediaSelect = (media: { url: string; type: 'image' | 'video' | 'audio' }) => {
    setSelectedMedia(media);
    setIsCloudOpen(false);
    setIsShareModalOpen(true);
  };

  const handleShare = async (text: string) => {
    if (!selectedMedia) return;
    setShareLoading(true);
    try {
      const response = await api.stories.addStory(selectedMedia.url, text);
      if (response.durum === 1) {
        setIsShareModalOpen(false);
        setSelectedMedia(null);
        fetchStories();
      } else {
        alert(response.aciklama || 'Paylaşım başarısız.');
      }
    } catch (err) {
      console.error('[Stories] Share error:', err);
      alert('Bir hata oluştu.');
    } finally {
      setShareLoading(false);
    }
  };

  const handleStoryClick = (story: Story, idx: number) => {
    if (story.id === 'me-story') {
      // "Ben"'e tıklandı
      if (myStories.length > 0) {
        // Benim hikayelerim var → StoryOverlay aç (sadece benim hikayelerimle)
        setShowMyOverlay(true);
      } else {
        // Hikayeleri yok → CloudModal aç
        setIsCloudOpen(true);
      }
      return;
    }
    // Diğer kullanıcıların hikayesi → normal overlay
    setActiveStoryIndex(idx);
  };

  const handleAddStoryFromOverlay = () => {
    console.log('[ARMOYU] Transitioning from Overlay to Cloud...');
    setShowMyOverlay(false);
    setActiveStoryIndex(null);
    setIsCloudOpen(true);
  };

  // Diğer kullanıcıların hikayeleri (overlay için)
  const otherStories = stories.filter(s => s.id !== 'me-story');

  if (loading && stories.length === 0) {
    return (
      <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm overflow-hidden mb-6 flex gap-4 animate-pulse">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex flex-col items-center gap-2 shrink-0">
            <div className="w-14 h-14 rounded-full bg-gray-200 dark:bg-white/5" />
            <div className="h-2 w-10 bg-gray-200 dark:bg-white/5 rounded" />
          </div>
        ))}
      </div>
    );
  }

  if (stories.length === 0) return null;

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-4 shadow-sm overflow-hidden mb-6">
      <div className="flex gap-4 overflow-x-auto no-scrollbar pb-1 px-1">
        {stories.map((story, idx) => (
          <StoryItem
            key={story.id || idx}
            story={story}
            onClick={() => handleStoryClick(story, idx)}
          />
        ))}
      </div>

      {/* Benim hikayelerim için overlay */}
      {showMyOverlay && myStories.length > 0 && (
        <StoryOverlay
          stories={myStories}
          initialStoryIndex={0}
          onClose={() => setShowMyOverlay(false)}
          onAddStory={handleAddStoryFromOverlay}
        />
      )}

      {/* Diğer kullanıcıların hikayeleri için overlay */}
      {activeStoryIndex !== null && (
        <StoryOverlay
          stories={otherStories}
          initialStoryIndex={otherStories.findIndex(s => s.id === stories[activeStoryIndex]?.id)}
          onClose={() => setActiveStoryIndex(null)}
          onAddStory={handleAddStoryFromOverlay}
        />
      )}

      <CloudModal 
        isOpen={isCloudOpen} 
        onClose={() => setIsCloudOpen(false)}
        isSelectionMode={true}
        onSelectMedia={handleMediaSelect}
      />

      <AddStoryModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        media={selectedMedia}
        onShare={handleShare}
        loading={shareLoading}
      />
    </div>
  );
}

function StoryItem({ story, onClick }: { story: Story, onClick: () => void }) {
  const isMe = story.author?.isMe || false;

  return (
    <div 
      className="flex flex-col items-center gap-1.5 shrink-0 cursor-pointer group"
      onClick={onClick}
    >
      <div className={`p-0.5 rounded-full border-2 ${isMe ? 'border-armoyu-primary' : story.isRead ? 'border-gray-300 dark:border-white/10' : 'border-armoyu-primary'} transition-all group-hover:scale-105 active:scale-95`}>
        <div className="w-14 h-14 rounded-full border border-white/10 overflow-hidden relative">
          {story.author?.avatar ? (
            <img src={story.author.avatar} className="w-full h-full object-cover" alt="" />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-armoyu-primary to-purple-600 flex items-center justify-center text-white font-bold text-lg">
              {(story.author?.displayName || '?')[0]}
            </div>
          )}
          {isMe && (
            <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors flex items-center justify-center">
               <div className="absolute bottom-0 right-0 w-5 h-5 bg-armoyu-primary rounded-full border-2 border-[#121212] flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
               </div>
            </div>
          )}
        </div>
      </div>
      <span className="text-[10px] text-armoyu-text-secondary truncate w-14 text-center">
        {isMe ? 'Ben' : story.author?.displayName || story.author?.username}
      </span>
    </div>
  );
}
