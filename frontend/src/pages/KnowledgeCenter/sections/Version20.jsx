import {
    Rocket,
    Brain,
    Globe,
    Database,
    Workflow,
    Bot,
    ShieldCheck,
    Network,
    Sparkles,
    Target
} from "lucide-react";

const futureFeatures = [
    {
        icon: Bot,
        title: "Autonomous AI Business Analyst",
        timeline: "Future Vision",
        description:
            "An AI assistant capable of proactively identifying business opportunities, explaining trends and suggesting strategic actions without requiring manual prompts."
    },
    {
        icon: Globe,
        title: "Global Industry Benchmarking",
        timeline: "Future Vision",
        description:
            "Compare business performance against industry standards across regions, sectors and market segments."
    },
    {
        icon: Workflow,
        title: "Workflow Automation",
        timeline: "Future Vision",
        description:
            "Automate repetitive business processes based on AI insights, alerts and predefined business rules."
    },
    {
        icon: Database,
        title: "Multi-Source Data Integration",
        timeline: "Future Vision",
        description:
            "Connect ERP, CRM, accounting platforms and cloud databases to create a unified business intelligence ecosystem."
    },
    {
        icon: Brain,
        title: "Predictive Decision Intelligence",
        timeline: "Research",
        description:
            "Move beyond forecasting by evaluating multiple future scenarios and estimating the impact of different business decisions."
    },
    {
        icon: Network,
        title: "Enterprise Collaboration",
        timeline: "Research",
        description:
            "Enable collaborative dashboards, shared workspaces, role-based access and organization-wide decision support."
    }
];

const vision = [
    "AI-first Business Intelligence Platform",
    "Real-time Decision Support",
    "Enterprise Workflow Automation",
    "Continuous Business Monitoring",
    "Predictive & Prescriptive Analytics",
    "Scalable Cloud Architecture"
];

function Version20() {
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
                        size={38}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            InsightIQ Version 2.0
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Long-term vision for transforming InsightIQ into a
                            comprehensive AI-powered enterprise intelligence
                            platform.
                        </p>

                    </div>

                </div>

            </div>

            {/* Future Features */}

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
                        Vision Roadmap
                    </h2>

                </div>

                <div
                    className="
                        mt-8
                        grid
                        gap-6
                        lg:grid-cols-2
                    "
                >

                    {futureFeatures.map((feature) => {

                        const Icon = feature.icon;

                        return (

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

                                <div className="mt-5">

                                    <div
                                        className="
                                            flex
                                            items-center
                                            justify-between
                                            gap-3
                                            flex-wrap
                                        "
                                    >

                                        <h3 className="text-lg font-semibold">
                                            {feature.title}
                                        </h3>

                                        <span
                                            className="
                                                rounded-full
                                                bg-violet-600/10
                                                px-3
                                                py-1
                                                text-xs
                                                font-semibold
                                                text-violet-400
                                            "
                                        >
                                            {feature.timeline}
                                        </span>

                                    </div>

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

                            </div>

                        );

                    })}

                </div>

            </div>

            {/* Platform Vision */}

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

                    <Target
                        size={24}
                        className="text-violet-400"
                    />

                    <h2 className="text-2xl font-semibold">
                        Platform Vision
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

                    {vision.map((item) => (

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

                            <ShieldCheck
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
                    Long-Term Goal
                </h2>

                <p
                    className="
                        mt-5
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    The long-term objective of InsightIQ is to evolve from a
                    reporting platform into an intelligent business operating
                    companion that continuously monitors organizational
                    performance, explains changes, recommends actions and
                    assists leadership in making faster, data-driven decisions.
                </p>

            </div>

        </section>
    );
}

export default Version20;