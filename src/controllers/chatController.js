import db from "../config/db.js";


// -----------------------------------
// Start Chat (User ↔ Vendor)
// -----------------------------------
export const startChat = (req, res) => {
  const { user_id, vendor_id } = req.body;

  if (!user_id || !vendor_id) {
    return res.status(400).json({
      success: false,
      message: "user_id and vendor_id required"
    });
  }

  // Check if chat already exists
  const checkChat = `
    SELECT * FROM Chat
    WHERE user_id = ? AND vendor_id = ?
    LIMIT 1
  `;

  db.query(checkChat, [user_id, vendor_id], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err });

    // Chat already exists
    if (rows.length > 0) {
      return res.status(200).json({
        success: true,
        chat_id: rows[0].id,
        message: "Chat already exists"
      });
    }

    // Create new chat
    const createChat = `
      INSERT INTO Chat (user_id, vendor_id, admin_id)
      VALUES (?, ?, NULL)
    `;

    db.query(createChat, [user_id, vendor_id], (err2, result) => {
      if (err2) return res.status(500).json({ success: false, error: err2 });

      return res.status(200).json({
        success: true,
        chat_id: result.insertId,
        message: "New chat created"
      });
    });
  });
};

// -----------------------------------
// Send Message
// -----------------------------------
export const sendMessage = (req, res) => {
  const { chat_id, sender_type, sender_id, message } = req.body;

  if (!chat_id || !sender_type || !sender_id || !message) {
    return res.status(400).json({
      success: false,
      message: "chat_id, sender_type, sender_id, message required"
    });
  }

  const sql = `
    INSERT INTO messages (chat_id, sender_type, sender_id, message)
    VALUES (?, ?, ?, ?)
  `;

  db.query(sql, [chat_id, sender_type, sender_id, message], (err) => {
    if (err) return res.status(500).json({ success: false, error: err });

    return res.status(200).json({
      success: true,
      message: "Message sent"
    });
  });
};

// -----------------------------------
// Get Messages of a Chat
// -----------------------------------
export const getMessages = (req, res) => {
  const { chat_id } = req.params;

  const sql = `
    SELECT * FROM messages
    WHERE chat_id = ?
    ORDER BY id ASC
  `;

  db.query(sql, [chat_id], (err, rows) => {
    if (err) return res.status(500).json({ success: false, error: err });

    return res.status(200).json({
      success: true,
      messages: rows
    });
  });
};

