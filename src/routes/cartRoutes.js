import express from "express";
import {
  addToCart,
  getCart,
  updateCart,
  deleteCartItem
} from "../controllers/cartController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add Product to Cart
router.post("/add", authMiddleware, addToCart);

// Get User Cart
router.get("/", authMiddleware, getCart);

// Update Cart Quantity
router.put("/update/:id", authMiddleware, updateCart);

// Delete Single Cart Item
router.delete("/delete/:id", authMiddleware, deleteCartItem);

export default router;
