export interface ODPStatus {
    label: 'Tehlikeli' | 'Dengesiz' | 'İyi' | 'Sadık';
    color: string;
    bgColor: string;
    borderColor: string;
    icon: string;
}
/**
 * Normalizes and categorizes ODP scores into human-readable branding.
 * 0-30: Tehlikeli
 * 31-60: Dengesiz
 * 61-90: İyi
 * 91-100: Sadık
 */
export declare const getODPStatus: (score: number) => ODPStatus;
//# sourceMappingURL=odpUtils.d.ts.map