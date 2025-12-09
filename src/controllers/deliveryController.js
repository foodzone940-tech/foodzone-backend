import db from "../db.js";

/* ============================================
   ADMIN → ASSIGN DELIVERY BOY TO AN ORDER
============================================ */
export const assignDeliveryBoy = (req, res) => {
    const { order_id, delivery_boy_id } = req.body;

    if (!order_id || !delivery_boy_id) {
        return res.status(400).json({ message: "Order ID and Delivery Boy ID required" });
    }

    const query = `
        UPDATE orders 
        SET delivery_boy_id = ?, delivery_status = 'Assigned' 
        WHERE id = ?
    `;

    db.query(query, [delivery_boy_id, order_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            message: "Delivery boy assigned successfully",
            order_id,
            delivery_boy_id
        });
    });
};



/* ============================================
    DELIVERY BOY → UPDATE DELIVERY STATUS
============================================ */
export const updateDeliveryStatus = (req, res) => {
    const { order_id } = req.params;
    const { status } = req.body; // Picked / On the Way / Delivered

    if (!status) {
        return res.status(400).json({ message: "Status required" });
    }

    const query = `
        UPDATE orders 
        SET delivery_status = ? 
        WHERE id = ?
    `;

    db.query(query, [status, order_id], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            message: "Delivery status updated",
            order_id,
            status
        });
    });
};



/* ============================================
   DELIVERY BOY → GET ALL ASSIGNED ORDERS
============================================ */
export const getDeliveryBoyOrders = (req, res) => {
    const delivery_boy_id = req.user.id; // authMiddleware injects user

    const query = `
        SELECT * FROM orders 
        WHERE delivery_boy_id = ?
        ORDER BY id DESC
    `;

    db.query(query, [delivery_boy_id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        res.json({
            message: "Assigned orders fetched",
            orders: rows
        });
    });
};



/* ============================================
   DELIVERY BOY → GET SINGLE ORDER DETAIL
============================================ */
export const getSingleDeliveryOrder = (req, res) => {
    const { order_id } = req.params;

    const query = `
        SELECT * FROM orders 
        WHERE id = ?
        LIMIT 1
    `;

    db.query(query, [order_id], (err, rows) => {
        if (err) {
            console.log(err);
            return res.status(500).json({ message: "Database error" });
        }

        if (rows.length === 0) {
            return res.status(404).json({ message: "Order not found" });
        }

        res.json({
            message: "Order details fetched",
            order: rows[0]
        });
    });
};


export default {
    assignDeliveryBoy,
    updateDeliveryStatus,
    getDeliveryBoyOrders,
    getSingleDeliveryOrder
};
