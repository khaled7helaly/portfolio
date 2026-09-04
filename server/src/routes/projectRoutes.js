const express = require("express");

const {
  createProject,
  getProjects,
} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create project
router.post("/", protect, createProject);

// Get all projects
router.get("/", getProjects);

module.exports = router;