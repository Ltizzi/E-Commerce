import { Router } from "express";
import { StockEntryController } from "../controllers/stockEntry.controller";

const entryRouter: Router = Router();
const entryController = new StockEntryController();

entryRouter.get("/all", entryController.httpGetAllEntries);
entryRouter.get("/withPagination", entryController.httpEntriesWithPagination);
entryRouter.get("/byId", entryController.httpGetEntryById);
entryRouter.get("/count", entryController.httpGetTotalEntriesNumber);
entryRouter.post("/new", entryController.httpCreateNewEntry);
entryRouter.delete("/delete", entryController.httpSoftDeleteEntry);
entryRouter.patch("/update", entryController.httpUpdateEntry);

module.exports = entryRouter;
