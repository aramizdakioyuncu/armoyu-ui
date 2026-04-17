import { BaseModel } from '../../BaseModel';
import { User } from '../../auth/User';

/**
 * Represents a User that has been blocked in the UI.
 */
export class BlockedUser extends BaseModel {
  user: User | null = null;
  blockedAt: string = '';
  reason?: string;

  constructor(data: Partial<BlockedUser>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a BlockedUser object from an API response.
   */
  static fromAPI(json: Record<string, any>): BlockedUser {
    if (!json) return new BlockedUser({});
    return new BlockedUser({
      user: json.user ? User.fromAPI(json.user) : (json.oyuncu ? User.fromAPI(json.oyuncu) : null),
      blockedAt: json.blockedAt || json.tarih || '',
      reason: json.reason || json.sebep || ''
    });
  }
}
