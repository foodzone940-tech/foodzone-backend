// Generate 4 Digit OTP (0000 - 9999)
export const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString();
};

// Check if OTP expired (5 minutes validity)
export const isOTPExpired = (created_at) => {
    const now = Date.now();
    const diff = now - new Date(created_at).getTime();

    // 5 minutes = 300000 milliseconds
    return diff > 5 * 60 * 1000;
};
