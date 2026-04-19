'use client';

import React from 'react';
import { ProfileBadgesWidget } from './ProfileBadgesWidget';
import { ProfileFriendsWidget } from './ProfileFriendsWidget';
import { ProfileInfoWidget } from './ProfileInfoWidget';
import { CloudWidget } from '../../../../index';
import { User } from '../../../../models/auth/User';

interface ProfileSidebarProps {
  displayUser?: User | null;
  isOwnProfile: boolean;
  friends: User[];
  onSeeAllFriends: () => void;
  onManageCloud: () => void;
}

export function ProfileSidebar({
  displayUser,
  isOwnProfile,
  friends,
  onSeeAllFriends,
  onManageCloud
}: ProfileSidebarProps) {
  return (
    <div className="w-full shrink-0 space-y-6">
      <ProfileInfoWidget user={displayUser || null} />
      <ProfileBadgesWidget />

      {isOwnProfile && (
        <CloudWidget onManageCloud={onManageCloud} />
      )}

      <ProfileFriendsWidget
        friendsCount={displayUser?.friendCount || friends.length || 0}
        friendsList={friends.length > 0 ? friends : (displayUser?.friends || [])}
        onSeeAll={onSeeAllFriends}
      />
    </div>
  );
}
