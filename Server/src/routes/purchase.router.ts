import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";

const purchaseRouter: Router = Router();
const purchaseController = new PurchaseController();

purchaseRouter.get(
  "/withPagination",
  purchaseController.httpGetPurchasesWithPagination
);
purchaseRouter.get("/byUserId", purchaseController.httpPurchasesFromUser);
purchaseRouter.get("/byId", purchaseController.httpGetPurchaseById);
purchaseRouter.get("/count", purchaseController.httpGetTotalPurchases);
purchaseRouter.post("/new", purchaseController.httpCreateNewPurchase);
purchaseRouter.delete("/delete", purchaseController.httpSoftDeletePurchaseById);
purchaseRouter.patch("/update", purchaseController.httpUpdatePurchase);

module.exports = purchaseRouter;
