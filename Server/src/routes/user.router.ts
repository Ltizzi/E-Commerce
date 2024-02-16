import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT } from "../utils/authMiddleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/all", userController.httpGetAllUsers);
userRouter.get("/withPagination", userController.httpGetUserWithPagination);
userRouter.get("/count", userController.httpCountUsers);
userRouter.get("/byId", userController.httpGetUserById);
userRouter.get("/byMail", userController.httpGetUserByEmail);
userRouter.get("/byUsername", userController.httpGetUserByUsername);
userRouter.post("/new", userController.httpCreateNewUser);
userRouter.delete("/delete", userController.httpSoftDeleteUser);
userRouter.patch("/update", userController.httpUpdateUser);
userRouter.patch("/makeAdmin", userController.httpMakeUserAdmin);
userRouter.post(
  "/fav",
  authenticateJWT,
  userController.httpAddOrRemoveFavProduct
);

module.exports = userRouter;
