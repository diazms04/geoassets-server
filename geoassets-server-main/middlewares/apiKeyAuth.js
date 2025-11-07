// middleware/apiKeyAuth.js
require('dotenv').config();

/**
 * Middleware to check a fixed API key.
 * The key is expected in the request header "x-api-key"
 * and is compared to the value stored in the environment variable API_SECRET_KEY.
 */
function apiKeyAuth(req, res, next) {
  // Get the API key from the request header
  const apiKey = req.headers['x-api-key'];

  // Compare with the environment variable
  if (!apiKey || apiKey !== process.env.API_SECRET_KEY) {
    return res.status(403).json({
      status: false,
      msg: 'Invalid or missing API key'
    });
  }

  // If the key is correct, continue to the route handler
  next();
}

module.exports = apiKeyAuth;
