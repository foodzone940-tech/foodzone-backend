import db from "../db.js";

// Add to Favorites
export const addFavorite = (req, res) => {
    const { user_id, product_id } = req.body;

    if (!user_id || !product_id) {
        return res.status(400).json({
            success: false,
            message: "user_id and product_id required"
        });
    }

    const checkSql = "SELECT * FROM favorites WHERE user_id=? AND product_id=?";

    db.query(checkSql, [user_id, product_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error: err });
        }

        if (result.length > 0) {
            return res.status(200).json({
                success: true,
                message: "Already in favorites"
            });
        }

        const insertSql =
            "INSERT INTO favorites (user_id, product_id) VALUES (?,?)";

        db.query(insertSql, [user_id, product_id], (err) => {
            if (err) {
                return res.status(500).json({ success: false, error: err });
            }

            return res.status(200).json({
                success: true,
                message: "Added to favorites"
            });
        });
    });
};

// Remove from favorites
export const removeFavorite = (req, res) => {
    const { user_id, product_id } = req.body;

    const sql = "DELETE FROM favorites WHERE user_id=? AND product_id=?";

    db.query(sql, [user_id, product_id], (err) => {
        if (err) {
            return res.status(500).json({ success: false, error: err });
        }

        return res.status(200).json({
            success: true,
            message: "Removed from favorites"
        });
    });
};

// Get all favorites of a user
export const getFavorites = (req, res) => {
    const { user_id } = req.params;

    const sql = `
        SELECT 
            favorites.id,
            products.id AS product_id,
            products.name,
            products.price,
            products.image
        FROM favorites
        INNER JOIN products ON favorites.product_id = products.id
        WHERE favorites.user_id = ?
    `;

    db.query(sql, [user_id], (err, result) => {
        if (err) {
            return res.status(500).json({ success: false, error: err });
        }

        return res.status(200).json({
            success: true,
            data: result
        });
    });
};
