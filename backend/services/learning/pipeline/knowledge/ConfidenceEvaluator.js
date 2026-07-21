const ConfidenceCalculator = require("../../calculators/ConfidenceCalculator");
const LearningConstants = require("../../constants/LearningConstants");

class ConfidenceEvaluator {

    async evaluate(context) {

        context.reasoning.push({

            stage: "Confidence Evaluation",

            input: context.candidates.length,

            output: null,

            decision: "Evaluating mapping confidence.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        for (const candidate of context.candidates) {

            candidate.matches =

                candidate.matches.map(match => {

                    const confidence =

                        ConfidenceCalculator.calculate({

                            semantic:

                                match.similarity,

                            workspace:

                                this.getWorkspaceConfidence(

                                    context,

                                    match

                                ),

                            feedback:

                                this.getFeedbackConfidence(

                                    context,

                                    match

                                ),

                            pattern:

                                this.getPatternConfidence(

                                    context,

                                    match

                                )

                        });

                    return {

                        ...match,

                        confidence

                    };

                });

        }

        context.reasoning.push({

            stage: "Confidence Evaluation",

            input: context.candidates.length,

            output: context.candidates.length,

            decision: "Confidence evaluation completed.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return context;

    }

    getWorkspaceConfidence(

        context,

        match

    ) {

        return 0;

    }

    getFeedbackConfidence(

        context,

        match

    ) {

        return 0;

    }

    getPatternConfidence(

        context,

        match

    ) {

        return 0;

    }

}

module.exports = new ConfidenceEvaluator();