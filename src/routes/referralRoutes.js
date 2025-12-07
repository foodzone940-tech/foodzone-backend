import express from "express";
import {
  generateReferral,
  applyReferral,
  getReferralRewards
} from "../controllers/referralController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Generate new referral code
router.post("/generate", authMiddleware, generateReferral);

// Apply referral code for new user signup
router.post("/apply", authMiddleware, applyReferral);

// Get all referral rewards for a user
router.get("/rewards/:user_id", authMiddleware, getReferralRewards);

export default router;
