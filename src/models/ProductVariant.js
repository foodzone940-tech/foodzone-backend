import db from "../db.js";

const ProductVariant = {
  
  // Add new variant
  create: (product_id, variant_name, price, stock, callback) => {
    const sql = `
      INSERT INTO product_variants (product_id, variant_name, price, stock)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [product_id, variant_name, price, stock], callback);
  },

  // Get all variants of a product
  getByProduct: (product_id, callback) => {
    const sql = `
      SELECT * FROM product_variants 
      WHERE product_id = ? 
      ORDER BY id DESC
    `;
    db.query(sql, [product_id], callback);
  },

  // Update variant
  update: (id, variant_name, price, stock, callback) => {
    const sql = `
      UPDATE product_variants 
      SET variant_name = ?, price = ?, stock = ? 
      WHERE id = ?
    `;
    db.query(sql, [variant_name, price, stock, id], callback);
  },

  // Delete variant
  delete: (id, callback) => {
    const sql = `DELETE FROM product_variants WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

export default ProductVariant;
