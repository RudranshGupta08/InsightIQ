import {
    Brain,
    FileText,
    Sparkles,
    BadgeCheck,
    TrendingUp,
    Lightbulb
} from "lucide-react";

const executiveModules = [
    {
        icon: FileText,
        title: "Executive Summary",
        description:
            "Provides a concise overview of business performance by combining financial, operational and customer analytics into an easy-to-read report."
    },
    {
        icon: Sparkles,
        title: "Business Story",
        description:
            "Transforms structured datasets into a narrative that explains business performance in plain language for executives and stakeholders."
    },
    {
        icon: Brain,
        title: "AI Insights",
        description:
            "Highlights unusual patterns, growth opportunities and potential risks detected during analysis."
    },
    {
        icon: BadgeCheck,
        title: "AI Confidence",
        description:
            "Displays the confidence level of generated insights based on dataset quality, semantic mapping and analytical completeness."
    }
];

const confidenceLevels = [
    {
        range: "95–100%",
        label: "Excellent",
        description:
            "Dataset is comprehensive and AI interpretations are highly reliable."
    },
    {
        range: "85–94%",
        label: "High",
        description:
            "Strong confidence with only minor limitations in the uploaded data."
    },
    {
        range: "70–84%",
        label: "Good",
        description:
            "Reliable insights, though additional historical data could improve analysis."
    },
    {
        range: "Below 70%",
        label: "Needs Improvement",
        description:
            "The uploaded dataset lacks sufficient information for maximum analytical accuracy."
    }
];

function ExecutiveSection() {
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
                    Executive Intelligence
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Executive Decision Support
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    InsightIQ converts raw analytical results into executive
                    intelligence. Instead of requiring users to interpret
                    spreadsheets or charts, the platform presents meaningful
                    summaries, business stories and AI-generated observations
                    that support strategic decision-making.
                </p>

            </div>

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >
                {executiveModules.map((module) => {
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

                            <h3 className="mt-5 text-lg font-semibold">
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
                <div className="flex items-center gap-3">

                    <TrendingUp
                        className="text-violet-400"
                        size={22}
                    />

                    <h3 className="text-lg font-semibold">
                        AI Confidence Levels
                    </h3>

                </div>

                <div
                    className="
                        mt-6
                        space-y-4
                    "
                >
                    {confidenceLevels.map((level) => (
                        <div
                            key={level.range}
                            className="
                                flex
                                flex-col
                                gap-2
                                rounded-xl
                                border
                                border-[var(--border)]
                                p-4
                                md:flex-row
                                md:items-center
                                md:justify-between
                            "
                        >
                            <div>

                                <h4 className="font-semibold">
                                    {level.label}
                                </h4>

                                <p
                                    className="
                                        mt-1
                                        text-sm
                                        text-[var(--muted)]
                                    "
                                >
                                    {level.description}
                                </p>

                            </div>

                            <span
                                className="
                                    rounded-full
                                    bg-violet-600/10
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    text-violet-400
                                "
                            >
                                {level.range}
                            </span>

                        </div>
                    ))}
                </div>
            </div>

            <div
                className="
                    mt-10
                    rounded-2xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-6
                "
            >
                <div className="flex items-center gap-3">

                    <Lightbulb
                        className="text-violet-400"
                        size={22}
                    />

                    <h3 className="text-lg font-semibold">
                        Business Value
                    </h3>

                </div>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Executive Intelligence bridges the gap between technical
                    analytics and business strategy. Managers can understand
                    the current state of the business within minutes, identify
                    high-impact opportunities and make informed decisions
                    without manually interpreting complex datasets.
                </p>
            </div>
        </section>
    );
}

export default ExecutiveSection;