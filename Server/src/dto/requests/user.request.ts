import { Product } from "../../models/Product";
import { RoleEnum } from "../../models/RoleEnum";
import { CartRequest } from "./cart.request";
import { PurchaseRequest } from "./purchase.request";
import { Review } from "../../models/Review";

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
  favourites: Array<Product>;
  reviews: Array<Review>;
}
