import { Cart } from "../../models/Cart";
import { User } from "../../models/User";
import { CartService } from "../../services/CartService";
import { UserService } from "../../services/UserService";
import { CartRequest } from "../requests/cart.request";
import { CartResponse } from "../responses/cart.response";
import { ProductMapper } from "./product.mapper";

const prodMapper = new ProductMapper();
const userServ = new UserService();
const cartServ = new CartService();

export class CartMapper {
  toCartResponse(cart: Cart): CartResponse {
    const cartRes = {} as CartResponse;
    // console.log("FROM MAPPER: ");
    // console.log(cart);
    cartRes.cart_id = cart.cart_id;
    cartRes.product = prodMapper.toProductResponse(cart.product);
    cartRes.cantidad = cart.cantidad;
    cartRes.total = cart.total;
    cartRes.user_id = cart.user_id;
    return cartRes;
  }

  async toCartEntity(fromCart: CartResponse | CartRequest): Promise<Cart> {
    let cart = {} as Cart;
    console.log("FROM MAPPER: ");
    console.log(fromCart);
    if (fromCart.cart_id) {
      cart = (await cartServ.getCartById(fromCart.cart_id)) as Cart;
    }
    cart.user = (await userServ.getUserById(fromCart.user_id)) as User;
    cart.user_id = fromCart.user_id;
    cart.cantidad = fromCart.cantidad;
    cart.total = fromCart.total;
    cart.product = await prodMapper.toProductEntity(fromCart.product);
    return cart;
  }

  toArrayCartResponse(carts: Array<Cart>): Array<CartResponse> {
    let cartsRes = [] as Array<CartResponse>;
    carts.forEach((cart) => cartsRes.push(this.toCartResponse(cart)));
    return cartsRes;
  }

  async toArrayCartEntity(
    fromCarts: Array<CartResponse | CartRequest>
  ): Promise<Array<Cart>> {
    let carts = [] as Array<Cart>;
    fromCarts.forEach(async (cart) =>
      carts.push(await this.toCartEntity(cart))
    );
    return carts;
  }
}
