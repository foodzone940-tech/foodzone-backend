import db from "../db.js";

const ErrorLog = {

  // Save error log
  create: (error_message, file_name, line_no, callback) => {
    const sql = `
      INSERT INTO error_logs (error_message, file_name, line_no)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [error_message, file_name, line_no], callback);
  },

  // Get all error logs
  getAll: (callback) => {
    const sql = `
      SELECT * FROM error_logs
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  },

  // Delete a log
  delete: (id, callback) => {
    const sql = `
      DELETE FROM error_logs
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default ErrorLog;
