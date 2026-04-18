'use client';
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { 
  Cloud, 
  X, 
  Image as ImageIcon, 
  Video, 
  Music, 
  FileText, 
  Plus, 
  Upload, 
  LayoutGrid, 
  CheckCircle,
  HardDrive
} from 'lucide-react';

interface CloudFile {
  id: string;
  type: 'image' | 'video' | 'audio';
  url: string;
  name: string;
  size: string;
  date: string;
}

interface CloudModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectMedia?: (media: { url: string; type: 'image' | 'video' | 'audio' }) => void;
}

export function CloudModal({ isOpen, onClose, onSelectMedia }: CloudModalProps) {
  const [mounted, setMounted] = useState(false);
  const [activeCategory, setActiveCategory] = useState<'all' | 'image' | 'video'>('all');
  const [dragActive, setDragActive] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!isOpen || !mounted) return null;

  // Mock Cloud Files
  const mockFiles: CloudFile[] = [
    { id: '1', type: 'image', url: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2670&auto=format&fit=crop', name: 'Valorant_Clip_1.jpg', size: '2.4 MB', date: '12 Eki' },
    { id: '2', type: 'video', url: 'https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/720/Big_Buck_Bunny_720_10s_1MB.mp4', name: 'CS2_Aces.mp4', size: '14.1 MB', date: '05 Eki' },
    { id: '3', type: 'image', url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=2698&auto=format&fit=crop', name: 'Setup_Photo.png', size: '4.8 MB', date: '28 Eyl' },
    { id: '4', type: 'image', url: 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop', name: 'Minecraft_Base.jpg', size: '1.2 MB', date: '15 Eyl' },
    { id: '5', type: 'image', url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop', name: 'Coding_Session.jpg', size: '3.5 MB', date: '02 Eyl' }
  ];

  const filteredFiles = activeCategory === 'all' ? mockFiles : mockFiles.filter(f => f.type === activeCategory);

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
            <button className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl font-bold text-sm text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5">
              <Music size={18} strokeWidth={2.5} />
              Sesler
            </button>
          </nav>

          <div className="p-6 border-t border-gray-200 dark:border-white/10 hidden md:block group">
             <div className="mb-2 flex justify-between items-end">
                <span className="text-xs font-bold text-armoyu-text-muted group-hover:text-armoyu-text transition-colors flex items-center gap-1.5">
                  <HardDrive size={12} /> Depolama
                </span>
                <span className="text-xs font-black text-armoyu-text">{(storageData.used / 1000).toFixed(1)}GB <span className="text-[10px] text-armoyu-text-muted font-bold">/ {(storageData.total / 1000).toFixed(1)}GB</span></span>
             </div>
             <div className="w-full h-2.5 bg-black/5 dark:bg-white/10 rounded-full overflow-hidden flex gap-0.5 shadow-inner">
                <div style={{width: `${pPhotos}%`}} className="bg-blue-500 h-full" />
                <div style={{width: `${pVideos}%`}} className="bg-purple-500 h-full" />
                <div style={{width: `${pAudios}%`}} className="bg-emerald-500 h-full" />
                <div style={{width: `${pDocs}%`}} className="bg-orange-500 h-full" />
             </div>
          </div>
        </div>

        {/* Main Workspace */}
        <div className="flex-1 flex flex-col min-w-0 bg-white dark:bg-[#0a0a0e]">
          <div className="flex justify-between items-center p-4 md:px-8 border-b border-gray-200 dark:border-white/10 shrink-0">
            <h3 className="font-extrabold text-armoyu-text text-lg tracking-tight">
              {activeCategory === 'all' ? 'Tüm Dosyalar' : 
               activeCategory === 'image' ? 'Fotoğraflar' : 
               activeCategory === 'video' ? 'Videolar' : 'Dosyalarım'}
            </h3>
            <button onClick={onClose} className="p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/5 text-armoyu-text-muted transition-colors">
              <X size={22} strokeWidth={2.5} />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 md:px-8 py-6">
            <div className="space-y-8 max-w-5xl mx-auto">
              {/* Upload Area */}
              <div 
                className={`border-2 border-dashed rounded-[2rem] p-6 lg:p-8 flex flex-col md:flex-row items-center justify-between gap-6 transition-all group ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-black/10 dark:border-white/10 hover:border-blue-500/50 bg-black/5 dark:bg-white/5'}`}
                onDragEnter={() => setDragActive(true)}
                onDragLeave={() => setDragActive(false)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => { e.preventDefault(); setDragActive(false); }}
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-white dark:bg-[#1a1a24] shadow-xl flex flex-shrink-0 items-center justify-center group-hover:scale-105 transition-transform">
                    <Upload size={28} className="text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-black text-armoyu-text text-lg mb-1">Yeni İçerik Yükle</h3>
                    <p className="text-xs font-bold text-armoyu-text-muted">Görsel veya Dosyaları Sürükleyin</p>
                  </div>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
                  <select className="bg-white dark:bg-[#1a1a24] border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm font-bold text-armoyu-text outline-none cursor-pointer">
                    <option value="image">Fotoğraflar İçin</option>
                    <option value="video">Videolar İçin</option>
                  </select>
                  <button className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white text-sm font-bold rounded-xl shadow-lg transition-all">
                    Seç ve Yükle
                  </button>
                </div>
              </div>

              {/* Gallery Grid */}
              <div>
                <h4 className="text-sm font-bold text-armoyu-text-muted mb-4 uppercase tracking-wider">{filteredFiles.length} İçerik Görüntüleniyor</h4>
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pb-10">
                  {filteredFiles.map(file => (
                    <div 
                      key={file.id} 
                      className="group relative aspect-square rounded-2xl overflow-hidden bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/50 cursor-pointer shadow-sm hover:shadow-lg transition-all"
                      onClick={() => onSelectMedia && onSelectMedia({ url: file.url, type: file.type })}
                    >
                      {file.type === 'image' ? (
                        <img src={file.url} alt={file.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
                      ) : (
                        <div className="w-full h-full relative">
                          <video src={file.url} className="w-full h-full object-cover" />
                          <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                            <div className="w-10 h-10 rounded-full bg-black/50 backdrop-blur-md flex items-center justify-center text-white border border-white/20">
                               <Video size={18} fill="white" />
                            </div>
                          </div>
                        </div>
                      )}
                      
                      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                        <p className="text-white font-bold text-sm truncate mb-0.5">{file.name}</p>
                        <p className="text-white/70 font-bold text-[10px]">{file.size} • {file.date}</p>
                        
                        <button 
                          className="mt-3 w-full py-2 bg-blue-500 hover:bg-blue-600 text-white text-xs font-bold rounded-xl transition-colors shadow-md flex items-center justify-center gap-1.5"
                          onClick={(e) => { 
                            e.stopPropagation(); 
                            onSelectMedia && onSelectMedia({ url: file.url, type: file.type }); 
                          }}
                        >
                          <CheckCircle size={14} />
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
