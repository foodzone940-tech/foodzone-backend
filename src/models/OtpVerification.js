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


const OtpVerification = {

  // Create new OTP record
  create: (user_id, otp_code, expires_at, callback) => {
    const sql = `
      INSERT INTO otp_verification (user_id, otp_code, expires_at)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [user_id, otp_code, expires_at], callback);
  },

  // Get OTP record by user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM otp_verification
      WHERE user_id = ?
      ORDER BY id DESC
      LIMIT 1
    `;
    db.query(sql, [user_id], callback);
  },

  // Mark OTP as verified
  verify: (id, callback) => {
    const sql = `
      UPDATE otp_verification
      SET verified = 1
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default OtpVerification;

