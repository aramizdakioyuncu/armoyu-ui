'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { SurveyAnswer } from '@armoyu/core';
import { CheckCircle2, Users, Calendar, BarChart3 } from 'lucide-react';
export function SurveyCard({ survey }) {
    const [hasVoted, setHasVoted] = useState(survey.hasVoted);
    const [myVoteId, setMyVoteId] = useState(survey.myVoteId);
    const [options, setOptions] = useState(survey.options);
    const [totalVotes, setTotalVotes] = useState(survey.totalVotes);
    const handleVote = (optionId) => {
        if (hasVoted)
            return;
        // Optimistic Update
        setHasVoted(true);
        setMyVoteId(optionId);
        setTotalVotes(prev => prev + 1);
        setOptions(prev => prev.map(opt => {
            if (opt.id === optionId) {
                return new SurveyAnswer({ ...opt, votes: opt.votes + 1 });
            }
            return opt;
        }));
    };
    const getPercentage = (votes) => {
        if (totalVotes === 0)
            return 0;
        return Math.round((votes / totalVotes) * 100);
    };
    return (_jsxs("div", { className: "glass-panel p-6 md:p-8 rounded-[40px] border border-armoyu-card-border bg-armoyu-card-bg shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden relative group", children: [_jsx("div", { className: "absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 opacity-70" }), _jsxs("div", { className: "flex flex-col md:flex-row md:items-start justify-between gap-6 mb-8", children: [_jsxs("div", { className: "flex-1", children: [_jsxs("div", { className: "flex items-center gap-3 mb-4", children: [_jsx("div", { className: "w-10 h-10 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-500", children: _jsx(BarChart3, { size: 20 }) }), _jsxs("div", { children: [_jsx("p", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-widest leading-none mb-1", children: "Topluluk Anketi" }), _jsxs("div", { className: "flex items-center gap-2", children: [_jsx("img", { src: survey.author?.avatar, className: "w-4 h-4 rounded-full", alt: "" }), _jsxs("p", { className: "text-[10px] font-bold text-armoyu-text/60 uppercase", children: [survey.author?.displayName, " taraf\u0131ndan"] })] })] })] }), _jsx("h3", { className: "text-xl md:text-2xl font-black text-armoyu-text uppercase tracking-tight italic leading-tight mb-3", children: survey.question }), survey.description && (_jsx("p", { className: "text-xs font-medium text-armoyu-text-muted leading-relaxed max-w-2xl", children: survey.description }))] }), _jsxs("div", { className: "flex flex-col md:items-end gap-2 shrink-0", children: [_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5", children: [_jsx(Users, { size: 14, className: "text-blue-500" }), _jsxs("span", { className: "text-[10px] font-black text-armoyu-text uppercase tracking-widest", children: [totalVotes, " Toplam Oy"] })] }), survey.expiresAt && (_jsxs("div", { className: "flex items-center gap-2 px-3 py-1.5 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5", children: [_jsx(Calendar, { size: 14, className: "text-orange-500" }), _jsxs("span", { className: "text-[10px] font-black text-armoyu-text uppercase tracking-widest", children: ["Biti\u015F: ", survey.expiresAt] })] }))] })] }), _jsx("div", { className: "space-y-4", children: options.map((opt) => {
                    const percentage = getPercentage(opt.votes);
                    const isSelected = myVoteId === opt.id;
                    return (_jsxs("div", { className: "relative group/opt", onClick: () => handleVote(opt.id), children: [_jsxs("div", { className: `flex items-center justify-between p-4 md:p-5 rounded-2xl border transition-all cursor-pointer relative z-10 
                  ${isSelected ? 'bg-blue-500/10 border-blue-500/50' : 'bg-black/5 dark:bg-white/5 border-transparent hover:border-blue-500/20'}`, children: [_jsxs("div", { className: "flex items-center gap-4 flex-1", children: [_jsx("div", { className: `w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all 
                     ${isSelected ? 'bg-blue-500 border-blue-500 text-white' : 'border-armoyu-card-border group-hover/opt:border-blue-500/50'}`, children: isSelected && _jsx(CheckCircle2, { size: 14 }) }), _jsx("span", { className: `text-sm md:text-base font-black uppercase tracking-tight ${isSelected ? 'text-blue-500' : 'text-armoyu-text'}`, children: opt.text })] }), hasVoted && (_jsxs("div", { className: "flex items-center gap-3", children: [_jsxs("span", { className: "text-xs font-black text-armoyu-text/40", children: [opt.votes, " OY"] }), _jsxs("span", { className: "text-lg font-black text-armoyu-text italic", children: ["%", percentage] })] }))] }), hasVoted && (_jsx("div", { className: "absolute inset-0 z-0 p-1", children: _jsx("div", { className: "h-full bg-blue-500/10 rounded-xl transition-all duration-1000 ease-out", style: { width: `${percentage}%` } }) }))] }, opt.id));
                }) }), !hasVoted && (_jsx("div", { className: "mt-8 pt-6 border-t border-armoyu-card-border flex items-center justify-center", children: _jsx("p", { className: "text-[10px] font-black text-armoyu-text-muted uppercase tracking-[0.2em] animate-pulse", children: "Se\u00E7iminizi yapmak i\u00E7in bir se\u00E7ene\u011Fe t\u0131klay\u0131n" }) })), hasVoted && (_jsxs("div", { className: "mt-8 pt-6 border-t border-armoyu-card-border flex items-center justify-between", children: [_jsxs("p", { className: "text-[10px] font-black text-emerald-500 uppercase tracking-widest flex items-center gap-2", children: [_jsx(CheckCircle2, { size: 12 }), " Kat\u0131l\u0131m\u0131n\u0131z i\u00E7in te\u015Fekk\u00FCrler"] }), _jsx("button", { className: "text-[9px] font-black text-armoyu-text-muted hover:text-blue-500 uppercase tracking-widest transition-colors", onClick: () => window.location.reload(), children: "ANKET\u0130 SIFIRLA (TEST)" })] }))] }));
}
//# sourceMappingURL=SurveyCard.js.map