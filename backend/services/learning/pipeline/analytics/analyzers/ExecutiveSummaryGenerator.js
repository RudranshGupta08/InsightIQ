class ExecutiveSummaryGenerator {

    generate({

        dataset = {},

        financial = {},

        customer = {},

        operational = {},

        trends = {},

        risks = {},

        businessHealth = {}

    } = {}) {

        const rows =
            dataset.summary?.rows || 0;

        const columns =
            dataset.summary?.columns || 0;

        const revenue =
            financial.overview?.totalRevenue || 0;

        const expense =
            financial.overview?.totalExpense || 0;

        const profit =
            financial.overview?.totalProfit || 0;

        const margin =
            financial.metrics?.profitMargin || 0;

        const quality =
            dataset.quality?.qualityScore || 0;

        const health =
            businessHealth.status || "Unknown";

        const healthScore =
            businessHealth.overallScore || 0;

        const customers =
            customer.overview?.totalCustomers || 0;

        const products =
            customer.overview?.totalProducts || 0;

        const growth =
            trends.revenue?.growth || 0;

        const risk =
            risks.financialRisk?.risk || "Unknown";

        const paragraphs = [];

        paragraphs.push(

            `InsightIQ analyzed ${rows} business records across ${columns} detected business fields.`

        );

        paragraphs.push(

            `The dataset generated a total revenue of ₹${revenue.toLocaleString()} while recording expenses of ₹${expense.toLocaleString()} and an overall profit of ₹${profit.toLocaleString()}.`

        );

        paragraphs.push(

            `Current profit margin stands at ${margin}% with a business health score of ${healthScore}/100 (${health}).`

        );

        paragraphs.push(

            `The uploaded data contains ${customers} customers and ${products} products with an overall dataset quality score of ${quality}%.`

        );

        if (growth > 0) {

            paragraphs.push(

                `Revenue trend indicates positive business growth of ${growth}% during the analyzed period.`

            );

        } else if (growth < 0) {

            paragraphs.push(

                `Revenue declined by ${Math.abs(growth)}%, requiring immediate attention.`

            );

        }

        paragraphs.push(

            `Overall financial risk is currently assessed as ${risk}.`

        );

        return {

            title: "Executive Summary",

            paragraphs,

            generatedAt: new Date()

        };

    }

}

module.exports = new ExecutiveSummaryGenerator();