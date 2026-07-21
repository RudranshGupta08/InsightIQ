const LearningConstants = require("../constants/LearningConstants");

class FeedbackScoreCalculator {

    calculateAccuracy({

        accepted = 0,

        rejected = 0

    } = {}) {

        const total = accepted + rejected;

        if (!total) {

            return 0;

        }

        return Math.round(

            (accepted / total) * 100

        );

    }

    calculateLearningScore({

        accuracy = 0,

        feedbackCount = 0,

        confidence = 0

    } = {}) {

        const feedbackWeight =

            Math.min(

                feedbackCount,

                100

            );

        const score =

            (

                accuracy * 0.5 +

                confidence * 0.3 +

                feedbackWeight * 0.2

            );

        return Math.min(

            100,

            Math.round(score)

        );

    }

    calculateCorrectionRate({

        accepted = 0,

        rejected = 0

    } = {}) {

        const total = accepted + rejected;

        if (!total) {

            return 0;

        }

        return Math.round(

            (rejected / total) * 100

        );

    }

    calculateConfidence({

        learningScore = 0,

        accuracy = 0

    } = {}) {

        return Math.round(

            (

                learningScore +

                accuracy

            ) / 2

        );

    }

    shouldPromote(score) {

        return (

            score >=

            LearningConstants

                .LEARNING

                .PROMOTION_SCORE

        );

    }

    shouldReview(accuracy) {

        return (

            accuracy <

            LearningConstants

                .LEARNING

                .MIN_ACCURACY

        );

    }

    buildMetrics(memory = {}) {

        const accuracy =

            this.calculateAccuracy({

                accepted:

                    memory.acceptedCount,

                rejected:

                    memory.rejectedCount

            });

        const learningScore =

            this.calculateLearningScore({

                accuracy,

                feedbackCount:

                    memory.feedbackCount,

                confidence:

                    memory.confidence || 0

            });

        const correctionRate =

            this.calculateCorrectionRate({

                accepted:

                    memory.acceptedCount,

                rejected:

                    memory.rejectedCount

            });

        const confidence =

            this.calculateConfidence({

                learningScore,

                accuracy

            });

        return {

            accuracy,

            learningScore,

            correctionRate,

            confidence,

            promote:

                this.shouldPromote(

                    learningScore

                ),

            review:

                this.shouldReview(

                    accuracy

                )

        };

    }

}

module.exports = new FeedbackScoreCalculator();