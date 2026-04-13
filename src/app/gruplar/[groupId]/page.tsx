'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { GroupProfileContent } from '../../../components/modules/community/GroupProfileContent';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params?.groupId as string;

  return (
    <div className="py-12 animate-in fade-in slide-in-from-right-8 duration-500">
      <GroupProfileContent groupId={groupId} />
    </div>
  );
}
