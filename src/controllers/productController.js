// src/routes/productRoutes.js

import express from "express";
import {
  addProduct,
  updateProduct,
  deleteProduct,
  getProducts,
  getProductById,
  getProductsByCategory,
  getVendorProducts,
} from "../controllers/productController.js"; // ✅ Extension added!

import { vendorAuth } from "../middlewares/vendorMiddleware.js"; // ✅ Make sure filename is exactly this

const router = express.Router();

// ✅ Add new product (Vendor only)
router.post("/add", vendorAuth, addProduct);

// ✅ Update product (Vendor only)
router.put("/update/:id", vendorAuth, updateProduct);

// ✅ Delete product (Vendor only)
router.delete("/delete/:id", vendorAuth, deleteProduct);

// ✅ Get all products
router.get("/", getProducts);

// ✅ Get product by ID
router.get("/:id", getProductById);

// ✅ Get products by category
router.get("/category/:category_id", getProductsByCategory);

// ✅ Get products of logged-in vendor
router.get("/vendor/list", vendorAuth, getVendorProducts);

export default router;
