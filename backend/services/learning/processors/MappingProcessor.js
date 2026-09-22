const BaseProcessor = require("../core/BaseProcessor");

const ProcessingContext = require("../core/ProcessingContext");

const LearningPipeline = require("../core/LearningPipeline");

const BusinessSchemaBuilder = require(
    "../utils/BusinessSchemaBuilder"
);

const DatasetMapper = require(

    "../utils/DatasetMapper"

);
const VocabularyBuilder = require("../utils/VocabularyBuilder");

const semanticEngine = require("../../ai/semanticEngine");
const QualityAnalyzer = require("../pipeline/analytics/analyzers/QualityAnalyzer");

class MappingProcessor extends BaseProcessor {

    constructor() {

        super("MappingProcessor");

    }

    async process(payload = {}) {

        return await this.execute(async () => {

            this.validateInput(payload);

            const context =

                ProcessingContext.createContext(

                    payload

                );

            this.prepareContext(

                context

            );

            await LearningPipeline.executeKnowledge(
                context
            );

            this.applyCanonicalMappings(context);

            if (
                !context.mappings ||
                context.mappings.length === 0
            ) {

                context.mappings =

                    context.classifications.map(

                        field => ({

                            original:
                                field.original,

                            mappedTo:
                                field.semantic?.mappedTo ||

                                field.normalized ||

                                field.original,

                            confidence:
                                field.semantic?.confidence?.score ||

                                95
                        })

                    );

            }

            context.dataset =
                DatasetMapper.build(
                    context.payload.rows || [],
                    context.mappings
                );

            context.businessSchema =
                BusinessSchemaBuilder.build(
                    context.dataset
                );

            context.quality = QualityAnalyzer.analyze(
                context.dataset,
                context.businessSchema,
                context.mappings,
                context.payload.headers
            );

            context.warnings.push(
                ...context.quality.warnings.map((warning) => warning.message)
            );

            await LearningPipeline.executeAnalytics(
                context
            );

            return this.buildSuccess({

                data: {

                    dataset:
                        context.dataset,

                    businessSchema:
                        context.businessSchema,

                    mappings:
                        context.mappings,

                    analytics:
                        context.analytics,

                    recommendations:
                        context.recommendations,

                    quality:
                        context.quality

                },

                metadata: {

                    totalHeaders:

                        context.preparedHeaders.length,

                    vocabularySize:

                        context.vocabulary.length,

                    processedMappings:

                        context.mappings?.length || 0

                },

                reasoning:

                    context.reasoning || [],

                warnings:

                    context.warnings || []

            });

        });

    }

    applyCanonicalMappings(context) {

        const canonicalMappings = new Map();

        context.preparedHeaders.forEach((header) => {
            const canonicalField = DatasetMapper.getCanonicalHeader(
                header.normalized
            );

            if (!canonicalField) return;

            canonicalMappings.set(header.original, {
                original: header.original,
                normalized: header.normalized,
                mappedTo: canonicalField,
                confidence: 100,
                semantic: {
                    original: header.original,
                    normalized: header.normalized,
                    mappedTo: canonicalField,
                    confidence: {
                        score: 100,
                        level: "Very High"
                    },
                    reasoning: {
                        matchedKeyword: header.original,
                        algorithm: "Canonical Header Match"
                    }
                },
                alternatives: []
            });
        });

        if (!canonicalMappings.size) return context;

        context.mappings = context.mappings.map((mapping) =>
            canonicalMappings.get(mapping.original) || mapping
        );

        return context;
    }

    validateInput(payload) {

        super.validate(payload);

        const {

            headers,

            workspaceId

        } = payload;

        if (!Array.isArray(headers)) {

            throw new Error(

                "Headers must be an array."

            );

        }

        if (

            headers.length === 0

        ) {

            throw new Error(

                "No headers found."

            );

        }

        if (

            !workspaceId

        ) {

            throw new Error(

                "Workspace ID is required."

            );

        }

        return true;

    }

    prepareContext(context) {

        context.preparedHeaders =

            this.prepareHeaders(

                context.payload.headers

            );

        context.vocabulary =

            this.buildVocabulary(

                context

            );

        context.classifications =

            this.classifyFields(

                context

            );

        return context;

    }

    prepareHeaders(headers = []) {

        return headers

            .map(header => ({

                original:

                    header,

                normalized:

                    VocabularyBuilder.normalize(

                        header

                    )

            }))

            .filter(

                header =>

                    header.normalized

            );

    }

    buildVocabulary(context) {

        context.reasoning.push({

            stage: "Vocabulary",

            input:

                context.preparedHeaders.length,

            output: null,

            decision:

                "Building business vocabulary.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        const vocabulary =

            VocabularyBuilder.build(

                context.preparedHeaders.map(

                    header =>

                        header.original

                )

            );

        context.reasoning.push({

            stage: "Vocabulary",

            input:

                context.preparedHeaders.length,

            output:

                vocabulary.length,

            decision:

                "Vocabulary successfully created.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return vocabulary;

    }

    classifyFields(context) {

        context.reasoning.push({

            stage: "Semantic Classification",

            input:

                context.preparedHeaders.length,

            output: null,

            decision:

                "Running semantic analysis.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        const classifications =

            context.preparedHeaders.map(

                header => {

                    const result =

                        semanticEngine([

                            header.original

                        ]);

                    const semantic =

                        result?.[0] || null;

                    return {

                        original:

                            header.original,

                        normalized:

                            header.normalized,

                        semantic

                    };

                }

            );

        context.reasoning.push({

            stage: "Semantic Classification",

            input:

                context.preparedHeaders.length,

            output:

                classifications.length,

            decision:

                "Semantic classification completed.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return classifications;

    }

}

module.exports = new MappingProcessor();