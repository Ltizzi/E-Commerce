import { AppDataSource } from "../data-source";
import { ProductMapper } from "../dto/mappers/product.mapper";
import { ProductResponse } from "../dto/responses/product.response";
import { UserEntity } from "../entities/UserEntity";
import { Product } from "../models/Product";
import { RoleEnum } from "../models/RoleEnum";
import { User } from "../models/User";
import { FavResponse } from "../models/utils/FavResponse";
import { ProductService } from "./ProductService";

const prodServ = new ProductService();
const prodMapper = new ProductMapper();

export class UserService {
  private userRepo = AppDataSource.getRepository(UserEntity);

  async getUsers(): Promise<Array<UserEntity>> {
    return await this.userRepo.find({
      where: { soft_delete: false },
      order: { user_id: "ASC" },
      relations: { carts: false, purchases: false },
    });
  }

  async getUsersWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<UserEntity>> {
    const skip = (page - 1) * pageSize;
    return await this.userRepo.find({
      where: { soft_delete: false },
      order: { user_id: "ASC" },
      relations: { carts: false, purchases: false },
      skip: skip,
      take: pageSize,
    });
  }

  async countUsers(): Promise<number> {
    return await this.userRepo.countBy({ soft_delete: false });
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ user_id: id, soft_delete: false });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({
      email: email,
      soft_delete: false,
    });
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({
      username: username,
      soft_delete: false,
    });
  }

  async saveUser(user: User): Promise<UserEntity | Error> {
    // user.carts = [];
    // user.purchases = [];
    return await this.userRepo.save(user);
  }

  async softDeleteUserById(id: number): Promise<Object> {
    const userToRemove: UserEntity | null = await this.userRepo.findOneBy({
      user_id: id,
      soft_delete: false,
    });
    if (userToRemove) {
      userToRemove.soft_delete = true;
      await this.userRepo.save(userToRemove);
      return { status: "OK" };
    } else return { error: "User not found!" };
  }

  async updateUser(user: User): Promise<UserEntity | null> {
    const oldUser = (await this.getUserById(user.user_id)) as User;
    user.createdAt = oldUser.createdAt;
    user.soft_delete = oldUser.soft_delete;
    return await this.userRepo.save(user);
  }

  async addRoleToUser(id: number, role: RoleEnum): Promise<UserEntity | null> {
    const userToUpdate: UserEntity | null = await this.userRepo.findOneBy({
      user_id: id,
      soft_delete: false,
    });
    if (!userToUpdate?.roles.includes(role) && userToUpdate) {
      userToUpdate?.roles.push(role);
      return await this.userRepo.save(userToUpdate);
    } else return null;
  }

  async addOrRemoveFavourite(prod_id: number, email: string): Promise<Object> {
    try {
      const product = (await prodServ.getProductById(prod_id)) as Product;
      const user = (await this.getUserByEmail(email)) as User;
      const response: FavResponse = {
        userFavs: [] as Array<ProductResponse>,
        action: "",
      };
      let updatedUser = {} as User;
      console.log("user favs?");
      console.log(user.favourites);
      if (user.favourites) {
        const preIsFav = user.favourites.filter(
          (fav: Product) => fav.product_id == prod_id
        );
        const isFav = preIsFav.length > 0;
        console.log("is fav? ", isFav);
        if (!isFav) {
          user.favourites.push(product);
          updatedUser = (await this.updateUser(user)) as User;
          response.action = "added";
        } else {
          console.log("PRE");
          console.log(user.favourites);
          user.favourites = user.favourites.filter(
            (favProd: Product) => favProd.product_id != prod_id
          );
          console.log("POST");
          console.log(user.favourites);
          updatedUser = (await this.updateUser(user)) as User;
          response.action = "removed";
        }
      } else {
        let favs = [] as Array<Product>;
        favs.push(product);
        user.favourites = favs;
        updatedUser = (await this.updateUser(user)) as User;
        response.action = "added";
      }
      response.userFavs = prodMapper.toArrayProductResponse(
        updatedUser.favourites
      );

      return response;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }

  async checkIsFav(product_id: number, email: string): Promise<boolean> {
    try {
      const product = (await prodServ.getProductById(product_id)) as Product;
      const user = (await this.getUserByEmail(email)) as User;
      const isFav = user.favourites.filter(
        (fav: Product) => fav.product_id == product_id
      );
      if (isFav.length > 0) return true;
      else return false;
    } catch (err: any) {
      throw new Error(err.message);
    }
  }
}
