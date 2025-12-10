import db from "../config/db.js";

// =======================
// ADD MONEY TO WALLET
// =======================
export const addMoney = (req, res) => {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const insertTransaction = `
        INSERT INTO wallet_transactions (user_id, amount, type, method)
        VALUES (?, ?, 'credit', 'manual')
    `;

    db.query(insertTransaction, [user_id, amount], (err) => {
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

// =======================
// DEDUCT MONEY FROM WALLET
// =======================
export const deductWalletBalance = (req, res) => {
    const { user_id, amount } = req.body;

    if (!user_id || !amount) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const checkBalance = "SELECT balance FROM wallet WHERE user_id = ?";

    db.query(checkBalance, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0 || rows[0].balance < amount) {
            return res.status(400).json({ message: "Insufficient balance" });
        }

        const insertTransaction = `
            INSERT INTO wallet_transactions (user_id, amount, type, method)
            VALUES (?, ?, 'debit', 'manual')
        `;

        db.query(insertTransaction, [user_id, amount], (err2) => {
            if (err2) return res.status(500).json({ error: err2 });

            const updateWallet = `
                UPDATE wallet 
                SET balance = balance - ? 
                WHERE user_id = ?
            `;

            db.query(updateWallet, [amount, user_id], (err3) => {
                if (err3) return res.status(500).json({ error: err3 });

                return res.json({
                    success: true,
                    message: "Amount deducted from wallet",
                    amount
                });
            });
        });
    });
};

// =======================
// GET WALLET BALANCE
// =======================
export const getWalletBalance = (req, res) => {
    const { user_id } = req.params;

    const sql = "SELECT balance FROM wallet WHERE user_id = ?";

    db.query(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        return res.json({
            success: true,
            balance: rows[0].balance
        });
    });
};
