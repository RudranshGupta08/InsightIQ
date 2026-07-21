class BusinessStoryGenerator {

    generate({

        dataset = {},

        financial = {},

        customer = {},

        operational = {},

        trends = {},

        businessHealth = {}

    } = {}) {

        const story = [];

        const rows =
            dataset.summary?.rows || 0;

        const revenue =
            financial.overview?.totalRevenue || 0;

        const profit =
            financial.overview?.totalProfit || 0;

        const customers =
            customer.overview?.totalCustomers || 0;

        const products =
            customer.overview?.totalProducts || 0;

        const branches =
            operational.overview?.branches || 0;

        const growth =
            trends.revenue?.growth || 0;

        const health =
            businessHealth.status || "Unknown";

        story.push(

            `The uploaded dataset represents ${rows} business transactions processed by the organization.`

        );

        if (customers > 0) {

            story.push(

                `A total of ${customers} unique customers interacted with ${products} products or services.`

            );

        }

        if (branches > 0) {

            story.push(

                `Business operations span across ${branches} operational locations.`

            );

        }

        story.push(

            `The company generated ₹${revenue.toLocaleString()} revenue while earning ₹${profit.toLocaleString()} profit.`

        );

        if (growth > 0) {

            story.push(

                `Revenue trend indicates positive growth of ${growth}% suggesting healthy expansion.`

            );

        }

        if (growth < 0) {

            story.push(

                `Revenue declined by ${Math.abs(growth)}%, indicating the need for corrective business actions.`

            );

        }

        story.push(

            `Overall business health is currently rated "${health}".`

        );

        return story;

    }

}

module.exports = new BusinessStoryGenerator();