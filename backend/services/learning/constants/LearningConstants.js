const LearningConstants = {

    AI: {

        VERSION: "InsightIQ AI v1",

        NAME: "InsightIQ Learning Engine"

    },

    EVENTS: {

        FILE_IMPORTED: "FILE_IMPORTED",

        NORMALIZATION_COMPLETED: "NORMALIZATION_COMPLETED",

        KNOWLEDGE_UPDATED: "KNOWLEDGE_UPDATED",

        WORKSPACE_UPDATED: "WORKSPACE_UPDATED",

        PREDICTION_CREATED: "PREDICTION_CREATED",

        PREDICTION_VERIFIED: "PREDICTION_VERIFIED",

        FEEDBACK_RECEIVED: "FEEDBACK_RECEIVED",

        CONFIDENCE_UPDATED: "CONFIDENCE_UPDATED",

        LEARNING_COMPLETED: "LEARNING_COMPLETED",

        AI_EXPLANATION_CREATED: "AI_EXPLANATION_CREATED",

        BUSINESS_PROFILE_UPDATED: "BUSINESS_PROFILE_UPDATED"

    },

    CONFIDENCE: {

        MIN: 0,

        LOW: 40,

        MEDIUM: 70,

        HIGH: 90,

        MAX: 100

    },

    LEARNING: {

        DEFAULT_SCORE: 0,

        MAX_SCORE: 100,

        USAGE_INCREMENT: 1,

        CONFIDENCE_INCREMENT: 2,

        CONFIDENCE_DECREMENT: 5

    },

    MATURITY: {

        BEGINNER: 20,

        INTERMEDIATE: 50,

        ADVANCED: 75,

        EXPERT: 90

    },

    SOURCES: {

        SYSTEM: "System",

        USER: "User",

        LEARNING: "Learning",

        INDUSTRY: "Industry"

    },

    STATUS: {

        ACTIVE: "Active",

        INACTIVE: "Inactive",

        PENDING: "Pending",

        VERIFIED: "Verified",

        REJECTED: "Rejected"

    },

    PREDICTIONS: {

        REVENUE: "Revenue",

        EXPENSE: "Expense",

        PROFIT: "Profit",

        CASHFLOW: "Cashflow",

        INVENTORY: "Inventory",

        SALES: "Sales",

        CUSTOMER: "Customer",

        GROWTH: "Growth",

        BUSINESS_HEALTH: "BusinessHealth"

    },

    AI: {

    MAX_CANDIDATES: 5

}

};

module.exports = LearningConstants;