import React from 'react';
import { ProfileBadgesWidget } from './ProfileBadgesWidget';
import { ProfileFriendsWidget } from './ProfileFriendsWidget';
import { ProfileGroupsWidget } from './ProfileGroupsWidget';
import { ProfileGamesWidget } from './ProfileGamesWidget';
import { ProfileInfoWidget } from './ProfileInfoWidget';
import { CloudWidget } from '../../../../index';
import { User } from '../../../../models/auth/User';

interface ProfileSidebarProps {
  displayUser?: User | null;
  isOwnProfile: boolean;
  friends: User[];
  onSeeAllFriends: () => void;
  onSeeAllGroups: () => void;
  onSeeAllGames: () => void;
  onManageCloud: () => void;
  onSoulmateEdit?: () => void;
}

export function ProfileSidebar({
  displayUser,
  isOwnProfile,
  friends,
  onSeeAllFriends,
  onSeeAllGroups,
  onSeeAllGames,
  onManageCloud,
  onSoulmateEdit
}: ProfileSidebarProps) {
  return (
    <div className="w-full shrink-0 space-y-6">
      <ProfileInfoWidget 
        user={displayUser || null} 
        isOwnProfile={isOwnProfile}
        onSoulmateEdit={onSoulmateEdit}
      />
      <ProfileBadgesWidget />

      {isOwnProfile && (
        <CloudWidget onManageCloud={onManageCloud} />
      )}

      <ProfileFriendsWidget
        friendsCount={displayUser?.friendCount || friends.length || 0}
        friendsList={friends.length > 0 ? friends : (displayUser?.friends || [])}
        onSeeAll={onSeeAllFriends}
      />

      <ProfileGroupsWidget 
        groups={displayUser?.groups || []}
        onSeeAll={onSeeAllGroups}
      />

      <ProfileGamesWidget 
        games={displayUser?.playedGames || []}
        onSeeAll={onSeeAllGames}
      />
    </div>
  );
}
