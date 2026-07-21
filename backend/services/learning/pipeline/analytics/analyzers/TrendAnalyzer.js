class TrendAnalyzer {

    analyze({

        dataset = [],

        businessSchema = {}

    } = {}) {

        const date =
            businessSchema.fields?.date;

        const revenue =
            businessSchema.fields?.revenue;

        const expense =
            businessSchema.fields?.expense;

        const profit =
            businessSchema.fields?.profit;

        const overview = this.buildOverview(

            date,

            revenue

        );

        const revenueTrend =
            this.buildTrend(

                date,

                revenue,

                "Revenue"

            );

        const expenseTrend =
            this.buildTrend(

                date,

                expense,

                "Expense"

            );

        const profitTrend =
            this.buildTrend(

                date,

                profit,

                "Profit"

            );

        const insights =
            this.buildInsights({

                revenueTrend,

                expenseTrend,

                profitTrend

            });

        return {

            overview,

            revenue: revenueTrend,

            expense: expenseTrend,

            profit: profitTrend,

            insights

        };

    }

    buildOverview(

        date,

        revenue

    ) {

        return {

            hasDate:

                !!date,

            periods:

                date?.uniqueValues?.length || 0,

            totalTransactions:

                revenue?.values?.length || 0

        };

    }

    buildTrend(

        date,

        metric,

        label

    ) {

        if (

            !date ||

            !metric

        ) {

            return {

                label,

                available: false,

                periods: [],

                total: 0,

                growth: 0

            };

        }

        const trend = {};

        date.values.forEach(

            (value, index) => {

                const period =

                    new Date(value)

                        .toISOString()

                        .slice(0, 7);

                const amount =

                    metric.numericValues?.[index] || 0;

                trend[period] =

                    (trend[period] || 0) +

                    amount;

            }

        );

        const periods =

            Object.entries(trend)

                .map(

                    ([period, value]) => ({

                        period,

                        value

                    })

                )

                .sort(

                    (a, b) =>

                        a.period.localeCompare(

                            b.period

                        )

                );

        let growth = 0;

        if (

            periods.length >= 2

        ) {

            const first =

                periods[0].value;

            const last =

                periods[

                    periods.length - 1

                ].value;

            if (first !== 0) {

                growth = Number(

                    (

                        (

                            (

                                last -

                                first

                            ) /

                            first

                        ) *

                        100

                    ).toFixed(2)

                );

            }

        }

        return {

            label,

            available: true,

            periods,

            total: periods.reduce(

                (sum, p) =>

                    sum + p.value,

                0

            ),

            growth

        };

    }

    buildInsights({

        revenueTrend,

        expenseTrend,

        profitTrend

    }) {

        const insights = [];

        if (

            revenueTrend.available

        ) {

            insights.push({

                severity:

                    revenueTrend.growth >= 0

                        ? "positive"

                        : "warning",

                title:

                    "Revenue Trend",

                description:

                    revenueTrend.growth >= 0

                        ? `Revenue increased by ${revenueTrend.growth}% over the analyzed period.`

                        : `Revenue declined by ${Math.abs(revenueTrend.growth)}% over the analyzed period.`

            });

        }

        if (

            expenseTrend.available

        ) {

            insights.push({

                severity: "info",

                title: "Expense Trend",

                description:

                    `Expenses changed by ${expenseTrend.growth}% across the available periods.`

            });

        }

        if (

            profitTrend.available

        ) {

            insights.push({

                severity:

                    profitTrend.growth >= 0

                        ? "positive"

                        : "warning",

                title: "Profit Trend",

                description:

                    profitTrend.growth >= 0

                        ? `Profit improved by ${profitTrend.growth}% during the observed period.`

                        : `Profit reduced by ${Math.abs(profitTrend.growth)}% during the observed period.`

            });

        }

        if (

            !revenueTrend.available

        ) {

            insights.push({

                severity: "info",

                title: "Trend Analysis",

                description:

                    "Trend analysis could not be performed because a valid date field was not detected."

            });

        }

        return insights;

    }

}

module.exports = new TrendAnalyzer();