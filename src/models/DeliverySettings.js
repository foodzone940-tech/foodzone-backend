import db from "../db.js";

const DeliverySettings = {

  // Create default delivery settings
  create: (base_km, base_charge, extra_charge, callback) => {
    const sql = `
      INSERT INTO delivery_settings (base_km, base_charge, extra_charge)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [base_km, base_charge, extra_charge], callback);
  },

  // Get current delivery settings
  get: (callback) => {
    const sql = `
      SELECT * FROM delivery_settings
      ORDER BY id DESC
      LIMIT 1
    `;
    db.query(sql, callback);
  },

  // Update delivery settings (admin panel)
  update: (id, base_km, base_charge, extra_charge, callback) => {
    const sql = `
      UPDATE delivery_settings
      SET base_km = ?, base_charge = ?, extra_charge = ?
      WHERE id = ?
    `;
    db.query(sql, [base_km, base_charge, extra_charge, id], callback);
  }
};

export default DeliverySettings;
