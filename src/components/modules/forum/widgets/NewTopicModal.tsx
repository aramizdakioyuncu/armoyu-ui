'use client';

import React, { useEffect, useState } from 'react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { useAuth } from '../../../../context/AuthContext';

interface NewTopicModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultBoard?: string;
  /** Phatsa'dan gelen panolar; verilmezse sabit liste ile önizleme modunda çalışır */
  boards?: { id: string; name: string }[];
  onCreated?: (topic: { id: string; boardId: string }) => void;
}

const BOARDS = [
  "Duyurular & Haberler",
  "Kurallar & Rehberler",
  "Minecraft",
  "Counter-Strike",
  "Assetto Corsa",
  "Web Geliştirme",
  "Python & AI",
  "Genel Sohbet"
];

export function NewTopicModal({ isOpen, onClose, defaultBoard, boards, onCreated }: NewTopicModalProps) {
  // shortcut: yayınlanan @armoyu/core tiplerinde bu forum metotları yok; yeni sürüm çıkınca cast kalkacak
  const { api } = useArmoyu();
  const { user, setIsLoginModalOpen } = useAuth();
  const [boardId, setBoardId] = useState('');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isBusy, setIsBusy] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!boards?.length) return;
    const preferred = boards.find((b) => b.id === defaultBoard || b.name === defaultBoard);
    setBoardId((preferred || boards[0]).id);
  }, [boards, defaultBoard]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!boards?.length) {
      alert('Konunuz başarıyla oluşturuldu!');
      onClose();
      return;
    }
    if (!user) {
      setIsLoginModalOpen(true);
      return;
    }

    setIsBusy(true);
    setError('');
    const response = await (api.forum as any).createTopic({ categoryId: boardId as any, title, content } as any);
    setIsBusy(false);

    if (response.durum === 1) {
      setTitle('');
      setContent('');
      onCreated?.(response.icerik as any);
      onClose();
    } else {
      setError(response.aciklama || 'Konu oluşturulamadı.');
    }
  };
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      <div className="relative w-full max-w-2xl bg-white dark:bg-[#12121a] border border-gray-200 dark:border-white/10 rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-300">
        
        <div className="p-8 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
           <div>
              <h2 className="text-2xl font-black text-gray-900 dark:text-white uppercase tracking-tighter italic">YENİ KONU OLUŞTUR</h2>
              <p className="text-[10px] font-bold text-armoyu-primary uppercase tracking-widest mt-1">
                 TOPLULUKLA PAYLAŞIMA BAŞLA
              </p>
           </div>
           <button onClick={onClose} className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/5 flex items-center justify-center hover:bg-gray-200 dark:hover:bg-white/10 transition-colors">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-gray-900 dark:text-white"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
           </button>
        </div>

        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
           <div className="space-y-4">
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">KATEGORİ SEÇİN</label>
                    <div className="relative">
                       <select 
                          {...(boards?.length ? { value: boardId, onChange: (e: React.ChangeEvent<HTMLSelectElement>) => setBoardId(e.target.value) } : { defaultValue: defaultBoard || "Genel Sohbet" })}
                          aria-label="Kategori seçin"
                          className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm appearance-none cursor-pointer"
                       >
                          {boards?.length
                            ? boards.map(board => (
                               <option key={board.id} value={board.id} className="bg-white dark:bg-[#12121a]">{board.name}</option>
                            ))
                            : BOARDS.map(board => (
                               <option key={board} value={board} className="bg-white dark:bg-[#12121a]">{board}</option>
                            ))}
                       </select>
                       <div className="absolute right-5 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><polyline points="6 9 12 15 18 9"></polyline></svg>
                       </div>
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">ETİKETLER (OPSİYONEL)</label>
                    <input type="text" className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm" placeholder="soru, minecraft, hata..." />
                 </div>
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">KONU BAŞLIĞI</label>
                 <input required type="text" aria-label="Konu başlığı" value={title} onChange={(e) => setTitle(e.target.value)} maxLength={255} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm" placeholder="Konunuzu özetleyen kısa bir başlık..." />
              </div>

              <div className="space-y-2">
                 <label className="text-[10px] font-black uppercase tracking-widest text-gray-500 dark:text-gray-400 ml-1">KONU İÇERİĞİ</label>
                 <div className="relative group">
                    <textarea required rows={8} aria-label="Konu içeriği" value={content} onChange={(e) => setContent(e.target.value)} maxLength={10000} className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-3xl px-6 py-5 text-gray-900 dark:text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-armoyu-primary transition-all font-bold text-sm no-scrollbar leading-relaxed" placeholder="Konu detaylarını buraya yazın..." />
                    <div className="absolute bottom-4 right-6 flex items-center gap-2 opacity-50 text-[10px] font-bold uppercase tracking-widest pointer-events-none">
                       <span>Markdown Desteklenir</span>
                    </div>
                 </div>
              </div>
           </div>

           {error && <p role="alert" className="text-xs font-bold text-red-500">{error}</p>}

           <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                type="button"
                onClick={onClose}
                className="flex-1 py-5 bg-gray-100 dark:bg-white/5 hover:bg-gray-200 dark:hover:bg-white/10 text-gray-900 dark:text-white font-black text-xs uppercase tracking-widest rounded-2xl transition-all"
              >
                 İPTAL ET
              </button>
              <button disabled={isBusy} className="flex-[2] py-5 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black text-xs uppercase tracking-widest rounded-2xl shadow-xl shadow-armoyu-primary/30 transition-all active:scale-95 disabled:opacity-50">
                 {isBusy ? "YAYINLANIYOR..." : "KONUYU YAYINLA"}
              </button>
           </div>
        </form>
      </div>
    </div>
  );
}
