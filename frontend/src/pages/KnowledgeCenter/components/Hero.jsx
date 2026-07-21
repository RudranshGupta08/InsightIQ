import {
    BookOpen,
    Sparkles,
    CalendarDays,
    ShieldCheck
} from "lucide-react";

function Hero() {
    return (
        <section
            className="
                rounded-[32px]
                border
                border-[var(--border)]
                bg-gradient-to-r
                from-[#241533]
                via-[#141414]
                to-[#0c1a1d]
                px-8
                py-6
            "
        >
            <div
                className="
                    mx-auto
                    max-w-6xl
                    flex
                    flex-col
                    items-center
                    text-center
                "
            >
                {/* Icon */}

                <div
                    className="
                        flex
                        h-14
                        w-14
                        items-center
                        justify-center
                        rounded-2xl
                        border
                        border-violet-500/20
                        bg-violet-600/10
                    "
                >
                    <BookOpen
                        size={28}
                        className="text-violet-400"
                    />
                </div>

                {/* Title */}

                <h1
                    className="
                        mt-4
                        text-4xl
                        lg:text-5xl
                        font-bold
                        tracking-tight
                        text-white
                    "
                >
                    InsightIQ Knowledge Center
                </h1>

                {/* Subtitle */}

                <p
                    className="
                        mt-3
                        max-w-3xl
                        text-base
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    Complete documentation, release roadmap, business guides
                    and feature reference for InsightIQ Business Intelligence
                    Platform.
                </p>

                {/* Status Cards */}

                <div
                    className="
                        mt-6
                        flex
                        flex-wrap
                        justify-center
                        gap-4
                    "
                >
                    {/* Current */}

                    <div className="w-48 rounded-2xl border border-violet-500/20 bg-violet-600/10 p-4">
                        <BookOpen
                            size={18}
                            className="mb-2 text-violet-400"
                        />

                        <p className="text-xs text-violet-300">
                            CURRENT VERSION
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                            InsightIQ v1.0
                        </h3>
                    </div>

                    {/* Status */}

                    <div className="w-48 rounded-2xl border border-emerald-500/20 bg-emerald-600/10 p-4">
                        <ShieldCheck
                            size={18}
                            className="mb-2 text-emerald-400"
                        />

                        <p className="text-xs text-emerald-300">
                            STATUS
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                            Stable Release
                        </h3>
                    </div>

                    {/* Updated */}

                    <div className="w-48 rounded-2xl border border-cyan-500/20 bg-cyan-600/10 p-4">
                        <CalendarDays
                            size={18}
                            className="mb-2 text-cyan-400"
                        />

                        <p className="text-xs text-cyan-300">
                            LAST UPDATED
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                            July 2026
                        </h3>
                    </div>

                    {/* Next */}

                    <div className="w-48 rounded-2xl border border-orange-500/20 bg-orange-600/10 p-4">
                        <Sparkles
                            size={18}
                            className="mb-2 text-orange-400"
                        />

                        <p className="text-xs text-orange-300">
                            NEXT RELEASE
                        </p>

                        <h3 className="mt-1 text-xl font-bold">
                            Version 1.5
                        </h3>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default Hero;