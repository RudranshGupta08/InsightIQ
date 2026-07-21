const asyncHandler = require("express-async-handler");
const Workspace = require("../models/Workspace");

// Create Workspace
const createWorkspace = asyncHandler(async (req, res) => {
  const { name, description, industry, currency } = req.body;

  if (!name || !industry) {
    return res.status(400).json({
      message: "Name and industry are required",
    });
  }

  const workspace = await Workspace.create({
    ownerId: req.user._id,
    name,
    description,
    industry,
    currency: currency || "INR",
  });

  res.status(201).json(workspace);
});

// Get User Workspaces
const getWorkspaces = asyncHandler(async (req, res) => {
  const workspaces = await Workspace.find({
    ownerId: req.user._id,
  });

  res.json(workspaces);
});

module.exports = {
  createWorkspace,
  getWorkspaces,
};