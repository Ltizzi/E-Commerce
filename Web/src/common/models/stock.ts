import { Entry } from './entry';
import { Product } from './product';

export interface Stock {
  stock_id?: number;
  product: Product;
  cantidad: number;
  // entries: Array<Entry>;
}
