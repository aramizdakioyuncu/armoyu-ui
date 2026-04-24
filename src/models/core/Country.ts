/**
 * Represents a country in the platform in the UI.
 */
export class Country {
  id: number = 0;
  name: string = '';
  code: string = '';
  phoneCode: number = 0;

  constructor(data: Partial<Country>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Country object from an API response.
   */
  static fromAPI(json: Record<string, any>): Country {
    if (!json) return new Country({});
    return new Country({
      id: Number(json.country_ID || 0),
      name: json.country_name || '',
      code: json.country_code || '',
      phoneCode: Number(json.country_phoneCode || 0)
    });
  }
}
