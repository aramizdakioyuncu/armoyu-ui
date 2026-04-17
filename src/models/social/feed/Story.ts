import { BaseModel } from '../../BaseModel';
import { User } from '../../auth/User';

/**
 * Represents a Social Story in the UI.
 */
export class Story extends BaseModel {
  id: string = '';
  author: User | null = null;
  media: string = '';
  timestamp: string = '';
  isViewed: boolean = false;

  constructor(data: Partial<Story>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Story object from an API response.
   */
  static fromAPI(json: Record<string, any>): Story {
    if (!json) return new Story({});

    return new Story({
      id: String(json.id || json.hikayeid || ''),
      author: (json.author || json.oyuncu) ? User.fromAPI(json.author || json.oyuncu) : null,
      media: json.media || json.resim || json.url || '',
      timestamp: json.timestamp || json.tarih || '',
      isViewed: json.isViewed === true || json.izlendi === 1 || false
    });
  }
}
