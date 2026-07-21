import { motion } from "framer-motion";

import { useImport } from "../../../context/ImportContext";

import AIHero from "./AIHero";
import KPIGrid from "./KPIGrid";
import DatasetSummary from "./DatasetSummary";
import BusinessFieldIntelligence from "./BusinessFieldIntelligence";
import ExecutiveInsights from "./ExecutiveInsights";

function AIResultsPanel() {

    const { preview } = useImport();

    if (
        !preview ||
        !preview.processedFiles ||
        preview.processedFiles.length === 0
    ) {
        return null;
    }

    const result = preview.processedFiles[0];

    if (!result.success) {

        return (

            <motion.div

                initial={{
                    opacity: 0,
                    y: 20,
                }}

                animate={{
                    opacity: 1,
                    y: 0,
                }}

                className="
                    mt-10
                    rounded-3xl
                    border
                    border-red-500/20
                    bg-red-500/5
                    p-8
                "

            >

                <h2
                    className="
                        text-2xl
                        font-bold
                        text-red-400
                    "
                >
                    AI Analysis Failed
                </h2>

                <p
                    className="
                        mt-3
                        text-sm
                        text-[var(--muted)]
                    "
                >
                    {result.error}
                </p>

            </motion.div>

        );

    }

    const analysis =
        result.aiAnalysis?.data || {};

    return (

        <motion.div

            initial={{
                opacity: 0,
            }}

            animate={{
                opacity: 1,
            }}

            transition={{
                duration: 0.5,
            }}

            className="
                mt-10
                space-y-10
            "

        >

            {/* ===================================== */}

            {/* Hero */}

            {/* ===================================== */}

            <AIHero

                fileName={result.fileName}

                metadata={
                    result.rawData?.metadata
                }

                analytics={
                    analysis.analytics
                }

            />

            {/* ===================================== */}

            {/* Business KPIs */}

            {/* ===================================== */}

            <KPIGrid

                analytics={
                    analysis.analytics
                }

            />

            {/* ===================================== */}

            {/* Dataset Summary */}

            {/* ===================================== */}

            <DatasetSummary

                fileName={result.fileName}

                metadata={
                    result.rawData?.metadata
                }

            />

            {/* ===================================== */}

            {/* Business Field Intelligence */}

            {/* ===================================== */}

            <BusinessFieldIntelligence

                mappings={
                    analysis.mappings || []
                }

            />

            {/* ===================================== */}

            {/* Executive Insights */}

            {/* ===================================== */}

            <ExecutiveInsights

                recommendations={
                    analysis.recommendations || []
                }

                prediction={
                    analysis.prediction || {}
                }

            />

        </motion.div>

    );

}

export default AIResultsPanel;