import {
    Upload,
    Brain,
    Database,
    BarChart3,
    ArrowRight
} from "lucide-react";

const workflowSteps = [
    {
        id: 1,
        icon: Upload,
        title: "Upload Dataset",
        description:
            "Import structured Excel or CSV files into InsightIQ. The platform validates the dataset before beginning analysis."
    },
    {
        id: 2,
        icon: Brain,
        title: "AI Business Understanding",
        description:
            "InsightIQ automatically identifies business entities such as revenue, expenses, customers, products, regions and time dimensions."
    },
    {
        id: 3,
        icon: Database,
        title: "Business Intelligence Engine",
        description:
            "The analytics engine calculates KPIs, business health, trends, financial metrics and executive intelligence."
    },
    {
        id: 4,
        icon: BarChart3,
        title: "Interactive Dashboard",
        description:
            "All insights are presented through executive dashboards with recommendations and decision-support metrics."
    }
];

function WorkflowSection() {
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
                    AI Workflow
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    How InsightIQ Processes Your Data
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Every uploaded dataset follows the same intelligent
                    processing pipeline. The system validates the data,
                    understands business context, performs AI-powered
                    analysis and produces executive-ready insights.
                </p>
            </div>

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                    xl:grid-cols-4
                "
            >
                {workflowSteps.map((step, index) => {
                    const Icon = step.icon;

                    return (
                        <div
                            key={step.id}
                            className="
                                relative
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-black/20
                                p-6
                                transition-all
                                duration-300
                                hover:border-violet-500/40
                                hover:-translate-y-1
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

                            <div
                                className="
                                    mt-6
                                    flex
                                    items-center
                                    justify-between
                                "
                            >
                                <h3 className="font-semibold">
                                    {step.title}
                                </h3>

                                <span
                                    className="
                                        text-xs
                                        font-semibold
                                        text-violet-400
                                    "
                                >
                                    0{step.id}
                                </span>
                            </div>

                            <p
                                className="
                                    mt-4
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {step.description}
                            </p>

                            {index !== workflowSteps.length - 1 && (
                                <div
                                    className="
                                        absolute
                                        -right-3
                                        top-10
                                        hidden
                                        xl:flex
                                        h-8
                                        w-8
                                        items-center
                                        justify-center
                                        rounded-full
                                        border
                                        border-[var(--border)]
                                        bg-[var(--card)]
                                    "
                                >
                                    <ArrowRight
                                        size={16}
                                        className="text-violet-400"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
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
                <h3 className="font-semibold text-violet-300">
                    Processing Pipeline
                </h3>

                <p
                    className="
                        mt-3
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Each stage enriches the uploaded data before passing it
                    to the next module. This layered pipeline helps produce
                    accurate KPIs, executive summaries, business health
                    scores and actionable recommendations while reducing
                    manual analysis.
                </p>
            </div>
        </section>
    );
}

export default WorkflowSection;