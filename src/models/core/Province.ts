/**
 * Represents a province or city within a country in the UI.
 */
export class Province {
  id: number = 0;
  name: string = '';
  plateCode: number = 0;
  phoneCode: number = 0;

  constructor(data: Partial<Province>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a Province object from an API response.
   */
  static fromAPI(json: Record<string, any>): Province {
    if (!json) return new Province({});
    return new Province({
      id: Number(json.province_ID || 0),
      name: json.province_name || '',
      plateCode: Number(json.province_plateCode || 0),
      phoneCode: Number(json.province_phoneCode || 0)
    });
  }
}
