'use client';

import React, { useState } from 'react';
import { Button } from '../../../Button';
import { useSocket, useAuth } from '../../../../index';
import { EmojiPicker } from '../../../shared/EmojiPicker';

export function ChatInput({ onSend, chatId }: { onSend: (text: string) => void, chatId?: string }) {
  const [text, setText] = useState('');
  const { emit } = useSocket();
  const { user } = useAuth();
  const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (text.trim()) {
      if (typingTimeout) clearTimeout(typingTimeout);
      onSend(text);
      setText('');
    }
  };

  const handleChange = (val: string) => {
    setText(val);
    if (chatId && user?.username) {
      const isTyping = val.length > 0;
      emit('chat_typing', {
        chatId,
        isTyping,
        username: user.username,
        avatar: user.avatar
      });

      if (typingTimeout) clearTimeout(typingTimeout);

      if (isTyping) {
        const timeout = setTimeout(() => {
          emit('chat_typing', {
            chatId,
            isTyping: false,
            username: user.username,
            avatar: user.avatar
          });
        }, 1500);
        setTypingTimeout(timeout);
      }
    }
  };

  return (
    <form onSubmit={handleSend} className="p-3 border-t border-gray-200 dark:border-white/5 flex items-center gap-3 bg-armoyu-card-bg">

      {/* Ekstra Butonlar (Emoji, Dosya Ekle vb.) */}
      <EmojiPicker onSelect={(emoji) => handleChange(text + emoji)} placement="top-left" />

      <button type="button" className="text-gray-400 hover:text-armoyu-primary p-2 transition-colors hidden sm:block shrink-0">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path></svg>
      </button>

      {/* Mesaj Girdisi */}
      <input
        type="text"
        value={text}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Bir mesaj yazın..."
        className="flex-1 min-w-0 bg-black/5 dark:bg-black/40 border border-black/10 dark:border-white/10 rounded-full px-4 py-2.5 text-sm text-armoyu-text placeholder-armoyu-text-muted focus:outline-none focus:border-armoyu-primary focus:ring-1 focus:ring-armoyu-primary transition-all shadow-inner"
      />

      {/* Gönder Butonu */}
      <Button variant="primary" className="rounded-full w-10 h-10 p-0 flex items-center justify-center shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb), 0.3)] shrink-0 group">
        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="translate-x-0.5 group-hover:translate-x-1 group-hover:-translate-y-0.5 transition-transform"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
      </Button>
    </form>
  );
}
