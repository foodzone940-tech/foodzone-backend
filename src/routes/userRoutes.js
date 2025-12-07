import express from "express";
import {
    registerUser,
    loginUser,
    getUserProfile,
    updateUserProfile,
    deleteUser,
    getAllUsers
} from "../controllers/userController.js";

import authMiddleware from "../middlewares/authMiddleware.js";
import adminAuth from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Register new user
router.post("/register", registerUser);

// Login user
router.post("/login", loginUser);

// Get logged-in user profile
router.get("/profile", authMiddleware, getUserProfile);

// Update profile of logged-in user
router.put("/profile/update", authMiddleware, updateUserProfile);

// Delete user (admin only)
router.delete("/delete/:id", adminAuth, deleteUser);

// Get all users (admin only)
router.get("/", adminAuth, getAllUsers);

export default router;
