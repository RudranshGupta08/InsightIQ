const SimilarityMatcher = require("../../utils/SimilarityMatcher");
const LearningConstants = require("../../constants/LearningConstants");

class CandidateGenerator {

    async generate(context) {

        context.reasoning.push({
            stage: "Candidate Generation",
            input: context.classifications.length,
            output: null,
            decision: "Generating mapping candidates.",
            confidence: null,
            duration: null,
            timestamp: new Date()
        });

        const candidates = [];

        for (const classification of context.classifications) {

            const matches = [];

            for (const knowledge of context.knowledge) {

                const comparison = SimilarityMatcher.compare(
                    classification.normalized,
                    knowledge.normalized ||
                    knowledge.original ||
                    ""
                );

                if (!comparison.matched) {
                    continue;
                }

                matches.push({

                    field:
                        knowledge.field ||
                        knowledge.original ||
                        "Unknown",

                    original:
                        knowledge.original ||
                        knowledge.field ||
                        "",

                    similarity:
                        comparison.score,

                    algorithm:
                        comparison.algorithm,

                    confidence: {

                        score: Math.round(
                            comparison.score * 100
                        ),

                        level:
                            comparison.score >= 0.9
                                ? "High"
                                : comparison.score >= 0.7
                                ? "Medium"
                                : "Low"

                    }

                });

            } // ← closes knowledge loop

            matches.sort(
                (a, b) =>
                    b.similarity -
                    a.similarity
            );

            candidates.push({

                header:
                    classification.original,

                normalized:
                    classification.normalized,

                semantic:
                    classification.semantic,

                matches:
                    matches.slice(
                        0,
                        LearningConstants.AI.MAX_CANDIDATES
                    )

            });

        } // ← closes classification loop

        context.candidates = candidates;

        context.reasoning.push({

            stage: "Candidate Generation",

            input:
                context.classifications.length,

            output:
                candidates.length,

            decision:
                "Candidate generation completed.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return context;

    }

}

module.exports = new CandidateGenerator();