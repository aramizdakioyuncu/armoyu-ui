'use client';

import React from 'react';

interface EventsLayoutProps {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}

export function EventsLayout({ sidebar, children }: EventsLayoutProps) {
  return (
    <div className="w-full flex-1 flex flex-col lg:flex-row gap-8 pb-20 animate-in fade-in slide-in-from-bottom-8 duration-700 items-start max-w-[1440px] mx-auto px-4">
       {/* Left Sidebar Area (Optional for Events) */}
       {sidebar && (
         <div className="w-full lg:w-80 shrink-0">
           {sidebar}
         </div>
       )}

       {/* Main Content Area */}
       <div className="flex-1 flex flex-col pt-2 min-w-0 w-full">
          {children}
       </div>
    </div>
  );
}
