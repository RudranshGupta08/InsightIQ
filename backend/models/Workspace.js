const mongoose = require("mongoose");

const workspaceSchema =
  new mongoose.Schema(
    {
      ownerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },

      name: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      industry: {
        type: String,
        required: true,
      },

      currency: {
        type: String,
        default: "INR",
      },
    },
    {
      timestamps: true,
    }
  );

module.exports =
  mongoose.model(
    "Workspace",
    workspaceSchema
  );