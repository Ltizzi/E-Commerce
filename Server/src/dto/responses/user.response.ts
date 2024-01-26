import { RoleEnum } from "../../models/RoleEnum";
import { CartResponse } from "./cart.response";
import { PurchaseResponse } from "./purchase.response";

export interface UserResponse {
  user_id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  birthday: Date;
  carts: Array<CartResponse>;
  purchases: Array<PurchaseResponse>;
  roles: Array<RoleEnum>;
}
