import { ShopOrder } from "./ShopOrder";
import { User } from "./User";

export interface Purchase {
  purchase_id: number;
  orders: Array<ShopOrder>;
  total_income: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
