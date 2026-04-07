'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { useAuth } from '../../../context/AuthContext';
import { useSocket } from '../../../context/SocketContext';
export function RepostModal({ isOpen, onClose, post }) {
    const { user } = useAuth();
    const { emit } = useSocket();
    const [quoteText, setQuoteText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    useEffect(() => {
        const handleEsc = (e) => {
            if (e.key === 'Escape')
                onClose();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [onClose]);
    const handleRepostSubmit = (e) => {
        e.preventDefault();
        if (!user || isSubmitting)
            return;
        setIsSubmitting(true);
        try {
            // FULL SANITIZATION - Create a completely plain object with NO CLASS INSTANCES
            const sanitizedAuthor = {
                id: user.id || '',
                username: user.username || '',
                displayName: user.displayName || '',
                avatar: user.avatar || '',
                role: user.role ? { name: user.role.name, color: user.role.color } : null,
                verified: !!user.verified
            };
            const sanitizedOriginalAuthor = {
                id: post.author.id || '',
                username: post.author.username || '',
                displayName: post.author.displayName || '',
                avatar: post.author.avatar || '',
                role: post.author.role ? { name: post.author.role.name, color: post.author.role.color } : null,
                verified: !!post.author.verified
            };
            const newPostData = {
                id: 'p-repost-' + Date.now(),
                author: sanitizedAuthor,
                content: quoteText,
                repostOf: {
                    id: post.id,
                    author: sanitizedOriginalAuthor,
                    content: post.content,
                    media: post.media || [],
                    createdAt: post.createdAt,
                    stats: post.stats || { likes: 0, comments: 0, reposts: 0, shares: 0 }
                },
                createdAt: 'Şimdi',
                stats: { likes: 0, comments: 0, reposts: 0, shares: 0 },
                hashtags: quoteText.match(/#\w+/g)?.map(t => t.replace('#', '')) || []
            };
            // Emit safely
            emit('post', newPostData);
            emit('post_repost_count', { postId: post.id });
            setTimeout(() => {
                onClose();
                setQuoteText('');
                setIsSubmitting(false);
            }, 500);
        }
        catch (err) {
            console.error('Repost error:', err);
            setIsSubmitting(false);
        }
    };
    if (!isOpen)
        return null;
    return (_jsxs("div", { className: "fixed inset-0 z-[100] flex items-center justify-center p-4", children: [_jsx("div", { className: "absolute inset-0 bg-[#0a0a0f]/90 backdrop-blur-xl animate-in fade-in duration-500", onClick: onClose }), _jsxs("div", { className: "relative w-full max-w-lg glass-panel bg-armoyu-card-bg border border-armoyu-card-border rounded-[40px] shadow-[0_32px_120px_rgba(0,0,0,0.6)] overflow-hidden animate-in zoom-in-95 fade-in duration-500", children: [_jsx("div", { className: "absolute top-0 right-0 w-64 h-64 bg-green-500/10 blur-[100px] rounded-full -mr-32 -mt-32 pointer-events-none" }), _jsx("div", { className: "absolute bottom-0 left-0 w-48 h-48 bg-blue-400/5 blur-[80px] rounded-full -ml-24 -mb-24 pointer-events-none" }), _jsxs("div", { className: "p-8 pb-6 border-b border-armoyu-card-border flex items-center justify-between relative z-10", children: [_jsxs("div", { children: [_jsx("h2", { className: "text-2xl font-black text-armoyu-text uppercase tracking-tighter italic", children: "YEN\u0130DEN PAYLA\u015E" }), _jsx("p", { className: "text-[10px] font-black text-green-500 uppercase tracking-widest mt-1", children: "G\u00D6NDER\u0130Y\u0130 TAK\u0130P\u00C7\u0130LER\u0130NE \u0130LET" })] }), _jsx("button", { onClick: onClose, className: "w-10 h-10 rounded-2xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border flex items-center justify-center hover:bg-black/10 transition-all font-bold", children: _jsxs("svg", { xmlns: "http://www.w3.org/2000/svg", width: "18", height: "18", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "3", children: [_jsx("line", { x1: "18", y1: "6", x2: "6", y2: "18" }), _jsx("line", { x1: "6", y1: "6", x2: "18", y2: "18" })] }) })] }), _jsxs("div", { className: "p-8 space-y-6 relative z-10", children: [_jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1", children: "F\u0130KR\u0130N\u0130 EKLE (OPS\u0130YONEL)" }), _jsx("textarea", { rows: 3, value: quoteText, onChange: (e) => setQuoteText(e.target.value), placeholder: "Bu g\u00F6nderi hakk\u0131nda ne d\u00FC\u015F\u00FCn\u00FCyorsun?..", className: "w-full bg-black/10 dark:bg-black/20 border border-armoyu-card-border rounded-2xl px-5 py-4 text-armoyu-text placeholder:text-armoyu-text-muted/40 focus:outline-none focus:border-green-500/50 focus:ring-1 focus:ring-green-500/50 transition-all font-medium text-sm no-scrollbar resize-none" })] }), _jsxs("div", { className: "space-y-2", children: [_jsx("label", { className: "text-[10px] font-black uppercase tracking-widest text-armoyu-text-muted ml-1", children: "PAYLA\u015EILAN G\u00D6NDER\u0130" }), _jsxs("div", { className: "p-5 rounded-3xl bg-black/5 dark:bg-white/5 border border-armoyu-card-border", children: [_jsxs("div", { className: "flex items-center gap-3 mb-3", children: [_jsx("img", { src: post.author.avatar, alt: post.author.displayName, className: "w-8 h-8 rounded-full border border-armoyu-card-border" }), _jsxs("div", { children: [_jsx("h4", { className: "text-xs font-black text-armoyu-text leading-tight", children: post.author.displayName }), _jsxs("span", { className: "text-[10px] font-bold text-armoyu-text-muted opacity-60", children: ["@", post.author.username] })] })] }), _jsx("p", { className: "text-xs text-armoyu-text-muted line-clamp-2 leading-relaxed", children: post.content })] })] }), _jsxs("div", { className: "pt-4 space-y-3", children: [_jsx("button", { type: "button", onClick: handleRepostSubmit, disabled: isSubmitting, className: "w-full py-4 bg-green-500 hover:bg-green-400 text-black font-black text-xs uppercase tracking-[0.2em] rounded-2xl shadow-xl shadow-green-500/20 transition-all active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50", children: isSubmitting ? 'PAYLAŞILIYOR...' : 'YENİDEN PAYLAŞ' }), _jsx("button", { type: "button", onClick: onClose, className: "w-full py-4 text-armoyu-text-muted hover:text-red-500 font-black text-[10px] uppercase tracking-widest transition-colors", children: "\u0130PTAL ET" })] })] })] })] }));
}
//# sourceMappingURL=RepostModal.js.map