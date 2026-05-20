'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Smile, Search } from 'lucide-react';

interface EmojiPickerProps {
  onSelect: (emoji: string) => void;
  className?: string;
  buttonClassName?: string;
  iconSize?: number;
  placement?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
}

const EMOJI_CATEGORIES = [
  {
    name: 'Popüler',
    icon: '🔥',
    emojis: ['😀', '😂', '🤣', '😊', '😍', '🥰', '😘', '👍', '🔥', '❤️', '🎮', '👾', '🎉', '💡', '😎', '😭', '😡', '🙏']
  },
  {
    name: 'Yüzler',
    icon: '😀',
    emojis: [
      '😀', '😃', '😄', '😁', '😆', '😅', '😂', '🤣', '😊', '😇', '🙂', '🙃', '😉', '😌', '😍', '🥰', '😘', '😗', 
      '😙', '😚', '😋', '😛', '😝', '😜', '🤪', '🤨', '🧐', '🤓', '😎', '🥸', '🤩', '🥳', '😏', '😒', '😞', '😔', 
      '😟', '😕', '🙁', '☹️', '😣', '😖', '😫', '😩', '🥺', '😢', '😭', '😤', '😠', '😡', '🤬', '🤯', '😳', '🥵', 
      '🥶', '😱', '😨', '😰', '😥', '😓', '🤔', '🫣', '🤭', '🫢', '🤫', '🤥', '😶', '😐', '😑', '😬', '🫠', '🙄', 
      '😯', '😦', '😧', '😮', '😲', '🥱', '😴', '🤤', '😪', '😵', '😵‍💫', '🤐', '🥴', '🤢', '🤮', '🤧', '😷', '🤒', '🤕'
    ]
  },
  {
    name: 'Eller',
    icon: '👍',
    emojis: [
      '👋', '🤚', '🖐️', '✋', '🖖', '👌', '🤌', '💡', '✌️', '🤞', '🫰', '🤟', '🤘', '🤙', '👈', '👉', '👆', '🖕', 
      '👇', '☝️', '👍', '👎', '✊', '👊', '🤛', '🤜', '👏', '🙌', '👐', '🤲', '🤝', '🙏', '✍️', '💅', '🤳', '💪'
    ]
  },
  {
    name: 'Oyun & Simge',
    icon: '🎮',
    emojis: [
      '🎮', '🕹️', '👾', '💻', '🖥️', '⚔️', '🛡️', '🏹', '🗡️', '⛓️', '🪓', '🔨', '⛏️', '💣', '🔫', '🔮', '🧿', 
      '🏆', '🥇', '🥈', '🥉', '🏅', '🎖️', '🎫', '🎟️', '🎪', '🎨', '🎭', '🎬', '🎤', '🎧', '🎼', '🎹', '🥁', '🎸'
    ]
  },
  {
    name: 'Kalpler',
    icon: '❤️',
    emojis: [
      '❤️', '🧡', '💛', '💚', '💙', '💜', '🖤', '🤍', '🤎', '💔', '❤️‍🔥', '❤️‍🩹', '❣️', '💕', '💞', '💓', '💗', 
      '💖', '💘', '💝', '💟', '💥', '✨', '🌟', '⭐', '🎈', '🎉', '🎊', '🎁', '🎀', '🪄', '🔮', '🎈', '🍺', '🍻'
    ]
  }
];

