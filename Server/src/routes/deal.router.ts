import { Router } from "express";
import { DealController } from "../controllers/deal.controller";
import { isAdmin } from "../utils/authMiddleware";

const dealRouter: Router = Router();
const dealController = new DealController();

dealRouter.get("/all", dealController.httpGetDeals);
dealRouter.get("/withPagination", dealController.httpGetDealsWithPagination);
dealRouter.get("/byId", dealController.httpGetDealById);
dealRouter.get("/byProductId", dealController.httpGetDealByProductId);
dealRouter.get(
  "/checkByProductId",
  dealController.httpCheckProductHasDealsById
);
dealRouter.get("/count", dealController.httpCountDeals);
dealRouter.post("/new", dealController.httpSaveDeal);
dealRouter.delete("/delete", dealController.httpSoftDeleteDealById);
dealRouter.patch("/update", dealController.httpUpdateDeal);

module.exports = dealRouter;
