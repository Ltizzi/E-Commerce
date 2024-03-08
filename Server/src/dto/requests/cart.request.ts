import { ProductRequest } from "./product.request";

export interface CartRequest {
  cart_id?: number;
  total: number;
  product: ProductRequest;
  cantidad: number;
  user_id: number;
}
