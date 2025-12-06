import db from "../db.js";

const RefundHistory = {

  // Create refund record
  create: (order_id, user_id, payment_id, refund_amount, reason, callback) => {
    const sql = `
      INSERT INTO refund_history 
      (order_id, user_id, payment_id, refund_amount, reason)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [order_id, user_id, payment_id, refund_amount, reason], callback);
  },

  // Get all refunds of a user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM refund_history
      WHERE user_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [user_id], callback);
  },

  // Get refund by order
  getByOrder: (order_id, callback) => {
    const sql = `
      SELECT * FROM refund_history
      WHERE order_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [order_id], callback);
  }
};

export default RefundHistory;
