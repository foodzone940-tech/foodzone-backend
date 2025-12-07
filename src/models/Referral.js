import db from "../db.js";

const ReferralRewards = {

  // Add referral reward entry
  create: (referrer_id, referred_user_id, reward_amount, callback) => {
    const sql = `
      INSERT INTO ReferralRewards
      (referrer_id, referred_user_id, reward_amount, reward_status)
      VALUES (?, ?, ?, 'pending')
    `;
    db.query(sql, [referrer_id, referred_user_id, reward_amount], callback);
  },

  // Get all rewards for a user
  getByReferrer: (referrer_id, callback) => {
    const sql = `
      SELECT *
      FROM ReferralRewards
      WHERE referrer_id = ?
      ORDER BY id DESC
    `;
    db.query(sql, [referrer_id], callback);
  },

  // Update reward status
  updateStatus: (id, reward_status, callback) => {
    const sql = `
      UPDATE ReferralRewards
      SET reward_status = ?
      WHERE id = ?
    `;
    db.query(sql, [reward_status, id], callback);
  }
};

export default ReferralRewards;
