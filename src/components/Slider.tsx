'use client';

import React, { useState, useEffect } from 'react';

export interface SlideItem {
  wallpaper: string;
  content: React.ReactNode;
}

export interface SliderProps {
  slides?: SlideItem[];
  durationTime?: number; // In milliseconds
}

const defaultSlides: SlideItem[] = [
  {
    wallpaper: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    content: (
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">E-Spor Turnuvaları</h2>
        <p className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">Yeteneklerini göster ve devasa ödül havuzundan payını al.</p>
      </div>
    )
  },
  {
    wallpaper: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
    content: (
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">ARMOYU Minecraft</h2>
        <p className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">Gelişmiş eklentiler ve bitmeyen aksiyon mc.armoyu.com'da.</p>
      </div>
    )
  },
  {
    wallpaper: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
    content: (
      <div className="space-y-4">
        <h2 className="text-4xl md:text-6xl font-black text-white drop-shadow-lg">Büyük Topluluk</h2>
        <p className="text-lg md:text-xl text-gray-200 drop-shadow-md font-medium">Binlerce oyuncuyla tanış, ekibini kur ve rekabete katıl.</p>
      </div>
    )
  }
];

export function Slider({ slides = defaultSlides, durationTime = 5000 }: SliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, durationTime);

    return () => clearInterval(timer);
  }, [slides, durationTime, currentIndex]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-[30px] overflow-hidden group shadow-2xl border border-white/5">
      {/* Background Images */}
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-black/40 to-transparent z-10" />
          <img
            src={slide.wallpaper}
            alt={`Slide ${index}`}
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear overflow-hidden"
            style={{
              transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)',
            }}
          />
          <div className="absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 lg:px-16 text-left max-w-7xl mx-auto">
            <div className={`transition-all duration-700 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}>
              {slide.content}
            </div>
          </div>
        </div>
      ))}

      {/* Progress Bar Container */}
      <div className="absolute bottom-6 left-0 right-0 z-20 flex justify-center px-8 lg:px-16 max-w-7xl mx-auto">
        <div className="flex gap-3 w-full">
          {slides.map((_, index) => (
            <div 
              key={index} 
              className="h-1 lg:h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer backdrop-blur-sm transition-all hover:bg-white/40"
              onClick={() => setCurrentIndex(index)}
            >
              {index === currentIndex && (
                <div 
                  key={`progress-${currentIndex}`}
                  className="h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]"
                  style={{
                    animation: `progressBar ${durationTime}ms linear forwards`
                  }}
                />
              )}
              {index < currentIndex && (
                 <div className="h-full bg-white/60 rounded-full" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
