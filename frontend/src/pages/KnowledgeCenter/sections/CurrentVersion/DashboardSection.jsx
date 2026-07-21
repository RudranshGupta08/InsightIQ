import {
    LayoutDashboard,
    BarChart3,
    Activity,
    Gauge,
    TrendingUp,
    FileText,
    Camera
} from "lucide-react";

const dashboardCards = [
    {
        icon: Gauge,
        title: "Business Health",
        description:
            "Displays the overall business health score generated from financial, operational and customer analysis."
    },
    {
        icon: BarChart3,
        title: "Key Performance Indicators",
        description:
            "Shows important KPIs including revenue, expenses, profitability, customer count and operational metrics."
    },
    {
        icon: TrendingUp,
        title: "Trend Analysis",
        description:
            "Visualizes historical performance, growth patterns and important business movements."
    },
    {
        icon: Activity,
        title: "AI Insights",
        description:
            "Highlights critical findings, anomalies and business opportunities detected by the AI engine."
    },
    {
        icon: FileText,
        title: "Executive Summary",
        description:
            "Provides a concise explanation of the business condition for managers and decision makers."
    }
];

function DashboardSection() {
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
            {/* Header */}

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
                    Dashboard
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Executive Dashboard
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    The Executive Dashboard is the primary workspace inside
                    InsightIQ. It consolidates business intelligence,
                    AI-generated insights and performance indicators into
                    a single interactive view for faster decision making.
                </p>

            </div>

            {/* Screenshot */}

            <div
                className="
                    mt-10
                    overflow-hidden
                    rounded-2xl
                    border
                    border-[var(--border)]
                "
            >

                <div
                    className="
                        flex
                        h-[420px]
                        flex-col
                        items-center
                        justify-center
                        bg-black/20
                    "
                >

                    <Camera
                        size={52}
                        className="text-violet-400"
                    />

                    <h3 className="mt-5 text-xl font-semibold">
                        Dashboard Screenshot
                    </h3>

                    <p
                        className="
                            mt-2
                            text-sm
                            text-[var(--muted)]
                        "
                    >
                        Replace this placeholder with an actual screenshot
                        of your InsightIQ dashboard.
                    </p>

                </div>

            </div>

            {/* Dashboard Components */}

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                {dashboardCards.map((card) => {

                    const Icon = card.icon;

                    return (

                        <div
                            key={card.title}
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
                                {card.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {card.description}
                            </p>

                        </div>

                    );

                })}

            </div>

            {/* Navigation Guide */}

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

                    <LayoutDashboard
                        className="text-violet-400"
                        size={24}
                    />

                    <h3 className="text-lg font-semibold">
                        Dashboard Navigation
                    </h3>

                </div>

                <div
                    className="
                        mt-6
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    <div>

                        <h4 className="font-medium">
                            Left Sidebar
                        </h4>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--muted)]
                            "
                        >
                            Access Analytics, Businesses,
                            Transactions, Data Hub,
                            Settings and the Knowledge Center.
                        </p>

                    </div>

                    <div>

                        <h4 className="font-medium">
                            Main Workspace
                        </h4>

                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-[var(--muted)]
                            "
                        >
                            Displays uploaded datasets,
                            AI-generated insights,
                            executive reports,
                            business health and
                            recommendations.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default DashboardSection;