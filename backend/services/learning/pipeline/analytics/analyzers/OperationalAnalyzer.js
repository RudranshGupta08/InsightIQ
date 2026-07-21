class OperationalAnalyzer {

    analyze({

        dataset = [],

        businessSchema = {}

    } = {}) {

        const inventory =
            businessSchema.fields?.inventory ||
            businessSchema.fields?.stock ||
            businessSchema.fields?.quantity;

        const branch =
            businessSchema.fields?.branch;

        const department =
            businessSchema.fields?.department;

        const employee =
            businessSchema.fields?.employee;

        const supplier =
            businessSchema.fields?.supplier ||
            businessSchema.fields?.vendor;

        const project =
            businessSchema.fields?.project;

        const overview = this.buildOverview({

            inventory,

            branch,

            department,

            employee,

            supplier,

            project

        });

        const inventoryAnalysis =
            this.buildDistribution(

                inventory,

                "Inventory"

            );

        const branchAnalysis =
            this.buildDistribution(

                branch,

                "Branch"

            );

        const departmentAnalysis =
            this.buildDistribution(

                department,

                "Department"

            );

        const supplierAnalysis =
            this.buildDistribution(

                supplier,

                "Supplier"

            );

        const projectAnalysis =
            this.buildDistribution(

                project,

                "Project"

            );

        const insights =
            this.buildInsights({

                overview,

                inventoryAnalysis,

                branchAnalysis,

                departmentAnalysis,

                supplierAnalysis,

                projectAnalysis

            });

        return {

            overview,

            inventory: inventoryAnalysis,

            branches: branchAnalysis,

            departments: departmentAnalysis,

            suppliers: supplierAnalysis,

            projects: projectAnalysis,

            insights

        };

    }

    buildOverview({

        inventory,

        branch,

        department,

        employee,

        supplier,

        project

    }) {

        return {

            inventoryItems:
                inventory?.uniqueValues?.length || 0,

            branches:
                branch?.uniqueValues?.length || 0,

            departments:
                department?.uniqueValues?.length || 0,

            employees:
                employee?.uniqueValues?.length || 0,

            suppliers:
                supplier?.uniqueValues?.length || 0,

            projects:
                project?.uniqueValues?.length || 0

        };

    }

    buildDistribution(field, label) {

        if (!field) {

            return {

                label,

                total: 0,

                items: []

            };

        }

        const distribution = {};

        field.values.forEach(value => {

            distribution[value] =

                (distribution[value] || 0) + 1;

        });

        const items =

            Object.entries(distribution)

                .map(([name, count]) => ({

                    name,

                    count

                }))

                .sort(

                    (a, b) =>

                        b.count -

                        a.count

                );

        return {

            label,

            total: items.length,

            items

        };

    }

    buildInsights({

        overview,

        inventoryAnalysis,

        branchAnalysis,

        departmentAnalysis,

        supplierAnalysis,

        projectAnalysis

    }) {

        const insights = [];

        if (overview.inventoryItems) {

            insights.push({

                severity: "info",

                title: "Inventory Coverage",

                description:
                    `${overview.inventoryItems} unique inventory items detected.`

            });

        }

        if (overview.branches) {

            insights.push({

                severity: "info",

                title: "Business Presence",

                description:
                    `${overview.branches} business locations or branches identified.`

            });

        }

        if (overview.departments) {

            insights.push({

                severity: "info",

                title: "Departments",

                description:
                    `${overview.departments} operational departments are represented.`

            });

        }

        if (overview.suppliers) {

            insights.push({

                severity: "positive",

                title: "Supplier Network",

                description:
                    `${overview.suppliers} suppliers/vendors contribute to business operations.`

            });

        }

        if (overview.projects) {

            insights.push({

                severity: "info",

                title: "Projects",

                description:
                    `${overview.projects} active projects were identified.`

            });

        }

        if (

            !overview.inventoryItems &&

            !overview.branches &&

            !overview.departments &&

            !overview.suppliers &&

            !overview.projects

        ) {

            insights.push({

                severity: "info",

                title: "Operational Data",

                description:
                    "No operational entities were detected in the uploaded dataset."

            });

        }

        return insights;

    }

}

module.exports = new OperationalAnalyzer();