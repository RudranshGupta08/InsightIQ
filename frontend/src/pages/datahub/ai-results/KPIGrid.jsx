import { motion } from "framer-motion";

import {
    Brain,
    Database,
    Activity,
    ShieldCheck,
    DollarSign,
    TrendingUp,
    Users,
    AlertTriangle,
    Package,
    Percent
} from "lucide-react";

import SectionHeader from "./SectionHeader";

function KPIGrid({

    analytics = {}

}) {

    const executive =
        analytics?.executive || {};

    const kpis =
        analytics?.dashboardKPIs || [];

    const iconMap = {

        database: Database,

        brain: Brain,

        activity: Activity,

        shield: ShieldCheck,

        wallet: DollarSign,

        "trending-up": TrendingUp,

        users: Users,

        "alert-circle": AlertTriangle,

        package: Package,

        percent: Percent

    };

    const cards =

        kpis.length

            ? kpis.map(kpi => ({

                title:
                    kpi.title,

                value:

                    kpi.currency

                        ? `₹${Number(

                            kpi.value || 0

                        ).toLocaleString()}`

                        : kpi.unit

                        ? `${kpi.value}${kpi.unit}`

                        : kpi.value,

                subtitle:

                    executive.domain ||

                    "Business Intelligence",

                icon:

                    iconMap[kpi.icon] ||

                    Database

            }))

            : [

                {

                    title:

                        "Business Health",

                    value:

                        executive.healthScore || 0,

                    subtitle:

                        executive.businessHealth ||

                        "Unknown",

                    icon:

                        Activity

                },

                {

                    title:

                        "AI Confidence",

                    value:

                        `${executive.aiConfidence || 0}%`,

                    subtitle:

                        "Prediction Engine",

                    icon:

                        Brain

                },

                {

                    title:

                        "Dataset Quality",

                    value:

                        `${executive.datasetQuality || 0}%`,

                    subtitle:

                        "Quality Score",

                    icon:

                        ShieldCheck

                },

                {

                    title:

                        "Records",

                    value:

                        executive.totalRecords || 0,

                    subtitle:

                        "Business Records",

                    icon:

                        Database

                }

            ];

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
                delay: 0.1
            }}

        >

            <SectionHeader

                title="Business Intelligence KPIs"

                description="Real-time business KPIs generated directly from your uploaded dataset."

                badge="AI Generated"

            />

            <div
                className="
                    grid
                    gap-6
                    sm:grid-cols-2
                    xl:grid-cols-5
                "
            >

                {

                    cards.map((card, index) => {

                        const Icon = card.icon;

                        return (

                            <motion.div

                                key={card.title}

                                initial={{
                                    opacity: 0,
                                    y: 20
                                }}

                                animate={{
                                    opacity: 1,
                                    y: 0
                                }}

                                transition={{
                                    delay: index * 0.07
                                }}

                                whileHover={{
                                    y: -6,
                                    scale: 1.02
                                }}

                                className="
                                    group
                                    relative
                                    overflow-hidden
                                    rounded-3xl
                                    border
                                    border-[var(--border)]
                                    bg-[var(--card)]
                                    p-6
                                    transition-all
                                    duration-300
                                    hover:border-violet-500/40
                                    hover:shadow-xl
                                    hover:shadow-violet-500/10
                                "

                            >

                                {/* Glow */}

                                <div
                                    className="
                                        absolute
                                        -right-12
                                        -top-12
                                        h-36
                                        w-36
                                        rounded-full
                                        bg-violet-600/10
                                        blur-3xl
                                        opacity-0
                                        transition-all
                                        duration-300
                                        group-hover:opacity-100
                                    "
                                />

                                <div
                                    className="
                                        relative
                                        z-10
                                        flex
                                        items-start
                                        justify-between
                                    "
                                >

                                    <div>

                                        <p
                                            className="
                                                text-sm
                                                text-[var(--muted)]
                                            "
                                        >
                                            {card.title}
                                        </p>

                                        <h2
                                            className="
                                                mt-4
                                                text-4xl
                                                font-bold
                                                tracking-tight
                                            "
                                        >
                                            {card.value}
                                        </h2>

                                        <p
                                            className="
                                                mt-3
                                                text-sm
                                                text-violet-400
                                            "
                                        >
                                            {card.subtitle}
                                        </p>

                                    </div>

                                    <div
                                        className="
                                            rounded-2xl
                                            bg-violet-600/10
                                            p-4
                                            transition-all
                                            duration-300
                                            group-hover:bg-violet-600/20
                                            group-hover:scale-110
                                        "
                                    >

                                        <Icon

                                            size={26}

                                            className="text-violet-400"

                                        />

                                    </div>

                                </div>

                            </motion.div>

                        );

                    })

                }

            </div>

        </motion.section>

    );

}

export default KPIGrid;