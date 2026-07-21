const express = require("express");

const router = express.Router();

const { protect } = require(
  "../middleware/authMiddleware"
);

const {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
} = require(
  "../controllers/transactionController"
);

router
  .route("/")
  .post(protect, createTransaction)
  .get(protect, getTransactions);

router
  .route("/:id")
  .put(protect, updateTransaction)
  .delete(protect, deleteTransaction);

module.exports = router;