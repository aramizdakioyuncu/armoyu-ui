/**
 * Represents a member of the platform's official team (staff) in the UI.
 */
export class TeamMember {
  id: number = 0;
  displayName: string = '';
  avatar: string = '';
  social: Record<string, string> = {};
  roleId: number = 0;
  roleName: string = '';
  roleCategory: string = '';
  roleColor: string = '';

  constructor(data: Partial<TeamMember>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a TeamMember object from an API response.
   */
  static fromAPI(json: Record<string, any>): TeamMember {
    if (!json) return new TeamMember({});
    return new TeamMember({
      id: Number(json.player_ID || 0),
      displayName: json.player_name || '',
      avatar: json.player_avatar?.media_URL || '',
      social: json.player_social || {},
      roleId: Number(json.player_role?.roleID || 0),
      roleName: json.player_role?.roleName || '',
      roleCategory: json.player_role?.rolecategory || '',
      roleColor: json.player_role?.roleColor || ''
    });
  }
}
