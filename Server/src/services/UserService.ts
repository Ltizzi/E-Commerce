import { AppDataSource } from "../data-source";
import { UserEntity } from "../entities/UserEntity";
import { RoleEnum } from "../models/RoleEnum";
import { User } from "../models/User";

export class UserService {
  private userRepo = AppDataSource.getRepository(UserEntity);

  async getUsers(): Promise<Array<UserEntity>> {
    return await this.userRepo
      .createQueryBuilder("user")
      .where({ soft_delete: false })
      .orderBy("user.user_id", "ASC")
      .getMany();
  }

  async getUsersWithPagination(
    page: number,
    pageSize: number
  ): Promise<Array<UserEntity>> {
    const skip = (page - 1) * pageSize;
    return await this.userRepo
      .createQueryBuilder("user")
      //.select(["user.user_id", "user.username", "user.email"])
      .where({ soft_delete: false })
      .orderBy("user.user_id", "ASC")
      .skip(skip)
      .take(pageSize)
      .getMany();
  }

  async countUsers(): Promise<number> {
    return await this.userRepo.count();
  }

  async getUserById(id: number): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ user_id: id, soft_delete: false });
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({ email: email, soft_delete: false });
  }

  async getUserByUsername(username: string): Promise<UserEntity | null> {
    return await this.userRepo.findOneBy({
      username: username,
      soft_delete: false,
    });
  }

  async saveUser(user: User): Promise<UserEntity | Error> {
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
