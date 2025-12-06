import db from "../db.js";

// ADD item to cart
export const addToCart = (req, res) => {
    const { user_id, product_id, quantity } = req.body;

    if (!user_id || !product_id || !quantity) {
        return res.status(400).json({
            success: false,
            message: "Missing required fields"
        });
    }

    // Check if product already exists in cart
    const checkSql = "SELECT * FROM Cart WHERE user_id=? AND product_id=?";
    db.query(checkSql, [user_id, product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "DB error" });
        }

        if (result.length > 0) {
            // Update quantity
            const updateSql = "UPDATE Cart SET quantity = quantity + ? WHERE user_id=? AND product_id=?";
            db.query(updateSql, [quantity, user_id, product_id], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB error" });

                return res.status(200).json({
                    success: true,
                    message: "Cart updated successfully"
                });
            });
        } else {
            // Insert new item
            const insertSql = "INSERT INTO Cart (user_id, product_id, quantity) VALUES (?,?,?)";
            db.query(insertSql, [user_id, product_id, quantity], (err) => {
                if (err) return res.status(500).json({ success: false, message: "DB error" });

                return res.status(200).json({
                    success: true,
                    message: "Item added to cart"
                });
            });
        }
    });
};

// GET user cart
export const getCart = (req, res) => {
    const { user_id } = req.params;

    const sql = `
        SELECT 
            Cart.id,
            Cart.quantity,
            Products.id AS product_id,
            Products.name,
            Products.price,
            Products.image
        FROM Cart
        INNER JOIN Products ON Cart.product_id = Products.id
        WHERE Cart.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, message: "DB error" });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    });
};

// DELETE item from cart
export const deleteCartItem = (req, res) => {
    const { id } = req.params;

    const sql = "DELETE FROM Cart WHERE id=?";
    db.query(sql, [id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "DB error" });
        }

        return res.status(200).json({
            success: true,
            message: "Item removed from cart"
        });
    });
};

// CLEAR user cart
export const clearCart = (req, res) => {
    const { user_id } = req.params;

    const sql = "DELETE FROM Cart WHERE user_id=?";
    db.query(sql, [user_id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, message: "DB error" });
        }

        return res.status(200).json({
            success: true,
            message: "Cart cleared"
        });
    });
};
