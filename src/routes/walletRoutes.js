import express from "express";
import {
    getWalletBalance,
    addMoney,
    deductWalletBalance,
    walletHistory
} from "../controllers/walletController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Get logged-in user's wallet balance
router.get("/", authMiddleware, getWalletBalance);

// Add money to wallet
router.post("/add", authMiddleware, addMoney);

// Deduct money from wallet
router.post("/deduct", authMiddleware, deductWalletBalance);

// Get wallet transaction history
router.get("/history", authMiddleware, walletHistory);

export default router;
