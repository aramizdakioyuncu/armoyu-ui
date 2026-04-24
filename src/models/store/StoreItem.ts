/**
 * Represents a Store Item (Mağaza Eşyası/Ürün) in the aramizdakioyuncu.com platform in the UI.
 */
export class StoreItem {
  id: string = '';
  name: string = '';
  category: string = '';
  price: string = '';
  image: string = '';
  isFeatured: boolean = false;
  badge: string = '';

  constructor(data: Partial<StoreItem>) {
    Object.assign(this, data);
  }

  /**
   * Instantiates a StoreItem object from an API response.
   */
  static fromAPI(json: Record<string, any>): StoreItem {
    if (!json) return new StoreItem({});
    return new StoreItem({
      id: String(json.id || ''),
      name: json.name || json.title || '',
      category: json.category || '',
      price: String(json.price || ''),
      image: json.image || '',
      isFeatured: !!json.isFeatured,
      badge: json.badge || '',
    });
  }
}
