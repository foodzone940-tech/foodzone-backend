import db from "../config/db.js";   // ✔ MUST HAVE


const Order = {

  // Create new order
  create: (
    user_id,
    vendor_id,
    delivery_address,
    total_amount,
    delivery_charge,
    payment_mode,
    payment_status,
    order_status,
    callback
  ) => {
    const sql = `
      INSERT INTO orders 
      (user_id, vendor_id, delivery_address, total_amount, delivery_charge, payment_mode, payment_status, order_status)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [
        user_id,
        vendor_id,
        delivery_address,
        total_amount,
        delivery_charge,
        payment_mode,
        payment_status,
        order_status
      ],
      callback
    );
  },

  // Get order by ID
  getById: (order_id, callback) => {
    const sql = `
      SELECT * FROM orders
      WHERE id = ?
    `;
    db.query(sql, [order_id], callback);
  },

  // Get orders of a user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM orders
      WHERE user_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [user_id], callback);
  },

  // Update order status
  updateStatus: (order_id, status, callback) => {
    const sql = `
      UPDATE orders
      SET order_status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, order_id], callback);
  }
};

export default Order;

