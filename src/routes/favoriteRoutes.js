import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorites
} from "../controllers/favoriteController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Add product to favorites
router.post("/add", authMiddleware, addFavorite);

// Remove product from favorites
router.delete("/remove/:id", authMiddleware, removeFavorite);

// Get all favorites of user
router.get("/", authMiddleware, getFavorites);

export default router;
