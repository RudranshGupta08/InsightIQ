import { motion } from "framer-motion";

import {

    Brain,

    Database,

    TrendingUp,

    ShieldCheck,

    Building2,

    BarChart3,

    Sparkles,

    FileSpreadsheet,

    ArrowRight,

} from "lucide-react";

const workflow = [

    {

        icon: FileSpreadsheet,

        title: "Upload Dataset",

        description:

            "Import Excel, CSV or business datasets securely into InsightIQ."

    },

    {

        icon: Brain,

        title: "AI Understanding",

        description:

            "The AI engine automatically detects business fields, relationships and business entities."

    },

    {

        icon: Database,

        title: "Business Intelligence",

        description:

            "Generate KPIs, executive summaries, trends, financial metrics and operational insights."

    },

    {

        icon: TrendingUp,

        title: "Decision Support",

        description:

            "Receive business recommendations, risk analysis and strategic opportunities."

    }

];

const capabilities = [

    {

        icon: Brain,

        title: "Artificial Intelligence",

        description:

            "Automatically understands uploaded business datasets without manual configuration."

    },

    {

        icon: BarChart3,

        title: "Business Analytics",

        description:

            "Transforms raw business data into executive dashboards and actionable insights."

    },

    {

        icon: ShieldCheck,

        title: "Business Health",

        description:

            "Evaluates financial performance, operational efficiency, customer strength and business risks."

    },

    {

        icon: Sparkles,

        title: "Executive Reporting",

        description:

            "Creates executive summaries, business stories and AI-driven recommendations."

    }

];

const industries = [

    "Retail",

    "Manufacturing",

    "Healthcare",

    "Education",

    "Finance",

    "Hospitality",

    "Logistics",

    "Construction",

    "Real Estate",

    "HR & Workforce"

];

function Overview() {

    return (

        <motion.div

            initial={{

                opacity: 0,

                y: 15

            }}

            animate={{

                opacity: 1,

                y: 0

            }}

            className="space-y-8"

        >

            <div

                className="

                    rounded-3xl

                    border

                    border-[var(--border)]

                    bg-[var(--card)]

                    p-8

                "

            >

                <div className="flex items-center gap-4">

                    <div

                        className="

                            rounded-2xl

                            bg-violet-600/15

                            p-4

                        "

                    >

                        <Building2

                            size={34}

                            className="text-violet-400"

                        />

                    </div>

                    <div>

                        <h2 className="text-3xl font-bold">

                            What is InsightIQ?

                        </h2>

                        <p className="mt-2 text-[var(--muted)] leading-7">

                            InsightIQ is an AI-powered Business Intelligence
                            platform designed to transform raw business
                            datasets into executive-level insights, financial
                            intelligence, operational analytics and strategic
                            recommendations.

                        </p>

                    </div>

                </div>

                <div

                    className="

                        mt-8

                        rounded-2xl

                        border

                        border-violet-500/20

                        bg-violet-600/5

                        p-6

                    "

                >

                    <h3 className="text-xl font-semibold">

                        Primary Objective

                    </h3>

                    <p className="mt-3 text-[var(--muted)] leading-7">

                        Enable business owners, managers and analysts to make
                        data-driven decisions without requiring advanced
                        technical or analytical expertise. InsightIQ converts
                        complex datasets into understandable business reports,
                        health scores, trends and AI-powered recommendations.

                    </p>

                </div>

            </div>

            <div

                className="

                    rounded-3xl

                    border

                    border-[var(--border)]

                    bg-[var(--card)]

                    p-8

                "

            >

                <h2 className="text-2xl font-bold">

                    How InsightIQ Works

                </h2>

                <p className="mt-2 text-[var(--muted)]">

                    Every uploaded dataset follows a structured AI analysis
                    pipeline.

                </p>

                <div className="mt-8 grid gap-6 xl:grid-cols-4">

                    {

                        workflow.map((step, index) => {

                            const Icon = step.icon;

                            return (

                                <div

                                    key={step.title}

                                    className="

                                        rounded-2xl

                                        border

                                        border-[var(--border)]

                                        bg-black/20

                                        p-6

                                    "

                                >

                                    <Icon

                                        className="text-violet-400"

                                        size={32}

                                    />

                                    <h3 className="mt-5 font-semibold">

                                        {step.title}

                                    </h3>

                                    <p className="mt-3 text-sm text-[var(--muted)] leading-6">

                                        {step.description}

                                    </p>

                                    {

                                        index !== workflow.length - 1 && (

                                            <ArrowRight

                                                className="mt-6 text-violet-400"

                                                size={20}

                                            />

                                        )

                                    }

                                </div>

                            );

                        })

                    }

                </div>

            </div>

            <div

                className="

                    grid

                    gap-8

                    xl:grid-cols-2

                "

            >

                <div

                    className="

                        rounded-3xl

                        border

                        border-[var(--border)]

                        bg-[var(--card)]

                        p-8

                    "

                >

                    <h2 className="text-2xl font-bold">

                        Core Capabilities

                    </h2>

                    <div className="mt-8 space-y-5">

                        {

                            capabilities.map(item => {

                                const Icon = item.icon;

                                return (

                                    <div

                                        key={item.title}

                                        className="

                                            flex

                                            gap-5

                                        "

                                    >

                                        <div

                                            className="

                                                rounded-xl

                                                bg-violet-600/15

                                                p-3

                                                h-fit

                                            "

                                        >

                                            <Icon

                                                size={22}

                                                className="text-violet-400"

                                            />

                                        </div>

                                        <div>

                                            <h3 className="font-semibold">

                                                {item.title}

                                            </h3>

                                            <p className="mt-2 text-sm text-[var(--muted)] leading-6">

                                                {item.description}

                                            </p>

                                        </div>

                                    </div>

                                );

                            })

                        }

                    </div>

                </div>

                <div

                    className="

                        rounded-3xl

                        border

                        border-[var(--border)]

                        bg-[var(--card)]

                        p-8

                    "

                >

                    <h2 className="text-2xl font-bold">

                        Supported Business Domains

                    </h2>

                    <p className="mt-2 text-[var(--muted)]">

                        InsightIQ is designed to analyse structured datasets
                        from multiple industries.

                    </p>

                    <div

                        className="

                            mt-8

                            flex

                            flex-wrap

                            gap-3

                        "

                    >

                        {

                            industries.map(industry => (

                                <span

                                    key={industry}

                                    className="

                                        rounded-full

                                        border

                                        border-violet-500/20

                                        bg-violet-500/10

                                        px-4

                                        py-2

                                        text-sm

                                    "

                                >

                                    {industry}

                                </span>

                            ))

                        }

                    </div>

                </div>

            </div>

        </motion.div>

    );

}

export default Overview;