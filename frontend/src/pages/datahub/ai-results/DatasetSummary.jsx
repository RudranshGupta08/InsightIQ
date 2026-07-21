import { motion } from "framer-motion";

import {

    FileSpreadsheet,

    Database,

    Table2,

    Cpu,

    CalendarDays,

    CheckCircle2,

} from "lucide-react";

import SectionHeader from "./SectionHeader";

function DatasetSummary({

    fileName,

    metadata = {},

}) {

    const info = [

        {

            label: "Business Records",

            value: metadata.totalRows || 0,

            icon: Database,

        },

        {

            label: "Detected Fields",

            value: metadata.totalColumns || 0,

            icon: Table2,

        },

        {

            label: "File Type",

            value: (

                metadata.fileType ||

                "Unknown"

            ).toUpperCase(),

            icon: FileSpreadsheet,

        },

        {

            label: "Parser",

            value:

                metadata.parser ||

                "InsightIQ",

            icon: Cpu,

        },

        {

            label: "Processed At",

            value: metadata.parsedAt

                ?

                new Date(

                    metadata.parsedAt

                ).toLocaleString()

                :

                "-",

            icon: CalendarDays,

        },

    ];

    return (

        <motion.section

            initial={{

                opacity: 0,

                y: 20,

            }}

            animate={{

                opacity: 1,

                y: 0,

            }}

            transition={{

                delay: .15,

            }}

        >

            <SectionHeader

                title="Dataset Summary"

                description="Overview of the uploaded dataset processed by the InsightIQ Import Engine."

                badge="Verified Dataset"

            />

            <div

                className="

                    rounded-3xl

                    border

                    border-[var(--border)]

                    bg-[var(--card)]

                    overflow-hidden

                "

            >

                {/* Header */}

                <div

                    className="

                        flex

                        flex-col

                        lg:flex-row

                        lg:items-center

                        lg:justify-between

                        gap-6

                        border-b

                        border-[var(--border)]

                        p-8

                    "

                >

                    <div

                        className="

                            flex

                            items-center

                            gap-5

                        "

                    >

                        <div

                            className="

                                rounded-3xl

                                bg-violet-600/10

                                p-5

                            "

                        >

                            <FileSpreadsheet

                                size={34}

                                className="text-violet-400"

                            />

                        </div>

                        <div>

                            <p

                                className="

                                    text-sm

                                    text-[var(--muted)]

                                "

                            >

                                Uploaded Dataset

                            </p>

                            <h2

                                className="

                                    mt-2

                                    break-all

                                    text-2xl

                                    font-bold

                                "

                            >

                                {fileName}

                            </h2>

                        </div>

                    </div>

                    <div

                        className="

                            inline-flex

                            items-center

                            gap-3

                            rounded-full

                            border

                            border-emerald-500/20

                            bg-emerald-500/10

                            px-5

                            py-3

                        "

                    >

                        <CheckCircle2

                            size={18}

                            className="text-emerald-400"

                        />

                        <span

                            className="

                                text-sm

                                font-medium

                                text-emerald-300

                            "

                        >

                            Successfully Imported

                        </span>

                    </div>

                </div>

                {/* Information Grid */}

                <div

                    className="

                        grid

                        gap-px

                        bg-[var(--border)]

                        md:grid-cols-2

                        xl:grid-cols-3

                    "

                >

                    {

                        info.map(

                            (

                                item,

                                index

                            ) => {

                                const Icon =

                                    item.icon;

                                return (

                                    <motion.div

                                        key={item.label}

                                        initial={{

                                            opacity: 0,

                                            y: 10,

                                        }}

                                        animate={{

                                            opacity: 1,

                                            y: 0,

                                        }}

                                        transition={{

                                            delay:

                                                index * .08,

                                        }}

                                        className="

                                            bg-[var(--card)]

                                            p-6

                                            transition-all

                                            duration-300

                                            hover:bg-white/[0.02]

                                        "

                                    >

                                        <div

                                            className="

                                                flex

                                                items-center

                                                gap-3

                                            "

                                        >

                                            <div

                                                className="

                                                    rounded-xl

                                                    bg-violet-600/10

                                                    p-3

                                                "

                                            >

                                                <Icon

                                                    size={20}

                                                    className="text-violet-400"

                                                />

                                            </div>

                                            <p

                                                className="

                                                    text-sm

                                                    text-[var(--muted)]

                                                "

                                            >

                                                {item.label}

                                            </p>

                                        </div>

                                        <h3

                                            className="

                                                mt-5

                                                break-all

                                                text-xl

                                                font-semibold

                                            "

                                        >

                                            {item.value}

                                        </h3>

                                    </motion.div>

                                );

                            }

                        )

                    }

                </div>

            </div>

        </motion.section>

    );

}

export default DatasetSummary;