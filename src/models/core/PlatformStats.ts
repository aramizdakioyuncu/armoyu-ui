import { GlobalStats } from '../../types/stats';

/**
 * Platform Statistics Class in the UI.
 * This class wraps GlobalStats data and offers helper methods for platform analytics.
 */
export class PlatformStats implements GlobalStats {
  totalPlayers: number;
  malePlayers: number;
  femalePlayers: number;
  totalForums: number;
  totalPolls: number;
  activeUsers24h: number;
  totalMatchesPlayed: number;
  totalGuilds: number;
  monthlyVisitors: number;
  totalNews: number;

  constructor(data: GlobalStats) {
    this.totalPlayers = data.totalPlayers || 0;
    this.malePlayers = data.malePlayers || 0;
    this.femalePlayers = data.femalePlayers || 0;
    this.totalForums = data.totalForums || 0;
    this.totalPolls = data.totalPolls || 0;
    this.activeUsers24h = data.activeUsers24h || 0;
    this.totalMatchesPlayed = data.totalMatchesPlayed || 0;
    this.totalGuilds = data.totalGuilds || 0;
    this.monthlyVisitors = data.monthlyVisitors || 0;
    this.totalNews = data.totalNews || 0;
  }

  /**
   * Instantiates a PlatformStats object from an API response.
   */
  static fromAPI(json: Record<string, any>): PlatformStats {
    if (!json) return new PlatformStats({} as any);
    
    return new PlatformStats({
      totalPlayers: Number(json.totalPlayers || json.toplam_oyuncu || 0),
      malePlayers: Number(json.malePlayers || json.erkek_oyuncu || 0),
      femalePlayers: Number(json.femalePlayers || json.kadin_oyuncu || 0),
      totalForums: Number(json.totalForums || json.toplam_forum || 0),
      totalPolls: Number(json.totalPolls || json.toplam_anket || 0),
      activeUsers24h: Number(json.activeUsers24h || json.aktif_24s || 0),
      totalMatchesPlayed: Number(json.totalMatchesPlayed || json.toplam_mac || 0),
      totalGuilds: Number(json.totalGuilds || json.toplam_lonca || 0),
      monthlyVisitors: Number(json.monthlyVisitors || json.aylik_ziyaretci || 0),
      totalNews: Number(json.totalNews || json.toplam_haber || 0),
    });
  }

  /**
   * Returns Gender Distribution Rates.
   */
  getGenderDistribution() {
    const total = this.malePlayers + this.femalePlayers;
    if (total === 0) return { malePercent: 0, femalePercent: 0 };
    const malePercent = Math.round((this.malePlayers / total) * 100);
    const femalePercent = 100 - malePercent;
    return { malePercent, femalePercent };
  }

  /**
   * Calculates the growth rate for a metric (Mock Data).
   */
  getGrowthRate(metric: keyof GlobalStats): number {
    const growthMap: Partial<Record<keyof GlobalStats, number>> = {
      totalPlayers: 12.4,
      activeUsers24h: 8.2,
      monthlyVisitors: 5.7,
      totalNews: 3.1,
      totalGuilds: 1.5,
    };
    return growthMap[metric] || 0;
  }

  /**
   * Returns the daily visitor growth trend for map data (Last 7 days %) (Mock Data).
   */
  getVisitorTrend() {
    return [45, 52, 48, 70, 61, 85, 92];
  }

  /**
   * Activity summary based on Forums, Polls, and News.
   */
  getActivityBreakdown() {
    return [
      { label: 'Forum Konuları', value: this.totalForums, color: 'var(--armoyu-primary)' },
      { label: 'Haber İçerikleri', value: this.totalNews, color: '#10b981' },
      { label: 'Aktif Anketler', value: this.totalPolls, color: '#f59e0b' },
    ];
  }
}
