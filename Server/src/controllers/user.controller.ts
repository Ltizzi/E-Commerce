import { RoleEnum } from "../models/RoleEnum";
import { User } from "../models/User";
import { DeleteObjectResponse } from "../models/utils/DeleteObjectResponse";
import { PaginationParams } from "../models/utils/PaginationParams";
import { UserService } from "../services/UserService";
import { Request, Response } from "express";

const userServ = new UserService();

export class UserController {
  // private userServ: UserService = new UserService();

  async httpGetAllUsers(req: Request, res: Response): Promise<Response> {
    try {
      const users = await userServ.getUsers();
      return res.status(200).json(users);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetUserWithPagination(
    req: Request,
    res: Response
  ): Promise<Response> {
    try {
      const { page, pageSize } = req.query as unknown as PaginationParams;
      const users: Array<User> = await userServ.getUsersWithPagination(
        page,
        pageSize
      );
      return res.status(200).json(users);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCountUsers(req: Request, res: Response): Promise<Response> {
    try {
      const totalUsers: number = await userServ.countUsers();
      return res.status(200).json({ totalUsers: totalUsers });
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetUserById(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.user_id as unknown as number;
      const user = (await userServ.getUserById(id)) as User;
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetUserByEmail(req: Request, res: Response): Promise<Response> {
    try {
      const email = req.query.email as unknown as string;
      const user = (await userServ.getUserByEmail(email)) as User;
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpGetUserByUsername(req: Request, res: Response): Promise<Response> {
    try {
      const username = req.query.username as unknown as string;
      const user = (await userServ.getUserByUsername(username)) as User;
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpCreateNewUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.body as unknown as User;
      const createdUser = await userServ.saveUser(user);
      return res.status(200).json(createdUser);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpSoftDeleteUser(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.user_id as unknown as number;
      const response = (await userServ.softDeleteUserById(
        id
      )) as DeleteObjectResponse;
      if (response.status == "OK") return res.status(200).json(response);
      else throw new Error("something went wrong");
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpUpdateUser(req: Request, res: Response): Promise<Response> {
    try {
      const user = req.body as unknown as User;
      const updateUser = await userServ.updateUser(user);
      return res.status(200).json(updateUser);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }

  async httpMakeUserAdmin(req: Request, res: Response): Promise<Response> {
    try {
      const id = req.query.use_id as unknown as number;
      const user = await userServ.addRoleToUser(id, RoleEnum.ADMIN);
      return res.status(200).json(user);
    } catch (err: any) {
      return res.status(404).json({ error: err.message });
    }
  }
}
