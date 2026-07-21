import {
    Camera,
    Monitor,
    BarChart3,
    Brain,
    FileText,
    ShieldCheck,
    TrendingUp,
    Upload
} from "lucide-react";

const screenshots = [
    {
        title: "Dashboard",
        icon: Monitor,
        description:
            "Overview of the Executive Dashboard showing KPIs, business health and analytics."
    },
    {
        title: "Dataset Upload",
        icon: Upload,
        description:
            "Import Excel and CSV datasets before analysis."
    },
    {
        title: "Business Analytics",
        icon: BarChart3,
        description:
            "Interactive charts, KPIs and business intelligence visualizations."
    },
    {
        title: "Executive Summary",
        icon: FileText,
        description:
            "AI-generated executive summary for business decision makers."
    },
    {
        title: "Business Health",
        icon: ShieldCheck,
        description:
            "Overall business health score and performance indicators."
    },
    {
        title: "AI Recommendations",
        icon: Brain,
        description:
            "Business recommendations generated from AI analysis."
    },
    {
        title: "Trend Analysis",
        icon: TrendingUp,
        description:
            "Historical trends, seasonal analysis and growth patterns."
    },
    {
        title: "Prediction Engine",
        icon: Brain,
        description:
            "Forecasting and prediction dashboard with AI confidence."
    }
];

function ScreenshotGallery() {
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
                    Application Tour
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Screenshot Gallery
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    This gallery provides a visual walkthrough of InsightIQ.
                    Replace each placeholder with screenshots captured from
                    your production deployment to create a polished user guide.
                </p>

            </div>

            {/* Screenshot Grid */}

            <div
                className="
                    mt-10
                    grid
                    gap-8
                    md:grid-cols-2
                "
            >

                {screenshots.map((item) => {

                    const Icon = item.icon;

                    return (

                        <div
                            key={item.title}
                            className="
                                overflow-hidden
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-black/20
                            "
                        >

                            {/* Placeholder */}

                            <div
                                className="
                                    flex
                                    h-64
                                    flex-col
                                    items-center
                                    justify-center
                                    border-b
                                    border-[var(--border)]
                                    bg-gradient-to-br
                                    from-violet-600/5
                                    to-transparent
                                "
                            >

                                <Camera
                                    size={46}
                                    className="text-violet-400"
                                />

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        text-[var(--muted)]
                                    "
                                >
                                    Replace with Screenshot
                                </p>

                            </div>

                            {/* Details */}

                            <div className="p-6">

                                <div className="flex items-center gap-3">

                                    <Icon
                                        size={22}
                                        className="text-violet-400"
                                    />

                                    <h3 className="font-semibold">
                                        {item.title}
                                    </h3>

                                </div>

                                <p
                                    className="
                                        mt-4
                                        text-sm
                                        leading-6
                                        text-[var(--muted)]
                                    "
                                >
                                    {item.description}
                                </p>

                            </div>

                        </div>

                    );

                })}

            </div>

            {/* Screenshot Guidelines */}

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

                <h3 className="text-lg font-semibold">
                    Screenshot Guidelines
                </h3>

                <ul
                    className="
                        mt-5
                        space-y-3
                        text-[var(--muted)]
                    "
                >

                    <li>• Capture screenshots from the production version of InsightIQ.</li>

                    <li>• Use high-resolution images for better readability.</li>

                    <li>• Avoid displaying sensitive business information.</li>

                    <li>• Keep a consistent browser size and zoom level.</li>

                    <li>• Update screenshots whenever major UI changes are released.</li>

                </ul>

            </div>

        </section>
    );
}

export default ScreenshotGallery;