import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useArmoyu } from '../../../context/ArmoyuContext';

interface MentionLinkProps {
  username: string;
}

export const MentionLink: React.FC<MentionLinkProps> = ({ username }) => {
  const { api } = useArmoyu();
  const [isHovered, setIsHovered] = useState(false);
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isHovered && !userData && !loading) {
      const fetchUserData = async () => {
        setLoading(true);
        try {
          // Kullanıcıyı ara (en hızlı yöntem)
          const response = await api.search.globalSearch(username, 1, 1);
          if (response.durum === 1 && response.icerik?.[0]) {
            setUserData(response.icerik[0]);
          }
        } catch (error) {
          console.error("Mention popup data failed:", error);
        } finally {
          setLoading(false);
        }
      };
      fetchUserData();
    }
  }, [isHovered, username, api, userData, loading]);

  return (
    <span className="relative inline-block group">
      <Link
        href={`/oyuncular/${username}`}
        className="text-armoyu-primary hover:text-armoyu-primary font-black transition-colors"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        @{username}
      </Link>

      {/* Hover Profile Preview Popup */}
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-64 bg-white dark:bg-zinc-900 border border-black/10 dark:border-white/10 rounded-2xl shadow-2xl p-4 animate-in fade-in zoom-in-95 duration-200 z-50 pointer-events-none">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-armoyu-primary to-indigo-600 p-[2px]">
              <div className="w-full h-full rounded-[10px] overflow-hidden bg-zinc-800">
                <img
                  src={userData?.image || `https://api.dicebear.com/7.x/avataaars/svg?seed=${username}`}
                  alt={username}
                  className={`w-full h-full object-cover transition-opacity duration-300 ${loading ? 'opacity-50' : 'opacity-100'}`}
                />
              </div>
            </div>
            <div className="min-w-0">
              <div className="text-sm font-black text-armoyu-text truncate uppercase tracking-tight italic">
                {userData?.title || `@${username}`}
              </div>
              <div className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-widest">
                {loading ? 'Yükleniyor...' : 'Oyuncu Profili'}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 bg-black/5 dark:bg-white/5 rounded-full overflow-hidden">
              <div className="w-1/3 h-full bg-armoyu-primary" />
            </div>
            <span className="text-[9px] font-black text-armoyu-primary">LVL 1</span>
          </div>

          <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/5 flex items-center justify-between">
            <span className="text-[10px] font-bold text-armoyu-text-muted">Profilini gör</span>
            <div className="w-4 h-4 rounded-full bg-armoyu-primary/10 flex items-center justify-center">
              <div className="w-1.5 h-1.5 rounded-full bg-armoyu-primary animate-pulse" />
            </div>
          </div>

          <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-8 border-transparent border-t-white dark:border-t-zinc-900" />
        </div>
      )}
    </span>
  );
};
