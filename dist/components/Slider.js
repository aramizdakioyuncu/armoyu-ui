'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
const defaultSlides = [
    {
        wallpaper: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
        content: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-4xl md:text-6xl font-black text-white drop-shadow-lg", children: "E-Spor Turnuvalar\u0131" }), _jsx("p", { className: "text-lg md:text-xl text-gray-200 drop-shadow-md font-medium", children: "Yeteneklerini g\u00F6ster ve devasa \u00F6d\u00FCl havuzundan pay\u0131n\u0131 al." })] }))
    },
    {
        wallpaper: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=2071&auto=format&fit=crop',
        content: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-4xl md:text-6xl font-black text-white drop-shadow-lg", children: "ARMOYU Minecraft" }), _jsx("p", { className: "text-lg md:text-xl text-gray-200 drop-shadow-md font-medium", children: "Geli\u015Fmi\u015F eklentiler ve bitmeyen aksiyon mc.armoyu.com'da." })] }))
    },
    {
        wallpaper: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=2070&auto=format&fit=crop',
        content: (_jsxs("div", { className: "space-y-4", children: [_jsx("h2", { className: "text-4xl md:text-6xl font-black text-white drop-shadow-lg", children: "B\u00FCy\u00FCk Topluluk" }), _jsx("p", { className: "text-lg md:text-xl text-gray-200 drop-shadow-md font-medium", children: "Binlerce oyuncuyla tan\u0131\u015F, ekibini kur ve rekabete kat\u0131l." })] }))
    }
];
export function Slider({ slides = defaultSlides, durationTime = 5000 }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    useEffect(() => {
        if (!slides || slides.length <= 1)
            return;
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % slides.length);
        }, durationTime);
        return () => clearInterval(timer);
    }, [slides, durationTime, currentIndex]);
    if (!slides || slides.length === 0)
        return null;
    return (_jsxs("div", { className: "relative w-full h-full min-h-[400px] md:min-h-[500px] rounded-[30px] overflow-hidden group shadow-2xl border border-white/5", children: [slides.map((slide, index) => (_jsxs("div", { className: `absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? 'opacity-100 z-10' : 'opacity-0 z-0'}`, children: [_jsx("div", { className: "absolute inset-0 bg-gradient-to-t from-[#0a0a0e] via-black/40 to-transparent z-10" }), _jsx("img", { src: slide.wallpaper, alt: `Slide ${index}`, className: "absolute inset-0 w-full h-full object-cover transition-transform duration-[10000ms] ease-linear overflow-hidden", style: {
                            transform: index === currentIndex ? 'scale(1.05)' : 'scale(1)',
                        } }), _jsx("div", { className: "absolute inset-0 z-20 flex flex-col justify-end pb-20 px-8 lg:px-16 text-left max-w-7xl mx-auto", children: _jsx("div", { className: `transition-all duration-700 transform ${index === currentIndex ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`, children: slide.content }) })] }, index))), _jsx("div", { className: "absolute bottom-6 left-0 right-0 z-20 flex justify-center px-8 lg:px-16 max-w-7xl mx-auto", children: _jsx("div", { className: "flex gap-3 w-full", children: slides.map((_, index) => (_jsxs("div", { className: "h-1 lg:h-1.5 flex-1 bg-white/20 rounded-full overflow-hidden cursor-pointer backdrop-blur-sm transition-all hover:bg-white/40", onClick: () => setCurrentIndex(index), children: [index === currentIndex && (_jsx("div", { className: "h-full bg-blue-500 rounded-full shadow-[0_0_10px_rgba(59,130,246,0.8)]", style: {
                                    animation: `progressBar ${durationTime}ms linear forwards`
                                } }, `progress-${currentIndex}`)), index < currentIndex && (_jsx("div", { className: "h-full bg-white/60 rounded-full" }))] }, index))) }) })] }));
}
//# sourceMappingURL=Slider.js.map