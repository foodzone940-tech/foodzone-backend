import db from "../config/db.js";


const InventoryStock = {

  // Add or update stock for a product
  upsertStock: (product_id, quantity, callback) => {
    const sql = `
      INSERT INTO inventory_stock (product_id, quantity, updated_at)
      VALUES (?, ?, NOW())
      ON DUPLICATE KEY UPDATE 
      quantity = VALUES(quantity),
      updated_at = NOW()
    `;
    db.query(sql, [product_id, quantity], callback);
  },

  // Get stock of a product
  getByProduct: (product_id, callback) => {
    const sql = `
      SELECT * FROM inventory_stock 
      WHERE product_id = ?
    `;
    db.query(sql, [product_id], callback);
  },

  // Reduce stock (during order)
  reduceStock: (product_id, qty, callback) => {
    const sql = `
      UPDATE inventory_stock 
      SET quantity = quantity - ?
      WHERE product_id = ? AND quantity >= ?
    `;
    db.query(sql, [qty, product_id, qty], callback);
  }
};

export default InventoryStock;

