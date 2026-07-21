import { motion } from "framer-motion";

import {
    Lightbulb,
    Sparkles,
    TrendingUp,
    CheckCircle2,
    AlertTriangle,
    ShieldAlert,
    Briefcase,
    Brain
} from "lucide-react";

import SectionHeader from "./SectionHeader";

function ExecutiveInsights({

    recommendations = {},

    prediction = {},

    analytics = {}

}) {

    const executiveSummary =
        analytics?.executiveSummary || {};

    const businessStory =
        analytics?.businessStory || [];

    const alerts =
        analytics?.alerts || [];

    const opportunities =
        analytics?.opportunities || [];

    const businessHealth =
        analytics?.businessHealth || {};

    const predictionEngine =
        analytics?.prediction || {};

    const recommendationList = [

        ...(recommendations.highPriority || []),

        ...(recommendations.mediumPriority || []),

        ...(recommendations.lowPriority || [])

    ];

    const insights =

        recommendationList.length

            ? recommendationList

            : [

                {

                    title:

                        "No Recommendations",

                    description:

                        "InsightIQ did not identify any actionable recommendations for this dataset.",

                    impact:

                        "Low"

                }

            ];

    const predictionStatus =

        predictionEngine.ready

            ? "Ready"

            : "Insufficient Data";

    const predictionConfidence =

        predictionEngine.confidence ||

        prediction.confidence ||

        0;

    const summaryText =

        executiveSummary.overview ||

        "Executive summary unavailable.";

    const story =

        businessStory.length

            ? businessStory

            : [

                "Business story could not be generated."

            ];

                return (

        <motion.section

            initial={{
                opacity: 0,
                y: 20
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                delay: .2
            }}

        >

            <SectionHeader

                title="Executive Business Intelligence"

                description="Real executive insights generated directly from your uploaded dataset."

                badge="AI Generated"

            />

            <div

                className="
                    grid
                    gap-6
                    xl:grid-cols-2
                "

            >

                {/* ========================================= */}
                {/* Executive Summary + Recommendations */}
                {/* ========================================= */}

                <div

                    className="
                        rounded-3xl
                        border
                        border-[var(--border)]
                        bg-[var(--card)]
                        p-7
                    "

                >

                    <div className="flex items-center gap-4">

                        <div

                            className="
                                rounded-2xl
                                bg-violet-600/10
                                p-4
                            "

                        >

                            <Brain

                                size={28}

                                className="text-violet-400"

                            />

                        </div>

                        <div>

                            <h3

                                className="text-xl font-semibold"

                            >

                                Executive Summary

                            </h3>

                            <p

                                className="
                                    text-sm
                                    text-[var(--muted)]
                                "

                            >

                                AI generated business overview.

                            </p>

                        </div>

                    </div>

                    <div

                        className="
                            mt-7
                            rounded-2xl
                            border
                            border-violet-500/20
                            bg-violet-500/5
                            p-5
                        "

                    >

                        <p

                            className="
                                leading-7
                                text-[15px]
                                text-[var(--muted)]
                            "

                        >

                            {summaryText}

                        </p>

                    </div>

                    <div className="mt-8">

                        <h4

                            className="
                                mb-5
                                font-semibold
                            "

                        >

                            AI Recommendations

                        </h4>

                        <div className="space-y-5">

                            {

                                insights.map((item, index) => (

                                    <motion.div

                                        key={index}

                                        initial={{
                                            opacity: 0,
                                            x: -15
                                        }}

                                        animate={{
                                            opacity: 1,
                                            x: 0
                                        }}

                                        transition={{
                                            delay: index * .08
                                        }}

                                        className="
                                            flex
                                            gap-4
                                        "

                                    >

                                        <CheckCircle2

                                            size={18}

                                            className="
                                                mt-1
                                                text-emerald-400
                                            "

                                        />

                                        <div>

                                            <h5

                                                className="font-semibold"

                                            >

                                                {item.title}

                                            </h5>

                                            <p

                                                className="
                                                    mt-2
                                                    text-sm
                                                    leading-6
                                                    text-[var(--muted)]
                                                "

                                            >

                                                {

                                                    item.recommendation ||

                                                    item.description

                                                }

                                            </p>

                                        </div>

                                    </motion.div>

                                ))

                            }

                        </div>

                    </div>

                </div>

                {/* ========================================= */}
                {/* Prediction + Alerts */}
                {/* ========================================= */}

                <div

                    className="
                        space-y-6
                    "

                >

                    {/* Prediction */}

                    <div

                        className="
                            rounded-3xl
                            border
                            border-[var(--border)]
                            bg-[var(--card)]
                            p-7
                        "

                    >

                        <div className="flex items-center gap-4">

                            <div

                                className="
                                    rounded-2xl
                                    bg-cyan-500/10
                                    p-4
                                "

                            >

                                <TrendingUp

                                    size={26}

                                    className="text-cyan-400"

                                />

                            </div>

                            <div>

                                <h3

                                    className="text-xl font-semibold"

                                >

                                    Prediction Engine

                                </h3>

                                <p

                                    className="
                                        text-sm
                                        text-[var(--muted)]
                                    "

                                >

                                    AI forecasting readiness

                                </p>

                            </div>

                        </div>

                        <div

                            className="
                                mt-7
                                grid
                                grid-cols-2
                                gap-6
                            "

                        >

                            <div>

                                <p

                                    className="
                                        text-sm
                                        text-[var(--muted)]
                                    "

                                >

                                    Status

                                </p>

                                <h2

                                    className="
                                        mt-3
                                        text-3xl
                                        font-bold
                                    "

                                >

                                    {predictionStatus}

                                </h2>

                            </div>

                            <div>

                                <p

                                    className="
                                        text-sm
                                        text-[var(--muted)]
                                    "

                                >

                                    Confidence

                                </p>

                                <h2

                                    className="
                                        mt-3
                                        text-3xl
                                        font-bold
                                        text-cyan-400
                                    "

                                >

                                    {predictionConfidence}%

                                </h2>

                            </div>

                        </div>

                    </div>

                    {/* Alerts */}

                    <div

                        className="
                            rounded-3xl
                            border
                            border-[var(--border)]
                            bg-[var(--card)]
                            p-7
                        "

                    >

                        <div className="flex items-center gap-3">

                            <ShieldAlert

                                className="text-orange-400"

                            />

                            <h3

                                className="text-lg font-semibold"

                            >

                                Business Alerts

                            </h3>

                        </div>

                        <div className="mt-6 space-y-4">

                            {

                                alerts.length

                                    ? alerts.map((alert, index) => (

                                        <div

                                            key={index}

                                            className="
                                                rounded-xl
                                                border
                                                border-orange-500/20
                                                bg-orange-500/5
                                                p-4
                                            "

                                        >

                                            <div className="flex items-center gap-3">

                                                <AlertTriangle

                                                    size={18}

                                                    className="text-orange-400"

                                                />

                                                <span

                                                    className="font-medium"

                                                >

                                                    {alert.title}

                                                </span>

                                            </div>

                                            <p

                                                className="
                                                    mt-3
                                                    text-sm
                                                    text-[var(--muted)]
                                                "

                                            >

                                                {alert.description}

                                            </p>

                                        </div>

                                    ))

                                    : (

                                        <p

                                            className="
                                                text-sm
                                                text-[var(--muted)]
                                            "

                                        >

                                            No business alerts detected.

                                        </p>

                                    )

                            }

                        </div>

                    </div>

                </div>

            </div>

                        {/* ========================================= */}
            {/* Business Story */}
            {/* ========================================= */}

            <div

                className="
                    mt-6
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-7
                "

            >

                <div className="flex items-center gap-3">

                    <Briefcase

                        className="text-violet-400"

                    />

                    <h3

                        className="text-xl font-semibold"

                    >

                        Business Story

                    </h3>

                </div>

                <div className="mt-6 space-y-4">

                    {

                        story.map((line, index) => (

                            <motion.div

                                key={index}

                                initial={{
                                    opacity: 0,
                                    x: -10
                                }}

                                animate={{
                                    opacity: 1,
                                    x: 0
                                }}

                                transition={{
                                    delay: index * 0.05
                                }}

                                className="
                                    flex
                                    gap-3
                                "

                            >

                                <Sparkles

                                    size={18}

                                    className="
                                        mt-1
                                        text-violet-400
                                    "

                                />

                                <p

                                    className="
                                        leading-7
                                        text-[15px]
                                        text-[var(--muted)]
                                    "

                                >

                                    {line}

                                </p>

                            </motion.div>

                        ))

                    }

                </div>

            </div>

            {/* ========================================= */}
            {/* Growth Opportunities */}
            {/* ========================================= */}

            <div

                className="
                    mt-6
                    rounded-3xl
                    border
                    border-[var(--border)]
                    bg-[var(--card)]
                    p-7
                "

            >

                <div className="flex items-center gap-3">

                    <TrendingUp

                        className="text-emerald-400"

                    />

                    <h3

                        className="text-xl font-semibold"

                    >

                        Growth Opportunities

                    </h3>

                </div>

                <div className="mt-6 space-y-5">

                    {

                        opportunities.length

                            ? opportunities.map((item, index) => (

                                <motion.div

                                    key={index}

                                    initial={{
                                        opacity: 0,
                                        y: 10
                                    }}

                                    animate={{
                                        opacity: 1,
                                        y: 0
                                    }}

                                    transition={{
                                        delay: index * 0.05
                                    }}

                                    className="
                                        rounded-2xl
                                        border
                                        border-emerald-500/20
                                        bg-emerald-500/5
                                        p-5
                                    "

                                >

                                    <div className="flex items-center justify-between">

                                        <h4

                                            className="font-semibold"

                                        >

                                            {item.title}

                                        </h4>

                                        <span

                                            className="
                                                rounded-full
                                                bg-emerald-500/15
                                                px-3
                                                py-1
                                                text-xs
                                                font-medium
                                                text-emerald-300
                                            "

                                        >

                                            {item.priority}

                                        </span>

                                    </div>

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

                                </motion.div>

                            ))

                            : (

                                <p

                                    className="
                                        text-sm
                                        text-[var(--muted)]
                                    "

                                >

                                    No additional business opportunities detected.

                                </p>

                            )

                    }

                </div>

            </div>

        </motion.section>

    );

}

export default ExecutiveInsights;