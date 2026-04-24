'use client';

import React, { useState, useEffect } from 'react';
import { useAuth } from '../../../../context/AuthContext';
import { useArmoyu } from '../../../../context/ArmoyuContext';

export function LeagueWidget() {
  const { user: currentUser } = useAuth();
  const { api } = useArmoyu();
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchLeague() {
      if (!currentUser) {
        setData([]);
        setLoading(false);
        return;
      }
      setLoading(true);
      try {
        const response = await api.siteInfo.getLeagueStandings();
        if (response.durum === 1 && response.icerik) {
          setData(response.icerik);
        }
      } catch (error) {
        console.error('Failed to fetch league stats:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchLeague();
  }, [api, currentUser]);

  const standings = (data && data.length > 0) ? data.map((item: any) => ({
    team: item.teamName,
    p: item.points.toString(),
    logo: item.logo,
    color: item.teamName.includes('Galatasaray') ? 'bg-red-600' : 
           item.teamName.includes('Fenerbahçe') ? 'bg-yellow-500' : 
           item.teamName.includes('Beşiktaş') ? 'bg-black dark:bg-white' : 'bg-blue-500'
  })) : [
    { team: 'Galatasaray', p: '84', color: 'bg-red-600', logo: undefined },
    { team: 'Fenerbahçe', p: '82', color: 'bg-yellow-500', logo: undefined },
    { team: 'Beşiktaş', p: '65', color: 'bg-black dark:bg-white', logo: undefined },
    { team: 'Trabzonspor', p: '60', color: 'bg-blue-600', logo: undefined },
    { team: 'Başakşehir', p: '55', color: 'bg-orange-600', logo: undefined },
  ];

  return (
    <div className="glass-panel p-5 rounded-3xl border border-armoyu-card-border bg-armoyu-card-bg">
      <div className="flex items-center gap-2 mb-4">
         <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="text-blue-500"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg>
         <h3 className="font-extrabold text-armoyu-text text-base">Süper Lig</h3>
      </div>
      
      <div className="space-y-3">
        {loading ? (
          <div className="space-y-3">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex items-center justify-between p-2 animate-pulse">
                <div className="flex items-center gap-2.5">
                  <div className="w-1.5 h-1.5 rounded-full bg-gray-400" />
                  <div className="w-20 h-4 bg-black/5 dark:bg-white/10 rounded" />
                </div>
                <div className="w-6 h-4 bg-black/5 dark:bg-white/10 rounded" />
              </div>
            ))}
          </div>
        ) : (
          standings.map((item, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-xl hover:bg-black/5 transition-colors group">
              <div className="flex items-center gap-2.5">
                 <span className="text-[10px] font-black text-armoyu-text-muted w-3">{idx + 1}</span>
                 {item.logo ? (
                   <img src={item.logo} className="w-4 h-4 object-contain" alt={item.team} />
                 ) : (
                   <div className={`w-1.5 h-1.5 rounded-full ${item.color || 'bg-blue-500'}`} />
                 )}
                 <span className="text-xs font-bold text-armoyu-text group-hover:text-blue-500 transition-colors truncate max-w-[120px]">{item.team}</span>
              </div>
              <span className="text-xs font-black text-armoyu-text">{item.p}</span>
            </div>
          ))
        )}
      </div>

      <button className="w-full pt-3 text-[10px] font-bold text-blue-500 hover:underline border-t border-armoyu-card-border mt-3">
         Tüm Puan Durumu
      </button>
    </div>
  );
}
