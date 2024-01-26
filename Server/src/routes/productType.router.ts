import { Router } from "express";
import { ProductTypeController } from "../controllers/productType.controller";

const productTypeRouter: Router = Router();
const productTypeController = new ProductTypeController();

productTypeRouter.get("/all", productTypeController.httpGetAllProductTypes);
productTypeRouter.get(
  "/withPagination",
  productTypeController.httpGetTypesWithPagination
);
productTypeRouter.get("/byId", productTypeController.httpGetTypeById);
productTypeRouter.get("/byName", productTypeController.httpGetTypeByName);
productTypeRouter.get("/count", productTypeController.httpCountTypes);
productTypeRouter.post("/new", productTypeController.httpCreateProductType);
productTypeRouter.delete(
  "/delete",
  productTypeController.httpSoftDeleteProductType
);
productTypeRouter.patch("/update", productTypeController.httpUpdateProductType);

module.exports = productTypeRouter;
