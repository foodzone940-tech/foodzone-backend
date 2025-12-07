import express from "express";
import {
  startChat,
  sendMessage,
  getMessages
} from "../controllers/chatController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Start a new chat
router.post("/start", authMiddleware, startChat);

// Send a new message
router.post("/send", authMiddleware, sendMessage);

// Get all messages of a chat
router.get("/messages/:chat_id", authMiddleware, getMessages);

export default router;
