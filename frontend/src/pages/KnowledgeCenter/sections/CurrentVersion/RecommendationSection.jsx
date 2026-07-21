import {
    Target,
    TrendingUp,
    DollarSign,
    Users,
    Boxes,
    ShieldAlert,
    CheckCircle2
} from "lucide-react";

const recommendations = [
    {
        icon: DollarSign,
        title: "Financial Optimization",
        priority: "High Priority",
        description:
            "Identify opportunities to improve profitability by reducing unnecessary expenses, increasing margins and optimizing pricing strategies."
    },
    {
        icon: Users,
        title: "Customer Growth",
        priority: "Medium Priority",
        description:
            "Detect customer concentration risks, improve retention strategies and identify high-value customer segments."
    },
    {
        icon: Boxes,
        title: "Operational Improvements",
        priority: "High Priority",
        description:
            "Highlight inefficiencies in inventory, procurement and operational workflows that may affect business performance."
    },
    {
        icon: TrendingUp,
        title: "Growth Opportunities",
        priority: "Strategic",
        description:
            "Discover emerging trends and areas where additional investment or expansion may generate long-term value."
    }
];

const priorities = [
    {
        color: "bg-red-500/10 text-red-400",
        title: "Critical",
        description: "Immediate action recommended."
    },
    {
        color: "bg-orange-500/10 text-orange-400",
        title: "High",
        description: "Address in the short term."
    },
    {
        color: "bg-yellow-500/10 text-yellow-400",
        title: "Medium",
        description: "Monitor and improve gradually."
    },
    {
        color: "bg-green-500/10 text-green-400",
        title: "Low",
        description: "No immediate action required."
    }
];

function RecommendationSection() {
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
                    Recommendation Engine
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    AI Business Recommendations
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    InsightIQ automatically generates business
                    recommendations after evaluating financial,
                    operational, customer and performance indicators.
                    Recommendations are ranked according to business
                    impact to help decision-makers focus on the most
                    important improvements first.
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
                {recommendations.map((item) => {

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
                                    items-start
                                    justify-between
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
                                    {item.priority}
                                </span>

                            </div>

                            <h3 className="mt-5 text-lg font-semibold">
                                {item.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm
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

                    <ShieldAlert
                        size={22}
                        className="text-violet-400"
                    />

                    <h3 className="text-lg font-semibold">
                        Recommendation Priorities
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

                    {priorities.map((priority) => (

                        <div
                            key={priority.title}
                            className="
                                rounded-xl
                                border
                                border-[var(--border)]
                                p-4
                            "
                        >

                            <div
                                className={`
                                    inline-flex
                                    rounded-full
                                    px-3
                                    py-1
                                    text-sm
                                    font-semibold
                                    ${priority.color}
                                `}
                            >
                                {priority.title}
                            </div>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    text-[var(--muted)]
                                "
                            >
                                {priority.description}
                            </p>

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

                    <CheckCircle2
                        size={22}
                        className="text-violet-400"
                    />

                    <h3 className="text-lg font-semibold">
                        Best Practice
                    </h3>

                </div>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    AI recommendations should be considered as
                    decision-support guidance. Business owners should
                    combine these insights with operational knowledge,
                    market conditions and organizational objectives
                    before implementing strategic changes.
                </p>

            </div>

        </section>
    );
}

export default RecommendationSection;