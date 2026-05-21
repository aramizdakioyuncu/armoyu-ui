'use client';

import React, { useState } from 'react';
import { createPortal } from 'react-dom';
import { Star, X, MessageSquare, Heart } from 'lucide-react';

interface RateUsModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit?: (rating: number, comment: string) => void;
}

export function RateUsModal({ isOpen, onClose, onSubmit }: RateUsModalProps) {
    const [rating, setRating] = useState(0);
    const [hoverRating, setHoverRating] = useState(0);
    const [comment, setComment] = useState('');
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [mounted, setMounted] = React.useState(false);

    React.useEffect(() => setMounted(true), []);

    if (!isOpen || !mounted) return null;

    const handleSubmit = () => {
        if (rating === 0) return;
        if (onSubmit) {
            onSubmit(rating, comment);
        }
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setRating(0);
            setComment('');
            onClose();
        }, 2000);
    };

    const modalContent = (
        <div className="fixed inset-0 z-[9999] flex justify-center items-center p-4 animate-in fade-in duration-200">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
            <div className="relative w-full max-w-md bg-armoyu-card-bg border border-armoyu-card-border rounded-[32px] shadow-2xl flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-6 border-b border-armoyu-card-border flex justify-between items-center relative overflow-hidden">
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-armoyu-primary/10 rounded-full blur-3xl" />
                    <h3 className="text-xl font-black text-armoyu-text uppercase tracking-tight italic flex items-center gap-3 relative z-10">
                        <Heart className="text-armoyu-primary fill-armoyu-primary/20" size={24} />
                        Bizi Değerlendir
                    </h3>
                    <button onClick={onClose} className="p-2 bg-black/5 dark:bg-white/5 hover:bg-black/10 dark:hover:bg-white/10 rounded-xl text-armoyu-text-muted transition-colors relative z-10">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 sm:p-8 space-y-6">
                    {isSubmitted ? (
                        <div className="py-8 text-center animate-in zoom-in duration-300">
                            <div className="w-20 h-20 bg-armoyu-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Heart className="text-armoyu-primary fill-armoyu-primary" size={40} />
                            </div>
                            <h4 className="text-2xl font-black text-armoyu-text uppercase tracking-tighter mb-2 italic">Teşekkürler!</h4>
                            <p className="text-sm font-bold text-armoyu-text-muted opacity-80 leading-relaxed max-w-[250px] mx-auto">
                                Değerlendirmen bizim için çok kıymetli. ARMOYU'yu daha iyi yapmak için çalışıyoruz.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="text-center">
                                <p className="text-sm font-bold text-armoyu-text-muted mb-6 uppercase tracking-widest opacity-80">
                                    Platform deneyiminiz nasıl?
                                </p>
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => setRating(star)}
                                            onMouseEnter={() => setHoverRating(star)}
                                            onMouseLeave={() => setHoverRating(0)}
                                            className="p-2 transition-all transform hover:scale-110 focus:outline-none"
                                        >
                                            <Star 
                                                size={36} 
                                                className={`transition-colors duration-200 ${
                                                    (hoverRating || rating) >= star 
                                                        ? 'text-amber-400 fill-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' 
                                                        : 'text-armoyu-text-muted/30'
                                                }`} 
                                            />
                                        </button>
                                    ))}
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-[0.2em] text-armoyu-primary transition-opacity duration-200">
                                    {rating === 1 ? 'Çok Kötü' : rating === 2 ? 'Kötü' : rating === 3 ? 'Orta' : rating === 4 ? 'İyi' : rating === 5 ? 'Mükemmel' : 'Puan Ver'}
                                </span>
                            </div>

                            <div className="space-y-3">
                                <label className="text-[10px] font-black uppercase tracking-[0.15em] text-armoyu-text-muted ml-2">Eklemek istediklerin (Opsiyonel)</label>
                                <div className="relative group">
                                    <MessageSquare size={16} className="absolute left-4 top-4 text-armoyu-text-muted/50 group-focus-within:text-armoyu-primary transition-colors" />
                                    <textarea
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        placeholder="Görüş ve önerilerini bizimle paylaş..."
                                        rows={4}
                                        className="w-full pl-11 pr-4 py-3 bg-black/5 dark:bg-white/5 border border-armoyu-card-border rounded-2xl text-sm text-armoyu-text placeholder:text-armoyu-text-muted/50 focus:outline-none focus:border-armoyu-primary focus:ring-1 focus:ring-armoyu-primary transition-all resize-none font-medium"
                                    />
                                </div>
                            </div>

                            <button 
                                onClick={handleSubmit}
                                disabled={rating === 0}
                                className={`w-full py-4 rounded-2xl font-black text-[11px] uppercase tracking-[0.2em] transition-all flex items-center justify-center gap-2 ${
                                    rating > 0 
                                        ? 'bg-armoyu-primary text-white shadow-xl shadow-armoyu-primary/20 active:scale-95' 
                                        : 'bg-black/10 dark:bg-white/10 text-armoyu-text-muted cursor-not-allowed'
                                }`}
                            >
                                GÖNDER
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );

    if (typeof document === 'undefined') return null;
    return createPortal(modalContent, document.body);
}
