import db from "../db.js";

// Get App Config
export const getConfig = () => {
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM AppConfig LIMIT 1";

        db.query(sql, (err, rows) => {
            if (err) return reject(err);
            resolve(rows[0] || null);
        });
    });
};

// Update App Config
export const updateConfig = (data) => {
    return new Promise((resolve, reject) => {
        const { app_name, version, maintenance, delivery_radius } = data;

        const sql = `
            UPDATE AppConfig 
            SET 
                app_name = ?, 
                version = ?, 
                maintenance = ?, 
                delivery_radius = ?
            WHERE id = 1
        `;

        db.query(
            sql,
            [app_name, version, maintenance, delivery_radius],
            (err, result) => {
                if (err) return reject(err);
                resolve(result);
            }
        );
    });
};
