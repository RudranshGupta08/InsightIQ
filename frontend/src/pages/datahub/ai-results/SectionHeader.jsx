import { motion } from "framer-motion";

function SectionHeader({

    title,

    description,

    badge,

}) {

    return (

        <motion.div

            initial={{

                opacity: 0,

                y: 10,

            }}

            animate={{

                opacity: 1,

                y: 0,

            }}

            transition={{

                duration: .35,

            }}

            className="
                mb-6
                flex
                flex-col
                gap-4
                md:flex-row
                md:items-center
                md:justify-between
            "

        >

            <div>

                <h2
                    className="
                        text-2xl
                        font-bold
                        tracking-tight
                        text-[var(--text)]
                    "
                >

                    {title}

                </h2>

                {

                    description && (

                        <p
                            className="
                                mt-2
                                max-w-3xl
                                text-sm
                                leading-6
                                text-[var(--muted)]
                            "
                        >

                            {description}

                        </p>

                    )

                }

            </div>

            {

                badge && (

                    <div
                        className="
                            inline-flex
                            items-center
                            rounded-full
                            border
                            border-violet-500/20
                            bg-violet-500/10
                            px-4
                            py-2
                            text-sm
                            font-medium
                            text-violet-300
                        "
                    >

                        {badge}

                    </div>

                )

            }

        </motion.div>

    );

}

export default SectionHeader;