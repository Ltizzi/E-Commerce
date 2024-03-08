import { Router } from "express";
import { ProductTypeController } from "../controllers/productType.controller";
import { authenticateJWT, isAdmin } from "../utils/authMiddleware";

const productTypeRouter: Router = Router();
const productTypeController = new ProductTypeController();

productTypeRouter.get("/all", productTypeController.httpGetAllProductTypes);
productTypeRouter.get(
  "/withPagination",
  isAdmin,
  productTypeController.httpGetTypesWithPagination
);
productTypeRouter.get("/byId", productTypeController.httpGetTypeById);
productTypeRouter.get("/byName", productTypeController.httpGetTypeByName);
productTypeRouter.get("/count", isAdmin, productTypeController.httpCountTypes);
productTypeRouter.post(
  "/new",
  isAdmin,
  productTypeController.httpCreateProductType
);
productTypeRouter.delete(
  "/delete",
  isAdmin,
  productTypeController.httpSoftDeleteProductType
);
productTypeRouter.patch(
  "/update",
  isAdmin,
  productTypeController.httpUpdateProductType
);

module.exports = productTypeRouter;
