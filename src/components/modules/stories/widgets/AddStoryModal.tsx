'use client';
import React, { useState } from 'react';
import { X, Send, Type } from 'lucide-react';

interface AddStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  media: { url: string; type: 'image' | 'video' | 'audio' } | null;
  onShare: (text: string) => void;
  loading?: boolean;
}

export function AddStoryModal({ isOpen, onClose, media, onShare, loading }: AddStoryModalProps) {
  const [text, setText] = useState('');

  if (!isOpen || !media) return null;

  return (
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={onClose} />
      
      <div className="relative w-full max-w-lg bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10 animate-in zoom-in-95 duration-300 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-6 flex items-center justify-between border-b border-white/10">
          <h3 className="text-white font-black uppercase tracking-widest italic text-sm">Hikaye Paylaş</h3>
          <button onClick={onClose} className="p-2 hover:bg-white/10 rounded-full text-white/50 hover:text-white transition-all">
            <X size={20} />
          </button>
        </div>

        {/* Preview */}
        <div className="flex-1 relative bg-black flex items-center justify-center min-h-[300px]">
          {media.type === 'image' ? (
            <img src={media.url} className="max-w-full max-h-[50vh] object-contain" alt="Preview" />
          ) : media.type === 'video' ? (
            <video src={media.url} className="max-w-full max-h-[50vh]" controls />
          ) : (
             <div className="flex flex-col items-center gap-4">
                <div className="w-20 h-20 bg-armoyu-primary rounded-3xl flex items-center justify-center text-white shadow-xl shadow-armoyu-primary/20">
                    <Type size={40} />
                </div>
                <span className="text-white/50 text-xs font-bold uppercase tracking-widest">Ses Dosyası</span>
             </div>
          )}

          {/* Text Overlay Preview */}
          {text && (
            <div className="absolute inset-0 flex items-center justify-center p-8 pointer-events-none">
              <p className="text-white text-2xl font-black text-center drop-shadow-[0_2px_10px_rgba(0,0,0,0.8)] break-words w-full">
                {text}
              </p>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-6 space-y-4 bg-[#121212]">
          <div className="relative">
            <textarea
              placeholder="Hikayene bir şeyler yaz..."
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-white placeholder-white/20 focus:outline-none focus:border-armoyu-primary/50 transition-all resize-none h-24 text-sm font-medium"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            <div className="absolute top-4 right-4 text-white/20">
              <Type size={18} />
            </div>
          </div>

          <button
            onClick={() => onShare(text)}
            disabled={loading}
            className="w-full py-4 bg-armoyu-primary hover:bg-armoyu-primary disabled:opacity-50 text-white font-black uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-armoyu-primary/20 transition-all active:scale-95 flex items-center justify-center gap-3 italic"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <Send size={18} />
                ŞİMDİ PAYLAŞ
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
