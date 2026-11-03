/** Telefon "+<ülke kodu> <numara>" biçiminde saklanır, ör. "+90 555 111 22 33". */
export const DEFAULT_PHONE_CODE = '90';

// Türkiye: 555 111 22 33; diğer ülkeler üçerli gruplar
const GROUPS: Record<string, number[]> = { '90': [3, 3, 2, 2] };
const MAX_DIGITS = 12;

export function formatNationalNumber(value: string, code: string): string {
  const digits = value.replace(/\D/g, '').replace(code === '90' ? /^0/ : /$^/, '').slice(0, code === '90' ? 10 : MAX_DIGITS);
  const sizes = GROUPS[code] ?? Array(Math.ceil(digits.length / 3)).fill(3);
  const parts: string[] = [];
  let index = 0;
  for (const size of sizes) {
    if (index >= digits.length) break;
    parts.push(digits.slice(index, index + size));
    index += size;
  }
  if (index < digits.length) parts.push(digits.slice(index));
  return parts.join(' ');
}

export function splitPhone(full: string): { code: string; national: string } {
  const match = (full || '').trim().match(/^\+(\d{1,4})\s+(.*)$/);
  if (!match) return { code: DEFAULT_PHONE_CODE, national: formatNationalNumber(full || '', DEFAULT_PHONE_CODE) };
  return { code: match[1], national: formatNationalNumber(match[2], match[1]) };
}

export function joinPhone(code: string, national: string): string {
  return national.trim() ? `+${code} ${national.trim()}` : '';
}
