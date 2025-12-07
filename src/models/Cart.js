// models/Cart.js

export const createCartTable = `
CREATE TABLE IF NOT EXISTS Cart (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  product_id INT,
  quantity INT DEFAULT 1
);
`;
