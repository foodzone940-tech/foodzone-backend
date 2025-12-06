import express from "express";
import {
    addFavorite,
    removeFavorite,
    getFavorites
} from "../controllers/favoriteController.js";

import adminAuth from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Add product to favorites
router.post("/add", adminAuth, addFavorite);

// Remove product from favorites
router.delete("/remove/:id", adminAuth, removeFavorite);

// Get all favorites of user
router.get("/", adminAuth, getFavorites);

export default router;

