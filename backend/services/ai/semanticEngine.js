const dictionary = require("./ontology");
const SimilarityMatcher = require("../learning/utils/SimilarityMatcher");

function semanticEngine(headers = []) {

    if (!Array.isArray(headers)) {
        return [];
    }

    return headers.map(header => {

        let bestMatch = {
            field: "unknown",
            score: 0,
            keyword: null,
            algorithm: "None"
        };

        Object.entries(dictionary).forEach(([field, words]) => {

            const result = SimilarityMatcher.compareMultiple(
                header,
                words
            );

            if (result.score > bestMatch.score) {

                bestMatch = {
                    field,
                    score: result.score,
                    keyword: result.keyword,
                    algorithm: result.algorithm
                };

            }

        });

        return {

            original: header,

            normalized: SimilarityMatcher.normalize(header),

            mappedTo: bestMatch.field,

            confidence: {

                score: bestMatch.score,

                level:
                    bestMatch.score >= 95
                        ? "Very High"
                        : bestMatch.score >= 90
                        ? "High"
                        : bestMatch.score >= 75
                        ? "Medium"
                        : bestMatch.score >= 60
                        ? "Low"
                        : "Unknown"

            },

            entity: {

                category: bestMatch.field,

                module: "Unknown",

                dataType: "unknown"

            },

            reasoning: {

                matchedKeyword: bestMatch.keyword,

                algorithm: bestMatch.algorithm

            }

        };

    });

}

module.exports = semanticEngine;