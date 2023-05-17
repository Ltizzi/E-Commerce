import { Order } from './order';

export interface Purchase {
  purchase_id?: number;
  orders: Array<Order>;
  user_id: number;
}
