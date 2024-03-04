import { Product } from './product';

export interface Deal {
  deal_id?: number;
  product_id?: number;
  product: Product;
  units?: number;
  discount?: number;
  fullPrice?: number;
  duration?: number;
  startAt?: Date;
  endAt?: Date;
  soft_delete?: boolean;
}
