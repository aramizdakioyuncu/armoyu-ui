import { BaseModel } from '../BaseModel';
import { User } from '../auth/User';

/**
 * Type of School Team (Traditional Sports or E-sports).
 */
export type TeamType = 'ESPORTS' | 'TRADITIONAL_SPORTS';

/**
 * Represents a School Team (Okul Takımı) for specific games or sports in the UI.
 */
export class SchoolTeam extends BaseModel {
  id: string = '';
  name: string = ''; // e.g., "UAV FB", "ARMOYU CS2"
  gameOrSport: string = ''; // e.g., "Football", "Volleyball", "Counter-Strike 2"
  type: TeamType = 'ESPORTS';
  logo?: string = '';
  
  schoolId: string = '';
  captain: User | null = null;
  coach: User | null = null;
  members: User[] = [];
  memberCount: number = 0;
  
  achievements: string[] = [];

  constructor(data: Partial<SchoolTeam>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a SchoolTeam object from an API response.
   */
  static fromAPI(json: Record<string, any>): SchoolTeam {
    if (!json) return new SchoolTeam({});
    return new SchoolTeam({
      id: String(json.id || ''),
      name: json.name || '',
      gameOrSport: json.gameOrSport || json.game_or_sport || '',
      type: (json.type as TeamType) || 'ESPORTS',
      logo: json.logo || '',
      schoolId: String(json.schoolId || ''),
      captain: json.captain ? User.fromAPI(json.captain) : null,
      coach: json.coach ? User.fromAPI(json.coach) : null,
      members: Array.isArray(json.members) ? json.members.map(User.fromAPI) : [],
      memberCount: Number(json.memberCount || 0),
      achievements: json.achievements || []
    });
  }
}
