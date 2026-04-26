import { User } from '../auth/User';
import { Faculty as CoreFaculty } from '@armoyu/core';

/**
 * Represents a Faculty (Fakülte) within a School in the UI.
 */
export class Faculty {
  id: string = '';
  name: string = '';
  schoolId: string = '';
  representative: User | null = null;
  memberCount: number = 0;

  constructor(data: Partial<Faculty>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Faculty object from an API response.
   */
  static fromAPI(json: Record<string, any>): Faculty {
    if (!json) return new Faculty({});
    return new Faculty({
      id: String(json.id || ''),
      name: json.name || '',
      schoolId: String(json.schoolId || ''),
      representative: json.representative ? User.fromAPI(json.representative) : null,
      memberCount: Number(json.memberCount || 0)
    });
  }

  /**
   * Instantiates a Faculty object from a Core Entity.
   */
  static fromClass(entity: CoreFaculty): Faculty {
    if (!entity) return new Faculty({});
    return new Faculty({
      id: String(entity.id),
      name: entity.name,
      schoolId: String(entity.schoolId)
    });
  }
}
