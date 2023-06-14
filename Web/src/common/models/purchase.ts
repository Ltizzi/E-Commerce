import { Order } from './order';

export interface Purchase {
  purchase_id?: number;
  orders: Array<Order>;
  total_income?: number;
  user_id: number;
}
