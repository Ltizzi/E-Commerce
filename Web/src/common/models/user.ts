import { Cart } from './cart';
import { Product } from './product';
import { Purchase } from './purchase';

export interface User {
  user_id?: number;
  username: string;
  name: string;
  lastname: string;
  email: string;
  avatar: string;
  birthday: Date;
  carts: Array<Cart>;
  purchases: Array<Purchase>;
  roles: Array<String>;
  state?: string;
  favourites: Array<Product>;
  reviews: Array<Object>;
}
