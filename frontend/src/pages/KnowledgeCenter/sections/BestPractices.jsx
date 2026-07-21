import {
    Award,
    Database,
    Upload,
    Brain,
    ShieldCheck,
    Clock3,
    CheckCircle2,
    Lightbulb
} from "lucide-react";

const practices = [
    {
        icon: Upload,
        title: "Prepare Clean Data",
        description:
            "Use structured Excel or CSV files with consistent headers, valid values and minimal missing information."
    },
    {
        icon: Database,
        title: "Maintain Data Consistency",
        description:
            "Ensure date formats, currencies and numerical values remain consistent across the entire dataset."
    },
    {
        icon: Brain,
        title: "Trust AI, Verify Decisions",
        description:
            "Use AI-generated insights as decision-support tools while validating recommendations against business knowledge."
    },
    {
        icon: Clock3,
        title: "Refresh Data Regularly",
        description:
            "Upload updated datasets periodically to keep dashboards, KPIs and predictions aligned with current business performance."
    },
    {
        icon: ShieldCheck,
        title: "Protect Sensitive Information",
        description:
            "Limit access to business datasets using appropriate authentication, authorization and organizational security policies."
    },
    {
        icon: Award,
        title: "Monitor Business Trends",
        description:
            "Review performance regularly instead of relying only on one-time reports to identify emerging opportunities and risks."
    }
];

const checklist = [
    "Use descriptive column names.",
    "Keep one header row only.",
    "Avoid merged cells.",
    "Remove duplicate records.",
    "Store financial values as numbers.",
    "Maintain consistent date formats.",
    "Review AI confidence before acting.",
    "Keep historical datasets whenever possible.",
    "Validate uploaded data before analysis.",
    "Update datasets regularly."
];

function BestPractices() {
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

                    <Award
                        size={36}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            Best Practices
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Follow these recommendations to maximize the value
                            of InsightIQ and generate reliable business
                            intelligence.
                        </p>

                    </div>

                </div>

            </div>

            {/* Recommendations */}

            <div
                className="
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >
                {practices.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="
                                rounded-2xl
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
                                {item.title}
                            </h2>

                            <p
                                className="
                                    mt-3
                                    leading-7
                                    text-[var(--muted)]
                                "
                            >
                                {item.description}
                            </p>

                        </div>

                    );

                })}
            </div>

            {/* Checklist */}

            <div
                className="
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-8
                "
            >

                <div className="flex items-center gap-3">

                    <CheckCircle2
                        className="text-green-400"
                        size={24}
                    />

                    <h2 className="text-2xl font-semibold">
                        Quick Checklist
                    </h2>

                </div>

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    {checklist.map((item) => (

                        <div
                            key={item}
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
                                {item}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Final Note */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-8
                "
            >

                <div className="flex items-center gap-3">

                    <Lightbulb
                        size={24}
                        className="text-violet-400"
                    />

                    <h2 className="text-2xl font-semibold">
                        Key Takeaway
                    </h2>

                </div>

                <p
                    className="
                        mt-5
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    InsightIQ delivers the greatest value when paired with
                    accurate, consistent and regularly updated business data.
                    High-quality datasets enable stronger AI interpretation,
                    more reliable recommendations and better executive
                    decision-making.
                </p>

            </div>

        </section>
    );
}

export default BestPractices;