import express from "express";
import {
    assignDeliveryBoy,
    updateDeliveryStatus,
    getDeliveryBoyOrders,
    getSingleDeliveryOrder
} from "../controllers/deliveryController.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { adminAuth } from "../middlewares/adminMiddleware.js";

const router = express.Router();

/* =============================
     ADMIN ROUTES
============================= */

// Admin assigns delivery boy to an order
router.post("/assign", adminAuth, assignDeliveryBoy);


/* =============================
    DELIVERY BOY ROUTES
============================= */

// Delivery boy updates order status (Picked, On the Way, Delivered)
router.put("/status/:order_id", authMiddleware, updateDeliveryStatus);

// Delivery boy gets all assigned orders
router.get("/orders", authMiddleware, getDeliveryBoyOrders);

// Delivery boy gets one order detail
router.get("/order/:order_id", authMiddleware, getSingleDeliveryOrder);


export default router;
