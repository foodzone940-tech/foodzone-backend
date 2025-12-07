import db from "../db.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

// Generate JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "30d" });
};

// USER REGISTER
export const registerUser = (req, res) => {
  const { name, email, password, phone } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "All fields required" });
  }

  const checkSql = "SELECT * FROM users WHERE email = ?";
  db.query(checkSql, [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const insertSql = `
      INSERT INTO users (name, email, phone, password)
      VALUES (?, ?, ?, ?)
    `;

    db.query(insertSql, [name, email, phone, hashedPassword], (err2, result) => {
      if (err2) return res.status(500).json({ error: err2.message });

      return res.json({
        message: "User registered successfully",
        user_id: result.insertId,
      });
    });
  });
};

// USER LOGIN
export const loginUser = (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and password required" });

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], async (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0)
      return res.status(400).json({ message: "Invalid email" });

    const user = rows[0];

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      return res.status(400).json({ message: "Wrong password" });

    return res.json({
      message: "Login successful",
      token: generateToken(user.id),
      user,
    });
  });
};

// GET USER PROFILE
export const getUserProfile = (req, res) => {
  const user_id = req.user.id;

  const sql = "SELECT id, name, email, phone FROM users WHERE id = ?";

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json(rows[0]);
  });
};

// UPDATE USER PROFILE
export const updateUserProfile = (req, res) => {
  const user_id = req.user.id;
  const { name, phone } = req.body;

  const sql = `
    UPDATE users SET name = ?, phone = ? WHERE id = ?
  `;

  db.query(sql, [name, phone, user_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    return res.json({ message: "Profile updated successfully" });
  });
};

// GET ALL USERS (Admin)
export const getAllUsers = (req, res) => {
  const sql = "SELECT id, name, email, phone FROM users ORDER BY id DESC";

  db.query(sql, (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json(rows);
  });
};

// DELETE USER (Admin)
export const deleteUser = (req, res) => {
  const { id } = req.params;

  const sql = "DELETE FROM users WHERE id = ?";

  db.query(sql, [id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "User deleted successfully" });
  });
};
