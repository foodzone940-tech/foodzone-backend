import db from "../config/db.js";


const UserAddress = {

  // Add new user address
  create: (user_id, address_line, city, state, pincode, landmark, latitude, longitude, is_default, callback) => {
    const sql = `
      INSERT INTO user_addresses 
      (user_id, address_line, city, state, pincode, landmark, latitude, longitude, is_default)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    db.query(
      sql,
      [user_id, address_line, city, state, pincode, landmark, latitude, longitude, is_default],
      callback
    );
  },

  // Get all addresses of a user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM user_addresses
      WHERE user_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [user_id], callback);
  },

  // Set default address
  setDefault: (user_id, address_id, callback) => {
    const unsetDefault = `
      UPDATE user_addresses
      SET is_default = 0
      WHERE user_id = ?
    `;
    const setDefault = `
      UPDATE user_addresses
      SET is_default = 1
      WHERE id = ? AND user_id = ?
    `;

    db.query(unsetDefault, [user_id], () => {
      db.query(setDefault, [address_id, user_id], callback);
    });
  },

  // Delete address
  delete: (id, callback) => {
    const sql = `
      DELETE FROM user_addresses
      WHERE id = ?
    `;
    db.query(sql, [id], callback);
  }
};

export default UserAddress;

