'use client';

import React from 'react';

interface StoreLayoutProps {
  sidebar: React.ReactNode;
  children: React.ReactNode;
}

export function StoreLayout({ sidebar, children }: StoreLayoutProps) {
  return (
    <div className="w-full flex-1 flex gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start max-w-[1440px] mx-auto px-4">
       {/* Left Sidebar Area */}
       <div className="hidden lg:block">
         {sidebar}
       </div>

       {/* Main Content Area (Feed) */}
       <div className="flex-1 flex flex-col pt-2 min-w-0">
          {children}
       </div>
    </div>
  );
}
