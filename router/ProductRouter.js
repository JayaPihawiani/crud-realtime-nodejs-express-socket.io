import {
  createProduct,
  getProduct,
  updateProduct,
  getProductById,
  deleteProduct,
} from "../controllers/Products.js";
import express from "express";

const productRouter = express.Router();

productRouter.post("/product", createProduct);
productRouter.get("/product", getProduct);
productRouter
  .route("/product/:id")
  .patch(updateProduct)
  .delete(deleteProduct)
  .get(getProductById);

export default productRouter;
