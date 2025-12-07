// src/controllers/vendorController.js

import db from "../config/db.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
