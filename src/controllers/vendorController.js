// src/controllers/vendorController.js

import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// =========================
// VENDOR REGISTER
// =========================
export const vendorRegister = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;

    const sqlCheck = "SELECT * FROM vendors WHERE email = ?";
    const [existing] = await db.execute(sqlCheck, [email]);

    if (existing.length > 0) {
      return res.status(400).json({ error: "Vendor already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);

    const sqlInsert = `
      INSERT INTO vendors (name, email, phone, password)
      VALUES (?, ?, ?, ?)
    `;

    await db.execute(sqlInsert, [name, email, phone, hashed]);

    res.json({ message: "Vendor registered successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================
// VENDOR LOGIN
// =========================
export const vendorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const sql = "SELECT * FROM vendors WHERE email = ?";
    const [rows] = await db.execute(sql, [email]);

    if (rows.length === 0) {
      return res.status(400).json({ error: "Vendor not found" });
    }

    const vendor = rows[0];

    const match = await bcrypt.compare(password, vendor.password);
    if (!match) {
      return res.status(400).json({ error: "Invalid password" });
    }

    const token = jwt.sign({ id: vendor.id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    res.json({ message: "Login successful", token, vendor });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================
// GET VENDOR PROFILE
// =========================
export const getVendorProfile = async (req, res) => {
  try {
    const vendor_id = req.user.id;

    const sql = "SELECT * FROM vendors WHERE id = ?";
    const [rows] = await db.execute(sql, [vendor_id]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================
// UPDATE VENDOR PROFILE
// =========================
export const updateVendorProfile = async (req, res) => {
  try {
    const vendor_id = req.user.id;
    const { name, phone, address } = req.body;

    const sql = `
      UPDATE vendors
      SET name=?, phone=?, address=?
      WHERE id=?
    `;

    await db.execute(sql, [name, phone, address, vendor_id]);

    res.json({ message: "Vendor profile updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// =========================
// GET VENDOR ORDERS (FIX ADDED)
// =========================
export const getVendorOrders = async (req, res) => {
  try {
    const vendor_id = req.user.id;

    const sql = `
      SELECT o.*, u.name AS customer_name, u.phone AS customer_phone
      FROM orders o
      JOIN users u ON o.user_id = u.id
      WHERE o.vendor_id = ?
      ORDER BY o.id DESC
    `;

    const [rows] = await db.execute(sql, [vendor_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
