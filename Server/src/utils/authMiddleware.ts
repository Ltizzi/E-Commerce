import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWTUserInfo } from "../models/utils/JWTUserInfo";
import { UserService } from "../services/UserService";
import { RoleEnum } from "../models/RoleEnum";

const userServ = new UserService();

export const authenticateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  if (!token) {
    return res.sendStatus(401);
  }
  jwt.verify(token.split(" ")[1], process.env.JWT_SECRET!, (err, user) => {
    if (err) {
      return res.sendStatus(403);
    }
    req.user = user;
    next();
  });
};

export const isAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let userInfo = {} as JWTUserInfo;
    if (!req.user) {
      const token = req.headers.authorization;
      if (!token) {
        return res.sendStatus(401);
      }
      jwt.verify(token.split(" ")[1], process.env.JWT_SECRET!, (err, user) => {
        if (err) {
          return res.sendStatus(403);
        }
        userInfo = user as JWTUserInfo;
      });
    } else userInfo = req.user as JWTUserInfo;
    // const userInfo = req.user as JWTUserInfo;
    const isAdminFromReq = userInfo.roles.includes(RoleEnum.ADMIN);
    if (!isAdminFromReq) {
      throw new Error("Wrong credentials!");
    }
    const user = await userServ.getUserByEmail(userInfo.email);
    const isAdminFromDB = user?.roles.includes(RoleEnum.ADMIN);
    if (isAdminFromReq && isAdminFromDB) next();
    else throw new Error("Wrong credentials!");
  } catch (err: any) {
    return res.status(403).json({ error: err.message });
  }
};
