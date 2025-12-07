import express from "express";
import {
    getWallet,
    addMoney,
    deductMoney,
    walletHistory
} from "../controllers/walletController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get logged-in user's wallet balance
router.get("/", authMiddleware, getWallet);

// Add money to wallet (Referral, Cashback, Refund)
router.post("/add", authMiddleware, addMoney);

// Deduct money from wallet (Order payment)
router.post("/deduct", authMiddleware, deductMoney);

// Get wallet transaction history
router.get("/history", authMiddleware, walletHistory);

export default router;
