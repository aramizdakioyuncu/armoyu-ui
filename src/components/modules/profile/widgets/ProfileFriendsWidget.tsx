'use client';

import React from 'react';

interface ProfileFriendsWidgetProps {
  friendsCount: number;
  friendsList: any[];
  onSeeAll: () => void;
}

export function ProfileFriendsWidget({ friendsCount, friendsList, onSeeAll }: ProfileFriendsWidgetProps) {
  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <div className="flex justify-between items-center mb-5">
        <h3 className="text-lg font-black text-armoyu-text">
          Arkadaşlar <span className="text-armoyu-primary ml-1">{friendsCount}</span>
        </h3>
        <button
          onClick={onSeeAll}
          className="text-xs font-bold text-armoyu-primary hover:underline"
        >
          Tümünü Gör
        </button>
      </div>

      <div className="grid grid-cols-5 gap-2">
        {friendsList.length === 0 && (
          <p className="col-span-5 text-xs font-bold text-armoyu-text-muted">{friendsCount > 0 ? 'Arkadaş listesi görünmüyor.' : 'Henüz arkadaş yok.'}</p>
        )}
        {friendsList.slice(0, 5).map((friend, idx) => (
          <div key={friend.id || idx} className="group relative">
            <img
              src={friend.avatar || undefined}
              alt={friend.displayName}
              className="w-10 h-10 rounded-xl object-cover border border-white/10 group-hover:scale-110 transition-transform cursor-pointer shadow-sm"
              title={friend.displayName}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
