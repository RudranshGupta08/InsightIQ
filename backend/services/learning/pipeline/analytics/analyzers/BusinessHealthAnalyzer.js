class BusinessHealthAnalyzer {

    analyze({

        datasetAnalysis = {},

        financialAnalysis = {},

        customerAnalysis = {},

        operationalAnalysis = {},

        trendAnalysis = {},

        riskAnalysis = {}

    } = {}) {

        const scores = {

            dataQuality:
                this.calculateDataQualityScore(
                    datasetAnalysis
                ),

            financial:
                this.calculateFinancialScore(
                    financialAnalysis
                ),

            customer:
                this.calculateCustomerScore(
                    customerAnalysis
                ),

            operational:
                this.calculateOperationalScore(
                    operationalAnalysis
                ),

            trend:
                this.calculateTrendScore(
                    trendAnalysis
                ),

            risk:
                this.calculateRiskScore(
                    riskAnalysis
                )

        };

        const overallScore =
            Math.round(

                Object.values(scores)

                    .reduce(

                        (sum, score) =>

                            sum + score,

                        0

                    ) /

                Object.keys(scores).length

            );

        const status =
            this.getStatus(overallScore);

        return {

            overallScore,

            status,

            scores,

            insights:
                this.buildInsights(

                    overallScore,

                    status,

                    scores

                )

        };

    }

    calculateDataQualityScore(

        datasetAnalysis

    ) {

        return datasetAnalysis?.quality?.qualityScore || 0;

    }

    calculateFinancialScore(

        financialAnalysis

    ) {

        const margin =

            financialAnalysis?.metrics?.profitMargin || 0;

        if (margin >= 25) return 100;

        if (margin >= 20) return 85;

        if (margin >= 10) return 70;

        return 50;

    }

    calculateCustomerScore(

        customerAnalysis

    ) {

        const customers =

            customerAnalysis?.customers?.uniqueCustomers || 0;

        if (customers >= 100) return 100;

        if (customers >= 50) return 85;

        if (customers >= 20) return 70;

        return customers > 0 ? 55 : 40;

    }

    calculateOperationalScore(

        operationalAnalysis

    ) {

        const overview =

            operationalAnalysis?.overview || {};

        let score = 50;

        if (overview.branches) score += 10;

        if (overview.departments) score += 10;

        if (overview.inventoryItems) score += 10;

        if (overview.suppliers) score += 10;

        if (overview.projects) score += 10;

        return Math.min(score, 100);

    }

    calculateTrendScore(

        trendAnalysis

    ) {

        const growth =

            trendAnalysis?.revenue?.growth || 0;

        if (growth >= 20) return 100;

        if (growth >= 10) return 85;

        if (growth >= 0) return 70;

        return 50;

    }

    calculateRiskScore(

        riskAnalysis

    ) {

        const risk =

            riskAnalysis?.financialRisk?.risk;

        if (risk === "Low") return 100;

        if (risk === "Medium") return 75;

        return 50;

    }

    getStatus(score) {

        if (score >= 90)

            return "Excellent";

        if (score >= 75)

            return "Healthy";

        if (score >= 60)

            return "Stable";

        if (score >= 40)

            return "Needs Attention";

        return "Critical";

    }

    buildInsights(

        overallScore,

        status,

        scores

    ) {

        const insights = [];

        insights.push({

            severity:

                overallScore >= 75

                    ? "positive"

                    : "warning",

            title:

                "Overall Business Health",

            description:

                `Overall business health score is ${overallScore}/100 (${status}).`

        });

        Object.entries(scores).forEach(

            ([name, score]) => {

                if (score < 60) {

                    insights.push({

                        severity: "warning",

                        title:

                            `${name} Performance`,

                        description:

                            `${name} requires improvement.`

                    });

                }

            }

        );

        if (

            insights.length === 1

        ) {

            insights.push({

                severity: "positive",

                title:

                    "Balanced Performance",

                description:

                    "No major weaknesses detected across business functions."

            });

        }

        return insights;

    }

}

module.exports = new BusinessHealthAnalyzer();