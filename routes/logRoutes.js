import express from "express";
import {
    createLog,
    getLogs
} from "../controllers/logController.js";

import { adminAuth } from "../middlewares/adminMiddleware.js";

const router = express.Router();

// Create a new log entry (System use / Internal use)
router.post("/create", createLog);

// Get all logs (Admin Only)
router.get("/", adminAuth, getLogs);

export default router;