// Flat emoji list with names for searching
const ALL_EMOJIS_WITH_NAMES = [
  { emoji: '😀', name: 'smile gülen yüz mutlu neşeli' },
  { emoji: '😃', name: 'smile gülen yüz mutlu neşeli' },
  { emoji: '😄', name: 'smile gülen yüz mutlu neşeli' },
  { emoji: '😁', name: 'smile gülen yüz sırıtan' },
  { emoji: '😆', name: 'smile kahkaha gülen yüz' },
  { emoji: '😅', name: 'smile ter gülen yüz' },
  { emoji: '😂', name: 'smile gözünden yaş gelerek gülme lol neşeli komik' },
  { emoji: '🤣', name: 'smile yerlere yatarak gülme komik lol' },
  { emoji: '😊', name: 'smile mutlu kızaran tebessüm' },
  { emoji: '😇', name: 'melek kutsal smile' },
  { emoji: '🙂', name: 'hafif tebessüm smile' },
  { emoji: '🙃', name: 'ters dönmüş kafa komik smile' },
  { emoji: '😉', name: 'göz kırpan smile' },
  { emoji: '😌', name: 'rahatlamış huzurlu smile' },
  { emoji: '😍', name: 'kalpli göz aşk sevgi smile' },
  { emoji: '🥰', name: 'kalpli gülen yüz aşk sevgi smile' },
  { emoji: '😘', name: 'öpücük aşk sevgi smile' },
  { emoji: '😗', name: 'öpücük smile' },
  { emoji: '😙', name: 'öpücük smile' },
  { emoji: '😚', name: 'öpücük smile' },
  { emoji: '😋', name: 'lezzetli dil çıkaran smile' },
  { emoji: '😛', name: 'dil çıkaran smile' },
  { emoji: '😝', name: 'gözünü kısarak dil çıkaran smile' },
  { emoji: '😜', name: 'göz kırparak dil çıkaran smile' },
  { emoji: '🤪', name: 'çılgın kafa deli smile' },
  { emoji: '🤨', name: 'tek kaşı havada şüpheli smile' },
  { emoji: '🧐', name: 'monokllü dedektif sorgulayan' },
  { emoji: '🤓', name: 'inek gözlüklü akıllı zeki' },
  { emoji: '😎', name: 'güneş gözlüklü havalı serin cool' },
  { emoji: '🥸', name: 'bıyıklı gözlüklü maskeli' },
  { emoji: '🤩', name: 'gözleri yıldızlı hayran heyecanlı' },
  { emoji: '🥳', name: 'parti kutlama doğum günü neşeli' },
  { emoji: '😏', name: 'alaycı imalı gülüş' },
  { emoji: '😒', name: 'memnuniyetsiz sıkılmış smile' },
  { emoji: '😞', name: 'hayal kırıklığı üzgün' },
  { emoji: '😔', name: 'düşünceli üzgün pişman' },
  { emoji: '😟', name: 'endişeli kaygılı' },
  { emoji: '😕', name: 'kafa karışıklığı kararsız' },
  { emoji: '🙁', name: 'hafif üzgün somurtkan' },
  { emoji: '☹️', name: 'somurtkan üzgün' },
  { emoji: '😣', name: 'acı çeken direnen zorlanan' },
  { emoji: '😖', name: 'şaşkın üzgün ezilmiş' },
  { emoji: '😫', name: 'yorgun bıkmış bezmiş' },
  { emoji: '😩', name: 'bitkin yorgun ağlamaklı' },
  { emoji: '🥺', name: 'yalvaran gözler masum lütfen' },
  { emoji: '😢', name: 'ağlayan hüzünlü yaşlı' },
  { emoji: '😭', name: 'hıçkıra hıçkıra ağlayan çok üzgün lol' },
  { emoji: '😤', name: 'öfkeli burnundan soluyan hırslı' },
  { emoji: '😠', name: 'kızgın sinirli' },
  { emoji: '😡', name: 'öfkeli kızgın kırmızı kafa' },
  { emoji: '🤬', name: 'küfür eden sansürlü kızgın' },
  { emoji: '🤯', name: 'beyni yanan şok patlama' },
  { emoji: '😳', name: 'kızaran şaşkın utangaç' },
  { emoji: '🥵', name: 'sıcak yanan kırmızı kafa' },
  { emoji: '🥶', name: 'soğuk donmuş mavi kafa' },
  { emoji: '😱', name: 'korkmuş çığlık atan dehşet şok' },
  { emoji: '😨', name: 'korkmuş endişeli' },
  { emoji: '😰', name: 'terli korkmuş kaygılı' },
  { emoji: '😥', name: 'rahatlamış ama terli hüzünlü' },
  { emoji: '😓', name: 'soğuk ter döken endişeli' },
  { emoji: '🤔', name: 'düşünen el çenede' },
  { emoji: '🫣', name: 'gözlerini kapatıp bakan meraklı' },
  { emoji: '🤭', name: 'ağzını kapatıp gülen kıkırdayan' },
  { emoji: '🫢', name: 'şaşkın ağzı açık şok' },
  { emoji: '🤫', name: 'sus işareti sessiz ol' },
  { emoji: '🤥', name: 'yalancı pinokyo burnu uzun' },
  { emoji: '😶', name: 'ağzı olmayan sessiz' },
  { emoji: '😐', name: 'tepkisiz düz çizgi smile' },
  { emoji: '😑', name: 'ifadesiz gözleri kapalı' },
  { emoji: '😬', name: 'dişlerini sıkan gergin' },
  { emoji: '🫠', name: 'eriyen yüz sıcak tatlı' },
  { emoji: '🙄', name: 'gözlerini deviren bıkkın' },
  { emoji: '😯', name: 'şaşırmış ağzı açık' },
  { emoji: '😦', name: 'şaşkın üzgün somurtan' },
  { emoji: '😧', name: 'endişeli şaşkın acı' },
  { emoji: '😮', name: 'aa şaşıran ağzı açık' },
  { emoji: '😲', name: 'hayretler içinde şok' },
  { emoji: '🥱', name: 'esneyen uykulu' },
  { emoji: '😴', name: 'uyuyan zzz' },
  { emoji: '🤤', name: 'ağzı sulanan nefis leziz' },
  { emoji: '😪', name: 'uykulu sümük damlası' },
  { emoji: '😵', name: 'baş dönmesi şaşkın' },
  { emoji: '😵‍💫', name: 'gözleri dönmüş sarhoş kafa karışık' },
  { emoji: '🤐', name: 'ağzı fermuarlı sır tutan' },
  { emoji: '🥴', name: 'çakırkeyif sarhoş sersem' },
  { emoji: '🤢', name: 'midesi bulanan yeşil kafa' },
  { emoji: '🤮', name: 'kusan yeşil' },
  { emoji: '🤧', name: 'hapşıran grip hasta' },
  { emoji: '😷', name: 'maskeli korona hasta' },
  { emoji: '🤒', name: 'dereceli ateş ölçen hasta' },
  { emoji: '🤕', name: 'kafası sargılı yaralı' },
  { emoji: '👍', name: 'like beğendim onay tamam okey evet' },
  { emoji: '👎', name: 'dislike beğenmedim hayır' },
  { emoji: '🔥', name: 'ateş alev yanan sıcak popüler' },
  { emoji: '❤️', name: 'kalp aşk sevgi kırmızı' },
  { emoji: '🎮', name: 'oyun konsol gamepad kol game oyna' },
  { emoji: '🕹️', name: 'atari joystick oyun kolu retro' },
  { emoji: '👾', name: 'uzaylı canavar retro piksel oyun' },
  { emoji: '💻', name: 'bilgisayar laptop yazılım kod pc' },
  { emoji: '🖥️', name: 'ekran monitör pc bilgisayar' },
  { emoji: '⚔️', name: 'kılıç savaş dövüş pvp duel' },
  { emoji: '🛡️', name: 'kalkan savunma koruma' },
  { emoji: '🏹', name: 'ok yay hedef av' },
  { emoji: '🗡️', name: 'hançer bıçak suikastçı' },
  { emoji: '🏆', name: 'kupa şampiyon ödül birincilik' },
  { emoji: '🎉', name: 'konfeti parti kutlama tebrik' },
  { emoji: '✨', name: 'yıldızlar parıltı sihir büyü' },
  { emoji: '💡', name: 'ampul fikir düşünce akıl yaratıcı' }
];

