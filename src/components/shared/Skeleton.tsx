import React from 'react';

/** Yükleme yer tutucusu; boyut ve köşe className ile verilir */
export function Skeleton({ className = '' }: { className?: string }) {
  return <div aria-hidden="true" className={`bg-black/5 dark:bg-white/5 animate-pulse ${className}`} />;
}

/** Profil sayfası iskeleti: kapak, istatistik şeridi, yan panel ve akış */
export function ProfileSkeleton() {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 space-y-6" aria-busy="true" aria-label="Profil yükleniyor">
      <div className="relative">
        <Skeleton className="h-64 rounded-[40px]" />
        <div className="absolute -bottom-10 left-8 flex items-end gap-4">
          <Skeleton className="w-28 h-28 rounded-[32px] border-4 border-armoyu-bg" />
          <div className="space-y-2 pb-2">
            <Skeleton className="h-6 w-48 rounded-xl" />
            <Skeleton className="h-4 w-32 rounded-xl" />
          </div>
        </div>
      </div>
      <Skeleton className="h-24 rounded-[32px] mt-14" />
      <div className="flex flex-col lg:flex-row gap-6">
        <Skeleton className="w-full lg:w-80 h-80 rounded-[32px]" />
        <div className="flex-1 space-y-4">
          <Skeleton className="h-40 rounded-[32px]" />
          <Skeleton className="h-40 rounded-[32px]" />
        </div>
      </div>
    </div>
  );
}
