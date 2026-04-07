/**
 * Normalizes and categorizes ODP scores into human-readable branding.
 * 0-30: Tehlikeli
 * 31-60: Dengesiz
 * 61-90: İyi
 * 91-100: Sadık
 */
export const getODPStatus = (score) => {
    if (score <= 30) {
        return {
            label: 'Tehlikeli',
            color: 'text-red-500',
            bgColor: 'bg-red-500/10',
            borderColor: 'border-red-500/20',
            icon: 'AlertTriangle'
        };
    }
    if (score <= 60) {
        return {
            label: 'Dengesiz',
            color: 'text-orange-500',
            bgColor: 'bg-orange-500/10',
            borderColor: 'border-orange-500/20',
            icon: 'Zap'
        };
    }
    if (score <= 90) {
        return {
            label: 'İyi',
            color: 'text-emerald-500',
            bgColor: 'bg-emerald-500/10',
            borderColor: 'border-emerald-500/20',
            icon: 'ShieldCheck'
        };
    }
    return {
        label: 'Sadık',
        color: 'text-purple-500',
        bgColor: 'bg-purple-500/10',
        borderColor: 'border-purple-500/20',
        icon: 'Crown'
    };
};
//# sourceMappingURL=odpUtils.js.map