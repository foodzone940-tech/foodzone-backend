import mysql from "mysql2";

// MySQL Connection Pool
const db = mysql.createPool({
  host: process.env.DB_HOST || "srv875.hstgr.io",                         // Hostinger MySQL Host
  user: process.env.DB_USER || "u816290961_foodzone_admin",               // Your DB Username
  password: process.env.DB_PASS || "Tsamir1985",                          // Your DB Password
  database: process.env.DB_NAME || "u816290961_foodzone_db",              // Your Database Name
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Test Database Connection
db.getConnection((err, connection) => {
  if (err) {
    console.error("❌ Database Connection Failed:", err.message);
  } else {
    console.log("✅ MySQL Connected Successfully");
    connection.release();
  }
});

export default db;
