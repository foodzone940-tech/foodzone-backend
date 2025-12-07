import db from "../db.js";

const DeliveryZones = {

  // Add a new delivery zone
  create: (zone_name, pincode, is_active, callback) => {
    const sql = `
      INSERT INTO delivery_zones (zone_name, pincode, is_active)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [zone_name, pincode, is_active], callback);
  },

  // Get all delivery zones
  getAll: (callback) => {
    const sql = `
      SELECT * FROM delivery_zones
      ORDER BY id DESC
    `;
    db.query(sql, callback);
  },

  // Check if a pincode is allowed
  checkZone: (pincode, callback) => {
    const sql = `
      SELECT * FROM delivery_zones
      WHERE pincode = ? AND is_active = 1
    `;
    db.query(sql, [pincode], callback);
  },

  // Update a delivery zone
  update: (id, zone_name, pincode, is_active, callback) => {
    const sql = `
      UPDATE delivery_zones
      SET zone_name = ?, pincode = ?, is_active = ?
      WHERE id = ?
    `;
    db.query(sql, [zone_name, pincode, is_active, id], callback);
  },

  // Delete zone
  delete: (id, callback) => {
    const sql = `
      DELETE FROM delivery_zones
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default DeliveryZones;
