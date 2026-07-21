function confidenceEngine({

    semantic = [],

    patterns = {},

    validation = {}

} = {}) {

    let headerConfidence = 0;

    let patternConfidence = 0;

    let validationConfidence = 100;

    // Header confidence

    if (semantic.length > 0) {

        const totalConfidence = semantic.reduce(

            (sum, item) => sum + (item.confidence || 0),

            0

        );

        headerConfidence =

            Math.round(

                totalConfidence /

                semantic.length

            );

    }

    // Pattern confidence

    const detectedPatterns = Object.entries(patterns)

        .filter(([key, value]) =>

            key.startsWith("has") &&

            value === true

        ).length;

    patternConfidence =

        Math.min(

            100,

            detectedPatterns * 15

        );

    // Validation confidence

    if (validation.warnings) {

        validationConfidence -=

            validation.warnings.length * 5;

    }

    if (validation.errors) {

        validationConfidence -=

            validation.errors.length * 15;

    }

    validationConfidence =

        Math.max(

            0,

            validationConfidence

        );

    // Overall confidence

    const overallConfidence =

        Math.round(

            (

                headerConfidence +

                patternConfidence +

                validationConfidence

            ) / 3

        );

    // Confidence level

    let level = "Low";

    if (overallConfidence >= 90) {

        level = "Excellent";

    }

    else if (overallConfidence >= 75) {

        level = "High";

    }

    else if (overallConfidence >= 60) {

        level = "Medium";

    }

    return {

        overallConfidence,

        level,

        headerConfidence,

        patternConfidence,

        validationConfidence

    };

}

module.exports = confidenceEngine;