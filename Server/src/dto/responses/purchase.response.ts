import { ShopOrderResponse } from "./shopOrder.response";

export interface PurchaseResponse {
  purchase_id: number;
  orders: Array<ShopOrderResponse>;
  user_id: number;
  total_income: number;
  createdAt: Date;
}
