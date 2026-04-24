'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  Cloud,
  X,
  Image as ImageIcon,
  Video,
  Music,
  Plus,
  Upload,
  LayoutGrid,
  RefreshCcw,
  Trash2,
  Check,
  Gamepad2,
  Trophy,
  FileText,
  HardDrive,
  Loader2,
  CheckCircle
} from 'lucide-react';
import { MediaResponse, MediaCategory } from '@armoyu/core';
import { useArmoyu } from '../../../context/ArmoyuContext';
import { useAuth } from '../../../context/AuthContext';
import { MediaLightbox } from '../posts/widgets/MediaLightbox';

interface CloudFile {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  thumbnail?: string;
  name: string;
  size: string;
  date: string;
}

interface CloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (media: { url: string; type: 'image' | 'video' | 'audio' }) => void;
  isSelectionMode?: boolean;
}

export function CloudModal({ isOpen, onClose, onSelectMedia, isSelectionMode = false }: CloudModalProps) {
  const { api } = useArmoyu();
  const { user: currentUser } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'video' | 'audio'>('all');
  const [dragActive, setDragActive] = useState(false);

  const [cache, setCache] = useState<Record<string, { files: CloudFile[], page: number, hasMore: boolean }>>({
    all: { files: [], page: 1, hasMore: true },
    image: { files: [], page: 1, hasMore: true },
    video: { files: [], page: 1, hasMore: true },
    audio: { files: [], page: 1, hasMore: true },
    gaming: { files: [], page: 1, hasMore: true },
    sports: { files: [], page: 1, hasMore: true },
  });
  const [dynamicCategories, setDynamicCategories] = useState<{ id: string; label: string }[]>([]);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [isLibraryRequest, setIsLibraryRequest] = useState(false);
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [lightbox, setLightbox] = useState({
    isOpen: false,
    index: 0
  });

  useEffect(() => setMounted(true), []);

  // Reset selections when modal opens/closes
  useEffect(() => {
    if (!isOpen) {
      setSelectedIds(new Set());
      setCache({
        all: { files: [], page: 1, hasMore: true },
        image: { files: [], page: 1, hasMore: true },
        video: { files: [], page: 1, hasMore: true },
        audio: { files: [], page: 1, hasMore: true },
        gaming: { files: [], page: 1, hasMore: true },
        sports: { files: [], page: 1, hasMore: true },
      });
      setDynamicCategories([]);
    }
  }, [isOpen]);

  const formatCatName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const fetchMedia = async (category: string = 'all', isLoadMore = false) => {
    if (!currentUser?.id) return;

    // If we have data and not loading more, don't fetch again
    if (!isLoadMore && cache[category].files.length > 0) return;

    setLoading(true);
    setError(null);
    try {
      const currentPage = isLoadMore ? cache[category].page + 1 : 1;
      
      let apiCategory: string = category;
      if (category === 'image') apiCategory = '-1';
      else if (category === 'audio') apiCategory = 'muzik';
      else if (category === 'gaming') apiCategory = 'gaming'; // API side should handle this or map to specific tags
      else if (category === 'sports') apiCategory = 'sports';

      const response = await api.users.getUserMedia(currentPage, {
        userId: Number(currentUser.id),
        category: apiCategory,
        limit: 20
      });

      if (response.durum === 1 && Array.isArray(response.icerik)) {
        const mappedFiles: CloudFile[] = response.icerik.map((f: any) => {
          // Detect type more robustly
          let type: 'image' | 'video' | 'audio' = 'image';
          const cat = String(f.category || f.fotokategori || '').toLowerCase();
          const mime = String(f.type || f.fotodosyatipi || '').toLowerCase();
          
          if (cat === 'video' || cat === MediaCategory.VIDEO || mime.includes('video')) {
            type = 'video';
          } else if (cat === 'muzik' || cat === MediaCategory.MUSIC || mime.includes('audio') || mime.includes('mpeg')) {
            type = 'audio';
          }

          return {
            id: String(f.id || f.mediaID || f.fotoID || Math.random()),
            type,
            url: f.url?.original || f.media_URL || f.fotoorijinalurl || f.fotoufaklikurl || '',
            thumbnail: f.url?.thumb || f.media_minURL || f.fotominnakurl || f.fotoufaklikurl || '',
            name: f.title || f.media_name || f.baslik || 'İsimsiz Medya',
            size: f.size || f.media_size || '0 KB',
            date: f.time || f.media_time || f.fotozaman || ''
          };
        });

        // Extract dynamic categories from 'all' tab or any fetch
        const newCats = Array.from(new Set(response.icerik.map((f: any) => f.category || f.fotokategori)))
          .filter(Boolean)
          .filter(c => !['video', 'muzik', 'gaming', 'sports', 'all', 'image', '-1', 'post', 'profile'].includes(String(c).toLowerCase()));
        
        if (newCats.length > 0) {
          setDynamicCategories(prev => {
            const existingIds = new Set(prev.map(c => c.id));
            const added = newCats
              .filter(c => !existingIds.has(String(c)))
              .map(c => ({ id: String(c), label: formatCatName(String(c)) }));
            return [...prev, ...added];
          });

          // Ensure cache has these dynamic categories
          setCache(prev => {
            const next = { ...prev };
            newCats.forEach(c => {
              if (!next[String(c)]) {
                next[String(c)] = { files: [], page: 1, hasMore: true };
              }
            });
            return next;
          });
        }

        setCache(prev => ({
          ...prev,
          [category]: {
            files: isLoadMore ? [...prev[category].files, ...mappedFiles] : mappedFiles,
            page: currentPage,
            hasMore: mappedFiles.length > 0
          }
        }));
      } else {
        setCache(prev => ({
          ...prev,
          [category]: {
            ...prev[category],
            hasMore: false // Artık gerçekten veri yoksa veya hata geldiyse kapat
          }
        }));
        if (response.durum !== 1 && !isLoadMore) setError(response.aciklama || 'Medya yüklenemedi');
      }
    } catch (err: any) {
      console.error('[CloudModal] Fetch Error:', err);
      if (!isLoadMore) setError('Veriler alınırken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedIds.size === 0) return;
    if (!window.confirm(`${selectedIds.size} adet medyayı silmek istediğinize emin misiniz?`)) return;

    setDeleting(true);
    try {
      const ids = Array.from(selectedIds);
      // Sequentially delete for now as API might not support bulk
      for (const id of ids) {
        await api.users.deleteMedia(Number(id));
      }
      setSelectedIds(new Set());
      // Refresh current category and clear all cache to be safe
      setCache({
        all: { files: [], page: 1, hasMore: true },
        image: { files: [], page: 1, hasMore: true },
        video: { files: [], page: 1, hasMore: true },
        audio: { files: [], page: 1, hasMore: true },
        gaming: { files: [], page: 1, hasMore: true },
        sports: { files: [], page: 1, hasMore: true },
      });
      fetchMedia(activeCategory);
    } catch (err) {
      console.error('[CloudModal] Delete Error:', err);
      alert('Bazı medyalar silinemedi.');
    } finally {
      setDeleting(false);
    }
  };

  const toggleSelect = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const newSelected = new Set(selectedIds);
    if (newSelected.has(id)) newSelected.delete(id);
    else newSelected.add(id);
    setSelectedIds(newSelected);
  };

  const handleItemClick = (index: number, file: CloudFile) => {
    if (selectedIds.size > 0) {
      // If something is already selected, click toggles selection
      const newSelected = new Set(selectedIds);
      if (newSelected.has(file.id)) newSelected.delete(file.id);
      else newSelected.add(file.id);
      setSelectedIds(newSelected);
    } else {
      // Normal click: open lightbox
      setLightbox({ isOpen: true, index });
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMedia(activeCategory);
    }
  }, [isOpen, activeCategory]);

  if (!isOpen || !mounted) return null;

  const storageData = { total: 5000, used: 2400, photos: 1200, videos: 800, audios: 200, documents: 200 };
  const pPhotos = (storageData.photos / storageData.total) * 100;
  const pVideos = (storageData.videos / storageData.total) * 100;
  const pAudios = (storageData.audios / storageData.total) * 100;
  const pDocs = (storageData.documents / storageData.total) * 100;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] p-4 md:p-8 xl:p-12 flex items-center justify-center animate-in fade-in duration-200">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />

      <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white dark:bg-[#0a0a0e] border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Sidebar */}
        <div className="w-full md:w-64 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121216] flex flex-col shrink-0">
          <div className="p-6 md:p-8 pb-4">
            <h2 className="text-2xl font-black text-armoyu-text tracking-tight flex items-center gap-3">
              <Cloud size={28} className="text-blue-500 fill-blue-500/20" />
              Cloud
            </h2>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto">
            {[
              { id: 'all', label: 'Tümü', icon: LayoutGrid },
              { id: 'image', label: 'Fotoğraflar', icon: ImageIcon },
              { id: 'video', label: 'Videolar', icon: Video },
              { id: 'audio', label: 'Sesler', icon: Music },
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === cat.id ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <cat.icon size={18} strokeWidth={2.5} />
                {cat.label}
              </button>
            ))}

            <div className="pt-4 pb-2 px-4">
              <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] italic">Özel Kategoriler</span>
            </div>

            {[
              { id: 'gaming', label: 'Oyunlar', icon: Gamepad2 },
              { id: 'sports', label: 'Spor', icon: Trophy },
              ...dynamicCategories.map(cat => ({ ...cat, icon: FileText }))
            ].map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === cat.id ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
              >
                <cat.icon size={18} strokeWidth={2.5} />
                <span className="truncate">{cat.label}</span>
              </button>
            ))}
          </nav>

          <div className="p-6 border-t border-gray-200 dark:border-white/10 hidden md:block group">
            <div className="mb-2 flex justify-between items-end">
              <span className="text-xs font-bold text-armoyu-text-muted group-hover:text-armoyu-text transition-colors flex items-center gap-1.5">
                <HardDrive size={12} /> Depolama
              </span>
              <span className="text-xs font-black text-armoyu-text">{(storageData.used / 1000).toFixed(1)}GB <span className="text-[10px] text-armoyu-text-muted font-bold">/ {(storageData.total / 1000).toFixed(1)}GB</span></span>
            </div>
            <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden flex gap-0.5 shadow-inner">
              <div style={{ width: `${pPhotos}%` }} className="bg-blue-500 h-full" />
              <div style={{ width: `${pVideos}%` }} className="bg-purple-500 h-full" />
              <div style={{ width: `${pAudios}%` }} className="bg-emerald-500 h-full" />
              <div style={{ width: `${pDocs}%` }} className="bg-orange-500 h-full" />
            </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0a0a0e]">
          <div className="flex justify-between items-center p-4 md:px-8 border-b border-gray-200 dark:border-white/10 shrink-0">
            <h3 className="font-extrabold text-armoyu-text text-lg tracking-tight">
              {activeCategory === 'all' ? 'Tüm Dosyalar' :
                activeCategory === 'image' ? 'Fotoğraflar' :
                  activeCategory === 'video' ? 'Videolar' :
                    activeCategory === 'audio' ? 'Ses Dosyaları' : 
                      activeCategory === 'gaming' ? 'Oyun Medyaları' :
                        activeCategory === 'sports' ? 'Spor Medyaları' : 
                          dynamicCategories.find(c => c.id === activeCategory)?.label || 'Dosyalarım'}
            </h3>
            <div className="flex items-center gap-3">
              {selectedIds.size > 0 && (
                <button 
                  onClick={handleDeleteSelected}
                  disabled={deleting}
                  className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500 text-red-500 hover:text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all border border-red-500/20"
                >
                  {deleting ? <Loader2 size={14} className="animate-spin" /> : <Trash2 size={14} />}
                  SEÇİLENLERİ SİL ({selectedIds.size})
                </button>
              )}
              <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-armoyu-text-muted transition-colors">
                <X size={22} strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Minimalist Upload Area */}
              <div
                className={`p-1 rounded-[2.5rem] bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-600/20 transition-all group ${dragActive ? 'scale-[1.02]' : ''}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <div className="bg-white dark:bg-[#0d0d12] rounded-[2.4rem] p-6 md:p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="flex items-center gap-6">
                    <div className="w-16 h-16 rounded-[24px] bg-blue-500/10 flex flex-shrink-0 items-center justify-center group-hover:scale-110 transition-transform duration-500 relative">
                       <div className="absolute inset-0 bg-blue-500/20 blur-xl rounded-full animate-pulse" />
                       <Upload size={28} className="text-blue-500 relative z-10" />
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-6 w-full lg:w-auto">
                    {/* Library Request Checkbox */}
                    <label className="flex items-center gap-3 cursor-pointer group/check">
                      <div className="relative">
                        <input 
                          type="checkbox" 
                          className="peer sr-only" 
                          checked={isLibraryRequest}
                          onChange={(e) => setIsLibraryRequest(e.target.checked)}
                        />
                        <div className="w-6 h-6 rounded-lg border-2 border-gray-200 dark:border-white/10 peer-checked:bg-blue-500 peer-checked:border-blue-500 transition-all flex items-center justify-center text-transparent peer-checked:text-white">
                           <Check size={14} strokeWidth={4} />
                        </div>
                      </div>
                      <span className="text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest group-hover/check:text-armoyu-text transition-colors italic">Kütüphaneye İstek</span>
                    </label>

                    {/* Category Selection - Conditional */}
                    <div className="flex items-center gap-3 w-full sm:w-auto">
                      {isLibraryRequest && (
                        <select className="flex-1 sm:flex-none bg-black/5 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-3.5 text-[10px] font-black text-armoyu-text uppercase tracking-widest outline-none cursor-pointer hover:border-blue-500/30 transition-all appearance-none pr-10 relative italic animate-in slide-in-from-right-4 duration-300">
                          <option value="">Kategori Seçin</option>
                          <option value="cs2">Counter-Strike 2</option>
                          <option value="lol">League of Legends</option>
                          <option value="valorant">Valorant</option>
                          <option value="football">Futbol</option>
                          <option value="basketball">Basketbol</option>
                        </select>
                      )}
                      
                      <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-blue-600/20 transition-all active:scale-95 italic">
                        YÜKLE
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Gallery Grid */}
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h4 className="text-sm font-bold text-armoyu-text-muted uppercase tracking-wider">{cache[activeCategory].files.length} İçerik Görüntüleniyor</h4>
                  {loading && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
                </div>

                {error && (
                  <div className="py-12 text-center bg-red-500/5 rounded-[2rem] border border-red-500/10">
                    <p className="text-sm font-bold text-red-500 mb-4">{error}</p>
                    <button
                      onClick={() => fetchMedia(activeCategory)}
                      className="px-6 py-2 bg-armoyu-card-bg border border-armoyu-card-border rounded-xl text-xs font-black uppercase tracking-widest flex items-center gap-2 mx-auto"
                    >
                      <RefreshCcw size={14} /> Tekrar Dene
                    </button>
                  </div>
                )}

                {!loading && cache[activeCategory].files.length === 0 && !error && (
                  <div className="py-24 text-center border-2 border-dashed border-armoyu-card-border rounded-[2rem] bg-black/5 dark:bg-white/5 animate-in fade-in duration-700">
                    <div className="mb-6 flex justify-center text-armoyu-text-muted/20">
                      <Cloud size={80} strokeWidth={1} className="animate-bounce duration-[3000ms]" />
                    </div>
                    <h3 className="text-sm font-black text-armoyu-text uppercase tracking-[0.3em] italic mb-2">Bulut Boş Görünüyor</h3>
                    <p className="text-[10px] font-bold text-armoyu-text-muted max-w-[240px] mx-auto uppercase tracking-wider leading-relaxed">
                      Henüz bu kategoride bir içerik bulunmuyor. Yeni bir şeyler yüklemeye ne dersin?
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
                  {cache[activeCategory].files.map((file, index) => (
                    <div
                      key={file.id}
                      className={`group relative aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border-2 transition-all cursor-pointer shadow-sm hover:shadow-xl ${selectedIds.has(file.id) ? 'border-blue-500 ring-4 ring-blue-500/10 scale-[0.98]' : 'border-transparent hover:border-blue-500/50'}`}
                      onClick={() => handleItemClick(index, file)}
                    >
                      {/* Selection Checkmark */}
                      <div 
                        onClick={(e) => toggleSelect(file.id, e)}
                        className={`absolute top-3 left-3 z-20 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedIds.has(file.id) ? 'bg-blue-500 border-blue-500 text-white' : 'bg-black/20 border-white/20 text-transparent hover:border-white/50 opacity-0 group-hover:opacity-100'}`}
                      >
                        <Check size={14} strokeWidth={4} />
                      </div>

                      {file.type === 'image' ? (
                        <img src={file.thumbnail || file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : file.type === 'video' ? (
                        <div className="w-full h-full relative">
                          <video src={file.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                              <Video size={18} fill="white" />
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-emerald-500/10 gap-3">
                          <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                            <Music size={24} />
                          </div>
                          <p className="text-[10px] font-black text-emerald-600 uppercase tracking-widest italic text-center px-4 line-clamp-2">{file.name}</p>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-5">
                        <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                          <p className="text-white font-black text-sm truncate mb-0.5 uppercase tracking-tight italic">{file.name}</p>
                          <p className="text-white/60 font-bold text-[10px] uppercase tracking-widest">{file.size} • {file.date}</p>

                          {isSelectionMode && (
                             <button
                             className="mt-4 w-full py-3 bg-blue-500 hover:bg-blue-400 text-white text-[10px] font-black uppercase tracking-widest rounded-xl transition-all shadow-lg shadow-blue-500/20 flex items-center justify-center gap-2 active:scale-95"
                             onClick={(e) => {
                               e.stopPropagation();
                               onSelectMedia && onSelectMedia({ url: file.url, type: file.type });
                             }}
                           >
                             <CheckCircle size={14} strokeWidth={3} />
                             DOSYAYI SEÇ
                           </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {cache[activeCategory].hasMore && cache[activeCategory].files.length > 0 && (
                  <div className="flex justify-center pb-10">
                    <button
                      onClick={() => fetchMedia(activeCategory, true)}
                      disabled={loading}
                      className="px-10 py-4 bg-black/5 dark:bg-white/5 hover:bg-blue-500 hover:text-white border border-gray-200 dark:border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] transition-all active:scale-95 flex items-center gap-3 italic"
                    >
                      {loading ? <Loader2 size={16} className="animate-spin" /> : <RefreshCcw size={16} />}
                      DAHA FAZLASINI YÜKLE
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {createPortal(modalContent, document.body)}
      <MediaLightbox 
        isOpen={lightbox.isOpen}
        onClose={() => setLightbox(prev => ({ ...prev, isOpen: false }))}
        media={cache[activeCategory].files.map(f => ({ type: f.type, url: f.url, name: f.name }))}
        initialIndex={lightbox.index}
      />
    </>
  );
}
