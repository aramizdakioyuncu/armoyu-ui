import React, { useState } from 'react';
import { Heart, MessageSquare, User } from 'lucide-react';

interface NewsDetailInteractionProps {
  initialLikes?: number;
  onCommentClick?: () => void;
}

export function NewsDetailInteraction({ initialLikes = 12, onCommentClick }: NewsDetailInteractionProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-3xl backdrop-blur-xl">
      <div className="flex items-center gap-4">
        <button 
          onClick={() => setIsLiked(!isLiked)}
          className={`flex items-center gap-2 px-6 py-2.5 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all ${
            isLiked ? 'bg-red-600 text-white shadow-lg shadow-red-600/20' : 'bg-white/5 text-white hover:bg-white/10'
          }`}
        >
          <Heart size={16} fill={isLiked ? "currentColor" : "none"} /> 
          {isLiked ? 'Beğendin' : 'Beğen'}
        </button>
        <button 
          onClick={onCommentClick}
          className="flex items-center gap-2 px-6 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all"
        >
          <MessageSquare size={16} /> Yorum Yap
        </button>
      </div>
      
      <div className="hidden sm:flex items-center gap-2 pr-2">
        <div className="flex -space-x-3">
          {[1,2,3].map(i => (
            <div key={i} className="w-8 h-8 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center overflow-hidden shadow-xl">
              <User size={14} className="text-white/20" />
            </div>
          ))}
        </div>
        <span className="text-[10px] font-bold text-armoyu-text-muted italic ml-2">ve {initialLikes} kişi daha beğendi</span>
      </div>
    </div>
  );
}
