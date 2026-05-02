'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { 
  ManagementDashboard,
  ManagementTab,
  MemberManagement,
  SupportManagement,
  EventManagement,
  SystemSettingsWidget,
  MemberSummaryWidget,
  SupportSummaryWidget,
  EventSummaryWidget,
  ManagementOverview,
  NewsManagement,
  GroupsManagement,
  SchoolsManagement,
  StationsManagement,
  GiveawaysManagement,
  StatisticsManagement,
  ManagementWidgetCreator,
  RegistryManagement,
  GameOfficialManagement
} from '../../../src';
import { 
  Shield, 
  Users as UsersIcon, 
  Edit3, 
  Heart, 
  Gamepad2,
  Users,
  FileText,
  MessageSquare,
  ShieldCheck,
  Settings,
  Calendar,
  Building2,
  Radio,
  Gift,
  BarChart3
} from 'lucide-react';

export default function AdminDashboardShowcase() {
  const searchParams = useSearchParams();
  const activeTab = searchParams.get('tab') || 'general';
  const [isCustomizing, setIsCustomizing] = React.useState(false);
  const stats = [
    { name: 'Toplam Oyuncu', value: '1,284', change: '+12%', isUp: true, icon: Users, color: 'text-armoyu-primary', bg: 'bg-armoyu-primary/10' },
    { name: 'Aktif Haberler', value: '452', change: '+5%', isUp: true, icon: FileText, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { name: 'Bekleyen Destek', value: '18', change: '-24%', isUp: false, icon: MessageSquare, color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { name: 'Onay Bekleyenler', value: '38', change: 'Yeni', isUp: true, icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-500/10' },
  ];

  const recentActivity = [
    { id: 1, user: { name: 'Alperen' }, action: 'yeni bir haber paylaştı', target: 'CS2 Güncellemesi', time: '2 dakika önce' },
    { id: 2, user: { name: 'MythX' }, action: 'bir kullanıcıyı askıya aldı', target: 'trol_oyuncu31', time: '15 dakika önce' },
    { id: 3, user: { name: 'Sistem' }, action: 'yedekleme tamamlandı', target: 'Database_Global', time: '1 saat önce' },
    { id: 4, user: { name: 'Metehan' }, action: 'yeni grup onayladı', target: 'Fast Five E-Spor', time: '3 saat önce' },
  ];

  const quickActions = [
    { name: 'Üye Onayla', color: 'bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20', path: '/management-panel?tab=users' },
    { name: 'Grup Onayla', color: 'bg-armoyu-primary/10 text-armoyu-primary hover:bg-armoyu-primary/20', path: '/management-panel?tab=groups' },
    { name: 'Okul Onayla', color: 'bg-amber-500/10 text-amber-500 hover:bg-amber-500/20', path: '/management-panel?tab=schools' },
    { name: 'Sistem Kontrol', color: 'bg-purple-500/10 text-purple-500 hover:bg-purple-500/20', path: '/management-panel?tab=stations' },
  ];

  const tabs: ManagementTab[] = [
    { 
      id: 'general', 
      label: 'Genel', 
      icon: <Shield size={14} />,
      content: (
        <ManagementOverview
          stats={stats}
          activities={recentActivity}
          quickActions={quickActions}
          memberData={[
            { label: 'Pzt', value: 45 },
            { label: 'Sal', value: 52 },
            { label: 'Çar', value: 38 },
            { label: 'Per', value: 65 },
            { label: 'Cum', value: 48 },
            { label: 'Cmt', value: 82 },
            { label: 'Paz', value: 70 },
          ]}
          eventData={[
            { label: 'Pzt', value: 12 },
            { label: 'Sal', value: 18 },
            { label: 'Çar', value: 15 },
            { label: 'Per', value: 25 },
            { label: 'Cum', value: 20 },
            { label: 'Cmt', value: 35 },
            { label: 'Paz', value: 30 },
          ]}
          reportData={{ open: 8, closed: 42, pending: 12 }}
          onNewContentClick={() => setIsCustomizing(true)}
          onUpdateNotesClick={() => alert('Güncelleme Notları')}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <MemberSummaryWidget />
            <SupportSummaryWidget />
            <EventSummaryWidget />
          </div>
        </ManagementOverview>
      )
    },
    { 
      id: 'stats', 
      label: 'İstatistikler', 
      icon: <BarChart3 size={14} />,
      content: <StatisticsManagement />
    },
    { 
      id: 'registry', 
      label: 'Kayıt Defteri', 
      icon: <FileText size={14} />,
      content: <RegistryManagement />
    },
    { 
      id: 'users', 
      label: 'Üye Yönetimi', 
      icon: <UsersIcon size={14} />,
      content: <MemberManagement />
    },
    { 
      id: 'support', 
      label: 'Destek Bildirimleri', 
      icon: <MessageSquare size={14} />,
      content: <SupportManagement />
    },
    { 
      id: 'events', 
      label: 'Etkinlik Yönetimi', 
      icon: <Calendar size={14} />,
      content: <EventManagement />
    },
    { 
      id: 'news', 
      label: 'Haberler', 
      icon: <FileText size={14} />,
      content: <NewsManagement />
    },
    { 
      id: 'giveaways', 
      label: 'Çekilişler', 
      icon: <Gift size={14} />,
      content: <GiveawaysManagement />
    },
    { 
      id: 'groups', 
      label: 'Gruplar', 
      icon: <Users size={14} />,
      content: <GroupsManagement />
    },
    { 
      id: 'schools', 
      label: 'Okullar', 
      icon: <Building2 size={14} />,
      content: <SchoolsManagement />
    },
    { 
      id: 'stations', 
      label: 'İstasyonlar', 
      icon: <Radio size={14} />,
      content: <StationsManagement />
    },
    { 
      id: 'instagram', 
      label: 'Instagram', 
      icon: <Heart size={14} />,
      content: <div className="p-12 text-center bg-gradient-to-br from-purple-500/10 to-pink-500/10 rounded-[40px] border border-pink-500/20">
         <Heart className="text-pink-500 mx-auto mb-4" size={48} />
         <h4 className="text-xl font-black uppercase text-pink-500 italic">Instagram Sorumlusu</h4>
         <p className="text-xs text-armoyu-text-muted font-bold mt-2">Galeri öğeleri ve hikaye paylaşımları takibi.</p>
      </div>
    },
    { 
      id: 'ets2', 
      label: 'ETS 2', 
      icon: <Gamepad2 size={14} />,
      content: <GameOfficialManagement gameName="Euro Truck Simulator 2" gameColor="armoyu-primary" icon={Gamepad2} />
    },
    { 
      id: 'assetto', 
      label: 'Assetto Corsa', 
      icon: <Gamepad2 size={14} />,
      content: <GameOfficialManagement gameName="Assetto Corsa" gameColor="red-500" icon={Gamepad2} />
    },
    { 
      id: 'minecraft', 
      label: 'Minecraft', 
      icon: <Gamepad2 size={14} />,
      content: <GameOfficialManagement gameName="Minecraft" gameColor="emerald-500" icon={Gamepad2} />
    },
    { 
      id: 'cs2', 
      label: 'Counter-Strike 2', 
      icon: <Gamepad2 size={14} />,
      content: <GameOfficialManagement gameName="Counter-Strike 2" gameColor="amber-500" icon={Gamepad2} />
    },
    {
      id: 'settings',
      label: 'Sistem Ayarları',
      icon: <Settings size={14} />,
      content: <SystemSettingsWidget />
    }
  ];

  return (
    <>
      <ManagementDashboard
        tabs={tabs}
        activeTabId={activeTab}
      />
      
      {/* Dashboard Customizer Modal */}
      {isCustomizing && (
        <ManagementWidgetCreator onClose={() => setIsCustomizing(false)} />
      )}
    </>
  );
}
