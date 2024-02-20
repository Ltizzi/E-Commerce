import { authenticateJWT, isAdmin } from "../utils/authMiddleware";

const express = require("express");
const userRouter = require("./user.router");
const typeRouter = require("./productType.router");
const productRouter = require("./product.router");
const stockRouter = require("./stock.router");
const entryRouter = require("./stockEntry.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./shopOrder.router");
const purchaseRouter = require("./purchase.router");
const reviewRouter = require("./review.router");
const apiRouter = express.Router();

apiRouter.use("/user", authenticateJWT, userRouter);
apiRouter.use("/type", typeRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/stock", stockRouter);
apiRouter.use("/entry", isAdmin, entryRouter);
apiRouter.use("/cart", authenticateJWT, cartRouter);
apiRouter.use("/order", authenticateJWT, orderRouter);
apiRouter.use("/purchase", authenticateJWT, purchaseRouter);
apiRouter.use("/review", reviewRouter);

module.exports = apiRouter;
