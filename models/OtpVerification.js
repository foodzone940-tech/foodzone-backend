import db from "../db.js";

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
