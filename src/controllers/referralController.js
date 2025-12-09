import db from "../config/db.js";

import ReferralRewards from "../models/Referral.js";

// Generate random referral code
function generateReferralCode() {
  return Math.random().toString(36).substring(2, 10).toUpperCase();
}

// --------------------------------------------------
// 1) Generate Referral Code for a User
// --------------------------------------------------
export const generateReferral = (req, res) => {
  const { user_id } = req.body;

  if (!user_id) {
    return res.status(400).json({ message: "user_id required" });
  }

  const referral_code = generateReferralCode();

  const sql = `
    INSERT INTO referral_codes (user_id, referral_code, used)
    VALUES (?, ?, 0)
  `;

  db.query(sql, [user_id, referral_code], (err) => {
    if (err) return res.status(500).json({ message: "Error creating referral", err });

    return res.json({
      message: "Referral code generated successfully",
      referral_code,
    });
  });
};

// --------------------------------------------------
// 2) Apply Referral Code
// --------------------------------------------------
export const applyReferral = (req, res) => {
  const { referral_code, new_user_id } = req.body;

  if (!referral_code || !new_user_id) {
    return res.status(400).json({ message: "Missing fields" });
  }

  const checkSql = `
    SELECT * FROM referral_codes
    WHERE referral_code = ? AND used = 0
    LIMIT 1
  `;

  db.query(checkSql, [referral_code], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error checking code", err });

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or already used referral code" });
    }

    const referrer_id = rows[0].user_id;

    const updateSql = `
      UPDATE referral_codes
      SET used = 1, referred_user_id = ?
      WHERE referral_code = ?
    `;

    db.query(updateSql, [new_user_id, referral_code], (err2) => {
      if (err2) return res.status(500).json({ message: "Failed to update referral", err2 });

      ReferralRewards.create(referrer_id, new_user_id, 20.00, () => {
        return res.json({
          message: "Referral applied successfully",
          reward_amount: 20.00,
        });
      });
    });
  });
};

// --------------------------------------------------
// 3) Get Referral Rewards
// --------------------------------------------------
export const getReferralRewards = (req, res) => {
  const { user_id } = req.params;

  const sql = `
    SELECT * FROM referral_rewards
    WHERE referrer_user_id = ?
  `;

  db.query(sql, [user_id], (err, rows) => {
    if (err) return res.status(500).json({ message: "Error fetching rewards", err });

    return res.json({
      total_rewards: rows.length,
      rewards: rows,
    });
  });
};

