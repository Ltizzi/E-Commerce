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

  async getCartsByUserId(user_id: number): Promise<Array<CartEntity>> {
    const user = await this.userRepo.findOneBy({ user_id: user_id });
    return await this.cartRepo.findBy({
      soft_delete: false,
      user: user as User,
    });
  }

  async getCartById(id: number): Promise<CartEntity | null> {
    return await this.cartRepo.findOneBy({ cart_id: id, soft_delete: false });
  }

  async saveCart(cart: Cart): Promise<CartEntity | null> {
    const prod = await this.prodRepo.findOneBy({
      product_id: cart.product.product_id,
    });
    if (prod) {
      cart.total = prod.price * cart.cantidad;
      return await this.cartRepo.save(cart);
    }
    return null;
  }

  async softDeleteCartById(id: number): Promise<Object> {
    const cartToRemove: CartEntity | null = await this.getCartById(id);
    if (cartToRemove) {
      cartToRemove.soft_delete = true;
      await this.cartRepo.save(cartToRemove);
      return { status: "OK" };
    } else return { error: "Cart not found!" };
  }

  async updateCart(cart: Cart): Promise<CartEntity | null> {
    return await this.saveCart(cart);
  }
}
