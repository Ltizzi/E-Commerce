import { Router } from "express";
import { ProductController } from "../controllers/product.controller";

const productRouter: Router = Router();
const productController = new ProductController();

productRouter.get("/all", productController.httpGetAllProducts);
productRouter.get(
  "/withPagination",
  productController.httpGetProductsWithPagination
);
productRouter.get("/byId", productController.httpGetProductById);
productRouter.get("/count", productController.httpGetNumberOfProducts);
productRouter.post("/new", productController.httpCreateNewProduct);
productRouter.delete("/delete", productController.httpSoftDeleteProductById);
productRouter.patch("/update", productController.httpUpdateProduct);

module.exports = productRouter;
