import { Router } from "express";
import { StockController } from "../controllers/stock.controller";

const stockRouter: Router = Router();
const stockController = new StockController();

stockRouter.get("/all", stockController.httpGetAllStocks);
stockRouter.get("/withPagination", stockController.httpGetStocksWithPagination);
stockRouter.get("/byId", stockController.httpGetStockById);
stockRouter.get("/checkStock", stockController.httpIsThereStockForProduct);
stockRouter.get("/count", stockController.httpCountStocks);
stockRouter.post("/new", stockController.httpCreateNewStock);
stockRouter.delete("/delete", stockController.httpSoftDeleteStockById);
stockRouter.patch("/update", stockController.httpUpdateStock);

module.exports = stockRouter;
