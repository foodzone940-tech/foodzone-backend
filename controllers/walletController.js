import db from "../db.js";

// Get Wallet Balance
export const getWalletBalance = (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT balance FROM wallet WHERE user_id = ? LIMIT 1";

    db.query(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0) {
            return res.json({ success: true, balance: 0 });
        }

        return res.json({
            success: true,
            balance: rows[0].balance
        });
    });
};

// Add Money to Wallet
export const addWalletBalance = (req, res) => {
    const { user_id, amount, method } = req.body;

    if (!user_id || !amount) {
        return res.status(400).json({ message: "Missing fields" });
    }

    // Add balance
    const sql = `
        INSERT INTO wallet_transactions (user_id, amount, type, method)
        VALUES (?, ?, 'credit', ?)
    `;

    db.query(sql, [user_id, amount, method || "manual"], (err) => {
        if (err) return res.status(500).json({ error: err });

        const updateWallet = `
            UPDATE wallet 
            SET balance = balance + ? 
            WHERE user_id = ?
        `;

        db.query(updateWallet, [amount, user_id], (err2) => {
            if (err2) return res.status(500).json({ error: err2 });

            return res.json({
                success: true,
                message: "Amount added to wallet",
                amount
            });
        });
    });
};

// Deduct Money from Wallet
export const deductWalletBalance = (req, res) => {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const checkBalance = "SELECT balance FROM wallet WHERE user_id = ?";
