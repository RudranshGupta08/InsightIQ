const semanticEngine = require("./semanticEngine");
const patternEngine = require("./patternEngine");
const validationEngine = require("./validationEngine");
const confidenceEngine = require("./confidenceEngine");
const aiMapper = require("./aiMapper");

async function intelligencePipeline(normalizedData = {}) {

    // Semantic Analysis

    const semantic = semanticEngine(

        normalizedData.headers || []

    );

    // Pattern Recognition

    const pattern = patternEngine(

        normalizedData

    );

    // Dataset Validation

    const validation = validationEngine(

        normalizedData

    );

    // Confidence Calculation

    const confidence = confidenceEngine({

        semantic,

        patterns: pattern.patterns,

        validation

    });

    // Universal AI Mapping

    const mappedData = aiMapper({

        normalizedData,

        semantic,

        pattern,

        validation,

        confidence

    });

    return {

        success: true,

        semantic,

        pattern,

        validation,

        confidence,

        mappedData

    };

}

module.exports = intelligencePipeline;