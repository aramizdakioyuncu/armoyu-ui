'use client';

import React from 'react';
import { ManagementLayout, useAuth } from '@armoyu/ui';
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
      { name: 'Destek Bildirimleri', href: '/management-panel?tab=support', icon: FileText },
      { name: 'Etkinlik Yönetimi', href: '/management-panel?tab=events', icon: Calendar },
    ]
  },
  { 
    name: 'Sorumlular', 
    href: '#', 
    icon: Users, 
    requiredRoles: [],
    subItems: [
      { name: 'Instagram Sorumlusu', href: '/management-panel?tab=instagram' },
      { name: 'Facebook Sorumlusu', href: '/management-panel?tab=facebook' },
      { name: 'Twitter Sorumlusu', href: '/management-panel?tab=twitter' },
      { name: 'Steam Sorumlusu', href: '/management-panel?tab=steam' },
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
    name: 'Editör', 
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
  { name: 'Yayıncılar', href: '/management-panel?tab=streamers', icon: BarChart3, requiredRoles: [] },
  { name: 'Sistem Ayarları', href: '/management-panel?tab=settings', icon: Settings, requiredRoles: [] },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();

  // Oturum kontrolü devam ederken (sayfa yenilendiğinde) login butonu flicker'ını engelle
  if (isLoading) return null;

  return (
    <ManagementLayout
      sidebarItems={sidebarItems}
      user={user}
      isAuthorized={true}
      brandName="ARMOYU"
      panelVersion="UI SHOWCASE"
    >
      {children}
    </ManagementLayout>
  );
}
