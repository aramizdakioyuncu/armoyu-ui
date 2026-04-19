'use client';

import React, { useState } from 'react';
import { User } from '../../../../models/auth/User';
import { X, Search, Heart, Loader2 } from 'lucide-react';

interface SoulmateSelectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  friends: User[];
  onSelect: (user: User) => void;
}

export function SoulmateSelectorModal({ isOpen, onClose, friends, onSelect }: SoulmateSelectorModalProps) {
  const [search, setSearch] = useState('');
  
  if (!isOpen) return null;

  const filteredFriends = friends.filter(f => 
    f.username.toLowerCase().includes(search.toLowerCase()) || 
    f.displayName.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[600] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-lg relative z-10 overflow-hidden shadow-2xl animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-armoyu-card-border flex justify-between items-center bg-gradient-to-r from-pink-500/10 to-transparent">
          <div className="flex items-center gap-4">
             <div className="w-12 h-12 rounded-2xl bg-pink-500 flex items-center justify-center text-white shadow-xl shadow-pink-500/20">
                <Heart size={24} fill="currentColor" />
             </div>
             <div>
                <h3 className="text-xl font-black text-armoyu-text italic uppercase tracking-tighter">RUH EŞİNİ SEÇ</h3>
                <p className="text-xs font-bold text-armoyu-text-muted uppercase tracking-widest opacity-60">Sana en yakın olanı belirle</p>
             </div>
          </div>
          <button onClick={onClose} className="p-3 text-armoyu-text-muted hover:text-red-500 bg-black/5 hover:bg-black/10 rounded-2xl transition-all">
            <X size={24} />
          </button>
        </div>

        {/* Search */}
        <div className="p-6">
          <div className="relative group">
            <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-4 h-4 text-zinc-500 group-focus-within:text-pink-500 transition-colors" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Arkadaşlarında ara..."
              className="w-full bg-black/5 dark:bg-white/5 border border-armoyu-card-border focus:border-pink-500/50 rounded-2xl pl-14 pr-6 py-4 text-sm font-bold text-armoyu-text outline-none transition-all"
            />
          </div>
        </div>

        {/* Friends List */}
        <div className="max-h-[400px] overflow-y-auto px-6 pb-6 space-y-2 no-scrollbar">
          {filteredFriends.map((friend) => (
            <button
              key={friend.id}
              onClick={() => {
                onSelect(friend);
                onClose();
              }}
              className="w-full flex items-center gap-4 p-4 rounded-3xl hover:bg-pink-500/5 border border-transparent hover:border-pink-500/20 transition-all group"
            >
              <div className="relative">
                <img
                  src={friend.avatar || 'https://via.placeholder.com/100'}
                  alt={friend.username}
                  className="w-12 h-12 rounded-2xl object-cover shadow-lg group-hover:scale-105 transition-transform"
                />
                <div className="absolute -right-1 -bottom-1 w-5 h-5 bg-white dark:bg-zinc-900 rounded-lg flex items-center justify-center shadow-md">
                   <Heart size={10} className="text-pink-500" fill="currentColor" />
                </div>
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-black text-armoyu-text uppercase tracking-tight">{friend.displayName}</p>
                <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest opacity-50">@{friend.username}</p>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-all translate-x-2 group-hover:translate-x-0">
                 <button className="px-4 py-2 bg-pink-500 text-white text-[10px] font-black rounded-xl uppercase tracking-widest shadow-lg shadow-pink-500/20">
                    SEÇ
                 </button>
              </div>
            </button>
          ))}

          {filteredFriends.length === 0 && (
            <div className="py-12 text-center opacity-40">
               <Heart size={48} className="mx-auto mb-4 text-zinc-500" />
               <p className="text-xs font-black uppercase tracking-[0.2em]">Arkadaş Bulunamadı</p>
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
