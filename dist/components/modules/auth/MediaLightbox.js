'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect, useCallback } from 'react';
import { createPortal } from 'react-dom';
export function MediaLightbox({ isOpen, onClose, media, initialIndex = 0 }) {
    const [currentIndex, setCurrentIndex] = useState(initialIndex);
    const [mounted, setMounted] = useState(false);
    const handlePrev = useCallback((e) => {
        e?.stopPropagation();
        setCurrentIndex(prev => (prev === 0 ? media.length - 1 : prev - 1));
    }, [media.length]);
    const handleNext = useCallback((e) => {
        e?.stopPropagation();
        setCurrentIndex(prev => (prev === media.length - 1 ? 0 : prev + 1));
    }, [media.length]);
    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            setCurrentIndex(initialIndex);
            document.body.style.overflow = 'hidden';
        }
        // Klavye Desteği
        const handleKeyDown = (e) => {
            if (!isOpen)
                return;
            if (e.key === 'ArrowLeft')
                handlePrev(e);
            if (e.key === 'ArrowRight')
                handleNext(e);
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => {
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
        };
    }, [isOpen, initialIndex, handlePrev, handleNext, onClose]);
    if (!isOpen || !media || media.length === 0 || !mounted)
        return null;
    const currentMedia = media[currentIndex];
    const modalContent = (_jsxs("div", { className: "fixed inset-0 z-[9999] flex items-center justify-center animate-in fade-in duration-200", children: [_jsx("div", { className: "absolute inset-0 bg-[#0a0a0f]/95 backdrop-blur-md", onClick: onClose }), _jsx("button", { onClick: onClose, className: "absolute top-4 md:top-6 right-4 md:right-6 text-white/50 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 md:p-3 rounded-full transition-all z-[10001] border border-white/10 active:scale-90", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2.5", strokeLinecap: "round", strokeLinejoin: "round", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) }), media.length > 1 && (_jsxs("div", { className: "absolute top-4 md:top-6 left-4 md:left-6 text-white bg-white/10 px-4 py-1.5 rounded-full font-black text-[10px] tracking-widest z-[10001] border border-white/10 backdrop-blur-md uppercase", children: [currentIndex + 1, " / ", media.length] })), media.length > 1 && (_jsx("button", { onClick: (e) => handlePrev(e), className: "absolute left-4 md:left-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 md:p-5 rounded-full transition-all z-[10001] border border-transparent hover:border-white/10 backdrop-blur-md group active:scale-90", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", className: "group-hover:-translate-x-0.5 transition-transform", children: _jsx("polyline", { points: "15 18 9 12 15 6" }) }) })), media.length > 1 && (_jsx("button", { onClick: (e) => handleNext(e), className: "absolute right-4 md:right-8 top-1/2 -translate-y-1/2 text-white/40 hover:text-white bg-white/5 hover:bg-white/10 p-4 md:p-5 rounded-full transition-all z-[10001] border border-transparent hover:border-white/10 backdrop-blur-md group active:scale-90", children: _jsx("svg", { xmlns: "http://www.w3.org/2000/svg", width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", strokeLinecap: "round", strokeLinejoin: "round", className: "group-hover:translate-x-0.5 transition-transform", children: _jsx("polyline", { points: "9 18 15 12 9 6" }) }) })), _jsx("div", { className: "relative w-full h-full max-w-7xl max-h-[92vh] flex items-center justify-center p-4 md:p-12 z-[10000]", onClick: onClose, children: currentMedia.type === 'video' ? (
                // eslint-disable-next-line jsx-a11y/media-has-caption
                _jsx("video", { src: currentMedia.url, controls: true, autoPlay: true, className: "max-w-full max-h-full rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] object-contain animate-in zoom-in-95 duration-500 ring-1 ring-white/10", onClick: (e) => e.stopPropagation() })) : (_jsx("img", { src: currentMedia.url, alt: "Galeri Medyas\u0131", className: "max-w-full max-h-full rounded-2xl shadow-[0_0_80px_rgba(0,0,0,0.8)] object-contain animate-in zoom-in-95 duration-500 ring-1 ring-white/10", onClick: (e) => e.stopPropagation() })) })] }));
    return createPortal(modalContent, document.body);
}
//# sourceMappingURL=MediaLightbox.js.map