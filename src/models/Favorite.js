// models/Favorite.js
import db from "../config/db.js";


export const createFavoriteTable = `
CREATE TABLE IF NOT EXISTS Favorite (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;

