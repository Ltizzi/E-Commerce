import { ProductResponse } from "./product.response";

export interface CartResponse {
  cart_id: number;
  total: number;
  product: ProductResponse;
  cantidad: number;
  user_id: number;
}
