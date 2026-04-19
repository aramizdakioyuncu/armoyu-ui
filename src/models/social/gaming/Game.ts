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
  role: string = '';
  clan: {
    name: string;
    shortName: string;
    role: string;
    color: string;
  } | null = null;

  constructor(data: Partial<Game>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Game object from an API response.
   */
  static fromAPI(json: Record<string, any>): Game {
    if (!json) return new Game({});

    const logoData = json.logo || json.minnakresim || json.oyun_minnaklogo || json.oyun_avatar || json.icon || json.game_logo || '';
    const bannerData = json.banner || json.buyukresim || json.oyun_kapak || json.oyun_resim || json.image || json.game_logo || '';

    return new Game({
      id: String(json.id || json.oyunid || json.oyun_id || json.id_oyun || json.ID || json.player_game_id || json.game_ID || ''),
      title: json.title || json.ad || json.oyun_ad || json.oyun_adi || json.game_name || json.game_Name || '',
      shortName: json.shortName || json.kisa_ad || json.oyun_kisa_ad || json.game_shortName || '',
      logo: typeof logoData === 'object' ? (logoData.media_URL || logoData.media_minURL || logoData.url || '') : logoData,
      banner: typeof bannerData === 'object' ? (bannerData.media_bigURL || bannerData.media_URL || bannerData.url || '') : bannerData,
      description: json.description || json.aciklama || json.oyun_aciklama || '',
      rating: Number(json.rating || json.puan || json.oyun_puan || json.game_score || 0),
      category: json.category || json.tür || json.oyun_tur || '',
      role: json.game_role?.role_name || json.role_name || json.oyun_rutbe || '',
      clan: json.game_clan ? {
        name: json.game_clan.clan_name || '',
        shortName: json.game_clan.clan_shortName || '',
        role: json.game_clan.clan_role?.role_name || '',
        color: json.game_clan.clan_color || ''
      } : null
    });
  }
}
