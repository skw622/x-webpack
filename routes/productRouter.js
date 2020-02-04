const express = require("express");
const productController = require("../controllers/admin/productController.js");
const productRouter = express.Router();

productRouter.use("/postproduct", productController.postProduct);
productRouter.use("/create", productController.addProduct);
productRouter.use("/update/:id", productController.updateProduct);
productRouter.use("/postupdateproduct/:id", productController.postUpdateProduct);
productRouter.use("/delete/:id", productController.deleteProduct);
productRouter.use("/", productController.getProducts);

module.exports = productRouter;
