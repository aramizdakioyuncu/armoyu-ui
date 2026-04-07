'use client';

import React from 'react';
import Link from 'next/link';
import { School } from '@armoyu/core';
import { GraduationCap, Users, Trophy, ChevronRight, MapPin } from 'lucide-react';

interface SchoolCardProps {
  school: School;
}

export function SchoolCard({ school }: SchoolCardProps) {
  return (
    <Link href={`/egitim/${school.slug}`} className="block group">
      <div className="glass-panel relative overflow-hidden rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg hover:border-blue-500/50 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 group">

        {/* Banner / Background */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-br from-blue-600/20 to-purple-600/20 opacity-30 group-hover:opacity-50 transition-opacity" />

        <div className="relative p-8 pt-12">
          <div className="flex items-start justify-between mb-8">
            <div className="relative">
              <div className="w-24 h-24 rounded-3xl bg-white dark:bg-zinc-900 border-4 border-armoyu-bg overflow-hidden shadow-xl group-hover:scale-105 transition-transform duration-500">
                <img
                  src={school.logo}
                  alt={school.name}
                  className="w-full h-full object-contain p-2"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 px-3 py-1 bg-blue-600 text-white text-[10px] font-black italic rounded-lg shadow-lg uppercase tracking-widest border-2 border-armoyu-bg">
                Onaylı Okul
              </div>
            </div>

            <div className="flex gap-2">
              <div className="px-5 py-2.5 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em]">
                {school.id.toUpperCase()}
              </div>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none group-hover:text-blue-500 transition-colors">
              {school.name}
            </h3>
            <div className="flex items-center gap-2 text-armoyu-text-muted">
              <MapPin size={14} className="text-blue-500" />
              <span className="text-[11px] font-bold uppercase tracking-widest opacity-60">Türkiye / İstanbul</span>
            </div>
          </div>

          {/* Stats Bar */}
          <div className="grid grid-cols-3 gap-2 py-4 border-y border-armoyu-card-border">
            <div className="text-center group/stat">
              <div className="flex items-center justify-center gap-1.5 text-armoyu-text-muted mb-1">
                <Users size={12} className="group-hover/stat:text-blue-500 transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Öğrenci</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{school.memberCount}</div>
            </div>
            <div className="text-center group/stat border-x border-armoyu-card-border px-2">
              <div className="flex items-center justify-center gap-1.5 text-armoyu-text-muted mb-1">
                <GraduationCap size={12} className="group-hover/stat:text-blue-500 transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Fakülte</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{(school.faculties || []).length}</div>
            </div>
            <div className="text-center group/stat">
              <div className="flex items-center justify-center gap-1.5 text-armoyu-text-muted mb-1">
                <Trophy size={12} className="group-hover/stat:text-blue-500 transition-colors" />
                <span className="text-[9px] font-black uppercase tracking-widest opacity-50">Takımlar</span>
              </div>
              <div className="text-sm font-black text-armoyu-text">{(school.teams || []).length}</div>
            </div>
          </div>

          <div className="mt-8 flex items-center justify-between">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://api.dicebear.com/7.x/avataaars/svg?seed=Armoyu${i + (school.id as any)}`}
                  className="w-8 h-8 rounded-full border-2 border-armoyu-bg"
                  alt="Member"
                />
              ))}
              <div className="w-8 h-8 rounded-full bg-black/5 dark:bg-white/5 border-2 border-armoyu-bg flex items-center justify-center text-[8px] font-black text-armoyu-text-muted uppercase">
                +{(school.memberCount || 0) - 4}
              </div>
            </div>

            <div className="flex items-center gap-2 text-blue-500 text-[10px] font-black uppercase tracking-widest group-hover:translate-x-2 transition-transform">
              OKUL PORTALI <ChevronRight size={16} strokeWidth={3} />
            </div>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-blue-500/5 blur-[40px] rounded-full group-hover:bg-blue-500/10 transition-colors" />
      </div>
    </Link>
  );
}

