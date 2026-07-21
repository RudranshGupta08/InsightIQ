const LearningConstants = require("../constants/LearningConstants");

class ConfidenceCalculator {

    calculate(data = {}) {

        const semantic =
            typeof data.semantic === "object"
                ? data.semantic.score || 0
                : data.semantic || 0;

        const workspace = data.workspace || 0;
        const industry = data.industry || 0;
        const feedback = data.feedback || 0;
        const pattern = data.pattern || 0;

        let score = semantic;

        // Small bonuses only when real signals exist
        if (workspace > 0) score += 2;
        if (industry > 0) score += 1;
        if (feedback > 0) score += 1;
        if (pattern > 0) score += 1;

        score = Math.min(100, Math.round(score));

        return {

            score,

            level: this.getLevel(score),

            factors: {

                semantic,

                workspace,

                industry,

                feedback,

                pattern

            },

            reasons: this.generateReasons({

                semantic,

                workspace,

                industry,

                feedback,

                pattern

            }),

            calculatedAt: new Date()

        };

    }

    evaluate(data = {}) {

        return this.calculate(data).score;

    }

    getLevel(score) {

        if (score >= 98) return "Perfect";
        if (score >= 95) return "Very High";
        if (score >= 85) return "High";
        if (score >= 70) return "Medium";
        return "Low";

    }

    generateReasons(factors) {

        const reasons = [];

        if (factors.semantic >= 98)
            reasons.push("Exact semantic match detected.");

        else if (factors.semantic >= 90)
            reasons.push("Strong semantic similarity.");

        else if (factors.semantic >= 75)
            reasons.push("Good semantic similarity.");

        else
            reasons.push("Weak semantic similarity.");

        if (factors.workspace)
            reasons.push("Supported by previous workspace learning.");

        if (factors.feedback)
            reasons.push("Supported by historical user feedback.");

        if (factors.pattern)
            reasons.push("Supported by business pattern recognition.");

        return reasons;

    }

}

module.exports = new ConfidenceCalculator();