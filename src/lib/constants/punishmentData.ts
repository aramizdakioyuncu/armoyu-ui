export type RestrictionType = 'CHAT_BAN' | 'POST_BAN' | 'PROFILE_EDIT_BAN' | 'LOGIN_BAN' | 'PERMANENT_BAN';

export type RuleCategory = 'SOHBET' | 'GÜVENLİK' | 'İÇERİK' | 'HESAP' | 'ETKİNLİK';

export interface PunishmentRule {
  id: string;
  article: string; // e.g., "M1.1"
  name: string;
  category: RuleCategory;
  description: string;
  duration: number; // in hours, 0 for permanent
  restrictions: RestrictionType[];
  severity: 'low' | 'medium' | 'high' | 'critical';
  isMajor?: boolean; // If true, escalation is stricter. If false, it's educational.
}

export const PUNISHMENT_RULES: PunishmentRule[] = [
  // SOHBET (M1.X)
  {
    id: 'spam-flood',
    article: 'M1.1',
    category: 'SOHBET',
    name: 'Spam / Flood',
    description: 'Sohbet veya yorum alanlarında tekrarlayıcı ve rahatsız edici içerik paylaşımı.',
    duration: 24,
    restrictions: ['CHAT_BAN'],
    severity: 'low',
    isMajor: false
  },
  {
    id: 'inappropriate-lang',
    article: 'M1.2',
    category: 'SOHBET',
    name: 'Uygunsuz Dil / Küfür',
    description: 'Diğer kullanıcılara yönelik hakaret, küfür veya aşağılayıcı ifadeler.',
    duration: 72,
    restrictions: ['CHAT_BAN'],
    severity: 'medium',
    isMajor: true
  },
  {
    id: 'toxic-behavior',
    article: 'M1.3',
    category: 'SOHBET',
    name: 'Toksik Davranış / Kışkırtma',
    description: 'Topluluk huzurunu bozmaya yönelik kışkırtmalar ve huzursuzluk çıkarma.',
    duration: 48,
    restrictions: ['CHAT_BAN'],
    severity: 'low',
    isMajor: false
  },

  // İÇERİK (M2.X)
  {
    id: 'misleading-content',
    article: 'M2.1',
    category: 'İÇERİK',
    name: 'Hatalı Paylaşım / Clickbait',
    description: 'Topluluğu yanıltıcı veya gereksiz (çöp) içerik üretimi.',
    duration: 48,
    restrictions: ['POST_BAN'],
    severity: 'low',
    isMajor: false
  },
  {
    id: 'illegal-content',
    article: 'M2.2',
    category: 'İÇERİK',
    name: 'İllegal / Uygunsuz Paylaşım',
    description: 'Yasal olmayan içeriklerin, korsan yazılım veya uygunsuz medyanın paylaşımı.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  },
  {
    id: 'ad-sharing',
    article: 'M2.3',
    category: 'İÇERİK',
    name: 'İzinsiz Reklam / Tanıtım',
    description: 'Yönetimden izin almadan yapılan topluluk, yayıncı veya ürün reklamları.',
    duration: 168,
    restrictions: ['POST_BAN', 'CHAT_BAN'],
    severity: 'medium',
    isMajor: false
  },

  // GÜVENLİK (M3.X)
  {
    id: 'harassment',
    article: 'M3.1',
    category: 'GÜVENLİK',
    name: 'Kullanıcı Taciz / Rahatsızlık',
    description: 'Kullanıcıları sistematik olarak rahatsız etme veya taciz etme.',
    duration: 168, 
    restrictions: ['CHAT_BAN', 'POST_BAN', 'PROFILE_EDIT_BAN'],
    severity: 'high',
    isMajor: true
  },
  {
    id: 'doxxing',
    article: 'M3.2',
    category: 'GÜVENLİK',
    name: 'Kişisel Veri İhlali / Doxxing',
    description: 'Bir kullanıcının gerçek hayat verilerini, adresini veya telefonunu izinsiz paylaşma.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  },
  {
    id: 'bug-abuse',
    article: 'M3.3',
    category: 'GÜVENLİK',
    name: 'Sistem Odaklı Hata Kullanımı',
    description: 'Platformdaki hataları (bug) bildirmek yerine kendi çıkarı için kullanma.',
    duration: 720, // 1 month
    restrictions: ['LOGIN_BAN', 'POST_BAN'],
    severity: 'high',
    isMajor: true
  },

  // HESAP (M4.X)
  {
    id: 'fake-identity',
    article: 'M4.1',
    category: 'HESAP',
    name: 'Sahte Kimlik / Taklit',
    description: 'Başka bir kullanıcıyı veya yetkiliyi taklit etme.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  },
  {
    id: 'hate-speech',
    article: 'M4.2',
    category: 'HESAP',
    name: 'Nefret Söylemi / Değerlere Hakaret',
    description: 'Dini, milli veya manevi değerlere yönelik ağır hakaret ve saldırı.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  },
  {
    id: 'fraud',
    article: 'M4.3',
    category: 'HESAP',
    name: 'Dolandırıcılık / Sahtekarlık',
    description: 'Hizmet veya ürün alımlarında kullanıcıları veya sistemi dolandırma girişimi.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  },
  {
    id: 'multi-account',
    article: 'M4.4',
    category: 'HESAP',
    name: 'Çoklu Hesap / Multi Account',
    description: 'Yasaklandığı halde farklı hesaplarla sisteme tekrar dahil olma girişimi.',
    duration: 0,
    restrictions: ['PERMANENT_BAN'],
    severity: 'critical',
    isMajor: true
  }
];

export const getRestrictionLabel = (type: RestrictionType): string => {
  switch (type) {
    case 'CHAT_BAN': return 'Sohbet Yasağı';
    case 'POST_BAN': return 'Paylaşım Yasağı';
    case 'PROFILE_EDIT_BAN': return 'Profil Düzenleme Yasağı';
    case 'LOGIN_BAN': return 'Giriş Yasağı';
    case 'PERMANENT_BAN': return 'Kalıcı Yasaklama (Ban)';
    default: return 'Bilinmeyen Kısıtlama';
  }
};

/**
 * Calculates the escalated duration based on the number of previous punishments.
 * Formula: base * multiplier
 */
export const calculateEscalatedDuration = (baseDuration: number, punishmentCount: number): number => {
  if (baseDuration === 0) return 0; // Permanent stays permanent
  
  const level = getCommunityComplianceLevel(punishmentCount);
  return Math.round(baseDuration * level.multiplier);
};

/**
 * Returns the community compliance level details based on involvement count.
 */
export const getCommunityComplianceLevel = (count: number) => {
  if (count === 0) return { label: 'Tam Uyumlu', color: '#10b981', multiplier: 1.0, severity: 'safe' };
  if (count < 3) return { label: 'Biliyor', color: 'var(--armoyu-primary)', multiplier: 1.1, severity: 'low' };
  if (count < 6) return { label: 'Dikkat Etmeli', color: '#eab308', multiplier: 1.3, severity: 'medium' };
  if (count < 9) return { label: 'Rehberlik Gerekli', color: '#f97316', multiplier: 1.6, severity: 'high' };
  return { label: 'İnceleme Altında', color: '#ef4444', multiplier: 2.0, severity: 'critical' };
};
