'use client';

import React from 'react';
import Link from 'next/link';
import { School } from '../../../../models/community/School';
import { GraduationCap, Users, Trophy, ChevronRight, MapPin, UserPlus } from 'lucide-react';
import { SchoolJoinModal } from './SchoolJoinModal';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  const [isJoinModalOpen, setIsJoinModalOpen] = React.useState(false);

  return (
    <div className="block group relative">
       <Link href={`/egitim/${school.slug}`} className="block">
      <div className="glass-panel relative overflow-hidden rounded-[32px] border border-armoyu-card-border bg-armoyu-card-bg hover:border-armoyu-primary/50 hover:shadow-2xl hover:shadow-armoyu-primary/10 transition-all duration-500 group">

        {/* Banner / Background */}
        <div className="absolute top-0 left-0 w-full h-24 bg-gradient-to-br from-armoyu-primary/20 to-purple-600/20 opacity-30 group-hover:opacity-50 transition-opacity" />

        <div className="relative p-5 pt-6">
          <div className="flex items-start justify-between mb-3">
            <div className="relative">
              <div className="w-20 h-20 rounded-3xl bg-white dark:bg-zinc-900 border-4 border-armoyu-bg overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={school.logo}
                  alt={school.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
            </div>
          </div>

          <div className="space-y-1 mb-4">
            <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none group-hover:text-armoyu-primary transition-colors">
              {school.name}
            </h3>
            <div className="flex items-center gap-2 text-armoyu-text-muted">
              <MapPin size={14} className="text-armoyu-primary" />
              <span className="text-[10px] font-bold uppercase tracking-widest opacity-60">Türkiye / İstanbul</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-1 py-3 border-y border-armoyu-card-border">
            <div className="text-center group/stat">
              <div className="flex items-center justify-center gap-1 text-armoyu-text-muted mb-0.5">
                <Users size={12} className="group-hover/stat:text-armoyu-primary transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Öğrenci</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{school.memberCount}</div>
            </div>
            <div className="text-center group/stat border-x border-armoyu-card-border px-1">
              <div className="flex items-center justify-center gap-1 text-armoyu-text-muted mb-0.5">
                <GraduationCap size={12} className="group-hover/stat:text-armoyu-primary transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Fakülte</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{(school.faculties || []).length}</div>
            </div>
            <div className="text-center group/stat">
              <div className="flex items-center justify-center gap-1 text-armoyu-text-muted mb-0.5">
                <Trophy size={12} className="group-hover/stat:text-armoyu-primary transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Takımlar</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{(school.teams || []).length}</div>
            </div>
          </div>

          <div className="mt-4 flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu${i + (school.id as any)}`}
                  className="w-7 h-7 rounded-full border-2 border-armoyu-bg"
                  alt="Member"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border-2 border-armoyu-bg flex items-center justify-center text-[8px] font-black text-armoyu-text-muted uppercase">
                +{(school.memberCount || 0) - 4}
              </div>
            </div>

            <div className="flex items-center gap-2 text-armoyu-primary text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              DETAY <ChevronRight size={16} strokeWidth={3} />
            </div>
          </div>
          
          <button 
            onClick={(e) => { e.preventDefault(); e.stopPropagation(); setIsJoinModalOpen(true); }}
            className="mt-6 w-full py-4 bg-armoyu-primary hover:bg-armoyu-primary/90 text-white rounded-2xl font-black text-[11px] uppercase tracking-widest shadow-lg shadow-armoyu-primary/10 active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <UserPlus size={16} strokeWidth={3} /> HEMEN KATIL
          </button>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-armoyu-primary/5 blur-[40px] rounded-full group-hover:bg-armoyu-primary/10 transition-colors" />
      </div>
    </Link>

    <SchoolJoinModal 
        isOpen={isJoinModalOpen} 
        onClose={() => setIsJoinModalOpen(false)} 
        selectedSchool={school.name} 
      />
    </div>
  );
}
