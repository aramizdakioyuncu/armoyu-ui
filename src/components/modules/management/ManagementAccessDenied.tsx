import React from 'react';
import Link from 'next/link';
import { ShieldCheck } from 'lucide-react';

export interface ManagementAccessDeniedProps {
  title?: string;
  description?: string;
  homeHref?: string;
}

export const ManagementAccessDenied = ({
  title = 'Erişim Reddedildi',
  description = 'Bu sayfayı görüntülemek için gerekli izne sahip değilsiniz.',
  homeHref = '/'
}: ManagementAccessDeniedProps) => {
  return (
    <div className="min-h-screen bg-armoyu-bg flex flex-col items-center justify-center p-4 text-center">
      <div className="w-20 h-20 bg-red-500/10 rounded-full flex items-center justify-center mb-6 animate-bounce">
        <ShieldCheck size={40} className="text-red-500" />
      </div>
      <h1 className="text-2xl font-black text-armoyu-text mb-2 uppercase italic">{title}</h1>
      <p className="text-armoyu-text-muted max-w-md mb-8 font-medium">{description}</p>
      <Link
        href={homeHref}
        className="px-12 py-4 bg-armoyu-primary hover:bg-armoyu-primary text-white font-black rounded-2xl text-xs uppercase tracking-widest transition-all shadow-xl shadow-armoyu-primary/20 active:scale-95 italic"
      >
        Ana Sayfaya Dön
      </Link>
    </div>
  );
};
