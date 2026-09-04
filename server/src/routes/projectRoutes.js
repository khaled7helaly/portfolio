const express = require("express");

const {
  createProject,
  getProjects,
  updateProject, 
  getProjectById,
    deleteProject,

} = require("../controllers/projectController");

const protect = require("../middleware/authMiddleware");

const router = express.Router();

// Create project
router.post("/", protect, createProject);

// Get all projects
router.get("/", getProjects);

// Update project
router.patch("/:id", protect, updateProject);

// Get project by ID
router.get("/:id", getProjectById);

// Delete project
router.delete("/:id", protect, deleteProject);

module.exports = router;