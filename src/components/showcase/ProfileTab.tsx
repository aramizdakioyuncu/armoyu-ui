import React from 'react';
import { 
  ProfileHeader, 
  ProfileStats, 
  ProfileContent, 
  userList 
} from '../../index';

export function ProfileTab() {
  const me = userList[0];
  
  return (
    <div className="space-y-12">
       <h3 className="text-2xl font-black italic uppercase tracking-tighter border-l-4 border-pink-500 pl-4">Kullanıcı Profili</h3>
       <ProfileHeader user={me} isOwnProfile={true} />
       <ProfileStats />
       <ProfileContent user={me} />
    </div>
  );
}
