import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getProductById,
  getProducts,
  deleteProduct,
  updateProduct,
  createProduct,
  createProductReview,
} from "../controllers/productController.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.route("/").get(getProducts).post(protect, isAdmin, createProduct);

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct)
  .put(protect, isAdmin, updateProduct);
router.route("/:id/reviews").post(protect, createProductReview);
export default router;
