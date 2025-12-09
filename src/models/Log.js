// models/Log.js

import db from "../config/db.js";   // ✔ IMPORTANT

export const createLogTable = `
CREATE TABLE IF NOT EXISTS Logs (
  id INT PRIMARY KEY AUTO_INCREMENT,
  type VARCHAR(50),
  message TEXT,
  metadata TEXT,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
`;
