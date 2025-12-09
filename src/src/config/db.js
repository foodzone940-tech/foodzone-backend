import mysql from "mysql2/promise";

// ⭐ FINAL Hostinger MySQL Connection (100% Correct)
const db = mysql.createPool({
  host: "srv875.hstgr.io",
  user: "u816290961_foodzone_admin",
  password: "Tsamir1985",
  database: "u816290961_foodzone_db",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// ⭐ Check Connection
(async () => {
  try {
    const conn = await db.getConnection();
    console.log("✅ MySQL Connected Successfully (Hostinger)");
    conn.release();
  } catch (err) {
    console.error("❌ MySQL Connection Failed:", err);
  }
})();

export default db;
