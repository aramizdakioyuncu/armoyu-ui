'use client';

import React, { useState, useEffect } from 'react';
import { User } from '../../../../models/auth/User';
import { GraduationCap, Briefcase, Award, Milestone, Calendar } from 'lucide-react';
import { useArmoyu } from '../../../../context/ArmoyuContext';

interface CareerTabProps {
  displayUser: User | null;
  schools?: any[];
}

export function CareerTab({ displayUser, schools: initialSchools }: CareerTabProps) {
  const { api } = useArmoyu();
  const [schools, setSchools] = useState<any[]>(initialSchools || []);
  const [loading, setLoading] = useState(!initialSchools);

  useEffect(() => {
    // Only fetch if schools weren't passed or if the user changed
    async function fetchCareer() {
      if (!displayUser?.id) return;
      if (initialSchools && initialSchools.length > 0) {
        setSchools(initialSchools);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const response = await api.users.getUserSchools(Number(displayUser.id));
        if (response.durum === 1 && Array.isArray(response.icerik)) {
          setSchools(response.icerik);
        }
      } catch (error) {
        console.error('Failed to fetch schools:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchCareer();
  }, [displayUser?.id, api, initialSchools]);

  // Combine schools with static career events for a full timeline
  const staticEvents = [
    { id: 'join', date: displayUser?.registeredAt || '12.03.2018', title: 'ARMOYU Ailesine Katıldı', description: 'Platformdaki ilk adımlarını attı.', type: 'JOIN' },
  ];

  const timeline = [
    ...staticEvents,
    ...schools.map(s => ({
      id: `school-${s.okulID || Math.random()}`,
      date: `${s.baslangic_yil || '????'} - ${s.bitis_yil || 'Halen'}`,
      title: s.okul_ad,
      description: `${s.bolum_ad || ''} - ${s.derece_ad || ''}`,
      type: 'SCHOOL'
    }))
  ].sort((a, b) => {
      // Very simple date sorting (highest year first)
      const yearA = a.date.match(/\d{4}/)?.[0] || '0';
      const yearB = b.date.match(/\d{4}/)?.[0] || '0';
      return parseInt(yearB) - parseInt(yearA);
  });

  return (
    <div className="space-y-8">
      <div className="bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] p-10 shadow-sm relative overflow-hidden">
        <div className="absolute -right-20 -top-20 w-64 h-64 bg-blue-500/5 blur-3xl rounded-full" />

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 relative z-10">
          <div className="flex items-center gap-5">
            <div className="w-16 h-16 rounded-3xl bg-blue-600 flex items-center justify-center text-white shadow-xl shadow-blue-600/20">
              <Milestone size={32} />
            </div>
            <div>
              <h3 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter italic leading-none">KARİYER YOLCULUĞU</h3>
              <p className="text-xs font-bold text-armoyu-text-muted mt-2 uppercase tracking-widest italic">Geçmişten günümüze ARMOYU serüveni</p>
            </div>
          </div>
        </div>

        <div className="relative space-y-12 before:absolute before:inset-0 before:ml-8 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-blue-500/50 before:via-blue-500/20 before:to-transparent">
          {timeline.map((event, idx) => (
            <div key={event.id} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
              {/* Icon */}
              <div className="flex items-center justify-center w-16 h-16 rounded-2xl bg-armoyu-card-bg border-4 border-armoyu-card-border shadow-md z-10 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 transition-transform group-hover:scale-110 group-hover:border-blue-500">
                {event.type === 'JOIN' && <Award className="text-blue-500" size={24} />}
                {event.type === 'SCHOOL' && <GraduationCap className="text-emerald-500" size={24} />}
                {event.type === 'RANK' && <Award className="text-amber-500" size={24} />}
                {event.type === 'GROUP' && <Briefcase className="text-purple-500" size={24} />}
              </div>

              {/* Content */}
              <div className="w-[calc(100%-5rem)] md:w-[calc(50%-4rem)] p-6 rounded-[32px] bg-black/5 dark:bg-white/5 border border-transparent hover:border-blue-500/20 transition-all group-hover:bg-blue-500/5">
                <div className="flex items-center justify-between mb-2">
                  <time className="text-[10px] font-black text-blue-500 uppercase tracking-widest bg-blue-500/10 px-3 py-1 rounded-full">{event.date}</time>
                </div>
                <div className="text-lg font-black text-armoyu-text mb-1 uppercase italic tracking-tight">{event.title}</div>
                <div className="text-sm font-medium text-armoyu-text-muted italic">{event.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
