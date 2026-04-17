import { BaseModel } from '../BaseModel';

/**
 * Represents a Badge or Achievement earned by a user.
 */
export class UserBadge extends BaseModel {
  id: string = '';
  name: string = '';
  description: string = '';
  icon: string = '';
  color: string = '';
  earnedAt?: string = '';

  constructor(data: Partial<UserBadge>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a UserBadge object from an API response.
   */
  static fromAPI(json: any): UserBadge {
    if (!json) return new UserBadge({});
    
    return new UserBadge({
      id: String(json.id || json.rozet_id || ''),
      name: json.name || json.rozet_ad || json.title || '',
      description: json.description || json.rozet_aciklama || '',
      icon: json.icon || json.rozet_icon || json.image_url || '',
      color: json.color || json.rozet_renk || '#808080',
      earnedAt: json.earnedAt || json.kazanma_tarihi || json.date || ''
    });
  }
}

export const mapBadgeFromAPI = (json: any): UserBadge => {
  return UserBadge.fromAPI(json);
};
