import { ShopOrder } from "./../models/ShopOrder";
import { AppDataSource } from "../data-source";
import { CartEntity } from "../entities/CartEntity";
import { ShopOrderEntity } from "../entities/ShopOrderEntity";
import { UserEntity } from "../entities/UserEntity";
import { User } from "../models/User";
import { CartService } from "./CartService";
import { CartRequest } from "../dto/requests/cart.request";

export class ShopOrderService {
  private orderRepo = AppDataSource.getRepository(ShopOrderEntity);
  private userRepo = AppDataSource.getRepository(UserEntity);
  private cartRepo = AppDataSource.getRepository(CartEntity);
  private cartService = new CartService();

  async getAllOrders(): Promise<Array<ShopOrderEntity>> {
    // return await this.orderRepo
    //   .createQueryBuilder("order")
    //   .where({ soft_delete: false })
    //   .orderBy("order.shop_order_id", "ASC")
    //   .getMany();
    return await this.orderRepo.find({
      where: { soft_delete: false },
      relations: { product: true },
      order: { shop_order_id: "ASC" },
    });
  }

  async getOrdersWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<ShopOrderEntity>> {
    const skip = (page - 1) * pageSize;
    // return await this.orderRepo
    //   .createQueryBuilder("order")
    //   .where({ soft_delete: false })
    //   .orderBy("order.shop_order_id", "ASC")
    //   .skip(skip)
    //   .take(pageSize)
    //   .getMany();
    return await this.orderRepo.find({
      where: { soft_delete: false },
      order: { shop_order_id: "ASC" },
      skip: skip,
      take: pageSize,
    });
  }

  async getOrderById(id: number): Promise<ShopOrderEntity | null> {
    return await this.orderRepo.findOneBy({
      shop_order_id: id,
      soft_delete: false,
    });
  }

  async getOrdersByUserId(user_id: number): Promise<Array<ShopOrderEntity>> {
    const user: UserEntity | null = await this.userRepo.findOneBy({
      user_id: user_id,
      soft_delete: false,
    });

    return await this.orderRepo.findBy({ user: user as User });
  }

  async saveOrder(cartReq: CartRequest): Promise<ShopOrderEntity | null> {
    const cart: CartEntity = (await this.cartRepo.findOneBy({
      cart_id: cartReq.cart_id,
      soft_delete: false,
    })) as CartEntity;
    console.log("FROM SERVICE");
    console.log(cart);
    if (cart) {
      const order: ShopOrderEntity = new ShopOrderEntity();
      order.product = cart.product;
      order.cantidad = cart.cantidad;
      order.total = cart.cantidad * cart.product.price;
      order.user = (await this.userRepo.findOneBy({
        user_id: cart.user_id,
      })) as User;
      order.user_id = cart.user_id;
      order.order_state = "PENDING";
      await this.cartService.softDeleteCartById(cart.cart_id);
      return await this.orderRepo.save(order);
    } else throw new Error("SOMETHING WENT VERY WWWWRRRONGGG");
  }

  async softDeleteOrderById(id: number): Promise<Object> {
    const orderToRemove: ShopOrderEntity = (await this.getOrderById(
      id
    )) as ShopOrderEntity;
    orderToRemove.soft_delete = true;
    const removedOrder = await this.orderRepo.save(orderToRemove);
    if (removedOrder) return { status: "OK" };
    else return { error: "Shop order not found!" };
  }

  async updateOrder(order: ShopOrder): Promise<ShopOrderEntity | null> {
    const oldOrder = (await this.getOrderById(
      order.shop_order_id
    )) as ShopOrder;
    order.createdAt = oldOrder.createdAt;
    order.soft_delete = oldOrder.soft_delete;
    return await this.orderRepo.save(order);
  }
}
