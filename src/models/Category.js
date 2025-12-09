
import db from "../config/db.js";

const Category = {
  
  // Add new category
  create: (name, image, callback) => {
    const sql = `
      INSERT INTO categories (name, image)
      VALUES (?, ?)
    `;
    db.query(sql, [name, image], callback);
  },

  // Get all categories
  getAll: (callback) => {
    const sql = `SELECT * FROM categories ORDER BY id DESC`;
    db.query(sql, callback);
  },

  // Get category by ID
  getById: (id, callback) => {
    const sql = `SELECT * FROM categories WHERE id = ?`;
    db.query(sql, [id], callback);
  },

  // Update category
  update: (id, name, image, callback) => {
    const sql = `
      UPDATE categories 
      SET name = ?, image = ? 
      WHERE id = ?
    `;
    db.query(sql, [name, image, id], callback);
  },

  // Delete category
  delete: (id, callback) => {
    const sql = `DELETE FROM categories WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

export default Category;

