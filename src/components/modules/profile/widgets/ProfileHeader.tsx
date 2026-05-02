'use client';

import React, { useState } from 'react';
import { EditProfileModal } from './EditProfileModal';
import { User } from '../../../../models/auth/User';
import { MediaLightbox } from '../../../modules/posts/widgets/MediaLightbox';

import { MOCK_RANKING_POPULARITY } from '../../../../lib/constants/seedData';

interface ProfileHeaderProps {
  user: User | any;
  isOwnProfile?: boolean;
  onUserClick?: (username: string) => void;
}

export function ProfileHeader({ user, isOwnProfile, onUserClick }: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  console.log('[ARMOYU] Profile User Data:', {
    username: user.username,
    mutualFriendsCount: user.mutualFriendsCount,
    mutualFriends: user.mutualFriends
  });

  const name = user.displayName || user.name || 'İsimsiz Oyuncu';
  const banner = user.banner || 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop';
  const socials = user.socials || {};

  // Sıralama Bilgisi
  const rankIndex = MOCK_RANKING_POPULARITY.findIndex((r: any) => r.username === user.username);
  const rank = rankIndex !== -1 ? rankIndex + 1 : null;

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="h-48 md:h-72 w-full relative">
        <img src={banner || undefined} alt="Kapak" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Profil Alt Kısım */}
      <div className="px-6 md:px-10 pb-6 relative flex flex-col md:flex-row md:justify-between md:items-end">

        {/* Avatar & İsim */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20 relative z-10 mb-6 md:mb-0">
          <div className="relative group shrink-0">
            {/* Avatar Container */}
            <div
              onClick={() => setIsLightboxOpen(true)}
              className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 overflow-hidden shadow-xl transition-all duration-500 relative z-10 cursor-pointer hover:scale-105 active:scale-95"
              style={{
                borderColor: user.levelColor ? `#${user.levelColor}` : 'var(--armoyu-bg)',
                boxShadow: user.levelColor ? `0 0 20px #${user.levelColor}40` : 'none'
              }}
            >
              <img src={user.avatar || undefined} alt={name} className="w-full h-full object-cover" />
            </div>

            {/* Sıralama Rozeti */}
            {rank && (
              <div className={`absolute -top-1 -right-1 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex flex-col items-center justify-center shadow-xl border-2 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20 ${rank === 1 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300' :
                rank === 2 ? 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-slate-200' :
                  rank === 3 ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 border-orange-300' :
                    'bg-armoyu-primary border-armoyu-primary'
                }`}>
                {rank === 1 && (
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-100 mb-0.5"><path d="M5 21h14a2 2 0 0 0 2-2V5L12 2 3 5v14a2 2 0 0 0 2 2z"></path></svg>
                )}
                <span className="text-[10px] md:text-xs font-black text-white leading-none">#{rank}</span>
                <span className="text-[6px] md:text-[8px] font-bold text-white/80 uppercase tracking-tighter">POP</span>

              </div>
            )}
          </div>

          <div className="pb-2 text-center md:text-left">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-3">
              <h1 className="text-2xl md:text-3xl font-black text-armoyu-text tracking-tight">{name}</h1>
              {user.role && (
                <span
                  title={user.role.name}
                  className="text-[10px] md:text-xs font-black px-3 py-1.5 rounded-xl uppercase tracking-widest border shadow-sm transition-all duration-300"
                  style={{
                    color: user.role.color,
                    borderColor: `${user.role.color}40`,
                    backgroundColor: `${user.role.color}15`,
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = `${user.role.color}25`;
                    e.currentTarget.style.boxShadow = `0 0 15px ${user.role.color}30`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = `${user.role.color}15`;
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                >
                  {user.role.category || user.role.name}
                </span>
              )}
            </div>
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2.5 mt-1 mb-3">
              <p className="text-armoyu-primary dark:text-armoyu-primary font-extrabold text-sm md:text-base mr-1">@{user.username}</p>

              {/* Burç */}
              {user.zodiac && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-purple-500/5 dark:bg-purple-500/10 rounded-lg border border-purple-500/20 shadow-sm text-purple-600 dark:text-purple-400">
                  <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" /></svg>
                  <span className="text-[9px] font-black uppercase tracking-wider">
                    {user.zodiac}
                  </span>
                </div>
              )}

              {/* Favori Takım */}
              {user.favoriteTeam && user.favoriteTeam.id !== 'none' && (
                <div className="flex items-center gap-1.5 px-2 py-0.5 bg-black/5 dark:bg-white/5 rounded-lg border border-armoyu-card-border shadow-sm">
                  <img src={user.favoriteTeam.logo} alt={user.favoriteTeam.name} className="w-3.5 h-3.5 object-contain" />
                  <span className="text-[9px] font-black text-armoyu-text-muted uppercase tracking-wider">
                    {user.favoriteTeam.name}
                  </span>
                </div>
              )}
            </div>


            {/* Ortak Arkadaşlar */}
            {!isOwnProfile && user.mutualFriendsCount > 0 && (
              <div className="flex items-center justify-center md:justify-start gap-2.5 mt-4 group/mutual cursor-pointer">
                <div className="flex -space-x-2 overflow-hidden">
                  {user.mutualFriends?.slice(0, 3).map((f: any, i: number) => (
                    <img
                      key={i}
                      src={f.avatar}
                      className="w-6 h-6 rounded-full border-2 border-armoyu-card-bg bg-armoyu-card-bg object-cover"
                      alt=""
                    />
                  ))}
                </div>
                <p className="text-[11px] font-bold text-armoyu-text-muted leading-tight">
                  {user.mutualFriendsCount === 1 ? (
                    <span
                      onClick={() => onUserClick?.(user.mutualFriends[0]?.username)}
                      className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                    >
                      @{user.mutualFriends[0]?.username}
                    </span>
                  ) : user.mutualFriendsCount === 2 ? (
                    <>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[0]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[0]?.username}
                      </span>
                      <span className="mx-1">ve</span>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[1]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[1]?.username}
                      </span>
                    </>
                  ) : user.mutualFriendsCount === 3 ? (
                    <>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[0]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[0]?.username}
                      </span>
                      <span className="mr-1">,</span>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[1]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[1]?.username}
                      </span>
                      <span className="mx-1">ve</span>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[2]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[2]?.username}
                      </span>
                    </>
                  ) : (
                    <>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[0]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[0]?.username}
                      </span>
                      <span className="mr-1">,</span>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[1]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[1]?.username}
                      </span>
                      <span className="mr-1">,</span>
                      <span
                        onClick={() => onUserClick?.(user.mutualFriends[2]?.username)}
                        className="text-armoyu-text hover:text-armoyu-primary transition-colors cursor-pointer"
                      >
                        @{user.mutualFriends[2]?.username}
                      </span>
                      <span className="mx-1">ve</span>
                      <span className="text-armoyu-text">{user.mutualFriendsCount - 3} diğer kişi</span>
                    </>
                  )}
                  <span className="ml-1">ile arkadaş</span>
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Aksiyon Butonları */}
        <div className="flex gap-3 pb-2 flex-wrap justify-center md:justify-end w-full md:w-auto">
          {isOwnProfile ? (
            <button onClick={() => setIsEditModalOpen(true)} className="flex-1 md:flex-none px-6 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text font-bold rounded-xl transition-all border border-armoyu-card-border shadow-sm">
              Profili Düzenle
            </button>
          ) : (
            <>
              <button className="flex-1 md:flex-none px-8 py-2.5 bg-gradient-to-r from-armoyu-primary to-armoyu-primary hover:from-armoyu-primary hover:to-armoyu-primary text-white font-bold rounded-xl shadow-[0_0_15px_rgba(var(--armoyu-primary-rgb), 0.4)] transition-all">
                Arkadaş Ol
              </button>
              <button className="px-4 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text rounded-xl transition-all border border-armoyu-card-border" title="Mesaj Gönder">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </>
          )}
        </div>
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />

      <MediaLightbox
        isOpen={isLightboxOpen}
        onClose={() => setIsLightboxOpen(false)}
        media={[{ type: 'image', url: user.avatar, name: name }]}
        defaultOwner={{
          id: user.id || 0,
          username: user.username,
          displayName: name,
          avatar: user.avatar
        }}
      />
    </div>
  );
}
