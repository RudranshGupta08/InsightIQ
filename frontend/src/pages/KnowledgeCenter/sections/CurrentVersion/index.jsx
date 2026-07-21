import { motion } from "framer-motion";

import WorkflowSection from "./WorkflowSection";
import ModulesSection from "./ModulesSection";
import DashboardSection from "./DashboardSection";
import ExecutiveSection from "./ExecutiveSection";
import RecommendationSection from "./RecommendationSection";
import PredictionSection from "./PredictionSection";
import MappingSection from "./MappingSection";
import ScreenshotGallery from "./ScreenshotGallery";
import BestPracticesSection from "./BestPracticesSection";
import SummarySection from "./SummarySection";

function CurrentVersion() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <WorkflowSection />

            <ModulesSection />

            <DashboardSection />

            <ExecutiveSection />

            <RecommendationSection />

            <PredictionSection />

            <MappingSection />

            <ScreenshotGallery />

            <BestPracticesSection />

            <SummarySection />
        </motion.div>
    );
}

export default CurrentVersion;