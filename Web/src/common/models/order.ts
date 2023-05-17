import { Cart } from './cart';

export interface Order {
  shop_order_id?: number;
  total: number;
  cart: Cart;
  user_id: number;
  order_state: string;
}
