const LearningConstants = require("../constants/LearningConstants");

class LearningScoreCalculator {

    calculate(data = {}) {

        const {

            imports = 0,

            knowledge = 0,

            vocabulary = 0,

            feedback = 0,

            predictions = 0,

            industry = 0

        } = data;

        const weights = {

            imports: 20,

            knowledge: 20,

            vocabulary: 20,

            feedback: 15,

            predictions: 15,

            industry: 10

        };

        const normalized = {

            imports: Math.min(imports, 100),

            knowledge: Math.min(knowledge, 100),

            vocabulary: Math.min(vocabulary, 100),

            feedback: Math.min(feedback, 100),

            predictions: Math.min(predictions, 100),

            industry: Math.min(industry, 100)

        };

        const score = Math.round(

            (

                normalized.imports * weights.imports +

                normalized.knowledge * weights.knowledge +

                normalized.vocabulary * weights.vocabulary +

                normalized.feedback * weights.feedback +

                normalized.predictions * weights.predictions +

                normalized.industry * weights.industry

            ) / 100

        );

        const level = this.getLevel(score);

        const breakdown = {

            imports:

                Math.round(

                    normalized.imports *

                    weights.imports /

                    100

                ),

            knowledge:

                Math.round(

                    normalized.knowledge *

                    weights.knowledge /

                    100

                ),

            vocabulary:

                Math.round(

                    normalized.vocabulary *

                    weights.vocabulary /

                    100

                ),

            feedback:

                Math.round(

                    normalized.feedback *

                    weights.feedback /

                    100

                ),

            predictions:

                Math.round(

                    normalized.predictions *

                    weights.predictions /

                    100

                ),

            industry:

                Math.round(

                    normalized.industry *

                    weights.industry /

                    100

                )

        };

        const recommendations = this.generateRecommendations(

            normalized

        );

        return {

            score,

            level,

            breakdown,

            recommendations,

            calculatedAt: new Date()

        };

    }

    evaluate(data = {}) {

        return this.calculate(data).score;

    }

    getLevel(score) {

        if (

            score >= 90

        ) {

            return "Expert";

        }

        if (

            score >= 75

        ) {

            return "Advanced";

        }

        if (

            score >= 50

        ) {

            return "Intermediate";

        }

        if (

            score >= 20

        ) {

            return "Beginner";

        }

        return "Learning";

    }

    generateRecommendations(data) {

        const recommendations = [];

        if (

            data.imports < 50

        ) {

            recommendations.push(

                "Import more historical business data."

            );

        }

        if (

            data.feedback < 50

        ) {

            recommendations.push(

                "Provide feedback on AI suggestions to improve learning."

            );

        }

        if (

            data.knowledge < 50

        ) {

            recommendations.push(

                "Allow AI to discover more business terminology."

            );

        }

        if (

            data.vocabulary < 50

        ) {

            recommendations.push(

                "Upload datasets with richer business vocabulary."

            );

        }

        if (

            data.predictions < 50

        ) {

            recommendations.push(

                "Use forecasting regularly so AI can improve prediction accuracy."

            );

        }

        if (

            data.industry < 50

        ) {

            recommendations.push(

                "Import more industry-specific data for better recommendations."

            );

        }

        if (

            recommendations.length === 0

        ) {

            recommendations.push(

                "Excellent learning progress. Continue uploading quality business data."

            );

        }

        return recommendations;

    }

}

module.exports = new LearningScoreCalculator();