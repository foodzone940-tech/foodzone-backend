import jwt from "jsonwebtoken";

// Generate Token (Login ke baad)
export const generateToken = (user_id) => {
    return jwt.sign(
        { user_id },
        process.env.JWT_SECRET,
        { expiresIn: "30d" }  // Token valid for 30 days
    );
};

// Verify Token (Middleware me use hota)
export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        return null;
    }
};
