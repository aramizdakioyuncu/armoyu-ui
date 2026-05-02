'use client';

import React, { useState, useEffect } from 'react';
import { Truck, Users, Calendar, ArrowRight, Car, Gamepad2, ChevronLeft, ChevronRight } from 'lucide-react';

interface FeaturedGame {
    id: string;
    name: string;
    type: string;
    image: string;
    description: string;
    eventCount: number;
    participantCount: string;
    color: string;
    icon: React.ReactNode;
}

const FEATURED_GAMES: FeaturedGame[] = [
    {
        id: 'ets2',
        name: 'Euro Truck Simulator 2',
        type: 'Simülasyon',
        image: 'https://images.unsplash.com/photo-1601584115197-04ecc0da31d7?q=80&w=2070&auto=format&fit=crop',
        description: 'Avrupa yollarında konvoylara katıl, kendi şirketini kur ve binlerce şoförle birlikte devasa lojistik operasyonlarını yönet.',
        eventCount: 12,
        participantCount: '450+',
        color: 'blue',
        icon: <Truck className="w-5 h-5" />
    },
    {
        id: 'gtav',
        name: 'GTA V / FiveM',
        type: 'Roleplay / Aksiyon',
        image: 'https://images.unsplash.com/photo-1605898399783-1820b7f53631?q=80&w=2070&auto=format&fit=crop',
        description: 'Los Santos sokaklarında kendi hikayeni yaz. İster suç dünyasının zirvesine oyna, ister kurallara uyan bir vatandaş ol.',
        eventCount: 8,
        participantCount: '1.2k+',
        color: 'orange',
        icon: <Gamepad2 className="w-5 h-5" />
    },
    {
        id: 'assetto',
        name: 'Assetto Corsa',
        type: 'Yarış Simülasyonu',
        image: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?q=80&w=2070&auto=format&fit=crop',
        description: 'Gerçekçi fizik motoru ve efsanevi pistlerle hız sınırlarını zorla. Drift konvoyları ve pist günleri seni bekliyor.',
        eventCount: 5,
        participantCount: '300+',
        color: 'red',
        icon: <Car className="w-5 h-5" />
    }
];

interface EventShowcaseProps {
    onFilter: (gameName: string) => void;
}

export function EventShowcase({ onFilter }: EventShowcaseProps) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    const nextSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev + 1) % FEATURED_GAMES.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    const prevSlide = () => {
        if (isAnimating) return;
        setIsAnimating(true);
        setCurrentIndex((prev) => (prev - 1 + FEATURED_GAMES.length) % FEATURED_GAMES.length);
        setTimeout(() => setIsAnimating(false), 500);
    };

    useEffect(() => {
        const timer = setInterval(nextSlide, 8000);
        return () => clearInterval(timer);
    }, [currentIndex]);

    const currentGame = FEATURED_GAMES[currentIndex];

    const getColorClass = (color: string) => {
        switch (color) {
            case 'blue': return 'text-armoyu-primary bg-armoyu-primary shadow-armoyu-primary/20';
            case 'orange': return 'text-orange-400 bg-orange-600 shadow-orange-600/20';
            case 'red': return 'text-red-400 bg-red-600 shadow-red-600/20';
            default: return 'text-armoyu-primary bg-armoyu-primary shadow-armoyu-primary/20';
        }
    };

    const getBorderClass = (color: string) => {
        switch (color) {
            case 'blue': return 'hover:border-armoyu-primary/30';
            case 'orange': return 'hover:border-orange-500/30';
            case 'red': return 'hover:border-red-500/30';
            default: return 'hover:border-armoyu-primary/30';
        }
    };

    return (
        <div className="relative group">
            <div 
                onClick={() => onFilter(currentGame.name)}
                className={`relative w-full h-[350px] rounded-[32px] overflow-hidden border border-white/5 shadow-2xl transition-all duration-500 cursor-pointer ${getBorderClass(currentGame.color)}`}
            >
                {/* Background Image with Animation */}
                {FEATURED_GAMES.map((game, index) => (
                    <div 
                        key={game.id}
                        className={`absolute inset-0 bg-cover bg-center transition-all duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 scale-100' : 'opacity-0 scale-110'}`}
                        style={{ backgroundImage: `url(${game.image})` }}
                    />
                ))}
                
                {/* Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />

                {/* Content */}
                <div className="relative h-full flex flex-col justify-center px-10 sm:px-16 space-y-6">
                    <div className={`flex items-center gap-3 transition-all duration-500 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-[0.2em] text-white shadow-lg ${getColorClass(currentGame.color).split(' ')[1]} ${getColorClass(currentGame.color).split(' ')[2]} animate-pulse`}>
                            Öne Çıkan Oyun
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-white/10 backdrop-blur-md rounded-full border border-white/10 text-[9px] font-bold text-white/80 uppercase tracking-widest">
                            {currentGame.icon}
                            {currentGame.type}
                        </div>
                    </div>

                    <div className={`space-y-2 transition-all duration-700 delay-100 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <h2 className="text-4xl sm:text-5xl font-black italic uppercase tracking-tighter text-white leading-tight">
                            {currentGame.name.split(' ')[0]} <br /> 
                            <span className={getColorClass(currentGame.color).split(' ')[0]}>{currentGame.name.split(' ').slice(1).join(' ')}</span>
                        </h2>
                        <p className="max-w-md text-sm font-medium text-white/50 leading-relaxed line-clamp-2">
                            {currentGame.description}
                        </p>
                    </div>

                    <div className={`flex flex-wrap items-center gap-6 pt-2 transition-all duration-700 delay-200 ${isAnimating ? 'opacity-0 translate-y-4' : 'opacity-100 translate-y-0'}`}>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60">
                                <Calendar className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-white leading-none">{currentGame.eventCount}</span>
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Aktif Etkinlik</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/60">
                                <Users className="w-5 h-5" />
                            </div>
                            <div className="flex flex-col">
                                <span className="text-lg font-black text-white leading-none">{currentGame.participantCount}</span>
                                <span className="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Toplam Katılımcı</span>
                            </div>
                        </div>

                        <div className={`hidden sm:flex items-center gap-2 px-6 py-3 bg-white text-black rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all group/btn hover:scale-105 active:scale-95`}>
                            Hemen Katıl
                            <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="absolute top-1/2 -translate-y-1/2 -left-4 sm:-left-6">
                <button 
                    onClick={(e) => { e.stopPropagation(); prevSlide(); }}
                    className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all active:scale-90"
                >
                    <ChevronLeft className="w-6 h-6" />
                </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-4 sm:-right-6">
                <button 
                    onClick={(e) => { e.stopPropagation(); nextSlide(); }}
                    className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-xl border border-white/10 flex items-center justify-center text-white/50 hover:text-white hover:border-white/20 transition-all active:scale-90"
                >
                    <ChevronRight className="w-6 h-6" />
                </button>
            </div>

            {/* Dots */}
            <div className="absolute bottom-8 right-12 flex gap-2">
                {FEATURED_GAMES.map((_, index) => (
                    <button
                        key={index}
                        onClick={(e) => { e.stopPropagation(); setCurrentIndex(index); }}
                        className={`h-1 rounded-full transition-all duration-500 ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/20'}`}
                    />
                ))}
            </div>
        </div>
    );
}
