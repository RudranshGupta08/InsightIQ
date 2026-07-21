import {
    Rocket,
    Sparkles,
    Clock3,
    Target,
    CheckCircle2,
    ArrowRight
} from "lucide-react";

const roadmap = [
    {
        title: "AI Chat Assistant",
        priority: "High",
        status: "Planned",
        description:
            "Ask business questions in natural language and receive contextual insights generated from uploaded datasets."
    },
    {
        title: "Automated Report Export",
        priority: "High",
        status: "Planned",
        description:
            "Generate executive reports in PDF and PowerPoint formats with charts, KPIs and AI summaries."
    },
    {
        title: "Scheduled Reports",
        priority: "High",
        status: "Planned",
        description:
            "Automatically deliver business reports through email at configurable intervals."
    },
    {
        title: "Business Goal Tracking",
        priority: "Medium",
        status: "Planned",
        description:
            "Monitor organizational goals, compare actual performance and track achievement over time."
    },
    {
        title: "Industry Benchmarking",
        priority: "Medium",
        status: "Research",
        description:
            "Compare business performance against industry averages and benchmark metrics."
    },
    {
        title: "Interactive Executive Dashboard",
        priority: "Medium",
        status: "Research",
        description:
            "Additional dashboard customization with drag-and-drop widgets and personalized layouts."
    }
];

const priorities = {
    High: "bg-red-500/10 text-red-400",
    Medium: "bg-yellow-500/10 text-yellow-400",
    Low: "bg-green-500/10 text-green-400"
};

const statusColors = {
    Planned: "bg-violet-600/10 text-violet-400",
    Research: "bg-blue-500/10 text-blue-400",
    Development: "bg-green-500/10 text-green-400"
};

function Version15() {
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
                <div className="flex items-center gap-3">

                    <Rocket
                        size={34}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            InsightIQ Version 1.5
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Planned roadmap focused on improving business
                            productivity, executive reporting and AI-powered
                            decision support.
                        </p>

                    </div>

                </div>

                <div
                    className="
                        mt-8
                        flex
                        flex-wrap
                        gap-4
                    "
                >

                    <div
                        className="
                            rounded-xl
                            bg-violet-600/10
                            px-4
                            py-3
                        "
                    >
                        <div className="text-sm text-[var(--muted)]">
                            Planned Features
                        </div>

                        <div className="text-2xl font-bold">
                            6
                        </div>
                    </div>

                    <div
                        className="
                            rounded-xl
                            bg-violet-600/10
                            px-4
                            py-3
                        "
                    >
                        <div className="text-sm text-[var(--muted)]">
                            Release
                        </div>

                        <div className="text-2xl font-bold">
                            v1.5
                        </div>
                    </div>

                    <div
                        className="
                            rounded-xl
                            bg-violet-600/10
                            px-4
                            py-3
                        "
                    >
                        <div className="text-sm text-[var(--muted)]">
                            Focus
                        </div>

                        <div className="text-lg font-semibold">
                            Productivity
                        </div>
                    </div>

                </div>

            </div>

            {/* Roadmap */}

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

                    <Sparkles
                        className="text-violet-400"
                        size={24}
                    />

                    <h2 className="text-2xl font-semibold">
                        Planned Features
                    </h2>

                </div>

                <div
                    className="
                        mt-8
                        space-y-6
                    "
                >

                    {roadmap.map((feature) => (

                        <div
                            key={feature.title}
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
                                    flex-col
                                    gap-4
                                    lg:flex-row
                                    lg:items-center
                                    lg:justify-between
                                "
                            >

                                <div>

                                    <h3 className="text-xl font-semibold">
                                        {feature.title}
                                    </h3>

                                    <p
                                        className="
                                            mt-3
                                            leading-7
                                            text-[var(--muted)]
                                        "
                                    >
                                        {feature.description}
                                    </p>

                                </div>

                                <div
                                    className="
                                        flex
                                        flex-wrap
                                        gap-3
                                    "
                                >

                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm
                                            font-semibold
                                            ${priorities[feature.priority]}
                                        `}
                                    >
                                        {feature.priority} Priority
                                    </span>

                                    <span
                                        className={`
                                            rounded-full
                                            px-3
                                            py-1
                                            text-sm
                                            font-semibold
                                            ${statusColors[feature.status]}
                                        `}
                                    >
                                        {feature.status}
                                    </span>

                                </div>

                            </div>

                        </div>

                    ))}

                </div>

            </div>

            {/* Vision */}

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

                    <Target
                        className="text-violet-400"
                        size={24}
                    />

                    <h2 className="text-2xl font-semibold">
                        Version 1.5 Vision
                    </h2>

                </div>

                <p
                    className="
                        mt-5
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    Version 1.5 focuses on enhancing the productivity of
                    business users by reducing manual effort, improving
                    reporting workflows and enabling conversational AI for
                    business intelligence. The objective is to make InsightIQ
                    a more proactive decision-support platform while keeping
                    the interface simple and intuitive.
                </p>

                <div
                    className="
                        mt-8
                        flex
                        items-center
                        gap-3
                        font-semibold
                        text-violet-400
                    "
                >

                    <CheckCircle2 size={20} />

                    Enterprise-ready roadmap

                    <ArrowRight size={18} />

                </div>

            </div>

        </section>
    );
}

export default Version15;