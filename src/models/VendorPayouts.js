import db from "../db.js";

const VendorPayouts = {

  // Create payout entry
  create: (vendor_id, payout_amount, payout_method, transaction_id, status, callback) => {
    const sql = `
      INSERT INTO vendor_payouts
      (vendor_id, payout_amount, payout_method, transaction_id, status)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [vendor_id, payout_amount, payout_method, transaction_id, status], callback);
  },

  // Get payouts of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_payouts
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update payout status
  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE vendor_payouts
      SET status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, id], callback);
  },

  // Get all payouts (admin view)
  getAll: (callback) => {
    const sql = `
      SELECT vp.*, v.vendor_name 
      FROM vendor_payouts vp
      LEFT JOIN vendors v ON vp.vendor_id = v.id
      ORDER BY vp.id DESC
    `;
    db.query(sql, callback);
  }
};

export default VendorPayouts;
