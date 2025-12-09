import db from "../config/db.js";

// ADD ITEM TO CART
export const addToCart = (req, res) => {
  const { user_id, product_id, quantity } = req.body;

  if (!user_id || !product_id)
    return res.status(400).json({ message: "Missing fields" });

  const sql = `
    INSERT INTO Cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;

  db.query(sql, [user_id, product_id, quantity || 1], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ message: "Item added to cart" });
  });
};

// UPDATE CART (quantity update)
export const updateCart = (req, res) => {
  const { id, quantity } = req.body;

  if (!id || !quantity)
    return res.status(400).json({ message: "Missing fields" });

  const sql = `
    UPDATE Cart SET quantity = ?
    WHERE id = ?
  `;

  db.query(sql, [quantity, id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ message: "Cart updated successfully" });
  });
};

// GET CART
export const getCart = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT Cart.*, Products.name, Products.price
    FROM Cart
    JOIN Products ON Cart.product_id = Products.id
    WHERE Cart.user_id = ?
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json(rows);
  });
};

// DELETE CART ITEM
export const deleteCartItem = (req, res) => {
  const { id } = req.params;

  const sql = `DELETE FROM Cart WHERE id = ?`;

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ message: "Item removed from cart" });
  });
};
