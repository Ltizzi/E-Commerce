import { Router } from "express";
import { StockController } from "../controllers/stock.controller";
import { authenticateJWT, isAdmin } from "../utils/authMiddleware";

const stockRouter: Router = Router();
const stockController = new StockController();

stockRouter.get("/all", isAdmin, stockController.httpGetAllStocks);
stockRouter.get(
  "/withPagination",
  isAdmin,
  stockController.httpGetStocksWithPagination
);
stockRouter.get("/byId", isAdmin, stockController.httpGetStockById);
stockRouter.get("/checkStock", stockController.httpIsThereStockForProduct);
stockRouter.get("/count", isAdmin, stockController.httpCountStocks);
stockRouter.post("/new", isAdmin, stockController.httpCreateNewStock);
stockRouter.delete("/delete", isAdmin, stockController.httpSoftDeleteStockById);
stockRouter.patch("/update", isAdmin, stockController.httpUpdateStock);

module.exports = stockRouter;
