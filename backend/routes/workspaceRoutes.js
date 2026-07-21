const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  createWorkspace,
  getWorkspaces,
} = require("../controllers/workspaceController");

router
  .route("/")
  .post(protect, createWorkspace)
  .get(protect, getWorkspaces);

module.exports = router;