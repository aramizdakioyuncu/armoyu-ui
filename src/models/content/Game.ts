import { BaseModel } from '../BaseModel';

/**
 * Represents a Game in the aramizdakioyuncu.com platform in the UI.
 */
export class Game extends BaseModel {
  id: string = '';
  shortName: string = '';
  name: string = '';
  slug: string = '';
  logo: string = '';
  poster: string = '';
  category: string = '';
  developer: string = '';
  description: string = '';

  constructor(data: Partial<Game>) {
    super();
    Object.assign(this, data);
    if (!this.slug && this.name) {
      this.slug = this.name.toLowerCase()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '');
    }
  }

  /**
   * Instantiates a Game object from an API response.
   */
  static fromAPI(json: Record<string, any>): Game {
    if (!json) return new Game({});
    return new Game({
      id: String(json.id || ''),
      name: json.name || '',
      slug: json.slug || '',
      logo: json.logo || json.logo_url || '',
      poster: json.poster || json.poster_url || '',
      category: json.category || '',
      developer: json.developer || '',
      description: json.description || '',
    });
  }
}
