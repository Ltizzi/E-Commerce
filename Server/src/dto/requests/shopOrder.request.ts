import { ProductRequest } from "./product.request";

export interface ShopOrderRequest {
  shop_order_id?: number;
  total: number;
  cantidad: number;
  product: ProductRequest;
  user_id: number;
  order_state: string;
}
