const mongoose = require("mongoose");

const transactionSchema =
  new mongoose.Schema(
    {
      // =========================
      // OWNERSHIP
      // =========================

      ownerId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
        index: true,
      },

      workspaceId: {
        type:
          mongoose.Schema.Types.ObjectId,
        ref: "Workspace",
        required: true,
        index: true,
      },

      // =========================
      // CORE TRANSACTION
      // =========================

      title: {
        type: String,
        required: true,
        trim: true,
      },

      description: {
        type: String,
        default: "",
      },

      notes: {
        type: String,
        default: "",
      },

      transactionType: {
        type: String,

        enum: [
          "income",
          "expense",
          "purchase",
          "investment",
          "refund",
          "salary",
          "tax",
          "loan",
          "subscription",
          "asset",
        ],

        required: true,
      },

      category: {
        type: String,
        required: true,
        trim: true,
      },

      subCategory: {
        type: String,
        default: "",
      },

      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        default: "INR",
      },

      // =========================
      // STATUS
      // =========================

      status: {
        type: String,

        enum: [
          "completed",
          "pending",
          "cancelled",
          "failed",
        ],

        default: "completed",
      },

      // =========================
      // BUSINESS ENTITY
      // =========================

      customerVendor: {
        type: String,
        default: "",
      },

      customerEmail: {
        type: String,
        default: "",
      },

      customerPhone: {
        type: String,
        default: "",
      },

      // =========================
      // PAYMENT
      // =========================

      paymentMethod: {
        type: String,

        enum: [
          "cash",
          "upi",
          "bank_transfer",
          "credit_card",
          "debit_card",
          "cheque",
          "wallet",
          "other",
        ],

        default: "other",
      },

      paymentReference: {
        type: String,
        default: "",
      },

      invoiceNumber: {
        type: String,
        default: "",
      },

      // =========================
      // LOCATION
      // =========================

      region: {
        type: String,
        default: "Global",
      },

      city: {
        type: String,
        default: "",
      },

      country: {
        type: String,
        default: "",
      },

      // =========================
      // PRODUCT / SERVICE
      // =========================

      itemName: {
        type: String,
        default: "",
      },

      quantity: {
        type: Number,
        default: 1,
      },

      unitPrice: {
        type: Number,
        default: 0,
      },

      // =========================
      // TAGS
      // =========================

      tags: [
        {
          type: String,
        },
      ],

      // =========================
      // ATTACHMENTS
      // =========================

      attachments: [
        {
          type: String,
        },
      ],

      // =========================
      // AI ENGINE
      // =========================

      aiProcessed: {
        type: Boolean,
        default: false,
      },

      aiCategory: {
        type: String,
        default: "",
      },

      aiConfidence: {
        type: Number,
        default: 0,
      },

      // =========================
      // DATE
      // =========================

      transactionDate: {
        type: Date,
        default: Date.now,
      },
    },

    {
      timestamps: true,
    }
  );

module.exports = mongoose.model(
  "Transaction",
  transactionSchema
);