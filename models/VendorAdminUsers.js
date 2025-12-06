import db from "../db.js";

const VendorAdminUsers = {

  // Create vendor admin user
  create: (vendor_id, name, email, password, role, is_active, callback) => {
    const sql = `
      INSERT INTO vendor_admin_users
      (vendor_id, name, email, password, role, is_active)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(sql, [vendor_id, name, email, password, role, is_active], callback);
  },

  // Vendor admin login
  login: (email, callback) => {
    const sql = `
      SELECT * FROM vendor_admin_users
      WHERE email = ?
      LIMIT 1
    `;
    db.query(sql, [email], callback);
  },

  // Get admins under a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_admin_users
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update vendor admin status
  updateStatus: (id, is_active, callback) => {
    const sql = `
      UPDATE vendor_admin_users
      SET is_active = ?
      WHERE id = ?
    `;
    db.query(sql, [is_active, id], callback);
  }
};

export default VendorAdminUsers;
