import { Product } from './product';

export interface Discount {
  name: string;
  product?: Product;
  discount: number;
}
