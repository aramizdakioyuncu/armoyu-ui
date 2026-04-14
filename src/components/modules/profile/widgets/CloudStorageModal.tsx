'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface CloudStorageModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (url: string, type: 'image'|'video') => void;
}

export function CloudStorageModal({ isOpen, onClose, onSelectMedia }: CloudStorageModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'video'>('all'); // Simplified for mock display
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  // Mock Cloud Files
  const mockFiles = [
    { id: '1', type: 'image' as const, url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', name: 'Valorant_Clip_1.jpg', size: '2.4 MB', date: '12 Eki' },
    { id: '2', type: 'video' as const, url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', name: 'CS2_Aces.mp4', size: '14.1 MB', date: '05 Eki' },
    { id: '3', type: 'image' as const, url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=2698&auto=format&fit=crop', name: 'Setup_Photo.png', size: '4.8 MB', date: '28 Eyl' },
    { id: '4', type: 'image' as const, url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop', name: 'Minecraft_Bas...jpg', size: '1.2 MB', date: '15 Eyl' },
    { id: '5', type: 'image' as const, url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop', name: 'Coding_Session.jpg', size: '3.5 MB', date: '02 Eyl' }
  ];

  const filteredFiles = activeCategory === 'all' ? mockFiles : mockFiles.filter(f => f.type === activeCategory);

  // Mock Storage Math
  const storageData = { total: 5000, used: 2400, photos: 1200, videos: 800, audios: 200, documents: 200 };
  const pPhotos = (storageData.photos / storageData.total) * 100;
  const pVideos = (storageData.videos / storageData.total) * 100;
  const pAudios = (storageData.audios / storageData.total) * 100;
  const pDocs = (storageData.documents / storageData.total) * 100;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] p-4 md:p-8 xl:p-12 flex items-center justify-center animate-in fade-in duration-200">
      
      {/* Background Dim */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose} />
      
      {/* Cloud Window Wrapper */}
      <div className="relative w-full max-w-6xl h-full max-h-[85vh] bg-white dark:bg-[#0a0a0e] border border-gray-200 dark:border-white/10 rounded-[2rem] shadow-2xl flex flex-col md:flex-row overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Left Column (Sidebar) */}
        <div className="w-full md:w-64 border-r border-gray-200 dark:border-white/10 bg-gray-50 dark:bg-[#121216] flex flex-col shrink-0">
          <div className="p-6 md:p-8 pb-4">
            <h2 className="text-2xl font-black text-armoyu-text tracking-tight flex items-center gap-3">
               <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="text-blue-500"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></path></svg>
               Cloud
            </h2>
          </div>

          <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto hide-scrollbar">
            <button 
              onClick={() => setActiveCategory('all')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === 'all' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
              Tümü
            </button>
            <button 
              onClick={() => setActiveCategory('image')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === 'image' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
              Fotoğraflar
            </button>
            <button 
              onClick={() => setActiveCategory('video')} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all ${activeCategory === 'video' ? 'bg-blue-500 text-white shadow-md shadow-blue-500/20' : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'}`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="23 7 16 12 23 17 23 7"></polygon><rect x="1" y="5" width="15" height="14" rx="2" ry="2"></rect></svg>
              Videolar
            </button>
            <button 
              onClick={() => {}} 
              className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm transition-all text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M9 18V5l12-2v13"></path><circle cx="6" cy="18" r="3"></circle><circle cx="18" cy="16" r="3"></circle></svg>
              Sesler
            </button>
          </nav>

          {/* Storage Capacity Bar Mini Widget */}
          <div className="p-6 border-t border-gray-200 dark:border-white/10 hidden md:block group">
             <div className="mb-2 flex justify-between items-end">
                <span className="text-xs font-bold text-armoyu-text-muted group-hover:text-armoyu-text transition-colors">Depolama</span>
                <span className="text-xs font-black text-armoyu-text">{(storageData.used / 1000).toFixed(1)}GB <span className="text-[10px] text-armoyu-text-muted font-bold">/ {(storageData.total / 1000).toFixed(1)}GB</span></span>
             </div>
             <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden flex gap-0.5 shadow-inner">
                <div style={{width: `${pPhotos}%`}} className="bg-blue-500 h-full" title="Fotoğraflar" />
                <div style={{width: `${pVideos}%`}} className="bg-purple-500 h-full" title="Videolar" />
                <div style={{width: `${pAudios}%`}} className="bg-emerald-500 h-full" title="Sesler" />
                <div style={{width: `${pDocs}%`}} className="bg-orange-500 h-full" title="Belgeler" />
             </div>
          </div>
        </div>

        {/* Right Column (Main Viewspace) */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0a0a0e]">
          
          {/* Top Bar Navigation */}
          <div className="flex justify-between items-center p-4 md:px-8 border-b border-gray-200 dark:border-white/10 shrink-0">
            <h3 className="font-extrabold text-armoyu-text text-lg tracking-tight">
              {activeCategory === 'all' ? 'Tüm Dosyalar' : 
               activeCategory === 'image' ? 'Fotoğraflar' : 
               activeCategory === 'video' ? 'Videolar' : 'Dosyalarım'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-armoyu-text-muted transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>
          </div>

          {/* Scrollable Container */}
          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6 hide-scrollbar">
            <div className="space-y-8 max-w-5xl mx-auto">
              
              {/* Row 1: Upload Modül (Kategori Seçimli) */}
              <div 
                className={`border-2 border-dashed rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all group ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-black/10 dark:border-white/10 hover:border-blue-500/50 bg-black/5 dark:bg-white/5'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); /* file handle logic */ }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-[1.25rem] bg-white dark:bg-[#1a1a24] shadow-[0_4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_4px_20px_rgba(255,255,255,0.03)] flex flex-shrink-0 items-center justify-center group-hover:scale-105 transition-transform">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-blue-500"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
                  </div>
                  <div>
                    <h3 className="font-black text-armoyu-text text-lg mb-1">Yeni İçerik Yükle</h3>
                    <p className="text-xs font-bold text-armoyu-text-muted">Görsel veya Dosyaları Sürükleyin (Maks 100MB)</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <select className="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-armoyu-text outline-none cursor-pointer focus:border-blue-500 transition-colors shadow-sm">
                    <option value="image">Fotoğraflar İçin</option>
                    <option value="video">Videolar İçin</option>
                    <option value="audio">Sesler İçin</option>
                  </select>
                  <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white text-sm font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.3)] hover:shadow-[0_0_20px_rgba(37,99,235,0.5)] transition-all">
                    Seç ve Yükle
                  </button>
                </div>
              </div>

              {/* Row 2: Gallery Mappings */}
              <div>
                <h4 className="text-sm font-bold text-armoyu-text-muted mb-4 uppercase tracking-wider">{filteredFiles.length} İçerik Görüntüleniyor</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                  {filteredFiles.map(file => (
                    <div 
                      key={file.id} 
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/50 cursor-pointer shadow-sm hover:shadow-lg transition-all"
                      onClick={() => onSelectMedia && onSelectMedia(file.url, file.type)}
                    >
                      {file.type === 'image' ? (
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full relative">
                          <video src={file.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg>
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-bold text-sm truncate mb-0.5">{file.name}</p>
                        <p className="text-white/70 font-bold text-[10px]">{file.size} • {file.date}</p>
                        
                        <button 
                          className="mt-3 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
                          onClick={(e) => { e.stopPropagation(); onSelectMedia && onSelectMedia(file.url, file.type); }}
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>
                          Paylaşıma Ekle
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>

      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}
