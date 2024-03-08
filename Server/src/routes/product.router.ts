import { Router } from "express";
import { ProductController } from "../controllers/product.controller";
import { authenticateJWT, isAdmin } from "../utils/authMiddleware";

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.get("/all", productController.httpGetAllProducts);
productRouter.get(
  "/withPagination",
  productController.httpGetProductsWithPagination
);
productRouter.get("/byId", productController.httpGetProductById);
productRouter.get(
  "/count",
  authenticateJWT,
  isAdmin,
  productController.httpGetNumberOfProducts
);
productRouter.post(
  "/new",
  authenticateJWT,
  isAdmin,
  productController.httpCreateNewProduct
);
productRouter.delete(
  "/delete",
  authenticateJWT,
  isAdmin,
  productController.httpSoftDeleteProductById
);
productRouter.patch(
  "/update",
  authenticateJWT,
  isAdmin,
  productController.httpUpdateProduct
);

module.exports = productRouter;
