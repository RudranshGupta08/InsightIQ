const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");
const Workspace = require("../models/Workspace");

// Create Transaction
const createTransaction = asyncHandler(
  async (req, res) => {
    const {
      workspaceId,
      title,
      description,
      transactionType,
      category,
      subCategory,
      amount,
      currency,
      status,
      customerVendor,
      customerEmail,
      customerPhone,
      paymentMethod,
      paymentReference,
      invoiceNumber,
      region,
      city,
      country,
      itemName,
      quantity,
      unitPrice,
      tags,
      notes,
      transactionDate,
    } = req.body;

    if (
      !workspaceId ||
      !title ||
      !transactionType ||
      !category ||
      !amount
    ) {
      return res.status(400).json({
        message:
          "Please fill all required fields",
      });
    }

    const workspace =
      await Workspace.findById(
        workspaceId
      );

    if (!workspace) {
      return res.status(404).json({
        message:
          "Workspace not found",
      });
    }

    const transaction =
      await Transaction.create({
        ownerId: req.user._id,

        workspaceId,

        title,
        description,

        transactionType,

        category,
        subCategory,

        amount,
        currency,

        status,

        customerVendor,
        customerEmail,
        customerPhone,

        paymentMethod,
        paymentReference,
        invoiceNumber,

        region,
        city,
        country,

        itemName,
        quantity,
        unitPrice,

        tags,

        notes,

        transactionDate,
      });

    res.status(201).json(
      transaction
    );
  }
);

// Get Transactions
const getTransactions = asyncHandler(
  async (req, res) => {
    const transactions =
      await Transaction.find({
        ownerId: req.user._id,
        workspaceId:
          req.query.workspaceId,
      }).sort({
        createdAt: -1,
      });

    res.json(transactions);
  }
);

const updateTransaction = asyncHandler(
  async (req, res) => {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message:
          "Transaction not found",
      });
    }

    if (
      transaction.ownerId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    const updatedTransaction =
      await Transaction.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        }
      );

    res.json(updatedTransaction);
  }
);

const deleteTransaction = asyncHandler(
  async (req, res) => {
    const transaction =
      await Transaction.findById(
        req.params.id
      );

    if (!transaction) {
      return res.status(404).json({
        message:
          "Transaction not found",
      });
    }

    if (
      transaction.ownerId.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message: "Not authorized",
      });
    }

    await Transaction.findByIdAndDelete(
      req.params.id
    );

    res.json({
      message:
        "Transaction deleted successfully",
    });
  }
);

module.exports = {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
};