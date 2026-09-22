const MIN_TRANSACTIONS_FOR_TREND = 6;
const MIN_REVENUE_TRANSACTIONS_FOR_CONCENTRATION = 3;
const GENERIC_EXPENSE_CATEGORIES = new Set(["expense", "uncategorized", "general", "operating expense"]);

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function percentOf(value, total) {
  if (!Number.isFinite(total) || total <= 0) return null;
  return round((value / total) * 100);
}

function diagnostic({
  id,
  severity,
  title,
  what,
  why,
  evidence,
  implication,
  action,
  dataSufficiency = "sufficient",
}) {
  return {
    id,
    severity,
    title,
    what,
    why,
    evidence,
    implication,
    action,
    dataSufficiency,
  };
}

function buildDiagnosticIntelligence({
  transactions = [],
  metrics,
}) {
  const diagnostics = [];
  const {
    revenue = 0,
    expenses = 0,
    profit = 0,
    profitMargin = 0,
    expenseRatio = null,
    transactionCount = transactions.length,
    revenueTransactionCount = 0,
    expenseTransactionCount = 0,
    excludedTransactionCount = 0,
    monthlyData = [],
    expenseBreakdown = [],
  } = metrics || {};

  const dataCoverage = transactionCount < MIN_TRANSACTIONS_FOR_TREND
    ? "limited"
    : "sufficient";

  if (transactionCount === 0) {
    diagnostics.push(diagnostic({
      id: "no-financial-activity",
      severity: "high",
      title: "No recorded operating activity",
      what: "The selected workspace has no transactions available for operating analysis.",
      why: "There are no canonical transactions classified as revenue or expense.",
      evidence: {
        transactionCount: 0,
        revenue: 0,
        expenses: 0,
      },
      implication: "Profitability, cost structure, and trend conclusions cannot be established from the current dataset.",
      action: "Import or record the relevant business transactions before relying on financial diagnostics.",
      dataSufficiency: "insufficient",
    }));

    return buildResult(diagnostics, "insufficient");
  }

  if (revenue === 0 && expenses > 0) {
    diagnostics.push(diagnostic({
      id: "expenses-without-revenue",
      severity: "high",
      title: "Expenses are recorded without revenue",
      what: `Recorded operating expenses are ${expenses} while recorded revenue is 0.`,
      why: "The canonical financial data contains expense transactions but no revenue transactions for this workspace.",
      evidence: {
        revenue,
        expenses,
        expenseTransactionCount,
      },
      implication: "The recorded dataset currently produces a negative operating result and may represent an incomplete revenue view.",
      action: "Verify that revenue transactions were imported and mapped to financialClass=revenue, and review the recorded expenses.",
      dataSufficiency: dataCoverage,
    }));
  } else if (revenue > 0 && profit < 0) {
    diagnostics.push(diagnostic({
      id: "operating-loss",
      severity: "high",
      title: "Recorded operating expenses exceed revenue",
      what: `Recorded expenses exceed revenue by ${Math.abs(profit)}.`,
      why: `Revenue is ${revenue} while operating expenses are ${expenses}.`,
      evidence: {
        revenue,
        expenses,
        operatingLoss: Math.abs(profit),
        profitMargin,
      },
      implication: "The current recorded operating activity is loss-making for the selected analysis period.",
      action: "Identify the largest expense categories and verify whether the revenue dataset is complete before taking cost actions.",
      dataSufficiency: dataCoverage,
    }));
  } else if (revenue > 0 && profit >= 0) {
    diagnostics.push(diagnostic({
      id: "positive-operating-result",
      severity: profitMargin < 10 ? "medium" : "info",
      title: "Recorded operations are profitable",
      what: `Recorded revenue of ${revenue} exceeds operating expenses of ${expenses}.`,
      why: `The canonical metric engine calculates operating profit as revenue minus expense.`,
      evidence: {
        revenue,
        expenses,
        profit,
        profitMargin,
      },
      implication: "The selected dataset currently shows a positive operating result.",
      action: profitMargin < 10
        ? "Review the largest expense categories because the current margin leaves limited room for cost increases."
        : "Monitor the largest expense categories and continue collecting transactions to establish a reliable trend.",
      dataSufficiency: dataCoverage,
    }));
  }

  if (revenue > 0 && expenseRatio !== null && expenseRatio > 70) {
    diagnostics.push(diagnostic({
      id: "high-expense-burden",
      severity: expenseRatio > 100 ? "high" : "medium",
      title: "Expenses consume a large share of recorded revenue",
      what: `Recorded operating expenses represent ${expenseRatio}% of recorded revenue.`,
      why: `Expenses are ${expenses} against revenue of ${revenue}.`,
      evidence: {
        revenue,
        expenses,
        expenseRatio,
      },
      implication: "Changes in operating costs can materially affect the recorded operating result.",
      action: "Inspect the largest expense categories and validate whether they are recurring, one-time, or incorrectly classified.",
      dataSufficiency: dataCoverage,
    }));
  }

  const topExpense = expenseBreakdown[0];
  if (topExpense && expenses > 0) {
    const concentration = percentOf(topExpense.value, expenses);
    const isGenericCategory = GENERIC_EXPENSE_CATEGORIES.has(String(topExpense.name).trim().toLowerCase());
    if (!isGenericCategory && concentration !== null && concentration >= 50) {
      diagnostics.push(diagnostic({
        id: "expense-concentration",
        severity: concentration >= 75 ? "high" : "medium",
        title: "Operating expenses are concentrated in one category",
        what: `${topExpense.name} accounts for ${concentration}% of recorded operating expenses.`,
        why: `${topExpense.name} contributes ${topExpense.value} of total operating expenses of ${expenses}.`,
        evidence: {
          category: topExpense.name,
          categoryAmount: topExpense.value,
          totalExpenses: expenses,
          concentration,
        },
        implication: "A change in this category can have a disproportionate effect on the recorded expense base.",
        action: "Review this category's transactions for recurring costs, unusual entries, and classification accuracy.",
        dataSufficiency: dataCoverage,
      }));
    }
  }

  if (excludedTransactionCount > 0) {
    diagnostics.push(diagnostic({
      id: "non-operating-activity-present",
      severity: "info",
      title: "Non-operating financial activity is present",
      what: `${excludedTransactionCount} transaction(s) are classified outside operating revenue and expense.`,
      why: "Financing, investment, transfer, asset, liability, and adjustment classes are intentionally excluded from operating profit.",
      evidence: {
        excludedTransactionCount,
      },
      implication: "The operating profit figure does not represent every cash or balance-sheet movement in the dataset.",
      action: "Review excluded financial classes separately when assessing financing, investment, or balance-sheet activity.",
      dataSufficiency: dataCoverage,
    }));
  }

  if (transactionCount < MIN_TRANSACTIONS_FOR_TREND) {
    diagnostics.push(diagnostic({
      id: "limited-data-coverage",
      severity: "medium",
      title: "Limited transaction history",
      what: `Only ${transactionCount} transaction(s) are currently available for this workspace.`,
      why: `Trend and concentration analysis becomes more informative as the dataset contains more observations.`,
      evidence: {
        transactionCount,
        minimumForTrendSignals: MIN_TRANSACTIONS_FOR_TREND,
        revenueTransactionCount,
        expenseTransactionCount,
      },
      implication: "Current diagnostics describe the recorded dataset but should not be treated as a stable long-term business trend.",
      action: "Continue importing or recording transactions across additional dates and operating periods.",
      dataSufficiency: "limited",
    }));
  }

  if (revenueTransactionCount > 0 && revenueTransactionCount < MIN_REVENUE_TRANSACTIONS_FOR_CONCENTRATION) {
    diagnostics.push(diagnostic({
      id: "limited-revenue-observations",
      severity: "info",
      title: "Revenue observations are limited",
      what: `Recorded revenue comes from ${revenueTransactionCount} transaction(s).`,
      why: "A small number of revenue observations provides limited evidence for recurring revenue behavior.",
      evidence: {
        revenue,
        revenueTransactionCount,
      },
      implication: "Revenue performance should be interpreted as recorded activity rather than an established recurring trend.",
      action: "Collect additional revenue transactions across multiple dates before drawing trend or recurrence conclusions.",
      dataSufficiency: "limited",
    }));
  }

  return buildResult(diagnostics, dataCoverage);
}

function buildResult(diagnostics, dataSufficiency) {
  const severityOrder = { high: 0, medium: 1, low: 2, info: 3 };
  const ordered = [...diagnostics].sort(
    (a, b) => (severityOrder[a.severity] ?? 99) - (severityOrder[b.severity] ?? 99)
  );

  const highCount = ordered.filter((item) => item.severity === "high").length;
  const mediumCount = ordered.filter((item) => item.severity === "medium").length;

  let summary = "No material diagnostic signal was identified in the recorded data.";
  if (highCount > 0) {
    summary = `${highCount} high-priority diagnostic signal${highCount === 1 ? "" : "s"} require review.`;
  } else if (mediumCount > 0) {
    summary = mediumCount === 1
      ? "1 diagnostic signal requires review."
      : `${mediumCount} diagnostic signals require review.`;
  } else if (ordered.length > 0) {
    summary = "The recorded data contains useful signals, with no high-priority operating issue detected.";
  }

  return {
    summary,
    dataSufficiency,
    count: ordered.length,
    diagnostics: ordered,
  };
}

module.exports = {
  buildDiagnosticIntelligence,
};
