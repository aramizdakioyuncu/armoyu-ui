import { BaseModel } from '../BaseModel';
import { Product } from './Product';

/**
 * Represents a Cart Item in the UI.
 */
export class CartItem extends BaseModel {
  id: string; // Internal unique ID for the cart item
  product: Product;
  quantity: number;
  addedAt: number;

  constructor(data: Partial<CartItem>) {
    super();
    this.product = data.product || new Product({});
    this.id = data.id || `cart_${this.product.id || 'new'}_${Date.now()}`;
    this.quantity = data.quantity || 1;
    this.addedAt = data.addedAt || Date.now();
  }

  /**
   * Calculate total price for this item based on quantity and display price.
   */
  getTotalPrice(): number {
    return this.product.getDisplayPrice() * this.quantity;
  }

  /**
   * Instantiates a CartItem object from an API response.
   */
  static fromAPI(json: Record<string, any>): CartItem {
    if (!json) return new CartItem({});
    
    return new CartItem({
      id: String(json.id || ''),
      product: json.product ? Product.fromAPI(json.product) : undefined,
      quantity: Number(json.quantity || 1),
      addedAt: json.addedAt || Date.now()
    });
  }
}
