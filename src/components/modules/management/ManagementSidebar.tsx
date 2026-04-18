import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShieldCheck, ChevronRight, ArrowLeft } from 'lucide-react';

export interface ManagementSidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredRoles?: string[];
}

export interface ManagementSidebarProps {
  isOpen: boolean;
  sidebarItems: ManagementSidebarItem[];
  user: any;
  brandName?: string;
  panelVersion?: string;
  onLogout?: () => void;
}

export const ManagementSidebar = ({
  isOpen,
  sidebarItems,
  user,
  brandName = 'ARMOYU',
  panelVersion = 'MGM V3',
  onLogout
}: ManagementSidebarProps) => {
  const pathname = usePathname();

  return (
    <aside
      className={`fixed lg:relative z-50 h-full bg-armoyu-header-bg border-r border-armoyu-header-border transition-all duration-300 flex flex-col ${
        isOpen ? 'w-[280px]' : 'w-0 lg:w-[80px] overflow-hidden'
      }`}
    >
      <div className="h-[76px] flex items-center px-6 border-b border-armoyu-header-border shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-600/20 group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} className="text-white" />
          </div>
          {isOpen && (
            <span className="font-black text-lg tracking-tighter uppercase italic text-armoyu-text">
              {brandName} <span className="text-blue-500">MGM</span>
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 hide-scrollbar">
        {sidebarItems
          .filter(item => !item.requiredRoles?.length || (user?.role?.id && item.requiredRoles.includes(user.role.id)))
          .map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                  isActive ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                  : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                }`}
              >
                <item.icon size={20} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                {isOpen && <span className="font-bold text-sm truncate">{item.name}</span>}
                {isOpen && isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
              </Link>
            );
          })}
      </nav>

      <div className="p-4 border-t border-armoyu-header-border space-y-4">
        {isOpen && user && (
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover" alt="" />
              <div className="min-w-0">
                <div className="text-xs font-black truncate text-armoyu-text">{user.displayName}</div>
                <div className="text-[10px] font-bold text-blue-500 uppercase tracking-tighter">{user.role?.name}</div>
              </div>
            </div>
            <Link href="/" onClick={onLogout} className="flex items-center justify-center gap-2 w-full py-2 bg-black/5 dark:bg-white/10 hover:bg-black/10 dark:hover:bg-white/20 rounded-xl text-[10px] font-black uppercase tracking-widest transition-colors text-armoyu-text-muted hover:text-armoyu-text">
              <ArrowLeft size={12} /> Paneleden Çık
            </Link>
          </div>
        )}
        {!isOpen && (
          <Link href="/" onClick={onLogout} className="w-10 h-10 mx-auto bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl flex items-center justify-center text-armoyu-text-muted transition-colors">
            <ArrowLeft size={20} />
          </Link>
        )}
        <div className="text-center">
          <span className="text-[10px] font-bold text-armoyu-text-muted opacity-50 uppercase tracking-widest">{panelVersion}</span>
        </div>
      </div>
    </aside>
  );
};
