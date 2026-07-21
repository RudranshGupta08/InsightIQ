const asyncHandler = require("express-async-handler");
const Transaction = require("../models/Transaction");

const getDashboardAnalytics = asyncHandler(
  async (req, res) => {
    const transactions =
      await Transaction.find({
        ownerId: req.user._id,
      });

    const totalRevenue =
      transactions.reduce(
        (sum, item) =>
          sum + item.revenue,
        0
      );

    const totalProfit =
      transactions.reduce(
        (sum, item) =>
          sum + item.profit,
        0
      );

    const totalExpenses =
      transactions.reduce(
        (sum, item) =>
          sum + item.expenses,
        0
      );

    const totalTransactions =
      transactions.length;

    res.json({
      totalRevenue,
      totalProfit,
      totalExpenses,
      totalTransactions,
    });
  }
);

module.exports = {
  getDashboardAnalytics,
};