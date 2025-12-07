import db from "../config/db.js";

/* ======================================================
   USER: Upload Payment Details (Paytm / PhonePe / GPay / COD)
======================================================*/
export const uploadPayment = (req, res) => {
  const user_id = req.user.id;
  const { order_id, payment_method, upi_id, transaction_id, amount } = req.body;

  if (!order_id || !payment_method) {
    return res.status(400).json({ error: "order_id & payment_method required" });
  }

  const sql = `
    INSERT INTO payment_screenshots 
    (order_id, payment_method, upi_id, transaction_id, amount, status, uploaded_at) 
    VALUES (?, ?, ?, ?, ?, 'pending', NOW())
  `;

  db.query(
    sql,
    [order_id, payment_method, upi_id || null, transaction_id || null, amount || 0],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });

      res.json({
        message: "Payment submitted successfully",
        payment_id: result.insertId,
      });
    }
  );
};


/* ======================================================
   USER: Check Payment Status
======================================================*/
export const getPaymentStatus = (req, res) => {
  const { order_id } = req.params;

  const sql = `
    SELECT * FROM payment_screenshots
    WHERE order_id = ?
    ORDER BY id DESC LIMIT 1
  `;

  db.query(sql, [order_id], (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });

    if (rows.length === 0) {
      return res.json({ message: "No payment record found" });
    }

    res.json(rows[0]);
  });
};


/* ======================================================
   ADMIN: Update Payment Status (pending/verified/rejected)
======================================================*/
export const updatePaymentStatus = (req, res) => {
  const { payment_id } = req.params;
  const { status } = req.body;

  if (!["pending", "verified", "rejected"].includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const sql = `
    UPDATE payment_screenshots 
    SET status = ? 
    WHERE id = ?
  `;

  db.query(sql, [status, payment_id], (err) => {
    if (err) return res.status(500).json({ error: err.message });

    res.json({ message: "Payment status updated successfully" });
  });
};
