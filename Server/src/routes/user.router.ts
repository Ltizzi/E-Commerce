import { Router } from "express";
import { UserController } from "../controllers/user.controller";
import { authenticateJWT, isAdmin } from "../utils/authMiddleware";

const userRouter: Router = Router();
const userController = new UserController();

userRouter.get("/all", isAdmin, userController.httpGetAllUsers);
userRouter.get(
  "/withPagination",
  isAdmin,
  userController.httpGetUserWithPagination
);
userRouter.get("/count", isAdmin, userController.httpCountUsers);
userRouter.get("/byId", userController.httpGetUserById);
userRouter.get("/byMail", userController.httpGetUserByEmail);
userRouter.get("/byUsername", isAdmin, userController.httpGetUserByUsername);
userRouter.post("/new", userController.httpCreateNewUser);
userRouter.delete("/delete", userController.httpSoftDeleteUser);
userRouter.patch("/update", userController.httpUpdateUser);
userRouter.patch("/makeAdmin", isAdmin, userController.httpMakeUserAdmin);
userRouter.post("/fav", userController.httpAddOrRemoveFavProduct);
userRouter.get("/isFav", userController.httpFavChecker);

module.exports = userRouter;
