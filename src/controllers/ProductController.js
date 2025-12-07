// src/controllers/productController.js

import db from "../config/db.js";  // YOUR MySQL pool connection

// ================================
// ADD PRODUCT  ✔
// ================================
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

    await db.query(sql, [
      vendor_id,
      category_id,
      name,
      description,
      price,
      stock ?? 0,
      image ?? "",
      status ?? 1,
    ]);

    res.json({ message: "Product added successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// UPDATE PRODUCT  ✔
// ================================
export const updateProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    const {
      name,
      description,
      price,
      stock,
      image,
      category_id,
      status,
    } = req.body;

    const sql = `
      UPDATE products SET 
      name = ?, description = ?, price = ?, stock = ?, image = ?,
      category_id = ?, status = ?
      WHERE id = ?
    `;

    await db.query(sql, [
      name,
      description,
      price,
      stock,
      image,
      category_id,
      status,
      product_id,
    ]);

    res.json({ message: "Product updated successfully" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// DELETE PRODUCT  ✔
// ================================
export const deleteProduct = async (req, res) => {
  try {
    const product_id = req.params.id;

    await db.query("DELETE FROM products WHERE id = ?", [product_id]);

    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// GET ALL PRODUCTS  ✔
// ================================
export const getProducts = async (req, res) => {
  try {
    const [rows] = await db.query(
      "SELECT * FROM products ORDER BY id DESC"
    );

    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// GET PRODUCT BY ID  ✔
// ================================
export const getProductById = async (req, res) => {
  try {
    const product_id = req.params.id;

    const [rows] = await db.query(
      "SELECT * FROM products WHERE id = ?",
      [product_id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// GET PRODUCTS BY CATEGORY  ✔
// ================================
export const getProductsByCategory = async (req, res) => {
  try {
    const category_id = req.params.category_id;

    const [rows] = await db.query(
      "SELECT * FROM products WHERE category_id = ? ORDER BY id DESC",
      [category_id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ================================
// GET VENDOR PRODUCTS  ✔
// ================================
export const getVendorProducts = async (req, res) => {
  try {
    const vendor_id = req.user.vendor_id; // vendorAuth middleware se aya

    const [rows] = await db.query(
      "SELECT * FROM products WHERE vendor_id = ? ORDER BY id DESC",
      [vendor_id]
    );

    res.json(rows);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
