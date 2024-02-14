import { Cart } from './cart';
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
}
