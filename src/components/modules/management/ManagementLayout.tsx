import React, { useState } from 'react';
import { ManagementSidebar, ManagementSidebarItem } from './ManagementSidebar';
import { ManagementMobileToggle } from './ManagementMobileToggle';
import { ManagementAccessDenied } from './ManagementAccessDenied';

export interface ManagementLayoutProps {
  children: React.ReactNode;
  sidebarItems: ManagementSidebarItem[];
  user: any;
  brandName?: string;
  panelVersion?: string;
  isAuthorized: boolean;
  onLogout?: () => void;
  AccessDeniedComponent?: React.ReactNode;
}

export const ManagementLayout = ({
  children,
  sidebarItems,
  user,
  brandName = 'ARMOYU',
  panelVersion = 'MGM V3',
  isAuthorized,
  onLogout,
  AccessDeniedComponent
}: ManagementLayoutProps) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  if (!isAuthorized) {
    return AccessDeniedComponent || <ManagementAccessDenied />;
  }

  return (
    <div className="min-h-screen bg-armoyu-bg text-armoyu-text flex overflow-hidden">
      <ManagementSidebar 
        isOpen={isSidebarOpen}
        sidebarItems={sidebarItems}
        user={user}
        brandName={brandName}
        panelVersion={panelVersion}
        onLogout={onLogout}
      />

      <main className="flex-1 flex flex-col min-w-0 relative h-screen">
        <div className="flex-1 overflow-y-auto p-4 md:p-8 hide-scrollbar">
          <ManagementMobileToggle 
            isOpen={isSidebarOpen} 
            onClick={() => setIsSidebarOpen(!isSidebarOpen)} 
          />

          <div className="mx-auto w-full max-w-[1600px] transition-all duration-300">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
};
