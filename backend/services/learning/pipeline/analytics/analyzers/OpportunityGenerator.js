class OpportunityGenerator {

    generate({

        customer = {},

        trends = {},

        financial = {},

        businessHealth = {}

    } = {}) {

        const opportunities = [];

        if (

            trends.revenue?.growth > 10

        ) {

            opportunities.push({

                priority: "High",

                title: "Business Expansion",

                description:

                    "Positive revenue trend indicates expansion opportunities."

            });

        }

        if (

            customer.customers?.uniqueCustomers > 50

        ) {

            opportunities.push({

                priority: "Medium",

                title: "Upselling",

                description:

                    "Existing customer base can be leveraged for upselling."

            });

        }

        if (

            financial.metrics?.profitMargin > 20

        ) {

            opportunities.push({

                priority: "Medium",

                title: "Premium Pricing",

                description:

                    "Healthy margins allow premium pricing strategies."

            });

        }

        if (

            businessHealth.overallScore > 80

        ) {

            opportunities.push({

                priority: "High",

                title: "Scale Operations",

                description:

                    "Current business health supports expansion."

            });

        }

        return opportunities;

    }

}

module.exports = new OpportunityGenerator();