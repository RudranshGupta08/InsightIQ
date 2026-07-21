import { motion } from "framer-motion";

import {
    ArrowRight,
    Brain,
    BadgeCheck,
} from "lucide-react";

import SectionHeader from "./SectionHeader";

function BusinessFieldIntelligence({

    mappings = [],

}) {

    if (!mappings || mappings.length === 0) {

        return (

            <motion.section

                initial={{ opacity: 0 }}

                animate={{ opacity: 1 }}

            >

                <SectionHeader

                    title="Business Field Intelligence"

                    description="InsightIQ could not identify any business fields from the uploaded dataset."

                />

                <div
                    className="
                        rounded-3xl
                        border
                        border-[var(--border)]
                        bg-[var(--card)]
                        p-12
                        text-center
                    "
                >

                    <Brain
                        size={52}
                        className="mx-auto text-violet-400"
                    />

                    <h3 className="mt-6 text-xl font-semibold">

                        No Business Fields Detected

                    </h3>

                    <p className="mt-3 text-[var(--muted)]">

                        Try uploading another dataset.

                    </p>

                </div>

            </motion.section>

        );

    }

    return (

        <motion.section

            initial={{ opacity: 0 }}

            animate={{ opacity: 1 }}

        >

            <SectionHeader

                title="Business Field Intelligence"

                description="InsightIQ identified and classified business entities from your uploaded dataset."

                badge={`${mappings.length} Fields Detected`}

            />

            <div className="space-y-5">

                {

                    mappings.map(

                        (

                            field,

                            index

                        ) => (

                            <motion.div

                                key={index}

                                initial={{

                                    opacity: 0,

                                    y: 15,

                                }}

                                animate={{

                                    opacity: 1,

                                    y: 0,

                                }}

                                transition={{

                                    delay:
                                        index * .06,

                                }}

                                whileHover={{

                                    y: -3,

                                }}

                                className="

                                    group

                                    rounded-3xl

                                    border

                                    border-[var(--border)]

                                    bg-[var(--card)]

                                    p-6

                                    transition-all

                                    duration-300

                                    hover:border-violet-500/30

                                    hover:shadow-xl

                                    hover:shadow-violet-500/10

                                "

                            >

                                <div

                                    className="

                                        flex

                                        flex-col

                                        gap-6

                                        lg:flex-row

                                        lg:items-center

                                        lg:justify-between

                                    "

                                >

                                    {/* Original */}

                                    <div className="flex-1">

                                        <p className="text-xs uppercase tracking-widest text-zinc-500">

                                            Original Field

                                        </p>

                                        <h3 className="mt-3 text-lg font-semibold">

                                            {field.original || "-"}

                                        </h3>

                                    </div>

                                    {/* Arrow */}

                                    <div className="flex justify-center">

                                        <div

                                            className="

                                                rounded-full

                                                bg-violet-600/10

                                                p-3

                                            "

                                        >

                                            <ArrowRight

                                                className="text-violet-400"

                                                size={22}

                                            />

                                        </div>

                                    </div>

                                    {/* AI Mapping */}

                                    <div className="flex-1">

                                        <p className="text-xs uppercase tracking-widest text-zinc-500">

                                            AI Classification

                                        </p>

                                        <h3 className="mt-3 text-lg font-semibold text-violet-300">

                                            {

                                                field.mappedTo ||

                                                field.field ||

                                                "Unknown"

                                            }

                                        </h3>

                                    </div>

                                    {/* Confidence */}

                                    <div

                                        className="

                                            flex

                                            gap-4

                                            flex-wrap

                                        "

                                    >

                                        <div

                                            className="

                                                rounded-2xl

                                                bg-violet-600/10

                                                px-5

                                                py-3

                                            "

                                        >

                                            <p className="text-xs text-zinc-500">

                                                Confidence

                                            </p>

                                            <h4 className="mt-2 text-lg font-bold text-violet-300">

                                                {

                                                    field.confidence ||

                                                    95

                                                }%

                                            </h4>

                                        </div>

                                        <div

                                            className="

                                                rounded-2xl

                                                border

                                                border-emerald-500/20

                                                bg-emerald-500/10

                                                px-5

                                                py-3

                                            "

                                        >

                                            <div className="flex items-center gap-2">

                                                <BadgeCheck

                                                    size={18}

                                                    className="text-emerald-400"

                                                />

                                                <span className="text-sm text-emerald-300">

                                                    Verified

                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>

                            </motion.div>

                        )

                    )

                }

            </div>

        </motion.section>

    );

}

export default BusinessFieldIntelligence;