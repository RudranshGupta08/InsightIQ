import {
    Upload,
    Brain,
    BarChart3,
    ShieldCheck,
    TrendingUp,
    Target
} from "lucide-react";

const modules = [
    {
        icon: Upload,
        title: "Smart Data Import",
        description:
            "Import structured Excel and CSV datasets with automatic validation, preprocessing and schema detection.",
        features: [
            "Excel & CSV Support",
            "Automatic Validation",
            "Data Preprocessing"
        ]
    },
    {
        icon: Brain,
        title: "AI Field Intelligence",
        description:
            "Automatically identifies business entities and maps dataset columns to meaningful business concepts.",
        features: [
            "Semantic Mapping",
            "Business Ontology",
            "Automatic Classification"
        ]
    },
    {
        icon: BarChart3,
        title: "Business Analytics",
        description:
            "Generate executive KPIs, financial metrics, operational insights and customer intelligence dashboards.",
        features: [
            "KPI Dashboard",
            "Financial Metrics",
            "Operational Analytics"
        ]
    },
    {
        icon: ShieldCheck,
        title: "Business Health",
        description:
            "Evaluate overall business performance through a unified health score built from multiple business indicators.",
        features: [
            "Health Score",
            "Risk Detection",
            "Performance Evaluation"
        ]
    },
    {
        icon: TrendingUp,
        title: "Trend Analysis",
        description:
            "Identify historical patterns, business growth, seasonal behaviour and operational trends.",
        features: [
            "Growth Trends",
            "Time Series",
            "Historical Analysis"
        ]
    },
    {
        icon: Target,
        title: "AI Recommendations",
        description:
            "Receive prioritized recommendations that help improve profitability, efficiency and strategic planning.",
        features: [
            "Priority Actions",
            "Business Opportunities",
            "Strategic Suggestions"
        ]
    }
];

function ModulesSection() {
    return (
        <section
            className="
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
                p-8
            "
        >
            <div className="max-w-3xl">
                <span
                    className="
                        inline-flex
                        rounded-full
                        bg-violet-600/10
                        px-3
                        py-1
                        text-xs
                        font-medium
                        text-violet-400
                    "
                >
                    Production Modules
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Available Modules in Version 1.0
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Every module in InsightIQ is designed to solve a specific
                    business problem. Together they transform raw datasets into
                    meaningful intelligence that supports better business
                    decisions.
                </p>
            </div>

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                    xl:grid-cols-3
                "
            >
                {modules.map((module) => {
                    const Icon = module.icon;

                    return (
                        <div
                            key={module.title}
                            className="
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-black/20
                                p-6
                                transition-all
                                duration-300
                                hover:-translate-y-1
                                hover:border-violet-500/40
                            "
                        >
                            <div
                                className="
                                    flex
                                    h-14
                                    w-14
                                    items-center
                                    justify-center
                                    rounded-2xl
                                    bg-violet-600/10
                                "
                            >
                                <Icon
                                    size={28}
                                    className="text-violet-400"
                                />
                            </div>

                            <h3 className="mt-6 text-xl font-semibold">
                                {module.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {module.description}
                            </p>

                            <div className="mt-6 space-y-2">
                                {module.features.map((feature) => (
                                    <div
                                        key={feature}
                                        className="
                                            flex
                                            items-center
                                            gap-3
                                            rounded-lg
                                            bg-white/5
                                            px-3
                                            py-2
                                        "
                                    >
                                        <div
                                            className="
                                                h-2
                                                w-2
                                                rounded-full
                                                bg-violet-400
                                            "
                                        />

                                        <span
                                            className="
                                                text-sm
                                                text-[var(--muted)]
                                            "
                                        >
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>

            <div
                className="
                    mt-10
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-black/20
                    p-6
                "
            >
                <h3 className="text-lg font-semibold">
                    Why These Modules Matter
                </h3>

                <p
                    className="
                        mt-3
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Instead of presenting isolated charts, InsightIQ combines
                    these modules into a unified business intelligence workflow.
                    Each module contributes to the final executive report,
                    ensuring that recommendations are based on financial,
                    operational, customer and trend analysis rather than a
                    single metric.
                </p>
            </div>
        </section>
    );
}

export default ModulesSection;