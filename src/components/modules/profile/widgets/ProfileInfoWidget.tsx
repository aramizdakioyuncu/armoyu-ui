'use client';

import React from 'react';
import { 
  MapPin, 
  GraduationCap, 
  Sparkles, 
  Calendar,
  User as UserIcon
} from 'lucide-react';
import { User } from '../../../../models/auth/User';

interface ProfileInfoWidgetProps {
  user: User | null;
}

export function ProfileInfoWidget({ user }: ProfileInfoWidgetProps) {
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
      icon: <Calendar className="w-4 h-4" />,
      label: 'Doğum Günü',
      value: user.birthday || 'Belirtilmedi',
      color: 'text-orange-500',
      bg: 'bg-orange-500/10'
    },
    {
      icon: <UserIcon className="w-4 h-4" />,
      label: 'Cinsiyet',
      value: user.gender === 'E' ? 'Erkek' : user.gender === 'K' ? 'Kadın' : 'Belirtilmedi',
      color: 'text-pink-500',
      bg: 'bg-pink-500/10'
    }
  ];

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-black text-armoyu-text mb-5">Kişisel Bilgiler</h3>
      
      <div className="space-y-4">
        {infoItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 group">
            <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-transform group-hover:scale-110 duration-300`}>
              {item.icon}
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wider uppercase">{item.label}</span>
              <span className="text-sm font-extrabold text-armoyu-text truncate">{item.value}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
