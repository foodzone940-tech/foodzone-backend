// models/Log.js

import db from "../config/db.js";   // ✔ IMPORTANT

export const createLogTable = `
CREATE TABLE IF NOT EXISTS Logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(50),
  message TEXT,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;


const OrderStatusHistory = {

  // Add status history entry
  create: (order_id, status, callback) => {
    const sql = `
      INSERT INTO order_status_history (order_id, status)
      VALUES (?, ?)
    `;
    db.query(sql, [order_id, status], callback);
  },

  // Get full status history of an order
  getByOrder: (order_id, callback) => {
    const sql = `
      SELECT * FROM order_status_history
      WHERE order_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [order_id], callback);
  }
};

export default OrderStatusHistory;

