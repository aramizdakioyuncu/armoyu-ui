'use client';

import React, { useState } from 'react';
import { EditProfileModal } from './EditProfileModal';
import { User } from '@armoyu/core';

import { userList, MOCK_RANKING_POPULARITY } from '../../../lib/constants/seedData';

interface ProfileHeaderProps {
  user: User | any;
  isOwnProfile?: boolean;
}

export function ProfileHeader({ user, isOwnProfile }: ProfileHeaderProps) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const name = user.displayName || user.name || 'İsimsiz Oyuncu';
  const banner = user.banner || 'https://images.unsplash.com/photo-1614680376593-902f74cf0d41?q=80&w=2574&auto=format&fit=crop';
  const badge = user.badge || user.role?.name || '';
  const socials = user.socials || {};

  // Sıralama Bilgisi
  const rankIndex = MOCK_RANKING_POPULARITY.findIndex((r: any) => r.username === user.username);
  const rank = rankIndex !== -1 ? rankIndex + 1 : null;

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl overflow-hidden shadow-sm">
      {/* Banner */}
      <div className="h-48 md:h-72 w-full relative">
        <img src={banner} alt="Kapak" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>
      
      {/* Profil Alt Kısım */}
      <div className="px-6 md:px-10 pb-6 relative flex flex-col md:flex-row md:justify-between md:items-end">
        
        {/* Avatar & İsim */}
        <div className="flex flex-col md:flex-row md:items-end gap-4 md:gap-6 -mt-16 md:-mt-20 relative z-10 mb-6 md:mb-0">
          <div className="relative group shrink-0">
            {/* Avatar Container */}
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-armoyu-bg overflow-hidden shadow-xl bg-black/5 dark:bg-white/5">
              <img src={user.avatar} alt={name} className="w-full h-full object-cover" />
            </div>
            
            {/* Sıralama Rozeti */}
            {rank && (
              <div className={`absolute -top-1 -right-1 w-10 h-10 md:w-12 md:h-12 rounded-2xl flex flex-col items-center justify-center shadow-xl border-2 transform rotate-12 group-hover:rotate-0 transition-transform duration-500 z-20 ${
                rank === 1 ? 'bg-gradient-to-br from-yellow-400 via-yellow-500 to-yellow-600 border-yellow-300' :
                rank === 2 ? 'bg-gradient-to-br from-slate-300 via-slate-400 to-slate-500 border-slate-200' :
                rank === 3 ? 'bg-gradient-to-br from-orange-400 via-orange-500 to-orange-600 border-orange-300' :
                'bg-blue-600 border-blue-400'
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
              {badge && (
                <span className="bg-blue-500/10 text-blue-600 dark:text-blue-400 text-xs font-bold px-2.5 py-1 rounded-md uppercase tracking-wider border border-blue-500/20 shadow-sm">{badge}</span>
              )}
            </div>
            <p className="text-blue-600 dark:text-blue-400 font-extrabold mt-1 text-sm md:text-base mb-3">@{user.username}</p>
            
            {/* Sosyal Medya İkonları */}
            {socials && (
              <div className="flex items-center justify-center md:justify-start gap-4 mt-2">
                {socials.discord && (
                  <a href={socials.discord} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center transition-all hover:scale-110" title="Discord">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0788-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
                  </a>
                )}
                {socials.steam && (
                  <a href={socials.steam} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#171a21]/5 hover:bg-[#171a21]/15 dark:bg-[#171a21]/80 dark:hover:bg-[#171a21] text-[#171a21] dark:text-white flex items-center justify-center transition-all hover:scale-110" title="Steam">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M11.97 0C5.35 0 0 5.37 0 12c0 2.87 1.02 5.51 2.71 7.55l3.82-5.59c-.06-.31-.08-.63-.08-.96 0-3.32 2.68-6 6-6s6 2.68 6 6-2.68 6-6 6c-.84 0-1.63-.17-2.36-.5l-3.23 4.74A11.961 11.961 0 0 0 11.97 24c6.62 0 12-5.37 12-12s-5.38-12-12-12m6.25 11.89c0 1.6-1.29 2.89-2.89 2.89a2.89 2.89 0 0 1-2.89-2.89c0-1.6 1.29-2.89 2.89-2.89s2.89 1.29 2.89 2.89M8.38 14.88c-.85.34-1.8.1-2.38-.6a2.031 2.031 0 0 1 .59-2.85c.85-.34 1.8-.1 2.38.6.59.71.26 2.5-.59 2.85"/></svg>
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 flex items-center justify-center transition-all hover:scale-110" title="Instagram">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] flex items-center justify-center transition-all hover:scale-110" title="LinkedIn">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
                  </a>
                )}
                {socials.facebook && (
                  <a href={socials.facebook} target="_blank" rel="noopener noreferrer" className="w-8 h-8 rounded-full bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center transition-all hover:scale-110" title="Facebook">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
                  </a>
                )}
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
              <button className="flex-1 md:flex-none px-8 py-2.5 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all">
                Takip Et
              </button>
              <button className="px-4 py-2.5 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 text-armoyu-text rounded-xl transition-all border border-armoyu-card-border" title="Mesaj Gönder">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
              </button>
            </>
          )}
        </div>
      </div>

      <EditProfileModal isOpen={isEditModalOpen} onClose={() => setIsEditModalOpen(false)} user={user} />
    </div>
  );
}

