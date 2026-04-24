/**
 * Represents a user in the context of leaderboards/rankings in the UI.
 * This class maps directly to the structure returned by XP and POP ranking APIs.
 */
export class RankedUser {
  id: number = 0;
  displayName: string = '';
  username: string = '';
  avatar: string = '';
  level: number = 1;
  xp: number = 0;
  seasonalXp: number = 0;
  popScore: number = 0;

  constructor(data: Partial<RankedUser>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a RankedUser object from an API response.
   */
  static fromAPI(json: Record<string, any>): RankedUser {
    console.log("[RankedUser] Mapping from API:", json);
    if (!json) return new RankedUser({});
    return new RankedUser({
      id: Number(json.id || json.oyuncuID || 0),
      displayName: json.displayName || json.oyuncuadsoyad || '',
      username: json.username || json.oyuncukullaniciadi || json.oyuncukullaniciad || '',
      avatar: json.avatar || json.oyuncuavatar || '',
      level: Number(json.level || json.oyuncuseviye || 1),
      xp: Number(json.xp || json.oyuncuseviyexp || 0),
      seasonalXp: Number(json.value || json.seasonalXp || json.oyuncuseviyesezonlukxp || 0),
      popScore: Number(json.value || json.popScore || json.oyuncupop || 0)
    });
  }
}
