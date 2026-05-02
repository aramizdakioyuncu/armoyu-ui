'use client';

import React, { useState, useEffect } from 'react';
import { Story } from '../../../../models/social/feed/Story';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';
import dynamic from 'next/dynamic';

const Plyr = dynamic(() => import('plyr-react').then((mod) => mod.Plyr), { 
  ssr: false,
  loading: () => <div className="w-full h-full bg-black/40 animate-pulse flex items-center justify-center text-white/20 font-black italic">YÜKLENİYOR...</div>
});

interface StoryOverlayProps {
  stories: Story[];
  initialStoryIndex: number;
  onClose: () => void;
  onAddStory?: () => void;
}

export function StoryOverlay({ stories, initialStoryIndex, onClose, onAddStory }: StoryOverlayProps) {
  const { api } = useArmoyu();
  const { user: currentUser } = useAuth();
  const [currentStoryIdx, setCurrentStoryIdx] = useState(initialStoryIndex);
  const [currentItemIdx, setCurrentItemIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const [mounted, setMounted] = useState(false);
  const [lastUpdate, setLastUpdate] = useState(0);
  const [showViewers, setShowViewers] = useState(false);
  const [viewers, setViewers] = useState<any[]>([]);
  const [loadingViewers, setLoadingViewers] = useState(false);

  const story = stories[currentStoryIdx];
  const isMe = (story?.author?.id && currentUser?.id) 
    ? String(story.author.id) === String(currentUser.id) 
    : (story?.author?.isMe || false);
  
  const items = story?.items || [];
  const currentItem = items[currentItemIdx];
  const currentMedia = currentItem?.media || story?.media || '';
  const currentTimestamp = currentItem?.timestamp || story?.timestamp || '';

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Mark story as viewed
  useEffect(() => {
    const targetItem = items[currentItemIdx];
    if (mounted && targetItem?.id && !targetItem.isRead) {
      api.stories.viewStory(Number(targetItem.id)).then(() => {
        targetItem.isRead = true;
        setLastUpdate(Date.now());
      }).catch(err => {
        console.error('[ARMOYU] Failed to mark story as viewed:', err);
      });
    }
  }, [currentStoryIdx, currentItemIdx, mounted]);

  // Handle auto-next with progress
  useEffect(() => {
    if (!mounted || showViewers) return;

    setProgress(0);
    const duration = 5000;
    const interval = 50;
    const step = (interval / duration) * 100;

    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 100; // Stop here, useEffect below will handle transition
        }
        return prev + step;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentStoryIdx, currentItemIdx, mounted, showViewers]);

  // Separate effect to handle transitions to avoid "update while rendering" error
  useEffect(() => {
    if (progress >= 100) {
      handleNext();
    }
  }, [progress]);

  const handleNext = () => {
    if (currentItemIdx < items.length - 1) {
      setCurrentItemIdx(prev => prev + 1);
      setProgress(0);
      return;
    }
    if (currentStoryIdx < stories.length - 1) {
      setCurrentStoryIdx(prev => prev + 1);
      setCurrentItemIdx(0);
      setProgress(0);
    } else {
      onClose();
    }
  };

  const handlePrev = () => {
    if (currentItemIdx > 0) {
      setCurrentItemIdx(prev => prev - 1);
      setProgress(0);
      return;
    }
    if (currentStoryIdx > 0) {
      const prevStory = stories[currentStoryIdx - 1];
      setCurrentStoryIdx(prev => prev - 1);
      setCurrentItemIdx((prevStory?.items?.length || 1) - 1);
      setProgress(0);
    }
  };

  const handleLike = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentItem?.id) return;

    try {
      const isLiked = currentItem.isLiked;
      const response = await (isLiked 
        ? api.stories.unlikeStory(Number(currentItem.id))
        : api.stories.likeStory(Number(currentItem.id))
      );

      if (response.durum === 1) {
        currentItem.isLiked = !isLiked;
        currentItem.likeCount = (currentItem.likeCount || 0) + (currentItem.isLiked ? 1 : -1);
        setLastUpdate(Date.now());
      }
    } catch (err) {
      console.error('[ARMOYU] Toggle like story error:', err);
    }
  };

  const [viewersPage, setViewersPage] = useState(1);
  const [hasMoreViewers, setHasMoreViewers] = useState(false);

  const fetchViewers = async (loadMore = false) => {
    if (!currentItem?.id) return;
    
    const nextPage = loadMore ? viewersPage + 1 : 1;
    setLoadingViewers(true);
    setShowViewers(true);

    try {
      const response = await api.stories.getStoryViewers(nextPage, Number(currentItem.id));
      if (response.durum === 1) {
        const newViewers = response.icerik || [];
        if (loadMore) {
          setViewers(prev => [...prev, ...newViewers]);
          setViewersPage(nextPage);
        } else {
          setViewers(newViewers);
          setViewersPage(1);
        }
        // Eğer gelen veri sayısı 10 ve üzeriyse (varsayılan limit) daha fazlası olabilir
        setHasMoreViewers(newViewers.length >= 10);
      }
    } catch (err) {
      console.error('[ARMOYU] Fetch viewers error:', err);
    } finally {
      setLoadingViewers(false);
    }
  };

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentItem?.id) return;
    if (!confirm('Bu hikayeyi silmek istediğinize emin misiniz?')) return;

    try {
      const response = await api.stories.deleteStory(Number(currentItem.id));
      if (response.durum === 1) {
        onClose();
      } else {
        alert(response.aciklama || 'Silme işlemi başarısız.');
      }
    } catch (err) {
      console.error('[ARMOYU] Delete story error:', err);
    }
  };

  const handleHide = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!currentItem?.id) return;
    if (!confirm('Bu hikayeyi gizlemek istediğinize emin misiniz?')) return;

    try {
      const response = await api.stories.hideStory(Number(currentItem.id));
      if (response.durum === 1) {
        alert('Hikaye gizlendi.');
        onClose();
      } else {
        alert(response.aciklama || 'Gizleme işlemi başarısız.');
      }
    } catch (err) {
      console.error('[ARMOYU] Hide story error:', err);
    }
  };

  if (!mounted || !story) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-black flex items-center justify-center animate-in fade-in duration-300">
      {/* Background Blur */}
      <div className="absolute inset-0 overflow-hidden opacity-50">
        <img key={currentMedia} src={currentMedia} className="w-full h-full object-cover blur-3xl scale-110" alt="" />
      </div>

      <div className="relative w-full h-full max-w-[450px] md:h-[90%] md:aspect-[9/16] bg-[#1a1a1a] md:rounded-3xl shadow-2xl overflow-hidden flex flex-col">
        {/* Progress Bars */}
        <div className="absolute top-4 left-4 right-4 z-20 flex gap-1">
          {items.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/20 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-50"
                style={{
                  width: idx === currentItemIdx ? `${progress}%` : idx < currentItemIdx ? '100%' : '0%'
                }}
              />
            </div>
          ))}
        </div>

        {/* Header */}
        <div className="absolute top-8 left-4 right-4 z-20 flex items-center justify-between">
            <div 
              className={`flex items-center gap-3 ${isMe ? 'cursor-pointer' : ''} p-1`}
              onClick={(e) => {
                if (isMe) {
                  e.stopPropagation();
                  onAddStory?.();
                }
              }}
            >
              <div className="relative">
                {/* Avatar Circle */}
                <div className="relative w-11 h-11 rounded-full p-0.5 border-2 border-white/30 overflow-hidden shadow-lg">
                  <img src={story.author?.avatar} className="w-full h-full rounded-full object-cover" alt="" />
                </div>
                
                {/* Corner Plus Badge */}
                {isMe && (
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-armoyu-primary rounded-full flex items-center justify-center border-2 border-[#1a1a1a] text-white shadow-[0_0_10px_rgba(var(--armoyu-primary-rgb),0.5)] z-30">
                    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg>
                  </div>
                )}
              </div>
            <div className="flex flex-col">
              <span className="text-white text-sm font-bold shadow-sm">{isMe ? 'Ben' : story.author?.displayName || story.author?.username}</span>
              <span className="text-white/60 text-[10px]">{currentTimestamp || 'Az önce'}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            {isMe ? (
              <button 
                onClick={handleDelete}
                className="p-2 text-white/60 hover:text-red-500 hover:bg-white/10 rounded-full transition-all"
                title="Hikayeyi Sil"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" y1="11" x2="10" y2="17"/><line x1="14" y1="11" x2="14" y2="17"/></svg>
              </button>
            ) : (
              <button 
                onClick={handleHide}
                className="p-2 text-white/60 hover:text-amber-500 hover:bg-white/10 rounded-full transition-all"
                title="Hikayeyi Gizle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9.88 9.88a3 3 0 1 0 4.24 4.24"/><path d="M10.73 5.08A10.43 10.43 0 0 1 12 5c7 0 10 7 10 7a13.16 13.16 0 0 1-1.67 2.68"/><path d="M6.61 6.61A13.52 13.52 0 0 0 2 12s3 7 10 7a9.74 9.74 0 0 0 5.39-1.61"/><line x1="2" y1="2" x2="22" y2="22"/></svg>
              </button>
            )}
            <button onClick={onClose} className="p-2 text-white hover:bg-white/10 rounded-full transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 relative group/media overflow-hidden">
          {currentItem?.type === 'video' ? (
            <div className="w-full h-full bg-black flex items-center justify-center [&_.plyr]:h-full [&_.plyr]:w-full [&_.plyr--video]:h-full [&_video]:h-full [&_video]:w-full">
               <Plyr
                  key={currentMedia}
                  source={{ type: 'video', sources: [{ src: currentMedia }] }}
                  options={{ 
                    autoplay: true,
                    controls: [], // Hide controls for stories
                    clickToPlay: true,
                    hideControls: true,
                    settings: [],
                    ratio: '9:16'
                  }}
               />
            </div>
          ) : (
            <img src={currentMedia} className="w-full h-full object-cover" alt="Story Content" />
          )}
          
          <div className="absolute bottom-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
             <div className="flex items-center gap-4">
                <button 
                  onClick={handleLike}
                  className="pointer-events-auto flex flex-col items-center gap-1 group/like"
                >
                   <div className={`w-10 h-10 rounded-full backdrop-blur-md flex items-center justify-center transition-all active:scale-90 border border-white/10 ${currentItem?.isLiked ? 'bg-red-500 text-white' : 'bg-black/20 text-white hover:bg-white/10'}`}>
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill={currentItem?.isLiked ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                   </div>
                   <span className="text-[10px] text-white font-medium shadow-sm">{currentItem?.likeCount || 0}</span>
                </button>

                {isMe && (
                  <button 
                    onClick={(e) => { e.stopPropagation(); fetchViewers(); }}
                    className="pointer-events-auto flex flex-col items-center gap-1 group/views"
                  >
                     <div className="w-10 h-10 rounded-full bg-black/20 backdrop-blur-md flex items-center justify-center text-white hover:bg-white/10 transition-all active:scale-90 border border-white/10">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z"/><circle cx="12" cy="12" r="3"/></svg>
                     </div>
                     <span className="text-[10px] text-white font-medium shadow-sm">{currentItem?.viewCount || 0}</span>
                  </button>
                )}
             </div>
          </div>

          <div className="absolute inset-0 flex">
            <div className="w-1/3 h-full cursor-w-resize" onClick={handlePrev}></div>
            <div className="w-2/3 h-full cursor-e-resize" onClick={handleNext}></div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-black/40 backdrop-blur-md flex gap-3 items-center">
          <input
            type="text"
            placeholder={`@${story.author?.username} kişisine yanıt ver...`}
            className="flex-1 bg-white/10 border border-white/10 rounded-full px-5 py-2.5 text-sm text-white placeholder-white/50 focus:outline-none focus:bg-white/20 transition-all shadow-sm"
          />
        </div>

        {/* Viewers Modal */}
        {showViewers && (
          <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-xl animate-in slide-in-from-bottom duration-300">
            <div className="flex flex-col h-full">
              <div className="p-6 border-b border-white/10 flex items-center justify-between">
                <h3 className="text-white font-bold text-lg">Görüntüleyenler ({currentItem?.viewCount || 0})</h3>
                <button onClick={() => setShowViewers(false)} className="text-white/60 hover:text-white">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {loadingViewers ? (
                  <div className="flex items-center justify-center h-40">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white"></div>
                  </div>
                ) : viewers.length > 0 ? (
                  viewers.map((viewer, idx) => (
                    <div key={idx} className="flex items-center justify-between group">
                      <div className="flex items-center gap-3">
                        <img src={viewer.hgoruntuleyen_avatar} className="w-12 h-12 rounded-full border border-white/10" alt="" />
                        <div className="flex flex-col">
                          <span className="text-white font-medium">{viewer.hgoruntuleyen_adsoyad}</span>
                          <span className="text-white/40 text-xs">@{viewer.hgoruntuleyen_kullaniciad}</span>
                        </div>
                      </div>
                      {viewer.hgoruntuleyen_begenme === 1 && (
                        <div className="text-red-500">
                          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                        </div>
                      )}
                    </div>
                  ))
                ) : (
                  <div className="text-center text-white/40 mt-10">Henüz kimse görüntülemedi.</div>
                )}

                {hasMoreViewers && (
                  <div className="pt-4 pb-8 flex justify-center">
                    <button
                      onClick={() => fetchViewers(true)}
                      disabled={loadingViewers}
                      className="px-6 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-full transition-all disabled:opacity-50"
                    >
                      {loadingViewers ? 'Yükleniyor...' : 'Daha Fazla Yükle'}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
