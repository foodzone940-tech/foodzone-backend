import db from "../config/db.js";


const ReviewsRatings = {

  // Add a review
  create: (user_id, product_id, rating, review_text, callback) => {
    const sql = `
      INSERT INTO reviews_ratings (user_id, product_id, rating, review_text)
      VALUES (?, ?, ?, ?)
    `;
    db.query(sql, [user_id, product_id, rating, review_text], callback);
  },

  // Get all reviews of a product
  getByProduct: (product_id, callback) => {
    const sql = `
      SELECT rr.*, u.name AS user_name
      FROM reviews_ratings rr
      LEFT JOIN users u ON rr.user_id = u.id
      WHERE rr.product_id = ?
      ORDER BY rr.id DESC
    `;
    db.query(sql, [product_id], callback);
  },

  // Update a review
  update: (id, rating, review_text, callback) => {
    const sql = `
      UPDATE reviews_ratings
      SET rating = ?, review_text = ?
      WHERE id = ?
    `;
    db.query(sql, [rating, review_text, id], callback);
  },

  // Delete a review
  delete: (id, callback) => {
    const sql = `DELETE FROM reviews_ratings WHERE id = ?`;
    db.query(sql, [id], callback);
  }
};

export default ReviewsRatings;

