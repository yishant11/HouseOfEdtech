import express from "express";
import {
  getProducts,
  getProductByIdController,
  createProductController,
  updateProductController,
  deleteProductController,
} from "../controllers/productController";
// import { protect, admin } from "../middleware/auth";

const router = express.Router();

router.route("/").get(getProducts).post(createProductController);

router
  .route("/:id")
  .get(getProductByIdController)
  .put(updateProductController)
  .delete(deleteProductController);

export default router;
