class FinancialAnalyzer {

    analyze({
        dataset = [],
        businessSchema = {},
        datasetAnalysis = {}
    } = {}) {

        const revenue =
            this.getField(
                businessSchema,
                "revenue"
            );

        const expense =
            this.getField(
                businessSchema,
                "expense"
            );

        const profit =
            this.getProfit(
                businessSchema,
                revenue,
                expense
            );

        const overview = {

            totalRevenue:
                revenue.total,

            totalExpense:
                expense.total,

            totalProfit:
                profit.total,

            averageRevenue:
                revenue.average,

            averageExpense:
                expense.average,

            averageProfit:
                profit.average

        };

        const metrics =
            this.buildMetrics(

                revenue,

                expense,

                profit

            );

        const insights =
            this.buildInsights(

                overview,

                metrics,

                datasetAnalysis

            );

        return {

            overview,

            metrics,

            insights

        };

    }

    getField(

        businessSchema,

        fieldName

    ) {

        const field =

            businessSchema.fields?.[fieldName];

        if (!field) {

            return {

                total: 0,

                average: 0,

                min: 0,

                max: 0,

                values: []

            };

        }

        return {

            total:
                field.total || 0,

            average:
                Number(
                    (field.average || 0)
                        .toFixed(2)
                ),

            min:
                field.min || 0,

            max:
                field.max || 0,

            values:
                field.numericValues || []

        };

    }

    getProfit(

        businessSchema,

        revenue,

        expense

    ) {

        if (

            businessSchema.fields?.profit

        ) {

            return this.getField(

                businessSchema,

                "profit"

            );

        }

        const total =

            revenue.total -

            expense.total;

        const average =

            revenue.average -

            expense.average;

        return {

            total,

            average,

            min: average,

            max: average,

            values: []

        };

    }

    buildMetrics(

        revenue,

        expense,

        profit

    ) {

        const profitMargin =

            revenue.total

                ? Number(

                    (

                        profit.total /

                        revenue.total *

                        100

                    ).toFixed(2)

                )

                : 0;

        const expenseRatio =

            revenue.total

                ? Number(

                    (

                        expense.total /

                        revenue.total *

                        100

                    ).toFixed(2)

                )

                : 0;

        const profitRatio =

            revenue.total

                ? Number(

                    (

                        profit.total /

                        revenue.total *

                        100

                    ).toFixed(2)

                )

                : 0;

        return {

            highestRevenue:

                revenue.max,

            lowestRevenue:

                revenue.min,

            highestExpense:

                expense.max,

            lowestExpense:

                expense.min,

            highestProfit:

                profit.max,

            lowestProfit:

                profit.min,

            profitMargin,

            expenseRatio,

            profitRatio

        };

    }
        buildInsights(

        overview,

        metrics,

        datasetAnalysis

    ) {

        const insights = [];

        insights.push(

            ...this.buildPositiveInsights(

                overview,

                metrics

            )

        );

        insights.push(

            ...this.buildWarningInsights(

                overview,

                metrics

            )

        );

        insights.push(

            ...this.buildInformationInsights(

                overview,

                datasetAnalysis

            )

        );

        return insights;

    }

    buildPositiveInsights(

        overview,

        metrics

    ) {

        const insights = [];

        if (metrics.profitMargin >= 25) {

            insights.push({

                severity: "positive",

                title: "Healthy Profit Margin",

                description:
                    `Profit margin is ${metrics.profitMargin}% indicating healthy business profitability.`

            });

        }

        if (

            overview.totalRevenue >

            overview.totalExpense

        ) {

            insights.push({

                severity: "positive",

                title: "Revenue exceeds expenses",

                description:
                    "Revenue comfortably exceeds operational expenses."

            });

        }

        return insights;

    }

    buildWarningInsights(

        overview,

        metrics

    ) {

        const insights = [];

        if (

            metrics.expenseRatio >= 80

        ) {

            insights.push({

                severity: "warning",

                title: "High Operating Cost",

                description:
                    `Expenses consume ${metrics.expenseRatio}% of revenue which may reduce profitability.`

            });

        }

        if (

            metrics.profitMargin < 10

        ) {

            insights.push({

                severity: "warning",

                title: "Low Profit Margin",

                description:
                    "Current profit margin is below recommended business levels."

            });

        }

        if (

            overview.totalRevenue === 0

        ) {

            insights.push({

                severity: "critical",

                title: "Revenue Not Detected",

                description:
                    "No revenue information was identified in the uploaded dataset."

            });

        }

        return insights;

    }

    buildInformationInsights(

        overview,

        datasetAnalysis

    ) {

        const insights = [];

        insights.push({

            severity: "info",

            title: "Average Revenue",

            description:
                `Average revenue is ₹${overview.averageRevenue.toFixed(2)}.`

        });

        insights.push({

            severity: "info",

            title: "Average Expense",

            description:
                `Average expense is ₹${overview.averageExpense.toFixed(2)}.`

        });

        if (

            datasetAnalysis?.summary?.rows

        ) {

            insights.push({

                severity: "info",

                title: "Dataset Coverage",

                description:
                    `Financial analysis is based on ${datasetAnalysis.summary.rows} records.`

            });

        }

        return insights;

    }

}

module.exports = new FinancialAnalyzer();