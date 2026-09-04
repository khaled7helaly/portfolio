const Admin = require("../models/Admin");
const generateToken = require("../utils/jwt");

// Register Admin
const registerAdmin = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if admin already exists
    const existingAdmin = await Admin.findOne({ email });

    if (existingAdmin) {
      return res.status(400).json({
        success: false,
        message: "Admin already exists",
      });
    }

    // Create new admin
    const admin = await Admin.create({
      name,
      email,
      password,
    });

    // Return admin data
    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("REGISTER ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Login Admin
const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find admin by email
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Compare password with hashed password
    const isPasswordMatch = await admin.comparePassword(password);

    if (!isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid email or password",
      });
    }

    // Generate JWT token
    const token = generateToken(admin._id);

    // Return admin data and token
    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      admin: {
        id: admin._id,
        name: admin.name,
        email: admin.email,
        role: admin.role,
      },
    });
  } catch (error) {
    console.error("LOGIN ADMIN ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Export controller functions
module.exports = {
  registerAdmin,
  loginAdmin,
};