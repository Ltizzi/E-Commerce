import { User } from "../../models/User";
import { UserService } from "../../services/UserService";
import { CartRequest } from "../requests/cart.request";
import { PurchaseRequest } from "../requests/purchase.request";
import { UserRequest } from "../requests/user.request";
import { CartResponse } from "../responses/cart.response";
import { PurchaseResponse } from "../responses/purchase.response";
import { UserResponse } from "../responses/user.response";
import { CartMapper } from "./cart.mapper";
import { PurchaseMapper } from "./purchase.mapper";

const userServ = new UserService();
const cartMapper = new CartMapper();
const purchMapper = new PurchaseMapper();

export class UserMapper {
  toUserResponse(user: User): UserResponse {
    const res = {} as UserResponse;
    res.user_id = user.user_id;
    res.username = user.username;
    res.name = user.name;
    res.lastname = user.lastname;
    res.email = user.email;
    res.avatar = user.avatar;
    res.birthday = user.birthday;
    if (user.carts) res.carts = cartMapper.toArrayCartResponse(user.carts);
    if (user.purchases)
      res.purchases = purchMapper.toArrayPurchaseResponse(user.purchases);
    res.roles = user.roles;
    return res;
  }

  async toUserEntity(userReq: UserRequest | UserResponse): Promise<User> {
    let user: User = {} as User;
    if (userReq.user_id) {
      user = (await userServ.getUserById(userReq.user_id)) as User;
    }
    user.avatar = userReq.avatar;
    user.birthday = userReq.birthday;
    if (userReq.carts) {
      user.carts = await cartMapper.toArrayCartEntity(userReq.carts);
    }
    user.email = userReq.email;
    user.name = userReq.name;
    user.lastname = userReq.lastname;
    user.username = userReq.username;
    if (userReq.purchases) {
      user.purchases = await purchMapper.toArrayPurchaseEntity(
        userReq.purchases
      );
    }
    if (userReq.roles) user.roles = userReq.roles;
    return user;
  }

  toArrayUserResponse(users: Array<User>): Array<UserResponse> {
    let usersRes: Array<UserResponse> = [];
    users.forEach(async (user) => usersRes.push(this.toUserResponse(user)));
    return usersRes;
  }
}
