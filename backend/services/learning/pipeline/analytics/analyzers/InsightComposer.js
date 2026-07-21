const ExecutiveSummaryGenerator = require("./ExecutiveSummaryGenerator");
const BusinessStoryGenerator = require("./BusinessStoryGenerator");
const AlertGenerator = require("./AlertGenerator");
const OpportunityGenerator = require("./OpportunityGenerator");

class InsightComposer {

    compose({

        datasetAnalysis = {},

        financialAnalysis = {},

        customerAnalysis = {},

        operationalAnalysis = {},

        trendAnalysis = {},

        riskAnalysis = {},

        businessHealth = {}

    } = {}) {

        const executiveSummary =

            ExecutiveSummaryGenerator.generate({

                dataset: datasetAnalysis,

                financial: financialAnalysis,

                customer: customerAnalysis,

                operational: operationalAnalysis,

                trends: trendAnalysis,

                risks: riskAnalysis,

                businessHealth

            });

        const businessStory =

            BusinessStoryGenerator.generate({

                dataset: datasetAnalysis,

                financial: financialAnalysis,

                customer: customerAnalysis,

                operational: operationalAnalysis,

                trends: trendAnalysis,

                businessHealth

            });

        const alerts =

            AlertGenerator.generate({

                dataset: datasetAnalysis,

                financial: financialAnalysis,

                risks: riskAnalysis,

                businessHealth

            });

        const opportunities =

            OpportunityGenerator.generate({

                customer: customerAnalysis,

                financial: financialAnalysis,

                trends: trendAnalysis,

                businessHealth

            });

        return {

            executiveSummary,

            businessStory,

            alerts,

            opportunities,

            keyFindings:

                this.buildKeyFindings({

                    financialAnalysis,

                    customerAnalysis,

                    trendAnalysis

                }),

            strengths:

                this.buildStrengths({

                    financialAnalysis,

                    businessHealth,

                    riskAnalysis

                }),

            weaknesses:

                this.buildWeaknesses({

                    riskAnalysis,

                    businessHealth

                }),

            challenges:

                this.buildChallenges({

                    riskAnalysis,

                    operationalAnalysis

                })

        };

    }

    buildKeyFindings({

        financialAnalysis,

        customerAnalysis,

        trendAnalysis

    }) {

        return [

            {

                title: "Revenue",

                value:

                    financialAnalysis?.overview?.totalRevenue || 0

            },

            {

                title: "Profit",

                value:

                    financialAnalysis?.overview?.totalProfit || 0

            },

            {

                title: "Customers",

                value:

                    customerAnalysis?.customers?.uniqueCustomers || 0

            },

            {

                title: "Revenue Growth",

                value:

                    `${trendAnalysis?.revenue?.growth || 0}%`

            }

        ];

    }

    buildStrengths({

        financialAnalysis,

        businessHealth,

        riskAnalysis

    }) {

        const strengths = [];

        if (

            financialAnalysis?.metrics?.profitMargin >= 20

        ) {

            strengths.push(

                "Healthy profit margin."

            );

        }

        if (

            businessHealth?.overallScore >= 80

        ) {

            strengths.push(

                "Strong overall business health."

            );

        }

        if (

            riskAnalysis?.financialRisk?.risk === "Low"

        ) {

            strengths.push(

                "Low financial risk."

            );

        }

        return strengths;

    }

    buildWeaknesses({

        riskAnalysis,

        businessHealth

    }) {

        const weaknesses = [];

        if (

            riskAnalysis?.financialRisk?.risk === "High"

        ) {

            weaknesses.push(

                "Low profitability."

            );

        }

        if (

            riskAnalysis?.dataRisk?.risk === "High"

        ) {

            weaknesses.push(

                "Poor data quality."

            );

        }

        if (

            businessHealth?.overallScore < 60

        ) {

            weaknesses.push(

                "Overall business health requires improvement."

            );

        }

        return weaknesses;

    }

    buildChallenges({

        riskAnalysis,

        operationalAnalysis

    }) {

        const challenges = [];

        if (

            riskAnalysis?.customerRisk?.risk === "High"

        ) {

            challenges.push(

                "Revenue depends heavily on a limited number of customers."

            );

        }

        if (

            operationalAnalysis?.overview?.inventoryItems === 0

        ) {

            challenges.push(

                "Operational coverage is limited."

            );

        }

        return challenges;

    }

}

module.exports = new InsightComposer();