export function EmojiPicker({
  onSelect,
  className = '',
  buttonClassName = '',
  iconSize = 20,
  placement = 'top-right'
}: EmojiPickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const pickerRef = useRef<HTMLDivElement>(null);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleEmojiClick = (emoji: string) => {
    onSelect(emoji);
  };

  const getFilteredEmojis = () => {
    if (!searchQuery.trim()) {
      return EMOJI_CATEGORIES[activeCategory].emojis;
    }
    const query = searchQuery.toLowerCase();
    return ALL_EMOJIS_WITH_NAMES
      .filter(item => item.name.includes(query))
      .map(item => item.emoji);
  };

  // Placement class helper
  const getPlacementClass = () => {
    switch (placement) {
      case 'top-left':
        return 'bottom-full left-0 mb-3';
      case 'top-right':
        return 'bottom-full right-0 mb-3';
      case 'bottom-left':
        return 'top-full left-0 mt-3';
      case 'bottom-right':
      default:
        return 'top-full right-0 mt-3';
    }
  };

  return (
    <div className={`relative inline-block ${className}`} ref={pickerRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`p-2 text-armoyu-text-muted hover:text-amber-500 hover:bg-amber-500/10 rounded-xl transition-all duration-200 focus:outline-none shrink-0 group ${
          isOpen ? 'text-amber-500 bg-amber-500/10 scale-105' : ''
        } ${buttonClassName}`}
        title="Emoji Ekle"
      >
        <Smile size={iconSize} className="group-hover:scale-110 transition-transform" />
      </button>

      {/* Popover */}
      {isOpen && (
        <div className={`absolute ${getPlacementClass()} w-72 md:w-80 bg-zinc-950/95 border border-white/10 dark:border-white/5 rounded-3xl shadow-2xl z-[999] overflow-hidden backdrop-blur-2xl flex flex-col animate-in fade-in slide-in-from-bottom-3 duration-200`}>
          
          {/* Search Header */}
          <div className="p-3 pb-2 flex items-center gap-2 border-b border-white/5 bg-white/5">
            <div className="relative flex-1">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-white/40" />
              <input
                type="text"
                placeholder="Emoji ara..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-black/40 border border-white/5 rounded-2xl py-2 pl-9 pr-4 text-xs text-white placeholder-white/30 focus:outline-none focus:border-armoyu-primary focus:ring-1 focus:ring-armoyu-primary transition-all"
                autoFocus
              />
            </div>
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[10px] font-bold text-white/50 hover:text-white uppercase tracking-wider px-1.5 py-1 bg-white/5 rounded-lg transition-colors"
              >
                Temizle
              </button>
            )}
          </div>

          {/* Categories Tab (Hidden when searching) */}
          {!searchQuery && (
            <div className="flex justify-around items-center px-2 py-1.5 border-b border-white/5 bg-white/[0.02]">
              {EMOJI_CATEGORIES.map((cat, idx) => (
                <button
                  key={cat.name}
                  type="button"
                  onClick={() => setActiveCategory(idx)}
                  className={`w-9 h-9 flex items-center justify-center rounded-xl text-lg hover:bg-white/5 transition-all active:scale-90 ${
                    activeCategory === idx ? 'bg-armoyu-primary/20 border border-armoyu-primary/40 shadow-inner' : 'opacity-70 border border-transparent'
                  }`}
                  title={cat.name}
                >
                  {cat.icon}
                </button>
              ))}
            </div>
          )}

          {/* Emoji Grid */}
          <div className="p-3 max-h-56 overflow-y-auto grid grid-cols-6 md:grid-cols-7 gap-1.5 justify-items-center select-none scrollbar-thin scrollbar-thumb-white/10">
            {getFilteredEmojis().length > 0 ? (
              getFilteredEmojis().map((emoji, index) => (
                <button
                  key={`${emoji}-${index}`}
                  type="button"
                  onClick={() => handleEmojiClick(emoji)}
                  className="w-9 h-9 flex items-center justify-center text-2xl hover:bg-white/10 rounded-xl transition-all active:scale-90 hover:scale-110"
                >
                  {emoji}
                </button>
              ))
            ) : (
              <div className="col-span-full py-8 text-center text-xs text-white/40 font-bold uppercase tracking-wider">
                Emoji bulunamadı 🔍
              </div>
            )}
          </div>

          {/* Footer Info */}
          <div className="p-2.5 border-t border-white/5 bg-white/[0.01] flex items-center justify-between text-[9px] font-black uppercase tracking-widest text-white/40">
            <span>ARMOYU EMOJI CLIPS</span>
            <span>{searchQuery ? 'Arama Sonuçları' : EMOJI_CATEGORIES[activeCategory].name}</span>
          </div>

        </div>
      )}
    </div>
  );
}
