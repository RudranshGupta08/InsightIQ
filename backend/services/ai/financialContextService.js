/**
 * InsightIQ - Grounded Financial Context
 *
 * Step 8.1
 *
 * Creates a deterministic, compact financial context for the future AI Copilot.
 * This layer does not call an LLM and does not generate financial claims.
 */

const DEFAULT_GROUNDING_RULES = Object.freeze([
  "Only use financial values present in this context.",
  "Do not invent, estimate, or silently modify financial values.",
  "Do not present an unavailable forecast as a prediction.",
  "Treat limited data as limited evidence.",
  "Distinguish recorded activity from established business trends.",
  "Use diagnostics and decisions as evidence-backed InsightIQ outputs.",
  "When the available evidence is insufficient, say so clearly.",
]);

const finiteOrNull = (value) => {
  const number = Number(value);
  return Number.isFinite(number) ? number : null;
};

const cleanText = (value) =>
  typeof value === "string" ? value.trim() : value ?? null;

const cleanEvidence = (evidence = {}) => {
  if (!evidence || typeof evidence !== "object") return {};

  return Object.fromEntries(
    Object.entries(evidence).filter(([, value]) => {
      if (value === undefined || value === null) return false;
      if (typeof value === "number" && !Number.isFinite(value)) return false;
      return true;
    })
  );
};

const mapDiagnostic = (diagnostic = {}) => ({
  id: cleanText(diagnostic.id),
  severity: cleanText(diagnostic.severity),
  title: cleanText(diagnostic.title),
  what: cleanText(diagnostic.what),
  why: cleanText(diagnostic.why),
  evidence: cleanEvidence(diagnostic.evidence),
  implication: cleanText(diagnostic.implication),
  action: cleanText(diagnostic.action),
  dataSufficiency: cleanText(diagnostic.dataSufficiency),
});

const mapDecision = (decision = {}) => ({
  id: cleanText(decision.id),
  priority: cleanText(decision.priority),
  title: cleanText(decision.title),
  trigger: cleanText(decision.trigger),
  why: cleanText(decision.why),
  evidence: cleanEvidence(decision.evidence),
  action: cleanText(decision.action),
  guardrail: cleanText(decision.guardrail),
  dataSufficiency: cleanText(decision.dataSufficiency),
});

const mapForecast = (forecast = {}) => ({
  available: forecast.available === true,
  method: cleanText(forecast.method),
  horizonMonths: finiteOrNull(forecast.horizonMonths),
  observedMonths: finiteOrNull(forecast.observedMonths),
  activeMonths: finiteOrNull(forecast.activeMonths),
  reason: cleanText(forecast.reason),
  limitations: Array.isArray(forecast.limitations)
    ? forecast.limitations.filter((item) => typeof item === "string")
    : [],
  ...(forecast.available === true && Array.isArray(forecast.projections)
    ? { projections: forecast.projections }
    : {}),
});

const mapAnomalyDetection = (anomalyDetection = {}) => ({
  available: anomalyDetection.available === true,
  method: cleanText(anomalyDetection.method),
  comparableTransactionCount: finiteOrNull(
    anomalyDetection.comparableTransactionCount
  ),
  minimumTransactions: finiteOrNull(anomalyDetection.minimumTransactions),
  reason: cleanText(anomalyDetection.reason),
  anomalies: Array.isArray(anomalyDetection.anomalies)
    ? anomalyDetection.anomalies
    : [],
});

const buildBusinessSnapshot = (metrics = {}) => ({
  revenue: finiteOrNull(metrics.revenue),
  expenses: finiteOrNull(metrics.expenses),
  profit: finiteOrNull(metrics.profit),
  profitMargin: finiteOrNull(metrics.profitMargin),
  expenseRatio: finiteOrNull(metrics.expenseRatio),
  transactionCount: finiteOrNull(metrics.transactionCount),
  revenueTransactionCount: finiteOrNull(metrics.revenueTransactionCount),
  expenseTransactionCount: finiteOrNull(metrics.expenseTransactionCount),
  excludedTransactionCount: finiteOrNull(metrics.excludedTransactionCount),
  analysisYear: metrics.analysisYear ?? null,
  monthlyData: Array.isArray(metrics.monthlyData) ? metrics.monthlyData : [],
  expenseBreakdown: Array.isArray(metrics.expenseBreakdown)
    ? metrics.expenseBreakdown
    : [],
  financialClassBreakdown: Array.isArray(metrics.financialClassBreakdown)
    ? metrics.financialClassBreakdown
    : [],
});

const buildDataSufficiency = ({
  metrics = {},
  diagnostics = [],
  forecast = {},
  anomalyDetection = {},
  decisions = [],
}) => {
  const explicitLevels = [
    ...diagnostics.map((item) => item?.dataSufficiency),
    ...decisions.map((item) => item?.dataSufficiency),
  ].filter(Boolean);

  let level = "unknown";

  if (explicitLevels.includes("limited")) level = "limited";
  else if (explicitLevels.includes("sufficient")) level = "sufficient";
  else if (explicitLevels.length > 0) level = explicitLevels[0];

  return {
    level,
    transactionCount: finiteOrNull(metrics.transactionCount),
    revenueTransactionCount: finiteOrNull(metrics.revenueTransactionCount),
    expenseTransactionCount: finiteOrNull(metrics.expenseTransactionCount),
    forecastAvailable: forecast.available === true,
    anomalyDetectionAvailable: anomalyDetection.available === true,
  };
};

const buildFinancialCopilotContext = ({
  metrics = {},
  diagnostics = {},
  forecast = {},
  anomalyDetection = {},
  decisions = {},
  metadata = {},
} = {}) => {
  const diagnosticItems = Array.isArray(diagnostics.diagnostics)
    ? diagnostics.diagnostics
    : [];

  const decisionItems = Array.isArray(decisions.decisions)
    ? decisions.decisions
    : [];

  const forecastContext = mapForecast(forecast);
  const anomalyContext = mapAnomalyDetection(anomalyDetection);

  return {
    version: "1.0",
    contextType: "financial_copilot",
    generatedBy: "InsightIQ.deterministic",
    grounding: {
      source: "insightiq.deterministic",
      metricSource: metadata.metricSource || "canonical.financialClass",
      diagnosticSource:
        metadata.diagnosticSource || "deterministic.evidenceBased",
      decisionSource:
        metadata.decisionSource || "deterministic.evidenceBased",
      forecastSource:
        metadata.forecastSource || "deterministic.linearTrend",
      anomalySource:
        metadata.anomalySource || "deterministic.robustMAD",
      rules: DEFAULT_GROUNDING_RULES,
    },
    dataSufficiency: buildDataSufficiency({
      metrics,
      diagnostics: diagnosticItems,
      forecast: forecastContext,
      anomalyDetection: anomalyContext,
      decisions: decisionItems,
    }),
    businessSnapshot: buildBusinessSnapshot(metrics),
    diagnostics: {
      summary: cleanText(diagnostics.diagnosticSummary),
      dataSufficiency: cleanText(diagnostics.diagnosticDataSufficiency),
      items: diagnosticItems.map(mapDiagnostic),
    },
    forecast: forecastContext,
    anomalies: anomalyContext,
    decisions: {
      summary: cleanText(decisions.decisionSummary),
      dataSufficiency: cleanText(decisions.decisionDataSufficiency),
      items: decisionItems.map(mapDecision),
    },
  };
};

module.exports = {
  buildFinancialCopilotContext,
  DEFAULT_GROUNDING_RULES,
};
