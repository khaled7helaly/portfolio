const express = require("express");
const { registerAdmin, loginAdmin } = require("../controllers/authController");
const protect = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);


// Protected admin route
router.get("/profile", protect, (req, res) => {
  res.status(200).json({
    success: true,
    admin: req.admin,
  });
});

module.exports = router;