import { BaseModel } from '../BaseModel';

/**
 * Represents a sports team or community team in the platform (Legacy Structure) in the UI.
 */
export class PlatformTeam extends BaseModel {
  id: number = 0;
  name: string = '';
  logo: string = '';

  constructor(data: Partial<PlatformTeam>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a PlatformTeam object from an API response.
   */
  static fromAPI(json: Record<string, any>): PlatformTeam {
    if (!json) return new PlatformTeam({});
    return new PlatformTeam({
      id: Number(json.takim_ID || 0),
      name: json.takim_adi || '',
      logo: json.takim_logo || ''
    });
  }
}
