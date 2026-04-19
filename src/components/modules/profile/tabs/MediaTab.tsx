'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { User } from '../../../../models/auth/User';
import { MediaLightbox, PostMedia } from '../../posts/widgets/MediaLightbox';
import { RefreshCcw, Image as ImageIcon, Video, Layers, ExternalLink } from 'lucide-react';
import { mapApiPostToCardProps } from '../../../../lib/utils/postUtils';

interface MediaTabProps {
  user: User | null;
}

interface MediaItem extends PostMedia {
  postId: string;
  index: number;
  thumbnail?: string;
}

export function MediaTab({ user }: MediaTabProps) {
  const { api } = useArmoyu();
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  const [lightbox, setLightbox] = useState({
    isOpen: false,
    index: 0
  });

  const fetchMedia = useCallback(async (isLoadMore = false) => {
    if (!user?.id) return;

    setLoading(true);
    setError(null);

    try {
      const targetPage = isLoadMore ? page + 1 : 1;
      const limit = 24; // Multiples of 2, 3, 4 for grid
      
      const response = await api.users.getUserMedia(targetPage, { 
        userId: Number(user.id),
        limit,
        category: 'all'
      });
      
      if (response.durum !== 1) {
        throw new Error(response.aciklama || "Medyalar yüklenemedi.");
      }

      const rawMedia = Array.isArray(response.icerik) ? response.icerik : [];
      
      const newMediaItems: MediaItem[] = rawMedia.map((item: any, idx: number) => ({
        type: 'image', // Gallery API usually returns images
        url: item.fotoorijinalurl || item.fotoufaklikurl || '',
        thumbnail: item.fotominnakurl || item.fotoufaklikurl || '',
        postId: String(item.fotoID || idx),
        index: idx
      }));

      if (isLoadMore) {
        setMediaItems(prev => [...prev, ...newMediaItems]);
      } else {
        setMediaItems(newMediaItems);
      }

      setPage(targetPage);
      setHasMore(rawMedia.length >= limit);
    } catch (err: any) {
      console.error('[MediaTab] Fetch error:', err);
      setError(err.message || "İçerik yüklenirken bir hata oluştu.");
    } finally {
      setLoading(false);
    }
  }, [api, user?.id, page]);

  useEffect(() => {
    if (mediaItems.length === 0) {
      fetchMedia(false);
    }
  }, [user?.id]);

  const openLightbox = (index: number) => {
    setLightbox({ isOpen: true, index });
  };

  if (loading && mediaItems.length === 0) {
    return (
      <div className="py-20 flex flex-col items-center gap-4 opacity-50">
        <RefreshCcw size={32} className="animate-spin text-blue-500" />
        <span className="text-xs font-black uppercase tracking-widest text-armoyu-text">Medyalar Hazırlanıyor...</span>
      </div>
    );
  }

  if (error && mediaItems.length === 0) {
    return (
      <div className="py-20 text-center opacity-40">
        <p className="text-xs font-black uppercase tracking-widest text-red-500">{error}</p>
        <button 
          onClick={() => fetchMedia(false)}
          className="mt-4 text-[10px] font-bold text-blue-500 hover:underline uppercase tracking-tighter"
        >
          Tekrar Dene
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {mediaItems.length > 0 ? (
        <>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {mediaItems.map((item, index) => (
              <div 
                key={`${item.postId}-${item.index}-${index}`}
                onClick={() => openLightbox(index)}
                className="aspect-square relative group cursor-pointer overflow-hidden rounded-[24px] bg-black/5 dark:bg-white/5 border border-armoyu-card-border hover:border-blue-500/50 transition-all duration-500 shadow-sm hover:shadow-xl hover:shadow-blue-500/10"
              >
                {/* Media Content */}
                {item.type === 'video' ? (
                  <div className="w-full h-full relative">
                    <video src={item.url} className="w-full h-full object-cover" />
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 group-hover:scale-110 transition-transform">
                        <Video size={20} className="text-white ml-0.5" fill="currentColor" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <img 
                    src={item.thumbnail || item.url} 
                    alt="Galeri Medyası" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
                  />
                )}

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1.5">
                      {item.type === 'video' ? <Video size={14} className="text-blue-400" /> : <ImageIcon size={14} className="text-emerald-400" />}
                      <span className="text-[10px] font-black text-white uppercase tracking-widest italic">{item.type}</span>
                    </div>
                    <ExternalLink size={14} className="text-white/60" />
                  </div>
                </div>

                {/* Corner Badge */}
                <div className="absolute top-3 right-3 w-7 h-7 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-[-10px] group-hover:translate-y-0">
                   <Layers size={14} className="text-white/80" />
                </div>
              </div>
            ))}
          </div>

          {hasMore && (
            <div className="flex justify-center pt-4">
              <button
                onClick={() => fetchMedia(true)}
                disabled={loading}
                className="px-10 py-4 bg-armoyu-card-bg hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all border border-armoyu-card-border flex items-center gap-3 shadow-sm hover:shadow-lg active:scale-95"
              >
                {loading ? <RefreshCcw size={14} className="animate-spin" /> : <Layers size={14} />}
                {loading ? 'YÜKLENİYOR...' : 'DAHA FAZLA MEDYA'}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="py-32 text-center border-2 border-dashed border-armoyu-card-border rounded-[40px] bg-black/5 dark:bg-white/5">
          <div className="mb-6 flex justify-center text-armoyu-text-muted/20">
            <ImageIcon size={80} strokeWidth={1} />
          </div>
          <h3 className="text-sm font-black uppercase tracking-widest text-armoyu-text italic">Burada Hiçbir Şey Yok</h3>
          <p className="text-[10px] font-bold text-armoyu-text-muted mt-2 max-w-[200px] mx-auto uppercase tracking-wider leading-relaxed">
            Bu kullanıcı henüz herhangi bir görsel veya video paylaşmamış.
          </p>
        </div>
      )}

      {/* Lightbox */}
      <MediaLightbox 
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        media={mediaItems}
        initialIndex={lightbox.index}
      />
    </div>
  );
}
