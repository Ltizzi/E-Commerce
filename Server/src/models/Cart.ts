import { Product } from "./Product";
import { User } from "./User";

export interface Cart {
  cart_id: number;
  total: number;
  product: Product;
  cantidad: number;
  user_id: number;
  user: User;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
}
