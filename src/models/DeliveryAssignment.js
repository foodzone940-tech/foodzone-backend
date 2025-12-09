import db from "../config/db.js";


const DeliveryAssignment = {

  // Assign order to a delivery partner (vendor or delivery boy)
  create: (order_id, vendor_id, callback) => {
    const sql = `
      INSERT INTO delivery_assignments (order_id, vendor_id, assigned_at)
      VALUES (?, ?, NOW())
    `;
    db.query(sql, [order_id, vendor_id], callback);
  },

  // Get assignment by order
  getByOrder: (order_id, callback) => {
    const sql = `
      SELECT da.*, v.vendor_name
      FROM delivery_assignments da
      LEFT JOIN vendors v ON da.vendor_id = v.id
      WHERE da.order_id = ?
      ORDER BY da.id DESC
    `;
    db.query(sql, [order_id], callback);
  },

  // Update assignment status (assigned / delivered / cancelled)
  updateStatus: (id, status, callback) => {
    const sql = `
      UPDATE delivery_assignments
      SET status = ?
      WHERE id = ?
    `;
    db.query(sql, [status, id], callback);
  }
};

export default DeliveryAssignment;

