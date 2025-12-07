import db from "../db.js";

const ProductAddon = {

  // Add new addon
  create: (product_id, addon_name, addon_price, callback) => {
    const sql = `
      INSERT INTO product_addons (product_id, addon_name, addon_price)
      VALUES (?, ?, ?)
    `;
    db.query(sql, [product_id, addon_name, addon_price], callback);
  },

  // Get all addons of a product
  getByProduct: (product_id, callback) => {
    const sql = `
      SELECT * FROM product_addons 
      WHERE product_id = ? 
      ORDERORDER BY id DESC
    `;
    db.query(sql, [product_id], callback);
  },

  // Update addon
  update: (id, addon_name, addon_price, callback) => {
    const sql = `
      UPDATE product_addons 
      SET addon_name = ?, addon_price = ? 
      WHERE id = ?
    `;
    db.query(sql, [addon_name, addon_price, id], callback);
  },

  // Delete addon
  delete: (id, callback) => {
    const sql = `DELETE FROM product_addons WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

export default ProductAddon;
