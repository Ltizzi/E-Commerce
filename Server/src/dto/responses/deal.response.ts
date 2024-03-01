import { ProductResponse } from "./product.response";

export interface DealResponse {
  deal_id: number;
  product_id: number;
  product: ProductResponse;
  units: number;
  discount: number;
  discountedPrice: number;
  fullPrice: number;
  duration: number;
  startAt: Date;
  endAt: Date;
  soft_delete: boolean;
}
