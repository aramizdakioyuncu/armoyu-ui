/** Burç anahtarları Profiller eklentisiyle aynı (profiles.zodiac) */
export const ZODIAC_TR: Record<string, string> = {
  aries: 'Koç', taurus: 'Boğa', gemini: 'İkizler', cancer: 'Yengeç', leo: 'Aslan', virgo: 'Başak',
  libra: 'Terazi', scorpio: 'Akrep', sagittarius: 'Yay', capricorn: 'Oğlak', aquarius: 'Kova', pisces: 'Balık',
};

// Her burcun başladığı gün (ay-gün); öncesi bir önceki burç
const STARTS: [number, string][] = [
  [120, 'aquarius'], [219, 'pisces'], [321, 'aries'], [420, 'taurus'], [521, 'gemini'], [621, 'cancer'],
  [723, 'leo'], [823, 'virgo'], [923, 'libra'], [1023, 'scorpio'], [1122, 'sagittarius'], [1222, 'capricorn'],
];

/** "1999-04-25" → "taurus"; tarih yoksa / bozuksa boş */
export function zodiacOf(birthDate: string | undefined | null): string {
  const m = /^\d{4}-(\d{2})-(\d{2})/.exec(birthDate ?? '');
  if (!m) return '';
  const md = Number(m[1]) * 100 + Number(m[2]);
  return [...STARTS].reverse().find(([start]) => md >= start)?.[1] ?? 'capricorn';
}

/** Anahtar ya da zaten Türkçe ad → Türkçe ad */
export const zodiacLabel = (value: string | undefined | null) => (value ? ZODIAC_TR[value] ?? value : '');
