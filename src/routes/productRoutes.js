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
} from "../controllers/productController.js";

import { vendorAuth } from "../middlewares/vendorMiddleware.js";

const router = express.Router();

/*
|-----------------------------------------------------------
| PRODUCT ROUTES (REAL PRODUCTION VERSION)
|-----------------------------------------------------------
*/

// 🟢 CREATE PRODUCT (Vendor Only)
router.post("/add", vendorAuth, async (req, res) => {
  try {
    await addProduct(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟡 UPDATE PRODUCT (Vendor Only)
router.put("/update/:id", vendorAuth, async (req, res) => {
  try {
    await updateProduct(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔴 DELETE PRODUCT (Vendor Only)
router.delete("/delete/:id", vendorAuth, async (req, res) => {
  try {
    await deleteProduct(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 GET ALL PRODUCTS
router.get("/", async (req, res) => {
  try {
    await getProducts(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 GET PRODUCT BY ID
router.get("/:id", async (req, res) => {
  try {
    await getProductById(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔵 GET PRODUCTS BY CATEGORY
router.get("/category/:category_id", async (req, res) => {
  try {
    await getProductsByCategory(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🟣 GET VENDOR PRODUCTS (Vendor Only)
router.get("/vendor/list", vendorAuth, async (req, res) => {
  try {
    await getVendorProducts(req, res);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// EXPORT ROUTER
export default router;
