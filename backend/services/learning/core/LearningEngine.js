const MappingProcessor = require("../processors/MappingProcessor");
const PatternProcessor = require("../processors/PatternProcessor");
const PredictionProcessor = require("../processors/PredictionProcessor");
const FeedbackProcessor = require("../processors/FeedbackProcessor");

class LearningEngine {

    async processUpload(payload = {}) {

        const mapping = await MappingProcessor.process(payload);

        if (!mapping.success) {

            return mapping;

        }

        const dataset =
            mapping.data.dataset || [];

        const businessSchema =
            mapping.data.businessSchema || {};

        const analytics =
            mapping.data.analytics || {};

        const recommendations =
            mapping.data.recommendations || {};

        const mappings =
            mapping.data.mappings || [];

        const pattern =
            await PatternProcessor.process({

                dataset

            });

        const prediction =
            await PredictionProcessor.process({

                dataset

            });

        return {

            success: true,

            data: {

                dataset,

                businessSchema,

                mappings,

                analytics,

                recommendations,

                prediction,

                pattern

            }

        };

    }

    async processFeedback(payload = {}) {

        return await FeedbackProcessor.process(payload);

    }

}

module.exports = new LearningEngine();