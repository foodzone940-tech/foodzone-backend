import db from "../config/db.js";

// =======================
// GET WALLET BALANCE
// =======================
export const getWalletBalance = (req, res) => {
    const user_id = req.user?.id || req.params.user_id;

    if (!user_id) {
        return res.status(400).json({ message: "User ID missing" });
    }

    const sql = "SELECT balance FROM wallet WHERE user_id = ?";

    db.query(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        if (rows.length === 0) {
            return res.status(404).json({ message: "Wallet not found" });
        }

        res.json({
            success: true,
            balance: rows[0].balance
        });
    });
};

// =======================
// ADD MONEY TO WALLET
// =======================
export const addMoney = (req, res) => {
    const { amount } = req.body;
    const user_id = req.user.id;

    if (!amount || !user_id) {
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

            res.json({
                success: true,
                message: "Amount added successfully",
                amount
            });
        });
    });
};

// =======================
// DEDUCT MONEY FROM WALLET
// =======================
export const deductWalletBalance = (req, res) => {
    const { amount } = req.body;
    const user_id = req.user.id;

    if (!amount || !user_id) {
        return res.status(400).json({ message: "Missing fields" });
    }

    const checkBalance = "SELECT balance FROM wallet WHERE user_id = ?";

    db.query(checkBalance, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        const balance = rows[0]?.balance || 0;

        if (balance < amount) {
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

                res.json({
                    success: true,
                    message: "Amount deducted successfully",
                    amount
                });
            });
        });
    });
};

// =======================
// WALLET TRANSACTION HISTORY
// =======================
export const walletHistory = (req, res) => {
    const user_id = req.user.id;

    const sql = `
        SELECT * FROM wallet_transactions
        WHERE user_id = ?
        ORDER BY id DESC
    `;

    db.query(sql, [user_id], (err, rows) => {
        if (err) return res.status(500).json({ error: err });

        res.json({
            success: true,
            history: rows
        });
    });
};
