import db from "../config/db.js";

/* ================================
   PLACE NEW ORDER (CUSTOMER)
================================ */
export const placeOrder = async (req, res) => {
  try {
    const user_id = req.user.id;
    const {
      vendor_id,
      items, // [{product_id, qty, price}]
      total_amount,
      address,
      payment_method
    } = req.body;

    if (!vendor_id || !items || items.length === 0) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Insert order
    const orderSql = `
      INSERT INTO orders (user_id, vendor_id, total_amount, address, payment_method, status)
      VALUES (?, ?, ?, ?, ?, 'Placed')
    `;
    const [result] = await db.query(orderSql, [
      user_id,
      vendor_id,
      total_amount,
      address,
      payment_method
    ]);

    const order_id = result.insertId;

    // Insert order items
    const itemSql = `
      INSERT INTO order_items (order_id, product_id, quantity, price)
      VALUES (?, ?, ?, ?)
    `;

    for (const item of items) {
      await db.query(itemSql, [
        order_id,
        item.product_id,
        item.qty,
        item.price
      ]);
    }

    res.json({ message: "Order placed successfully", order_id });

  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Server Error" });
  }
};


/* ================================
   USER — ALL MY ORDERS
================================ */
export const getUserOrders = async (req, res) => {
  try {
    const user_id = req.user.id;

    const [orders] = await db.query(
      "SELECT * FROM orders WHERE user_id = ? ORDER BY id DESC",
      [user_id]
    );

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


/* ================================
   USER — SINGLE ORDER DETAILS
================================ */
export const getOrderDetails = async (req, res) => {
  try {
    const order_id = req.params.id;

    const [order] = await db.query("SELECT * FROM orders WHERE id = ?", [order_id]);

    if (order.length === 0) {
      return res.status(404).json({ error: "Order not found" });
    }

    const [items] = await db.query(
      "SELECT * FROM order_items WHERE order_id = ?",
      [order_id]
    );

    res.json({ order: order[0], items });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


/* ================================
   USER — CANCEL ORDER
================================ */
export const cancelOrder = async (req, res) => {
  try {
    const order_id = req.params.id;

    await db.query(
      "UPDATE orders SET status = 'Cancelled' WHERE id = ?",
      [order_id]
    );

    res.json({ message: "Order cancelled" });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


/* ================================
   VENDOR — ALL ORDERS
================================ */
export const getVendorOrders = async (req, res) => {
  try {
    const vendor_id = req.vendor.id;

    const [orders] = await db.query(
      "SELECT * FROM orders WHERE vendor_id = ? ORDER BY id DESC",
      [vendor_id]
    );

    res.json(orders);

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};


/* ================================
   VENDOR / ADMIN — UPDATE STATUS
================================ */
export const updateOrderStatus = async (req, res) => {
  try {
    const order_id = req.params.id;
    const { status } = req.body;

    await db.query("UPDATE orders SET status = ? WHERE id = ?", [
      status,
      order_id
    ]);

    res.json({ message: "Order status updated" });

  } catch (error) {
    res.status(500).json({ error: "Server Error" });
  }
};
