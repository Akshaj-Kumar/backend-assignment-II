// Custom Logger Middleware
// Logs HTTP Method, Request URL, and Timestamp for incoming requests

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl || req.url}`);
  next();
};

module.exports = logger;
