import express from "express";
const router = express.Router();

import {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
  updateAddress,
  getUserById
} from "../controllers/userController.js";

import adminAuth from "../middlewares/adminMiddleware.js";

// User register & login
router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected user routes
router.get("/profile", adminAuth, getUserProfile);
router.put("/profile/update", adminAuth, updateUserProfile);

// Address update
router.put("/address/update", adminAuth, updateAddress);

// Get user by ID (optional)
router.get("/:id", adminAuth, getUserById);

export default router;
