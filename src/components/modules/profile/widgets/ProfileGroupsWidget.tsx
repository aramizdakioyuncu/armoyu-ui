'use client';

import React from 'react';
import { Users } from 'lucide-react';

interface ProfileGroupsWidgetProps {
  groups: any[];
  onSeeAll: () => void;
}

export function ProfileGroupsWidget({ groups, onSeeAll }: ProfileGroupsWidgetProps) {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-black text-armoyu-text">
          Gruplar <span className="text-indigo-500 ml-1">{groups.length}</span>
        </h3>
        <button
          onClick={onSeeAll}
          className="text-xs font-bold text-armoyu-primary hover:underline"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {(groups.length > 0 ? groups : [
          { id: 1, avatar: 'https://via.placeholder.com/100', name: 'Grup 1' },
          { id: 2, avatar: 'https://via.placeholder.com/100', name: 'Grup 2' },
          { id: 3, avatar: 'https://via.placeholder.com/100', name: 'Grup 3' }
        ]).slice(0, 5).map((group, idx) => (
          <div key={group.id || idx} className="group relative">
            <img
              src={group.avatar || group.grupavatar || 'https://via.placeholder.com/100'}
              alt={group.name || group.grupad}
              className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform cursor-pointer shadow-sm"
              title={group.name || group.grupad}
            />
          </div>
        ))}
      </div>
      
      {groups.length === 0 && (
         <div className="mt-4 py-8 text-center border-2 border-dashed border-armoyu-card-border rounded-2xl opacity-40">
           <Users size={24} className="mx-auto mb-2" />
           <p className="text-[10px] font-black uppercase tracking-widest">Grup Yok</p>
         </div>
      )}
    </div>
  );
}
