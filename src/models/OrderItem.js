import db from "../db.js";

const OrderItem = {

  // Add item inside an order
  create: (order_id, product_id, quantity, price, callback) => {
    const sql = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [order_id, product_id, quantity, price], callback);
  },

  // Get all items of a specific order
  getByOrder: (order_id, callback) => {
    const sql = `
      SELECT oi.*, p.name AS product_name, p.image AS product_image
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ?
    `;
    db.query(sql, [order_id], callback);
  },

  // Delete item from order
  delete: (id, callback) => {
    const sql = `
      DELETE FROM order_items
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default OrderItem;
