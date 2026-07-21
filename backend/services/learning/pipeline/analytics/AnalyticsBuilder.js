const DatasetAnalyzer = require("./analyzers/DatasetAnalyzer");
const FinancialAnalyzer = require("./analyzers/FinancialAnalyzer");
const CustomerAnalyzer = require("./analyzers/CustomerAnalyzer");
const OperationalAnalyzer = require("./analyzers/OperationalAnalyzer");
const TrendAnalyzer = require("./analyzers/TrendAnalyzer");
const RiskAnalyzer = require("./analyzers/RiskAnalyzer");
const BusinessHealthAnalyzer = require("./analyzers/BusinessHealthAnalyzer");
const InsightComposer = require("./analyzers/InsightComposer");

class AnalyticsBuilder {

    async build(context) {

        const startedAt = Date.now();

        context.reasoning.push({

            stage: "Business Intelligence",

            input: context.dataset?.length || 0,

            output: null,

            decision:
                "Executing InsightIQ Business Intelligence Engine.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        /*
        ===========================================
                EXECUTE ANALYZERS
        ===========================================
        */

        const datasetAnalysis =
            DatasetAnalyzer.analyze(

                context.dataset,

                context.businessSchema

            );

        const financialAnalysis =
            FinancialAnalyzer.analyze({

                dataset:
                    context.dataset,

                businessSchema:
                    context.businessSchema,

                datasetAnalysis

            });

        const customerAnalysis =
            CustomerAnalyzer.analyze({

                dataset:
                    context.dataset,

                businessSchema:
                    context.businessSchema,

                financialAnalysis

            });

        const operationalAnalysis =
            OperationalAnalyzer.analyze({

                dataset:
                    context.dataset,

                businessSchema:
                    context.businessSchema

            });

        const trendAnalysis =
            TrendAnalyzer.analyze({

                dataset:
                    context.dataset,

                businessSchema:
                    context.businessSchema

            });

        const riskAnalysis =
            RiskAnalyzer.analyze({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis

            });

        const businessHealth =
            BusinessHealthAnalyzer.analyze({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis

            });

        const executiveComposer =
            InsightComposer.compose({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                BUSINESS SECTION
        ===========================================
        */

        const business =
            this.buildBusinessSection(

                context.businessSchema

            );

        /*
        ===========================================
                EXECUTIVE SECTION
        ===========================================
        */

        const executive =
            this.buildExecutiveSection({

                datasetAnalysis,

                financialAnalysis,

                businessHealth,

                business

            });

        /*
        ===========================================
                PREDICTION
        ===========================================
        */

        const prediction =
            this.buildPredictionSection({

                datasetAnalysis,

                trendAnalysis,

                financialAnalysis,

                businessHealth

            });

        /*
        ===========================================
                FIELD INTELLIGENCE
        ===========================================
        */

        const fieldIntelligence =
            this.buildFieldIntelligence(

                context.mappings || []

            );

                /*
        ===========================================
                DASHBOARD KPI ENGINE
        ===========================================
        */

        const dashboardKPIs =
            this.buildDashboardKPIs({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                ALERT ENGINE
        ===========================================
        */

        const alerts =
            this.buildAlerts({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                OPPORTUNITY ENGINE
        ===========================================
        */

        const opportunities =
            this.buildOpportunities({

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                businessHealth

            });

        /*
        ===========================================
                INSIGHT ENGINE
        ===========================================
        */

        const insights =
            this.buildInsights({

                datasetAnalysis,

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                EXECUTIVE SUMMARY
        ===========================================
        */

        const executiveSummary =
            this.buildExecutiveSummary({

                executive,

                business,

                dashboardKPIs,

                financialAnalysis,

                customerAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                BUSINESS STORY
        ===========================================
        */

        const businessStory =
            this.buildBusinessStory({

                financialAnalysis,

                customerAnalysis,

                operationalAnalysis,

                trendAnalysis,

                riskAnalysis,

                businessHealth

            });

        /*
        ===========================================
                FINAL ANALYTICS OBJECT
        ===========================================
        */

        const executiveInsights =
    InsightComposer.compose({

        datasetAnalysis,

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    });

        context.analytics = {

    dataset: datasetAnalysis,

    financial: financialAnalysis,

    customer: customerAnalysis,

    operational: operationalAnalysis,

    trends: trendAnalysis,

    risks: riskAnalysis,

    businessHealth,

    executiveInsights,

    executive: {

        domain:
            context.businessSchema?.domain || "Business",

        totalRecords:
            datasetAnalysis.summary?.rows || 0,

        totalFields:
            datasetAnalysis.summary?.columns || 0,

        datasetQuality:
            datasetAnalysis.quality?.qualityScore || 0,

        revenue:
            financialAnalysis.overview?.totalRevenue || 0,

        profit:
            financialAnalysis.overview?.totalProfit || 0,

        profitMargin:
            financialAnalysis.metrics?.profitMargin || 0,

        businessHealth:
            businessHealth.status,

        healthScore:
            businessHealth.overallScore,

        aiConfidence:
            context.mappings?.length
                ? Math.round(
                    context.mappings.reduce(
                        (sum, mapping) => sum + (mapping.confidence || 0),
                        0
                    ) / context.mappings.length
                )
                : 0,

        predictionReady:
            trendAnalysis.revenue?.available || false

    }

};
        
                /*
        ===========================================
                PIPELINE REASONING
        ===========================================
        */

        context.reasoning.push({

            stage: "Business Intelligence",

            input: context.dataset?.length || 0,

            output: Object.keys(

                context.analytics

            ).length,

            decision:
                "Business Intelligence Engine completed successfully.",

            confidence:
                executive.confidence,

            duration:
                Date.now() - startedAt,

            timestamp:
                new Date()

        });

        /*
        ===========================================
                CONTEXT
        ===========================================
        */

        return context;

    }

    /*
    ===========================================================
                    BUSINESS SECTION
    ===========================================================
    */

    buildBusinessSection(schema = {}) {

        const fields =

            schema.fields || {};

        const fieldNames =

            Object.keys(fields);

        const modules = [

            ...new Set(

                Object.values(fields)

                    .map(field => field.module)

                    .filter(Boolean)

            )

        ];

        const numericFields =

            fieldNames.filter(

                field =>

                    fields[field]?.dataType ===

                    "numeric"

            );

        const categoricalFields =

            fieldNames.filter(

                field =>

                    fields[field]?.dataType ===

                    "categorical"

            );

        const dateFields =

            fieldNames.filter(

                field =>

                    fields[field]?.dataType ===

                    "date"

            );

        const domain =

            this.detectBusinessDomain(

                modules,

                fieldNames

            );

        return {

            domain,

            modules,

            detectedFields:

                fieldNames,

            businessFields:

                fieldNames.length,

            numericFields:

                numericFields.length,

            categoricalFields:

                categoricalFields.length,

            dateFields:

                dateFields.length

        };

    }

        /*
    ===========================================================
                BUSINESS DOMAIN DETECTOR
    ===========================================================
    */

    detectBusinessDomain(

        modules = [],

        fields = []

    ) {

        const names =

            fields.map(

                field =>

                    field.toLowerCase()

            );

        if (

            names.includes("patient") ||

            names.includes("doctor") ||

            names.includes("hospital")

        ) {

            return "Healthcare";

        }

        if (

            names.includes("student") ||

            names.includes("course") ||

            names.includes("teacher")

        ) {

            return "Education";

        }

        if (

            names.includes("inventory") ||

            names.includes("stock") ||

            names.includes("warehouse")

        ) {

            return "Inventory";

        }

        if (

            names.includes("employee") ||

            names.includes("salary") ||

            names.includes("department")

        ) {

            return "Human Resource";

        }

        if (

            names.includes("shipment") ||

            names.includes("delivery") ||

            names.includes("dispatch")

        ) {

            return "Logistics";

        }

        if (

            names.includes("product") ||

            names.includes("customer") ||

            names.includes("sales") ||

            names.includes("invoice") ||

            names.includes("revenue")

        ) {

            return "Retail & Sales";

        }

        if (

            names.includes("loan") ||

            names.includes("account") ||

            names.includes("transaction")

        ) {

            return "Banking";

        }

        if (

            names.includes("policy") ||

            names.includes("claim")

        ) {

            return "Insurance";

        }

        if (

            names.includes("crop") ||

            names.includes("farmer")

        ) {

            return "Agriculture";

        }

        if (

            names.includes("room") ||

            names.includes("booking")

        ) {

            return "Hospitality";

        }

        if (

            modules.includes("Finance")

        ) {

            return "Finance";

        }

        return "Business";

    }

    /*
    ===========================================================
                    EXECUTIVE ENGINE
    ===========================================================
    */

    buildExecutiveSection({

        datasetAnalysis,

        financialAnalysis,

        businessHealth,

        business

    }) {

        const rows =

            datasetAnalysis?.summary?.rows || 0;

        const columns =

            datasetAnalysis?.summary?.columns || 0;

        const quality =

            datasetAnalysis?.quality?.qualityScore || 0;

        const healthScore =

            businessHealth?.overallScore || 0;

        const confidence =

            Math.round(

                (

                    quality +

                    healthScore

                ) / 2

            );

        return {

            title:

                `${business.domain} Business Intelligence Report`,

            domain:

                business.domain,

            generatedAt:

                new Date(),

            totalRecords:

                rows,

            totalFields:

                columns,

            datasetQuality:

                quality,

            businessHealth:

                businessHealth.status,

            healthScore,

            aiConfidence:

                confidence,

            predictionReady:

                confidence >= 70,

            revenue:

                financialAnalysis?.overview?.totalRevenue || 0,

            expense:

                financialAnalysis?.overview?.totalExpense || 0,

            profit:

                financialAnalysis?.overview?.totalProfit || 0,

            profitMargin:

                financialAnalysis?.metrics?.profitMargin || 0

        };

    }

        /*
    ===========================================================
                    PREDICTION ENGINE
    ===========================================================
    */

    buildPredictionSection({

        datasetAnalysis,

        trendAnalysis,

        financialAnalysis,

        businessHealth

    }) {

        const quality =
            datasetAnalysis?.quality?.qualityScore || 0;

        const health =
            businessHealth?.overallScore || 0;

        const hasTrend =
            trendAnalysis?.overview?.hasDate || false;

        const hasRevenue =
            (financialAnalysis?.overview?.totalRevenue || 0) > 0;

        const models = [];

        if (hasTrend) {

            models.push("Time Series Forecasting");

        }

        if (hasRevenue) {

            models.push("Revenue Forecasting");

        }

        if (quality >= 80) {

            models.push("Regression");

            models.push("Classification");

        }

        const confidence = Math.round(

            (quality + health) / 2

        );

        return {

            ready:

                models.length > 0,

            confidence,

            forecastAvailable:

                hasTrend,

            regressionAvailable:

                quality >= 80,

            classificationAvailable:

                quality >= 80,

            supportedModels:

                models

        };

    }

    /*
    ===========================================================
                    DASHBOARD KPI ENGINE
    ===========================================================
    */

    buildDashboardKPIs({

        datasetAnalysis,

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    }) {

        const kpis = [];

        kpis.push({

            id: "records",

            title: "Records",

            value:

                datasetAnalysis?.summary?.rows || 0,

            icon: "database"

        });

        kpis.push({

            id: "quality",

            title: "Dataset Quality",

            value:

                datasetAnalysis?.quality?.qualityScore || 0,

            unit: "%",

            icon: "shield"

        });

        kpis.push({

            id: "health",

            title: "Business Health",

            value:

                businessHealth?.overallScore || 0,

            unit: "%",

            icon: "activity"

        });

        kpis.push({

            id: "revenue",

            title: "Revenue",

            value:

                financialAnalysis?.overview?.totalRevenue || 0,

            currency: true,

            icon: "trending-up"

        });

        kpis.push({

            id: "profit",

            title: "Profit",

            value:

                financialAnalysis?.overview?.totalProfit || 0,

            currency: true,

            icon: "wallet"

        });

        kpis.push({

            id: "margin",

            title: "Profit Margin",

            value:

                financialAnalysis?.metrics?.profitMargin || 0,

            unit: "%",

            icon: "percent"

        });

        kpis.push({

            id: "customers",

            title: "Customers",

            value:

                customerAnalysis?.customers?.uniqueCustomers || 0,

            icon: "users"

        });

        kpis.push({

            id: "growth",

            title: "Revenue Growth",

            value:

                trendAnalysis?.revenue?.growth || 0,

            unit: "%",

            icon: "bar-chart"

        });

        kpis.push({

            id: "risk",

            title: "Financial Risk",

            value:

                riskAnalysis?.financialRisk?.risk || "Unknown",

            icon: "alert-circle"

        });

        kpis.push({

            id: "inventory",

            title: "Inventory Items",

            value:

                operationalAnalysis?.overview?.inventoryItems || 0,

            icon: "package"

        });

        return kpis;

    }

        /*
    ===========================================================
                FIELD INTELLIGENCE ENGINE
    ===========================================================
    */

    buildFieldIntelligence(mappings = []) {

        if (!Array.isArray(mappings)) {

            return [];

        }

        return mappings.map(mapping => {

            const entity = mapping.entity || {};

            const field =

                mapping.mappedTo ||

                mapping.original;

            return {

                original:

                    mapping.original,

                normalized:

                    mapping.normalized ||

                    mapping.original.toLowerCase(),

                businessField:

                    field,

                confidence:

                    mapping.confidence?.score || 0,

                confidenceLevel:

                    mapping.confidence?.level ||

                    "Unknown",

                module:

                    entity.businessModule ||

                    entity.module ||

                    "General",

                category:

                    entity.category ||

                    "Business",

                type:

                    entity.type ||

                    "unknown",

                dataType:

                    entity.dataType ||

                    "unknown",

                importance:

                    this.getFieldImportance(

                        field

                    ),

                businessMeaning:

                    this.getBusinessMeaning(

                        field

                    ),

                supportedAnalytics:

                    this.getSupportedAnalytics(

                        field

                    ),

                detectedBy:

                    mapping.reasoning?.algorithm ||

                    "Ontology Matching"

            };

        });

    }

    /*
    ===========================================================
                FIELD IMPORTANCE
    ===========================================================
    */

    getFieldImportance(field = "") {

        const critical = [

            "revenue",

            "profit",

            "expense",

            "sales",

            "customer",

            "inventory",

            "employee"

        ];

        const high = [

            "region",

            "category",

            "supplier",

            "vendor",

            "product",

            "department"

        ];

        field = field.toLowerCase();

        if (

            critical.includes(field)

        ) {

            return "Critical";

        }

        if (

            high.includes(field)

        ) {

            return "High";

        }

        return "Medium";

    }

    /*
    ===========================================================
                BUSINESS MEANING
    ===========================================================
    */

    getBusinessMeaning(field = "") {

        const dictionary = {

            revenue:
                "Total revenue generated by the business.",

            expense:
                "Overall operational expenses incurred.",

            profit:
                "Net business profitability.",

            sales:
                "Sales transactions generated.",

            customer:
                "Customer master information.",

            inventory:
                "Available inventory or stock.",

            employee:
                "Employee information.",

            supplier:
                "Supplier and vendor information.",

            region:
                "Business geographical segmentation.",

            category:
                "Business category segmentation.",

            product:
                "Products or services sold.",

            date:
                "Timeline for trend analysis."

        };

        return (

            dictionary[field] ||

            "Business entity detected from uploaded dataset."

        );

    }

    /*
    ===========================================================
                SUPPORTED ANALYTICS
    ===========================================================
    */

    getSupportedAnalytics(field = "") {

        const analytics = {

            revenue: [

                "Revenue Analysis",

                "Revenue Forecasting",

                "Growth Analysis",

                "Profitability"

            ],

            expense: [

                "Cost Analysis",

                "Expense Optimization"

            ],

            profit: [

                "Profit Analysis",

                "Margin Analysis"

            ],

            customer: [

                "Customer Segmentation",

                "Top Customer Detection",

                "Customer Distribution"

            ],

            inventory: [

                "Inventory Analysis",

                "Stock Optimization"

            ],

            product: [

                "Product Performance",

                "Product Ranking"

            ],

            region: [

                "Regional Analysis",

                "Market Distribution"

            ],

            employee: [

                "HR Analytics"

            ],

            supplier: [

                "Supplier Performance"

            ],

            date: [

                "Trend Analysis",

                "Forecasting"

            ]

        };

        return (

            analytics[field] ||

            [

                "General Business Analytics"

            ]

        );

    }

        /*
    ===========================================================
                    INSIGHT ENGINE
    ===========================================================
    */

    buildInsights({

        datasetAnalysis,

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    }) {

        const insights = [];

        const sources = [

            financialAnalysis?.insights,

            customerAnalysis?.insights,

            operationalAnalysis?.insights,

            trendAnalysis?.insights,

            riskAnalysis?.insights,

            businessHealth?.insights

        ];

        sources.forEach(group => {

            if (!Array.isArray(group)) {

                return;

            }

            group.forEach(item => {

                insights.push({

                    severity:

                        item.severity ||

                        "info",

                    title:

                        item.title ||

                        "Business Insight",

                    description:

                        item.description ||

                        "",

                    source:

                        this.detectInsightSource(

                            item.title

                        ),

                    confidence:

                        this.calculateInsightConfidence(

                            item,

                            datasetAnalysis

                        )

                });

            });

        });

        insights.sort(

            (a, b) =>

                this.getSeverityWeight(

                    b.severity

                ) -

                this.getSeverityWeight(

                    a.severity

                )

        );

        return insights;

    }

    /*
    ===========================================================
                    ALERT ENGINE
    ===========================================================
    */

    buildAlerts({

        datasetAnalysis,

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    }) {

        const alerts = [];

        /*
        DATA QUALITY
        */

        if (

            datasetAnalysis?.quality?.missingValues >

            0

        ) {

            alerts.push({

                severity: "warning",

                category: "Data",

                title: "Missing Values",

                description:

                    `${datasetAnalysis.quality.missingValues} missing values detected.`

            });

        }

        if (

            datasetAnalysis?.quality?.duplicates >

            0

        ) {

            alerts.push({

                severity: "warning",

                category: "Data",

                title: "Duplicate Records",

                description:

                    `${datasetAnalysis.quality.duplicates} duplicate records found.`

            });

        }

        /*
        FINANCIAL
        */

        if (

            financialAnalysis?.metrics?.profitMargin <

            10

        ) {

            alerts.push({

                severity: "critical",

                category: "Finance",

                title: "Low Profit Margin",

                description:

                    `Current profit margin is ${financialAnalysis.metrics.profitMargin}%.`

            });

        }

        if (

            financialAnalysis?.metrics?.expenseRatio >

            80

        ) {

            alerts.push({

                severity: "critical",

                category: "Finance",

                title: "High Expense Ratio",

                description:

                    `Expenses consume ${financialAnalysis.metrics.expenseRatio}% of revenue.`

            });

        }

        /*
        CUSTOMER
        */

        if (

            riskAnalysis?.customerRisk?.risk ===

            "High"

        ) {

            alerts.push({

                severity: "warning",

                category: "Customer",

                title: "Customer Dependency",

                description:

                    "Business revenue is concentrated among a few customers."

            });

        }

        /*
        BUSINESS HEALTH
        */

        if (

            businessHealth?.overallScore <

            60

        ) {

            alerts.push({

                severity: "critical",

                category: "Business",

                title: "Business Health",

                description:

                    `Business health score is ${businessHealth.overallScore}/100.`

            });

        }

        /*
        TREND
        */

        if (

            trendAnalysis?.revenue?.growth <

            0

        ) {

            alerts.push({

                severity: "warning",

                category: "Growth",

                title: "Revenue Decline",

                description:

                    `Revenue declined by ${Math.abs(trendAnalysis.revenue.growth)}%.`

            });

        }

        alerts.sort(

            (a, b) =>

                this.getSeverityWeight(

                    b.severity

                ) -

                this.getSeverityWeight(

                    a.severity

                )

        );

        return alerts;

    }

        /*
    ===========================================================
                    INSIGHT SOURCE
    ===========================================================
    */

    detectInsightSource(title = "") {

        title = title.toLowerCase();

        if (
            title.includes("profit") ||
            title.includes("revenue") ||
            title.includes("expense")
        ) {
            return "Financial Analyzer";
        }

        if (
            title.includes("customer") ||
            title.includes("product") ||
            title.includes("region") ||
            title.includes("category")
        ) {
            return "Customer Analyzer";
        }

        if (
            title.includes("inventory") ||
            title.includes("supplier") ||
            title.includes("department") ||
            title.includes("project") ||
            title.includes("branch")
        ) {
            return "Operational Analyzer";
        }

        if (
            title.includes("trend") ||
            title.includes("growth")
        ) {
            return "Trend Analyzer";
        }

        if (
            title.includes("risk")
        ) {
            return "Risk Analyzer";
        }

        if (
            title.includes("health")
        ) {
            return "Business Health Analyzer";
        }

        return "InsightIQ AI";
    }

    /*
    ===========================================================
                INSIGHT CONFIDENCE
    ===========================================================
    */

    calculateInsightConfidence(

        insight,

        datasetAnalysis

    ) {

        let confidence =

            datasetAnalysis?.quality?.qualityScore ||

            80;

        switch (

            insight.severity

        ) {

            case "critical":

                confidence += 10;

                break;

            case "warning":

                confidence += 5;

                break;

            case "positive":

                confidence += 8;

                break;

            default:

                confidence += 2;

        }

        return Math.min(

            confidence,

            100

        );

    }

    /*
    ===========================================================
                SEVERITY WEIGHT
    ===========================================================
    */

    getSeverityWeight(

        severity = "info"

    ) {

        const weights = {

            critical: 100,

            warning: 80,

            positive: 60,

            info: 40

        };

        return (

            weights[severity] ||

            0

        );

    }

    /*
    ===========================================================
                EXECUTIVE SUMMARY
    ===========================================================
    */

    buildExecutiveSummary({

        executive,

        business,

        dashboardKPIs,

        financialAnalysis,

        customerAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    }) {

        return {

            title:

                "Executive Summary",

            generatedAt:

                new Date(),

            overview:

                `InsightIQ analyzed ${executive.totalRecords} records across ${executive.totalFields} business fields.`,

            domain:

                business.domain,

            health:

                `${businessHealth.status} (${businessHealth.overallScore}/100)`,

            quality:

                `${executive.datasetQuality}%`,

            profitMargin:

                `${financialAnalysis?.metrics?.profitMargin || 0}%`,

            revenueGrowth:

                `${trendAnalysis?.revenue?.growth || 0}%`,

            customerBase:

                customerAnalysis?.customers?.uniqueCustomers || 0,

            financialRisk:

                riskAnalysis?.financialRisk?.risk || "Unknown",

            predictionReady:

                executive.predictionReady

        };

    }

    /*
    ===========================================================
                BUSINESS STORY
    ===========================================================
    */

    buildBusinessStory({

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        riskAnalysis,

        businessHealth

    }) {

        const story = [];

        story.push(

            `Business health is currently ${businessHealth.status} with an overall score of ${businessHealth.overallScore}/100.`

        );

        story.push(

            `Revenue generated is ₹${financialAnalysis.overview.totalRevenue.toLocaleString()} while total profit stands at ₹${financialAnalysis.overview.totalProfit.toLocaleString()}.`

        );

        story.push(

            `Current profit margin is ${financialAnalysis.metrics.profitMargin}%.`

        );

        if (

            customerAnalysis.customers.uniqueCustomers

        ) {

            story.push(

                `${customerAnalysis.customers.uniqueCustomers} unique customers were identified.`

            );

        }

        if (

            trendAnalysis.revenue.available

        ) {

            if (

                trendAnalysis.revenue.growth >= 0

            ) {

                story.push(

                    `Revenue trend indicates a positive growth of ${trendAnalysis.revenue.growth}%.`

                );

            }

            else {

                story.push(

                    `Revenue declined by ${Math.abs(trendAnalysis.revenue.growth)}%.`

                );

            }

        }

        story.push(

            `Financial risk level is ${riskAnalysis.financialRisk.risk}.`

        );

        if (

            operationalAnalysis.overview.inventoryItems

        ) {

            story.push(

                `${operationalAnalysis.overview.inventoryItems} inventory items were analysed.`

            );

        }

        return story;

    }

        /*
    ===========================================================
                    OPPORTUNITY ENGINE
    ===========================================================
    */

    buildOpportunities({

        financialAnalysis,

        customerAnalysis,

        operationalAnalysis,

        trendAnalysis,

        businessHealth

    }) {

        const opportunities = [];

        /*
        =====================================
                FINANCIAL
        =====================================
        */

        if (

            financialAnalysis?.metrics?.profitMargin >= 20

        ) {

            opportunities.push({

                category: "Finance",

                priority: "High",

                title: "Strong Profitability",

                description:

                    "Healthy profit margins indicate expansion opportunities."

            });

        }

        if (

            financialAnalysis?.metrics?.expenseRatio < 60

        ) {

            opportunities.push({

                category: "Finance",

                priority: "Medium",

                title: "Operational Efficiency",

                description:

                    "Current operating expenses are well controlled."

            });

        }

        /*
        =====================================
                CUSTOMER
        =====================================
        */

        if (

            customerAnalysis?.customers?.uniqueCustomers >= 50

        ) {

            opportunities.push({

                category: "Customer",

                priority: "High",

                title: "Customer Expansion",

                description:

                    "Large customer base enables cross-selling and upselling."

            });

        }

        /*
        =====================================
                PRODUCT
        =====================================
        */

        if (

            customerAnalysis?.products?.items?.length

        ) {

            opportunities.push({

                category: "Product",

                priority: "Medium",

                title: "Product Optimization",

                description:

                    `${customerAnalysis.products.items.length} products available for performance optimization.`

            });

        }

        /*
        =====================================
                GROWTH
        =====================================
        */

        if (

            trendAnalysis?.revenue?.growth > 10

        ) {

            opportunities.push({

                category: "Growth",

                priority: "High",

                title: "Business Expansion",

                description:

                    `Revenue growth of ${trendAnalysis.revenue.growth}% indicates expansion potential.`

            });

        }

        /*
        =====================================
                OPERATIONS
        =====================================
        */

        if (

            operationalAnalysis?.overview?.branches > 1

        ) {

            opportunities.push({

                category: "Operations",

                priority: "Medium",

                title: "Multi-location Analysis",

                description:

                    "Branch-level performance comparison can improve efficiency."

            });

        }

        /*
        =====================================
                HEALTH
        =====================================
        */

        if (

            businessHealth?.overallScore >= 80

        ) {

            opportunities.push({

                category: "Business",

                priority: "High",

                title: "Business Scaling",

                description:

                    "Overall business health supports scaling initiatives."

            });

        }

        return opportunities;

    }

        /*
    ===========================================================
                OVERALL ANALYTICS SCORE
    ===========================================================
    */

    calculateOverallAnalyticsScore({

        datasetAnalysis,

        financialAnalysis,

        businessHealth,

        prediction

    }) {

        const quality =
            datasetAnalysis?.quality?.qualityScore || 0;

        const health =
            businessHealth?.overallScore || 0;

        const margin =
            financialAnalysis?.metrics?.profitMargin || 0;

        const predictionScore =
            prediction?.confidence || 0;

        return Math.round(

            (

                quality +

                health +

                Math.min(margin * 4, 100) +

                predictionScore

            ) / 4

        );

    }

    /*
    ===========================================================
                DASHBOARD STATUS
    ===========================================================
    */

    getDashboardStatus(score) {

        if (score >= 90) {

            return "Excellent";

        }

        if (score >= 75) {

            return "Healthy";

        }

        if (score >= 60) {

            return "Stable";

        }

        if (score >= 40) {

            return "Needs Attention";

        }

        return "Critical";

    }

}

module.exports = new AnalyticsBuilder();