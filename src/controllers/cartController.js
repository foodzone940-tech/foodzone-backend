import express from "express";
import { getAppConfig, updateAppConfig } from "../controllers/appController.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Public Route → Users can fetch app settings
router.get("/config", getAppConfig);

// Admin Route → Only admin can update app settings
router.put("/config/update", adminAuth, updateAppConfig);

export default router;
