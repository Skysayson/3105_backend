
// Logs the requests in the CLI
const logRequests = (req, res, next) => {
    const currentTime = new Date().toISOString();
    console.log(`[${currentTime}] ${req.method} request to ${req.url}`);
    next();
};

module.exports = { logRequests };
