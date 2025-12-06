import jwt from "jsonwebtoken";

// Admin Middleware (Only Admin Can Access)
export const adminAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        // Check admin role from token
        if (decoded.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied, Admin only"
            });
        }

        req.admin = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
