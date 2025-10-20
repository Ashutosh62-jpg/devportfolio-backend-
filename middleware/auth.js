// Simple authentication middleware for admin dashboard
const authMiddleware = (req, res, next) => {
  // Get password from request header
  const password = req.headers['x-admin-password'];
  
  // Check if password matches environment variable
  if (password === process.env.ADMIN_PASSWORD) {
    next(); // Password correct, proceed to route handler
  } else {
    // Password incorrect or missing
    res.status(401).json({ 
      success: false, 
      message: 'Unauthorized - Invalid admin password' 
    });
  }
};

module.exports = authMiddleware;
