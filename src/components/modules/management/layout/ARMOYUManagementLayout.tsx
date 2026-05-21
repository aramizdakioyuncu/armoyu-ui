'use client';

import React from 'react';
import { 
  LayoutDashboard,
  Users,
  FileText,
  Calendar,
  Settings,
  BarChart3,
  ShieldCheck,
  Edit3
} from 'lucide-react';
import { ManagementLayout } from '../ManagementLayout';
import { useAuth } from '../../../../context/AuthContext';

const sidebarItems = [
  { name: 'Genel Bakış', href: '/management-panel?tab=general', icon: LayoutDashboard, requiredRoles: [] },
  { name: 'İstatistikler', href: '/management-panel?tab=stats', icon: BarChart3, requiredRoles: [] },
  { name: 'Kayıt Defteri', href: '/management-panel?tab=registry', icon: FileText, requiredRoles: [] },
  { 
    name: 'Yönetim Ekibi', 
    href: '#', 
    icon: ShieldCheck, 
    requiredRoles: [],
    subItems: [
      { name: 'Üye Yönetimi', href: '/management-panel?tab=users', icon: Users },
      { name: 'Destek & Bildirim', href: '/management-panel?tab=support', icon: FileText },
      { name: 'Etkinlik Yönetimi', href: '/management-panel?tab=events', icon: Calendar },
    ]
  },
  { 
    name: 'Sorumlular', 
    href: '#', 
    icon: Users, 
    requiredRoles: [],
    subItems: [
      { name: 'Sosyal Medya', href: '/management-panel?tab=social-media' },
      { name: 'Yayıncılar', href: '/management-panel?tab=streamers' },
      { name: 'Topluluk Moderasyonu', href: '/management-panel?tab=recruitment' },
    ]
  },
  { 
    name: 'Oyun Yetkilisi', 
    href: '#', 
    icon: Calendar, 
    requiredRoles: [],
    subItems: [
      { name: 'Euro Truck Simulator 2', href: '/management-panel?tab=ets2' },
      { name: 'Assetto Corsa', href: '/management-panel?tab=assetto' },
      { name: 'Minecraft', href: '/management-panel?tab=minecraft' },
      { name: 'Counter-Strike 2', href: '/management-panel?tab=cs2' },
    ]
  },
  { 
    name: 'Editör Araçları', 
    href: '#', 
    icon: Edit3, 
    requiredRoles: [],
    subItems: [
      { name: 'Haberler & Blog', href: '/management-panel?tab=news' },
      { name: 'Çekilişler', href: '/management-panel?tab=giveaways' },
      { name: 'Okullar', href: '/management-panel?tab=schools' },
      { name: 'Gruplar', href: '/management-panel?tab=groups' },
      { name: 'İstasyonlar', href: '/management-panel?tab=stations' },
    ]
  },
  { name: 'Sistem Ayarları', href: '/management-panel?tab=settings', icon: Settings, requiredRoles: [] },
];

export interface ARMOYUManagementLayoutProps {
  children: React.ReactNode;
}

export function ARMOYUManagementLayout({ children }: ARMOYUManagementLayoutProps) {
  const { user, isLoading } = useAuth();

  // Şimdilik sadece giriş yapmış olmak yeterli (Yetki aramadan)
  const isAuthorized = !!user;

  // Oturum kontrolü devam ederken (sayfa yenilendiğinde) flicker'ı engelle
  if (isLoading) return null;

  return (
    <ManagementLayout
      sidebarItems={sidebarItems}
      user={user}
      isAuthorized={isAuthorized}
      brandName="ARMOYU"
      panelVersion="ARMOYU MGM V3"
    >
      {children}
    </ManagementLayout>
  );
}
