import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();

const db = mysql.createPool({
  host: process.env.DB_HOST,        // Hostinger MySQL Host
  user: process.env.DB_USER,        // Your DB Username
  password: process.env.DB_PASS,    // Your DB Password
  database: process.env.DB_NAME,    // Your DB Name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// Test Connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log(" MySQL Connected Successfully");
    conn.release();
  } catch (error) {
    console.error(" MySQL Connection Failed:", error.message);
  }
})();

export default db;
