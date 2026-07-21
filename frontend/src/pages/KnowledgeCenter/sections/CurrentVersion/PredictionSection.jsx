import {
    Brain,
    TrendingUp,
    CalendarRange,
    Database,
    ShieldCheck,
    AlertTriangle,
    CheckCircle2,
    Clock3
} from "lucide-react";

const predictionStages = [
    {
        icon: Database,
        title: "Historical Data Analysis",
        description:
            "The AI engine first checks whether the uploaded dataset contains sufficient historical information for predictive modelling."
    },
    {
        icon: Brain,
        title: "Pattern Recognition",
        description:
            "Business trends, seasonal behaviour, growth patterns and recurring relationships are identified automatically."
    },
    {
        icon: TrendingUp,
        title: "Prediction Generation",
        description:
            "Future trends are estimated only when adequate historical information is available."
    },
    {
        icon: ShieldCheck,
        title: "Confidence Validation",
        description:
            "Predictions are validated against dataset quality and AI confidence before being presented."
    }
];

const readiness = [
    {
        title: "Prediction Ready",
        icon: CheckCircle2,
        color: "text-green-400",
        background: "bg-green-500/10",
        description:
            "Dataset contains sufficient historical records for meaningful forecasting."
    },
    {
        title: "Limited Prediction",
        icon: Clock3,
        color: "text-yellow-400",
        background: "bg-yellow-500/10",
        description:
            "Forecasts are possible, but additional historical data will improve reliability."
    },
    {
        title: "Prediction Unavailable",
        icon: AlertTriangle,
        color: "text-red-400",
        background: "bg-red-500/10",
        description:
            "The uploaded dataset does not contain enough historical information to generate predictions."
    }
];

function PredictionSection() {
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
                    Prediction Engine
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    AI Forecasting & Prediction
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    InsightIQ evaluates historical business data to determine
                    whether predictive analysis is appropriate. Forecasts are
                    generated only when the uploaded dataset contains enough
                    information to support reliable future projections.
                </p>

            </div>

            {/* Pipeline */}

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    lg:grid-cols-2
                "
            >

                {predictionStages.map((stage) => {

                    const Icon = stage.icon;

                    return (

                        <div
                            key={stage.title}
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
                                {stage.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    leading-6
                                    text-sm
                                    text-[var(--muted)]
                                "
                            >
                                {stage.description}
                            </p>

                        </div>

                    );

                })}

            </div>

            {/* Readiness */}

            <div className="mt-10">

                <h3 className="text-xl font-semibold">
                    Prediction Readiness Levels
                </h3>

                <div
                    className="
                        mt-6
                        grid
                        gap-6
                        lg:grid-cols-3
                    "
                >

                    {readiness.map((item) => {

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
                                    className={`
                                        flex
                                        h-12
                                        w-12
                                        items-center
                                        justify-center
                                        rounded-xl
                                        ${item.background}
                                    `}
                                >

                                    <Icon
                                        size={24}
                                        className={item.color}
                                    />

                                </div>

                                <h4 className="mt-5 font-semibold">
                                    {item.title}
                                </h4>

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

            </div>

            {/* Factors */}

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

                    <CalendarRange
                        size={22}
                        className="text-violet-400"
                    />

                    <h3 className="text-lg font-semibold">
                        Factors That Improve Prediction Accuracy
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

                    {[
                        "Longer historical datasets",
                        "Clean and validated business data",
                        "Consistent time intervals",
                        "Complete financial records",
                        "Accurate customer information",
                        "Minimal missing values"
                    ].map((factor) => (

                        <div
                            key={factor}
                            className="
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                border
                                border-[var(--border)]
                                p-4
                            "
                        >

                            <CheckCircle2
                                size={18}
                                className="text-violet-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                {factor}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

            {/* Information */}

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
                    Prediction Policy
                </h3>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    InsightIQ intentionally avoids generating forecasts when
                    insufficient historical information is available. This
                    design prioritizes reliability over speculation and helps
                    users make decisions based on evidence rather than
                    unsupported predictions.
                </p>

            </div>

        </section>
    );
}

export default PredictionSection;