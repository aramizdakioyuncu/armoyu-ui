import { BaseModel } from '../BaseModel';
import { User } from '../auth/User';

/**
 * Represents a Classroom (Sınıf) in the ARMOYU education ecosystem in the UI.
 */
export class Classroom extends BaseModel {
  id: string = '';
  name: string = '';
  password?: string = '';
  schoolId: string = '';
  members: User[] = [];
  teacher: User | null = null;
  memberCount: number = 0;

  constructor(data: Partial<Classroom>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Classroom object from an API response.
   */
  static fromAPI(json: Record<string, any>): Classroom {
    if (!json) return new Classroom({});
    return new Classroom({
      id: String(json.id || ''),
      name: json.name || '',
      password: json.password || '',
      schoolId: String(json.schoolId || ''),
      members: Array.isArray(json.members) ? json.members.map(User.fromAPI) : [],
      teacher: json.teacher ? User.fromAPI(json.teacher) : null,
      memberCount: Number(json.memberCount || 0)
    });
  }
}
