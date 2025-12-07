import express from "express";
import { 
  uploadPayment, 
  getPaymentStatus,
  updatePaymentStatus 
} from "../controllers/paymentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// USER → Upload payment
router.post("/upload", authMiddleware, uploadPayment);

// USER → Check payment status
router.get("/status/:order_id", authMiddleware, getPaymentStatus);

// ADMIN → Update payment status
router.put("/status/update/:payment_id", adminAuth, updatePaymentStatus);

export default router;
