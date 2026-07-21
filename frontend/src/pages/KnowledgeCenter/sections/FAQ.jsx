import { useState } from "react";
import {
    HelpCircle,
    ChevronDown,
    ChevronUp,
    Database,
    Brain,
    ShieldCheck
} from "lucide-react";

const faqs = [
    {
        question: "What is InsightIQ?",
        answer:
            "InsightIQ is an AI-powered Business Intelligence platform that transforms structured business datasets into dashboards, executive summaries, KPIs, recommendations and actionable insights."
    },
    {
        question: "Which file formats are supported?",
        answer:
            "InsightIQ currently supports Microsoft Excel (.xlsx) and CSV datasets. Future versions may include additional business data sources."
    },
    {
        question: "Does InsightIQ modify my uploaded data?",
        answer:
            "No. Uploaded datasets remain unchanged. InsightIQ analyzes the data and generates business intelligence without altering the original file."
    },
    {
        question: "How does AI understand my dataset?",
        answer:
            "The AI engine automatically identifies column names, data types and business relationships to map your dataset into standardized business entities before analysis."
    },
    {
        question: "Why are predictions unavailable for some datasets?",
        answer:
            "Predictions require sufficient historical information. If the uploaded dataset does not contain enough historical records, forecasting is intentionally disabled to avoid unreliable results."
    },
    {
        question: "Can AI recommendations replace business decisions?",
        answer:
            "No. AI recommendations are intended to support decision-making. Business owners and managers should always consider operational knowledge and market conditions before implementing strategic changes."
    },
    {
        question: "Is my business data secure?",
        answer:
            "InsightIQ is designed with data privacy in mind. Access to uploaded datasets should be restricted through proper authentication and authorization mechanisms implemented by the deployment environment."
    },
    {
        question: "Which industries can use InsightIQ?",
        answer:
            "The platform is designed for a wide range of industries including retail, healthcare, manufacturing, finance, education, logistics and service-based organizations."
    },
    {
        question: "Can multiple datasets be compared?",
        answer:
            "Current Version 1.0 focuses on analyzing one dataset at a time. Cross-dataset comparison is being evaluated for future releases."
    },
    {
        question: "How often should I upload new data?",
        answer:
            "For the most accurate insights, upload updated datasets regularly so dashboards, KPIs and AI-generated recommendations reflect the latest business performance."
    }
];

function FAQItem({ item, isOpen, onToggle }) {
    return (
        <div
            className="
                rounded-2xl
                border
                border-[var(--border)]
                bg-black/20
                overflow-hidden
            "
        >
            <button
                onClick={onToggle}
                className="
                    flex
                    w-full
                    items-center
                    justify-between
                    p-6
                    text-left
                    transition
                    hover:bg-white/5
                "
            >
                <span className="font-semibold">
                    {item.question}
                </span>

                {isOpen ? (
                    <ChevronUp className="text-violet-400" />
                ) : (
                    <ChevronDown className="text-violet-400" />
                )}
            </button>

            {isOpen && (
                <div
                    className="
                        border-t
                        border-[var(--border)]
                        px-6
                        py-5
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    {item.answer}
                </div>
            )}
        </div>
    );
}

function FAQ() {
    const [openIndex, setOpenIndex] = useState(0);

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

                    <HelpCircle
                        size={38}
                        className="text-violet-400"
                    />

                    <div>

                        <h1 className="text-3xl font-bold">
                            Frequently Asked Questions
                        </h1>

                        <p className="mt-2 text-[var(--muted)]">
                            Find answers to the most common questions about
                            InsightIQ, its capabilities and best practices.
                        </p>

                    </div>

                </div>

            </div>

            {/* FAQ */}

            <div className="space-y-4">

                {faqs.map((item, index) => (

                    <FAQItem
                        key={item.question}
                        item={item}
                        isOpen={openIndex === index}
                        onToggle={() =>
                            setOpenIndex(
                                openIndex === index ? -1 : index
                            )
                        }
                    />

                ))}

            </div>

            {/* Still Need Help */}

            <div
                className="
                    rounded-3xl
                    border
                    border-violet-500/20
                    bg-violet-600/5
                    p-8
                "
            >

                <div className="flex items-center gap-3">

                    <ShieldCheck
                        size={24}
                        className="text-violet-400"
                    />

                    <h2 className="text-2xl font-semibold">
                        Still Need Help?
                    </h2>

                </div>

                <p
                    className="
                        mt-5
                        leading-8
                        text-[var(--muted)]
                    "
                >
                    If your question isn't covered here, review the
                    Troubleshooting section or consult your system
                    administrator for deployment-specific guidance.
                </p>

                <div
                    className="
                        mt-8
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    <div
                        className="
                            rounded-xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <Database
                            className="text-violet-400"
                            size={24}
                        />

                        <h3 className="mt-4 font-semibold">
                            Dataset Issues
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            Check formatting, missing values and supported
                            file types before uploading.
                        </p>

                    </div>

                    <div
                        className="
                            rounded-xl
                            border
                            border-[var(--border)]
                            bg-black/20
                            p-5
                        "
                    >

                        <Brain
                            className="text-violet-400"
                            size={24}
                        />

                        <h3 className="mt-4 font-semibold">
                            AI Results
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                            Better data quality generally leads to more
                            reliable insights, recommendations and
                            predictions.
                        </p>

                    </div>

                </div>

            </div>

        </section>
    );
}

export default FAQ;