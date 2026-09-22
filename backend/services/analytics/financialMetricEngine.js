const FINANCIAL_CLASSES = Object.freeze([
  "revenue",
  "expense",
  "financing",
  "investment",
  "transfer",
  "asset",
  "liability",
  "adjustment",
]);

const OPERATING_REVENUE_CLASS = "revenue";
const OPERATING_EXPENSE_CLASS = "expense";

function round(value, digits = 1) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

function numericAmount(transaction) {
  const amount = Number(transaction?.amount);
  return Number.isFinite(amount) ? Math.abs(amount) : 0;
}

function normalizedFinancialClass(transaction) {
  const value = String(transaction?.financialClass || "").trim().toLowerCase();
  return FINANCIAL_CLASSES.includes(value) ? value : "adjustment";
}

function sumByFinancialClass(transactions, financialClass) {
  return transactions.reduce((sum, transaction) => {
    return normalizedFinancialClass(transaction) === financialClass
      ? sum + numericAmount(transaction)
      : sum;
  }, 0);
}

function calculateCoreMetrics(transactions = []) {
  const revenue = sumByFinancialClass(transactions, OPERATING_REVENUE_CLASS);
  const expenses = sumByFinancialClass(transactions, OPERATING_EXPENSE_CLASS);
  const profit = revenue - expenses;

  return {
    revenue,
    expenses,
    profit,
    profitMargin: revenue > 0 ? round((profit / revenue) * 100) : 0,
    expenseRatio: revenue > 0 ? round((expenses / revenue) * 100) : null,
    transactionCount: transactions.length,
    revenueTransactionCount: transactions.filter(
      (transaction) => normalizedFinancialClass(transaction) === OPERATING_REVENUE_CLASS
    ).length,
    expenseTransactionCount: transactions.filter(
      (transaction) => normalizedFinancialClass(transaction) === OPERATING_EXPENSE_CLASS
    ).length,
    excludedTransactionCount: transactions.filter(
      (transaction) => ![OPERATING_REVENUE_CLASS, OPERATING_EXPENSE_CLASS].includes(
        normalizedFinancialClass(transaction)
      )
    ).length,
  };
}

function buildFinancialClassBreakdown(transactions = []) {
  return FINANCIAL_CLASSES.map((financialClass) => {
    const matching = transactions.filter(
      (transaction) => normalizedFinancialClass(transaction) === financialClass
    );

    return {
      financialClass,
      amount: matching.reduce((sum, transaction) => sum + numericAmount(transaction), 0),
      transactionCount: matching.length,
    };
  });
}

function buildExpenseBreakdown(transactions = []) {
  const groups = new Map();

  transactions.forEach((transaction) => {
    if (normalizedFinancialClass(transaction) !== OPERATING_EXPENSE_CLASS) return;

    const category = String(transaction.category || "Uncategorized").trim() || "Uncategorized";
    const current = groups.get(category) || { name: category, value: 0, transactionCount: 0 };
    current.value += numericAmount(transaction);
    current.transactionCount += 1;
    groups.set(category, current);
  });

  return [...groups.values()].sort((a, b) => b.value - a.value);
}

function validTransactionDate(transaction) {
  const date = new Date(transaction?.transactionDate);
  return Number.isNaN(date.getTime()) ? null : date;
}

function resolveAnalysisYear(transactions = [], requestedYear) {
  if (Number.isInteger(Number(requestedYear))) return Number(requestedYear);

  const years = transactions
    .map(validTransactionDate)
    .filter(Boolean)
    .map((date) => date.getFullYear());

  return years.length ? Math.max(...years) : new Date().getFullYear();
}

function growthPercent(current, previous) {
  if (!Number.isFinite(previous) || previous <= 0) return null;
  return round(((current - previous) / previous) * 100);
}

function buildMonthlyData(transactions = [], requestedYear) {
  const year = resolveAnalysisYear(transactions, requestedYear);
  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const monthly = months.map((month, index) => {
    const monthTransactions = transactions.filter((transaction) => {
      const date = validTransactionDate(transaction);
      return date && date.getFullYear() === year && date.getMonth() === index;
    });

    const metrics = calculateCoreMetrics(monthTransactions);
    return {
      month,
      Revenue: metrics.revenue,
      Expense: metrics.expenses,
      Profit: metrics.profit,
      transactionCount: metrics.transactionCount,
      revenueGrowth: null,
      expenseGrowth: null,
      profitGrowth: null,
    };
  });

  const now = new Date();
  const currentYear = now.getFullYear();
  const currentMonthIndex = now.getMonth();

  return {
    year,
    data: monthly.map((current, index) => {
      const previous = monthly[index - 1];
      const isFutureMonth =
        year > currentYear ||
        (year === currentYear && index > currentMonthIndex);

      return {
        ...current,
        revenueGrowth: !isFutureMonth && previous
          ? growthPercent(current.Revenue, previous.Revenue)
          : null,
        expenseGrowth: !isFutureMonth && previous
          ? growthPercent(current.Expense, previous.Expense)
          : null,
        profitGrowth: !isFutureMonth && previous
          ? growthPercent(current.Profit, previous.Profit)
          : null,
      };
    }),
  };
}

function calculateFinancialMetrics(transactions = [], options = {}) {
  const core = calculateCoreMetrics(transactions);
  const monthly = buildMonthlyData(transactions, options.year);

  return {
    ...core,
    analysisYear: monthly.year,
    monthlyData: monthly.data,
    expenseBreakdown: buildExpenseBreakdown(transactions),
    financialClassBreakdown: buildFinancialClassBreakdown(transactions),
  };
}

module.exports = {
  FINANCIAL_CLASSES,
  calculateCoreMetrics,
  calculateFinancialMetrics,
  buildMonthlyData,
  buildExpenseBreakdown,
  buildFinancialClassBreakdown,
  normalizedFinancialClass,
  growthPercent,
};
