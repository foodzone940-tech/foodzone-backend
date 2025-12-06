// models/Wallet.js

export const createWalletTable = `
CREATE TABLE IF NOT EXISTS Wallet (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  balance DECIMAL(10,2) DEFAULT 0,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
`;
