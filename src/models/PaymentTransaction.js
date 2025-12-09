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


const PaymentTransaction = {

  // Create new payment transaction
  create: (order_id, user_id, amount, payment_mode, transaction_id, status, callback) => {
    const sql = `
      INSERT INTO payment_transactions 
      (order_id, user_id, amount, payment_mode, transaction_id, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [order_id, user_id, amount, payment_mode, transaction_id, status], callback);
  },

  // Get transaction by order
  getByOrder: (order_id, callback) => {
    const sql = `
      SELECT * FROM payment_transactions
      WHERE order_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [order_id], callback);
  },

  // Update payment status (success / failed / pending)
  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE payment_transactions
      SET status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, id], callback);
  }
};

export default PaymentTransaction;

