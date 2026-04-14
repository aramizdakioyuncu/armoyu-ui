'use client';

import { useLayout } from '../../context/LayoutContext';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../context/SocketContext';

export function MainLayoutWrapper({ children, className = '' }: { children: React.ReactNode, className?: string }) {
  const { pageWidth } = useLayout();

  return (
    <main className={`flex-grow w-full overflow-x-hidden pt-8 px-4 md:px-8 mx-auto z-10 transition-all duration-700 ${pageWidth} ${className}`}>
      {children}
    </main>
  );
}
