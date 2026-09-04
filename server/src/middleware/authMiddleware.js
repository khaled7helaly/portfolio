const jwt = require("jsonwebtoken");
const Admin = require("../models/Admin");

// Protect admin routes
const protect = async (req, res, next) => {
  try {
    // Get token from Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Not authorized, no token",
      });
    }

    // Extract token
    const token = authHeader.split(" ")[1];

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find admin
    const admin = await Admin.findById(decoded.id).select("-password");

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Attach admin to request
    req.admin = admin;

    // Continue to the protected route
    next();
  } catch (error) {
    console.error("AUTH MIDDLEWARE ERROR:", error);

    return res.status(401).json({
      success: false,
      message: "Not authorized, invalid token",
    });
  }
};

// Export middleware
module.exports = protect;