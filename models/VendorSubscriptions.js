import db from "../db.js";

const VendorSubscriptions = {

  // Create vendor subscription plan
  create: (vendor_id, plan_name, amount, start_date, end_date, status, callback) => {
    const sql = `
      INSERT INTO vendor_subscriptions
      (vendor_id, plan_name, amount, start_date, end_date, status)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [vendor_id, plan_name, amount, start_date, end_date, status],
      callback
    );
  },

  // Get subscription of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_subscriptions
      WHERE vendor_id = ?
      ORDER BY id DESC
      LIMIT 1
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update subscription status (active/expired)
  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE vendor_subscriptions
      SET status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, id], callback);
  },

  // Get all active subscriptions
  getActive: (callback) => {
    const sql = `
      SELECT * FROM vendor_subscriptions
      WHERE status = 'active'
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  }
};

export default VendorSubscriptions;
