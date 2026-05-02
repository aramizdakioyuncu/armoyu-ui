import React from 'react';
import { User } from 'lucide-react';

interface NewsDetailAuthorProps {
  name: string;
  avatar?: string;
  bio?: string;
}

export function NewsDetailAuthor({ name, avatar, bio }: NewsDetailAuthorProps) {
  return (
    <div className="p-8 bg-gradient-to-br from-armoyu-primary/10 to-purple-600/10 border border-white/5 rounded-[40px] flex items-center gap-6">
      <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-armoyu-primary/20 flex-shrink-0">
        {avatar ? (
          <img src={avatar} alt={name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-zinc-800 text-armoyu-primary">
            <User size={32} />
          </div>
        )}
      </div>
      <div>
        <span className="text-[10px] font-black text-armoyu-primary uppercase tracking-widest leading-none mb-1 inline-block">Yazar</span>
        <h3 className="text-2xl font-black text-white uppercase italic leading-none">{name || 'ARMOYU EDİTÖR'}</h3>
        <p className="text-xs text-armoyu-text-muted font-medium mt-2 leading-relaxed max-w-lg">
          {bio || 'Armoyu Haber ekibi tarafından hazırlanan bu içerik, topluluğumuzu bilgilendirmek ve en güncel oyun dünyası gelişmelerini aktarmak amacıyla yayınlanmıştır.'}
        </p>
      </div>
    </div>
  );
}
