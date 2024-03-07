import { Router } from "express";
import { DealController } from "../controllers/deal.controller";
import { isAdmin } from "../utils/authMiddleware";

const dealRouter: Router = Router();
const dealController = new DealController();

dealRouter.get("/all", dealController.httpGetDeals);
dealRouter.get(
  "/withPagination",
  isAdmin,
  dealController.httpGetDealsWithPagination
);
dealRouter.get("/byId", isAdmin, dealController.httpGetDealById);
dealRouter.get("/byProductId", isAdmin, dealController.httpGetDealByProductId);
dealRouter.get(
  "/checkByProductId",
  dealController.httpCheckProductHasDealsById
);
dealRouter.get("/count", isAdmin, dealController.httpCountDeals);
dealRouter.post("/new", isAdmin, dealController.httpSaveDeal);
dealRouter.delete("/delete", isAdmin, dealController.httpSoftDeleteDealById);
dealRouter.patch("/update", isAdmin, dealController.httpUpdateDeal);

module.exports = dealRouter;
