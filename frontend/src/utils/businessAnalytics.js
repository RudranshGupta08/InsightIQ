/*
=========================================
    InsightIQ Business Analytics Engine
=========================================

Single Source of Truth

Used By:

✓ Dashboard
✓ Analytics
✓ Forecast
✓ Reports
✓ AI Recommendations
✓ Business Comparison
✓ Export Module

=========================================
*/

export function getBusinessAnalytics(

    transactions = [],

    workspaces = [],

    allTransactions = []

) {

    /* =====================================
            Revenue
    ===================================== */

    const revenue =
        transactions
            .filter((transaction) =>
                [
                    "income",
                    "subscription",
                ].includes(
                    transaction.transactionType
                )
            )
            .reduce(
                (sum, transaction) =>
                    sum +
                    Number(transaction.amount),
                0
            );

    /* =====================================
            Expenses
    ===================================== */

    const expenses =
        transactions
            .filter((transaction) =>
                [
                    "expense",
                    "purchase",
                    "salary",
                    "tax",
                ].includes(
                    transaction.transactionType
                )
            )
            .reduce(
                (sum, transaction) =>
                    sum +
                    Number(transaction.amount),
                0
            );

    /* =====================================
            Profit
    ===================================== */

    const profit =
        revenue - expenses;

    /* =====================================
            Profit Margin
    ===================================== */

    const profitMargin =
        revenue > 0

            ? Number(
                (
                    (profit / revenue) *
                    100
                ).toFixed(1)
            )

            : 0;

    /* =====================================
            Expense Ratio
    ===================================== */

    const expenseRatio =
        revenue > 0

            ? Number(
                (
                    (expenses / revenue) *
                    100
                ).toFixed(1)
            )

            : 100;

    /* =====================================
        Revenue Health
    ===================================== */

    const revenueHealth =
        revenue > 0

            ? Math.min(

                100,

                Math.round(
                    ((profit / revenue) * 100) + 50
                )

            )

            : 0;

    /* =====================================
        Expense Health
    ===================================== */

    const expenseHealth =
        Math.max(

            0,

            Math.min(

                100,

                100 - expenseRatio

            )

        );

    /* =====================================
        Profitability
    ===================================== */

    const profitability =
        Math.max(

            0,

            Math.min(

                100,

                profitMargin

            )

        );

    /* =====================================
        InsightIQ Score
    ===================================== */

    let insightIQScore = 0;

    if (revenue > 0)

        insightIQScore += 20;

    if (profit > 0)

        insightIQScore += 25;

    if (profitMargin >= 40)

        insightIQScore += 20;

    else if (profitMargin >= 20)

        insightIQScore += 15;

    else if (profitMargin >= 10)

        insightIQScore += 10;

    if (expenseRatio <= 70)

        insightIQScore += 15;

    if (transactions.length >= 20)

        insightIQScore += 10;

    else if (transactions.length >= 10)

        insightIQScore += 5;

    if (workspaces.length >= 2)

        insightIQScore += 10;

    insightIQScore = Math.min(

        100,

        Math.round(insightIQScore)

    );

    /* =====================================
        Score Status
    ===================================== */

    let scoreStatus = "Critical";

    let scoreColor = "text-red-500";

    if (insightIQScore >= 90) {

        scoreStatus = "Excellent";

        scoreColor = "text-green-400";

    }

    else if (insightIQScore >= 75) {

        scoreStatus = "Very Good";

        scoreColor = "text-green-300";

    }

    else if (insightIQScore >= 60) {

        scoreStatus = "Healthy";

        scoreColor = "text-yellow-400";

    }

    else if (insightIQScore >= 40) {

        scoreStatus = "Needs Attention";

        scoreColor = "text-orange-400";

    }

    /* =====================================
        AI Insight Message
    ===================================== */

    let insightMessage =
        "Continue adding transactions to unlock deeper business intelligence.";

    if (profitMargin >= 40) {

        insightMessage =
            "Outstanding profitability. Your business is operating efficiently.";

    }

    else if (profitMargin >= 25) {

        insightMessage =
            "Financial performance is healthy with consistent growth potential.";

    }

    else if (profit > 0) {

        insightMessage =
            "Business remains profitable. Optimizing expenses can improve margins.";

    }

    else {

        insightMessage =
            "Expenses are impacting profitability. Review operational costs.";

    }

        /* =====================================
        Business Performance
    ===================================== */

    const businessPerformance =
        workspaces.map((workspace) => {

            const workspaceTransactions =
                allTransactions.filter(
                    (transaction) =>
                        transaction.workspaceId?.toString() ===
                        workspace._id?.toString()
                );

            const workspaceRevenue =
                workspaceTransactions
                    .filter((transaction) =>
                        [
                            "income",
                            "subscription",
                        ].includes(
                            transaction.transactionType
                        )
                    )
                    .reduce(
                        (sum, transaction) =>
                            sum +
                            Number(transaction.amount),
                        0
                    );

            const workspaceExpenses =
                workspaceTransactions
                    .filter((transaction) =>
                        [
                            "expense",
                            "purchase",
                            "salary",
                            "tax",
                        ].includes(
                            transaction.transactionType
                        )
                    )
                    .reduce(
                        (sum, transaction) =>
                            sum +
                            Number(transaction.amount),
                        0
                    );

            return {

                id: workspace._id,

                name: workspace.name,

                revenue: workspaceRevenue,

                expenses: workspaceExpenses,

                profit:
                    workspaceRevenue -
                    workspaceExpenses,

                transactionCount:
                    workspaceTransactions.length,

            };

        });

    /* =====================================
        Top Business
    ===================================== */

    const topBusiness =
        [...businessPerformance]
            .sort(
                (a, b) =>
                    b.revenue -
                    a.revenue
            )[0] || null;

    /* =====================================
        Recent Activity
    ===================================== */

    const recentActivities =
        [...transactions]

            .sort(
                (a, b) =>
                    new Date(b.createdAt) -
                    new Date(a.createdAt)
            )

            .slice(0, 5);

    /* =====================================
        Monthly Revenue
    ===================================== */

    const months = [

        "Jan",

        "Feb",

        "Mar",

        "Apr",

        "May",

        "Jun",

        "Jul",

        "Aug",

        "Sep",

        "Oct",

        "Nov",

        "Dec",

    ];

    const monthlyData =
        months.map(
            (month, index) => {

                const monthTransactions =
                    transactions.filter(
                        (transaction) => {

                            const date =
                                new Date(
                                    transaction.transactionDate
                                );

                            return (
                                date.getMonth() ===
                                index
                            );

                        }
                    );

                const monthlyRevenue =
                    monthTransactions

                        .filter(
                            (transaction) =>
                                [
                                    "income",
                                    "subscription",
                                ].includes(
                                    transaction.transactionType
                                )
                        )

                        .reduce(
                            (
                                sum,
                                transaction
                            ) =>
                                sum +
                                Number(
                                    transaction.amount
                                ),
                            0
                        );

                const monthlyExpense =
                    monthTransactions

                        .filter(
                            (transaction) =>
                                [
                                    "expense",
                                    "purchase",
                                    "salary",
                                    "tax",
                                ].includes(
                                    transaction.transactionType
                                )
                        )

                        .reduce(
                            (
                                sum,
                                transaction
                            ) =>
                                sum +
                                Number(
                                    transaction.amount
                                ),
                            0
                        );

                return {

                    month,

                    Revenue:
                        monthlyRevenue,

                    Expense:
                        monthlyExpense,

                    Profit:
                        monthlyRevenue -
                        monthlyExpense,

                };

            }
        );

    /* =====================================
        Dashboard Chart
    ===================================== */

    const chartData = [

        {

            name: "Revenue",

            value: revenue,

            fill: "#22c55e",

        },

        {

            name: "Expenses",

            value: expenses,

            fill: "#ef4444",

        },

        {

            name: "Profit",

            value: profit,

            fill: "#8b5cf6",

        },

    ];

    /* =====================================
        Expense Breakdown
    ===================================== */

    const expenseBreakdown =
        [

            "expense",

            "purchase",

            "salary",

            "tax",

        ].map((type) => ({

            name:
                type.charAt(0).toUpperCase() +
                type.slice(1),

            value:
                transactions

                    .filter(
                        (transaction) =>
                            transaction.transactionType ===
                            type
                    )

                    .reduce(
                        (
                            sum,
                            transaction
                        ) =>
                            sum +
                            Number(
                                transaction.amount
                            ),
                        0
                    ),

        }));

    /* =====================================
        Workspace Comparison
    ===================================== */

    const workspaceComparison =
        businessPerformance

            .sort(
                (a, b) =>
                    b.revenue -
                    a.revenue
            )

            .map(
                (workspace) => ({

                    name:
                        workspace.name,

                    revenue:
                        workspace.revenue,

                    profit:
                        workspace.profit,

                })
            );

    /* =====================================
        Highest Transaction
    ===================================== */

    const highestTransaction =
        transactions.length

            ? [...transactions]

                .sort(
                    (a, b) =>
                        Number(b.amount) -
                        Number(a.amount)
                )[0]

            : null;

                /* =====================================
        AI Recommendations
    ===================================== */

    const recommendations = [];

    if (profit > 0) {

        recommendations.push(
            "Business is operating profitably."
        );

    }

    else {

        recommendations.push(
            "Business is currently operating at a loss."
        );

    }

    if (profitMargin >= 40) {

        recommendations.push(
            "Profit margin is excellent."
        );

    }

    else if (profitMargin >= 20) {

        recommendations.push(
            "Healthy profit margin."
        );

    }

    else {

        recommendations.push(
            "Improve profit margin by reducing expenses."
        );

    }

    if (expenseRatio > 70) {

        recommendations.push(
            "Operating expenses are relatively high."
        );

    }

    if (transactions.length < 10) {

        recommendations.push(
            "Add more transactions for better analytics."
        );

    }

    if (topBusiness) {

        recommendations.push(
            `${topBusiness.name} is currently your best performing business.`
        );

    }

    /* =====================================
        Forecast
    ===================================== */

    const projectedRevenue =
        Math.round(
            revenue * 1.12
        );

    const projectedProfit =
        Math.round(
            profit * 1.10
        );

    const forecast = {

        projectedRevenue,

        projectedProfit,

        expectedGrowth: "12%",

        confidence: "91%",

    };

    /* =====================================
        Business Health Object
    ===================================== */

    const businessHealth = {

        revenueHealth,

        expenseHealth,

        profitability,

        insightIQScore,

        scoreStatus,

        scoreColor,

        insightMessage,

    };

    /* =====================================
        Export Data
    ===================================== */

    const exportData = {

        generatedAt: new Date(),

        revenue,

        expenses,

        profit,

        profitMargin,

        insightIQScore,

        businessPerformance,

    };

    /* =====================================
        Return
    ===================================== */

    return {

        /* Core */

        revenue,

        expenses,

        profit,

        profitMargin,

        expenseRatio,

        /* Score */

        insightIQScore,

        scoreStatus,

        scoreColor,

        insightMessage,

        /* Health */

        revenueHealth,

        expenseHealth,

        profitability,

        businessHealth,

        /* Business */

        businessPerformance,

        workspaceComparison,

        topBusiness,

        /* Dashboard */

        recentActivities,

        monthlyData,

        chartData,

        highestTransaction,

        /* Analytics */

        expenseBreakdown,

        recommendations,

        forecast,

        exportData,

    };

}