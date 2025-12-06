import db from "../db.js";

const Messages = {

  // Send / insert message
  send: (chat_id, sender_type, sender_id, message, callback) => {
    const sql = `
      INSERT INTO messages (chat_id, sender_type, sender_id, message)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [chat_id, sender_type, sender_id, message], callback);
  },

  // Get all messages of one chat
  getByChat: (chat_id, callback) => {
    const sql = `
      SELECT * FROM messages
      WHERE chat_id = ?
      ORDER BY id ASC
    `;
    db.query(sql, [chat_id], callback);
  },

  // Get last message (for chat previews)
  getLastMessage: (chat_id, callback) => {
    const sql = `
      SELECT * FROM messages
      WHERE chat_id = ?
      ORDER BY id DESC
      LIMIT 1
    `;
    db.query(sql, [chat_id], callback);
  }
};

export default Messages;
