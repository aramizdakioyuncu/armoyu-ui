/**
 * Represents a Workplace (İşyeri/Ofis) in the aramizdakioyuncu.com platform in the UI.
 */
export class Workplace {
  id: string = '';
  name: string = '';
  description: string = '';
  location: string = '';
  logo: string = '';
  website: string = '';
  establishedDate: string = '';

  constructor(data: Partial<Workplace>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Workplace object from an API response.
   */
  static fromAPI(json: Record<string, any>): Workplace {
    if (!json) return new Workplace({});
    return new Workplace({
      id: String(json.id || ''),
      name: json.name || json.title || '',
      description: json.description || '',
      location: json.location || json.address || '',
      logo: json.logo || json.logo_url || '',
      website: json.website || '',
      establishedDate: json.establishedDate || json.created_at || '',
    });
  }
}
