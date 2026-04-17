import { BaseModel } from '../BaseModel';

/**
 * Represents a User Role in the aramizdakioyuncu.com platform.
 */
export class Role extends BaseModel {
  id: string = '';
  name: string = '';
  color: string = '';
  permissions: string[] = [];

  constructor(data: Partial<Role>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a Role object from an API response.
   */
  static fromAPI(json: any): Role {
    if (!json) return new Role({});
    
    return new Role({
      id: String(json.id || json.roleID || json.rutbe_id || ''),
      name: json.name || json.title || json.roleName || json.rutbe_ad || '',
      color: json.color || json.roleColor || json.rutbe_renk || '#808080',
      permissions: json.permissions || [],
    });
  }
}
