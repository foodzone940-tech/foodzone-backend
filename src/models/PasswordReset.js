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


const PasswordReset = {

  // Create reset token
  create: (user_id, reset_token, expires_at, callback) => {
    const sql = `
      INSERT INTO password_resets (user_id, reset_token, expires_at)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [user_id, reset_token, expires_at], callback);
  },

  // Get latest token of a user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM password_resets
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `;
    db.query(sql, [user_id], callback);
  },

  // Mark token as used
  markUsed: (id, callback) => {
    const sql = `
      UPDATE password_resets
      SET used = 1
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default PasswordReset;

