import { AppDataSource } from "../data-source";
import { CartEntity } from "../entities/CartEntity";
import { ProductEntity } from "../entities/ProductEntity";
import { UserEntity } from "../entities/UserEntity";
import { Cart } from "../models/Cart";
import { User } from "../models/User";

export class CartService {
  private cartRepo = AppDataSource.getRepository(CartEntity);
  private userRepo = AppDataSource.getRepository(UserEntity);
  private prodRepo = AppDataSource.getRepository(ProductEntity);

  constructor() {}

  async getCartsByUserId(user_id: number): Promise<Array<CartEntity>> {
    // const user = await this.userRepo.findOneBy({ user_id: user_id });
    // console.log("FETCHING FROM USER...");
    // console.log(user);
    return await this.cartRepo.find({
      where: {
        soft_delete: false,
        user_id: user_id,
      },
    });
  }

  async getCartById(id: number): Promise<CartEntity | null> {
    const cart = await this.cartRepo.findOne({
      where: {
        cart_id: id,
        soft_delete: false,
      },
      relations: {
        user: false,
        product: true,
      },
    });
    console.log("FROM SERVICE: ", cart);
    return cart;
  }

  async saveCart(cart: Cart): Promise<CartEntity | null> {
    const prod = await this.prodRepo.findOneBy({
      product_id: cart.product.product_id,
    });
    if (prod) {
      cart.total = prod.price * cart.cantidad;
      cart.user_id = cart.user.user_id;
      console.log("PRE: ");
      console.log(cart);
      const newCart = await this.cartRepo.save(cart);
      console.log("POST");
      console.log(newCart);
      return newCart;
    }
    return null;
  }

  //NOW IS A HARD DELETE
  async softDeleteCartById(id: number): Promise<Object> {
    const cartToRemove: CartEntity | null = await this.getCartById(id);
    if (cartToRemove) {
      cartToRemove.soft_delete = true;
      await this.cartRepo.delete({ cart_id: id });
      return { status: "OK" };
    } else return { error: "Cart not found!" };
  }

  async updateCart(cart: Cart): Promise<CartEntity | null> {
    const oldCart = (await this.getCartById(cart.cart_id)) as Cart;
    cart.createdAt = oldCart.createdAt;
    cart.soft_delete = oldCart.soft_delete;
    return await this.saveCart(cart);
  }
}
