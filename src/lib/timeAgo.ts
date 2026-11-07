/** "az önce", "5 dakika önce", "1 saat önce", "dün", "3 gün önce" */
export function timeAgo(ms: number): string {
  const minutes = Math.floor(ms / 60_000);
  if (minutes < 5) return 'az önce';
  if (minutes < 60) return `${minutes} dakika önce`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours} saat önce`;
  const days = Math.floor(hours / 24);
  return days === 1 ? 'dün' : `${days} gün önce`;
}
