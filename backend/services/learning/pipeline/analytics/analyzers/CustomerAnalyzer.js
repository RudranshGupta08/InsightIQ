class CustomerAnalyzer {

    analyze({

        dataset = [],

        businessSchema = {},

        financialAnalysis = {}

    } = {}) {

        const customerField =
            businessSchema.fields?.customer;

        const productField =
            businessSchema.fields?.product;

        const regionField =
            businessSchema.fields?.region;

        const categoryField =
            businessSchema.fields?.category;

        const revenueField =
            businessSchema.fields?.revenue;

        const overview = this.buildOverview(

            customerField,

            productField,

            regionField,

            categoryField

        );

        const customers =
            this.buildCustomerMetrics(

                customerField,

                revenueField

            );

        const products =
            this.buildDistribution(

                productField,

                revenueField,

                "Product"

            );

        const regions =
            this.buildDistribution(

                regionField,

                revenueField,

                "Region"

            );

        const categories =
            this.buildDistribution(

                categoryField,

                revenueField,

                "Category"

            );

        const insights =
            this.buildInsights({

                overview,

                customers,

                products,

                regions,

                categories,

                financialAnalysis

            });

        return {

            overview,

            customers,

            products,

            regions,

            categories,

            insights

        };

    }

    buildOverview(

        customer,

        product,

        region,

        category

    ) {

        return {

            totalCustomers:
                customer?.uniqueValues?.length || 0,

            totalProducts:
                product?.uniqueValues?.length || 0,

            totalRegions:
                region?.uniqueValues?.length || 0,

            totalCategories:
                category?.uniqueValues?.length || 0

        };

    }

    buildCustomerMetrics(

        customer,

        revenue

    ) {

        if (!customer) {

            return {

                uniqueCustomers: 0,

                topCustomers: []

            };

        }

        const distribution = {};

        customer.values.forEach((name, index) => {

            const amount =
                revenue?.numericValues?.[index] || 0;

            if (!distribution[name]) {

                distribution[name] = {

                    customer: name,

                    revenue: 0,

                    transactions: 0

                };

            }

            distribution[name].revenue += amount;

            distribution[name].transactions++;

        });

        const topCustomers =

            Object.values(distribution)

                .sort(

                    (a, b) =>

                        b.revenue -

                        a.revenue

                )

                .slice(0, 10);

        return {

            uniqueCustomers:
                customer.uniqueValues.length,

            topCustomers

        };

    }

    buildDistribution(

        field,

        revenue,

        label

    ) {

        if (!field) {

            return {

                label,

                total: 0,

                items: []

            };

        }

        const distribution = {};

        field.values.forEach((value, index) => {

            const amount =
                revenue?.numericValues?.[index] || 0;

            if (!distribution[value]) {

                distribution[value] = {

                    name: value,

                    revenue: 0,

                    count: 0

                };

            }

            distribution[value].count++;

            distribution[value].revenue += amount;

        });

        const items =

            Object.values(distribution)

                .sort(

                    (a, b) =>

                        b.revenue -

                        a.revenue

                );

        return {

            label,

            total: items.length,

            items

        };

    }

    buildInsights({

        overview,

        customers,

        products,

        regions,

        categories,

        financialAnalysis

    }) {

        const insights = [];

        if (

            customers.uniqueCustomers > 0

        ) {

            insights.push({

                severity: "info",

                title: "Customer Base",

                description:

                    `${customers.uniqueCustomers} unique customers were identified.`

            });

        }

        if (

            customers.topCustomers.length

        ) {

            const top =

                customers.topCustomers[0];

            insights.push({

                severity: "positive",

                title: "Top Customer",

                description:

                    `${top.customer} generated the highest revenue of ₹${top.revenue.toFixed(2)}.`

            });

        }

        if (

            products.items.length

        ) {

            insights.push({

                severity: "info",

                title: "Best Performing Product",

                description:

                    `${products.items[0].name} is the highest revenue generating product.`

            });

        }

        if (

            regions.items.length

        ) {

            insights.push({

                severity: "info",

                title: "Best Performing Region",

                description:

                    `${regions.items[0].name} contributes the highest business revenue.`

            });

        }

        if (

            categories.items.length

        ) {

            insights.push({

                severity: "info",

                title: "Category Performance",

                description:

                    `${categories.items[0].name} is currently the strongest performing category.`

            });

        }

        return insights;

    }

}

module.exports = new CustomerAnalyzer();