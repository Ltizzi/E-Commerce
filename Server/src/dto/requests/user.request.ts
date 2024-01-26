import { RoleEnum } from "../../models/RoleEnum";
import { CartRequest } from "./cart.request";
import { PurchaseRequest } from "./purchase.request";

export interface UserRequest {
  user_id?: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  birthday: Date;
  carts?: Array<CartRequest>;
  purchases?: Array<PurchaseRequest>;
  roles: Array<RoleEnum>;
}
