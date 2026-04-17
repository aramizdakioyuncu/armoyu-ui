import { BaseModel } from '../../BaseModel';

/**
 * Represents a personal note or status (Instagram style) in the UI.
 */
export class Note extends BaseModel {
  id: string = '';
  username: string = '';
  content: string = '';
  avatar: string = '';
  createdAt: string = '';

  constructor(data: Partial<Note>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Note object from an API response.
   */
  static fromAPI(json: Record<string, any>): Note {
    if (!json) return new Note({});

    return new Note({
      id: json.id || '',
      username: json.username || json.kulladi || '',
      content: json.content || json.icerik || json.text || '',
      avatar: json.avatar || json.oyuncuminnakavatar || '',
      createdAt: json.createdAt || json.created_at || json.zaman || ''
    });
  }
}
