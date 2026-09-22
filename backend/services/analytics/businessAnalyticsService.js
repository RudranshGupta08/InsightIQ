const Transaction = require("../../models/Transaction");
const Workspace = require("../../models/Workspace");
const {
  calculateFinancialMetrics,
  calculateCoreMetrics,
} = require("./financialMetricEngine");
const { buildDiagnosticIntelligence } = require("./diagnosticIntelligenceService");
const { buildForecastAndAnomalyIntelligence } = require("./forecastAnomalyIntelligenceService");
const { buildDecisionIntelligence } = require("./decisionIntelligenceService");
const { buildFinancialCopilotContext } = require("../ai/financialContextService");

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
      profitMargin: metrics.profitMargin,
      transactionCount: metrics.transactionCount,
    };
  });
}

// Temporary compatibility only. This is not a financial metric and is not used
// to calculate revenue, expenses, profit, margins, or other financial values.
function buildLegacyScore({ revenue, profit, profitMargin, expenseRatio, transactionCount, workspaceCount }) {
  let score = 0;
  if (revenue > 0) score += 20;
  if (profit > 0) score += 25;
  if (profitMargin >= 40) score += 20;
  else if (profitMargin >= 20) score += 15;
  else if (profitMargin >= 10) score += 10;
  if (expenseRatio !== null && expenseRatio <= 70) score += 15;
  if (transactionCount >= 20) score += 10;
  else if (transactionCount >= 10) score += 5;
  if (workspaceCount >= 2) score += 10;
  return Math.min(100, Math.round(score));
}

async function getDashboardAnalytics({ userId, workspaceId, year }) {
  const workspaceFilter = workspaceId
    ? { ownerId: userId, workspaceId }
    : { ownerId: userId };

  const [transactions, workspaces, allTransactions] = await Promise.all([
    Transaction.find(workspaceFilter).sort({ transactionDate: -1, createdAt: -1 }).lean(),
    Workspace.find({ ownerId: userId }).lean(),
    Transaction.find({ ownerId: userId }).sort({ transactionDate: -1, createdAt: -1 }).lean(),
  ]);

  const metrics = calculateFinancialMetrics(transactions, { year });
  const diagnosticIntelligence = buildDiagnosticIntelligence({
    transactions,
    metrics,
  });
  const forecastAndAnomaly = buildForecastAndAnomalyIntelligence({
    transactions,
    analysisYear: metrics.analysisYear,
  });
  const decisionIntelligence = buildDecisionIntelligence({
    metrics,
    diagnostics: diagnosticIntelligence.diagnostics,
    forecast: forecastAndAnomaly.forecast,
    anomalyDetection: forecastAndAnomaly.anomaly,
  });

  const aiContext = buildFinancialCopilotContext({
    metrics,
    diagnostics: diagnosticIntelligence,
    forecast: forecastAndAnomaly.forecast,
    anomalyDetection: forecastAndAnomaly.anomaly,
    decisions: decisionIntelligence,
    metadata: {
      metricSource: "canonical.financialClass",
      diagnosticSource: "deterministic.evidenceBased",
      decisionSource: "deterministic.evidenceBased",
      forecastSource: "deterministic.linearTrend",
      anomalySource: "deterministic.robustMAD",
    },
  });

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

  let insightMessage = "No financial activity has been recorded for this workspace.";
  if (metrics.revenue > 0 && metrics.profitMargin >= 40) {
    insightMessage = "Recorded revenue is currently generating a strong profit margin.";
  } else if (metrics.revenue > 0 && metrics.profit > 0) {
    insightMessage = "Recorded revenue exceeds recorded operating expenses.";
  } else if (metrics.revenue > 0 && metrics.profit <= 0) {
    insightMessage = "Recorded operating expenses are equal to or greater than recorded revenue.";
  } else if (metrics.expenses > 0) {
    insightMessage = "Recorded operating expenses exist without recorded revenue in the selected data.";
  }

  const recentActivities = transactions.slice(0, 5);
  const workspaceComparison = [...businessPerformance]
    .sort((a, b) => b.revenue - a.revenue)
    .map(({ name, revenue, profit }) => ({ name, revenue, profit }));

  const highestTransaction = transactions.length
    ? [...transactions].sort((a, b) => Number(b.amount) - Number(a.amount))[0]
    : null;

  const revenueHealth = metrics.revenue > 0
    ? Math.min(100, Math.max(0, Math.round(metrics.profitMargin + 50)))
    : 0;
  const expenseHealth = metrics.expenseRatio === null
    ? 0
    : Math.max(0, Math.min(100, Math.round(100 - metrics.expenseRatio)));
  const profitability = Math.max(0, Math.min(100, Math.round(metrics.profitMargin)));

  // Decision Engine is now the authoritative source for actionable recommendations.
  const recommendations = decisionIntelligence.decisions.map((decision) => decision.title);

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
    monthlyData: metrics.monthlyData,
    highestTransaction,
    expenseBreakdown: metrics.expenseBreakdown,
    diagnostics: diagnosticIntelligence.diagnostics,
    diagnosticSummary: diagnosticIntelligence.summary,
    diagnosticDataSufficiency: diagnosticIntelligence.dataSufficiency,
    diagnosticCount: diagnosticIntelligence.count,
    recommendations,
    forecast: forecastAndAnomaly.forecast,
    anomalies: forecastAndAnomaly.anomaly.anomalies,
    anomalyDetection: forecastAndAnomaly.anomaly,
    decisionSummary: decisionIntelligence.summary,
    decisionDataSufficiency: decisionIntelligence.dataSufficiency,
    decisionCount: decisionIntelligence.count,
    decisions: decisionIntelligence.decisions,
    aiContext,
    metadata: {
      workspaceId: workspaceId || null,
      transactionCount: transactions.length,
      allTransactionCount: allTransactions.length,
      workspaceCount: workspaces.length,
      analysisYear: metrics.analysisYear,
      metricSource: "canonical.financialClass",
      diagnosticSource: "deterministic.evidenceBased",
      legacyScore: true,
      generatedAt: new Date().toISOString(),
      forecastAvailable: forecastAndAnomaly.forecast.available,
      anomalyDetectionAvailable: forecastAndAnomaly.anomaly.available,
      decisionSource: "deterministic.evidenceBased",
      decisionCount: decisionIntelligence.count,
      aiContextSource: "deterministic.groundedContext",
    },
  };
}

module.exports = {
  getDashboardAnalytics,
  calculateCoreMetrics,
};
