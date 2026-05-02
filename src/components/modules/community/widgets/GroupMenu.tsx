'use client';

import React from 'react';
import { Group } from '../../../../models/community/Group';
import { User } from '../../../../models/auth/User';
import Link from 'next/link';

interface GroupMenuProps {
  group: Group;
  user: User;
  onLeave?: () => void;
}

export function GroupMenu({ group, user, onLeave }: GroupMenuProps) {
  // Check if owner or moderator
  const isOwner = group.owner?.username === user.username;
  const isMod = group.moderators?.some(m => m.username === user.username);
  const isAdmin = isOwner || isMod || user.role?.id === 'admin';

  const menuItems = [
    { id: 'management', label: 'GRUP YÖNETİMİ', icon: 'shield', color: 'text-armoyu-primary', permission: isAdmin },
    { id: 'members', label: 'ÜYE LİSTESİ', icon: 'users', color: 'text-armoyu-text' },
    { id: 'events', label: 'GRUP ETKİNLİKLERİ', icon: 'calendar', color: 'text-armoyu-text' },
    { id: 'settings', label: 'GRUP AYARLARI', icon: 'settings', color: 'text-armoyu-text', permission: isAdmin },
  ];

  return (
    <div className="glass-panel p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg relative overflow-hidden">
      {/* Decorative Gradient */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-armoyu-primary/10 blur-[60px] -mr-16 -mt-16 pointer-events-none" />

      <div className="flex items-center justify-between mb-8">
        <h4 className="text-xs font-black text-armoyu-text uppercase tracking-[0.2em] italic">GRUP MENÜSÜ</h4>
        <div className="px-2 py-0.5 bg-emerald-500/10 border border-emerald-500/20 rounded-md">
          <span className="text-[8px] font-black text-emerald-500 tracking-widest">AKTİF ÜYE</span>
        </div>
      </div>

      <div className="space-y-4">
        {menuItems.filter(item => item.permission !== false).map((item, idx) => (
          <Link
            key={item.id}
            href={`${group.getGroupUrl()}/${item.id === 'management' || item.id === 'settings' ? 'yonetim' : item.id === 'members' ? 'uyeler' : 'etkinlikler'}`}
            className="w-full flex items-center justify-between p-4 rounded-2xl bg-black/5 dark:bg-white/5 border border-black/5 dark:border-white/5 hover:border-armoyu-primary/30 hover:bg-armoyu-primary/5 transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className={`p-2.5 rounded-xl bg-white dark:bg-zinc-900 shadow-sm border border-black/5 dark:border-white/5 group-hover:scale-110 transition-transform ${item.color}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  {item.id === 'management' && <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />}
                  {item.id === 'members' && <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />}
                  {item.id === 'members' && <circle cx="9" cy="7" r="4" />}
                  {item.id === 'members' && <path d="M23 21v-2a4 4 0 0 0-3-3.87" />}
                  {item.id === 'members' && <path d="M16 3.13a4 4 0 0 1 0 7.75" />}
                  {item.id === 'events' && <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />}
                  {item.id === 'events' && <line x1="16" y1="2" x2="16" y2="6" />}
                  {item.id === 'events' && <line x1="8" y1="2" x2="8" y2="6" />}
                  {item.id === 'events' && <line x1="3" y1="10" x2="21" y2="10" />}
                  {item.id === 'settings' && <circle cx="12" cy="12" r="3" />}
                  {item.id === 'settings' && <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />}
                </svg>
              </div>
              <span className="text-[10px] font-black text-armoyu-text tracking-widest uppercase">{item.label}</span>
            </div>
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="text-armoyu-text-muted opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </Link>
        ))}
      </div>

      <div className="mt-8 pt-8 border-t border-black/5 dark:border-white/5">
        <button
          onClick={onLeave}
          className="w-full text-[10px] font-black text-red-500 uppercase tracking-[0.2em] hover:text-red-600 transition-colors"
        >
          GRUPTAN AYRIL
        </button>
      </div>
    </div>
  );
}
