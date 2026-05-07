'use client';

import React from 'react';
import { useParams, useRouter } from 'next/navigation';
import { DetailPage } from '@armoyu/ui/components/modules/events/DetailPage';
import { PageWidth } from '@armoyu/ui';

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.eventId as string;

  return (
    <div className="py-12 bg-armoyu-bg min-h-screen">
      <PageWidth width="max-w-[80%]" />
      <div className="px-4">
        <DetailPage 
          eventId={eventId} 
          onBack={() => router.back()} 
        />
      </div>
    </div>
  );
}
