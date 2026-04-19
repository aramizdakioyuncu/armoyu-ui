'use client';

import React from 'react';
import { 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Calendar,
  User as UserIcon,
  Heart
} from 'lucide-react';
import { User } from '../../../../models/auth/User';

interface ProfileInfoWidgetProps {
  user: User | null;
  isOwnProfile?: boolean;
  onSoulmateEdit?: () => void;
}

export function ProfileInfoWidget({ user, isOwnProfile, onSoulmateEdit }: ProfileInfoWidgetProps) {
  if (!user) return null;

  const infoItems = [
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Memleket',
      value: user.city || user.location || 'Belirtilmedi',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10'
    },
    {
      icon: <GraduationCap className="w-4 h-4" />,
      label: 'Eğitim / İş',
      value: user.jobTitle || 'Belirtilmedi',
      color: 'text-emerald-500',
      bg: 'bg-emerald-500/10'
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      label: 'Burç',
      value: user.zodiac || 'Belirtilmedi',
      color: 'text-purple-500',
      bg: 'bg-purple-500/10'
    },
    {
      icon: <Heart className={`w-4 h-4 ${user.soulmate ? 'fill-pink-500' : ''}`} />,
      label: 'Ruh Eşi',
      value: user.soulmate?.displayName || 'Belirtilmedi',
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      onClick: onSoulmateEdit
    }
  ];

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-black text-armoyu-text mb-5">Kişisel Bilgiler</h3>
      
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div 
            key={index} 
            onClick={item.onClick}
            className={`flex items-center gap-4 group ${item.onClick ? 'cursor-pointer' : ''}`}
          >
            <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-all group-hover:scale-110 duration-300 ${item.onClick ? 'group-hover:rotate-12 ring-0 group-hover:ring-4 ring-pink-500/10' : ''}`}>
              {item.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wider uppercase">{item.label}</span>
              <span className={`text-sm font-extrabold text-armoyu-text truncate ${item.onClick ? 'group-hover:text-pink-500' : ''}`}>
                {item.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
