import { CartItem } from './CartItem';

export type OrderStatus = 'pending' | 'completed' | 'canceled' | 'shipped';

/**
 * Represents a Shop Order in the UI.
 */
export class Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: number;
  paymentMethod: 'credit_card' | 'armoyu_coin' | 'paypal';

  constructor(data: Partial<Order>) {
    this.id = data.id || '';
    this.items = data.items || [];
    this.total = data.total || 0;
    this.status = data.status || 'pending';
    this.createdAt = data.createdAt || Date.now();
    this.paymentMethod = data.paymentMethod || 'credit_card';
  }

  /**
   * Instantiates an Order object from an API response.
   */
  static fromAPI(json: Record<string, any>): Order {
    if (!json) return new Order({});
    return new Order({
      id: String(json.id || ''),
      items: Array.isArray(json.items) ? json.items.map((i: any) => CartItem.fromAPI(i)) : [],
      total: Number(json.total || json.total_amount || 0),
      status: (json.status || 'pending') as OrderStatus,
      createdAt: Number(json.createdAt || json.created_at || Date.now()),
      paymentMethod: (json.paymentMethod || json.payment_method || 'credit_card') as 'credit_card' | 'armoyu_coin' | 'paypal'
    });
  }

  /**
   * Returns a user-friendly status name in Turkish.
   */
  getStatusLabel(): string {
    switch (this.status) {
      case 'pending': return 'Hazırlanıyor';
      case 'completed': return 'Tamamlandı';
      case 'shipped': return 'Kargoya Verildi';
      case 'canceled': return 'İptal Edildi';
      default: return this.status;
    }
  }
}
