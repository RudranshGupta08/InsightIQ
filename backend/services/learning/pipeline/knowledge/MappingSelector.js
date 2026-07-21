const LearningConstants = require("../../constants/LearningConstants");

class MappingSelector {

    async select(context) {

        context.reasoning.push({

            stage: "Mapping Selection",

            input: context.candidates.length,

            output: null,

            decision: "Selecting the best mapping candidate.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        const mappings = [];

        for (const candidate of context.candidates) {

            if (

                !candidate.matches ||

                candidate.matches.length === 0

            ) {

                mappings.push({

                    original:

                        candidate.header,

                    normalized:

                        candidate.normalized,

                    mappedTo:

                        LearningConstants.UNKNOWN_FIELD ||

                        "Unknown",

                    confidence: null,

                    alternatives: []

                });

                continue;

            }

            const sortedMatches = [...candidate.matches].sort(
                (a, b) =>
                    (b.confidence?.score || 0) -
                    (a.confidence?.score || 0)
            );

            const bestMatch =

                sortedMatches[0];

            mappings.push({

                original:

                    candidate.header,

                normalized:

                    candidate.normalized,

                mappedTo:

                    bestMatch.field,

                confidence:
                    bestMatch.confidence?.score || 95,

                semantic:

                    candidate.semantic,

                alternatives:

                    sortedMatches.slice(1)

            });

        }

        context.mappings = mappings;

        context.reasoning.push({

            stage: "Mapping Selection",

            input: context.candidates.length,

            output: mappings.length,

            decision: "Best mappings selected successfully.",

            confidence: null,

            duration: null,

            timestamp: new Date()

        });

        return context;

    }

}

module.exports = new MappingSelector();