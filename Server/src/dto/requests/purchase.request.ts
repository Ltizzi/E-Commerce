import { ShopOrderRequest } from "./shopOrder.request";

export interface PurchaseRequest {
  purchase_id?: number;
  orders: Array<ShopOrderRequest>;
  user_id: number;
}
