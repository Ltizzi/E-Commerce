import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";
import { RoleEnum } from "../models/RoleEnum";
import { User } from "../models/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(UserEntity);

  async getUsers(): Promise<Array<UserEntity>> {
    // return await this.userRepo
    //   .createQueryBuilder("user")
    //   .where({ soft_delete: false })
    //   .orderBy("user.user_id", "ASC")
    //   .getMany();
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
    // return await this.userRepo
    //   .createQueryBuilder("user")
    //   //.select(["user.user_id", "user.username", "user.email"])
    //   .where({ soft_delete: false })
    //   .orderBy("user.user_id", "ASC")
    //   .skip(skip)
    //   .take(pageSize)
    //   .getMany();
    return await this.userRepo.find({
      where: { soft_delete: false },
      order: { user_id: "ASC" },
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
    user.carts = [];
    user.purchases = [];
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
}
