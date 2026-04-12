'use client';

import React from 'react';
import { User } from '@armoyu/core';
import { Users, Search, UserPlus } from 'lucide-react';

interface FriendsTabProps {
  friends: any[];
  totalCount?: number;
  isLoading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export function FriendsTab({ friends, totalCount, isLoading, hasMore, onLoadMore }: FriendsTabProps) {
  const displayCount = totalCount !== undefined ? totalCount : friends.length;
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
            <Users size={24} />
          </div>
          <div>
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">ARKADAŞ LİSTESİ</h3>
            <p className="text-[10px] font-bold text-armoyu-text-muted mt-1 uppercase tracking-widest leading-none">Toplam {displayCount} bağlantı</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-armoyu-text-muted group-focus-within:text-blue-500 transition-colors" size={16} />
            <input 
              type="text" 
              placeholder="Arkadaşlarda ara..." 
              className="bg-armoyu-card-bg border border-armoyu-card-border rounded-2xl pl-11 pr-4 py-3 text-xs font-bold text-armoyu-text focus:outline-none focus:border-blue-500 transition-all w-full md:w-64"
            />
          </div>
          <button className="p-3 bg-blue-600 text-white rounded-2xl hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/20">
             <UserPlus size={20} />
          </button>
        </div>
      </div>

      {friends.length > 0 ? (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <div
              key={friend.id}
              className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] p-6 shadow-sm hover:shadow-xl hover:shadow-blue-500/5 transition-all group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/5 blur-2xl rounded-full" />
              
              <div className="flex flex-col items-center text-center relative z-10">
                <div className="relative mb-4">
                   <div className="w-20 h-20 rounded-[28px] overflow-hidden border-2 border-armoyu-card-border group-hover:border-blue-500 transition-colors bg-black/5">
                      <img src={friend.avatar || undefined} alt={friend.displayName} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                   </div>
                   <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-lg bg-emerald-500 border-4 border-armoyu-card-bg flex items-center justify-center shadow-lg">
                      <div className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                   </div>
                </div>

                <h4 className="text-base font-black text-armoyu-text truncate w-full uppercase tracking-tighter italic">{friend.displayName}</h4>
                <p className="text-xs font-bold text-blue-500 mb-4 lowercase">@{friend.username}</p>
                
                <button className="w-full py-2.5 rounded-xl border border-armoyu-card-border text-[10px] font-black text-armoyu-text-muted hover:text-blue-500 hover:border-blue-500/50 hover:bg-blue-500/5 transition-all uppercase tracking-widest">
                   Profili Gör
                </button>
              </div>
            </div>
          ))}
          </div>
          {hasMore && onLoadMore && (
            <div className="flex justify-center mt-6">
              <button
                onClick={onLoadMore}
                disabled={isLoading}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-lg shadow-blue-600/20 active:scale-95 flex items-center gap-2"
              >
                {isLoading ? (
                  <><div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" /> YÜKLENİYOR...</>
                ) : "DAHA FAZLA GÖSTER"}
              </button>
            </div>
          )}
        </>
      ) : (
        <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-20 text-center">
           <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center text-armoyu-text-muted mx-auto mb-6">
              <Users size={40} />
           </div>
           <h3 className="text-xl font-bold text-armoyu-text mb-2 uppercase italic">Henüz arkadaşın yok</h3>
           <p className="text-armoyu-text-muted text-sm max-w-xs mx-auto italic font-medium">Birlikte oyun oynamak için yeni arkadaşlar ekleyerek ARMOYU dünyasını keşfedebilirsin.</p>
        </div>
      )}
    </div>
  );
}
