import jwt from "jsonwebtoken";

// Vendor Middleware (Only Vendors Can Access)
export const vendorAuth = (req, res, next) => {
    const token = req.headers["authorization"];

    if (!token) {
        return res.status(401).json({
            success: false,
            message: "No token provided"
        });
    }

    try {
        const decoded = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);

        // Role check
        if (decoded.role !== "vendor") {
            return res.status(403).json({
                success: false,
                message: "Access denied, Vendor only"
            });
        }

        req.vendor = decoded;
        next();

    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
