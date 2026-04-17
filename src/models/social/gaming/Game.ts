import { BaseModel } from '../../BaseModel';

/**
 * Represents a Game in the ARMOYU platform in the UI.
 */
export class Game extends BaseModel {
  id: string = '';
  title: string = '';
  shortName: string = '';
  logo: string = '';
  banner: string = '';
  description: string = '';
  rating: number = 0;
  category: string = '';

  constructor(data: Partial<Game>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Game object from an API response.
   */
  static fromAPI(json: Record<string, any>): Game {
    if (!json) return new Game({});

    return new Game({
      id: String(json.id || json.oyunid || ''),
      title: json.title || json.ad || '',
      shortName: json.shortName || json.kisa_ad || '',
      logo: json.logo || json.minnakresim || '',
      banner: json.banner || json.buyukresim || '',
      description: json.description || json.aciklama || '',
      rating: Number(json.rating || json.puan || 0),
      category: json.category || json.tür || ''
    });
  }
}
