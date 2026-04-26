'use client';

import React from 'react';
import { SocialFeed } from '../../../../index';
import { User } from '../../../../models/auth/User';

interface TaggedPostsTabProps {
  user: User | null;
}

export function TaggedPostsTab({ user }: TaggedPostsTabProps) {
  if (!user) return null;

  return (
    <div className="animate-in fade-in duration-700">
      <SocialFeed 
        username={user.username}
        feature="etiketlenmis"
        emptyMessage={`${user.getName()} kişisinin etiketlendiği bir paylaşım bulunamadı.`}
      />
    </div>
  );
}
