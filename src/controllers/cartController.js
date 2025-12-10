// src/controllers/cartController.js

import db from "../config/db.js";

// =========================
// ADD ITEM TO CART
// =========================
export const addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const checkSql = "SELECT * FROM Cart WHERE user_id = ? AND product_id = ?";

  db.query(checkSql, [user_id, product_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });

    if (rows.length > 0) {
      const updateSql = `
        UPDATE Cart 
        SET quantity = quantity + ?
        WHERE user_id = ? AND product_id = ?
      `;

      db.query(updateSql, [quantity || 1, user_id, product_id], (err2) => {
        if (err2) return res.status(500).json({ error: err2 });
        return res.json({ message: "Cart updated" });
      });
    } else {
      const insertSql = `
        INSERT INTO Cart (user_id, product_id, quantity)
        VALUES (?, ?, ?)
      `;

      db.query(insertSql, [user_id, product_id, quantity || 1], (err3) => {
        if (err3) return res.status(500).json({ error: err3 });
        return res.json({ message: "Item added to cart" });
      });
    }
  });
};

// =========================
// GET USER CART
// =========================
export const getCart = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT 
      Cart.id,
      Cart.product_id,
      Cart.quantity,
      Products.name,
      Products.price
    FROM Cart
    LEFT JOIN Products ON Cart.product_id = Products.id
    WHERE Cart.user_id = ?
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err });
    return res.json(rows);
  });
};

// =========================
// UPDATE CART ITEM
// =========================
export const updateCart = (req, res) => {
  const { cart_id, quantity } = req.body;

  if (!cart_id || !quantity) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const sql = `
    UPDATE Cart
    SET quantity = ?
    WHERE id = ?
  `;

  db.query(sql, [quantity, cart_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Cart item updated" });
  });
};

// =========================
// DELETE SINGLE CART ITEM
// =========================
export const deleteCartItem = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM Cart WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Cart item deleted" });
  });
};

// =========================
// CLEAR USER CART
// =========================
export const clearCart = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id required" });
  }

  const sql = "DELETE FROM Cart WHERE user_id = ?";

  db.query(sql, [user_id], (err) => {
    if (err) return res.status(500).json({ error: err });
    return res.json({ message: "Cart cleared successfully" });
  });
};
