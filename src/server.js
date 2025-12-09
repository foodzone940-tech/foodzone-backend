import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import db from "./config/db.js";   // ✔ CORRECT PATH

dotenv.config();
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

// Routes Import
import appRoutes from "./routes/appRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import favoriteRoutes from "./routes/favoriteRoutes.js";
import chatRoutes from "./routes/chatRoutes.js";
import referralRoutes from "./routes/referralRoutes.js";
import walletRoutes from "./routes/walletRoutes.js";
import logRoutes from "./routes/logRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import vendorRoutes from "./routes/vendorRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";

// ⭐ IMPORTANT: Agar delivery boy use nahi karte ho, to isko hata do
// import deliveryRoutes from "./routes/deliveryRoutes.js";

// Route Mount
app.use("/api/app", appRoutes);
app.use("/api/user", userRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/fav", favoriteRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/referral", referralRoutes);
app.use("/api/wallet", walletRoutes);
app.use("/api/logs", logRoutes);
app.use("/api/products", productRoutes);
app.use("/api/vendors", vendorRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/payments", paymentRoutes);

// ⭐ Remove if no delivery boy
// app.use("/api/delivery", deliveryRoutes);

// Test Route
app.get("/", (req, res) => {
  res.send("FoodZone Backend Running Successfully");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
