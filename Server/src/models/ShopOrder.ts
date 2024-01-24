import { Product } from "./Product";
import { User } from "./User";

export interface ShopOrder {
  shop_order_id: number;
  total: number;
  product: Product;
  cantidad: number;
  user: User;
  order_state: string;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
