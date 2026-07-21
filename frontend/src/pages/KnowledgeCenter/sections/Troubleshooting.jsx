import {
    Wrench,
    AlertTriangle,
    FileSpreadsheet,
    Brain,
    ShieldAlert,
    RefreshCw,
    CheckCircle2
} from "lucide-react";

const issues = [
    {
        icon: FileSpreadsheet,
        problem: "Dataset upload failed",
        cause:
            "The uploaded file is corrupted, unsupported or incorrectly formatted.",
        solution:
            "Verify that the file is a valid .xlsx or .csv document, contains a single header row and does not include merged cells."
    },
    {
        icon: Brain,
        problem: "AI analysis could not be generated",
        cause:
            "The dataset contains insufficient or inconsistent information for analysis.",
        solution:
            "Check for missing values, invalid data types and incomplete business records before uploading again."
    },
    {
        icon: AlertTriangle,
        problem: "Predictions are unavailable",
        cause:
            "Historical data is insufficient for reliable forecasting.",
        solution:
            "Upload a dataset containing more historical records covering a longer business period."
    },
    {
        icon: ShieldAlert,
        problem: "Low AI confidence score",
        cause:
            "The dataset contains ambiguous columns, missing values or inconsistent formatting.",
        solution:
            "Use descriptive column names, remove duplicate records and ensure data consistency."
    },
    {
        icon: RefreshCw,
        problem: "Dashboard does not reflect recent data",
        cause:
            "The latest dataset has not been uploaded or processed.",
        solution:
            "Upload the newest business dataset and refresh the analysis."
    }
];

const tips = [
    "Always validate datasets before uploading.",
    "Use meaningful column names instead of abbreviations whenever possible.",
    "Keep historical business records for better trend analysis.",
    "Maintain consistent date and currency formats.",
    "Review AI confidence before acting on recommendations.",
    "Upload updated datasets regularly."
];

function Troubleshooting() {
    return (
        <section className="space-y-8">

            {/* Hero */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-gradient-to-br
                    from-violet-600/10
                    to-[var(--card)]
                    p-8
                "
            >
                <div className="flex items-center gap-4">

                    <Wrench
                        size={36}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            Troubleshooting
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Resolve common issues quickly with recommended
                            solutions and best practices.
                        </p>

                    </div>

                </div>

            </div>

            {/* Common Issues */}

            <div className="space-y-6">

                {issues.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.problem}
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

                                <h2 className="text-xl font-semibold">
                                    {item.problem}
                                </h2>

                            </div>

                            <div className="mt-6">

                                <h3 className="font-semibold">
                                    Possible Cause
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        leading-7
                                        text-[var(--muted)]
                                    "
                                >
                                    {item.cause}
                                </p>

                            </div>

                            <div className="mt-6">

                                <h3 className="font-semibold">
                                    Recommended Solution
                                </h3>

                                <p
                                    className="
                                        mt-2
                                        leading-7
                                        text-[var(--muted)]
                                    "
                                >
                                    {item.solution}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Quick Tips */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-8
                "
            >

                <h2 className="text-2xl font-semibold">
                    Prevention Tips
                </h2>

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    {tips.map((tip) => (

                        <div
                            key={tip}
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <CheckCircle2
                                size={18}
                                className="text-green-400"
                            />

                            <span className="text-[var(--muted)]">
                                {tip}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default Troubleshooting;