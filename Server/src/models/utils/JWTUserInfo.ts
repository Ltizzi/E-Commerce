import { RoleEnum } from "../RoleEnum";

export interface JWTUserInfo {
  email: string;
  roles: Array<RoleEnum>;
  iat: number;
  exp: number;
}
