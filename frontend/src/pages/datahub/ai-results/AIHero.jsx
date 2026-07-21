import { motion } from "framer-motion";

import {
    Brain,
    CheckCircle2,
    FileSpreadsheet,
    Sparkles,
    ShieldCheck,
    Database,
    Activity,
    BadgeCheck
} from "lucide-react";

function AIHero({

    fileName,

    metadata = {},

    analytics = {}

}) {

    const executive = analytics?.executive || {};

    const confidence =
        executive.aiConfidence ?? 0;

    const businessHealth =
        executive.businessHealth ?? "Unknown";

    const healthScore =
        executive.healthScore ?? 0;

    const domain =
        executive.domain ?? "Business";

    const predictionReady =
        executive.predictionReady ?? false;

    const records =
        executive.totalRecords ??
        metadata.totalRows ??
        0;

    const fields =
        executive.totalFields ??
        metadata.totalColumns ??
        0;

    const quality =
        executive.datasetQuality ?? 0;

    const revenue =
        executive.revenue ?? 0;

    const profit =
        executive.profit ?? 0;

    const profitMargin =
        executive.profitMargin ?? 0;

    return (

        <motion.section

            initial={{
                opacity: 0,
                y: 25
            }}

            animate={{
                opacity: 1,
                y: 0
            }}

            transition={{
                duration: .5
            }}

            className="
                relative
                overflow-hidden
                rounded-3xl
                border
                border-[var(--border)]
                bg-[var(--card)]
            "

        >

            <div
                className="
                    absolute
                    -top-24
                    -right-24
                    h-80
                    w-80
                    rounded-full
                    bg-violet-600/10
                    blur-[120px]
                "
            />

            <div
                className="
                    absolute
                    -bottom-24
                    left-0
                    h-64
                    w-64
                    rounded-full
                    bg-indigo-500/10
                    blur-[120px]
                "
            />

            <div className="relative z-10 p-8">

                {/* AI Badge */}

                <motion.div

                    initial={{
                        opacity: 0,
                        scale: .95
                    }}

                    animate={{
                        opacity: 1,
                        scale: 1
                    }}

                    transition={{
                        delay: .15
                    }}

                    className="
                        inline-flex
                        items-center
                        gap-2
                        rounded-full
                        border
                        border-violet-500/20
                        bg-violet-500/10
                        px-4
                        py-2
                    "

                >

                    <Brain
                        size={18}
                        className="text-violet-400"
                    />

                    <span
                        className="
                            text-sm
                            font-medium
                            text-violet-300
                        "
                    >
                        InsightIQ AI Intelligence Engine
                    </span>

                </motion.div>

                {/* Heading */}

                <motion.div

                    initial={{
                        opacity: 0,
                        y: 10
                    }}

                    animate={{
                        opacity: 1,
                        y: 0
                    }}

                    transition={{
                        delay: .25
                    }}

                    className="mt-6"

                >

                    <h1
                        className="
                            text-4xl
                            font-bold
                            tracking-tight
                            text-[var(--text)]
                        "
                    >
                        {domain} Business Intelligence Report
                    </h1>

                    <p
                        className="
                            mt-4
                            max-w-4xl
                            leading-7
                            text-[15px]
                            text-[var(--muted)]
                        "
                    >
                        {`InsightIQ analysed ${records.toLocaleString()} records across ${fields} business fields. The AI engine detected the business domain as ${domain}, achieved a dataset quality score of ${quality}% and generated executive insights, KPI analysis, business recommendations and predictive intelligence.`}
                    </p>

                </motion.div>

                {/* Executive Cards */}

                <div
                    className="
                        mt-8
                        grid
                        gap-5
                        lg:grid-cols-4
                    "
                >

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-3">

                            <FileSpreadsheet
                                size={20}
                                className="text-violet-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                Dataset
                            </span>

                        </div>

                        <h3
                            className="
                                mt-4
                                break-all
                                text-lg
                                font-semibold
                            "
                        >
                            {fileName}
                        </h3>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-3">

                            <Sparkles
                                size={20}
                                className="text-violet-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                AI Confidence
                            </span>

                        </div>

                        <h3
                            className="
                                mt-4
                                text-3xl
                                font-bold
                            "
                        >
                            {confidence}%
                        </h3>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-emerald-500/20
                            bg-emerald-500/10
                            p-5
                        "
                    >

                        <div className="flex items-center gap-3">

                            <ShieldCheck
                                size={20}
                                className="text-emerald-400"
                            />

                            <span className="text-sm text-emerald-300">
                                Business Health
                            </span>

                        </div>

                        <h3
                            className="
                                mt-4
                                text-xl
                                font-bold
                            "
                        >
                            {businessHealth}
                        </h3>

                        <p className="mt-2 text-sm text-emerald-200">
                            Score : {healthScore}/100
                        </p>

                    </div>

                    <div
                        className="
                            rounded-2xl
                            border
                            border-cyan-500/20
                            bg-cyan-500/10
                            p-5
                        "
                    >

                        <div className="flex items-center gap-3">

                            <Brain
                                size={20}
                                className="text-cyan-400"
                            />

                            <span className="text-sm text-cyan-300">
                                Prediction Engine
                            </span>

                        </div>

                        <h3
                            className="
                                mt-4
                                text-lg
                                font-semibold
                            "
                        >
                            {predictionReady
                                ? "Ready"
                                : "Insufficient Data"}
                        </h3>

                    </div>

                </div>

                                {/* Executive Metrics */}

                <div
                    className="
                        mt-10
                        grid
                        gap-5
                        md:grid-cols-2
                        xl:grid-cols-6
                    "
                >

                    {/* Records */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <Database
                                size={18}
                                className="text-violet-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                Records
                            </span>

                        </div>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                            "
                        >
                            {records.toLocaleString()}
                        </h2>

                    </div>

                    {/* Fields */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <BadgeCheck
                                size={18}
                                className="text-cyan-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                Fields
                            </span>

                        </div>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                            "
                        >
                            {fields}
                        </h2>

                    </div>

                    {/* Revenue */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-[var(--muted)]
                            "
                        >
                            Revenue
                        </p>

                        <h2
                            className="
                                mt-4
                                text-2xl
                                font-bold
                            "
                        >
                            ₹{Number(revenue).toLocaleString()}
                        </h2>

                    </div>

                    {/* Profit */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <p
                            className="
                                text-sm
                                text-[var(--muted)]
                            "
                        >
                            Profit
                        </p>

                        <h2
                            className="
                                mt-4
                                text-2xl
                                font-bold
                                text-emerald-400
                            "
                        >
                            ₹{Number(profit).toLocaleString()}
                        </h2>

                    </div>

                    {/* Profit Margin */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <Activity
                                size={18}
                                className="text-orange-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                Profit Margin
                            </span>

                        </div>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                            "
                        >
                            {profitMargin}%
                        </h2>

                    </div>

                    {/* Dataset Quality */}

                    <div
                        className="
                            rounded-2xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <div className="flex items-center gap-2">

                            <CheckCircle2
                                size={18}
                                className="text-emerald-400"
                            />

                            <span className="text-sm text-[var(--muted)]">
                                Dataset Quality
                            </span>

                        </div>

                        <h2
                            className="
                                mt-4
                                text-3xl
                                font-bold
                            "
                        >
                            {quality}%
                        </h2>

                    </div>

                </div>

                {/* Footer */}

                <div
                    className="
                        mt-10
                        border-t
                        border-[var(--border)]
                        pt-6
                    "
                >

                    <h4
                        className="
                            text-lg
                            font-semibold
                        "
                    >
                        AI Executive Summary
                    </h4>

                    <p
                        className="
                            mt-4
                            max-w-5xl
                            text-sm
                            leading-7
                            text-[var(--muted)]
                        "
                    >
                        InsightIQ completed semantic mapping, ontology detection,
                        KPI generation, business intelligence analysis,
                        executive reporting, recommendation generation,
                        opportunity detection and predictive readiness evaluation
                        directly from your uploaded business dataset.
                    </p>

                </div>

            </div>

        </motion.section>

    );

}

export default AIHero;