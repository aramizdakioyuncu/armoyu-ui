export type RestrictionType = 'CHAT_BAN' | 'POST_BAN' | 'PROFILE_EDIT_BAN' | 'LOGIN_BAN' | 'PERMANENT_BAN';
export type RuleCategory = 'SOHBET' | 'GÜVENLİK' | 'İÇERİK' | 'HESAP' | 'ETKİNLİK';
export interface PunishmentRule {
    id: string;
    article: string;
    name: string;
    category: RuleCategory;
    description: string;
    duration: number;
    restrictions: RestrictionType[];
    severity: 'low' | 'medium' | 'high' | 'critical';
    isMajor?: boolean;
}
export declare const PUNISHMENT_RULES: PunishmentRule[];
export declare const getRestrictionLabel: (type: RestrictionType) => string;
/**
 * Calculates the escalated duration based on the number of previous punishments.
 * Formula: base * multiplier
 */
export declare const calculateEscalatedDuration: (baseDuration: number, punishmentCount: number) => number;
/**
 * Returns the community compliance level details based on involvement count.
 */
export declare const getCommunityComplianceLevel: (count: number) => {
    label: string;
    color: string;
    multiplier: number;
    severity: string;
};
//# sourceMappingURL=punishmentData.d.ts.map