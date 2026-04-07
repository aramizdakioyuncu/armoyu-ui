'use client';

import React, { useState } from 'react';
import { userList } from '../../../lib/constants/seedData';
import { useAuth } from '../../../context/AuthContext';
import { User } from '@armoyu/core';


interface Comment {
  id: string;
  user: User;
  text: string;
  date: string;
  likes: number;
  isLiked?: boolean;
}

export function NewsComments() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: userList.find((u: any) => u.username === 'mythx') || userList[1],
      text: 'V3 gerçekten devrimsel olmuş! Arayüzün hızı inanılmaz. Elinize sağlık ekibi.',
      date: '1 saat önce',
      likes: 12,
      isLiked: false
    },
    {
      id: '2',
      user: userList.find((u: any) => u.username === 'alperen_admin') || userList[2],
      text: 'Yeni grup sistemini sabırsızlıkla bekliyoruz. Topluluk için harika bir adım.',
      date: '45 dakika önce',
      likes: 8,
      isLiked: true
    }
  ]);

  const [newComment, setNewComment] = useState('');

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      user: userList[0], // Berkay (Siz)
      text: newComment,
      date: 'Şimdi',
      likes: 0,
      isLiked: false
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  const toggleLike = (id: string) => {
    setComments(prev => prev.map(c => {
      if (c.id === id) {
        return {
          ...c,
          likes: c.isLiked ? c.likes - 1 : c.likes + 1,
          isLiked: !c.isLiked
        };
      }
      return c;
    }));
  };

  return (
    <div className="mt-20 pt-16 border-t border-armoyu-card-border animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter mb-10 flex items-center gap-3">
        Yorumlar 
        <span className="text-sm font-bold bg-blue-600/10 text-blue-500 px-3 py-1 rounded-full">{comments.length}</span>
      </h3>

      {/* Comment Input */}
      <div className="glass-panel p-6 rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg shadow-sm mb-12">
        <div className="flex gap-4">
          <img 
            src={userList[0].avatar} 
            className="w-10 h-10 rounded-full border border-black/10 dark:border-white/10 shrink-0"
            alt="Avatar"
          />
          <div className="flex-1 space-y-4">
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Düşüncelerini paylaş..."
              className="w-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-armoyu-text focus:outline-none focus:border-blue-500 transition-all min-h-[100px] resize-none font-medium"
            />
            <div className="flex justify-end">
              <button 
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-black text-xs uppercase tracking-widest rounded-xl shadow-lg shadow-blue-500/20 active:scale-95 transition-all"
              >
                Yorum Yap
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comment List */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-5 group animate-in fade-in slide-in-from-left-4 duration-300">
            <img 
              src={comment.user.avatar} 
              className="w-12 h-12 rounded-2xl object-cover border border-armoyu-card-border shrink-0 shadow-sm"
              alt="Avatar"
            />
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h4 className="text-sm font-black text-armoyu-text uppercase tracking-tight">{comment.user.displayName}</h4>
                <span className="text-[10px] font-bold text-armoyu-text-muted opacity-60">• {comment.date}</span>
              </div>
              <p className="text-sm font-medium text-armoyu-text-muted leading-relaxed mb-4">
                {comment.text}
              </p>
              <div className="flex items-center gap-6">
                <button 
                  onClick={() => toggleLike(comment.id)}
                  className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest transition-colors ${comment.isLiked ? 'text-rose-500' : 'text-armoyu-text-muted hover:text-rose-500'}`}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill={comment.isLiked ? "currentColor" : "none"} stroke="currentColor" strokeWidth="3"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path></svg>
                  Beğen ({comment.likes})
                </button>
                <button className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted hover:text-blue-500 transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path></svg>
                  Yanıtla
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

