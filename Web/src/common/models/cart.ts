import { Product } from './product';

export interface Cart {
  id?: number;
  total: number;
  product: Product;
  cantidad: number;
  user_id: number;
}
