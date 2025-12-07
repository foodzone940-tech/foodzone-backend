// src/controllers/productController.js

import db from "../config/db.js";

// ===============================
// ADD PRODUCT
// ===============================
export const addProduct = async (req, res) => {
  try {
    const {
      vendor_id,
      category_id,
      name,
      description,
      price,
      stock,
      image,
      status,
    } = req.body;

    if (!vendor_id || !category_id || !name || !price) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const sql = `
      INSERT INTO products 
      (vendor_id, category_id, name, description, price, stock, image, status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await db.execute(sql, [
      vendor_id,
      category_id,
      name,
      description,
      price,
      stock,
      image,
      status,
    ]);

    res.json({ message: "Product added successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// UPDATE PRODUCT
// ===============================
export const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    const { name, description, price, stock, image, status } = req.body;

    const sql = `
      UPDATE products 
      SET name=?, description=?, price=?, stock=?, image=?, status=?
      WHERE id=?
    `;

    await db.execute(sql, [
      name,
      description,
      price,
      stock,
      image,
      status,
      product_id,
    ]);

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// DELETE PRODUCT
// ===============================
export const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    const sql = `DELETE FROM products WHERE id=?`;

    await db.execute(sql, [product_id]);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET ALL PRODUCTS
// ===============================
export const getProducts = async (req, res) => {
  try {
    const sql = `SELECT * FROM products ORDER BY id DESC`;
    const [rows] = await db.execute(sql);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET PRODUCT BY ID
// ===============================
export const getProductById = async (req, res) => {
  try {
    const sql = `SELECT * FROM products WHERE id = ?`;
    const [rows] = await db.execute(sql, [req.params.id]);

    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET PRODUCTS BY CATEGORY
// ===============================
export const getProductsByCategory = async (req, res) => {
  try {
    const sql = `
      SELECT * FROM products 
      WHERE category_id = ?
      ORDER BY id DESC
    `;
    const [rows] = await db.execute(sql, [req.params.category_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ===============================
// GET PRODUCTS OF LOGGED-IN VENDOR
// ===============================
export const getVendorProducts = async (req, res) => {
  try {
    const vendor_id = req.user.id; // vendorAuth se vendor_id ata h

    const sql = `
      SELECT * FROM products 
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;

    const [rows] = await db.execute(sql, [vendor_id]);

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
