/**
 * Represents a User Role in the aramizdakioyuncu.com platform.
 */
export class Role {
  id: string = '';
  name: string = '';
  category: string = '';
  color: string = '';
  permissions: string[] = [];

  constructor(data: Partial<Role>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Role object from an API response.
   */
  static fromAPI(json: any): Role {
    if (!json) return new Role({});
    
    // API'den gelen renk kodu başında # olmadan gelebilir (örn: ff0000)
    let color = json.color || json.roleColor || json.rutbe_renk || '#808080';
    if (color && !color.startsWith('#')) {
      color = `#${color}`;
    }

    return new Role({
      id: String(json.id || json.roleID || json.rutbe_id || ''),
      name: json.name || json.title || json.roleName || json.rutbe_ad || '',
      category: json.category || json.rolecategory || json.roleCategory || json.rutbe_kategori || '',
      color: color,
      permissions: json.permissions || [],
    });
  }
}
