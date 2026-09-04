// Get Admin Profile
const getAdminProfile = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      admin: req.admin,
    });
  } catch (error) {
    console.error("GET ADMIN PROFILE ERROR:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

// Export controller functions
module.exports = {
  getAdminProfile,
};