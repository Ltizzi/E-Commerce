import { Product } from "./Product";

export interface Deal {
  deal_id: number;
  product_id: number;
  product: Product;
  units: number;

  discount: number;
  discountedPrice: number;
  fullPrice: number;
  duration: number;
  startAt: Date;
  endAt: Date;

  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
