import { Router } from "express";
import { ShopOrderController } from "../controllers/shopOrder.controller";

const orderRouter: Router = Router();
const orderController = new ShopOrderController();

orderRouter.get("/all", orderController.httpGetAllOrders);
orderRouter.get("/withPagination", orderController.httpGetOrdersWithPagination);
orderRouter.get("/byId", orderController.httpGetOrderById);
orderRouter.get("/byUserId", orderController.httpGetOrdersByUserId);
orderRouter.post("/new", orderController.httpCreateShopOrder);
orderRouter.delete("/delete", orderController.httpSoftDeleteOrderById);
orderRouter.patch("/update", orderController.httpUpdateShopOrder);

module.exports = orderRouter;
