// SUCCESS RESPONSE
export const success = (res, message, data = {}) => {
    return res.status(200).json({
        success: true,
        message,
        data
    });
};

// ERROR RESPONSE
export const error = (res, message, code = 500) => {
    return res.status(code).json({
        success: false,
        message
    });
};
