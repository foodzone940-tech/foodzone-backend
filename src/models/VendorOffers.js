import db from "../db.js";

const VendorOffers = {

  // Create a vendor offer
  create: (vendor_id, title, discount_percent, min_order_amount, start_date, end_date, is_active, callback) => {
    const sql = `
      INSERT INTO vendor_offers
      (vendor_id, title, discount_percent, min_order_amount, start_date, end_date, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [vendor_id, title, discount_percent, min_order_amount, start_date, end_date, is_active],
      callback
    );
  },

  // Get offers of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_offers
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Get all active offers
  getActiveOffers: (callback) => {
    const sql = `
      SELECT * FROM vendor_offers
      WHERE is_active = 1
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  },

  // Update vendor offer
  update: (id, title, discount_percent, min_order_amount, start_date, end_date, is_active, callback) => {
    const sql = `
      UPDATE vendor_offers
      SET title = ?, discount_percent = ?, min_order_amount = ?, start_date = ?, end_date = ?, is_active = ?
      WHERE id = ?
    `;
    db.query(
      sql,
      [title, discount_percent, min_order_amount, start_date, end_date, is_active, id],
      callback
    );
  },

  // Delete offer
  delete: (id, callback) => {
    const sql = `
      DELETE FROM vendor_offers
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default VendorOffers;
