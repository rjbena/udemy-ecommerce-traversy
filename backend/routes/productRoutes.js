import express from "express";
const router = express.Router();
import { protect, isAdmin } from "../middleware/authMiddleware.js";
import {
  getProductById,
  getProducts,
  deleteProduct,
} from "../controllers/productController.js";

// @desc Fetch all products
// @route GET /api/products
// @access Public
router.route("/").get(getProducts);

//@desc Fetch single product
//@route GET /api/products/:id
//@access Public
router
  .route("/:id")
  .get(getProductById)
  .delete(protect, isAdmin, deleteProduct);

export default router;
