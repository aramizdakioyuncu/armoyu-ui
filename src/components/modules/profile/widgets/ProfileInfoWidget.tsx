'use client';

import React from 'react';
import {
  MapPin,
  GraduationCap,
  Briefcase,
  Sparkles,
  Calendar,
  Cake,
  Shield,
  User as UserIcon,
  Heart
} from 'lucide-react';
import { User } from '../../../../models/auth/User';
import { zodiacLabel } from '../../../../lib/zodiac';

interface ProfileInfoWidgetProps {
  user: User | null;
  isOwnProfile?: boolean;
  onSoulmateEdit?: () => void;
  schools?: any[];
}

const GENDER_TR: Record<string, string> = { female: 'Kadın', male: 'Erkek', nonbinary: 'Non-binary', other: 'Diğer' };

const formatBirthday = (value: string) => {
  const d = /^\d{4}-\d{2}-\d{2}/.test(value) ? new Date(`${value.slice(0, 10)}T12:00:00`) : null;
  return d && !isNaN(d.getTime()) ? d.toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' }) : value;
};

type InfoItem = { icon: React.ReactNode; label: string; value: string; color: string; bg: string; onClick?: () => void };

/** Kişisel bilgiler: yalnızca dolu (ve kişinin profilde göstermeyi seçtiği) alanlar görünür */
export function ProfileInfoWidget({ user, isOwnProfile, onSoulmateEdit, schools }: ProfileInfoWidgetProps) {
  if (!user) return null;

  const latestSchool = schools && schools.length > 0 ? schools[0].name : (user.education?.[0]?.schoolName ?? '');
  const soulmate = user.soulmate?.displayName ?? '';

  const items: InfoItem[] = [
    { icon: <MapPin className="w-4 h-4" />, label: 'Memleket', value: user.city || user.location || '', color: 'text-armoyu-primary', bg: 'bg-armoyu-primary/10' },
    { icon: <Briefcase className="w-4 h-4" />, label: 'Meslek', value: user.jobTitle || '', color: 'text-amber-500', bg: 'bg-amber-500/10' },
    { icon: <GraduationCap className="w-4 h-4" />, label: 'Eğitim', value: latestSchool, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
    { icon: <Shield className="w-4 h-4" />, label: 'Favori Takım', value: user.favoriteTeam?.name || '', color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
    {
      icon: <Heart className={`w-4 h-4 ${soulmate ? 'fill-pink-500' : ''}`} />,
      label: 'Ruh Eşi',
      // Boşken yalnızca sahibine "ekle" eylemi; başkası boş alan görmez
      value: soulmate || (isOwnProfile && onSoulmateEdit ? 'Ruh eşi ekle' : ''),
      color: 'text-rose-500',
      bg: 'bg-rose-500/10',
      onClick: onSoulmateEdit,
    },
    { icon: <Cake className="w-4 h-4" />, label: 'Doğum Tarihi', value: user.birthday ? formatBirthday(user.birthday) : '', color: 'text-orange-500', bg: 'bg-orange-500/10' },
    { icon: <Sparkles className="w-4 h-4" />, label: 'Burç', value: zodiacLabel(user.zodiac), color: 'text-violet-500', bg: 'bg-violet-500/10' },
    { icon: <UserIcon className="w-4 h-4" />, label: 'Cinsiyet', value: GENDER_TR[user.gender] ?? '', color: 'text-sky-500', bg: 'bg-sky-500/10' },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Aramıza Katılma',
      value: (user.registeredAt || user.createdAt)?.toString().match(/\d{4}/)?.[0] || '',
      color: 'text-blue-500',
      bg: 'bg-blue-500/10',
    },
  ].filter((item) => item.value);

  if (!items.length) return null;

  return (
    <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-3xl p-6 shadow-sm">
      <h3 className="text-lg font-black text-armoyu-text mb-5">Kişisel Bilgiler</h3>

      <div className="space-y-4">
        {items.map((item) => {
          const Tag = item.onClick ? 'button' : 'div';
          return (
            <Tag
              key={item.label}
              {...(item.onClick ? { type: 'button' as const, onClick: item.onClick } : {})}
              className={`w-full text-left flex items-center gap-4 group ${item.onClick ? 'cursor-pointer' : ''}`}
            >
              <div className={`w-10 h-10 rounded-2xl ${item.bg} ${item.color} flex items-center justify-center shrink-0 transition-all group-hover:scale-110 duration-300`}>
                {item.icon}
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] font-bold text-armoyu-text-muted uppercase tracking-wider">{item.label}</span>
                <span className={`text-sm font-extrabold text-armoyu-text truncate ${item.onClick ? 'group-hover:text-pink-500' : ''}`}>
                  {item.value}
                </span>
              </div>
            </Tag>
          );
        })}
      </div>
    </div>
  );
}
