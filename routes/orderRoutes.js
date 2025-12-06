import express from "express";
import {
  placeOrder,
  getUserOrders,
  getOrderDetails,
  updateOrderStatus,
  cancelOrder,
  getVendorOrders
} from "../controllers/orderController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { vendorAuth } from "../middlewares/vendorMiddleware.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* ========================
     CUSTOMER ROUTES
======================== */

// Place new order
router.post("/place", authMiddleware, placeOrder);

// Get all orders of logged-in user
router.get("/my-orders", authMiddleware, getUserOrders);

// Get single order details
router.get("/details/:id", authMiddleware, getOrderDetails);

// Cancel order
router.put("/cancel/:id", authMiddleware, cancelOrder);


/* ========================
     VENDOR ROUTES
======================== */

// Vendor gets all orders assigned to their restaurant
router.get("/vendor/list", vendorAuth, getVendorOrders);

// Vendor updates status (Accepted, Out for Delivery, Delivered)
router.put("/status/:id", vendorAuth, updateOrderStatus);


/* ========================
      ADMIN ROUTES
======================== */

// Admin update status
router.put("/admin/status/:id", adminAuth, updateOrderStatus);


export default router;
