import React, { useState } from 'react';
import { AnimatedStat } from '../../../shared/AnimatedStat';
import { User } from '../../../../models/auth/User';
import { Edit3 } from 'lucide-react';

interface ProfileStatsProps {
  user: User;
  isOwnProfile?: boolean;
  onEditBio?: () => void;
}

export function ProfileStats({ user, isOwnProfile, onEditBio }: ProfileStatsProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const honorPoints = user.odp || 0;

  // Level & XP calculations (Assuming 1000 XP per level for simplicity in UI bar)
  const level = user.level || 1;
  const xp = user.xp || 0;
  const nextLevelXp = 1000;
  const progress = Math.min((xp / nextLevelXp) * 100, 100);

  return (
    <div className="w-full bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm flex flex-col gap-6">
      
      {/* Üst Satır: Rakamlar ve Seviye */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6">
        {/* Rakamlar */}
        <div className="flex flex-wrap justify-center md:justify-start gap-6 md:gap-12 w-full md:w-auto">
          <div className="text-center md:text-left">
            <div className="text-2xl font-black text-armoyu-text">
              <AnimatedStat value={user.postCount || 0} />
            </div>
            <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Paylaşım</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-black text-armoyu-text">
              <AnimatedStat value={user.awardCount || 0} />
            </div>
            <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Ödül</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-black text-armoyu-text">
              <AnimatedStat value={(user as any).friendsCount || 0} />
            </div>
            <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Arkadaşlar</div>
          </div>
          <div className="text-center md:text-left">
            <div className="text-2xl font-black text-emerald-500">
              <AnimatedStat value={user.odp || 0} />
            </div>
            <div className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider mt-1">Onur Puanı</div>
          </div>
        </div>

        {/* Level / XP */}
        <div 
          className="w-full md:w-72 rounded-2xl p-4 border transition-all duration-500"
          style={{ 
            backgroundColor: user.levelColor ? `#${user.levelColor}15` : 'rgba(0,0,0,0.05)',
            borderColor: user.levelColor ? `#${user.levelColor}30` : 'rgba(0,0,0,0.05)',
            boxShadow: user.levelColor ? `0 10px 40px -10px #${user.levelColor}40` : 'none',
            background: user.levelColor ? `linear-gradient(135deg, #${user.levelColor}10, #${user.levelColor}20)` : undefined
          }}
        >
          <div className="flex justify-between items-end mb-2">
            <div>
              <span className="text-xs font-bold text-armoyu-text-muted uppercase tracking-wider">Oyuncu Seviyesi</span>
              <div 
                className="text-xl font-black text-armoyu-text mt-0.5 flex items-center gap-1 tracking-tighter"
              >
                SEVİYE <AnimatedStat value={level} />
              </div>
            </div>
            <div className="text-xs font-bold text-armoyu-text-muted flex items-center gap-1">
              <AnimatedStat value={xp} /> / <AnimatedStat value={nextLevelXp} /> XP
            </div>
          </div>
          <div className="h-2.5 w-full bg-black/10 dark:bg-white/5 rounded-full overflow-hidden border border-black/5">
            <div
              className="h-full rounded-full transition-all duration-1000"
              style={{ 
                width: `${progress}%`,
                backgroundColor: user.levelColor ? `#${user.levelColor}` : 'var(--armoyu-primary)',
                boxShadow: user.levelColor ? `0 0 15px #${user.levelColor}60` : '0 0 15px rgba(var(--armoyu-primary-rgb), 0.6)'
              }}
            />
          </div>
        </div>
      </div>

      {/* Alt Satır: Bio / Hakkında */}
      <div className="w-full pt-6 border-t border-armoyu-card-border">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-4 bg-armoyu-primary rounded-full" />
            <h3 className="text-xs font-black text-armoyu-text uppercase tracking-tight italic">Hakkında</h3>
          </div>
          {isOwnProfile && (
            <button 
              onClick={onEditBio}
              className="p-1 px-3 text-[10px] font-black text-armoyu-primary bg-armoyu-primary/10 rounded-lg hover:bg-armoyu-primary hover:text-white transition-all flex items-center gap-1.5"
            >
              <Edit3 size={12} />
              DÜZENLE
            </button>
          )}
        </div>
        <p className="text-sm font-bold text-armoyu-text leading-relaxed italic">
          {isExpanded || (user.bio || '').length <= 60 
            ? (user.bio || (isOwnProfile ? 'Henüz bir biyografi eklemedin...' : 'Bu kullanıcı henüz bir biyografi eklememiş.'))
            : `${user.bio?.substring(0, 60)}...`
          }
          {(user.bio || '').length > 60 && (
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="ml-2 text-[10px] font-black text-armoyu-primary hover:text-armoyu-primary uppercase tracking-widest transition-all"
            >
              {isExpanded ? 'Daha Az' : 'Daha Fazla'}
            </button>
          )}
        </p>

        {/* Sosyal Medya İkonları */}
        {user.socials && Object.values(user.socials).some(v => v) && (
          <div className="flex items-center gap-3 mt-4">
            {user.socials.discord && (
              <a href={user.socials.discord} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-[#5865F2]/10 hover:bg-[#5865F2]/20 text-[#5865F2] flex items-center justify-center transition-all hover:scale-110" title="Discord">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2498-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8745-.6177-1.2498a.077.077 0 00-.0788-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z"/></svg>
              </a>
            )}
            {user.socials.steam && (
              <a href={user.socials.steam} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-[#171a21]/5 hover:bg-[#171a21]/15 dark:bg-[#171a21]/80 dark:hover:bg-[#171a21] text-[#171a21] dark:text-white flex items-center justify-center transition-all hover:scale-110" title="Steam">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M11.97 0C5.35 0 0 5.37 0 12c0 2.87 1.02 5.51 2.71 7.55l3.82-5.59c-.06-.31-.08-.63-.08-.96 0-3.32 2.68-6 6-6s6 2.68 6 6-2.68 6-6 6c-.84 0-1.63-.17-2.36-.5l-3.23 4.74A11.961 11.961 0 0 0 11.97 24c6.62 0 12-5.37 12-12s-5.38-12-12-12m6.25 11.89c0 1.6-1.29 2.89-2.89 2.89a2.89 2.89 0 0 1-2.89-2.89c0-1.6 1.29-2.89 2.89-2.89s2.89 1.29 2.89 2.89M8.38 14.88c-.85.34-1.8.1-2.38-.6a2.031 2.031 0 0 1 .59-2.85c.85-.34 1.8-.1 2.38.6.59.71.26 2.5-.59 2.85"/></svg>
              </a>
            )}
            {user.socials.instagram && (
              <a href={user.socials.instagram} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-pink-500/10 hover:bg-pink-500/20 text-pink-500 flex items-center justify-center transition-all hover:scale-110" title="Instagram">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
              </a>
            )}
            {user.socials.linkedin && (
              <a href={user.socials.linkedin} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-[#0077b5]/10 hover:bg-[#0077b5]/20 text-[#0077b5] flex items-center justify-center transition-all hover:scale-110" title="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg>
              </a>
            )}
            {user.socials.facebook && (
              <a href={user.socials.facebook} target="_blank" rel="noopener noreferrer" className="w-7 h-7 rounded-lg bg-[#1877F2]/10 hover:bg-[#1877F2]/20 text-[#1877F2] flex items-center justify-center transition-all hover:scale-110" title="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
              </a>
            )}
          </div>
        )}
      </div>

    </div>
  );
}
