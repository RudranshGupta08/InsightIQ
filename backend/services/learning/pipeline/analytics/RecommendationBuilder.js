class RecommendationBuilder {

    async build(context) {

        const analytics = context.analytics || {};

        const recommendations = [];

        this.addFinancialRecommendations(
            recommendations,
            analytics.financial
        );

        this.addCustomerRecommendations(
            recommendations,
            analytics.customer,
            analytics.risks
        );

        this.addOperationalRecommendations(
            recommendations,
            analytics.operational
        );

        this.addTrendRecommendations(
            recommendations,
            analytics.trends
        );

        this.addDataRecommendations(
            recommendations,
            analytics.dataset
        );

        this.addBusinessHealthRecommendations(
            recommendations,
            analytics.businessHealth
        );

        recommendations.sort(
            (a, b) => b.priority - a.priority
        );

        context.recommendations = {

            total: recommendations.length,

            highPriority:
                recommendations.filter(
                    r => r.priority >= 90
                ),

            mediumPriority:
                recommendations.filter(
                    r =>
                        r.priority >= 70 &&
                        r.priority < 90
                ),

            lowPriority:
                recommendations.filter(
                    r => r.priority < 70
                ),

            all: recommendations

        };

        return context;

    }

    addFinancialRecommendations(

        recommendations,

        financial

    ) {

        if (!financial) return;

        if (

            financial.metrics?.profitMargin < 15

        ) {

            recommendations.push({

                priority: 100,

                category: "Finance",

                title: "Improve Profit Margin",

                impact: "High",

                reason:
                    `Current profit margin is ${financial.metrics.profitMargin}% which is below recommended business levels.`,

                recommendation:
                    "Reduce operating costs, optimize pricing strategy and focus on high-margin products."

            });

        }

        if (

            financial.metrics?.expenseRatio > 70

        ) {

            recommendations.push({

                priority: 95,

                category: "Finance",

                title: "Reduce Operating Expenses",

                impact: "High",

                reason:
                    `Expenses account for ${financial.metrics.expenseRatio}% of total revenue.`,

                recommendation:
                    "Review operational expenses and identify unnecessary costs."

            });

        }

    }

    addCustomerRecommendations(

        recommendations,

        customer,

        risks

    ) {

        if (!customer) return;

        const topCustomer =

            customer.customers?.topCustomers?.[0];

        if (topCustomer) {

            recommendations.push({

                priority: 80,

                category: "Customer",

                title: "Strengthen Customer Relationships",

                impact: "Medium",

                reason:
                    `${topCustomer.customer} is currently the highest revenue contributor.`,

                recommendation:
                    "Maintain strong engagement while expanding the broader customer base."

            });

        }

        if (

            risks?.customerRisk?.risk === "High"

        ) {

            recommendations.push({

                priority: 95,

                category: "Customer",

                title: "Reduce Customer Dependency",

                impact: "High",

                reason:
                    "Revenue is concentrated among a limited number of customers.",

                recommendation:
                    "Acquire new customers to reduce concentration risk."

            });

        }

    }

    addOperationalRecommendations(

        recommendations,

        operational

    ) {

        if (!operational) return;

        if (

            operational.overview?.inventoryItems === 0

        ) {

            recommendations.push({

                priority: 60,

                category: "Operations",

                title: "Improve Operational Visibility",

                impact: "Medium",

                reason:
                    "Inventory information is unavailable.",

                recommendation:
                    "Capture inventory and operational data for better decision making."

            });

        }

    }

    addTrendRecommendations(

        recommendations,

        trends

    ) {

        if (!trends) return;

        if (

            trends.revenue?.growth < 0

        ) {

            recommendations.push({

                priority: 95,

                category: "Growth",

                title: "Reverse Revenue Decline",

                impact: "High",

                reason:
                    `Revenue declined by ${Math.abs(trends.revenue.growth)}%.`,

                recommendation:
                    "Investigate demand, pricing and customer acquisition strategy."

            });

        }

    }

    addDataRecommendations(

        recommendations,

        dataset

    ) {

        if (!dataset) return;

        if (

            dataset.quality?.qualityScore < 85

        ) {

            recommendations.push({

                priority: 90,

                category: "Data",

                title: "Improve Data Quality",

                impact: "High",

                reason:
                    `Dataset quality score is ${dataset.quality.qualityScore}/100.`,

                recommendation:
                    "Remove duplicates, complete missing values and standardize records."

            });

        }

    }

    addBusinessHealthRecommendations(

        recommendations,

        health

    ) {

        if (!health) return;

        if (

            health.overallScore < 70

        ) {

            recommendations.push({

                priority: 100,

                category: "Business",

                title: "Improve Overall Business Performance",

                impact: "Critical",

                reason:
                    `Overall business health score is ${health.overallScore}/100.`,

                recommendation:
                    "Prioritize improvements in finance, customer growth and operational efficiency."

            });

        }

    }

}

module.exports = new RecommendationBuilder();