import db from "../db.js";

const VendorCategories = {

  // Assign category to vendor
  create: (vendor_id, category_name, is_active, callback) => {
    const sql = `
      INSERT INTO vendor_categories (vendor_id, category_name, is_active)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [vendor_id, category_name, is_active], callback);
  },

  // Get categories of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_categories
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Get all vendor categories
  getAll: (callback) => {
    const sql = `
      SELECT * FROM vendor_categories
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  },

  // Update vendor category
  update: (id, category_name, is_active, callback) => {
    const sql = `
      UPDATE vendor_categories
      SET category_name = ?, is_active = ?
      WHERE id = ?
    `;
    db.query(sql, [category_name, is_active, id], callback);
  }
};

export default VendorCategories;
