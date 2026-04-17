import { BaseModel } from '../../BaseModel';
import { User } from '../../auth/User';

/**
 * Represents an entry in a Leaderboard in the UI.
 */
export class LeaderboardEntry extends BaseModel {
  user: User | null = null;
  score: number = 0;
  rank: number = 0;

  constructor(data: Partial<LeaderboardEntry>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a LeaderboardEntry object from an API response.
   */
  static fromAPI(json: Record<string, any>): LeaderboardEntry {
    if (!json) return new LeaderboardEntry({});
    return new LeaderboardEntry({
      user: json.user ? User.fromAPI(json.user) : (json.oyuncu ? User.fromAPI(json.oyuncu) : null),
      score: Number(json.score || json.puan || 0),
      rank: Number(json.rank || json.sira || 0)
    });
  }
}

/**
 * Represents a Leaderboard in the UI.
 */
export class Leaderboard extends BaseModel {
  id: string = '';
  title: string = '';
  entries: LeaderboardEntry[] = [];
  lastUpdated: string = '';

  constructor(data: Partial<Leaderboard>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Leaderboard object from an API response.
   */
  static fromAPI(json: Record<string, any>): Leaderboard {
    if (!json) return new Leaderboard({});
    return new Leaderboard({
      id: String(json.id || json.listeid || ''),
      title: json.title || json.baslik || '',
      entries: Array.isArray(json.entries || json.liste) ? (json.entries || json.liste).map((e: any) => LeaderboardEntry.fromAPI(e)) : [],
      lastUpdated: json.lastUpdated || json.guncelleme || ''
    });
  }
}
