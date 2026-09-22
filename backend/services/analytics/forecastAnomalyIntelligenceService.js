const DEFAULT_MIN_FORECAST_MONTHS = 6;
const DEFAULT_MIN_ACTIVE_MONTHS = 4;
const DEFAULT_MIN_ANOMALY_TRANSACTIONS = 5;
const DEFAULT_ANOMALY_ZSCORE = 3;
const DEFAULT_MIN_MODEL_R_SQUARED = 0.3;

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function numericAmount(transaction) {
  const amount = Number(transaction?.amount);
  return Number.isFinite(amount) ? Math.abs(amount) : 0;
}

function validDate(transaction) {
  const date = new Date(transaction?.transactionDate);
  return Number.isNaN(date.getTime()) ? null : date;
}

function financialClass(transaction) {
  const value = String(transaction?.financialClass || "").trim().toLowerCase();
  return ["revenue", "expense"].includes(value) ? value : null;
}

function linearRegression(values) {
  const n = values.length;
  if (n < 2) return null;

  let sumX = 0;
  let sumY = 0;
  let sumXY = 0;
  let sumXX = 0;

  values.forEach((value, index) => {
    sumX += index;
    sumY += value;
    sumXY += index * value;
    sumXX += index * index;
  });

  const denominator = n * sumXX - sumX * sumX;
  if (denominator === 0) return null;

  const slope = (n * sumXY - sumX * sumY) / denominator;
  const intercept = (sumY - slope * sumX) / n;

  const mean = sumY / n;
  const ssTot = values.reduce((sum, value) => sum + ((value - mean) ** 2), 0);
  const ssRes = values.reduce((sum, value, index) => {
    const predicted = intercept + slope * index;
    return sum + ((value - predicted) ** 2);
  }, 0);

  const rSquared = ssTot === 0 ? 1 : Math.max(0, Math.min(1, 1 - ssRes / ssTot));

  return { slope, intercept, rSquared };
}

function forecastSeries(values, horizon) {
  const model = linearRegression(values);
  if (!model) return null;

  const forecasts = [];
  for (let step = 1; step <= horizon; step += 1) {
    const raw = model.intercept + model.slope * (values.length - 1 + step);
    forecasts.push(Math.max(0, round(raw, 2)));
  }

  return {
    values: forecasts,
    slope: round(model.slope, 2),
    rSquared: round(model.rSquared, 3),
  };
}

function buildActualMonthlySeries(transactions, year) {
  const months = Array.from({ length: 12 }, (_, index) => ({
    monthIndex: index,
    revenue: 0,
    expense: 0,
  }));

  transactions.forEach((transaction) => {
    const date = validDate(transaction);
    const financialType = financialClass(transaction);
    if (!date || date.getFullYear() !== year || !financialType) return;

    const target = months[date.getMonth()];
    target[financialType] += numericAmount(transaction);
  });

  const now = new Date();
  const lastObservedMonth = year < now.getFullYear()
    ? 11
    : year > now.getFullYear()
      ? -1
      : now.getMonth();

  return months.filter((month) => month.monthIndex <= lastObservedMonth);
}

function buildForecast({
  transactions = [],
  analysisYear,
  horizon = 3,
  minObservedMonths = DEFAULT_MIN_FORECAST_MONTHS,
  minActiveMonths = DEFAULT_MIN_ACTIVE_MONTHS,
  minModelRSquared = DEFAULT_MIN_MODEL_R_SQUARED,
}) {
  const actualMonths = buildActualMonthlySeries(transactions, analysisYear);
  const observedMonths = actualMonths.length;
  const activeMonths = actualMonths.filter((month) => month.revenue > 0 || month.expense > 0).length;

  const base = {
    available: false,
    method: "linear_trend",
    horizonMonths: horizon,
    observedMonths,
    activeMonths,
    minimumObservedMonths: minObservedMonths,
    minimumActiveMonths: minActiveMonths,
    minimumModelRSquared: minModelRSquared,
    reason: "Insufficient historical observations for a reliable forecast.",
    limitations: [
      "Forecasting is enabled only when enough historical monthly observations are available.",
      "The forecast is trend-based and does not establish seasonality from limited history.",
    ],
  };

  if (observedMonths < minObservedMonths || activeMonths < minActiveMonths) {
    return base;
  }

  const revenueValues = actualMonths.map((month) => month.revenue);
  const expenseValues = actualMonths.map((month) => month.expense);
  const profitValues = actualMonths.map((month) => month.revenue - month.expense);

  const revenueForecast = forecastSeries(revenueValues, horizon);
  const expenseForecast = forecastSeries(expenseValues, horizon);
  const profitForecast = forecastSeries(profitValues, horizon);

  if (!revenueForecast || !expenseForecast || !profitForecast) return base;

  const modelQuality = [revenueForecast, expenseForecast, profitForecast].every(
    (model) => model.rSquared >= minModelRSquared
  );

  if (!modelQuality) {
    return {
      ...base,
      reason: "Historical data does not show a strong enough trend for a defensible forecast.",
      model: {
        revenue: revenueForecast,
        expenses: expenseForecast,
        profit: profitForecast,
      },
    };
  }

  const nextMonth = actualMonths.length;
  const forecastMonths = Array.from({ length: horizon }, (_, index) => {
    const monthIndex = (nextMonth + index) % 12;
    const yearOffset = Math.floor((nextMonth + index) / 12);
    const date = new Date(analysisYear + yearOffset, monthIndex, 1);

    return {
      period: date.toISOString().slice(0, 7),
      revenue: revenueForecast.values[index],
      expenses: expenseForecast.values[index],
      profit: profitForecast.values[index],
    };
  });

  return {
    ...base,
    available: true,
    reason: null,
    forecast: forecastMonths,
    model: {
      revenue: revenueForecast,
      expenses: expenseForecast,
      profit: profitForecast,
    },
  };
}

