import { BaseModel } from '../../BaseModel';
import { SearchType } from './SearchEnums';

/**
 * Represents a Global Search Result in the UI.
 */
export class SearchResult extends BaseModel {
  id: string = '';
  type: SearchType = SearchType.USER;
  title: string = '';
  subtitle: string = '';
  username: string = '';
  avatar: string = '';
  url: string = '';

  constructor(data: Partial<SearchResult>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a SearchResult object from an API response.
   */
  static fromAPI(json: Record<string, any>): SearchResult {
    if (!json) return new SearchResult({});

    const rawType = String(json.type || json.kategori || json.tur || json.turu || '').toLowerCase();
    let type = SearchType.USER;

    if (rawType.includes('user') || rawType.includes('oyuncu')) {
      type = SearchType.USER;
    } else if (rawType.includes('group') || rawType.includes('grup')) {
      type = SearchType.GROUP;
    } else if (rawType.includes('post') || rawType.includes('paylasim')) {
      type = SearchType.POST;
    } else if (rawType.includes('game') || rawType.includes('oyun')) {
      type = SearchType.GAME;
    } else if (rawType.includes('news') || rawType.includes('haber')) {
      type = SearchType.NEWS;
    } else {
      type = SearchType.USER;
    }

    const title = json.Value || json.baslik || json.ad || json.title || json.name || json.displayName || '';
    const subtitle = json.username || json.subtitle || json.description || json.aciklama || json.altbaslik || '';
    const avatar = json.avatar || json.minavatar || json.minresim || json.image || json.thumb || '';
    const id = String(json.ID || json.id_bak || json.id || json.id_user || json.playerID || json.groupID || json.oyuncuID || json.grupID || '');
    const username = json.username || json.kullaniciadi || '';
    
    // Construct URLs if missing
    let url = json.url || '';
    if (!url && id) {
      if (type === SearchType.USER) url = `/oyuncular/${username || id}`;
      else if (type === SearchType.GROUP) url = `/gruplar/${username || json.slug || id}`;
    }

    return new SearchResult({
      id,
      type,
      title,
      subtitle,
      username,
      avatar,
      url
    });
  }

  isPlayer(): boolean {
    return this.type === SearchType.USER;
  }

  isTeam(): boolean {
    return this.type === SearchType.GROUP;
  }
}
