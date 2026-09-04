const express = require("express");
const { getAdminProfile } = require("../controllers/adminController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Get admin profile
router.get("/profile", protect, getAdminProfile);

module.exports = router;