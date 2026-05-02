import React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ShieldCheck, ChevronRight } from 'lucide-react';

export interface ManagementSidebarItem {
  name: string;
  href: string;
  icon: React.ElementType;
  requiredRoles?: string[];
  subItems?: { name: string; href: string; icon?: React.ElementType; id?: string }[];
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
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'general';
  
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  // Aktif sekme değiştiğinde ilgili menüyü otomatik aç
  React.useEffect(() => {
    sidebarItems.forEach(item => {
      if (item.subItems?.some(sub => sub.href.includes(`tab=${activeTab}`))) {
        if (!expandedItems.includes(item.name)) {
          setExpandedItems(prev => [...prev, item.name]);
        }
      }
    });
  }, [activeTab]);

  const toggleExpand = (name: string) => {
    setExpandedItems(prev => 
      prev.includes(name) ? prev.filter(i => i !== name) : [...prev, name]
    );
  };

  return (
    <aside
      className={`fixed lg:relative z-50 h-full bg-armoyu-header-bg border-r border-armoyu-drawer-border  transition-all duration-300 flex flex-col ${
        isOpen ? 'w-[280px]' : 'w-0 lg:w-[80px] overflow-hidden'
      }`}
    >
      <div className="h-[76px] flex items-center px-6 border-b border-armoyu-header-border shrink-0">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-8 h-8 bg-armoyu-primary rounded-lg flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-110 transition-transform">
            <ShieldCheck size={20} className="text-white" />
          </div>
          {isOpen && (
            <span className="font-black text-lg tracking-tighter uppercase italic text-armoyu-text">
              {brandName} <span className="text-armoyu-primary">MGM</span>
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-1 overflow-y-auto py-6 px-3 space-y-1 hide-scrollbar">
        {sidebarItems
          .filter(item => {
            // Eğer rol gerekmiyorsa her zaman göster
            if (!item.requiredRoles || item.requiredRoles.length === 0) return true;
            // Rol gerekiyorsa kullanıcı rolünü kontrol et
            return user?.role?.id && item.requiredRoles.includes(user.role.id);
          })
          .map((item) => {
            const hasSubItems = item.subItems && item.subItems.length > 0;
            const isExpanded = expandedItems.includes(item.name);
            const isItemActive = item.href.includes(`tab=${activeTab}`) || (item.href === pathname && activeTab === 'general');
            const hasActiveSubItem = item.subItems?.some(sub => sub.href.includes(`tab=${activeTab}`));
            const isActive = isItemActive || hasActiveSubItem;
            
            return (
              <div key={item.name} className="space-y-1">
                {hasSubItems ? (
                  <button
                    onClick={() => toggleExpand(item.name)}
                    className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                      isActive ? 'bg-armoyu-primary/10 text-armoyu-primary' 
                      : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className="group-hover:scale-110 transition-transform" />
                    {isOpen && <span className="font-bold text-sm truncate">{item.name}</span>}
                    {isOpen && (
                      <ChevronRight 
                        size={14} 
                        className={`ml-auto transition-transform duration-300 ${isExpanded ? 'rotate-90' : ''}`} 
                      />
                    )}
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all group ${
                      isActive ? 'bg-armoyu-primary text-white shadow-lg shadow-primary/20' 
                      : 'text-armoyu-text-muted hover:text-armoyu-text hover:bg-black/5 dark:hover:bg-white/5'
                    }`}
                  >
                    <item.icon size={20} className={isActive ? 'animate-pulse' : 'group-hover:scale-110 transition-transform'} />
                    {isOpen && <span className="font-bold text-sm truncate">{item.name}</span>}
                    {isOpen && isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
                  </Link>
                )}

                {/* Sub Items */}
                {isOpen && hasSubItems && isExpanded && (
                  <div className="ml-9 space-y-1 animate-in slide-in-from-top-2 duration-300">
                    {item.subItems?.map((sub) => {
                      const isSubActive = sub.href.includes(`tab=${activeTab}`);
                      const SubIcon = sub.icon;
                      return (
                        <Link
                          key={sub.name}
                          href={sub.href}
                          className={`flex items-center gap-3 px-4 py-2.5 rounded-xl transition-all ${
                            isSubActive ? 'text-armoyu-primary bg-armoyu-primary/5' 
                            : 'text-armoyu-text-muted hover:text-armoyu-primary hover:bg-white/5'
                          }`}
                        >
                          {SubIcon && <SubIcon size={14} />}
                          <span className="text-[11px] font-black uppercase tracking-widest">{sub.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
      </nav>

      <div className="p-4 border-t border-armoyu-header-border space-y-4">
        {isOpen && user && (
          <div className="bg-black/5 dark:bg-white/5 rounded-2xl p-4">
            <div className="flex items-center gap-3">
              <img src={user.avatar} className="w-10 h-10 rounded-xl object-cover border border-armoyu-drawer-border" alt="" />
              <div className="min-w-0">
                <div className="text-xs font-black truncate text-armoyu-text">{user.displayName}</div>
                <div className="text-[10px] font-bold text-armoyu-primary uppercase tracking-tighter">{user.role?.name}</div>
              </div>
            </div>
          </div>
        )}
        <div className="text-center">
          <span className="text-[10px] font-bold text-armoyu-text-muted opacity-50 uppercase tracking-widest">{panelVersion}</span>
        </div>
      </div>
    </aside>
  );
};
