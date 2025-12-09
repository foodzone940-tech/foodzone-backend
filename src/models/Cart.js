// models/Cart.js

import db from "../config/db.js";   // ✔ MOST IMPORTANT LINE

export const createCartTable = `
CREATE TABLE IF NOT EXISTS Cart (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1
);
`;
