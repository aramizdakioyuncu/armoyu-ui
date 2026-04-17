import { BaseModel } from '../BaseModel';

/**
 * Represents a user in the context of leaderboards/rankings in the UI.
 * This class maps directly to the structure returned by XP and POP ranking APIs.
 */
export class RankedUser extends BaseModel {
  id: number = 0;
  displayName: string = '';
  username: string = '';
  avatar: string = '';
  level: number = 1;
  xp: number = 0;
  seasonalXp: number = 0;
  popScore: number = 0;

  constructor(data: Partial<RankedUser>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a RankedUser object from an API response.
   */
  static fromAPI(json: Record<string, any>): RankedUser {
    if (!json) return new RankedUser({});
    return new RankedUser({
      id: Number(json.oyuncuID || 0),
      displayName: json.oyuncuadsoyad || '',
      username: json.oyuncukullaniciadi || '',
      avatar: json.oyuncuavatar || '',
      level: Number(json.oyuncuseviye || 1),
      xp: Number(json.oyuncuseviyexp || 0),
      seasonalXp: Number(json.oyuncuseviyesezonlukxp || 0),
      popScore: Number(json.oyuncupop || 0)
    });
  }
}
