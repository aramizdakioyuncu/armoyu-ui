'use client';

import React from 'react';
import { X, Heart, Repeat, User as UserIcon, ChevronRight } from 'lucide-react';
import { User } from '@armoyu/core';
import Link from 'next/link';

interface PostInteractionsModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  likes?: User[];
  reposts?: User[];
  defaultTab?: 'likes' | 'reposts';
}

export function PostInteractionsModal({
  isOpen,
  onClose,
  title = 'Etkileşimler',
  likes = [],
  reposts = [],
  defaultTab = 'likes'
}: PostInteractionsModalProps) {
  const [activeTab, setActiveTab] = React.useState<'likes' | 'reposts'>(defaultTab);

  if (!isOpen) return null;

  const currentList = activeTab === 'likes' ? likes : reposts;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-6">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-md animate-in fade-in duration-300"
        onClick={onClose}
      />

      {/* Modal Content */}
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] w-full max-w-md relative z-10 shadow-2xl flex flex-col max-h-[80vh] overflow-hidden animate-in zoom-in-95 duration-300">

        {/* Header */}
        <div className="p-6 border-b border-armoyu-card-border flex items-center justify-between bg-black/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-blue-600/10 flex items-center justify-center text-blue-500">
              {activeTab === 'likes' ? <Heart size={20} fill="currentColor" /> : <Repeat size={20} />}
            </div>
            <div>
              <h3 className="text-lg font-black text-armoyu-text uppercase italic tracking-tighter leading-none">{title}</h3>
              <p className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest mt-1">
                {currentList.length} Kişi Listeleniyor
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 text-armoyu-text-muted hover:text-armoyu-text bg-black/10 hover:bg-black/20 rounded-xl transition-all"
          >
            <X size={20} />
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-armoyu-card-border bg-black/5 px-2">
          <button
            onClick={() => setActiveTab('likes')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'likes' ? 'text-blue-500' : 'text-armoyu-text-muted hover:text-armoyu-text'
              }`}
          >
            Beğeniler
            {activeTab === 'likes' && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-blue-500 rounded-full" />}
          </button>
          <button
            onClick={() => setActiveTab('reposts')}
            className={`flex-1 py-4 text-xs font-black uppercase tracking-widest transition-all relative ${activeTab === 'reposts' ? 'text-green-500' : 'text-armoyu-text-muted hover:text-armoyu-text'
              }`}
          >
            Yeniden Paylaşımlar
            {activeTab === 'reposts' && <div className="absolute bottom-0 left-4 right-4 h-0.5 bg-green-500 rounded-full" />}
          </button>
        </div>

        {/* User List */}
        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
          {currentList.length > 0 ? (
            <div className="space-y-2">
              {currentList.map((user, idx) => (
                <Link
                  key={user.id || idx}
                  href={user.getProfileUrl()}
                  onClick={onClose}
                  className="flex items-center gap-4 p-3 rounded-2xl hover:bg-black/5 dark:hover:bg-white/5 transition-all group border border-transparent hover:border-armoyu-card-border"
                >
                  <div className="relative shrink-0">
                    <img
                      src={user.avatar}
                      className="w-11 h-11 rounded-2xl object-cover ring-2 ring-transparent group-hover:ring-blue-500/30 transition-all font-bold"
                      alt=""
                    />
                    {user.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-blue-500 text-white p-0.5 rounded-lg border-2 border-armoyu-card-bg shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-black text-armoyu-text uppercase italic tracking-tighter truncate">{user.displayName}</div>
                    <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest leading-none">@{user.username}</div>
                  </div>
                  <ChevronRight size={16} className="text-armoyu-text-muted opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center opacity-40">
              <div className="w-16 h-16 rounded-full bg-black/10 flex items-center justify-center mb-4">
                <UserIcon size={32} />
              </div>
              <h4 className="text-sm font-black uppercase italic tracking-widest">Henüz Kimse Yok</h4>
              <p className="text-[10px] font-medium uppercase mt-2">Bu paylaşım henüz etkileşim almamış.</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-armoyu-card-border bg-black/5 text-center">
          <button
            onClick={onClose}
            className="text-[10px] font-black text-armoyu-text-muted hover:text-armoyu-text uppercase tracking-widest transition-all"
          >
            Kapat
          </button>
        </div>
      </div>
    </div>
  );
}

