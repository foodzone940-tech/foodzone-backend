import express from "express";
import {
  vendorRegister,
  vendorLogin,
  getVendorProfile,
  updateVendorProfile,
  getVendorOrders
} from "../controllers/vendorController.js";

import { vendorAuth } from "../middlewares/vendorMiddleware.js";

const router = express.Router();

// Vendor Register
router.post("/register", vendorRegister);

// Vendor Login
router.post("/login", vendorLogin);

// Get Vendor Profile
router.get("/profile", vendorAuth, getVendorProfile);

// Update Vendor Profile
router.put("/profile", vendorAuth, updateVendorProfile);

// Get vendor's orders
router.get("/orders", vendorAuth, getVendorOrders);

export default router;
