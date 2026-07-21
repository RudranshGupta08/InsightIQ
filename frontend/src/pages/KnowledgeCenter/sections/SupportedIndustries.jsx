import {
    Building2,
    ShoppingBag,
    Factory,
    Landmark,
    HeartPulse,
    GraduationCap,
    Truck,
    Briefcase,
    CheckCircle2,
    Globe
} from "lucide-react";

const industries = [
    {
        icon: ShoppingBag,
        title: "Retail & E-Commerce",
        description:
            "Analyze sales performance, customer behavior, inventory movement, product profitability and seasonal trends."
    },
    {
        icon: Factory,
        title: "Manufacturing",
        description:
            "Monitor production efficiency, operational costs, supply chain performance and quality metrics."
    },
    {
        icon: Landmark,
        title: "Banking & Finance",
        description:
            "Track financial performance, revenue growth, expenses, profitability and business KPIs."
    },
    {
        icon: HeartPulse,
        title: "Healthcare",
        description:
            "Evaluate operational efficiency, patient statistics, resource utilization and financial performance."
    },
    {
        icon: GraduationCap,
        title: "Education",
        description:
            "Generate insights from student performance, admissions, institutional finance and operational data."
    },
    {
        icon: Truck,
        title: "Logistics & Supply Chain",
        description:
            "Analyze delivery performance, warehouse efficiency, transportation costs and supply chain trends."
    },
    {
        icon: Briefcase,
        title: "Professional Services",
        description:
            "Measure project performance, resource utilization, client profitability and operational efficiency."
    },
    {
        icon: Building2,
        title: "Corporate Enterprises",
        description:
            "Create executive dashboards, monitor KPIs and support strategic business decision-making across departments."
    }
];

const capabilities = [
    "Financial Analytics",
    "Executive Dashboards",
    "Business Health Monitoring",
    "AI Recommendations",
    "Trend Analysis",
    "Prediction Engine",
    "Interactive KPI Reporting",
    "Executive Summary Generation",
    "Business Story Generation",
    "Decision Support"
];

function SupportedIndustries() {
    return (
        <section className="space-y-8">

            {/* Hero */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-gradient-to-br
                    from-violet-600/10
                    to-[var(--card)]
                    p-8
                "
            >

                <div className="flex items-center gap-4">

                    <Globe
                        size={38}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            Supported Industries
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            InsightIQ is designed to work across multiple
                            industries by transforming structured business
                            data into actionable intelligence.
                        </p>

                    </div>

                </div>

            </div>

            {/* Industries */}

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                {industries.map((industry) => {

                    const Icon = industry.icon;

                    return (

                        <div
                            key={industry.title}
                            className="
                                rounded-3xl
                                border
                                border-[var(--border)]
                                bg-[var(--card)]
                                p-6
                            "
                        >

                            <div
                                className="
                                    flex
                                    h-12
                                    w-12
                                    items-center
                                    justify-center
                                    rounded-xl
                                    bg-violet-600/10
                                "
                            >

                                <Icon
                                    size={24}
                                    className="text-violet-400"
                                />

                            </div>

                            <h2 className="mt-5 text-xl font-semibold">
                                {industry.title}
                            </h2>

                            <p
                                className="
                                    mt-3
                                    leading-7
                                    text-[var(--muted)]
                                "
                            >
                                {industry.description}
                            </p>

                        </div>

                    );

                })}

            </div>

            {/* Core Capabilities */}

            <div
                className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-8
                "
            >

                <h2 className="text-2xl font-semibold">
                    Core Business Capabilities
                </h2>

                <p
                    className="
                        mt-3
                        text-[var(--muted)]
                    "
                >
                    These capabilities are available across all supported
                    industries whenever the uploaded dataset contains the
                    required information.
                </p>

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >

                    {capabilities.map((capability) => (

                        <div
                            key={capability}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-[var(--border)]
                                bg-black/20
                                p-4
                            "
                        >

                            <CheckCircle2
                                size={18}
                                className="text-green-400"
                            />

                            <span className="text-[var(--muted)]">
                                {capability}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Closing */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-8
                "
            >

                <h2 className="text-2xl font-semibold">
                    Industry-Agnostic by Design
                </h2>

                <p
                    className="
                        mt-5
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    InsightIQ is not limited to a single industry. Its AI
                    engine analyzes the structure and meaning of uploaded
                    business data rather than relying on industry-specific
                    templates. This allows organizations across different
                    sectors to generate dashboards, KPIs, executive summaries,
                    recommendations and predictive insights using the same
                    intelligent analytics platform.
                </p>

            </div>

        </section>
    );
}

export default SupportedIndustries;