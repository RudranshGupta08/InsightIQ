import {
    CheckCircle2,
    FileSpreadsheet,
    Database,
    Brain,
    ShieldCheck,
    TrendingUp,
    Lightbulb
} from "lucide-react";

const practices = [
    {
        icon: FileSpreadsheet,
        title: "Use Structured Datasets",
        description:
            "Upload well-structured Excel or CSV files with meaningful column names and consistent formatting."
    },
    {
        icon: Database,
        title: "Maintain Data Quality",
        description:
            "Remove duplicate records, fix missing values and ensure numerical fields contain valid data."
    },
    {
        icon: Brain,
        title: "Use Historical Data",
        description:
            "Include historical business records whenever possible. This improves trend analysis and prediction accuracy."
    },
    {
        icon: ShieldCheck,
        title: "Review AI Confidence",
        description:
            "Always review the AI Confidence score before making important business decisions."
    },
    {
        icon: TrendingUp,
        title: "Monitor Trends",
        description:
            "Regularly upload updated datasets to identify performance changes and long-term business trends."
    },
    {
        icon: Lightbulb,
        title: "Validate Recommendations",
        description:
            "Use AI recommendations as decision-support tools and validate them with business context."
    }
];

const checklist = [
    "Keep column names meaningful and descriptive.",
    "Avoid merged cells and hidden rows.",
    "Use one header row only.",
    "Ensure financial values are stored as numbers.",
    "Maintain consistent date formats.",
    "Remove unnecessary blank rows and columns.",
    "Verify uploaded files before analysis.",
    "Refresh datasets regularly for updated insights."
];

function BestPracticesSection() {
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
                    Best Practices
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Getting the Best Results
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Following these recommendations will improve AI
                    interpretation, increase confidence scores and produce
                    more accurate business intelligence reports.
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
                {practices.map((practice) => {

                    const Icon = practice.icon;

                    return (
                        <div
                            key={practice.title}
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
                                {practice.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {practice.description}
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
                <h3 className="text-xl font-semibold">
                    Dataset Preparation Checklist
                </h3>

                <div
                    className="
                        mt-6
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
                                items-start
                                gap-3
                            "
                        >
                            <CheckCircle2
                                size={18}
                                className="
                                    mt-1
                                    text-violet-400
                                "
                            />

                            <span className="text-[var(--muted)]">
                                {item}
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
                <h3 className="text-lg font-semibold text-violet-300">
                    Pro Tip
                </h3>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    The quality of your business insights depends on the
                    quality of your data. Consistent, clean and regularly
                    updated datasets allow InsightIQ to deliver more reliable
                    analytics, stronger AI confidence and better executive
                    recommendations.
                </p>
            </div>
        </section>
    );
}

export default BestPracticesSection;