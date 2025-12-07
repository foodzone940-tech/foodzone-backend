import db from "../db.js";

const Chat = {

  // Create new chat session
  create: (user_id, vendor_id, admin_id, callback) => {
    const sql = `
      INSERT INTO Chat (user_id, vendor_id, admin_id)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [user_id, vendor_id, admin_id], callback);
  },

  // Get chat by ID
  getById: (id, callback) => {
    const sql = `
      SELECT * FROM Chat
      WHERE id = ?
      LIMIT 1
    `;
    db.query(sql, [id], callback);
  },

  // Get all chats of a user
  getByUser: (user_id, callback) => {
    const sql = `
      SELECT * FROM Chat
      WHERE user_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [user_id], callback);
  },

  // Get all chats of a vendor
  getByVendor: (vendor_id, callback) => {
    const sql = `
      SELECT * FROM Chat
      WHERE vendor_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [vendor_id], callback);
  },

  // Get all chats of admin
  getByAdmin: (admin_id, callback) => {
    const sql = `
      SELECT * FROM Chat
      WHERE admin_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [admin_id], callback);
  }
};

export default Chat;
