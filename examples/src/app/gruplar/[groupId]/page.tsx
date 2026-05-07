'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import { CommunityLayout, MainLayoutWrapper } from '@armoyu/ui';

export default function GroupDetailPage() {
  const params = useParams();
  const groupId = params?.groupId as string;

  return (
    <MainLayoutWrapper className="py-12 animate-in fade-in slide-in-from-right-8 duration-500">
      <CommunityLayout groupId={groupId} />
    </MainLayoutWrapper>
  );
}
