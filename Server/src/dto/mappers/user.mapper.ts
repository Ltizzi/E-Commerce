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
    const userRes: UserResponse = {
      user_id: user.user_id,
      username: user.username,
      name: user.name,
      lastname: user.lastname,
      email: user.email,
      avatar: user.avatar,
      birthday: user.birthday,
      carts: cartMapper.toArrayCartResponse(user.carts),
      purchases: purchMapper.toArrayPurchaseResponse(user.purchases),
      roles: user.roles,
    };
    return userRes;
  }

  async toUserEntity(userReq: UserRequest | UserResponse): Promise<User> {
    let user: User = {} as User;
    if (userReq.user_id) {
      user = (await userServ.getUserById(userReq.user_id)) as User;
    }
    user.avatar = userReq.avatar;
    user.birthday = userReq.birthday;
    user.carts = await cartMapper.toArrayCartEntity(
      userReq.carts as Array<CartResponse | CartRequest>
    );
    user.email = userReq.email;
    user.name = userReq.name;
    user.lastname = userReq.lastname;
    user.username = userReq.username;
    user.purchases = await purchMapper.toArrayPurchaseEntity(
      userReq.purchases as Array<PurchaseRequest | PurchaseResponse>
    );
    user.roles = userReq.roles;
    return user;
  }

  toArrayUserResponse(users: Array<User>): Array<UserResponse> {
    let usersRes: Array<UserResponse> = [];
    users.forEach((user) => usersRes.push(this.toUserResponse(user)));
    return usersRes;
  }
}
