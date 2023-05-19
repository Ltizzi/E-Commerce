import { Product } from './product';

export interface Order {
  shop_order_id?: number;
  total: number;
  product: Product;
  cantidad: number;
  user_id: number;
  order_state: string;
}
