import db from "../db.js";

// Get App Config
export const getAppConfig = (req, res) => {
    const sql = "SELECT * FROM AppConfig LIMIT 1";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "App settings not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};

// Update App Config
export const updateAppConfig = (req, res) => {
    const { app_name, version, maintenance, delivery_radius } = req.body;

    const sql = `UPDATE AppConfig SET 
        app_name=?, 
        version=?, 
        maintenance=?, 
        delivery_radius=?
        WHERE id=1`;

    db.query(sql, [app_name, version, maintenance, delivery_radius], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                message: "Database error",
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "App settings updated successfully"
        });
    });
};
