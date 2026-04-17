import { BaseModel } from '../BaseModel';

/**
 * Represents a Giveaway (Çekiliş) in the ARMOYU platform.
 */
export class Giveaway extends BaseModel {
  id: string = '';
  title: string = '';
  prize: string = '';
  status: 'active' | 'ended' = 'active';
  participants: number = 0;
  timeLeft: string = '';
  image: string = '';

  constructor(data: Partial<Giveaway>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Returns true if the giveaway is currently active.
   */
  isActive(): boolean {
    return this.status === 'active';
  }

  /**
   * Instantiates a Giveaway object from an API response.
   */
  static fromAPI(json: Record<string, any>): Giveaway {
    if (!json) return new Giveaway({});

    return new Giveaway({
      id: String(json.id || ''),
      title: json.title || '',
      prize: json.prize || '',
      status: json.status || 'active',
      participants: Number(json.participants || 0),
      timeLeft: json.timeLeft || json.time_left || '',
      image: json.image || '',
    });
  }
}
