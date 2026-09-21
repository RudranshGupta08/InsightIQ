const Transaction = require("../../models/Transaction");
const Workspace = require("../../models/Workspace");

const REVENUE_TYPES = new Set(["income", "subscription"]);
const EXPENSE_TYPES = new Set(["expense", "purchase", "salary", "tax"]);

function sumByType(transactions, types) {
  return transactions.reduce((sum, transaction) => {
    if (!types.has(transaction.transactionType)) return sum;
    return sum + Number(transaction.amount || 0);
  }, 0);
}

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function calculateCoreMetrics(transactions) {
  const revenue = sumByType(transactions, REVENUE_TYPES);
  const expenses = sumByType(transactions, EXPENSE_TYPES);
  const profit = revenue - expenses;
  const profitMargin = revenue > 0 ? round((profit / revenue) * 100) : 0;
  const expenseRatio = revenue > 0 ? round((expenses / revenue) * 100) : 100;
  return { revenue, expenses, profit, profitMargin, expenseRatio };
}

function buildMonthlyData(transactions) {
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  return months.map((month, index) => {
    const monthTransactions = transactions.filter((transaction) => {
      const date = new Date(transaction.transactionDate);
      return !Number.isNaN(date.getTime()) && date.getMonth() === index;
    });
    const { revenue, expenses, profit } = calculateCoreMetrics(monthTransactions);
    return { month, Revenue: revenue, Expense: expenses, Profit: profit };
  });
}

function buildWorkspacePerformance(workspaces, allTransactions) {
  return workspaces.map((workspace) => {
    const workspaceTransactions = allTransactions.filter(
      (transaction) => transaction.workspaceId?.toString() === workspace._id?.toString()
    );
    const metrics = calculateCoreMetrics(workspaceTransactions);
    return {
      id: workspace._id,
      name: workspace.name,
      revenue: metrics.revenue,
      expenses: metrics.expenses,
      profit: metrics.profit,
      transactionCount: workspaceTransactions.length,
    };
  });
}

// Kept temporarily for UI compatibility. This is not the final InsightIQ score model.
function buildLegacyScore({ revenue, profit, profitMargin, expenseRatio, transactionCount, workspaceCount }) {
  let score = 0;
  if (revenue > 0) score += 20;
  if (profit > 0) score += 25;
  if (profitMargin >= 40) score += 20;
  else if (profitMargin >= 20) score += 15;
  else if (profitMargin >= 10) score += 10;
  if (expenseRatio <= 70) score += 15;
  if (transactionCount >= 20) score += 10;
  else if (transactionCount >= 10) score += 5;
  if (workspaceCount >= 2) score += 10;
  return Math.min(100, Math.round(score));
}

function buildLegacyRecommendations({ profit, profitMargin, expenseRatio, transactionCount, topBusiness }) {
  const recommendations = [];
  recommendations.push(
    profit > 0 ? "Business is operating profitably." : "Business is currently operating at a loss."
  );
  if (profitMargin >= 40) recommendations.push("Profit margin is excellent.");
  else if (profitMargin >= 20) recommendations.push("Healthy profit margin.");
  else recommendations.push("Improve profit margin by reducing expenses.");
  if (expenseRatio > 70) recommendations.push("Operating expenses are relatively high.");
  if (transactionCount < 10) recommendations.push("Add more transactions for better analytics.");
  if (topBusiness) recommendations.push(`${topBusiness.name} is currently your best performing business.`);
  return recommendations;
}

async function getDashboardAnalytics({ userId, workspaceId }) {
  const workspaceFilter = workspaceId
    ? { ownerId: userId, workspaceId }
    : { ownerId: userId };

  const [transactions, workspaces, allTransactions] = await Promise.all([
    Transaction.find(workspaceFilter).sort({ createdAt: -1 }).lean(),
    Workspace.find({ ownerId: userId }).lean(),
    Transaction.find({ ownerId: userId }).sort({ createdAt: -1 }).lean(),
  ]);

  const metrics = calculateCoreMetrics(transactions);
  const businessPerformance = buildWorkspacePerformance(workspaces, allTransactions);
  const topBusiness = workspaceId
    ? null
    : [...businessPerformance].sort((a, b) => b.revenue - a.revenue)[0] || null;

  const insightIQScore = buildLegacyScore({
    ...metrics,
    transactionCount: transactions.length,
    workspaceCount: workspaces.length,
  });

  let scoreStatus = "Critical";
  if (insightIQScore >= 90) scoreStatus = "Excellent";
  else if (insightIQScore >= 75) scoreStatus = "Very Good";
  else if (insightIQScore >= 60) scoreStatus = "Healthy";
  else if (insightIQScore >= 40) scoreStatus = "Needs Attention";

  let insightMessage = "Continue adding transactions to unlock deeper business intelligence.";
  if (metrics.profitMargin >= 40) insightMessage = "Outstanding profitability. Your business is operating efficiently.";
  else if (metrics.profitMargin >= 25) insightMessage = "Financial performance is healthy with consistent growth potential.";
  else if (metrics.profit > 0) insightMessage = "Business remains profitable. Optimizing expenses can improve margins.";
  else insightMessage = "Expenses are impacting profitability. Review operational costs.";

  const monthlyData = buildMonthlyData(transactions);
  const recentActivities = transactions.slice(0, 5);
  const expenseTypes = ["expense", "purchase", "salary", "tax"];
  const expenseBreakdown = expenseTypes.map((type) => ({
    name: type.charAt(0).toUpperCase() + type.slice(1),
    value: transactions
      .filter((transaction) => transaction.transactionType === type)
      .reduce((sum, transaction) => sum + Number(transaction.amount || 0), 0),
  }));

  const workspaceComparison = [...businessPerformance]
    .sort((a, b) => b.revenue - a.revenue)
    .map(({ name, revenue, profit }) => ({ name, revenue, profit }));

  const highestTransaction = transactions.length
    ? [...transactions].sort((a, b) => Number(b.amount) - Number(a.amount))[0]
    : null;

  const revenueHealth = metrics.revenue > 0
    ? Math.min(100, Math.round(metrics.profitMargin + 50))
    : 0;
  const expenseHealth = Math.max(0, Math.min(100, 100 - metrics.expenseRatio));
  const profitability = Math.max(0, Math.min(100, metrics.profitMargin));

  return {
    ...metrics,
    insightIQScore,
    scoreStatus,
    insightMessage,
    revenueHealth,
    expenseHealth,
    profitability,
    businessPerformance,
    workspaceComparison,
    topBusiness,
    recentActivities,
    monthlyData,
    highestTransaction,
    expenseBreakdown,
    recommendations: buildLegacyRecommendations({ ...metrics, transactionCount: transactions.length, topBusiness }),
    forecast: null,
    metadata: {
      workspaceId: workspaceId || null,
      transactionCount: transactions.length,
      allTransactionCount: allTransactions.length,
      workspaceCount: workspaces.length,
      generatedAt: new Date().toISOString(),
      forecastAvailable: false,
    },
  };
}

module.exports = { getDashboardAnalytics, calculateCoreMetrics };
