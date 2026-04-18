'use client';

import React, { useState, useRef, useEffect } from 'react';
import { 
  Image as ImageIcon, 
  Smile, 
  Globe, 
  Cloud, 
  Send,
  X,
  Plus
} from 'lucide-react';

interface PostComposerProps {
  user: any;
  onPost: (content: string, mediaUrls?: string[]) => Promise<void>;
  isPosting?: boolean;
  placeholder?: string;
  onOpenCloudGallery?: () => void;
  attachments?: { url: string; type: 'image' | 'video' | 'audio' }[];
  onRemoveAttachment?: (index: number) => void;
}

export function PostComposer({ 
  user, 
  onPost, 
  isPosting = false, 
  placeholder = "Neler düşünüyorsun?",
  onOpenCloudGallery,
  attachments = [],
  onRemoveAttachment
}: PostComposerProps) {
  const [content, setContent] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto-resize logic
  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const handleSubmit = async () => {
    if ((!content.trim() && attachments.length === 0) || isPosting || !user) return;
    const mediaUrls = attachments.map(a => a.url);
    await onPost(content, mediaUrls);
    setContent('');
  };

  if (!user) {
    return (
      <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] text-center opacity-60">
        <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest">
          Paylaşım yapmak için giriş yapmalısınız
        </p>
      </div>
    );
  }

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border p-5 rounded-[32px] shadow-sm space-y-4 focus-within:border-blue-500/50 transition-all duration-300">
      <div className="flex gap-4 items-start">
        <img 
          src={user?.avatar} 
          alt={user?.displayName} 
          className="w-12 h-12 rounded-full border border-white/5 shadow-sm bg-black/20 shrink-0" 
        />
        <div className="flex-1 flex flex-col pt-1">
          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder={placeholder}
            disabled={isPosting}
            className="w-full bg-transparent border-none text-armoyu-text placeholder-armoyu-text-muted resize-none py-2 focus:ring-0 text-lg font-medium outline-none disabled:opacity-50 min-h-[50px] max-h-[400px]"
          />

          {/* Media Previews */}
          {attachments.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 mt-4 scrollbar-hide animate-in fade-in slide-in-from-left-4 duration-300">
              {attachments.map((file, idx) => (
                <div key={idx} className="relative group shrink-0">
                  {file.type === 'video' ? (
                    <div className="w-28 h-28 rounded-2xl bg-black/20 flex items-center justify-center border border-white/10 overflow-hidden">
                      <video src={file.url} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Plus size={24} className="text-white rotate-45" />
                      </div>
                    </div>
                  ) : (
                    <img
                      src={file.url}
                      alt="Preview"
                      className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-lg group-hover:scale-105 transition-transform"
                    />
                  )}
                  <button
                    onClick={() => onRemoveAttachment?.(idx)}
                    className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"
                  >
                    <X size={14} strokeWidth={3} />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5 -ml-1">
          <button 
            onClick={onOpenCloudGallery}
            className="p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all group"
            title="Bulut Galerisi"
          >
            <Cloud size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="p-2.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all group" title="Resim Ekle">
            <ImageIcon size={20} className="group-hover:scale-110 transition-transform" />
          </button>
          <button className="p-2.5 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all group" title="Emoji">
            <Smile size={20} className="group-hover:scale-110 transition-transform" />
          </button>
        </div>

        <div className="flex items-center gap-4">
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-full border border-black/5 dark:border-white/5">
            <Globe size={14} className="text-armoyu-text-muted" />
            <span className="text-[10px] font-black uppercase text-armoyu-text-muted tracking-widest">Herkes Görebilir</span>
          </div>

          <button
            onClick={handleSubmit}
            disabled={isPosting || !content.trim()}
            className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700/50 disabled:text-gray-500 text-white px-8 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
          >
            {isPosting ? (
              <>
                <div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                <span>Gidiyor...</span>
              </>
            ) : (
              <>
                <Send size={14} />
                <span>Paylaş</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
