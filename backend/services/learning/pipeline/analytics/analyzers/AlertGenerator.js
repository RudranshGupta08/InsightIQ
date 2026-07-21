class AlertGenerator {

    generate({

        dataset = {},

        financial = {},

        risks = {},

        businessHealth = {}

    } = {}) {

        const alerts = [];

        const quality =
            dataset.quality?.qualityScore || 0;

        if (quality < 80) {

            alerts.push({

                severity: "warning",

                title: "Poor Dataset Quality",

                description:

                    `Dataset quality score is only ${quality}%.`

            });

        }

        const expenseRatio =
            financial.metrics?.expenseRatio || 0;

        if (expenseRatio > 70) {

            alerts.push({

                severity: "critical",

                title: "High Operating Expenses",

                description:

                    `Expenses consume ${expenseRatio}% of revenue.`

            });

        }

        const margin =
            financial.metrics?.profitMargin || 0;

        if (margin < 15) {

            alerts.push({

                severity: "warning",

                title: "Low Profit Margin",

                description:

                    `Current profit margin is ${margin}%.`

            });

        }

        if (

            risks.financialRisk?.risk === "High"

        ) {

            alerts.push({

                severity: "critical",

                title: "Financial Risk",

                description:

                    "Business is exposed to high financial risk."

            });

        }

        if (

            businessHealth.overallScore >= 80

        ) {

            alerts.push({

                severity: "positive",

                title: "Healthy Business",

                description:

                    "Overall business performance is strong."

            });

        }

        return alerts;

    }

}

module.exports = new AlertGenerator();