import { BaseModel } from '../BaseModel';

/**
 * Represents a Media item (Fotoğraf/Video) in the aramizdakioyuncu.com platform in the UI.
 */
export class Media extends BaseModel {
  title: string = '';
  count: number = 0;
  author: string = '';
  date: string = '';
  category: string = '';
  image: string = '';

  constructor(data: Partial<Media>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Media object from an API response.
   */
  static fromAPI(json: Record<string, any>): Media {
    if (!json) return new Media({});
    return new Media({
      title: json.title || '',
      count: Number(json.count || 0),
      author: json.author || '',
      date: json.date || '',
      category: json.category || '',
      image: json.image || json.thumb || '',
    });
  }
}
