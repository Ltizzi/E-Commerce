import { Cart } from "./Cart";
import { Product } from "./Product";
import { Purchase } from "./Purchase";
import { Review } from "./Review";
import { RoleEnum } from "./RoleEnum";

export interface User {
  user_id: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  googleId: number;
  roles: Array<RoleEnum>;
  avatar: string;
  birthday: Date;
  createdAt: Date;
  updatedAt: Date;
  soft_delete: boolean;
  carts: Array<Cart>;
  purchases: Array<Purchase>;
  favourites: Array<Product>;
  reviews: Array<Review>;
}
