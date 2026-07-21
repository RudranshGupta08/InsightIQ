class ProcessingContext {

    static createContext(payload = {}) {

        return {

            payload,

            preparedHeaders: [],

            vocabulary: [],

            knowledge: [],

            classifications: [],

            candidates: [],

            mappings: [],

            confidence: {},

            analytics: {},

            recommendations: [],

            warnings: [],

            reasoning: []

        };

    }

}

module.exports = ProcessingContext;