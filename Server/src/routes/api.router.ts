const express = require("express");
const userRouter = require("./user.router");
const typeRouter = require("./productType.router");
const productRouter = require("./product.router");
const stockRouter = require("./stock.router");
const entryRouter = require("./stockEntry.router");
const cartRouter = require("./cart.router");
const orderRouter = require("./shopOrder.router");
const purchaseRouter = require("./purchase.router");
const apiRouter = express.Router();

apiRouter.use("/user", userRouter);
apiRouter.use("/type", typeRouter);
apiRouter.use("/product", productRouter);
apiRouter.use("/stock", stockRouter);
apiRouter.use("/entry", entryRouter);
apiRouter.use("/cart", cartRouter);
apiRouter.use("/order", orderRouter);
apiRouter.use("/purchase", purchaseRouter);

module.exports = apiRouter;