function median(values) {
  const sorted = [...values].sort((a, b) => a - b);
  if (!sorted.length) return null;
  const middle = Math.floor(sorted.length / 2);
  return sorted.length % 2
    ? sorted[middle]
    : (sorted[middle - 1] + sorted[middle]) / 2;
}

function buildAnomalyResult({
  transactions = [],
  minTransactions = DEFAULT_MIN_ANOMALY_TRANSACTIONS,
  zScoreThreshold = DEFAULT_ANOMALY_ZSCORE,
}) {
  const comparable = transactions.filter((transaction) => {
    const financialType = financialClass(transaction);
    return financialType && numericAmount(transaction) > 0;
  });

  const result = {
    available: false,
    method: "robust_mad",
    comparableTransactionCount: comparable.length,
    minimumTransactions: minTransactions,
    anomalies: [],
    reason: "Insufficient comparable transactions for reliable anomaly detection.",
  };

  if (comparable.length < minTransactions) return result;

  const amounts = comparable.map(numericAmount);
  const center = median(amounts);
  const deviations = amounts.map((value) => Math.abs(value - center));
  const mad = median(deviations);

  if (!Number.isFinite(center) || !Number.isFinite(mad)) return result;

  // If all amounts are identical, there is no measurable amount anomaly.
  if (mad === 0) {
    return {
      ...result,
      available: true,
      reason: null,
      baseline: { medianAmount: center, mad: 0 },
    };
  }

  const anomalies = comparable
    .map((transaction) => {
      const amount = numericAmount(transaction);
      const robustZScore = 0.6745 * (amount - center) / mad;
      const absoluteZ = Math.abs(robustZScore);
      if (absoluteZ < zScoreThreshold) return null;

      const type = financialClass(transaction);
      const direction = amount > center ? "above" : "below";
      return {
        id: transaction._id || null,
        type: "transaction_amount",
        severity: absoluteZ >= zScoreThreshold * 1.5 ? "high" : "medium",
        title: `Unusually large ${type} transaction`,
        what: `Transaction amount ${amount} is ${direction} the observed transaction amount pattern.`,
        why: `Its robust z-score is ${round(robustZScore, 2)}, exceeding the anomaly threshold of ${zScoreThreshold}.`,
        evidence: {
          amount,
          financialClass: type,
          medianAmount: round(center, 2),
          medianAbsoluteDeviation: round(mad, 2),
          robustZScore: round(robustZScore, 2),
          threshold: zScoreThreshold,
          title: transaction.title || null,
          transactionDate: transaction.transactionDate || null,
        },
        implication: "The transaction may materially affect aggregate metrics and should be reviewed against the underlying business record.",
        action: "Verify the transaction amount, category, date, and source document before treating it as representative business activity.",
        dataSufficiency: "sufficient",
      };
    })
    .filter(Boolean)
    .sort((a, b) => Math.abs(b.evidence.robustZScore) - Math.abs(a.evidence.robustZScore));

  return {
    ...result,
    available: true,
    reason: null,
    baseline: {
      medianAmount: round(center, 2),
      mad: round(mad, 2),
      threshold: zScoreThreshold,
    },
    anomalies,
  };
}

function buildForecastAndAnomalyIntelligence(options = {}) {
  const forecast = buildForecast(options);
  const anomaly = buildAnomalyResult(options);

  return {
    forecast,
    anomaly,
  };
}

module.exports = {
  buildForecast,
  buildAnomalyResult,
  buildForecastAndAnomalyIntelligence,
};
