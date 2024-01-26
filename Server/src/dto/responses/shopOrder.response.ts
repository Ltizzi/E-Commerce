import { ProductResponse } from "./product.response";

export interface ShopOrderResponse {
  shop_order_id: number;
  total: number;
  cantidad: number;
  product: ProductResponse;
  user_id: number;
  order_state: string;
}
