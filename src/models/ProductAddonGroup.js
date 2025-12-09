import db from "../config/db.js";

export const createProductAddonGroupTable = `
CREATE TABLE IF NOT EXISTS product_addon_groups (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  group_name VARCHAR(255) NOT NULL,
  is_required BOOLEAN DEFAULT FALSE,
  max_selection INT DEFAULT 1,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
