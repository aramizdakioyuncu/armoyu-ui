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
  const [loading, setLoading] = useState(true);
  const [activeStoryIndex, setActiveStoryIndex] = useState<number | null>(null);

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
        setLoading(false);
        return;
      }

      const response = await api.stories.getStories();
      if (response.durum === 1 && response.icerik) {
        const mappedStories = response.icerik.map((s: any) => Story.fromAPI(s));
        
        // Mevcut kullanıcının hikayesi var mı bak?
        const myStoryIndex = mappedStories.findIndex((s: any) => s.author?.username === currentUser?.username);
        
        let finalStories = [...mappedStories];
        
        // Eğer benim hikayem yoksa, en başa bir "Hikaye Ekle" dairesi ekleyelim
        if (myStoryIndex === -1 && currentUser) {
          const addStoryItem = new Story({
            id: 'add-story',
            author: new StoryAuthor({
              username: currentUser.username,
              displayName: currentUser.displayName,
              avatar: currentUser.avatar,
              isMe: true
            }),
            isRead: true,
            media: ''
          });
          finalStories = [addStoryItem, ...finalStories];
        } else if (myStoryIndex > 0) {
          // Eğer benim hikayem varsa ama en başta değilse, en başa taşıyalım
          const myStory = finalStories.splice(myStoryIndex, 1)[0];
          finalStories = [myStory, ...finalStories];
        }

        setStories(finalStories);
      } else {
        setStories(MOCK_STORIES);
      }
    } catch (error) {
      console.error('[ARMOYU] Stories fetch error:', error);
      setStories(MOCK_STORIES);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStories();
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
            onClick={() => {
              if (story.id === 'add-story') {
                setIsCloudOpen(true);
                return;
              }
              setActiveStoryIndex(idx);
            }}
          />
        ))}
      </div>

      {activeStoryIndex !== null && (
        <StoryOverlay
          stories={stories.filter(s => s.id !== 'add-story')}
          initialStoryIndex={stories[activeStoryIndex].id === 'add-story' ? 0 : stories.filter(s => s.id !== 'add-story').findIndex(s => s.id === stories[activeStoryIndex].id)}
          onClose={() => setActiveStoryIndex(null)}
          onAddStory={() => {
             setActiveStoryIndex(null);
             setIsCloudOpen(true);
          }}
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
      <div className={`p-0.5 rounded-full border-2 ${story.isRead ? 'border-gray-300 dark:border-white/10' : 'border-blue-500'} transition-all group-hover:scale-105 active:scale-95`}>
        <div className="w-14 h-14 rounded-full border border-white/10 overflow-hidden relative">
          <img src={story.author?.avatar} className="w-full h-full object-cover" alt="" />
          {isMe && (
            <div className="absolute bottom-0 right-0 w-4 h-4 bg-blue-500 rounded-full border-2 border-armoyu-card-bg flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="4"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
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
