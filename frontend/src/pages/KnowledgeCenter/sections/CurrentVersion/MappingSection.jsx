import {
    BrainCircuit,
    Table2,
    Database,
    Tags,
    CheckCircle2,
    ArrowRight
} from "lucide-react";

const mappingFlow = [
    {
        icon: Table2,
        title: "Dataset Upload",
        description:
            "Users upload Excel or CSV datasets containing business information."
    },
    {
        icon: Tags,
        title: "Column Identification",
        description:
            "InsightIQ detects column names, data types and relationships between fields."
    },
    {
        icon: BrainCircuit,
        title: "Semantic AI Mapping",
        description:
            "AI understands business meaning by matching columns with business entities such as Revenue, Customer, Expense and Region."
    },
    {
        icon: Database,
        title: "Business Intelligence Ready",
        description:
            "Mapped fields are forwarded to the analytics engine for KPI generation, dashboards and recommendations."
    }
];

const examples = [
    {
        uploaded: "Sales_Amount",
        mapped: "Revenue",
        module: "Financial Analytics"
    },
    {
        uploaded: "Cust_Name",
        mapped: "Customer",
        module: "Customer Intelligence"
    },
    {
        uploaded: "Invoice_Date",
        mapped: "Date",
        module: "Trend Analysis"
    },
    {
        uploaded: "Region_Name",
        mapped: "Region",
        module: "Geographical Analytics"
    },
    {
        uploaded: "Product_Category",
        mapped: "Product",
        module: "Sales Analytics"
    },
    {
        uploaded: "Operating_Cost",
        mapped: "Expense",
        module: "Profitability Analysis"
    }
];

const benefits = [
    "No manual column mapping required",
    "Automatically detects business terminology",
    "Supports multiple naming conventions",
    "Reduces data preparation time",
    "Improves AI confidence",
    "Produces consistent business intelligence"
];

function MappingSection() {
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
                    AI Field Intelligence
                </span>

                <h2 className="mt-4 text-3xl font-bold">
                    Intelligent Business Field Mapping
                </h2>

                <p
                    className="
                        mt-4
                        leading-7
                        text-[var(--muted)]
                    "
                >
                    InsightIQ automatically understands uploaded datasets by
                    identifying business entities and mapping them to
                    standardized business concepts. This removes the need for
                    manual configuration before analysis.
                </p>

            </div>

            {/* Mapping Flow */}

            <div
                className="
                    mt-10
                    grid
                    gap-6
                    xl:grid-cols-4
                "
            >
                {mappingFlow.map((step, index) => {

                    const Icon = step.icon;

                    return (
                        <div
                            key={step.title}
                            className="
                                relative
                                rounded-2xl
                                border
                                border-[var(--border)]
                                bg-black/20
                                p-6
                            "
                        >
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

                            <h3 className="mt-5 font-semibold">
                                {step.title}
                            </h3>

                            <p
                                className="
                                    mt-3
                                    text-sm
                                    leading-6
                                    text-[var(--muted)]
                                "
                            >
                                {step.description}
                            </p>

                            {index !== mappingFlow.length - 1 && (
                                <ArrowRight
                                    size={18}
                                    className="
                                        absolute
                                        -right-3
                                        top-10
                                        hidden
                                        xl:block
                                        text-violet-400
                                    "
                                />
                            )}
                        </div>
                    );

                })}
            </div>

            {/* Mapping Examples */}

            <div className="mt-12">

                <h3 className="text-xl font-semibold">
                    Example Field Mapping
                </h3>

                <div
                    className="
                        mt-6
                        overflow-hidden
                        rounded-2xl
                        border
                        border-[var(--border)]
                    "
                >

                    <table className="w-full">

                        <thead className="bg-white/5">

                            <tr>

                                <th className="px-6 py-4 text-left">
                                    Uploaded Column
                                </th>

                                <th className="px-6 py-4 text-left">
                                    AI Interpretation
                                </th>

                                <th className="px-6 py-4 text-left">
                                    Used By
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {examples.map((item) => (

                                <tr
                                    key={item.uploaded}
                                    className="border-t border-[var(--border)]"
                                >

                                    <td className="px-6 py-4 text-[var(--muted)]">
                                        {item.uploaded}
                                    </td>

                                    <td className="px-6 py-4 font-medium">
                                        {item.mapped}
                                    </td>

                                    <td className="px-6 py-4 text-[var(--muted)]">
                                        {item.module}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

            {/* Benefits */}

            <div
                className="
                    mt-10
                    rounded-2xl
                    border
                    border-[var(--border)]
                    bg-black/20
                    p-6
                "
            >

                <h3 className="text-lg font-semibold">
                    Benefits of AI Mapping
                </h3>

                <div
                    className="
                        mt-6
                        grid
                        gap-4
                        md:grid-cols-2
                    "
                >

                    {benefits.map((benefit) => (

                        <div
                            key={benefit}
                            className="
                                flex
                                items-center
                                gap-3
                            "
                        >

                            <CheckCircle2
                                size={18}
                                className="text-violet-400"
                            />

                            <span className="text-[var(--muted)]">
                                {benefit}
                            </span>

                        </div>

                    ))}

                </div>

            </div>

        </section>
    );
}

export default MappingSection;