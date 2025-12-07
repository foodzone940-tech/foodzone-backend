import mysql from "mysql2";

// MySQL Connection Pool
const db = mysql.createPool({
  host: "srv875.hstgr.io",                         // Hostinger MySQL Host
  user: "u816290961_foodzone_admin",               // Your DB Username
  password: "Tsamir1985",                          // Your DB Password
  database: "u816290961_foodzone_db",              // Your Database Name
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
