'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Image as ImageIcon,
  Smile,
  Globe,
  Users,
  Cloud,
  Send,
  X,
  Plus
} from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';
import { SearchCategory } from '@armoyu/core';

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
  const [suggestions, setSuggestions] = useState<{ id: string; name: string; type: 'mention' | 'tag'; avatar?: string }[]>([]);
  const [cachedUsers, setCachedUsers] = useState<any[]>([]);
  const [cachedTags, setCachedTags] = useState<any[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const highlightRef = useRef<HTMLDivElement>(null);

  const { api } = useArmoyu();

  // Prefetch active users and tags for instant search (Like a local Redis cache)
  useEffect(() => {
    const prefetchData = async () => {
      try {
        // Sadece aktif oyuncuları (kategori: oyuncular, detay: 1) ve popüler etiketleri çek
        const [usersRes, tagsRes] = await Promise.all([
          api.search.globalSearch('', 1, 50, SearchCategory.USERS),
          api.search.searchTags()
        ]);

        if (usersRes.durum === 1) setCachedUsers(usersRes.icerik || []);
        if (tagsRes.durum === 1) setCachedTags(tagsRes.icerik || []);
      } catch (error) {
        console.error("Autocomplete cache loading failed:", error);
      }
    };
    prefetchData();
  }, [api]);

  // Sync scroll
  const handleScroll = () => {
    if (textareaRef.current && highlightRef.current) {
      highlightRef.current.scrollTop = textareaRef.current.scrollTop;
    }
  };

  const handleTextChange = (val: string) => {
    setContent(val);

    const cursor = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = val.substring(0, cursor);
    const words = textBeforeCursor.split(/\s/);
    const lastWord = words[words.length - 1];

    if (lastWord.startsWith('@') && lastWord.length >= 1) {
      const query = lastWord.substring(1).toLowerCase();
      // Filter from local cache for instant results
      const filtered = cachedUsers
        .filter(u => (u.username || u.title || '').toLowerCase().includes(query))
        .slice(0, 8) // Limit suggestions for UI
        .map(u => ({
          id: u.id.toString(),
          name: u.username, // Mention olarak eklenecek asıl kullanıcı adı
          displayName: u.title || u.username, // Listede görünen tam isim (Ad Soyad)
          username: u.username, // Alt satırda görünen @kullaniciadi
          type: 'mention' as const,
          avatar: u.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${u.id}`
        }));
      setSuggestions(filtered);
    } else if (lastWord.startsWith('#') && lastWord.length >= 1) {
      const query = lastWord.substring(1).toLowerCase();
      const filtered = cachedTags
        .filter(t => (t.value || '').toLowerCase().includes(query))
        .slice(0, 8)
        .map(t => ({
          id: t.id?.toString() || t.value,
          name: t.value,
          displayName: '#' + t.value,
          type: 'tag' as const
        }));
      setSuggestions(filtered);
    } else {
      setSuggestions([]);
    }
  };

  const selectSuggestion = (suggestion: any) => {
    const cursor = textareaRef.current?.selectionStart || 0;
    const textBeforeCursor = content.substring(0, cursor);
    const textAfterCursor = content.substring(cursor);

    const words = textBeforeCursor.split(/\s/);
    words.pop();

    const prefix = suggestion.type === 'mention' ? '@' : '#';
    const newTextBefore = words.length > 0 ? [...words, prefix + suggestion.name + ' '].join(' ') : prefix + suggestion.name + ' ';

    setContent(newTextBefore + textAfterCursor);
    setSuggestions([]);
    setTimeout(() => textareaRef.current?.focus(), 10);
  };

  // Regex for highlighting
  const renderHighlightedContent = (text: string) => {
    if (!text) return null;
    const parts = text.split(/(@\w+|#\w+)/g);
    return parts.map((part, i) => {
      if (part.startsWith('@') || part.startsWith('#')) {
        return <span key={i} className="text-blue-500 font-bold">{part}</span>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'inherit';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [content]);

  const [privacy, setPrivacy] = useState<'everyone' | 'friends'>('everyone');

  const togglePrivacy = () => {
    setPrivacy(prev => prev === 'everyone' ? 'friends' : 'everyone');
  };

  const handleSubmit = async () => {
    if ((!content.trim() && attachments.length === 0) || isPosting || !user) return;
    const mediaUrls = attachments.map(a => a.url);
    // Note: privacy state can be passed to onPost if the API supports it
    await onPost(content, mediaUrls);
    setContent('');
  };

  if (!user) {
    return (
      <div className="bg-armoyu-card-bg border border-armoyu-card-border p-6 rounded-[32px] text-center opacity-60">
        <p className="text-sm font-bold text-armoyu-text-muted uppercase tracking-widest">Paylaşım yapmak için giriş yapmalısınız</p>
      </div>
    );
  }

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border p-5 rounded-[32px] shadow-sm space-y-4 focus-within:border-blue-500/50 transition-all duration-300 relative">

      {suggestions.length > 0 && (
        <div className="absolute left-16 bottom-full mb-3 w-72 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in slide-in-from-bottom-2">
          <div className="p-2 border-b border-black/5 dark:border-white/5 bg-black/5 dark:bg-white/5">
            <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted px-2">Önerilen {suggestions[0].type === 'mention' ? 'Kişiler' : 'Etiketler'}</span>
          </div>
          <div className="max-h-60 overflow-y-auto p-1">
            {suggestions.map((s: any) => (
              <button key={s.id} onClick={() => selectSuggestion(s)} className="w-full flex items-center gap-3 p-2 hover:bg-blue-500/10 rounded-xl transition-colors text-left group">
                {s.type === 'mention' ? (
                  <img src={s.avatar} alt={s.displayName} className="w-9 h-9 rounded-full bg-black/10 border border-black/5 dark:border-white/5 object-cover" />
                ) : (
                  <div className="w-9 h-9 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 font-bold text-lg">#</div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="text-sm font-black text-armoyu-text group-hover:text-blue-500 transition-colors truncate uppercase tracking-tight italic">
                    {s.displayName}
                  </div>
                  {s.type === 'mention' && (
                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-70">
                      @{s.username}
                    </div>
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="flex gap-4 items-start relative">
        <img src={user?.avatar} alt={user?.displayName} className="w-12 h-12 rounded-full border border-white/5 shadow-sm bg-black/20 shrink-0" />

        <div className="flex-1 relative min-h-[50px]">
          {/* Highlighter Layer (Visible behind transparent textarea) */}
          <div
            ref={highlightRef}
            className="absolute inset-0 pointer-events-none whitespace-pre-wrap break-words py-2 text-lg font-medium text-armoyu-text leading-normal px-0"
            aria-hidden="true"
          >
            {renderHighlightedContent(content)}
            {content.endsWith('\n') ? '\n' : ''}
          </div>

          <textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => handleTextChange(e.target.value)}
            onScroll={handleScroll}
            placeholder={placeholder}
            disabled={isPosting}
            className="w-full bg-transparent border-none text-transparent caret-armoyu-text placeholder-armoyu-text-muted resize-none py-2 focus:ring-0 text-lg font-medium outline-none disabled:opacity-50 min-h-[50px] max-h-[400px] leading-normal relative z-10"
          />

          {attachments.length > 0 && (
            <div className="flex gap-3 overflow-x-auto pb-2 mt-4 scrollbar-hide animate-in fade-in slide-in-from-left-4">
              {attachments.map((file, idx) => (
                <div key={idx} className="relative group shrink-0">
                  {file.type === 'video' ? (
                    <div className="w-28 h-28 rounded-2xl bg-black/20 flex items-center justify-center border border-white/10 overflow-hidden">
                      <video src={file.url} className="w-full h-full object-cover opacity-60" />
                      <div className="absolute inset-0 flex items-center justify-center"><Plus size={24} className="text-white rotate-45" /></div>
                    </div>
                  ) : (
                    <img src={file.url} alt="Preview" className="w-28 h-28 rounded-2xl object-cover border border-white/10 shadow-lg group-hover:scale-105 transition-transform" />
                  )}
                  <button onClick={() => onRemoveAttachment?.(idx)} className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-red-600 transition-colors z-10"><X size={14} strokeWidth={3} /></button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-black/5 dark:border-white/5">
        <div className="flex items-center gap-1.5 -ml-1">
          <button onClick={onOpenCloudGallery} className="p-2.5 text-blue-500 hover:bg-blue-500/10 rounded-xl transition-all group" title="Bulut Galerisi"><Cloud size={20} className="group-hover:scale-110 transition-transform" /></button>
          <button className="p-2.5 text-emerald-500 hover:bg-emerald-500/10 rounded-xl transition-all group" title="Resim Ekle"><ImageIcon size={20} className="group-hover:scale-110 transition-transform" /></button>
          <button className="p-2.5 text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all group" title="Emoji"><Smile size={20} className="group-hover:scale-110 transition-transform" /></button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={togglePrivacy}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-full transition-all group active:scale-95"
          >
            {privacy === 'everyone' ? (
              <Globe size={14} className="text-blue-500" />
            ) : (
              <Users size={14} className="text-green-500" />
            )}
            <span className="text-[10px] font-black uppercase tracking-widest text-armoyu-text">
              {privacy === 'everyone' ? 'Herkes' : 'Arkadaşlar'}
            </span>
          </button>
          <button onClick={handleSubmit} disabled={isPosting || !content.trim()} className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700/50 disabled:text-gray-500 text-white px-8 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2">
            {isPosting ? (<><div className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" /><span>Gidiyor...</span></>) : (<><Send size={14} /><span>Paylaş</span></>)}
          </button>
        </div>
      </div>
    </div>
  );
}
