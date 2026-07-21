class RiskAnalyzer {

    analyze({

        datasetAnalysis = {},

        financialAnalysis = {},

        customerAnalysis = {},

        operationalAnalysis = {}

    } = {}) {

        const overview = this.buildOverview({

            datasetAnalysis,

            financialAnalysis

        });

        const financialRisk =
            this.buildFinancialRisk(

                financialAnalysis

            );

        const customerRisk =
            this.buildCustomerRisk(

                customerAnalysis

            );

        const operationalRisk =
            this.buildOperationalRisk(

                operationalAnalysis

            );

        const dataRisk =
            this.buildDataRisk(

                datasetAnalysis

            );

        const insights =
            this.buildInsights({

                financialRisk,

                customerRisk,

                operationalRisk,

                dataRisk

            });

        return {

            overview,

            financialRisk,

            customerRisk,

            operationalRisk,

            dataRisk,

            insights

        };

    }

    buildOverview({

        datasetAnalysis,

        financialAnalysis

    }) {

        return {

            qualityScore:

                datasetAnalysis?.quality?.qualityScore || 0,

            profitMargin:

                financialAnalysis?.metrics?.profitMargin || 0

        };

    }

    buildFinancialRisk(financialAnalysis) {

        const margin =

            financialAnalysis?.metrics?.profitMargin || 0;

        const expenseRatio =

            financialAnalysis?.metrics?.expenseRatio || 0;

        return {

            profitMargin: margin,

            expenseRatio,

            risk:

                margin < 10

                    ? "High"

                    : margin < 20

                    ? "Medium"

                    : "Low"

        };

    }

    buildCustomerRisk(customerAnalysis) {

        const totalCustomers =

            customerAnalysis?.customers?.uniqueCustomers || 0;

        const topCustomers =

            customerAnalysis?.customers?.topCustomers || [];

        let concentration = 0;

        if (

            topCustomers.length > 0

        ) {

            const totalRevenue =

                topCustomers.reduce(

                    (sum, customer) =>

                        sum + customer.revenue,

                    0

                );

            concentration =

                totalRevenue > 0

                    ? Number(

                        (

                            (

                                topCustomers[0].revenue /

                                totalRevenue

                            ) *

                            100

                        ).toFixed(2)

                    )

                    : 0;

        }

        return {

            totalCustomers,

            concentration,

            risk:

                concentration > 60

                    ? "High"

                    : concentration > 40

                    ? "Medium"

                    : "Low"

        };

    }

    buildOperationalRisk(operationalAnalysis) {

        const inventoryItems =

            operationalAnalysis?.overview?.inventoryItems || 0;

        return {

            inventoryItems,

            risk:

                inventoryItems === 0

                    ? "Unknown"

                    : "Low"

        };

    }

    buildDataRisk(datasetAnalysis) {

        const quality =

            datasetAnalysis?.quality || {};

        return {

            duplicates:

                quality.duplicates || 0,

            missingValues:

                quality.missingValues || 0,

            qualityScore:

                quality.qualityScore || 0,

            risk:

                quality.qualityScore >= 90

                    ? "Low"

                    : quality.qualityScore >= 70

                    ? "Medium"

                    : "High"

        };

    }

    buildInsights({

        financialRisk,

        customerRisk,

        operationalRisk,

        dataRisk

    }) {

        const insights = [];

        if (

            financialRisk.risk === "High"

        ) {

            insights.push({

                severity: "critical",

                title: "Financial Risk",

                description:
                    "Profit margin is critically low."

            });

        }

        if (

            customerRisk.risk === "High"

        ) {

            insights.push({

                severity: "warning",

                title: "Customer Concentration",

                description:
                    "Business depends heavily on a single customer."

            });

        }

        if (

            dataRisk.risk === "High"

        ) {

            insights.push({

                severity: "warning",

                title: "Poor Data Quality",

                description:
                    "Missing values and duplicates may affect business decisions."

            });

        }

        if (

            operationalRisk.risk === "Unknown"

        ) {

            insights.push({

                severity: "info",

                title: "Operational Coverage",

                description:
                    "Operational data was insufficient for a detailed assessment."

            });

        }

        if (

            insights.length === 0

        ) {

            insights.push({

                severity: "positive",

                title: "Low Business Risk",

                description:
                    "No significant business risks were detected."

            });

        }

        return insights;

    }

}

module.exports = new RiskAnalyzer();