'use client';

import React from 'react';
import { PageWidth } from '../../shared/PageWidth';

interface EventsLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export function EventsLayout({ sidebar, children }: EventsLayoutProps) {
  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-6 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start">
       <PageWidth width="max-w-[1280px]" />
       {/* Left Sidebar Area (Optional for Events) */}
       {sidebar && (
         <div className="w-full lg:w-80 shrink-0 space-y-4">
           {sidebar}
         </div>
       )}

       {/* Main Content Area */}
       <div className="flex-1 flex flex-col pt-2 min-w-0 w-full space-y-4">
          {children}
       </div>
    </div>
  );
}
