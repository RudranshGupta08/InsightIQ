import {
    Rocket,
    CheckCircle2,
    Sparkles,
    BarChart3,
    Brain,
    ShieldCheck,
    ArrowRight
} from "lucide-react";

const highlights = [
    {
        icon: Brain,
        title: "AI-Powered Business Intelligence",
        description:
            "Automatically transforms structured business datasets into meaningful insights."
    },
    {
        icon: BarChart3,
        title: "Executive Analytics",
        description:
            "Generate dashboards, KPIs, financial metrics and operational intelligence."
    },
    {
        icon: ShieldCheck,
        title: "Decision Support",
        description:
            "Business health evaluation, AI recommendations and forecasting capabilities."
    }
];

const completedFeatures = [
    "Dataset Upload & Validation",
    "AI Field Intelligence",
    "Business Analytics Dashboard",
    "Executive Summary",
    "Business Story",
    "Business Health Score",
    "AI Confidence",
    "Recommendation Engine",
    "Trend Analysis",
    "Prediction Engine",
    "Knowledge Center",
    "Multi-Industry Support"
];

function SummarySection() {
    return (
        <section
            className="
                rounded-3xl
                border
                border-violet-500/20
                bg-gradient-to-br
                from-violet-600/10
                via-[var(--card)]
                to-[var(--card)]
                p-8
            "
        >
            {/* Header */}

            <div className="text-center max-w-4xl mx-auto">

                <div
                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        bg-violet-600/10
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-violet-400
                    "
                >
                    <Rocket size={18} />
                    InsightIQ Version 1.0
                </div>

                <h2 className="mt-6 text-4xl font-bold">
                    Version 1.0 Complete
                </h2>

                <p
                    className="
                        mt-6
                        text-lg
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    InsightIQ Version 1.0 establishes the foundation of an
                    AI-powered Business Intelligence platform capable of
                    converting business datasets into executive-ready
                    intelligence, strategic recommendations and actionable
                    business insights.
                </p>

            </div>

            {/* Highlights */}

            <div
                className="
                    mt-12
                    grid
                    gap-6
                    lg:grid-cols-3
                "
            >
                {highlights.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-black/20
                                p-6
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
                                {item.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {item.description}
                            </p>

                        </div>

                    );

                })}
            </div>

            {/* Features */}

            <div
                className="
                    mt-12
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-black/20
                    p-8
                "
            >

                <div className="flex items-center gap-3">

                    <Sparkles
                        className="text-violet-400"
                        size={24}
                    />

                    <h3 className="text-2xl font-semibold">
                        What's Included
                    </h3>

                </div>

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-2
                        xl:grid-cols-3
                    "
                >
                    {completedFeatures.map((feature) => (

                        <div
                            key={feature}
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <CheckCircle2
                                size={18}
                                className="text-green-400"
                            />

                            <span className="text-[var(--muted)]">
                                {feature}
                            </span>

                        </div>

                    ))}
                </div>

            </div>

            {/* Next Version */}

            <div
                className="
                    mt-12
                    rounded-2xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-8
                "
            >

                <div
                    className="
                        flex
                        flex-col
                        gap-6
                        lg:flex-row
                        lg:items-center
                        lg:justify-between
                    "
                >

                    <div>

                        <h3 className="text-2xl font-semibold">
                            Looking Ahead
                        </h3>

                        <p
                            className="
                                mt-3
                                max-w-2xl
                                leading-7
                                text-[var(--muted)]
                            "
                        >
                            Version 1.5 will introduce practical enhancements
                            such as AI Chat Assistant, scheduled reports,
                            PDF export, PowerPoint export, benchmarking,
                            business goals and several productivity
                            improvements while maintaining the simplicity
                            of the InsightIQ platform.
                        </p>

                    </div>

                    <div
                        className="
                            flex
                            items-center
                            gap-3
                            rounded-xl
                            bg-violet-600
                            px-6
                            py-4
                            font-semibold
                            text-white
                        "
                    >
                        Explore Version 1.5

                        <ArrowRight size={18} />
                    </div>

                </div>

            </div>

        </section>
    );
}

export default SummarySection;