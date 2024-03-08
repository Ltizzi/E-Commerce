import { ProductRequest } from "./product.request";

export interface DealRequest {
  deal_id: number;
  product_id: number;
  product: ProductRequest;
  units: number;
  discount: number;
  discountedPrice: number;
  fullPrice: number;
  duration: number;
  startAt: Date;
  endAt: Date;
  soft_delete: boolean;
}
