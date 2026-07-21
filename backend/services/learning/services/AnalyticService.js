const LearningConstants = require("../constants/LearningConstants");

class AnalyticsService {

    build(context) {

        const analytics = context.analytics || {};

        return {

            success: true,

            generatedAt: new Date(),

            summary: {

                totalFields:

                    analytics.totalFields || 0,

                mappedFields:

                    analytics.mappedFields || 0,

                unmappedFields:

                    analytics.unmappedFields || 0,

                businessCoverage:

                    analytics.businessCoverage || 0,

                averageConfidence:

                    analytics.averageConfidence || 0,

                aiHealth:

                    analytics.aiHealth ||

                    "Unknown"

            },

            confidence: {

                high:

                    analytics.highConfidence || 0,

                medium:

                    analytics.mediumConfidence || 0,

                low:

                    analytics.lowConfidence || 0

            },

            unknownFields:

                analytics.unknownFields || [],

            detectedBusinessFields:

                analytics.detectedBusinessFields ||

                0

        };

    }

    getDashboardMetrics(context) {

        return this.build(context).summary;

    }

    getConfidenceMetrics(context) {

        return this.build(context).confidence;

    }

}

module.exports = new AnalyticsService();