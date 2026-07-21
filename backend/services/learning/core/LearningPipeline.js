const MappingValidator = require("../pipeline/validation/MappingValidator");

const KnowledgeCollector = require("../pipeline/knowledge/KnowledgeCollector");

const CandidateGenerator = require("../pipeline/knowledge/CandidateGenerator");

const ConfidenceEvaluator = require("../pipeline/knowledge/ConfidenceEvaluator");

const MappingSelector = require("../pipeline/knowledge/MappingSelector");

const AnalyticsBuilder = require("../pipeline/analytics/AnalyticsBuilder");

const RecommendationBuilder = require("../pipeline/analytics/RecommendationBuilder");

class LearningPipeline {

    async executeKnowledge(context) {

        await MappingValidator.validate(context);

        await KnowledgeCollector.collect(context);

        await CandidateGenerator.generate(context);

        await ConfidenceEvaluator.evaluate(context);

        await MappingSelector.select(context);

        return context;

    }

    async executeAnalytics(context) {

        await AnalyticsBuilder.build(context);

        await RecommendationBuilder.build(context);

        return context;

    }

}

module.exports = new LearningPipeline();