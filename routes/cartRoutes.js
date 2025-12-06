import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem,
  clearCart
} from "../controllers/cartController.js";

import adminAuth from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Add Product to Cart
router.post("/add", adminAuth, addToCart);

// Get User Cart
router.get("/", adminAuth, getCart);

// Update Cart Quantity
router.put("/update/:id", adminAuth, updateCart);

// Delete Single Cart Item
router.delete("/delete/:id", adminAuth, deleteCartItem);

// Clear Entire Cart
router.delete("/clear", adminAuth, clearCart);

export default router;
