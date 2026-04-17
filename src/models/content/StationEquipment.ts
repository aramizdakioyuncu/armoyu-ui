import { BaseModel } from '../BaseModel';

/**
 * Represents equipment available at a station in the UI.
 */
export class StationEquipment extends BaseModel {
  id: number = 0;
  name: string = '';
  type: string = '';
  image: string = '';
  price: number = 0;

  constructor(data: Partial<StationEquipment>) {
    super();
    Object.assign(this, data);
  }

  /**
   * Instantiates a StationEquipment object from an API response.
   */
  static fromAPI(json: Record<string, any>): StationEquipment {
    if (!json) return new StationEquipment({});
    return new StationEquipment({
      id: Number(json.equipment_ID || 0),
      name: json.equipment_name || '',
      type: json.equipment_type || '',
      image: json.equipment_image || '',
      price: parseFloat(json.equipment_price || '0')
    });
  }
}
