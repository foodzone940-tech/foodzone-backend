import express from "express";
import {
    createPayment,
    verifyPayment,
    getPaymentStatus
} from "../controllers/paymentController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Create payment (Order amount, wallet, online etc.)
router.post("/create", authMiddleware, createPayment);

// Verify payment after success/failure from gateway
router.post("/verify", authMiddleware, verifyPayment);

// Get payment status by order_id
router.get("/status/:order_id", authMiddleware, getPaymentStatus);

export default router;
