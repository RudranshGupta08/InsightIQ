class RecommendationService {

    build(context) {

        return {

            success: true,

            generatedAt: new Date(),

            totalRecommendations:

                context.recommendations.length,

            recommendations:

                context.recommendations

        };

    }

    getHighPriority(context) {

        return context.recommendations.filter(

            recommendation =>

                recommendation.priority ===

                "High"

        );

    }

    getMediumPriority(context) {

        return context.recommendations.filter(

            recommendation =>

                recommendation.priority ===

                "Medium"

        );

    }

    getLowPriority(context) {

        return context.recommendations.filter(

            recommendation =>

                recommendation.priority ===

                "Low"

        );

    }

}

module.exports = new RecommendationService();