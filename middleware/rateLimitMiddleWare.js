const rateLimit = require('express-rate-limit');

// Rate limiter middleware that has a maximum of 5 refreshes every 30 seconds
const rateLimiter = rateLimit({
    windowMs: 30 * 1000,
    max: 5,
    message: 'Too many requests',
});

module.exports = rateLimiter