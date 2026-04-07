/**
 * Formats large numbers into a shorter string and its unit suffix.
 * 14200 -> { value: "14.2", unit: "B" }
 * 1200000 -> { value: "1.2", unit: "M" }
 */
export function formatStatValue(num) {
    if (num >= 1000000) {
        const val = (num / 1000000).toFixed(1);
        return { value: val.endsWith('.0') ? val.slice(0, -2) : val, unit: 'M' };
    }
    if (num >= 1000) {
        const val = (num / 1000).toFixed(1);
        return { value: val.endsWith('.0') ? val.slice(0, -2) : val, unit: 'B' };
    }
    return { value: num, unit: '' };
}
//# sourceMappingURL=numberFormat.js.map