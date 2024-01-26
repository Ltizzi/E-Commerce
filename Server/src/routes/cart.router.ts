import { Router } from "express";
import { CartController } from "../controllers/cart.controller";

const cartRouter: Router = Router();
const cartController = new CartController();

cartRouter.get("/byUserId", cartController.httpGetCartsFromUser);
cartRouter.get("/byId", cartController.httpGetCartById);
cartRouter.post("/new", cartController.httpCreateNewCart);
cartRouter.delete("/delete", cartController.httpSoftDeleteCartById);
cartRouter.patch("/update", cartController.httpUpdateCart);

module.exports = cartRouter;
