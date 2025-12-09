import db from "../config/db.js";


// CREATE LOG
export const createLog = (req, res) => {
    const { type, message, metadata } = req.body;

    if (!type || !message) {
        return res.status(400).json({
            success: false,
            message: "type and message are required"
        });
    }

    const sql = "INSERT INTO logs (type, message, metadata) VALUES (?,?,?)";

    db.query(sql, [type, message, metadata || null], (err) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            message: "Log saved successfully"
        });
    });
};

// GET ALL LOGS
export const getLogs = (req, res) => {
    const sql = "SELECT * FROM logs ORDER BY id DESC";

    db.query(sql, (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    });
};

// GET LOG BY ID
export const getLogById = (req, res) => {
    const { id } = req.params;

    const sql = "SELECT * FROM logs WHERE id=?";

    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.status(500).json({
                success: false,
                error: err
            });
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Log not found"
            });
        }

        return res.status(200).json({
            success: true,
            data: result[0]
        });
    });
};

