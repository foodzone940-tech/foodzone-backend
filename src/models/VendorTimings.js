import db from "../db.js";

const VendorTimings = {

  // Add vendor timing
  create: (vendor_id, day, open_time, close_time, is_closed, callback) => {
    const sql = `
      INSERT INTO vendor_timings
      (vendor_id, day, open_time, close_time, is_closed)
      VALUES (?, ?, ?, ?, ?)
    `;
    db.query(sql, [vendor_id, day, open_time, close_time, is_closed], callback);
  },

  // Get timings of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM vendor_timings
      WHERE vendor_id = ?
      ORDER BY id ASC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Update vendor timing
  update: (id, day, open_time, close_time, is_closed, callback) => {
    const sql = `
      UPDATE vendor_timings
      SET day = ?, open_time = ?, close_time = ?, is_closed = ?
      WHERE id = ?
    `;
    db.query(sql, [day, open_time, close_time, is_closed, id], callback);
  },

  // Delete timing
  delete: (id, callback) => {
    const sql = `
      DELETE FROM vendor_timings
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default VendorTimings;
