import { Router } from "express";
import { PurchaseController } from "../controllers/purchase.controller";
import { isAdmin } from "../utils/authMiddleware";

const purchaseRouter: Router = Router();
const purchaseController = new PurchaseController();

purchaseRouter.get(
  "/withPagination",
  isAdmin,
  purchaseController.httpGetPurchasesWithPagination
);
purchaseRouter.get("/byUserId", purchaseController.httpPurchasesFromUser);
purchaseRouter.get("/byId", purchaseController.httpGetPurchaseById);
purchaseRouter.get("/count", isAdmin, purchaseController.httpGetTotalPurchases);
purchaseRouter.get(
  "/countByUser",
  purchaseController.httpCountPurchasesByUserId
);
purchaseRouter.get(
  "/byUserWithPagination",
  purchaseController.httpGetPurchasesFromUserWithPagination
);
purchaseRouter.post("/new", purchaseController.httpCreateNewPurchase);
purchaseRouter.delete(
  "/delete",
  isAdmin,
  purchaseController.httpSoftDeletePurchaseById
);
purchaseRouter.patch("/update", isAdmin, purchaseController.httpUpdatePurchase);

module.exports = purchaseRouter;
