import {
    Calendar,
    Rocket,
    Sparkles,
    CheckCircle2,
    Wrench,
    ShieldCheck,
    ArrowUpCircle
} from "lucide-react";

const releases = [
    {
        version: "Version 1.0.0",
        date: "Initial Release",
        type: "Major Release",
        features: [
            "Dataset Upload & Validation",
            "AI Field Intelligence",
            "Executive Dashboard",
            "Business Story Generation",
            "Business Health Score",
            "AI Confidence Indicator",
            "Recommendation Engine",
            "Prediction Engine",
            "Knowledge Center",
            "Multi-Industry Analytics"
        ]
    },
    {
        version: "Version 1.5",
        date: "Planned",
        type: "Upcoming",
        features: [
            "AI Chat Assistant",
            "Scheduled Report Generation",
            "PDF Export",
            "PowerPoint Export",
            "Business Goal Tracking",
            "Industry Benchmarking"
        ]
    },
    {
        version: "Version 2.0",
        date: "Future",
        type: "Vision",
        features: [
            "Enterprise Workflow Automation",
            "Multi-Source Data Integration",
            "Autonomous AI Analyst",
            "Real-Time Decision Intelligence",
            "Advanced Collaboration",
            "Global Business Benchmarking"
        ]
    }
];

const releaseTypes = {
    "Major Release": "bg-green-500/10 text-green-400",
    Upcoming: "bg-violet-500/10 text-violet-400",
    Vision: "bg-blue-500/10 text-blue-400"
};

function ReleaseNotes() {
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

                    <Rocket
                        size={36}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            Release Notes
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Track major releases, planned improvements and the
                            evolution of the InsightIQ platform.
                        </p>

                    </div>

                </div>

            </div>

            {/* Timeline */}

            <div className="space-y-8">

                {releases.map((release) => (

                    <div
                        key={release.version}
                        className="
                            rounded-3xl
                            border
                            border-[var(--border)]
                            bg-[var(--card)]
                            p-8
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

                                <div className="flex items-center gap-3">

                                    <Calendar
                                        size={22}
                                        className="text-violet-400"
                                    />

                                    <h2 className="text-2xl font-semibold">
                                        {release.version}
                                    </h2>

                                </div>

                                <p className="mt-2 text-[var(--muted)]">
                                    {release.date}
                                </p>

                            </div>

                            <span
                                className={`
                                    rounded-full
                                    px-4
                                    py-2
                                    text-sm
                                    font-semibold
                                    ${releaseTypes[release.type]}
                                `}
                            >
                                {release.type}
                            </span>

                        </div>

                        <div className="mt-8 space-y-4">

                            {release.features.map((feature) => (

                                <div
                                    key={feature}
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
                                        {feature}
                                    </span>

                                </div>

                            ))}

                        </div>

                    </div>

                ))}

            </div>

            {/* Development Philosophy */}

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

                    <Sparkles
                        size={24}
                        className="text-violet-400"
                    />

                    <h2 className="text-2xl font-semibold">
                        Development Philosophy
                    </h2>

                </div>

                <div className="mt-6 space-y-5">

                    <div className="flex items-start gap-3">

                        <ShieldCheck
                            size={20}
                            className="mt-1 text-green-400"
                        />

                        <p className="text-[var(--muted)] leading-7">
                            Every release focuses on improving reliability,
                            usability and practical business value rather than
                            introducing unnecessary complexity.
                        </p>

                    </div>

                    <div className="flex items-start gap-3">

                        <Wrench
                            size={20}
                            className="mt-1 text-violet-400"
                        />

                        <p className="text-[var(--muted)] leading-7">
                            New features are evaluated based on real-world
                            business requirements, scalability and long-term
                            maintainability.
                        </p>

                    </div>

                    <div className="flex items-start gap-3">

                        <ArrowUpCircle
                            size={20}
                            className="mt-1 text-blue-400"
                        />

                        <p className="text-[var(--muted)] leading-7">
                            InsightIQ follows a continuous improvement approach,
                            ensuring every version delivers measurable value
                            for business users.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default ReleaseNotes;