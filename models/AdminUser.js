import db from "../db.js";

const AdminUser = {

  // Create admin user
  create: (name, email, password, role, is_active, callback) => {
    const sql = `
      INSERT INTO admin_users (name, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [name, email, password, role, is_active], callback);
  },

  // Admin login
  login: (email, callback) => {
    const sql = `
      SELECT * FROM admin_users
      WHERE email = ?
      LIMIT 1
    `;
    db.query(sql, [email], callback);
  },

  // Get all admin users
  getAll: (callback) => {
    const sql = `
      SELECT * FROM admin_users
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  },

  // Update admin status
  updateStatus: (id, is_active, callback) => {
    const sql = `
      UPDATE admin_users
      SET is_active = ?
      WHERE id = ?
    `;
    db.query(sql, [is_active, id], callback);
  }
};

export default AdminUser;
