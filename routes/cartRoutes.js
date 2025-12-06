import express from "express";
import { sendMessage, getMessages } from "../controllers/chatController.js";
import adminAuth from "../middlewares/adminMiddleware.js";

const router = express.Router();

router.post("/send", adminAuth, sendMessage);
router.get("/:id", adminAuth, getMessages);

export default router;
